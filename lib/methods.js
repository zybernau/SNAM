Meteor.methods({
    
    // update note
    // save note
    newNote(note) {
        // time stamp
        note.lastUpdatedtime = new Date();
        Notes.insert(note);
    }
});