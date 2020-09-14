let express=require("express")
const postRouter = new express.Router();
// POST Routes

const {createPost,updatePost,deletePost,getPost } = require("../controller/postController");
postRouter.post("/", createPost);
// read  => GET ONE 
postRouter.route("/:post_id").get(getPost).patch(updatePost).delete(deletePost);
module.exports = postRouter;