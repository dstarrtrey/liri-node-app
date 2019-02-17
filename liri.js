require("dotenv").config();
const keys = require("./keys.js");
//const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const chalk = require("chalk");
const moment = require("moment");
const concertThis = async () => {
  if (process.argv[4]){
    console.log(chalk.bgRed('Try entering the artist with quotes ("") surrounding it.'));
    return;
  }
  console.log(chalk.bgCyan(process.argv[3]));
  const artist = process.argv[3].split(" ").join("+");
  const artistUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
  try{
    let response = await axios.get(artistUrl);
    const data = response.data;
    data.forEach(concert => {
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
switch (process.argv[2]) {
  case "concert-this": 
    concertThis();
    break;
  case "spotify-this-song": 
    break;
  case "movie-this":
    break;
  case "do-what-it-says":
    break;
}

