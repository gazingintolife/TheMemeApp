const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true}, () => {
    console.log("Connected to MongoDB")
})

//middlewares

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routes
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/post",postRoute);

app.listen(8080, () => {
    console.log("Back End Server is running");
})