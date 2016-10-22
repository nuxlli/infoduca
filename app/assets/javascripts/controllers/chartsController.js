var chartsCtrl = angular.module('chartsCtrl', ['chartsService']);
chartsCtrl.controller('chartsController', chartsController);
function chartsController ($chartsRequests, $chartsProvider) {
    var vm = this;
    vm.test = 'test';

    $chartsRequests.get('')
        .then((response) => {
            console.log(response.data);
        })
        .catch( (err) => {
            console.log(err);
        })
}
