"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];


// 一覧
app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

// Read
app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {id: number, data: detail} );
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});




app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

// ==========================================
// 課題アプリ1：サカナクション
// ==========================================

// データ保存用変数
let sakanaList = [
  { id:1, name:"新宝島", album:"魚図鑑", type:"Live Ver.", detail:"アンコール1曲目" },
  { id:2, name:"アイデンティティ", album:"kikUUiki", type:"Original", detail:"盛り上がり" },
  { id:3, name:"ミュージック", album:"sakanaction", type:"Remix", detail:"照明演出あり" },
];

// 1. 一覧表示 (Read List)
app.get("/sakana", (req, res) => {
  res.render('sakana', {data: sakanaList} );
});

// 2. 新規登録フォームの表示 (Create Form)
app.get("/sakana/create", (req, res) => {
  res.redirect('/public/sakana_new.html');
});

// 3. 新規登録処理 (Create Execute)
app.post("/sakana", (req, res) => {
  const id = sakanaList.length + 1; // IDは簡易的に付与
  const name = req.body.name;
  const album = req.body.album;
  const type = req.body.type;
  const detail = req.body.detail;

  // 配列に追加
  sakanaList.push( { id: id, name: name, album: album, type: type, detail: detail } );
  res.render('sakana', {data: sakanaList} );
});

// 4. 詳細表示 (Read Detail)
app.get("/sakana/:number", (req, res) => {
  const number = req.params.number;
  // データがあるかチェック（エラー回避）
  if (sakanaList[number]) {
      res.render('sakana_detail', {id: number, data: sakanaList[number]} );
  } else {
      res.send("データが見つかりません");
  }
});

// 5. 削除処理 (Delete)
app.get("/sakana/delete/:number", (req, res) => {
  if (sakanaList[req.params.number]) {
      sakanaList.splice( req.params.number, 1 );
  }
  res.redirect('/sakana' );
});

// 6. 編集フォーム表示 (Edit Form)
app.get("/sakana/edit/:number", (req, res) => {
  const number = req.params.number;
  if (sakanaList[number]) {
      res.render('sakana_edit', {id: number, data: sakanaList[number]} );
  } else {
      res.redirect('/sakana');
  }
});

// 7. 更新処理 (Update Execute)
app.post("/sakana/update/:number", (req, res) => {
  const target = sakanaList[req.params.number];
  if (target) {
      target.name = req.body.name;
      target.album = req.body.album;
      target.type = req.body.type;
      target.detail = req.body.detail;
  }
  res.redirect('/sakana' );
});

// ==========================================
// 課題アプリ2：筋トレ種目（Weight Training）
// ==========================================

// データ保存用変数
let muscleList = [
  { id:1, name:"スクワット", part:"脚・全体", difficulty:"High", description:"キング・オブ・エクササイズ" },
  { id:2, name:"ベンチプレス", part:"胸", difficulty:"Mid", description:"厚い胸板を作る" },
  { id:3, name:"デッドリフト", part:"背中・ハム", difficulty:"High", description:"身体の裏側を鍛える" },
];

// 1. 一覧表示 (Read List)
app.get("/muscle", (req, res) => {
  res.render('muscle', {data: muscleList} );
});

// 2. 新規登録フォームの表示 (Create Form)
app.get("/muscle/create", (req, res) => {
  res.redirect('/public/muscle_new.html');
});

// 3. 新規登録処理 (Create Execute)
app.post("/muscle", (req, res) => {
  const id = muscleList.length + 1;
  const name = req.body.name;
  const part = req.body.part;
  const difficulty = req.body.difficulty;
  const description = req.body.description;

  // 配列に追加
  muscleList.push( { id: id, name: name, part: part, difficulty: difficulty, description: description } );
  res.render('muscle', {data: muscleList} );
});

// 4. 詳細表示 (Read Detail)
app.get("/muscle/:number", (req, res) => {
  const number = req.params.number;
  if (muscleList[number]) {
      res.render('muscle_detail', {id: number, data: muscleList[number]} );
  } else {
      res.send("データが見つかりません");
  }
});

// 5. 削除処理 (Delete)
app.get("/muscle/delete/:number", (req, res) => {
  if (muscleList[req.params.number]) {
      muscleList.splice( req.params.number, 1 );
  }
  res.redirect('/muscle' );
});

// 6. 編集フォーム表示 (Edit Form)
app.get("/muscle/edit/:number", (req, res) => {
  const number = req.params.number;
  if (muscleList[number]) {
      res.render('muscle_edit', {id: number, data: muscleList[number]} );
  } else {
      res.redirect('/muscle');
  }
});

// 7. 更新処理 (Update Execute)
app.post("/muscle/update/:number", (req, res) => {
  const target = muscleList[req.params.number];
  if (target) {
      target.name = req.body.name;
      target.part = req.body.part;
      target.difficulty = req.body.difficulty;
      target.description = req.body.description;
  }
  res.redirect('/muscle' );
});

// ==========================================
// 課題アプリ3：メイドインアビス キャラクターリスト
// ==========================================

// データ保存用変数
let abyssList = [
  { id:1, name:"リコ", rank:"赤笛→白笛", feature:"水晶板（ディパジー）", depth:"深界六層" },
  { id:2, name:"レグ", rank:"干渉器", feature:"火葬砲（インシネレーター）", depth:"不明" },
  { id:3, name:"ナナチ", rank:"成れ果て", feature:"力場が見える", depth:"深界四層" },
  { id:4, name:"ボンドルド", rank:"白笛", feature:"精神隷属機（ゾアホリック）", depth:"深界五層" },
  { id:5, name:"ファプタ", rank:"成れ果ての姫", feature:"不滅", depth:"深界六層" },
];

// 1. 一覧表示 (Read List)
app.get("/abyss", (req, res) => {
  res.render('abyss', {data: abyssList} );
});

// 2. 新規登録フォームの表示 (Create Form)
app.get("/abyss/create", (req, res) => {
  res.redirect('/public/abyss_new.html');
});

// 3. 新規登録処理 (Create Execute)
app.post("/abyss", (req, res) => {
  const id = abyssList.length + 1;
  const name = req.body.name;
  const rank = req.body.rank;
  const feature = req.body.feature;
  const depth = req.body.depth;

  // 配列に追加
  abyssList.push( { id: id, name: name, rank: rank, feature: feature, depth: depth } );
  res.render('abyss', {data: abyssList} );
});

// 4. 詳細表示 (Read Detail)
app.get("/abyss/:number", (req, res) => {
  const number = req.params.number;
  if (abyssList[number]) {
      res.render('abyss_detail', {id: number, data: abyssList[number]} );
  } else {
      res.send("度し難い…データが見つかりません");
  }
});

// 5. 削除処理 (Delete)
app.get("/abyss/delete/:number", (req, res) => {
  if (abyssList[req.params.number]) {
      abyssList.splice( req.params.number, 1 );
  }
  res.redirect('/abyss' );
});

// 6. 編集フォーム表示 (Edit Form)
app.get("/abyss/edit/:number", (req, res) => {
  const number = req.params.number;
  if (abyssList[number]) {
      res.render('abyss_edit', {id: number, data: abyssList[number]} );
  } else {
      res.redirect('/abyss');
  }
});

// 7. 更新処理 (Update Execute)
app.post("/abyss/update/:number", (req, res) => {
  const target = abyssList[req.params.number];
  if (target) {
      target.name = req.body.name;
      target.rank = req.body.rank;
      target.feature = req.body.feature;
      target.depth = req.body.depth;
  }
  res.redirect('/abyss' );
});