import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, ActivityIndicator, SafeAreaView} from 'react-native';
import {fetchMovieDetails} from "../../api/utils/MovieProvider";
import {withNavigation} from 'react-navigation';
import {DETAILS_IMAGE_BASE_URL} from "../../api/utils/MovieApiConstants";
import Star from 'react-native-star-view';
import CommonInfo from "./MovieCommonInfo";
import MoviesList from "../MoviesList";
import MovieDataList, {MovieListType} from "../MovieDataList";

const {width} = Dimensions.get('screen');

const MAX_GENRE = 3;

class DetailsComponent extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(args) {
        super(args);
        this.state = {
            movieDetails: null,
        }
    }

    _getMovieFrmoProp() {
        return this.props.navigation.getParam('movie', null);

    }

    componentDidMount() {
        const movie = this._getMovieFrmoProp();
        fetchMovieDetails(movie.id, (movieDetails) => {
            this.setState({
                    movieDetails
                }
            )
        })
    }

    render() {
        const movie = this._getMovieFrmoProp();
        console.log("Render", this.state.movieDetails);
        if (!movie) {
            return (
                <View style={styles.centerItem}>
                    <Text style={styles.errorText}>Movie id is required</Text>
                </View>
            )
        } else if (!this.state.movieDetails) {
            return <ActivityIndicator style={styles.centerItem}/>
        } else {
            return (
                this._renderMovieDetails(this.state.movieDetails)
            );
        }
    }

    _renderMovieDetails = (movie) => {
        console.log("render movie details", movie);
        const posterPath = DETAILS_IMAGE_BASE_URL + movie.poster_path;
        console.log(posterPath);
        return (
            <SafeAreaView style={{flex: 1}}>
                <Image
                    style={styles.movieThumb}
                    source={{uri: posterPath}}
                />
                <Text numberOfLines={2} style={styles.movieTitle}>{movie.title.toUpperCase()}</Text>
                <Text style={styles.movieGenre}>
                    {
                        movie.genres.map((genre, index) => {
                            if (index < MAX_GENRE) {
                                if (index === MAX_GENRE - 1)
                                    return genre.name;
                                else
                                    return genre.name + ','
                            }
                        })
                    }
                </Text>
                <View style={styles.centerAligned}>
                    <Star style={styles.ratingStar} score={movie.vote_average / 2}/>
                </View>

                <View style={[styles.centerAligned, styles.row, styles.commonInfo]}>
                    <CommonInfo title="Year" data={this._getYearFromDate(movie.release_date)}/>
                    <CommonInfo title="Language" data={movie.original_language}/>
                    <CommonInfo title="Duration" data={movie.runtime}/>
                </View>

                <Text style={styles.overview}>{movie.overview}</Text>

                <MovieDataList externalStyle={styles.similarMovieContainer} listType={MovieListType.SIMILAR} movieId={movie.id}/>
            </SafeAreaView>
        );
    };

    _getYearFromDate = (date) => {
        return date.split('-')[0];
    }
}

const styles = StyleSheet.create({
    errorText: {
        fontSize: 25,
        color: '#CB4335',
        fontWeight: 'bold'
    },
    centerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    movieThumb: {
        width: width,
        height: 300,
        resizeMode: 'cover',
    },
    movieTitle: {
        textAlign: 'center',
        fontSize: 22,
        color: '#2C3E50',
        marginTop: 20,
        paddingHorizontal: 16,
        fontWeight: 'bold'
    },
    movieGenre: {
        textAlign: 'center',
        fontSize: 12,
        color: '#566573',
        marginTop: 10,
    },
    ratingStar: {
        width: 100,
        height: 20,
        marginTop: 10,
    },
    centerAligned: {
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row'
    },
    commonInfo: {
        marginTop: 15,
        marginHorizontal: 10
    },
    overview: {
        fontSize: 12,
        color: '#566573',
        textAlign: 'center',
        paddingHorizontal: 16,
        marginTop: 20,
    },
    similarMovieContainer: {
        marginLeft: 10,
        marginTop: 20,
    }
});

export default withNavigation(DetailsComponent);