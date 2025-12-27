"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let character = [
  { id:1, name:"モンキー・D・ルフィ", devil_fruit:"ヒトヒトの実", bounty:"30億ベリー", affiliation:"麦わらの一味"},
  { id:2, name:"トニートニー・チョッパー", devil_fruit:"ヒトヒトの実", bounty:"1000ベリー", affiliation:"麦わらの一味"},
  { id:3, name:"トラファルガー・ロー", devil_fruit:"オペオペの実", bounty:"30億ベリー", affiliation:"ハートの海賊団"},
  { id:4, name:"シャンクス", devil_fruit:"なし", bounty:"40億4890万ベリー", affiliation:"赤髪海賊団"},
  { id:5, name:"ジュエリー・ボニー", devil_fruit:"トシトシの実", bounty:"3億2000万ベリー", affiliation:"ボニー海賊団"},
  { id:6, name:"ユースタス・キッド", devil_fruit:"ジキジキの実", bounty:"30億ベリー", affiliation:"キッド海賊団"},
  { id:7, name:"カイドウ", devil_fruit:"ウオウオの実", bounty:"46億1110万ベリー", affiliation:"百獣海賊団"},
];


app.get("/onepiece", (req, res) => {
 
  res.render('onepiece', {data: character} );
});


app.get("/create", (req, res) => {
  res.render('onepiece_create'); 
});


app.get("/detail/:number", (req, res) => {

  const number = req.params.number;
  const detail = character [ number ];
  res.render('onepiece_detail', {data: detail, idx: number} );
});


app.get("/delete/:number", (req, res) => {
 
  character.splice( req.params.number, 1 );
  res.render('onepiece', {data: character, message: "削除しました！"} );
});


app.post("/create", (req, res) => {

  const id = character.length + 1;
  const name = req.body.name;
  const devil_fruit = req.body.devil_fruit;
  const bounty = req.body.bounty;
  const affiliation = req.body.affiliation;
  character.push( { id: id, name: name, devil_fruit: devil_fruit, bounty: bounty, affiliation: affiliation } );
  console.log( character );
  res.render('onepiece', {data: character, message: "新しく登録しました！"} );
});


app.get("/edit/:number", (req, res) => {

  const number = req.params.number;
  const detail = character[ number ];
  res.render('onepiece_edit', {idx: number, data: detail} );
});


app.post("/update/:number", (req, res) => {
  character[req.params.number].name = req.body.name;
  character[req.params.number].devil_fruit = req.body.devil_fruit;
  character[req.params.number].bounty = req.body.bounty;
  character[req.params.number].affiliation = req.body.affiliation;
  console.log( character );
  res.render('onepiece', {data: character, message: "編集しました！"} );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
