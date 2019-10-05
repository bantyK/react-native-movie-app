import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';

const ViewTypes = {
    FULL: 0,
    HALF_RIGHT: 1,
    HALF_LEFT: 2
};

let containerCount = 0

class CellContainer extends React.Component {
    constructor(args) {
        super(args);
        this._containerId = containerCount++;
    }

    render() {
        return (
            <View {...this.props}>{this.props.children}<Text>Cell id: {this._containerId}</Text></View>
        );
    }
}

export default class MixedTypeViews extends React.Component {

    constructor(args) {
        super(args);

        let {width} = Dimensions.get('window');

        let dataProvider = new DataProvider((row1, row2) => {
            return row1 !== row2;
        });

        this._layoutProvider = new LayoutProvider(
            index => {
                if (index % 3 === 0) {
                    return ViewTypes.FULL
                } else if (index % 3 === 1) {
                    return ViewTypes.HALF_LEFT
                } else {
                    return ViewTypes.HALF_RIGHT
                }
            },
            (type, dim) => {
                switch (type) {
                    case ViewTypes.FULL:
                        dim.width = width;
                        dim.height = 160;
                        break;
                    case ViewTypes.HALF_LEFT:
                        dim.width = width / 2;
                        dim.height = 160;
                        break;
                    case ViewTypes.HALF_RIGHT:
                        dim.width = width / 2;
                        dim.height = 170;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);

        this.state = {
            dataProvider: dataProvider.cloneWithRows(this._generateRows(300))
        }
    }

    _rowRenderer(type, data) {
        switch (type) {
            case ViewTypes.FULL:
                return (
                    <CellContainer style={styles.container}>
                        <Text>Data: {data}</Text>
                    </CellContainer>
                );
            case ViewTypes.HALF_LEFT:
                return (
                    <CellContainer style={styles.containerGridLeft}>
                        <Text>Data: {data}</Text>
                    </CellContainer>
                );

            case ViewTypes.HALF_RIGHT:
                return (
                    <CellContainer style={styles.containerGridRight}>
                        <Text>Data: {data}</Text>
                    </CellContainer>
                );
            default:
                return null;

        }
    }

    render() {
        return (
            <View style={{ flex: 1, width: '100%', height:20 }}>
                <RecyclerListView
                    layoutProvider={this._layoutProvider}
                    dataProvider={this.state.dataProvider}
                    rowRenderer={this._rowRenderer}/>
            </View>
        );
    }

    _generateRows(n) {
        let arr = Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = i;
        }
        return arr
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#00a1f1"
    },
    containerGridLeft: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffbb00"
    },
    containerGridRight: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#7cbb00"
    }
});