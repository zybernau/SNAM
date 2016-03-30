angular
    .module('SecureNotes')
    .controller('NoteCtrl', NoteCtrl);

function NoteCtrl($scope, $reactive, $stateParams, $state, $timeout, $ionicPopup, $log) {
    $reactive(this).attach($scope);

    this.save = save;
    this.clear = clear;
    this.sendPicture = sendPicture;
    this.hasPicture = false;
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

            Meteor.call('updateNote', noteId, this.data, (err, ret) => {
                if (err) return handleError(err);
            });
        } else {

            Meteor.call('newNote', this.data, (err, ret) => {
                if (err) return handleError(err);
            });
        }
        this.clear();
        $state.go('tab.notes');
        //console.log(Notes[this.noteId]);
    }
    function sendPicture() {
        MeteorCameraUI.getPicture({}, (err, data) => {
            if (err && err.error == 'cancel') return;
            if (err) return handleError(err);
            this.data.picture = data;
            if (noteId != undefined) {
                
                Meteor.call('updateNote', noteId, this.data, (err, ret) => {
                    if (err) return handleError(err);
                });
            } else {

                Meteor.call('newNote', this.data, (err, ret) => {
                    if (err) return handleError(err);
                });
            }
        });
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
    function handleError(err) {
        $log.error('profile save error ', err);

        $ionicPopup.alert({
            title: err.reason || 'Save failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }
}