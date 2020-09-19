const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MoviesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  genres: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  poster_uri: {
    type: String,
  },
  rating: {
    type: String,
  },
  ratingCount: {
    type: String,
  },
  length: {
    type: String,
  },
  trailerId: {
    type: String,
  },
});
MoviesSchema.index({ "$**": "text" });
MoviesSchema.plugin(mongoosePaginate);

module.exports = Movies = mongoose.model("Movies", MoviesSchema);
