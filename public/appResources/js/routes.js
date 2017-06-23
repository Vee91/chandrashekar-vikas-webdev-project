define([], function () {
    var routesConfig = {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: 'pages/home.html',
                dependencies: ['homeController'],
                cntrl: 'homeCntrl',
                cntrlAs: 'model'
            },
            "/ph/tips/:c1/vs/:c2": {
                templateUrl: 'pages/tips.html',
                dependencies: ['tipsController'],
                cntrl: 'tipsCntrl',
                cntrlAs: 'model'
            }
        }
    };
    return routesConfig;
});