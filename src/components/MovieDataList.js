import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {fetchMoviesData, fetchSimilarMovies, fetchSearchResults} from "../api/utils/MovieProvider";
import MoviesList from "./MoviesList";
import {withNavigation} from 'react-navigation';


export const MovieListType = {
    SIMILAR: 1,
    GENRE: 2,
    SEARCH: 3,
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
            case MovieListType.SEARCH:
                this.searchMovie(this.props.query && this.props.query || "");
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

    searchMovie = (query) => {
        console.log("search method ", query);
        fetchSearchResults(query, 1, (results) => {
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
        const {listType} = this.props;
        if (movies.length > 0) {
            if (listType === MovieListType.SIMILAR) {
                return (<MoviesList externalStyle={this.props.externalStyle} title="Similar" data={movies}/>);
            } else if (listType === MovieListType.SEARCH) {
                console.log("Search query : " + this.props.query);
                return <MoviesList externalStyle={this.props.externalStyle} title="Search" data={movies}/>
            } else {
                return (<MoviesList externalStyle={this.props.externalStyle}
                                    title={this.props.genre && this.props.genre || "Action"}
                                    genre={this.props.genre && this.props.genre || "Action"} data={movies}/>);
            }
        } else {
            return (<ActivityIndicator style={styles.activityIndicator}/>);
        }
    }
}

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        width: 20,
        height: 20
    },
});

export default withNavigation(MovieDataList);