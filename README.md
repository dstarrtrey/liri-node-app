# liri-node-app
Node app that retrieves movie, song, and band data using Axios

## Usage
This app allows you to search any movie using the OMDb APIand retrieve information. for example, to find out about **Blade Runner 2049** you would simply enter: 
```node liri movie-this "Blade Runner 2049"```

You can also search the Spotify API for a query of your choice for select information about it. For example: 
```node liri spotify-this-song "Text Me? The Wldlfe"```
will return data about the song "Text Me?" by The Wldlfe.

Additionally, you can find information about bands' concerts using the Bandsintown API. 
```node liri concert-this "The Wldlfe"``` 
will display all of the scheduled concerts for the band "The Wldlfe"

One is also able to take whatever data is in the random.txt file (notated as `<method>,<query>`) to output whatever it seeks to do by the command: 
 ```node liri do-what-it-says```
 
 All of the queries you enter and their results are logged into log.txt for revisiting past entries.
