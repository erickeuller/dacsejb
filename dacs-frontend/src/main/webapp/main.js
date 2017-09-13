angular.module('angularApp', []);

angular
    .module('angularApp')
    .controller('StormTroopersController', function($scope, $http) {

        var BASE_URL = 'http://localhost:8080/dacs-rest/rest/trooper/';

        $scope.delete = function(trooper) {
            $http.delete(BASE_URL + trooper.id).then(function () {
                var index = $scope.troopers.indexOf(trooper);
                $scope.troopers.splice(index, 1);
            });
        };

        $scope.create = function() {
            $scope.newTrooper.id = null;
            $http.post(BASE_URL, $scope.newTrooper).then(function (response) {
                $scope.troopers.push(response.data);
            });
            $scope.newTrooper = null;
        };

        $scope.edit = function(trooper) {
            $scope.activeTrooper = trooper;
        };

        $scope.update = function(trooper) {
            $http.put(BASE_URL, trooper).then(function (response) {
                angular.merge(trooper, response.data)
            });
            $scope.activeTrooper = null;
        };

        function getTroopers() {
            $http.get(BASE_URL).then(function (response) {
                $scope.troopers = response.data;
            })
        }

        (function () {
            getTroopers();
        })();
    });
