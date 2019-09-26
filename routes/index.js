const express = require("express");
const router = express.Router();
const spotifyApi = require("../spotify-api");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/search", (req, res) => {
  const artist = req.body.artist;
  res.redirect(`/artists/?artist=${artist}`);
});

router.get("/searchartists", (req, res) => {
  const artist = req.query.artist;
  spotifyApi
    .searchArtists(artist)
    .then(data => {
      res.json(data.body.artists.items);
    })
    .catch(err => {
      console.error(err);
    });
});

router.get("/artists/", (req, res, next) => {
  const artist = req.query.artist;

  spotifyApi
    .searchArtists(artist)
    .then(data => {
      res.render("artists", {
        title: "Artists",
        allArtists: data.body.artists.items
      });
    })
    .catch(err => {
      console.error(err);
    });
});

router.get("/albums/:artistId", (req, res) => {
  const id = req.params.artistId;

  spotifyApi
    .getArtistAlbums(id, { limit: 10, offset: 1 })
    .then(data => {
      res.render("albums", {
        title: data.body.items[0].artists[0].name,
        allAlbums: data.body.items
      });
    })
    .catch(err => {
      console.error(err);
    });
});

router.get("/tracks/:trackId", (req, res) => {
  const id = req.params.trackId;

  spotifyApi
    .getAlbumTracks(id)
    .then(data => {
      console.log(data.body.items);
      //res.send(data.body.items);
      res.render("tracks", {
        title: "Tracks",
        allTracks: data.body.items
      });
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
