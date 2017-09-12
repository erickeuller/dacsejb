// источник: https://www.airpair.com/angularjs/posts/angularjs-from-prototyping-to-functional-code

angular.module('clientsApp', []);

// scripts/factories/clients
// angular
//   .module('clientsApp')
//   .factory('Clients', function($http) {
//     var BASE_URL = new Firebase('https://luminous-heat-9446.firebaseio.com/');
//     // var BASE_URL = '/clients';
//     return {
//       all: function() {
//         return $http.get(BASE_URL);
//       },
//       create: function(client) {
//         return $http.post(BASE_URL, client);
//       },
//       update: function(client) {
//         return $http.put(BASE_URL + '/' + client.id, client);
//       },
//       delete: function(id) {
//         return $http.delete(BASE_URL + '/' + id);
//       }
//     };
//   });

angular
    .module('clientsApp')
    .controller('ClientsCtrl', function($scope, $http) {

        var BASE_URL = 'http://localhost:8080/dacs-rest/rest/trooper/';


        $scope.delete = function(client) {
            $http.delete(BASE_URL + client.id).then(function () {
                var index = $scope.clients.indexOf(client);
                $scope.clients.splice(index, 1);
            });
        };

        $scope.create = function() {
            $scope.newClient.id = null;
            $http.post(BASE_URL, $scope.newClient).then(function (response) {
                $scope.clients.push(response.data);
            });
            $scope.newClient = null;
        };

        $scope.edit = function(client) {
            $scope.activeClient = client;
        };

        $scope.update = function(client) {
            $http.put(BASE_URL, client).then(function (response) {
                angular.merge(client, response.data)
            });
            $scope.activeClient = null;
        };

        function getTroopers() {
            $http.get(BASE_URL).then(function (response) {
                $scope.clients = response.data;
            })
        }

        (function () {
            getTroopers();
        })();
    });

// scripts/directives/integer.coffee
var INTEGER_REGEXP = /^\-?\d+$/;
angular.module('clientsApp').directive('integer', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.integer = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) return true;
                if (INTEGER_REGEXP.test(viewValue)) return true;
                return false;
            };
        }
    };
});

// scripts/filters/percentage.coffee
angular.module('clientsApp').filter('percentage', function() {
    return function(value) {
        return value * 100 + ' %';
    };
});

$(function() {
    $('#clientTable').floatThead({
        scrollContainer: function($table) {
            return $table.closest('.table-wrap');
        }
    });
}/*        $scope.clients = [{
            id: 1,
            name: 'John',
            age: 25,
            percentage: 0.3
        }, {
            id: 2,
            name: 'Jane',
            age: 39,
            percentage: 0.18
        }, {
            id: 3,
            name: 'Jude',
            age: 51,
            percentage: 0.54
        }, {
            id: 4,
            name: 'James',
            age: 18,
            percentage: 0.32
        },{
            id: 5,
            name: 'Harry',
            age: 45,
            percentage: 0.75
        },{
            id: 6,
            name: 'Jessica',
            age: 25,
            percentage: 0.94
        },{
            id: 7,
            name: 'Michael',
            age: 25,
            percentage: 0.94
        }];*/);