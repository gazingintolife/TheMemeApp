const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    comment: {
        type: Array,
        default: []
    },
    linkedTo: {
        type: String,
        default: ''
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Post", PostSchema);