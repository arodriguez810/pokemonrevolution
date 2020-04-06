GAME = {
    GETMAP: (name) => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "maps",
            "files": [name]
        });
        resolve(data.data[0].data || undefined);
    }),
    GETPLAYER: (name) => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "characters",
            "files": [name]
        });
        resolve(data.data[0].data || undefined);
    }),
};
_colors = ["red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "grey", "blue-grey", "black"];
pokemon.controller('play', ['$scope', function ($scope) {
    //Base Variables
    createjs.Ticker.framerate = 3;
    $scope.width = 12;
    $scope.height = 7;
    $scope.baseHeight = 48;
    $scope.baseWidth = 48;
    $scope.baseHeight = 48;
    $scope.baseWidth = 48;
    $scope.baseHeight = 48;
    $scope.midHeight = $scope.baseHeight / 2;
    $scope.midWidth = $scope.baseWidth / 2;
    mapQueues = {};
    players = {};
    maps = {};
    STAGE = new createjs.Stage("game");
    createjs.Ticker.addEventListener("tick", STAGE);
    for (var l = 1; l <= 9; l++) {
        eval(`layer${l} = new createjs.Container();`);
        eval(`STAGE.addChild(layer${l});`);
    }

    //Bound And Calcs
    $scope.bounds = function () {
        return {
            width: $scope.width * $scope.baseWidth,
            height: $scope.height * $scope.baseHeight
        };
    };

    //Draws
    $scope.drawMap = function (name) {
        for (var L = 1; L <= 9; L++) {
            var Sprite = new createjs.SpriteSheet({
                "images": [
                    mapQueues[name].getResult(`layer${L}_A`),
                    mapQueues[name].getResult(`layer${L}_B`),
                    mapQueues[name].getResult(`layer${L}_C`)
                ],
                "frames": [
                    // x, y, width, height, imageIndex*
                    [0, 0, maps[name].width * $scope.baseWidth, maps[name].height * $scope.baseHeight, 0],
                    [0, 0, maps[name].width * $scope.baseWidth, maps[name].height * $scope.baseHeight, 1],
                    [0, 0, maps[name].width * $scope.baseWidth, maps[name].height * $scope.baseHeight, 2],
                    //...
                ],
                "animations": {
                    "run": [0, 1, 2, 1, "run"]
                },
            });
            var item = new createjs.Sprite(Sprite, "run");
            item.x = 0;
            item.y = 0;
            item.name = `layer_${L}`;
            eval(`layer${L}.addChild(item);`);
        }
        STAGE.update();
    };
    $scope.drawPlayer = function (x, y, name) {
        var shadow = new createjs.Bitmap(mapQueues["player_" + name].getResult(`SHADOW`));
        shadow.x = x * $scope.baseWidth;
        shadow.y = y * $scope.baseHeight + 8;
        shadow.name = `playershadow`;
        shadow.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
        layer1.addChild(shadow);

        var Sprite = new createjs.SpriteSheet({
            "images": [mapQueues["player_" + name].getResult(`TV`)],
            frames: {width: $scope.baseWidth, height: $scope.baseHeight, count: 12},
            "animations": {
                "down": {frames: [1]},
                "up": {frames: [10]},
                "left": {frames: [4]},
                "right": {frames: [7]},
                "wdown": {frames: [0, 1, 2, 1]},
                "wup": {frames: [9, 10, 11, 10]},
                "wleft": {frames: [3, 4, 5, 4]},
                "wright": {frames: [6, 7, 8, 7]}
            },
        });
        var item = new createjs.Sprite(Sprite, "down");
        item.x = x * $scope.baseWidth;
        item.y = y * $scope.baseHeight;
        item.name = `player`;
        layer1.addChild(item);
        STAGE.update();
    };
    $scope.move = function (event) {

    };
    STAGE.on("stagemousedown", $scope.move);

    //Starters and Loadings
    $scope.playLoading = function (text) {
        _colors.forEach(d => {
            $(".spinner-layer").removeClass(`pl-${d}`)
        });
        $(".spinner-layer").addClass(`pl-${_colors[getRandomInt(_colors.length - 1)]}`);
        $("#loadingtext").html(text);
        $("#globalload").show();
    };
    $scope.stopLoading = function () {
        $("#globalload").fadeOut(300);
    };
    $scope.loadMap = (name) => new Promise(async (resolve, reject) => {
        mapQueues[name] = new createjs.LoadQueue(false);
        mapQueues[name].installPlugin(createjs.Sound)
        maps[FIRSTMAP] = await GAME.GETMAP(FIRSTMAP);
        var loadJson = [];
        loadJson.push({id: "BG", src: `data/maps_file/${name}/bg.png`});
        for (var A = 65; A <= 67; A++) {
            for (var L = 1; L <= 9; L++) {
                var chara = String.fromCharCode(A);
                loadJson.push({id: `layer${L}_${chara}`, src: `data/maps_file/${name}/W_${L}${chara}.png`});
            }
        }
        if (maps[FIRSTMAP].bgm)
            loadJson.push({id: "bgm", src: maps[FIRSTMAP].bgm});
        if (maps[FIRSTMAP].bgs)
            loadJson.push({id: "bgs", src: maps[FIRSTMAP].bgs});
        if (maps[FIRSTMAP].battleback.music)
            loadJson.push({id: "battle", src: maps[FIRSTMAP].battleback.music});
        mapQueues[name].loadManifest(loadJson);
        mapQueues[name].on("complete", function (event) {
            resolve(true);
        }, this);
        mapQueues[name].load();
    });
    $scope.loadPlayer = (name) => new Promise(async (resolve, reject) => {
        mapQueues["player_" + name] = new createjs.LoadQueue(false);
        players[name] = await GAME.GETPLAYER(name);

        var loadJson = [];
        loadJson.push({id: "FACE", src: `data/characters_file/${name}/face.png`});
        loadJson.push({id: "SV", src: `data/characters_file/${name}/sv.png`});
        loadJson.push({id: "TV", src: `data/characters_file/${name}/tv.png`});
        loadJson.push({id: "TVD", src: `data/characters_file/${name}/tvd.png`});
        loadJson.push({id: "SHADOW", src: `../resources/system/Shadow1.png`});
        mapQueues["player_" + name].loadManifest(loadJson);
        mapQueues["player_" + name].on("complete", function (event) {
            resolve(true);
        }, this);
        mapQueues["player_" + name].load();
    });
    $scope.init = async function () {
        $scope.playLoading("Loading texts");
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $scope.stopLoading();
        $scope.playLoading("Loading Resources");
        await $scope.loadMap(FIRSTMAP);
        await $scope.loadPlayer(PLAYER);
        $scope.stopLoading();
        console.log(maps);
        console.log(players);
        $scope.drawMap(FIRSTMAP);
        $scope.drawPlayer(7, 3, PLAYER);
    };
    $scope.init();

}]);