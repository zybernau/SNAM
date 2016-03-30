angular
    .module('SecureNotes')
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'client/templates/tabs.html',
            resolve: {
                user: isAuthorized,
                notes() {
                    return Meteor.subscribe('notes');
                }
            }
        })
        .state('tab.notes', {
            url: '/notes',
            views: {
                'tab-notes': {
                    templateUrl: 'client/templates/notes.html',
                    controller: 'NotesCtrl as notes',
                    resolve: {
                        user: isAuthorized
                    }
                }
            },
        })
        .state('tab.note', {
            url: '/notes/:id',
            views: {
                'tab-notes': {
                    templateUrl: 'client/templates/note.html',
                    controller: 'NoteCtrl as note',
                    resolve: {
                        user: isAuthorized
                    }
                }
            },
        })
        .state('tab.newNote', {
            url: '/newNote',
            views: {
                'tab-newNote': {
                    templateUrl: 'client/templates/note.html',
                    controller: 'NoteCtrl as note',
                    resolve: {
                        user: isAuthorized
                    }
                }
            },
        })
        .state('tab.settings', {
            url: '/settings',
            views: {
                'tab-settings': {
                    templateUrl: 'client/templates/profile.html',
                    controller: 'ProfileCtrl as profile',
                    resolve: {
                        user: isAuthorized
                    }
                }
            },
        })
        .state('login', {
            url: '/login',
            templateUrl: 'client/templates/login.html',
            controller: 'LoginCtrl as logger'
        })
        .state('confirmation', {
            url: '/confirmation/:phone',
            templateUrl: 'client/templates/confirmation.html',
            controller: 'ConfirmationCtrl as confirmation'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'client/templates/profile.html',
            controller: 'ProfileCtrl as profile'
        });

    $urlRouterProvider.otherwise('tab/notes');

    // method.
    function isAuthorized($q) {
        let deferred = $q.defer();

        if (_.isEmpty(Meteor.user()))
            deferred.reject('AUTH_REQUIRED');
        else
            deferred.resolve();

        return deferred.promise;
    }


}