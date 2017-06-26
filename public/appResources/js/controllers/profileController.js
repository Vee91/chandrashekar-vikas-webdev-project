define(['app', 'tipsService'], function (app) {
    app.controller('profileCntrl',
        ['$location', '$routeParams', 'TipsService', 'currentUser', function ($location, $routeParams, TipsService, currentUser) {
            var vm = this;

            vm.upVote = upVote;
            vm.downVote = downVote;
            vm.getUserTips = getUserTips;
            vm.logout = logout;

            function init() {
                TipsService.findSubscribedTips()
                    .then(function (found) {
                        if (found.status) {
                            if (found.status == 400) {
                                vm.notipsfound = true;
                            }
                            else {
                                vm.error = "Something went wrong please try again later";
                            }
                        }
                        else if (found.length == 0) {
                            vm.notipsfound = true;
                        }
                        else {
                            vm.notipsfound = false;
                            vm.tips = found;
                        }
                    });
            }

            init();

            function upVote(tip) {
                vm.error = false;
                if (containsObject(currentUser._id, tip.voteBy)) {
                    vm.error = "You have already voted on this tip";
                }
                else {
                    TipsService.upVoteTip(tip, currentUser._id)
                        .then(function (found) {
                            if (found.status) {
                                if (found.status == 400) {
                                    vm.error = "You have already voted on this tip";
                                }
                                else {
                                    vm.error = "Something went wrong please try again later";
                                }
                            }
                            else {
                                TipsService.findSubscribedTips()
                                    .then(function (found) {
                                        if (found.length == 0) {
                                            vm.notipsfound = true;
                                        }
                                        else {
                                            vm.notipsfound = false;
                                            vm.tips = found;
                                        }
                                    });
                            }
                        });
                }
            }

            function downVote(tip) {
                vm.error = false;
                if (containsObject(currentUser._id, tip.voteBy)) {
                    vm.error = "You have already voted on this tip";
                }
                else {
                    TipsService.downVoteTip(tip, currentUser._id)
                        .then(function (found) {
                            if (found.status) {
                                if (found.status == 400) {
                                    vm.error = "You have already voted on this tip";
                                }
                                else {
                                    vm.error = "Something went wrong please try again later";
                                }
                            }
                            else {
                                TipsService.findSubscribedTips()
                                    .then(function (found) {
                                        if (found.length == 0) {
                                            vm.notipsfound = true;
                                        }
                                        else {
                                            vm.notipsfound = false;
                                            vm.tips = found;
                                        }
                                    });
                            }
                        });
                }
            }

            function containsObject(obj, list) {
                var i;
                for (i = 0; i < list.length; i++) {
                    if (list[i] === obj) {
                        return true;
                    }
                }

                return false;
            }

            function getUserTips(userID) {
                $location.url("/ph/userTips/" + userID);
            }

            function logout() {
                TipsService.logout()
                    .then(function (success) {
                        $location.url("/");
                    });
            }

        }]);
    return app;
});