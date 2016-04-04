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
        nd: () => Notes.findOne({ _id: noteId })
    });

    function save() {
        // update note. Call server update.
        if (noteId != undefined) {

            Meteor.call('updateNote', noteId, this.nd, (err, ret) => {
                if (err) return handleError(err);
            });
        } else {

            Meteor.call('newNote', this.nd, (err, ret) => {
                if (err) return handleError(err);
            });
        }
        this.clear();
        $state.go('tab.notes');
        //console.log(Notes[this.noteId]);
    }
    function sendPicture() {
        MeteorCameraUI.getPicture({}, (err, nd) => {
            if (err && err.error == 'cancel') return;
            if (err) return handleError(err);
            this.nd.picture = nd;
            if (noteId != undefined) {
                
                Meteor.call('updateNote', noteId, this.nd, (err, ret) => {
                    if (err) return handleError(err);
                });
            } else {

                Meteor.call('newNote', this.nd, (err, ret) => {
                    if (err) return handleError(err);
                });
            }
        });
    }
    function clear() {
        if (this.nd) {
            this.nd.title = "";
            this.nd.note = "";
            this.nd.picture = "";
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