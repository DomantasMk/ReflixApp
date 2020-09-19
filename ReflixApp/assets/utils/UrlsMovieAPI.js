export let LocalIp = 'localhost';
export let urlsMovies = [
  {
    title: 'Trending movies',
    key: '4',
    url: `http://${LocalIp}:5000/api/movies/`,
  },
  {
    title: 'Top Rated Movies',
    key: '5',
    url: `http://${LocalIp}:5000/api/movies/rating/`,
  },
  {
    title: 'All time popular',
    key: '6',
    url: `http://${LocalIp}:5000/api/movies/ratingCount/`,
  },
];
export let urlsSeries = [
  {
    title: 'Trending Series',
    key: '1',
    url:
      'https://api.themoviedb.org/3/tv/popular?api_key=debfa0037881857def6d74b243adf4a3&language=en-US&page=',
  },
  {
    title: 'Top Rated Series',
    key: '2',
    url:
      'https://api.themoviedb.org/3/tv/top_rated?api_key=debfa0037881857def6d74b243adf4a3&language=en-US&page=',
  },
  {
    title: 'Airing Now',
    key: '3',
    url:
      'https://api.themoviedb.org/3/tv/on_the_air?api_key=debfa0037881857def6d74b243adf4a3&language=en-US&page=',
  },
];
export const detailsUrl = (movieId) =>
  `http://${LocalIp}:5000/api/movie/${movieId}`;
const movieApiUrl = (id) => `http://${LocalIp}:5000/api/movie/${id}`;
const urlPaged = (page) => `http://${LocalIp}:5000/api/movies/${page}`;
const urlRatingPaged = (page) =>
  `http://${LocalIp}:5000/api/movies/rating/${page}`;
const urlRatingCountPaged = (page) =>
  `http://${LocalIp}:5000/api/movies/ratingCount/${page}`;
const urlGenrePaged = (genre) => (page) =>
  `http://${LocalIp}:5000/api/movies/${genre}/${page}`;

//Favorite app urls
const favoriteMovieIdsUrl = (page) =>
  `http://${LocalIp}:5000/api/favoritemovies/${page}`;
const removeFavorite = (movieId) =>
  `http://${LocalIp}:5000/api/favoritemovies/remove/movie/${movieId}`;
const addFavorite = (movieId) =>
  `http://${LocalIp}:5000/api/favoritemovies/post/movie/${movieId}`;

//search url
const searchMovieUrl = (query, page) =>
  `http://${LocalIp}:5000/api/movies/search/${query}/${page}`;

export {
  urlPaged,
  urlRatingPaged,
  urlRatingCountPaged,
  urlGenrePaged,
  movieApiUrl,
  favoriteMovieIdsUrl,
  removeFavorite,
  addFavorite,
  searchMovieUrl,
};
