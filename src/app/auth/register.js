/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'pawTracker.register', [
    'ui.router'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
    .config(function config( $stateProvider ) {
        $stateProvider.state( 'register', {
            url: '/register',
            views: {
                "main": {
                    controller: 'Register',
                    templateUrl: 'auth/register.tpl.html'
                }
            },
            data:{ pageTitle: 'Register' }
        });
    })

/**
 * And of course we define a controller for our route.
 */
    .controller( 'Register', function RegisterController( $scope, $timeout, apiBase, $http, userContext ) {
        $scope.newUser = {
            email: null,
            password:null,
            confirmPassword: null
        };

        $scope.newUser.register = function() {
            var a = 1;
            $http.post(apiBase + '/API/Account/Register', $scope.newUser)
                .success(function () {
                    var timer = $timeout(function () {
                        $timeout.cancel(timer);
                        $http({
                            method: 'POST',
                            url: apiBase + '/Token',
                            data: {
                                username: $scope.newUser.email,
                                password: $scope.newUser.password,
                                grant_type: 'password'
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            transformRequest: function (obj) {
                                var str = [];
                                for (var p in obj) {
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                }

                                return str.join("&");
                            }
                        }).success(function (data) {
                            userContext.email = $scope.email;
                            userContext.token = data;

                        });
                    }, 2000);
                });
        };
    });

