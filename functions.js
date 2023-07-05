
const axios=require("axios")
const {MovieConstructor}=require("./constructors")
const client=require("./client")
const data = require('./Movie Data/data.json')
const movieData = data
const {key}=require("./configs")


async function queryHandler1(req, res,next) {
    try {
        
   
    if (req.url === "/") {
        await res.send(new MovieConstructor(movieData.id, movieData.title, movieData.release_date, movieData.poster_path, movieData.overview))
    }
    else if (req.url === "/favorite") {
        await res.send("Welcome to Favorite Page")

    }
    else if (req.url === "/trending") {

        let trending = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=en-US`)
        // let trendingMovie1=JSON.parse(trending)
        // console.log(trendingMovie1);
        let trendingMovie = trending.data.results
        let arr = []
        trendingMovie.forEach(e => { arr.push(new MovieConstructor(e.id, e.title, e.release_date, e.poster_path, e.overview)) })
        res.status(200).send(arr)
    }
    else if (req.url === "/search") {
        let userData = req.query
        let search = userData.movieName
        let movieSearch = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${search}`)
        let movieSearch1 = movieSearch.data.results
        console.log(movieSearch1)
        let arr1 = []
        movieSearch1.forEach(e => { arr1.push(new MovieConstructor(e.id, e.title, e.release_date, e.poster_path, e.overview)) });
        res.status(200).send(arr1)

    }
    else if (req.url === "/getMovies") {
        let sql = `SELECT * FROM movie`
        await client.query(sql).then((movieData) => { res.status(200).send(movieData.rows) })
    
}
} catch (e) {
    next(`${req.url} using request ${req.method} ${e}`)  
      
}
}
async function queryHandler2(req, res,next) {
    try{
    if (req.method === "GET") {
        const { id } = req.params
        const sql = `SELECT * FROM movie WHERE id=$1`

        await client.query(sql, [id]).then((movieData) => { res.status(200).send(movieData.rows[0]) })
    }
    else if (req.method === "DELETE") {
        const { id } = req.params
        const sql = `DELETE FROM movie WHERE id=$1`

        await client.query(sql, [id]).then((movieData) => { res.status(200).send(movieData.rows[0]) })


    }
    else if (req.method === "PUT") {
        const { id } = req.params
        let title = req.body.t;
        let date = req.body.d;
        let overview = req.body.o;
        let sql = `UPDATE Movie SET title=$2,release_date=$3,overview=$4 WHERE id=$1`

        await client.query(sql, [id, title, date, overview]).then((movieData) => { res.status(200).send(movieData.rows[0]) })

    }
    else if (req.method === "POST") {
        let title = req.body.t;
        let date = req.body.d;
        let overview = req.body.o;
        let sql = `INSERT INTO movie(title,release_date,overview) VALUES($1,$2,$3) `
        await client.query(sql, [title, date, overview]).then(() => { res.send(`the movie ${title} has been added to database`) })

    }}
    catch(e){
        next(`${req.url} using request ${req.method} ${e}`)  
    }
};
module.exports={queryHandler1,queryHandler2}