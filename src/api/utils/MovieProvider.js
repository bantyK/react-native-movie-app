import {getGenreId, MOVIE_BASE_URL} from "./MovieApiUtil";


export function getMoviesData(genre, page = 1, callback) {
    try {
        const url = _getUrl(genre, page);
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(resJson => resJson.results)
            .then(results => callback(results))
    } catch (e) {
        console.log("Exception", e.message)
    }

}

const _getUrl = (genre, page) => {
    return MOVIE_BASE_URL + '&' +
        encodeURIComponent("with_genres") + "=" + encodeURIComponent(getGenreId(genre)) + '&' +
        encodeURIComponent("page") + "=" + encodeURIComponent(page);
}
