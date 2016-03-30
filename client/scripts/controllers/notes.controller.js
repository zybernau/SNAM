angular
    .module('SecureNotes')
    .controller('NotesCtrl', NotesCtrl);

function NotesCtrl($scope, $reactive) {
    $reactive(this).attach($scope);

    this.remove = remove;
    this.copy = copy;
    this.ssg = "";
    this.subscribe('notes');

    this.helpers({
        data() {
            // Meteor.call('searchbyTitle', this.getReactively('ssg'), function(data, err) {
            //     return data;
            // });
            // return data1; 
            // Meteor.call('searchbyTitle', this.getReactively('ssg'), (err, ret) => {
            //     return ret;
            // });
            var clipboard = new Clipboard('.copier');
            if (this.getReactively('ssg') == "")
                return Notes.find({ userId: Meteor.user()._id });
            else
                return Notes.find({ userId: Meteor.user()._id, title: new RegExp('^.*' + this.getReactively('ssg') + '.*$', "i") });
        }
    });
    /// methods
    function remove(note) {
        //this.data.remove(note);
        Meteor.call('deleteNote', note._id, (err, ret) => {
            if (err) return handleError(err);
        });
    }

    function copy(note) {
        // write logic for copying to clipboard.
    }
    function savedSuccess(e) {
        console.log(e);
    }
    function handleError(err) {
        $log.error('profile save error ', err);

        $ionicPopup.alert({
            title: err.reason || 'Save failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }


}