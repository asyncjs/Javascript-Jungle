(function(){
    function hasSearchParam(param, value){
        var pattern = "^[\?&]" + param + 
            (typeof value === "undefined" ? "($|[=&])" : "=" + value + "($|&)");
        return (new RegExp(pattern)).test(window.location.search);
    }

    if (!hasSearchParam("dev")){
      jj.load(
        'https://raw.github.com/gist/1204436/',
        'https://raw.github.com/gist/1204505/',
        'https://raw.github.com/gist/1204620/', // butterfly_colmjude.js
        'https://raw.github.com/gist/1204683/', // happygiraffe.js,
        'https://raw.github.com/gist/1204698/', // happydog.js
        'https://raw.github.com/gist/1204788/', // birds.js
        'https://raw.github.com/gist/1204932/', // toucan @rakugojon
        'https://raw.github.com/gist/1206090/', // ufo @JimPurbrick
        'https://raw.github.com/gist/1208781/'  //rakugojon
      );
    }
}());
