define(['angular', 'routes', 'angularRoute', 'angularSanitize'],
    function (angular, routesConfig) {
        'use strict';
        var app = angular.module('LTP', ['ngRoute', 'ngSanitize']);

        app.factory('httpInterceptor', function ($q, $log, $location) {
            return {};
        });

        app.config(['$routeProvider', '$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider', function ($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: true
            });
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service
            function resolver(dependencies) {
                var definition = {
                    resolver: ['$q', '$rootScope', function ($q, $rootScope) {
                        $rootScope.showFooter = false;
                        $rootScope.addbutton = false;
                        var deferred = $q.defer();
                        require(dependencies, function () {
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });

                        return deferred.promise;
                    }]
                }

                return definition;
            }

            function checkLoggedin(dependencies) {
                var definition = {
                    resolver: ['$q', '$rootScope', function ($q, $rootScope) {
                        var deferred = $q.defer();
                        require(dependencies, function () {
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });

                        return deferred.promise;
                    }],
                    currentUser: cehckLogin
                }

                return definition;
            }

            if (!(routesConfig.routes == undefined)) {
                angular.forEach(routesConfig.routes, function (route, path) {
                        if (route.res) {
                            $routeProvider.when(path, {
                                templateUrl: route.templateUrl + '?cd=' + (new Date()).getTime(),
                                resolve: checkLoggedin(route.dependencies),
                                controller: route.cntrl,
                                controllerAs: route.cntrlAs
                            });
                        }
                        else {
                            $routeProvider.when(path, {
                                templateUrl: route.templateUrl + '?cd=' + (new Date()).getTime(),
                                resolve: resolver(route.dependencies),
                                controller: route.cntrl,
                                controllerAs: route.cntrlAs
                            });
                        }
                    }
                );
            }

            if (!(routesConfig.defaultRoutePaths == undefined)) {
                $routeProvider.otherwise({
                    redirectTo: config.defaultRoutePaths
                });
            }

            $httpProvider.interceptors.push('httpInterceptor');

        }])
        ;


        app.run(['$rootScope', '$location', function ($rootScope, $location) {

            $rootScope.$on('$routeChangeSuccess', function (ev, data) {
                if (data.$$route) {
                    $rootScope.route = data.$$route.originalPath.replace("/", "");
                }
                ;
            });

        }]);

        function cehckLogin($rootScope, $q, $location, RegisterService){
            $rootScope.showFooter = true;
            var deffered = $q.defer();
            RegisterService.loggedIn()
                .then(function (user) {
                    if(user == '0') {
                        deffered.reject();
                        $location.url('/');
                    }
                    else {
                        if(user.role === 'COACH'){
                            $rootScope.addbutton = true;
                        }
                        else {
                            $rootScope.addbutton = false;
                        }
                        deffered.resolve(user);
                    }
                });
            return deffered.promise;
        }

        return app;
    });