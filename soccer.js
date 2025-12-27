"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let player = [
  { id:1, name:"三笘薫", position:"ミッドフィールダー", market_value:"3500万ユーロ", club:"ブライトン・アンド・ホーヴ・アルビオンFC"},
  { id:2, name:"久保建英", position:"ミッドフィールダー", market_value:"3000万ユーロ", club:"レアル・ソシエダ"},
  { id:3, name:"遠藤航", position:"ミッドフィールダー", market_value:"800万ユーロ", club:"リヴァプールFC"},
  { id:4, name:"守田英正", position:"ミッドフィールダー", market_value:"1100万ユーロ", club:"スポルティングCP"},
  { id:5, name:"冨安健洋", position:"ディフェンダー", market_value:"1600万ユーロ", club:"アヤックス・アムステルダム"},
  { id:6, name:"伊東純也", position:"フォワード", market_value:"500万ユーロ", club:"KRCヘンク"},
  { id:7, name:"古橋亨梧", position:"フォワード", market_value:"800万ユーロ", club:"バーミンガム・シティFC"},
];


app.get("/soccer", (req, res) => {
 
  res.render('soccer', {data: player} );
});


app.get("/create", (req, res) => {
  res.render('soccer_create'); 
});


app.get("/detail/:number", (req, res) => {

  const number = req.params.number;
  const detail = player [ number ];
  res.render('soccer_detail', {data: detail, idx: number} );
});


app.get("/delete/:number", (req, res) => {
 
  player.splice( req.params.number, 1 );
  res.render('soccer', {data: player, message: "削除しました！"} );
});


app.post("/create", (req, res) => {

  const id = player.length + 1;
  const name = req.body.name;
  const position = req.body.position;
  const market_value = req.body.market_value;
  const club = req.body.club;
  player.push( { id: id, name: name, position: position, market_value: market_value, club: club } );
  console.log( player );
  res.render('soccer', {data: player, message: "新しく登録しました！"} );
});


app.get("/edit/:number", (req, res) => {

  const number = req.params.number;
  const detail = player[ number ];
  res.render('soccer_edit', {idx: number, data: detail} );
});


app.post("/update/:number", (req, res) => {
  player[req.params.number].name = req.body.name;
  player[req.params.number].position = req.body.position;
  player[req.params.number].market_value = req.body.market_value;
  player[req.params.number].club = req.body.club;
  console.log( player );
  res.render('soccer', {data: player, message: "編集しました！"} );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
