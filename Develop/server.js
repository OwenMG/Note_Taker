const express = require('express');
const fs = require('fs');
const { parse } = require('path');
const path = require('path');
const noteData = require("./db/db.json");
const noteRouter = require('./routes/noteRouter.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/api', noteRouter);

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});


app.listen(PORT, ()=>
console.log(`App listening at hhttp://localhost:${PORT}`)
);