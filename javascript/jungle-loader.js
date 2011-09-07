// File that contains a list of urls, passed to jungle.load, e.g. jungle.load("http://foo.com/hello.js");
var CREATURE_URL_LIST = "http://jsbin.com/uxukok/latest";

// Load handler
jj.load = function(){
  getScript.apply(null, arguments);
};

// Load the list
getScript(CREATURE_URL_LIST);
