import React from 'react';
import {StyleSheet, Dimensions, View, Text, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import MovieDataList, {MovieListType} from "../MovieDataList";

const {width} = Dimensions.get('screen');

export default class SearchComponent extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            query: '',
            startSearch: false,
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInputBox}
                        placeholder="Enter movie name to search"
                        value={this.state.query}
                        onChange={this._searchStringEdited}
                    />
                    <TouchableOpacity
                        style={styles.searchButtonContainer}
                        onPress={() => this._handleSearch()}
                    >
                        <Icon style={styles.searchButton} name="ios-search"/>
                    </TouchableOpacity>
                </View>

                {
                    this.state.startSearch &&
                    <MovieDataList listType={MovieListType.SEARCH} query={this.state.query}/>
                }
            </SafeAreaView>
        )
    }

    _searchStringEdited = (event) => {
        this.setState({query: event.nativeEvent.text})
    };

    _handleSearch = () => {
        console.log("Handle search");
        this.setState({
            startSearch: true
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E9967A',
        borderRadius: 16,
        justifyContent: 'space-between',
    },
    searchInputBox: {
        height: 50,
        padding: 4,
        marginLeft: 16,
        flexGrow: 1,
        fontSize: 18,
        color: '#273746',
    },
    searchButton: {
        fontSize: 30,
    },
    searchButtonContainer: {
        height: 50,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginLeft: 10,
    }
});