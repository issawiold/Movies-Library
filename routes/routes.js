const express =require('express')
const Router=express.Router()
const {queryHandler1,queryHandler2}=require("../functions")

Router.get('/',queryHandler1)
Router.get("/favorite", queryHandler1)
Router.get("/trending", queryHandler1)
Router.get("/search", queryHandler1)
Router.get("/getMovies", queryHandler1)
Router.post("/addMovie", queryHandler2)
Router.delete("/DELETE/:id", queryHandler2)
Router.put("/UPDATE/:id", queryHandler2)
Router.get("/getMovies/:id", queryHandler2)



module.exports=Router;

