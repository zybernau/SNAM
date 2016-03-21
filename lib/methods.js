Meteor.methods({

    // update note
    // save note
    newNote(note) {
        // time stamp
        note.lastUpdatedtime = new Date();
        Notes.insert(note);
    },

    updateNote(noteId, data, callback) {
        var conditions = { _id: noteId };
        var data1 = {};
        data1.title = data.title;
        data1.note = data.note;
        data1.lastUpdatedtime = new Date();
        Notes.update(conditions, { $set: data1 }, {}, callback);
    },

    deleteNote(noteId, callback) {
        var conditions = { _id: noteId };
        Notes.remove(conditions, callback);
    },

    searchbyTitle(title) {
        if (title == "")
            return Notes.find();
        else
            return Notes.find({ title: new RegExp('^' + title + '$', "i") });
    }
});