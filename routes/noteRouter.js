const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
// importing necessary modules

// Sending existing note data to the notes html page
router.get("/notes", (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {

        const notes = JSON.parse(data);

        res.json(notes);

    })
});

// handles post requests for new notes
router.post('/notes', (req,res)=>{
    console.info(`${req.method} request received to add a review`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid.v4(),
        };

        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err,data)=>{
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr)=>
                writeErr 
                ? console.error(writeErr) 
                : console.info("successfully added note")
                );
            };
        });

        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error posting new note')
    }
});

// handles delete request for unnecessary notes
router.delete('/notes/:id', (req,res)=>{
    const selectedNote = req.params.id;
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err,data)=>{
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);

            const updatedNotes = parsedNotes.filter((note)=>note.id!==selectedNote);

            fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, 4), (writeErr)=>
                writeErr 
                ? console.error(writeErr) 
                : console.info("successfully deleted note")
                );
            res.json(`Note ${selectedNote} deleted.`);
        };
    })
})

module.exports = router;