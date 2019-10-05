import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import {POSTER_IMAGE_BASE_URL} from "../api/utils/MovieApiUtil";

const {width} = Dimensions.get('window');

export default class MovieRow extends React.Component {
    render() {
        const {movie} = this.props;
        const posterPath = POSTER_IMAGE_BASE_URL + movie.poster_path;
        return (
            <View style={styles.movieRowContainer}>
                <Image
                    style={styles.imageContainer}
                    source={{uri: posterPath}}/>

                <View style={styles.movieDetailContainer}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.movieTitle}>{movie.title}</Text>
                    <Text numberOfLines={4} ellipsizeMode='tail' style={styles.movieOverview}>{movie.overview}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    movieRowContainer: {
        flex: 1,
        width: width - 20,
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#FA8072',
        borderRadius: 16,
        marginLeft: 10,
        marginRight: 1000,
    },
    imageContainer: {
        width: 100,
        resizeMode: 'stretch',
        marginEnd: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#FFF",
        paddingLeft: 1,
        paddingTop: 1,
        paddingBottom: 1
    },
    movieDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingRight: 10,
        paddingTop: 5,
    },
    movieTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#2C3E50'
    },
    movieOverview: {
        fontSize: 15,
        color: '#ABB2B9',
    }
});