const noteModel = require('../models/NotesModel.js');
//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note
    const newNote = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
    });
    newNote.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the note."
            });
        });
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to returns all note
    noteModel.find()
        .then(notes => {
            res.status(200).send(notes);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to return onlt one note using noteid
    const noteId = req.params.noteId;
    noteModel.findById(noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + noteId
                });
            }
            res.status(200).send(note);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error retrieving note with id " + noteId
            });
        });
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to update the note using noteid
    const noteId = req.params.noteId;
    const updateData = {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
    };
    noteModel.findByIdAndUpdate(noteId, updateData, { new: true, runValidators: true })
        .then(updatedNote => {
            if (!updatedNote) {
                return res.status(404).send({
                    message: "Note not found with id " + noteId
                });
            }
            res.status(200).send(updatedNote);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error updating note with id " + noteId
            });
        });
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to delete the note using noteid
    const noteId = req.params.noteId;
    noteModel.findByIdAndRemove(noteId)
        .then(deletedNote => {
            if (!deletedNote) {
                return res.status(404).send({
                    message: "Note not found with id " + noteId
                });
            }
            res.status(200).send({
                message: "Note deleted successfully!"
            });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error deleting note with id " + noteId
            });
        });
});
