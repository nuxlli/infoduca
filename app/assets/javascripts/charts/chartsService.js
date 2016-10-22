var chartsService = angular.module('chartsService', []);
chartsService.factory('$chartsRequests', chartsRequests);
function chartsRequests($http) {
    var factory = {};
    factory.get = function (url) {
        return $http.get(url);
    };
}

chartsService.factory('$chartsProvider', chartsProvider);
function chartsProvider() {
    var factory = {};
    factory.create = function (data){
        
    }
}
