const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');

// UPDATE a user 
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }catch(err){
                return res.status(500).json(err);
            }
        }

        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            return res.status(200).json("Account has been updated");
        }catch(err){
            return res.status(500).json(err);
        }

    }else{
        return res.status(403).json("You can update only your own account")
    }
})

// DELETE a user
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Account has been deleted");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can delete only your own account")
    }
});

// GET a user
router.get("/:id", async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        // leave out password, updatedAT and other undesireable props while getting the user
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    }catch (err) {
        return res.status(500).json(err);
    }
})

// FOLLOW a user
router.put("/:id/follow", async (req,res) => {
    if(req.body.userId !== req.params.id){
        try{
            // the user who is being searched to follow
            const user = await User.findById(req.params.id)
            //the current user who wants to follow
            const currentUser = await User.findById(req.body.userId);
            //if user is not currently following the the person
            if(!user.followers.includes(req.body.userId)){
                //add the current user to searched user's followers
                await user.updateOne({$push: {followers:req.body.userId}});
                //add the searched user to current user's followings
                await currentUser.updateOne({$push: {following:req.params.id}});
                res.status(200).json(`${currentUser.username} You are now following ${user.username}`);
            }else {
                res.status(403).json("You alreay follow this user");
            }
        }catch (err) {
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot follow yourself")
    }
})

// UNFOLLOW a user
router.put("/:id/unfollow", async (req,res) => {
    if(req.body.userId !== req.params.id){
        try{
            // the user who is being searched to follow
            const user = await User.findById(req.params.id)
            //the current user who wants to follow
            const currentUser = await User.findById(req.body.userId);
            //if user is not currently following the person
            if(user.followers.includes(req.body.userId)){
                //add the current user to searched user's followers
                await user.updateOne({$pull: {followers:req.body.userId}});
                //add the searched user to current user's followings
                await currentUser.updateOne({$pull: {following:req.params.id}});
                res.status(200).json(`${currentUser.username} You have unfollowed ${user.username}`);
            }else {
                res.status(403).json("You dont follow this user");
            }
        }catch (err) {
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot unfollow yourself")
    }
})

module.exports = router;