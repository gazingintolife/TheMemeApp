const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");

//CREATE a post
router.post("/", async (req,res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch (err){
        res.status(500).json(err);
    }
});

//UPDATE a post
router.put("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if ( post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("The post has been updated");
        }else {
            res.status(403).json("You can only update your own posts");
        }
    }catch (err) {
        res.status(500).json(err);
    }
})

//DELETE a post
router.delete("/:id", async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await Post.deleteOne(req.body._id)
            res.status(200).json("post deleted")
        }else {
            res.status(403).json("You can only delete your own posts");
        }
    }catch (err){
        res.status(500).json(err);
    }
})

//LIKE a post
router.put("/:id/like", async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        //check if the post is already liked by the user
        // like the post if not already likes by th user
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("You liked the post");
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("You unliked the post");
        }
    } catch (err){
        res.status(500).json(err);
    }
})

//COMMENT on a post
router.post("/:id/comment", async (req,res) => {
    try{
        const commentPost = await new Post(req.body).save();
        const post = await Post.findById(req.params.id);

        await post.updateOne({$push: {comment: commentPost._id}});
        await commentPost.updateOne({linkedTo: post._id});

        res.status(200).json("Comment Added")
    }catch (err) {
        res.status(500).json(err);
    }
})

//GET a post
router.get("/:id", async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch (err) {
        res.status(500).json(err);
    }
});

//GET timeline posts
router.get("/timeline/all", async (req,res) => {
    let postArray = [];
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({userId: friendId});
            })
        );
        res.json(userPosts.concat(...friendPosts)).status(200);
    }catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;