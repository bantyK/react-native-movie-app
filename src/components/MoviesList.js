import React from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview'
import MovieRow from "./MovieRow";
import {getMoviesData} from "../api/utils/MovieProvider";

const ViewTypes = {
    SINGLE_ROW: 0,
};

const {width} = Dimensions.get('window');

let PAGE = 1;

export class MoviesList extends React.Component {

    constructor(args) {
        super(args);

        this.state = {
            movies: [],
            dataLoading: true,
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2;
            }),
            count: 0
        };

        this._layoutProvider = new LayoutProvider(
            () => {
                return ViewTypes.SINGLE_ROW
            },
            (type, dim) => {
                dim.width = width;
                dim.height = 130;
            }
        );

        this._renderRow = this._renderRow.bind(this);
    }


    componentDidMount() {
        this.fetchMoreData()
    }


    _renderRow = (type, data) => {
        return <MovieRow movie={data}/>
    };

    render() {
        if (this.state.dataLoading) {
            return <ActivityIndicator style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}/>
        } else {
            return <RecyclerListView
                rowRenderer={this._renderRow}
                dataProvider={this.state.dataProvider}
                layoutProvider={this._layoutProvider}
                onEndReached={this.handleEndReached}
                onEndReachedThreshold={50}
            />
        }
    };

    handleEndReached = () => {
        this.fetchMoreData()
    };

    fetchMoreData = () => {
        getMoviesData(this.props.genre, PAGE, (results) => {
            this.setState({
                dataLoading: false,
                dataProvider: this.state.dataProvider.cloneWithRows(
                    this.state.movies.concat(results)
                ),
                movies: this.state.movies.concat(results),
                count: this.state.count + results.length
            });
        });
        PAGE = PAGE + 1;
    }
}