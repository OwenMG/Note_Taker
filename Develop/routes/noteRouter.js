const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.get("/notes", (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {

        const notes = JSON.parse(data);

        res.json(notes);

    })
});

// router.post('/api/notes', (req,res)=>{
//     console.info(`${req.method} request received to add a review`);

//     const { title, text } = req.body;

//     if (title && text) {
//         const newNote = {
//             title,
//             text,
//         };

//         fs.readFile('', 'utf8', (err,data)=>{
//             if (err) {
//                 console.error(err);
//             } else {
//                 const parsedNotes = JSON.parse(data);

//                 parsedNotes.push(newNote);

//                 fs.writeFIle('./db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr)=>
//                 writeErr 
//                 ? console.error(writeErr) 
//                 : console.info("successfully added note")
//                 );
//             };
//         });

//         const response = {
//             status: 'success',
//             body: newNote,
//         };
//         console.log(response);
//         res.status(201).json(response);
//     } else {
//         res.status(500).json('Error posting new note')
//     }
// });

module.exports = router;