const router = require("express").Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//REGISTER USER
router.post("/register", async (req,res) => {
    try{
        //generate encrypted password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser  = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        //save user and return response
        const user = await newUser.save()
        return res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
    // an instance of a model is a document. document.save() saves the document to the database
})

//LOGIN
router.post("/login", async (req,res) => {
    try{
        //check if user exist with email
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.json("User not found").status(404);
        }

        //check is the password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){
            return res.json("Invalid Password").status(400);
        }

        //return response if user and password matches
        res.json(user).status(200);
    }catch(err) {
        return res.status(500).json(err);
    }
})

module.exports = router;