(function() {
  jj.createCreature('tweetiepie', function(layer) {
    var $, twitter_api_url, twitter_user;
    $ = jj.jQuery;
    twitter_api_url = 'http://search.twitter.com/search.json';
    twitter_user = 'purge';
    $.ajaxSetup({
      cache: true
    });
    return $.getJSON("" + twitter_api_url + "?callback=?&rpp=5&q=from:" + twitter_user, function() {
      return $.each(data.results, function(i, tweet) {
        var date_diff, date_now, date_tweet, hours;
        if (tweet.text) {
          date_tweet = new Date(tweet.created_at);
          date_now = new Date();
          date_diff = date_now - date_tweet;
          hours = Math.round(date_diff / (1000 * 60 * 60));
          return console.log(tweet.text);
        }
      });
    });
  });
}).call(this);
