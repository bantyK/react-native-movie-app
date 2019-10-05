import React from 'react';
import {Dimensions} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview'
import MovieRow from "./MovieRow";

const ViewTypes = {
    SINGLE_ROW: 0,
};

const {width} = Dimensions.get('window');

export class MoviesList extends React.Component {

    constructor(args) {
        super(args)
        this.state = {
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2;
            }).cloneWithRows(this.props.movies)
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

    _renderRow = (type, data) => {
        console.log("Render row data", data);
        return <MovieRow movie={data}/>
    };

    render() {
        return (
            <RecyclerListView rowRenderer={this._renderRow} dataProvider={this.state.dataProvider}
                              layoutProvider={this._layoutProvider}/>
        )

    };

}


//source={{uri: 'https://www.sccpre.cat/mypng/detail/226-2260936_react-native-icon-png.png'}}