HOME_ = {
    PLAYERPROFILE: (id, pin, set) => new Promise(async (resolve, reject) => {
        var folder = `players/${id}`;
        var data = await API.POST("dataplayer.php", {
            "folder": folder
        });
        if (data.data[0]) {
            if (set) {
                var currment = data.data[0];
                for (var i in set) {
                    currment[i] = set[i];
                }
                await API.POST("save.php", {
                    "folder": folder,
                    "name": "data",
                    "data": currment
                });
                resolve(currment);
            } else {
                resolve(data.data[0]);
            }

        } else {
            var sdates = {
                id: id,
                name: id,
                email: "",
                pin: pin
            };
            await API.POST("save.php", {
                "folder": folder,
                "name": "data",
                "data": sdates
            });
            resolve(sdates)
        }
    }),
    EXIST: (id) => new Promise(async (resolve, reject) => {
        var folder = `players/${id}`;
        var data = await API.POST("dataplayer.php", {
            "folder": folder
        });
        if (data.data[0]) {
            resolve(true);

        } else {
            resolve(false);
        }
    }),
    VERIFY: (id) => new Promise(async (resolve, reject) => {
        var folder = `players/${id}`;
        var data = await API.POST("dataplayer.php", {
            "folder": folder
        });
        if (data.data[0]) {
            resolve(data.data[0]);

        } else {
            resolve(false);
        }
    }),
};
pokemon.controller('home', ['$scope', function ($scope) {
    $scope.DOMAIN = DOMAIN;
    $scope.DOMAINRESOURCE = DOMAINRESOURCE;
    $scope.mode = "selecting";
    $scope.registerText = "Register";
    $scope.loginText = "Entrar";
    $scope.register = async function () {
        if (!$scope.entrenador || !$scope.pin) {
            $scope.mensaje("Please, fill your Name and Password");
            return;
        }
        if (await HOME_.EXIST($scope.entrenador)) {
            $scope.mensaje("This trainer already exists, please use another name");
        } else {
            $scope.registerText = "Loading...";
            await HOME_.PLAYERPROFILE($scope.entrenador, $scope.pin).then(function () {
                STORAGED.add($scope.entrenador);
                location.href = "face.html";
            });
        }
    };
    $scope.login = async function () {
        if (!$scope.entrenador || !$scope.pin) {
            $scope.mensaje("Please, fill your Name and Password");
            return;
        }
        $scope.loginText = "Loading...";
        await HOME_.VERIFY($scope.entrenador).then(function (trainer) {
            $scope.loginText = "Entrar";
            if (!trainer) {
                $scope.mensaje("Invalid name or password, please try again");
                return;
            }
            if (trainer)
                if (trainer.pin !== $scope.pin) {
                    $scope.mensaje("Invalid name or password, please try again");
                    return;
                }
            STORAGED.add(trainer.id);
            location.href = "play.html";
        });
    };

    $scope.mensaje = function (message, button) {
        swal({
            title: message,
            showCancelButton: false,
            confirmButtonColor: "#09dd00",
            confirmButtonText: button || "Entendido!",
            closeOnConfirm: true,
        }, function () {

        });
    }
}]);