const express = require('express');
const Note = require('../models/NotesModel.js');
const router = express.Router();

// Create a new Note
router.post('/', (req, res) => {
    console.log('Received POST request:', req.body);
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description cannot be empty"
        });
    }

    const newNote = new Note({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || 'Low'
    });

    newNote.save()
        .then(data => res.status(201).send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while creating the note."
        }));
});

// Retrieve all Notes
router.get('/', (req, res) => {
    Note.find()
        .then(notes => res.status(200).send(notes))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        }));
});

// Retrieve a single Note with noteId
router.get('/:noteId', (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.status(200).send(note);
        })
        .catch(err => res.status(500).send({
            message: err.message || "Error retrieving note with id " + req.params.noteId
        }));
});

// Update a Note with noteId
router.put('/:noteId', (req, res) => {
    if (!req.body.noteTitle && !req.body.noteDescription && !req.body.priority) {
        return res.status(400).send({
            message: "At least one field must be updated"
        });
    }

    Note.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: Date.now(),
    }, { new: true })
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(200).send(note);
    })
    .catch(err => res.status(500).send({
        message: err.message || "Error updating note with id " + req.params.noteId
    }));
});

// Delete a Note with noteId
router.delete('/:noteId', (req, res) => {
    Note.findByIdAndDelete(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.status(200).send({
                message: "Note deleted successfully!"
            });
        })
        .catch(err => res.status(500).send({
            message: err.message || "Could not delete note with id " + req.params.noteId
        }));
});

module.exports = router;
