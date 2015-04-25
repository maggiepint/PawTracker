angular.module( 'pawTracker', [
  'templates-app',
  'templates-common',
  'pawTracker.home',
    'pawTracker.register',
  'ui.router',
    'ipCookie'
]).constant('apiBase', 'http://pawtracks.azurewebsites.net') //see docs at http://pawtracks.azurewebsites.net/Help.
.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})
    .config(function enableCors($httpProvider){
        //$httpProvider.defaults.useXDomain = true;
        //delete $httpProvider.defaults.headers.common["X-Requested-With"];
        //$httpProvider.defaults.headers.common["Accept"] = "application/json";
        //$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    })
    .config(function config($httpProvider) {
        $httpProvider.interceptors.push(['$q', 'ipCookie', function($q, ipCookie) {
            return {
                request: function(request) {
                    if(!request.headers.Authorization &&
                        (request.disableAuthToken === false || request.disableAuthToken === undefined)) {
                        //add our auth header as required unless one is already present
                        var cookie = ipCookie('Test');
                        if (cookie) {
                            request.headers.Authorization = 'Bearer ' + cookie;
                        }
                    }
                    return request;
                }
            };
        }]);
    })

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Paw Tracker' ;
    }
  });
})

;

