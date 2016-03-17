angular
    .module('SecureNotes')
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'client/templates/tabs.html'
        })
        .state('tab.notes', {
            url: '/notes',
            views: {
                'tab-notes': {
                    templateUrl: 'client/templates/notes.html',
                    controller: 'NotesCtrl as notes'
                }
            },
        })
        .state('tab.note', {
            url: '/notes/:id',
            views: {
                'tab-notes': {
                    templateUrl: 'client/templates/note.html',
                    controller: 'NoteCtrl as note'
                }
            }
        });

    $urlRouterProvider.otherwise('tab/notes');
}