import {
    API_KEY,
    getGenreId,
    MOVIE_BASE_URL,
    MOVIE_DETAIL_BASE_URL,
    SEARCH_BASE_URL,
} from "./MovieApiConstants";

export const getUrl = (genre, page) => {
    const url = MOVIE_BASE_URL + '&' +
        encodeURIComponent("with_genres") + "=" + encodeURIComponent(getGenreId(genre)) + '&' +
        encodeURIComponent("page") + "=" + encodeURIComponent(page);

    return _addApiKey(url);
};


function _addApiKey(url) {
    return url + '&' +
        encodeURIComponent("api_key") + "=" + encodeURIComponent(API_KEY);

}

export const getDetailsUrl = (id) => {
    const url = MOVIE_DETAIL_BASE_URL + id + '?'
        + encodeURIComponent("language") + "=" + encodeURIComponent("en-US");
    return _addApiKey(url);
};

export const getSimilarMovieUrl = (id) => {
    const url = MOVIE_DETAIL_BASE_URL + id + '/similar' + '?' +
        +encodeURIComponent("language") + "=" + encodeURIComponent("en-US");
    return _addApiKey(url);
};

export const getSearchUrl = (queryString, page) => {
    const url = SEARCH_BASE_URL + '?'
        + encodeURIComponent("language") + "=" + encodeURIComponent("en-US") + '&'
        + encodeURIComponent("query") + "=" + encodeURIComponent(queryString) + '&'
        + encodeURIComponent("page") + "=" + encodeURIComponent(page);

    return _addApiKey(url);
};