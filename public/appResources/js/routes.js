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
            },
            "/ph/login": {
                templateUrl: 'pages/login.html',
                dependencies: ['loginController'],
                cntrl: 'loginCntrl',
                cntrlAs: 'model'
            },
            "/ph/register": {
                templateUrl: 'pages/register.html',
                dependencies: ['registerController'],
                cntrl: 'registerCntrl',
                cntrlAs: 'model'
            },
            "/ph/profile": {
                templateUrl: 'pages/profile.html',
                dependencies: ['profileController'],
                cntrl: 'profileCntrl',
                cntrlAs: 'model',
                res: 'checklog'
            }
        }
    };
    return routesConfig;
});