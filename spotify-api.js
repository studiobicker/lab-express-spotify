const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function(err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);

module.exports = spotifyApi;
