angular
    .module('SecureNotes')
    .controller('NotesCtrl', NotesCtrl);

function NotesCtrl($scope, $reactive) {
    $reactive(this).attach($scope);
    
    this.remove = remove;
    this.copy = copy;
    
    this.helpers({
        data() {
            return Notes.find();
        }
    });
    /// methods
    function remove(note) {
        this.data.remove(note);
    }
    
    function copy(note) {
        // write logic for copying to clipboard.
    }
}