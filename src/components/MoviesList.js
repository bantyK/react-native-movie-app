import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview'
import MovieRow from "./MovieRow";
import {getMoviesData} from "../api/utils/MovieProvider";
import {withNavigation} from 'react-navigation';

const ViewTypes = {
    SINGLE_ROW: 0,
    SPOTLIGHT_BANNER: 1,
};

const DEFAULT_GENRE = "action";

let PAGE = 1;

class MoviesList extends React.Component {

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
            (index) => {
                return ViewTypes.SINGLE_ROW;
            },
            (type, dim) => {
                dim.width = 150;
                dim.height = 180;
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

    _capitalise = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1)
    };

    render() {
        if (this.state.dataLoading) {
            return <ActivityIndicator style={styles.activityIndicator}/>
        } else {
            return (
                <View style={styles.movieListContainer}>
                    <Text
                        style={styles.genreText}>{this._capitalise(this.props.genre && this.props.genre || DEFAULT_GENRE)}</Text>
                    <RecyclerListView
                        style={styles.recyclerView}
                        rowRenderer={this._renderRow}
                        dataProvider={this.state.dataProvider}
                        layoutProvider={this._layoutProvider}
                        isHorizontal={true}
                        onEndReached={this.handleEndReached}
                        onEndReachedThreshold={300}
                    />
                </View>
            )
        }
    };

    handleEndReached = () => {
        this.fetchMoreData()
    };

    fetchMoreData = () => {
        getMoviesData(this.props.genre.toLowerCase(), PAGE, (results) => {
            this.setState({
                dataLoading: false,
                dataProvider: this.state.dataProvider.cloneWithRows(
                    this.state.movies.concat(results)
                ),
                movies: this.state.movies.concat(results),
                count: this.state.count + results.length
            });
        });
    }
}

export default withNavigation(MoviesList);

const styles = StyleSheet.create({
    movieListContainer: {
        marginLeft: 10,
    },
    recyclerView: {
        flex: 1,
        width: '100%',
        height: 200
    },
    activityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    genreText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
    }
});