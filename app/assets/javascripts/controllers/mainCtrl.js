var mainCtrl = angular.module('mainCtrl', []);

function mainController () {
    var vm = this;
    vm.test = 'test';
}

mainCtrl.controller('mainController', mainController);
