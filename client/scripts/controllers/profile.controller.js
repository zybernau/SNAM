angular
  .module('SecureNotes')
  .controller('ProfileCtrl', ProfileCtrl);
 
function ProfileCtrl ($scope, $reactive, $state, $ionicPopup, $log) {
  $reactive(this).attach($scope);
 
  let user = Meteor.user();
  let name = user && user.profile ? user.profile.name : '';
 let code = user && user.profile ? user.profile.code : ''
  this.name = name;
  this.updateName = updateName;
  this.logout = logout;
  this.passcode = code;
 this.subscribe('users');
  ////////////
 
  function updateName () {
    if (_.isEmpty(this.name)) return;
 
    Meteor.call('updateName', this.name, this.passcode, (err) => {
      if (err) return handleError(err);
      $state.go('tab.notes');
    });
  }
 
 function logout () {
     Meteor.logout((err) => {
      $state.go('login');
    });
 }
  function handleError (err) {
    $log.error('profile save error ', err);
 
    $ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}