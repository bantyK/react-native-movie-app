import {getUrl, getDetailsUrl, getSimilarMovieUrl, getSearchUrl} from './MovieUrlHelper'

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

export function fetchSearchResults(query, page, callback) {
    try {
        const searchUrl = getSearchUrl(query, page);
        //
        https://api.themoviedb.org/3/search/movie?api_key=b33cef0e8f9a26e8857366681a641e25&language=en-US&query=avengers&page=1&include_adult=false
        console.log('Search movies url', searchUrl);
        fetch(searchUrl)
            .then(res => res.json())
            .then(resJson => callback(resJson.results))
    } catch (e) {
        console.log('Exception while fetching similar movies ', e.message);
    }
}