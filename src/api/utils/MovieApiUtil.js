export const MovieUrls = {
    Adventure:
        "https://api.themoviedb.org/3/discover/movie?api_key=b33cef0e8f9a26e8857366681a641e25&language=en-US&sort_by=popularity.desc&page=1&with_genres=12",

    Action:
        "https://api.themoviedb.org/3/discover/movie?api_key=b33cef0e8f9a26e8857366681a641e25&language=en-US&sort_by=popularity.desc&page=1&with_genres=28",

    Comedy:
        "https://api.themoviedb.org/3/discover/movie?api_key=b33cef0e8f9a26e8857366681a641e25&language=en-US&sort_by=popularity.desc&page=1&with_genres=35",

    Crime:
        "https://api.themoviedb.org/3/discover/movie?api_key=b33cef0e8f9a26e8857366681a641e25&language=en-US&sort_by=popularity.desc&page=1&with_genres=80"
};

export const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=b33cef0e8f9a26e8857366681a641e25&language=en-US&sort_by=popularity.desc';

export const POSTER_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300/';

export function getGenreId(genreName) {
    switch (genreName) {
        case 'action':
            return 28;
        case 'adventure':
            return 12;
        case 'animation':
            return 16;
        case 'comedy':
            return 35;
        case 'crime':
            return 80;
    }
}