define(['angular', 'app', 'jqueryui', 'bootstrap', 'registerService'], function (angular, app) {
    app.controller('manageUsersCntrl',
        ['$location', '$routeParams', 'RegisterService', 'currentUser', function ($location, $routeParams, RegisterService, currentUser) {
            var vm = this;

            vm.deleteUser = deleteUser;
            vm.editUser = editUser;
            vm.editConfirm = editConfirm;
            vm.hideModal = hideModal;

            vm.roles = [
                {name: 'TRAINEE'},
                {name: 'COACH'},
                {name: 'ADMIN'}
            ];

            function init() {
                RegisterService.findAllUsers()
                    .then(function (found) {
                        if (found.status) {
                            if (found.status == 400) {
                                vm.error = "You are not authorized to view this page";
                            }
                            else {
                                vm.error = "Something went wrong please try again later";
                            }
                        }
                        else {
                            if (found.length == 0) {
                                vm.noUsersfound = true;
                            }
                            else {
                                vm.noUsersfound = false;
                                vm.users = found;
                            }
                        }
                    });
            }

            init();

            function deleteUser(user) {
                if (confirm("Are you sure you want to delete this userr?")) {
                    RegisterService.deleteUser(user._id, user)
                        .then(function (found) {
                            if (found.status) {
                                if (found.status == 400) {
                                    vm.error = "You are not authorized to view this page";
                                }
                                else {
                                    vm.error = "Something went wrong please try again later";
                                }
                            }
                            else {
                                if (found.length == 0) {
                                    vm.noUsersfound = true;
                                }
                                else {
                                    vm.noUsersfound = false;
                                    vm.users = found;
                                }
                            }
                        });
                }
            }

            function editUser(user) {
                vm.user = user;
                vm.summonerName = user.summonerName;
                    vm.role = {name: user.role};
                $("#adminEditUserModal").modal('show');
            }

            function editConfirm() {
                RegisterService.updateUser(vm.user._id, {
                    summonerName: vm.summonerName,
                    role: vm.role.name
                }).then(function (found) {
                        $("#adminEditUserModal").modal('hide');
                        if (found.status) {
                            if (found.status == 400) {
                                vm.error = "You are not authorized to view this page";
                            }
                            else {
                                vm.error = "Something went wrong please try again later";
                            }
                        }
                        else {
                            if (found.length == 0) {
                                vm.noUsersfound = true;
                            }
                            else {
                                vm.noUsersfound = false;
                                vm.users = found;
                            }
                        }
                    });
            }

            function hideModal() {
                $("#adminEditUserModal").modal('hide');
            }

        }]);
    return app;
});