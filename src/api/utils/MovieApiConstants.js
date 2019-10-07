export const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc';
export const MOVIE_DETAIL_BASE_URL = "https://api.themoviedb.org/3/movie/";
export const POSTER_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300/';
export const API_KEY = "b33cef0e8f9a26e8857366681a641e25";
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
        case 'horror':
            return 27;
        case 'war':
            return 10752;
        case 'thriller':
            return 53;
        case 'western':
            return 37;
        case 'romance':
            return 10749;
        case 'music':
            return 10402;
        case 'fantasy':
            return 14;
        case 'family':
            return 10751;
        case 'drama':
            return 18;
        case 'documentary':
            return 99;
        case 'history':
            return 36;
        default:
            return 28;

    }
}