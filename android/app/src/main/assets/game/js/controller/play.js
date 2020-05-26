HOME_ = {
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
GAME = {
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
                "data": GAME.START
            });
            resolve(GAME.START)
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
_colors = ["green", "blue", "red", "pink", "amber", "purple", "deep-purple", "indigo", "light-blue", "cyan", "teal", "light-green", "lime", "orange", "yellow", "deep-orange", "brown", "grey", "blue-grey", "black"];
_colorsReal = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#000000"];
E_movement = {
    "fixed": "fixed",
    "random": "random",
    "fallow": "fallow",
    "custom": "custom"
};
E_trigger = {
    "click": "click",
    "near": "near",
    "auto": "auto",
    "collision": "collision"
};
E_shortcuts = {
    "@next": "resolve(true);"
};
pokemon.controller('play', ['$scope', function ($scope,$sce) {
    //Base Variables and Configs
    CURRENTONLINERATING = undefined;
    CURRENTONLINE = undefined;
    CURRENTONLINEDATA = undefined;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    SOUNDS = {
        bgm: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.2}),
        bgs: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.1}),
        battle: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.4}),
        system: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_NONE, volume: 0.5}),
        steps: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, volume: 0.2})
    };
    playvars($scope);
    playfunctions($scope);
    playactions($scope);
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
    }
}]);