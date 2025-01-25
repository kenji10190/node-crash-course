const express = require("express");
const morgan = require("morgan")
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

// これだけでサーバーが作成されます。
const app = express();

// connection to mongoDB 
const dbURI = "mongodb+srv://user001:mongodb1234@nodetuts.ckfk3.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts";
mongoose.connect(dbURI)
    // databaseへの接続が確立してから、リクエスト受付開始をしたいため、ここでlistenします。
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
// app.setメソッドでアプリ全体の設定をすることができます。
// 今回はview engineとしてejsを設定するという意味です。
app.set("view engine", "ejs");

// 静的ファイルへのアクセスを許可するメソッドです。
// これがないとサーバー側が静的ファイルへのアクセスを許可しません。
// app.getのようなレスポンスとして静的ファイルを返すように、
// サーバー上で定義されているのは許可されますが、それ以外のアクセスは許可されません。
app.use(express.static("public"));
// 上記のログ出力の変わりにmorganというpackageがある
app.use(morgan("dev"));
// post, putメソッドで送信されているデータをURLから取得するメソッドです。
app.use(express.urlencoded({extended : true}));

// リクエストがgetの場合で、以下のパスの場合
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    // res.sendFile("./views/about.html", {root: __dirname});
    res.render("about", {title: "About"});
})

// blogsルーティング集約
// /blogsから始まるリクエストはここに来ます。
app.use("/blogs", blogRoutes);

// 404
// このメソッドは簡単に言えば、use this functionという意味で
// コードが上から実行され、ここまで到達したときに実行され、
// これ以降は実行されないというメソッドになります。
app.use((req, res) => {
    // statusメソッドを使用することで、エラーであることを正しく処理し、
    // そのあとにhtmlファイルをレスポンスするようにします。
    // statusはオブジェクトを返していますので、チェーンができます。
    res.status(404).render("404", {title: "404"});
})
