'use strict';
const express = require("express")
const data = require('./Movie Data/data.json')
const cors = require("cors")
const axios = require("axios")
const movieData = data

const moviesInfo = express()
moviesInfo.use(cors())

require("dotenv").config()


moviesInfo.listen(3000, newMovie)
moviesInfo.get('/', renderJSON)
moviesInfo.get("/favorite", favMovie)
moviesInfo.get("/trending", trendingMovie)
moviesInfo.get("/search", searchMovie)
moviesInfo.get("/nowPlaying", nowPlaying)
moviesInfo.get("/upcoming", upcoming)


moviesInfo.use("*", function wrongRoute(req, res, next) {
    res.send(new ErrorHandler(404, "page not found error"))
    next()
})

moviesInfo.use(function (err, req, res, next) {
    res.status(500).send(new ErrorHandler(500, "Sorry, something went wrong"))
})

function newMovie(req, res) {
    console.log("welcome to our server");
}

function renderJSON(req, res) {
    res.send(new MovieConstructor(movieData.id, movieData.title, movieData.release_date, movieData.poster_path, movieData.overview))
}

function favMovie(req, res) {
    res.send("Welcome to Favorite Page")
}
async function trendingMovie(req, res) {

    let trending = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.key}&language=en-US`)
    // let trendingMovie1=JSON.parse(trending)
    // console.log(trendingMovie1);
    let trendingMovie = trending.data.results
    let arr = []
    trendingMovie.forEach(e => { arr.push(new MovieConstructor(e.id, e.title, e.release_date, e.poster_path, e.overview)) })
    res.status(200).send(arr)
}
async function searchMovie(req, res) {
    let userData = req.query
    let search = userData.movieName
    let movieSearch = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.key}&language=en-US&query=${search}`)
    let movieSearch1 = movieSearch.data.results
    console.log(movieSearch1)
    let arr1 = []
    movieSearch1.forEach(e => { arr1.push(new MovieConstructor(e.id, e.title, e.release_date, e.poster_path, e.overview)) });
    res.status(200).send(arr1)

}

async function nowPlaying(req, res) {

    let playing = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US`)
    // let trendingMovie1=JSON.parse(trending)
    // console.log(trendingMovie1);
    let playingMovie = playing.data.results
    let arr = []
    playingMovie.forEach(e => { arr.push(new MovieConstructor(e.id, e.title, e.release_date, e.poster_path, e.overview)) })
    res.status(200).send(arr)
}

async function upcoming(req, res) {

    let upcoming = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?&language=en-US`)
    // let trendingMovie1=JSON.parse(trending)
    // console.log(trendingMovie1);
    let upcomingMovie = upcoming.data.results
    let arr = []
    upcomingMovie.forEach(e => { arr.push(new MovieConstructor(e.id, e.title, e.release_date, e.poster_path, e.overview)) })
    res.status(200).send(arr)
}
function MovieConstructor(id, title, date, img, overview) {
    this.id = id;
    this.title = title;
    this.release_date = date;
    this.poster_path = img;
    this.overview = overview;
}

function ErrorHandler(status, text) {
    this.status = status;
    this.responseText = text;
}