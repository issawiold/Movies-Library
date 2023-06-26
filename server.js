'use strict';
const express = require("express")
const data = require('./Movie Data/data.json')
const cors = require("cors")
const axios = require("axios")
const movieData = data
const pg=require("pg")
const moviesInfo = express()
moviesInfo.use(cors())
moviesInfo.use(express.json())
require("dotenv").config()
const url=process.env.url
const client=new pg.Client(url)
client.connect().then(()=>{
    moviesInfo.listen(3000, newMovie)})

moviesInfo.get('/', renderJSON)
moviesInfo.get("/favorite", favMovie)
moviesInfo.get("/trending", trendingMovie)
moviesInfo.get("/search", searchMovie)
moviesInfo.post("/addMovie", postMovie)
moviesInfo.get("/getMovies", getMovie)




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
function postMovie(req,res){
    let title=req.body.t;
    let date=req.body.d;
    let overview=req.body.o;
    let sql=`insert into movie(title,release_date,overview) values($1,$2,$3,) `
    client.query(sql,[title,date,overview]).then(()=>{res.send(`the movie ${title} has been added to database`)})
}
function getMovie(req,res){
    let sql=`SELECT * FROM movie`
    client.query(sql).then((movieData)=>{res.status(200).send(movieData.rows)})
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

moviesInfo.use("*", function wrongRoute(req, res, next) {
    res.send(new ErrorHandler(404, "page not found error"))
    next()
})

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