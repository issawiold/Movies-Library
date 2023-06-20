function MovieConstructor(title, img, overview) {
    this.title = title;
    this.poster_path = img;
    this.overview = overview;
}

function ErrorHandler(status,text) {
    this.status=status;
    this.responseText=text;
}
module.exports={
    MovieConstructor,ErrorHandler
}