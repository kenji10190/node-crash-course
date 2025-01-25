// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

// mongoDBを操作できるクラスを持ってくる
const Blog = require("../models/blog");

const blog_index = (req, res) => {
    // -1は降順の意味
    Blog.find().sort({ createdAt : -1 })
        .then((result) => {
            // indexページの方でblogs変数を定義しているので、それに合わせればデータを持ってこれる。
            res.render("blogs/index", { title : "All blogs", blogs : result});
        }).catch((err) => {
            console.log(err);
        })
}

const blog_details = (req, res) => {
    // paramsは動的urlを保持しているオブジェクトです。
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render("blogs/details", { blog : result, title : "Blog Details"});
        }).catch(err => {
            res.status(404).render("404", {title : "Blog not found"});
        })
}

const blog_create_get = (req, res) => {
    res.render("blogs/create", {title: "Create a new blog"});
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => {
        res.redirect("/blogs");
    }).catch((err) => {
        console.log(err);
    })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    console.log(req);
    Blog.findByIdAndDelete(id)
        .then(result => {
            // リクエストがajaxなので、直接リダイレクトできないため、
            // json形式でリダイレクトの情報を渡しています。
            res.json({ redirect : "/blogs"});
        }).catch(err => {
            console.log(err);
        }) 
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}