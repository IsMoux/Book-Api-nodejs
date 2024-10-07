const express = require("express");
const bookPath= require("./routes/books");
const authorPath= require("./routes/authors");
const authPath= require("./routes/auth");
const userspath=require("./routes/users");
const mongoose = require("mongoose");
const dotenv= require("dotenv").config();
const logger=require("./middlewares/logger");
const {notfound,errorhandler}=require("./middlewares/erros");    
const connectToDB = require("./config/db.JS");



// connection to database
connectToDB();


// init app
const app = express();

// apply midlewares 

app.use(express.json());
app.use(logger);

//ROUTER

app.use("/api/books",bookPath);
app.use("/api/authors",authorPath);
app.use("/api/auth",authPath);
app.use("/api/users",userspath);

// error handler middlewares

app.use(notfound);
app.use(errorhandler);

// listen sur le port
const port =process.env.PORT;
app.listen(port , ()=>console.log(`server is running in procees  ${port}`)); 