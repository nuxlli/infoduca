var infoduca = angular.module ('infoduca',
['ngRoute', 'mainCtrl','chartsCtrl', 'templates']);

infoduca.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            controller : 'mainController',
            controllerAs : 'main',
            templateUrl : 'main.html'
        })
        .when('/charts', {
            controller : 'chartsController',
            controllerAs : 'charts',
            templateUrl : 'charts.html'
        })
        $locationProvider.html5Mode(true);
});
