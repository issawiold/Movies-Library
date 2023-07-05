const pg = require("pg");
const {url}=require("./configs");
const client = new pg.Client(url)
module.exports=client
