(function () {
    'use strict';

    app.controller("dialog_controller", ["$scope", "$mdToast", "$location", "$http", "$mdDialog", controller_function]);

    function controller_function($scope, $mdToast, $location, $http, $mdDialog) {
        $scope.add_book = function () {
            if ($scope.form) {
                $http.post("/add_book/", $scope.form).then(function (response) {
                    console.log(response);
                    if (response.data.status == "OK") {
                        $mdDialog.cancel();
                    }
                    $mdToast.show($mdToast.simple().textContent(response.data.msg).position('bottom right').hideDelay(2000));
                });
            }
        };
        $scope.form = null;
    }
}());

