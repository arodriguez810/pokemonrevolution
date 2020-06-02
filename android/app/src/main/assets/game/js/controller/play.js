E_movement = {
    "fixed": "fixed",
    "random": "random",
    "fallow": "fallow",
    "custom": "custom"
};
E_trigger = {
    "click": "click",
    "near": "near",
    "neartranquilo": "neartranquilo",
    "auto": "auto",
    "collision": "collision",
    "entrenador": "entrenador",
    "entrenadortranquilo": "entrenadortranquilo",
    "andante": "andante",
    "andantetranquilo": "andantetranquilo"
};
E_shortcuts = {
    "@next": "resolve(true);"
};
PERSONALITY_ = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "personalitys"
        });
        resolve(data.data);
    })
};
pokemon.controller('play', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope._colors = ["green", "blue", "red", "pink", "amber", "purple", "deep-purple", "indigo", "light-blue", "cyan", "teal", "light-green", "lime", "orange", "yellow", "deep-orange", "brown", "grey", "blue-grey", "black"];
    $scope._colorsReal = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#000000"];
    $scope.HOME_ = {
        PLAYERPROFILE: (id, set, position) => new Promise(async (resolve, reject) => {
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

                    if (position) {
                        await API.POST("save.php", {
                            "folder": `players/${id}/position`,
                            "name": "data",
                            "data": position
                        });
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
                    email: ""
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
        GETFRIEND: (id) => new Promise(async (resolve, reject) => {
            var folder = `players/${id}`;
            var data = await API.POST("dataplayerexist.php", {
                "folder": folder
            });
            if (data.data[0]) {
                resolve(data.data[0]);
            } else {
                resolve(undefined);
            }
        }),
        GETFRIENDS: () => new Promise(async (resolve, reject) => {
            var folder = `players`;
            var data = await API.POST("datafolder.php", {
                "folder": folder
            });
            if (data.data) {
                resolve(data.data);
            } else {
                resolve(undefined);
            }
        }),
    };
    $scope.GAME = {
        START: {x: 0, y: 0, l: 1, map: "MiCasa"},
        DATA: {
            medals: {},
            pokemon: {},
            config: {},
        },
        GETMAP: (name) => new Promise(async (resolve, reject) => {
            var data = await API.POST("data.php", {
                "folder": "maps",
                "files": [name]
            });
            resolve(data.data[0].data || undefined);
        }),
        GETPLAYER: () => new Promise(async (resolve, reject) => {
            var data = await API.POST("dataplayer.php", {
                "folder": `players/${SESSION.id}/indentity`
            });
            resolve(data.data[0].data || undefined);
        }),
        GETNPC: (name) => new Promise(async (resolve, reject) => {
            var data = await API.POST("data.php", {
                "folder": "characters",
                "files": [name]
            });
            resolve(data.data[0].data || undefined);
        }),
        PLAYERPOSITION: () => new Promise(async (resolve, reject) => {
            var folder = `players/${SESSION.id}/position`;
            var data = await API.POST("dataplayer.php", {
                "folder": folder
            });
            if (data.data[0]) {
                resolve(data.data[0]);
            } else {
                await API.POST("save.php", {
                    "folder": folder,
                    "name": "data",
                    "data": $scope.GAME.START
                });
                resolve($scope.GAME.START)
            }
        }),
        systemSounds: () => new Promise(async (resolve, reject) => {
            var data = await API.POST("systemdb.php", {});
            resolve(data.data || {});
        }),
        ANIMATIONS: () => new Promise(async (resolve, reject) => {
            var data = await API.POST("data.php", {
                "folder": "animations"
            });
            resolve(data.data || ANIMATION);
        }),
    };
    //Base Variables and Configs
    $scope.CURRENTONLINERATING = undefined;
    $scope.CURRENTONLINE = undefined;
    $scope.CURRENTONLINEDATA = undefined;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    $scope.SOUNDS = {
        bgm: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.2}),
        bgs: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.1}),
        battle: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.4}),
        system: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_NONE, volume: 0.5}),
        steps: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, volume: 0.2})
    };
    playvars($scope, $timeout);
    playfunctions($scope, $timeout);
    playactions($scope, $timeout);
    RUNBATTLE($scope, $timeout);
    $scope.itemOnLongPress = function (id) {
        if (id > 0) {
            var temp = $scope.session.pokemons[id];
            $scope.session.pokemons[id] = $scope.session.pokemons[id - 1];
            $scope.session.pokemons[id - 1] = temp;
        } else {
            var temp = $scope.session.pokemons[id];
            $scope.session.pokemons[id] = $scope.session.pokemons[$scope.session.pokemons.length - 1];
            $scope.session.pokemons[$scope.session.pokemons.length - 1] = temp;
        }
    };
    $scope.ACTIONS.GAME.PLAY();
    $scope.showkey = function (key) {
        if ($scope.desktop)
            return key;
        return "";
    };
    $scope.signOut = function () {
        swal({
            title: LANGUAGE.t(`Are you sure you want to close this session?`),
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: LANGUAGE.t("Yes"),
            cancelButtonText: LANGUAGE.t("No"),
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
        }, function () {
            var returnIdioma = "";
            if (STORAGED.lan())
                returnIdioma = STORAGED.lan();
            STORAGED.delete();
            if (returnIdioma)
                location.href = "index.html?lan=" + returnIdioma;
            else
                location.href = "index.html";
        });
    };
    $scope.desktop = false;
    if (createjs.Touch.isSupported()) {
        document.getElementById("arrow_upward").addEventListener('touchstart', function () {
            $scope.PADMOVE('w');
        }, {passive: true});
        document.getElementById("arrow_back").addEventListener('touchstart', function () {
            $scope.PADMOVE('a');
        }, {passive: true});
        document.getElementById("arrow_downward").addEventListener('touchstart', function () {
            $scope.PADMOVE('s');
        }, {passive: true});
        document.getElementById("arrow_forward").addEventListener('touchstart', function () {
            $scope.PADMOVE('d');
        }, {passive: true});

        document.getElementById("arrow_upward").addEventListener('touchend', function () {
            $scope.PADMOVE('q');
        }, {passive: true});
        document.getElementById("arrow_back").addEventListener('touchend', function () {
            $scope.PADMOVE('q');
        }, {passive: true});
        document.getElementById("arrow_downward").addEventListener('touchend', function () {
            $scope.PADMOVE('q');
        }, {passive: true});
        document.getElementById("arrow_forward").addEventListener('touchend', function () {
            $scope.PADMOVE('q');
        }, {passive: true});
    } else {
        $scope.desktop = true;

        $(document).on("keydown", function (e) {
            if ($("#game").length > 0) {
                if (!createjs.Touch.isSupported()) {
                    $("[pkmkey]:visible").each(function (data) {
                        var button = $(this).attr('pkmkey');
                        console.log(e.key);
                        if (e.key && button) {
                            if (e.key.toLowerCase() === button.toLowerCase()) {
                                console.logblue(e.key, button)
                                this.click();
                            }
                        }
                    });
                }
            }
            if (e.ctrlKey)
                PRESS.CTRL = true;
            if (e.shiftKey)
                PRESS.SHIFT = true;
        });
        $(document).on("keyup", function (e) {
            PRESS.CTRL = false;
            PRESS.SHIFT = false;
            if (TOUCHER)
                clearInterval(TOUCHER);
            TOUCHER = undefined;
        });
    }
}]);