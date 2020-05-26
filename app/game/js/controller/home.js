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
        var data = await API.POST("dataplayerexist.php", {
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


    $scope.register = async function () {
        if (!$scope.entrenador || !$scope.pin) {
            $scope.mensaje($scope.LAN.t("Please, fill your Name and Password"));
            return;
        }
        if (await HOME_.EXIST($scope.entrenador)) {
            $scope.mensaje($scope.LAN.t("This trainer already exists, please use another name"));
        } else {
            $scope.registerText = $scope.LAN.t("Loading");
            await HOME_.PLAYERPROFILE($scope.entrenador, $scope.pin).then(function () {
                STORAGED.add($scope.entrenador);
                location.href = "face.html";
            });
        }
    };
    $scope.login = async function () {
        if (!$scope.entrenador || !$scope.pin) {
            $scope.mensaje($scope.LAN.t("Please, fill your Name and Password"));
            return;
        }
        $scope.loginText = $scope.LAN.t("Loading");
        await HOME_.VERIFY($scope.entrenador).then(function (trainer) {
            $scope.loginText = $scope.LAN.t("Enter");
            if (!trainer) {
                $scope.mensaje($scope.LAN.t("Invalid name or password, please try again"));
                return;
            }
            if (trainer)
                if (trainer.pin !== $scope.pin) {
                    $scope.mensaje($scope.LAN.t("Invalid name or password, please try again"));
                    return;
                }
            STORAGED.add(trainer.id, (getParams().lan || ""));
            location.href = "play.html";
        });
    };
    $scope.mensaje = function (message, button) {
        swal({
            title: message,
            showCancelButton: false,
            confirmButtonColor: "#09dd00",
            confirmButtonText: button || $scope.LAN.t("OK"),
            closeOnConfirm: true,
        }, function () {

        });
    };
    GAME = {
        PLAY: async function () {
            LAN = await LANGUAGE_.ALL();
            $scope.LAN = LANGUAGE;
            $scope.registerText = $scope.LAN.t("Register");
            $scope.loginText = $scope.LAN.t("Enter");
            if (!$scope.$$phase)
                $scope.$digest();
        }
    }
}]);