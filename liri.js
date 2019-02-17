require("dotenv").config();
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const chalk = require("chalk");
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

const concertThis = async () => {
  const artist = process.argv[3].split(" ").join("+");
  let data = await axios.get(`https://rest.bandsintown.com/artists/"${artist}/events?app_id=codingbootcamp`);
  data.forEach(concert => {
    console.log()
  });
};