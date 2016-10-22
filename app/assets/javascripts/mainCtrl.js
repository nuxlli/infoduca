var mainCtrl = angular.module('mainCtrl');
mainCtrl.controller('mainController', mainController);
function mainController () {
    var vm = this;
    vm.test = 'test';
    console.log(vm.test);
}
