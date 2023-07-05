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

module.exports={
    MovieConstructor,ErrorHandler
}