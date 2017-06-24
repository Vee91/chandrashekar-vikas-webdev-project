require.config({
    baseUrl: '',
    // paths: maps ids with paths (no extension)
    paths: {
        'jquery': 'extResources/js/jquery-2.1.4.min',
        'jqueryui':'extResources/js/jquery-1.11.4.ui.min',
        'angular': 'extResources/js/angular.min',
        'domReady': 'extResources/js/domready',
        'angularRoute': 'extResources/js/angular-route',
        'angularSanitize': 'extResources/js/angular-sanitize',
        'bootstrap':'extResources/js/bootstrap.min',
        'uibootstrap':'extResources/js/ui-bootstrap-tpls-0.9.0',
        'uibootstrap_upd':'extResources/js/ui-bootstrap-0.13.4',
        'routes': '/appResources/js/routes',
        'app': '/appResources/js/app',
        'homeController': '/appResources/js/controllers/homeController',
        'annonTipsController': '/appResources/js/controllers/annonTipsController',
        'tipsController': '/appResources/js/controllers/tipsController',
        'myTipsController': '/appResources/js/controllers/myTipsController',
        'userTipsController': '/appResources/js/controllers/userTipsController',
        'registerController': '/appResources/js/controllers/registerController',
        'loginController': '/appResources/js/controllers/loginController',
        'profileController': '/appResources/js/controllers/profileController',
        'searchController': '/appResources/js/controllers/searchController',
        'homeService': '/appResources/js/service/home.service.client',
        'tipsService': '/appResources/js/service/tips.service.client',
        'registerService': '/appResources/js/service/register.service.client'
    },
    // shim: makes external libraries reachable
    shim: {
        'angular': {
            'deps': ['jquery'],
            'exports': 'angular'
        },
        'bootstrap': {
            'deps': ['jquery']
        },
        'uibootstrap': {
            'deps': ['jquery', 'angular']
        },
        'angularRoute': {
            'deps': ['angular']
        },
        'angularSanitize': {
            'deps': ['angular']
        }
    }
});

// Angular Bootstrap
require(['angular', 'app', 'jqueryui'], function (angular, app) {
    angular.element().ready(function () {
        // bootstrap the app manually
        require(['domReady'], function () {
            angular.bootstrap(document, ['LTP']);
        });

    });
});