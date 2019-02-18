require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const chalk = require("chalk");
const moment = require("moment");
const fs = require("fs");
const concertThis = async (band = process.argv[3]) => {
  if (process.argv[4]){
    console.log(chalk.bgRed('Try entering the artist with quotes ("") surrounding it.'));
    return;
  }
  console.log(chalk.bgCyan(band));
  const artist = band.split(" ").join("+").trim().replace(/['"]+/g, '');
  const artistUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
  try {
    let response = await axios.get(artistUrl);
    response.data.forEach(concert => {
      console.log(chalk.yellow("Venue:"), concert.venue.name);
      console.log(chalk.blue("Location:"), concert.venue.city + ", " + concert.venue.region);
      console.log(chalk.blue("Date:"), moment(concert.datetime).format("MM/DD/YYYY"));
    });
  }
  catch(err){
    console.log("This is an error message: ");
    console.log(err)
  }
};
const spotifyThisSong = async (song = process.argv[3]) => {
  if (process.argv[4]){
    console.log(chalk.bgRed('Try entering the song with quotes ("") surrounding it.'));
    return;
  }
  if (!song) {
    song = "The Sign Ace of Base";
  }
  spotify.search({ type: "track", query: song}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    };
    const song = data.tracks.items[0];
    console.log(chalk.blue("Song Name:"), song.name);
    console.log(chalk.yellow("Artist(s):"), song.artists[0].name);
    console.log(chalk.magenta("Listen URL:"), chalk.bgCyan(song.external_urls.spotify));
    console.log(chalk.green("Album:"),song.album.name);
  });
};
const movieThis = async (input = process.argv[3]) => {
  if (process.argv[4]){
    console.log(chalk.bgRed('Try entering the artist with quotes ("") surrounding it.'));
    return;
  }
  let req = input.split(" ").join("+").trim();
  if (!input) {
    req = "Mr.+Nobody";
  }
  const movieUrl = `http://www.omdbapi.com/?apikey=trilogy&t=${req}`;
  try{
    let movie = await axios.get(movieUrl);
    movie = movie.data;
    console.log(chalk.yellow("Movie:"), movie.Title);
    console.log(chalk.blue("Year:"), movie.Year);
    console.log(chalk.red("IMDB Rating:"), movie.Ratings[0].Value);
    console.log(chalk.red("Rotten Tomatoes Score:"), movie.Ratings[1].Value);
    console.log(chalk.green("Country:"), movie.Country);
    console.log(chalk.cyan("Language"), movie.Language);
    console.log(chalk.blue("Plot:"), movie.Plot);
    console.log(chalk.green("Actors:"), movie.Actors);
  }
  catch(err){
    console.log("This is an error message: ");
    console.log(err)
  }
};
const doWhatItSays = () => {
  fs.readFile("./random.txt", "utf8", (err, data) => {
    if(err) {
      console.log("ERROR!", err);
    }
    const result = data.split(",");
    switch (result[0]) {
      case "concert-this": 
        concertThis(result[1]);
        break;
      case "spotify-this-song": 
        spotifyThisSong(result[1]);
        break;
      case "movie-this":
        movieThis(result[1]);
        break;
    }
  });
};
switch (process.argv[2]) {
  case "concert-this": 
    concertThis();
    break;
  case "spotify-this-song": 
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
}

