const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();
const cors = require("cors");
//Connect Database
connectDB();

//Init Middlawere
app.use(express.json({ extended: false }));

app.use(cors());

//Define routes
app.use("/api", require("./routes/api/movies"));
app.use("/api", require("./routes/api/tvSeries"));

app.use("/api/favoriteMovies", require("./routes/api/favoriteMovies"));

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("../client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
