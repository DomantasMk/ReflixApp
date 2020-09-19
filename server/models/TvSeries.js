const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const tvSeriesSchema = new mongoose.Schema({
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

tvSeriesSchema.plugin(mongoosePaginate);

module.exports = tvSeries = mongoose.model("tvSeries", tvSeriesSchema);
