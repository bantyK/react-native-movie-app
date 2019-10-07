import {getUrl, getDetailsUrl, getSimilarMovieUrl} from './MovieUrlHelper'

export function fetchMoviesData(genre, page = 1, callback) {
    try {
        const url = getUrl(genre, page);
        console.log('Movies with genre ', url);
        fetch(url)
            .then(res => res.json())
            .then(resJson => resJson.results)
            .then(results => callback(results))
    } catch (e) {
        console.log("Exception", e.message)
    }
}

export function fetchMovieDetails(movieId, callback) {
    try {
        const movieDetailsUrl = getDetailsUrl(movieId);
        console.log('Movie details url', movieDetailsUrl);
        fetch(movieDetailsUrl)
            .then(res => res.json())
            .then(resJson => callback(resJson))
    } catch (e) {
        console.log('Exception while fetching movie details ', e.message);
    }
}


export function fetchSimilarMovies(id, callback) {
    try {
        const similarMoviesUrl = getSimilarMovieUrl(id);
        console.log('Similar movies url', similarMoviesUrl);
        fetch(similarMoviesUrl)
            .then(res => res.json())
            .then(resJson => callback(resJson.results))

    } catch (e) {
        console.log('Exception while fetching similar movies ', e.message);
    }
}