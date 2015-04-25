angular.module( 'pawTracker', [
  'templates-app',
  'templates-common',
  'pawTracker.home',
    'pawTracker.register',
  'ui.router'
]).constant('apiBase', 'http://pawtracks.azurewebsites.net') //see docs at http://pawtracks.azurewebsites.net/Help.
.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})
    .config(function enableCors($httpProvider){
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
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

