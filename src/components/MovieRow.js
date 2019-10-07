import React from 'react';
import { Image, StyleSheet, TouchableHighlight} from 'react-native';
import {POSTER_IMAGE_BASE_URL} from "../api/utils/MovieApiConstants";
import {withNavigation} from 'react-navigation';

class MovieRow extends React.Component {
    render() {
        const {movie} = this.props;
        const posterPath = POSTER_IMAGE_BASE_URL + movie.poster_path;
        return (
            <TouchableHighlight
                style={styles.movieRowContainer}
                onPress={() => this.handleClick(movie)}>
                <Image
                    style={styles.imageContainer}
                    source={{uri: posterPath}}/>
            </TouchableHighlight>
        );
    }

    handleClick = (movie) => {
        this.props.navigation.push('Details',{
            movie
        })
    }
}

export default withNavigation(MovieRow);

const styles = StyleSheet.create({
    movieRowContainer: {
        flex: 1,
        width: 145,
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#FA8072',
        borderRadius: 16,
        padding: 1
    },
    imageContainer: {
        width: 140,
        resizeMode: 'stretch',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#FFF",
    }
});