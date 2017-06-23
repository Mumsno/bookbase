(function () {
    'use strict';

    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.definePalette('white', {
            '50': 'ffffff',
            '100': 'ffffff',
            '200': 'ffffff',
            '300': 'ffffff',
            '400': 'ffffff',
            '500': 'ffffff',
            '600': 'ffffff',
            '700': 'ffffff',
            '800': 'ffffff',
            '900': 'ffffff',
            'A100': 'ffffff',
            'A200': 'ffffff',
            'A400': 'ffffff',
            'A700': 'ffffff',
            'contrastDefaultColor': 'dark'
        });
        $mdThemingProvider.definePalette('bookRed', {
            '50': '993333',
            '100': '993333',
            '200': '993333',
            '300': '993333',
            '400': '993333',
            '500': '993333',
            '600': '993333',
            '700': '993333',
            '800': '993333',
            '900': '993333',
            'A100': '993333',
            'A200': '993333',
            'A400': '993333',
            'A700': '993333',
            'contrastDefaultColor': 'light'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette("bookRed")
            .accentPalette("white")
            .warnPalette("bookRed");
        $mdThemingProvider.theme("card-theme")
            .primaryPalette("bookRed");

    });

    app.config(function ($routeProvider) {
        $routeProvider.when("/", {
                templateUrl: 'static/pages/books_pages.html',
                controller: 'main_controller'
            }
        );
    });

    app.controller("main_controller", ["$scope", "$mdToast", "$location", "$http", "$mdDialog", controller_function]);

    function controller_function($scope, $mdToast, $location, $http, $mdDialog) {
        $scope.search_text = null;
        $scope.search_results = [];
        $scope.books = null;
        $scope.current_page = 1;
        $scope.total_pages = null;
        $scope.loading = false;
        $scope.open_dialog = function () {
            $mdDialog.show({
                controller: "dialog_controller",
                templateUrl: "static/pages/add_book.html",
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            }).finally(function(){$scope.get_data("/books");});
        };


        $scope.get_data = function (url) {
            $scope.loading = true;
            console.log(url);
            $http.get(url, {params: {search: $scope.search_text ? $scope.search_text : null}}).then(function (response) {
                $scope.books = response.data.results;
                $scope.total_count = response.data.count;
                $scope.next = response.data.next;
                $scope.previous = response.data.previous;
                $scope.total_pages = $scope.total_pages ? $scope.total_pages : ($scope.next ? Math.ceil($scope.total_count / $scope.books.length) : null)
                $scope.loading = false;
            });
        };

        $scope.query_search = function (text) {
            if (text.length == 0) {
                $scope.get_data("/books");
            }
            else {
                $http.get("/books", {params: {search: text}}).then(function (response) {
                    $scope.search_results = response.data.results;
                });
            }
        };
        $scope.paginate = function(next){
          if (next)
          {
              $scope.current_page++;
              $scope.get_data($scope.next);
          }
          else
          {
              $scope.current_page--;
              $scope.get_data($scope.previous);
          }
        };
        $scope.get_data("/books");
    }
}());