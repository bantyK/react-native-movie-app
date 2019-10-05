export const getGenreIdsFromNames = (genreNames) => {
    return genreNames.map(genre => {
        return getGenreId(genre).id
    })

};

const getGenreId = (genreName) => {
    const genreJson = require('./../../../assets/genre')
    return genreJson.genres.find(genre => {
        return genre.name.toLowerCase() === genreName.toLowerCase()
    })
};
