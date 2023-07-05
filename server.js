'use strict';
const express = require("express")
const cors = require("cors")
const pg = require("pg")
const moviesInfo = express()
const errorNotFound=require("./error_handlers/404")
const serverError=require("./error_handlers/500")
const router=require("./routes/routes")
const {port} = require("./configs");
const client=require("./client")
const {ErrorHandler}=require("./constructors")

moviesInfo.use(cors())
moviesInfo.use(express.json())
require("dotenv").config()


// client.connect().then(() => {
//     moviesInfo.listen(process.env.port, newMovie)
// })
client.connect().then(() => {
    moviesInfo.listen(port, newMovie)
})

async function newMovie(req, res) {
    await console.log("welcome to our server");
}
// moviesInfo.get('/', queryHandler1)
// moviesInfo.get("/favorite", queryHandler1)
// moviesInfo.get("/trending", queryHandler1)
// moviesInfo.get("/search", queryHandler1)
// moviesInfo.get("/getMovies", queryHandler1)
// moviesInfo.post("/addMovie", queryHandler2)
// moviesInfo.delete("/DELETE/:id", queryHandler2)
// moviesInfo.put("/UPDATE/:id", queryHandler2)
// moviesInfo.get("/getMovies/:id", queryHandler2)




moviesInfo.use(serverError)
// // moviesInfo.use(function (err, req, res, next) {
// //     res.status(500).send(new ErrorHandler(500, "Sorry, something went wrong"))
// // })
moviesInfo.use(router)
// async function newMovie(req, res) {
//     await console.log("welcome to our server");
// }
// async function queryHandler1(req, res) {
//     if (req.url === "/") {
//         await res.send(new MovieConstructor(movieData.id, movieData.title, movieData.release_date, movieData.poster_path, movieData.overview))
//     }
//     else if (req.url === "/favorite") {
//         await res.send("Welcome to Favorite Page")

//     }
//     else if (req.url === "/trending") {

//         let trending = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.key}&language=en-US`)
//         // let trendingMovie1=JSON.parse(trending)
//         // console.log(trendingMovie1);
//         let trendingMovie = trending.data.results
//         let arr = []
//         trendingMovie.forEach(e => { arr.push(new MovieConstructor(e.id, e.title, e.release_date, e.poster_path, e.overview)) })
//         res.status(200).send(arr)
//     }
//     else if (req.url === "/search") {
//         let userData = req.query
//         let search = userData.movieName
//         let movieSearch = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.key}&language=en-US&query=${search}`)
//         let movieSearch1 = movieSearch.data.results
//         console.log(movieSearch1)
//         let arr1 = []
//         movieSearch1.forEach(e => { arr1.push(new MovieConstructor(e.id, e.title, e.release_date, e.poster_path, e.overview)) });
//         res.status(200).send(arr1)

//     }
//     else if (req.url === "/getMovies") {
//         let sql = `SELECT * FROM movie`
//         await client.query(sql).then((movieData) => { res.status(200).send(movieData.rows) })
//     }
// }
// async function queryHandler2(req, res) {
//     if (req.method === "GET") {
//         const { id } = req.params
//         const sql = `SELECT * FROM movie WHERE id=$1`

//         await client.query(sql, [id]).then((movieData) => { res.status(200).send(movieData.rows[0]) })
//     }
//     else if (req.method === "DELETE") {
//         const { id } = req.params
//         const sql = `DELETE FROM movie WHERE id=$1`

//         await client.query(sql, [id]).then((movieData) => { res.status(200).send(movieData.rows[0]) })


//     }
//     else if (req.method === "PUT") {
//         const { id } = req.params
//         let title = req.body.t;
//         let date = req.body.d;
//         let overview = req.body.o;
//         let sql = `UPDATE Movie SET (title,release_date,overview) VALUES($2,$3,$4) WHERE id=$1 `

//         await client.query(sql, [id, title, date, overview]).then((movieData) => { res.status(200).send(movieData.rows[0]) })

//     }
//     else if (req.method === "POST") {
//         let title = req.body.t;
//         let date = req.body.d;
//         let overview = req.body.o;
//         let sql = `INSERT INTO movie(title,release_date,overview) VALUES($1,$2,$3) `
//         await client.query(sql, [title, date, overview]).then(() => { res.send(`the movie ${title} has been added to database`) })

//     }
// };
moviesInfo.use(errorNotFound)

// moviesInfo.use("*", function wrongRoute(req, res, next) {
//     res.send(new ErrorHandler(404, "page not found error"))
//     next()
// })


// function MovieConstructor(id, title, date, img, overview) {
//     this.id = id;
//     this.title = title;
//     this.release_date = date;
//     this.poster_path = img;
//     this.overview = overview;
// }

// function ErrorHandler(status, text) {
//     this.status = status;
//     this.responseText = text;
// }
