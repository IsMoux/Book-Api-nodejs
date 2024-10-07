const {Book}= require("./models/Book");
const{Author}=require("./models/Author.js")
const {books,authors}=require("./data");
const connectToDB = require("./config/db.js");

require("dotenv").config();

connectToDB();

// import books

const importBooks=async()=>{
    try{
        await Book.insertMany(books)
        console.log("books imported");

    }catch (error){
      console.log(error);
      process.exit(1);
    }
}
// remove Books
const removeBooks=async()=>{
    try{
        await Book.deleteMany(books)
        console.log("books removed");

    }catch (error){
      console.log(error);
      process.exit(1);
    }
}

const importAuthors=async()=>{
    try{
        await Author.insertMany(authors)
        console.log("authors imported");

    }catch (error){
      console.log(error);
      process.exit(1);
    }
}
const removeAuthors=async()=>{
    try{
        await Author.deleteMany(books)
        console.log("authors removed");

    }catch (error){
      console.log(error);
      process.exit(1);
    }
}

if(process.argv[2]==="-import"){
    importBooks();
}else if(process.argv[2]==="-remove"){
    removeBooks();
}else if (process.argv[2]==="-importauthors"){
    importAuthors();
}else if (process.argv[2]==="-removeauthors"){
    removeAuthors();
}