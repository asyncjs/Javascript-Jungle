jj.createCreature 'tweetiepie', (layer) ->
  $ = jj.jQuery
  twitter_api_url = 'http://search.twitter.com/search.json'
  twitter_user    = 'purge'

  $.ajaxSetup cache: true
  $.getJSON "#{twitter_api_url}?callback=?&rpp=5&q=from:#{twitter_user}", ->
    $.each data.results, (i, tweet) ->
      if tweet.text
        date_tweet = new Date(tweet.created_at);
        date_now   = new Date();
        date_diff  = date_now - date_tweet;
        hours      = Math.round(date_diff/(1000*60*60))
        console.log tweet.text
