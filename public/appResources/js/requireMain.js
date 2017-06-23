require.config({
    baseUrl: '',
    // paths: maps ids with paths (no extension)
    paths: {
        'angular': '/extResources/js/angular.min',
        'domReady': '/extResources/js/domready',
        'angularRoute': '/extResources/js/angular-route',
        'angularSanitize':'/extResources/js/angular-sanitize',
        'bootstrap': '/extResources/css/bootstrap.min',
        'routes': '/appResources/js/routes',
        'app': '/appResources/js/app',
        'homeController': '/appResources/js/controllers/homeController',
        'tipsController':'/appResources/js/controllers/tipsController',
        'homeService': '/appResources/js/service/home.service.client',
        'tipsService': '/appResources/js/service/tips.service.client',
    },
    // shim: makes external libraries reachable
    shim: {
        'angular': {
            'exports': 'angular'
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
require(['app'], function (app) {
    angular.element().ready(function () {
        // bootstrap the app manually
        require(['domReady'], function () {
            angular.bootstrap(document, ['LTP']);
        });

    });
});