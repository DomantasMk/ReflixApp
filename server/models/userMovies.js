const mongoose = require("mongoose");

const userMoviesSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  favoriteMovies: [
    {
      type: String,
    },
  ],
});

module.exports = userMovies = mongoose.model("userMovies", userMoviesSchema);
