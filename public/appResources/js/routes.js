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
                dependencies: ['annonTipsController'],
                cntrl: 'annonTipsCntrl',
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
            },
            "/ph/searchTips": {
                templateUrl: 'pages/searchtips.html',
                dependencies: ['searchController'],
                cntrl: 'searchCntrl',
                cntrlAs: 'model',
                res: 'checklog'
            },
            "/ph/searchtips/:c1/vs/:c2": {
                templateUrl: 'pages/tipsresult.html',
                dependencies: ['tipsController'],
                cntrl: 'tipsCntrl',
                cntrlAs: 'model',
                res: 'checklog'
            },
            "/ph/myTips": {
                templateUrl: 'pages/myTips.html',
                dependencies: ['myTipsController'],
                cntrl: 'myTipsCntrl',
                cntrlAs: 'model',
                res: 'checklog'
            },
            "/ph/userTips/:userID": {
                templateUrl: 'pages/userTips.html',
                dependencies: ['userTipsController'],
                cntrl: 'userTipsCntrl',
                cntrlAs: 'model',
                res: 'checklog'
            },
            "/ph/admin": {
                templateUrl: 'pages/admin.html',
                dependencies: ['adminController'],
                cntrl: 'adminCntrl',
                cntrlAs: 'model',
                res: 'checklog'
            },
            "/ph/manageUsers": {
                templateUrl: 'pages/manageusers.html',
                dependencies: ['manageUsersController'],
                cntrl: 'manageUsersCntrl',
                cntrlAs: 'model',
                res: 'checklog'
            },
            "/ph/disclaimer": {
                templateUrl: 'pages/disclaimer.html',
                dependencies: ['disclaimerController'],
                cntrl: 'disclaimerCntrl',
                cntrlAs: 'model'
            }
        }
    };
    return routesConfig;
});