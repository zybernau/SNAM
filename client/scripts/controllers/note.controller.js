angular
    .module('SecureNotes')
    .controller('NoteCtrl', NoteCtrl);

function NoteCtrl($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);

    this.save = save;
    this.clear = clear;
    let noteId = $stateParams.id;

    this.helpers({
        data() {
            console.log(noteId);
            if (noteId)
                return Notes.findOne({ _id: noteId });
            else
                this.clear();
        }
    });

    function save() {
        // update note. Call server update.
        if (noteId != undefined) {

            Meteor.call('updateNote', noteId, this.data, savedSuccess);
        } else {

            Meteor.call('newNote', this.data);
        }
        //console.log(Notes[this.noteId]);
    }

    function clear() {
        if (this.data) {
            this.data.title = "";
            this.data.note = "";
        }
    }
    function savedSuccess(e, cnt) {
        if (e)
            console.log("Error: " + e);
        if (cnt)
            console.log("Success: " + cnt);
    }
}