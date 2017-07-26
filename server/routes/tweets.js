var express = require('express');
var router = express.Router();
var OAuth = require('oauth')
var timelineUrl = `https://api.twitter.com/1.1/statuses/home_timeline.json`
var apiURL = 'https://api.twitter.com/1.1/search/tweets.json?q='
var tweetURL = `https://api.twitter.com/1.1/statuses/update.json?status=`

var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    `${process.env.KEY}`,
    `${process.env.KEY_SECRET}`,
    '1.0A',
    null,
    'HMAC-SHA1'
  );


router.get('/search', function(req, res) {
  oauth.get(
    `${apiURL}${req.query.search}`,
    `${process.env.TOKEN}`, //test user token
    `${process.env.TOKEN_SECRET}`, //test user secret
    function (e, data, result){
      if (e) console.error(e);
      let d = JSON.parse(data)
      // console.log(require('util').inspect(data));
      res.send(d);
    });
});

router.get('/timeline', function(req, res) {
  oauth.get(
    `${timelineUrl}`,
    `${process.env.TOKEN}`, //test user token
    `${process.env.TOKEN_SECRET}`, //test user secret
    function (e, data, result){
      if (e) console.error(e);
      let d = JSON.parse(data)
      res.send(d);
    });
});

router.post('/post', function(req, res) {
  oauth.post(
    `${tweetURL}${req.body.tweet}`,
    `${process.env.TOKEN}`, //test user token
    `${process.env.TOKEN_SECRET}`, //test user secret
    `${req.body.tweet}`,
    "txt",
    function (e, data){
      if (e) console.error(e);
      res.send(data)
    });
});


module.exports = router;
