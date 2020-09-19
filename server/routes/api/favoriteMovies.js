const express = require("express");
const userMovies = require("../../models/userMovies.js");
const auth = require("../../middleware/firebaseAuth");
const Movies = require("../../models/Movie.js");

const router = express.Router();

// @route   GET api/api
// @desc    Testo
// @acess   Public
router.get("/", auth, async (req, res) => {
  try {
    let movies = await userMovies.findOne({ userID: req.uid }).exec();
    res.json(movies);
  } catch (err) {
    res.status(500).send("Server error");
  }
});
// @route   GET api/movies/:page
// @desc    get array of movies by pages
// @acess   Public
router.get("/:page", auth, async (req, res) => {
  const options = {
    page: req.params.page,
    limit: 10,
    collation: {
      locale: "en",
    },
  };
  try {
    let movies = await userMovies.findOne({ userID: req.uid }).exec();
    Movies.paginate({ _id: { $in: movies.favoriteMovies } }, options, function (
      err,
      result
    ) {
      res.json(result.docs);
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   GET api/api
// @desc    Testo
// @acess   Public
router.get("/isFavorite/:movieId", auth, async (req, res) => {
  try {
    let movies = await userMovies.findOne({ userID: req.uid }).exec();
    if (movies) {
      const index = movies.favoriteMovies.indexOf(req.params.movieId);
      if (index == -1) {
        res.json(false);
      } else {
        res.json(true);
      }
    } else {
      res.json(false);
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});
// @route Post api/post/movie/:movieId
// @desc Post one movie to favoriteMovies
// @access Public/Auth

router.post("/post/movie/:movieId", auth, async (req, res) => {
  let movies = await userMovies.findOne({ userID: req.uid }).exec();
  if (movies) {
    const index = movies.favoriteMovies.indexOf(req.params.movieId);
    if (index == -1) {
      movies.favoriteMovies.push(req.params.movieId);
      movies.save().then((movie) => res.json(movie));
    }
  } else {
    const newMovieList = new userMovies({
      userID: req.uid,
      favoriteMovies: [req.params.movieId],
    });
    newMovieList.save().then((movie) => res.json(movie));
  }
});
// @route remove api/remove/movie/:movieId
// @desc remove one movie to favoriteMovies
// @access Public/Auth

router.post("/remove/movie/:movieId", auth, async (req, res) => {
  let movies = await userMovies.findOne({ userID: req.uid }).exec();
  if (movies) {
    const index = movies.favoriteMovies.indexOf(req.params.movieId);
    if (index > -1) {
      movies.favoriteMovies.splice(index, 1);
    }
    movies.save().then((movie) => res.json(movie));
  } else {
    const newMovieList = new userMovies({
      userID: req.uid,
      favoriteMovies: [],
    });
    newMovieList.save().then((movie) => res.json(movie));
  }
});

module.exports = router;
