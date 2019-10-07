import {getUrl, getDetailsUrl} from './MovieUrlHelper'

export function getMoviesData(genre, page = 1, callback) {
    try {
        const url = getUrl(genre, page);
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(resJson => resJson.results)
            .then(results => callback(results))
    } catch (e) {
        console.log("Exception", e.message)
    }
}

export function getMovieDetails(movieId, callback) {
    try {
        const movieDetailsUrl = getDetailsUrl(movieId);
        console.log(movieDetailsUrl);
        fetch(movieDetailsUrl)
            .then(res => res.json())
            .then(resJson => callback(resJson))
    } catch (e) {
        console.log('Exception while fetching movie details ', e.message);
    }
}


