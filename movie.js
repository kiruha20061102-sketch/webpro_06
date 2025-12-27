"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let movie = [
  { id:1, title:"君の名は。", genre:"ファンタジー", income:"250.3億円", director:"新海誠"},
  { id:2, title:"鬼滅の刃（無限列車編）", genre:"アクション", income:"407.5億円", director:"外崎春雄"},
  { id:3, title:"アナと雪の女王", genre:"ファンタジー", income:"255億円", director:"クリス・バックとジェニファー・リー"},
  { id:4, title:"国宝", genre:"人間ドラマ", income:"173億円", director:"李相日"},
  { id:5, title:"君の膵臓をたべたい", genre:"ラブロマンス", income:"35.2億円", director:"月川翔"},
  { id:6, title:"グランメゾン・パリ", genre:"人間ドラマ", income:"42億円", director:"塚原あゆ子"},
  { id:7, title:"ズートピア2", genre:"ファンタジー", income:"133億", director:"ジャレド・ブッシュとバイロン・ハワード"},
];


app.get("/movie", (req, res) => {

  res.render('movie', {data: movie} );
});


app.get("/create", (req, res) => {
  res.render('movie_create'); 
});


app.get("/detail/:number", (req, res) => {
  const number = req.params.number;
  const detail = movie [ number ];
  res.render('movie_detail', {data: detail, idx: number} );
});


app.get("/delete/:number", (req, res) => {

  movie.splice( req.params.number, 1 );
  res.render('movie', {data: movie, message: "削除しました！"} );
});


app.post("/create", (req, res) => {
  const id = movie.length + 1;
  const title = req.body.title;
  const genre = req.body.genre;
  const income = req.body.income;
  const director = req.body.director;
  movie.push( { id: id, title: title, genre: genre, income: income, director: director } );
  console.log( movie );
  res.render('movie', {data: movie, message: "新しく登録しました！"} );
});


app.get("/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = movie[ number ];
  res.render('movie_edit', {idx: number, data: detail} );
});


app.post("/update/:number", (req, res) => {

  movie[req.params.number].title = req.body.title;
  movie[req.params.number].genre = req.body.genre;
  movie[req.params.number].income = req.body.income;
  movie[req.params.number].director = req.body.director;
  console.log( movie );
  res.render('movie', {data: movie, message: "編集しました！"} );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
