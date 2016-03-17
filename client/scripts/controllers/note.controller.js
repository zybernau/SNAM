angular
    .module('SecureNotes')
    .controller('NoteCtrl', NoteCtrl);
    
function NoteCtrl($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    
    this.save = save;
    
    let noteId = $stateParams.id;
console.log(noteId);
    this.helpers({
        data() {
            return Notes.findOne(noteId);
        },
    });
    
    function save() {
        // update note.
        console.log(Notes[noteId]);
    }
}