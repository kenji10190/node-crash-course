const express = require("express");
// Router object
const router = express.Router();
const blogController = require("../controllers/blogController");

// ここにあるルーティングはすべて頭に/blogsがついているリクエストです。

router.get("/", blogController.blog_index);

// 新規ブログのデータベースへの保存
router.post("/", blogController.blog_create_post);

// 作成フォームへのルート
router.get("/create", blogController.blog_create_get);

// ここでのidは動的urlです。idではなくnumでもokです。
router.get("/:id", blogController.blog_details);

// delete
router.delete("/:id", blogController.blog_delete);

module.exports = router;