angular
    .module('SecureNotes')
    .controller('NotesCtrl', NotesCtrl);

function NotesCtrl($scope, $reactive) {
    $reactive(this).attach($scope);

    this.remove = remove;
    this.copy = copy;  
    this.ssg = "";
    this.helpers({
        data() {
            // Meteor.call('searchbyTitle', this.getReactively('ssg'), function(data, err) {
            //     return data;
            // });
            // return data1; 
            if (this.getReactively('ssg') == "")
                return Notes.find();
            else
                return Notes.find({ title: new RegExp('^.*' + this.getReactively('ssg') + '.*$', "i") });
        }
    });
    /// methods
    function remove(note) { 
        //this.data.remove(note);
        Meteor.call('deleteNote', note._id, savedSuccess);
    }

    function copy(note) {
        // write logic for copying to clipboard.
    }
    function savedSuccess(e) {
        console.log(e);
    }

  
}