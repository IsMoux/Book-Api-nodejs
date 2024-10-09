const express = require("express");
const bookPath= require("./routes/books");
const authorPath= require("./routes/authors");
const authPath= require("./routes/auth");
const passwordPath= require("./routes/pasword");
const userspath=require("./routes/users");
const uploaddPath= require("./routes/upload");
const mongoose = require("mongoose");
const dotenv= require("dotenv").config();
const logger=require("./middlewares/logger");
const {notfound,errorhandler}=require("./middlewares/erros");    
const connectToDB = require("./config/db.JS");
const path = require("path")


// connection to database
connectToDB();


// init app
const app = express();

// static folder
app.use(express.static(path.join(__dirname,"images")))

// apply midlewares 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger);

app.set('view engine','ejs'); 

//ROUTER

app.use("/api/books",bookPath);
app.use("/password",passwordPath);
app.use("/api/authors",authorPath);
app.use("/api/auth",authPath);
app.use("/api/users",userspath);
app.use("/api/upload",uploaddPath)

// error handler middlewares

app.use(notfound);
app.use(errorhandler);

// listen sur le port
const port =process.env.PORT;
app.listen(port , ()=>console.log(`server is running in procees  ${port}`)); 