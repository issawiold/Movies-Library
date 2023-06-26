# movies-library - 1.0.0

**Author Name**: Omar

## WRRC
![threeway handshake](https://upload.wikimedia.org/wikipedia/commons/f/f0/Three-way-handshake-example.gif)
![website WRRC](https://ibb.co/JtbpmCZ)
## Overview
the Project is about using a constructor function inside node.js to create an object discribing a movie using node js by uttlizing express package to create a server and render the object in the browser.
## Getting Started
- you'll need to have node js installed on your local machine .
- you'll need to clone the repo using git clone , you can clone even repos that are not yours when they are publicly shared -git clone link-.
- move inside the cloned directory/repo -cd repoName
- type npm i

## Project Features

* ease of access
* can be used offline after installment
* you can now check the latest most trending movie accourding to TMDB
* not only that but you can search for movies using their titles in the entire database of TMDB
* can save you own movies into a data base which would allow you retrieve that list when ever you feel like it . 
## routes
*/* the main website
*/favourite* my favourite page
*/trending* the latest trending movies according to TMDB
*/search* to search for a certain Title please enter ?movieName="the title of the movie you're looking for" directly after your get request , thank you  , and it will search for it in TMDB
*/addMovie* allow you to add a movie to the database by using a json object of t, which stand for title d, which stands for release date and o, which stand for overview 
*/getMovies* allow you to get all the data that has been saved in the database