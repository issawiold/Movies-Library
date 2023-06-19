function newMovie(req, res) {
    console.log("welcome to our server");
}

function renderJSON(req, res) {
    res.send(new MovieConstructor(movieData.title, movieData.poster_path, movieData.overview))
}

function favMovie(req, res) {
    res.send("Welcome to Favorite Page")
}
module.exports={
    newMovie,renderJSON,favMovie
}