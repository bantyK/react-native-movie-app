import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import MoviesList from "./MoviesList";
import Icon from 'react-native-vector-icons/Ionicons';

const genreList = [
    'action',
    'comedy',
    'animation',
    'drama',
    'horror',
    'documentary',
    'history',
    'family',
    'fantasy',
    'music',
    'romance',
    'thriller',
    'adventure'
];

export default class DiscoverMoviesComponent extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Discover",
            headerRight: (
                <TouchableOpacity
                    style={{marginRight: 20}}
                    activeOpacity={1.0}
                    onPress={navigation.getParam('handleSearchAction')}
                >
                    <Icon style={{fontSize: 18}} name="ios-search"/>
                </TouchableOpacity>
            )
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({handleSearchAction: this._handleSearchAction});
    }

    _handleSearchAction = () => {
        console.log("Search clicked");
        this.props.navigation.navigate('Search')
    };

    render() {

        return (
            <ScrollView style={styles.container}>
                {
                    genreList.map((genreName, index) => {
                        return <MoviesList key={index} genre={genreName}/>
                    })
                }
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 40
    }
});
