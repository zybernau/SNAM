angular
    .module('SecureNotes')
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
    $reactive(this).attach($scope);

    this.login = login;
    this.registerNewUser = registerNewUser;
    ////////////
    this.subscribe('users');

    function login() {
        if (_.isEmpty(this.phone)) return;
        // verify existing user.
        var loginRequest = { phone: this.phone, code: this.passcode };

        //send the login request
        Accounts.callLoginMethod({
            methodArguments: [loginRequest],
            userCallback: (error, result) => {
                if (error) this.registerNewUser();
                else $state.go('tab.notes');
            }
        });

        // Meteor.call('verifyUser', this.phone, this.passcode, (err, ret) => {
        //     if (err) return handleError(err);
        //     if (ret) {
        //         $state.go('tab.notes');
        //     } else {
        //         this.registerNewUser();
        //     }

        // });


    }

    function callbck(err, ret) {
        console.log(err);
    }
    function registerNewUser() {
        let confirmPopup = $ionicPopup.confirm({
            title: 'Register New User, confirmation',
            template: '<div>' + this.phone + '</div><div>?</div>',
            cssClass: 'text-center',
            okText: 'Yes',
            okType: 'button-positive button-clear',
            cancelText: 'edit',
            cancelType: 'button-dark button-clear'
        });

        confirmPopup.then((res) => {
            if (!res) return;

            $ionicLoading.show({
                template: 'Logging in...'
            });

            Accounts.requestPhoneVerification(this.phone, (err) => {
                $ionicLoading.hide();

                if (err) {
                    return handleError(err);
                }

                $state.go('confirmation', { phone: this.phone });
            });
        });
    }

    function handleError(err) {
        $log.error('Login error ', err);

        $ionicPopup.alert({
            title: err.reason || 'Login failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }
}