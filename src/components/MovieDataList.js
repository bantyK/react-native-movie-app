import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {fetchMoviesData, fetchSimilarMovies} from "../api/utils/MovieProvider";
import MoviesList from "./MoviesList";
import {withNavigation} from 'react-navigation';


export const MovieListType = {
    SIMILAR: 1,
    GENRE: 2
};

let ListType = 2; // By default the list type will be genre list

class MovieDataList extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        switch (this.props.listType) {
            case MovieListType.SIMILAR:
                this.getSimilarMovies(this.props.movieId && this.props.movieId || null);
                break;
            default:
                this.getGenreListMovies(this.props.genre && this.props.genre || 'action');
                break;
        }
    }

    getSimilarMovies = (movieId) => {
        fetchSimilarMovies(movieId, (results) => {
            this.updateState(results)
        })
    };

    getGenreListMovies = (genre) => {
        fetchMoviesData(genre, 1, (results) => {
            this.updateState(results)
        })
    };

    updateState = (results) => {
        console.log("Movie data list: ", results.length);
        this.setState({
            movies: this.state.movies.concat(results),
        })
    };

    render() {
        const movies = this.state.movies;
        if (movies.length > 0) {
            return (<MoviesList externalStyle={this.props.externalStyle} genre={this.props.genre && this.props.genre || "Similar"} data={movies}/>);
        } else {
            return (<ActivityIndicator style={styles.activityIndicator}/>);
        }
    }
}

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default withNavigation(MovieDataList);