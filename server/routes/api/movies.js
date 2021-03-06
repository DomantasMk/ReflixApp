const express = require("express");
const Movies = require("../../models/Movie.js");

const router = express.Router();

// @route   GET api/main/movies
// @desc    get array of movies
// @acess   Public
router.get("/movies", (req, res) => {
  Movies.find({}).then((maps) => res.json(maps));
});

// @route   GET api/movies/:page
// @desc    get array of movies by pages
// @acess   Public
router.get("/movies/:page", (req, res) => {
  const options = {
    page: req.params.page,
    limit: 10,
    collation: {
      locale: "en",
    },
  };
  Movies.paginate({}, options, function (err, result) {
    res.json(result.docs);
    // result.docs
    // result.totalDocs = 100
    // result.limit = 10
    // result.page = 1
    // result.totalPages = 10
    // result.hasNextPage = true
    // result.nextPage = 2
    // result.hasPrevPage = false
    // result.prevPage = null
    // result.pagingCounter = 1
  });
});
// @route   GET /movies/search/:searchQuery/:page
// @desc    get array of movies by pages by search string
// @acess   Public
router.get("/movies/search/:searchQuery/:page", (req, res) => {
  const options = {
    page: req.params.page,
    limit: 10,
    collation: {
      locale: "en",
    },
  };
  Movies.paginate(
    { $text: { $search: req.params.searchQuery } },
    options,
    function (err, result) {
      res.json(result.docs);
      // result.docs
      // result.totalDocs = 100
      // result.limit = 10
      // result.page = 1
      // result.totalPages = 10
      // result.hasNextPage = true
      // result.nextPage = 2
      // result.hasPrevPage = false
      // result.prevPage = null
      // result.pagingCounter = 1
    }
  );
});
// @route   GET api/movies/rating/:page
// @desc    get array of movies by pages sorted descending by rating
// @acess   Public
router.get("/movies/rating/:page", (req, res) => {
  const options = {
    page: req.params.page,
    limit: 10,
    collation: {
      locale: "en",
    },
    sort: { rating: -1 },
  };
  Movies.paginate({}, options, function (err, result) {
    res.json(result.docs);
  });
});
// @route   GET api/movies/rating/:page
// @desc    get array of movies by pages sorted descending by rating
// @acess   Public
router.get("/movies/ratingCount/:page", (req, res) => {
  const options = {
    page: req.params.page,
    limit: 10,
    collation: {
      locale: "en",
    },
    sort: { ratingCount: -1 },
  };
  Movies.paginate({}, options, function (err, result) {
    res.json(result.docs);
  });
});
// @route   GET api/movies/:genre/:page
// @desc    get array of movies by pages and by given genre
// @acess   Public
router.get("/movies/:genre/:page", (req, res) => {
  const options = {
    page: req.params.page,
    limit: 10,
    collation: {
      locale: "en",
    },
  };
  Movies.paginate({ genres: { $all: [req.params.genre] } }, options, function (
    err,
    result
  ) {
    res.json(result.docs);
  });
});

// @route   GET api/movie/:movieId
// @desc    get movie
// @acess   Public
router.get("/movie/:movieId", (req, res) => {
  Movies.findById(req.params.movieId)
    .then((maps) => res.json(maps))
    .catch((err) => console.log(err));
});

// @route Post api/post/movies
// @desc Post one movie
// @access Public

router.post("/post/movie", (req, res) => {
  const newMovie = new Movies({
    title: "new",
  });
  newMovie.save().then((movie) => res.json(movie));
});

module.exports = router;
