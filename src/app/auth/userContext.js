angular.module('pawTracker')
    .factory('userContext', function(){
        return {
            email: null,
            token: null
        };
    });