const connectDB = require("../config/db");
const Movie = require("../models/Movie");
const tvSeries = require("../models/TvSeries");
const { scrapePopularMovies } = require("./imdbScraper");

connectDB();

const addToDatabase = async (_Model, dataObject) => {
  try {
    await _Model.insertMany(dataObject);
  } catch (error) {
    console.log(error.message);
  }
};

scrapePopularMovies(2).then((movies) => {
  addToDatabase(tvSeries, movies).then((e) => {
    console.log("Finished adding to db");
  });
});
