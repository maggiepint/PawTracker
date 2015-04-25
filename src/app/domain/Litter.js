(function(){
    'use strict';
    angular.module('pawTracker')
        .factory('Litter', litterFactory);

    function litterFactory($http, $q, apiBase) {
        function Litter(litterData) {

            this.setData(litterData);
        }

        Litter.prototype = {
            setData: function (data) {
                angular.extend(this, data);
            },
            put: function () {
                var deferred = $q.defer();
                $http.put(apiBase + '/API/litters/' + this.id, this)
                    .success(function () {
                        deferred.resolve();
                    }).error(function () {
                        deferred.resolve();
                    });

                return deferred.promise;
            },
            post: function () {
                var deferred = $q.defer();
                $http.post(apiBase + '/API/litters', this)
                    .success(function (data) {
                        deferred.resolve(data);
                    }).error(function () {
                        deferred.resolve();
                    });

                return deferred.promise;
            }
        };

        return Litter;
    }

})();