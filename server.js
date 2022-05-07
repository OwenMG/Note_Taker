const express = require('express');
const fs = require('fs');
const { parse } = require('path');
const path = require('path');
const noteRouter = require('./routes/noteRouter.js');
// importing necessary modules

// sets port to listen
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/api', noteRouter);
// serves data for use by index.js

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
// serves index html page

app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
// serves notes html page

app.listen(PORT, ()=>
console.log(`App listening at hhttp://localhost:${PORT}`)
);
// initializes server on specified port