const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    noteTitle: String,
    noteDescription: String,
    priority: {
        type: String,
        default: 'Low'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: Date
});

module.exports = mongoose.model('Note', NoteSchema);
