const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// データの元となる設計図作成
// blogデータの属性を3つ設定
const blogSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    snippet : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    }
}, { timestamps : true});

// 設計図をもとにモデルというオブジェクトを作成します。
// オブジェクトには便利メソッドが提供されています。
// mongoDBにblogSchemaをモデルとして登録するmodelメソッドです。
// モデル名は単数形を指定し、mongoDB側で自動で複数形Blogsとして登録されます。
// これでblogSchemaのBlogというオブジェクトが作成されました。
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;