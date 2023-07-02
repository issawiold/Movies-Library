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
moviesInfo.get("/getMovies", getMovies)
moviesInfo.delete("/DELETE/:id", deleteMovie)
moviesInfo.put("/UPDATE/:id", updateMovie)
moviesInfo.get("/getMovies/:id", getMovie)





moviesInfo.use(function (err, req, res, next) {
    res.status(500).send(new ErrorHandler(500, "Sorry, something went wrong"))
})

async function newMovie(req, res) {
   await console.log("welcome to our server");
}

async function renderJSON(req, res) {
   await res.send(new MovieConstructor(movieData.id, movieData.title, movieData.release_date, movieData.poster_path, movieData.overview))
}

async function favMovie(req, res) {
   await res.send("Welcome to Favorite Page")
}
async function postMovie(req,res){
    let title=req.body.t;
    let date=req.body.d;
    let overview=req.body.o;
    let sql=`INSERT INTO movie(title,release_date,overview) VALUES($1,$2,$3,) `
    await client.query(sql,[title,date,overview]).then(()=>{res.send(`the movie ${title} has been added to database`)})
}
async function getMovies(req,res){
    let sql=`SELECT * FROM movie`
    await client.query(sql).then((movieData)=>{res.status(200).send(movieData.rows)})
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
async function getMovie (req,res){
   const{ id}=req.params
   const sql=`SELECT * FROM movie WHERE id=$1`

   await client.query(sql,[id]).then((movieData)=>{res.status(200).send(movieData.rows[0])})


}
async function getMovie (req,res){
    const{ id}=req.params
    const sql=`SELECT * FROM movie WHERE id=$1`
 
    await client.query(sql,[id]).then((movieData)=>{res.status(200).send(movieData.rows[0])})
 
 
 }

async function deleteMovie (req,res){
    const{ id}=req.params
    const sql=`DELETE FROM movie WHERE id=$1`
 
    await client.query(sql,[id]).then((movieData)=>{res.status(200).send(movieData.rows[0])})
 
 
 }
 
 async function updateMovie (req,res){
    const{ id}=req.params
    let title=req.body.t;
    let date=req.body.d;
    let overview=req.body.o;
    let sql=`UPDATE Movie SET (title,release_date,overview) VALUES($2,$3,$4,) WHERE id=$1 `
 
    await client.query(sql,[id,title,date,overview]).then((movieData)=>{res.status(200).send(movieData.rows[0])})
 
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
