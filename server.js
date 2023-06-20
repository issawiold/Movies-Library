'use strict';
const express = require("express")
const data=require('./Movie Data/data.json')
const cors=require("cors")
const constructors=require("./constructors")
const functions=require("./functions")
const movieData=JSON.parse(data)

moviesInfo.use(cors())
const moviesInfo = express()

moviesInfo.listen(3000, newMovie)

moviesInfo.get('/', renderJSON)
moviesInfo.get("/favorite", favMovie)

moviesInfo.get("*",function wrongRoute(req, res) {
    res.send(new ErrorHandler(404,"page not found error"))
   
})

moviesInfo.use(function(err, req, res) {
    res.status(err.status || 500);
    res.send(new ErrorHandler(500,"Sorry, something went wrong"))
})

//were placed in the constructors.js
// function MovieConstructor(title, img, overview) {
//     this.title = title;
//     this.poster_path = img;
//     this.overview = overview;
// }

// function ErrorHandler(status,text) {
//     this.status=status;
//     this.responseText=text;
// }

//----------------*****-------------------//

//were placed in functions.js
// function newMovie(req, res) {
//     console.log("welcome to our server");
// }

// function renderJSON(req, res) {
//     res.send(new MovieConstructor(movieData.title, movieData.poster_path, movieData.overview))
// }

// function favMovie(req, res) {
//     res.send("Welcome to Favorite Page")
// }








