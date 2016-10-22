var infoduca = angular.module ('infoduca',
['ngRoute', 'mainCtrl','chartsCtrl']);

infoduca.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            controller : 'mainController',
            controllerAs : 'main'
        })
        .when('/charts', {
            controller : 'chartsController',
            controllerAs : 'charts'
        })
        .otherwise({
            redirectTo : '/'
        });
        $locationProvider.html5Mode(true);
});
