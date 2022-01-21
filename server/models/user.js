const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        min:5,
        max:15,
        unique:true
    },
    email: {
        type:String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min:6,
    },
    profilePicture:{
        type: String,
        default:""
    },
    memeBio: {
        type: Array,
        default: []
    },
    profileBio: {
        type: String,
        default: "",
        max: 248
    },
    followers:{
        type: Array,
        default: []
    },
    following:{
        type: Array,
        default: []
    },
    city: {
        type: String,
        default: "",
        max: 50
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);