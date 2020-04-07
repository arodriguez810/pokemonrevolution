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
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    $scope.spriteFrames = 1;
    $scope.playerFrames = 8;
    $scope.width = 12;
    $scope.height = 8;
    $scope.baseHeight = 48;
    $scope.baseWidth = 48;
    $scope.baseHeight = 48;
    $scope.baseWidth = 48;
    $scope.baseHeight = 48;
    $scope.midHeight = $scope.baseHeight / 2;
    $scope.midWidth = $scope.baseWidth / 2;
    $scope.shadowY = 8;
    mapQueues = {};
    players = {};
    maps = {};
    STAGE = new createjs.Stage("game");
    createjs.Ticker.addEventListener("tick", STAGE);
    createjs.Ticker.addEventListener("tick", function (event) {
        if ($scope.hero) {
            if ($scope.hero.body) {
                var cameraX = $scope.hero.body.x - (($scope.width / 2) * $scope.baseWidth);
                var cameraY = $scope.hero.body.y - (($scope.height / 2) * $scope.baseHeight);

                var regX = cameraX < 0 ? 0 : cameraX;
                var regY = cameraY < 0 ? 0 : cameraY;
                if (regX !== 0) {
                    var limitX = ((maps[FIRSTMAP].width * $scope.baseWidth) - ($scope.width * $scope.baseWidth));
                    regX = regX > limitX ? limitX : regX;
                }
                if (regY !== 0) {
                    var limitY = ((maps[FIRSTMAP].height * $scope.baseHeight) - ($scope.height * $scope.baseHeight));
                    regY = regY > limitY ? limitY : regY;
                }

                STAGE.regX = regX;
                STAGE.regY = regY;
            }
        }
        STAGE.update(event);
    });
    createjs.Touch.enable(STAGE);
    for (var l = 1; l <= 9; l++) {
        eval(`layer${l} = new createjs.Container();`);
        eval(`STAGE.addChild(layer${l});`);
    }
    $scope.hero = {
        x: 0,
        y: 1,
        l: 1,
        body: null,
        shadow: null,
        speed: 200,
        walking: false,
        route: []
    };

    //Bound And Calcs
    $scope.bounds = function () {
        return {
            width: $scope.width * $scope.baseWidth,
            height: $scope.height * $scope.baseHeight
        };
    };
    difference = function (a, b) {
        return Math.abs(a - b);
    };

    //Draws
    $scope.drawMap = function (name) {
        for (var L = 1; L <= 9; L++) {
            var Sprite = new createjs.SpriteSheet({
                framerate: $scope.spriteFrames,
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
        FIRSTMAP = name;
        createjs.Sound.play("bgm");
    };
    $scope.drawPlayer = function (hero, name, x, y, L) {
        x = x || hero.x;
        y = y || hero.y;
        L = L || hero.l;

        hero.x = x;
        hero.y = y;
        hero.l = y;
        hero.shadow = new createjs.Bitmap(mapQueues["player_" + name].getResult(`SHADOW`));
        hero.shadow.x = x * $scope.baseWidth;
        hero.shadow.y = y * $scope.baseHeight + $scope.shadowY;
        hero.shadow.name = `playershadow`;
        hero.shadow.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
        eval(`layer${L}.addChild(hero.shadow);`);

        var Sprite = new createjs.SpriteSheet({
            framerate: $scope.playerFrames,
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
        hero.body = new createjs.Sprite(Sprite, "down");
        hero.body.x = x * $scope.baseWidth;
        hero.body.y = y * $scope.baseHeight;
        hero.body.name = `player`;
        eval(`layer${L}.addChild(hero.body);`);
        STAGE.update();
    };
    $scope.traslades = function (hero, events) {
        if (events.length > 0) {
            var event = OSO(events[0]);
            events.shift();
            $scope.traslade(hero, event.animation, event.point, event.repeat, events);
        }
    };
    $scope.traslade = function (hero, animation, point, repeat, events) {
        var newx = !isNaN(Math.floor(point.x / $scope.baseWidth)) ? Math.floor(point.x / $scope.baseWidth) : hero.x;
        var newy = !isNaN(Math.floor(point.y / $scope.baseHeight)) ? Math.floor(point.y / $scope.baseHeight) : hero.y;

        if ($scope.collision(hero, newx, newy)) {
            hero.walking = false;
            hero.body.gotoAndPlay(animation);
            $scope.researchMove = !$scope.researchMove;
            return;
        }
        hero.body.gotoAndPlay("w" + animation);
        var shadow = OSO(point);
        if (shadow.y !== undefined)
            shadow.y += $scope.shadowY;
        STAGE.regX =
            createjs.Tween.get(hero.shadow).to(shadow, hero.speed);
        createjs.Tween.get(hero.body).to(point, hero.speed).call(function () {
            hero.x = !isNaN(Math.floor(point.x / $scope.baseWidth)) ? Math.floor(point.x / $scope.baseWidth) : hero.x;
            hero.y = !isNaN(Math.floor(point.y / $scope.baseHeight)) ? Math.floor(point.y / $scope.baseHeight) : hero.y;
            if (repeat <= 1) {
                if (events.length > 0) {
                    $scope.traslades(hero, events);
                } else {
                    hero.walking = false;
                    hero.body.gotoAndPlay(animation);
                }
            } else {
                if (animation === "left")
                    point.x -= $scope.baseWidth;
                if (animation === "right")
                    point.x += $scope.baseWidth;
                if (animation === "up")
                    point.y -= $scope.baseHeight;
                if (animation === "down")
                    point.y += $scope.baseHeight;
                $scope.traslade(hero, animation, point, --repeat, events);
            }
        });
    };
    $scope.collision = function (hero, cx, cy) {
        var collisions = [];
        var object = maps[FIRSTMAP].map[`${hero.l}_${cx}_${cy}`];
        if (object) {
            collisions.push(object.mode === "A1");
        }
        collisions.push(maps[FIRSTMAP].map[`${hero.l + 1}_${cx}_${cy}`] !== undefined);
        for (var l = hero.l; l >= 1; l--) {
            collisions.push(maps[FIRSTMAP].map[`${hero.l - l}_${cx}_${cy}`] !== undefined);
        }
        return collisions.indexOf(true) !== -1;
    };
    $scope.moveMe = function (event) {
        if ($scope.hero.body)
            $scope.move($scope.hero, event);
    };
    $scope.createEvent = function (events, hero, cx, cy, dx, dy, variable) {
        eval(`if (d${variable} > 0) {
                if (c${variable} < hero.${variable}){
                
                    events.push({
                        animation: "${variable === 'x' ? 'left' : 'up'}",
                        point: {${variable}: (hero.${variable} * $scope.baseWidth) - $scope.baseWidth},
                        repeat: d${variable}
                    });
                 }
                else{
                    events.push({
                        animation: "${variable === 'x' ? 'right' : 'down'}",
                        point: {${variable}: (hero.${variable} * $scope.baseWidth) + $scope.baseWidth},
                        repeat: d${variable}
                    });
                    }
            }`);
    };
    $scope.researchMove = false;
    $scope.move = function (hero, event) {
        if (!hero.walking) {
            hero.walking = true;
            var local = STAGE.globalToLocal(event.stageX, event.stageY);
            var cx = Math.floor(local.x / $scope.baseWidth);
            var cy = Math.floor(local.y / $scope.baseHeight);

            var dx = difference(cx, hero.x);
            var dy = difference(cy, hero.y);
            if (dx === 0 && dy === 0) {
                hero.walking = false;
                return;
            }
            var events = [];


            if (eval(`dx ${$scope.researchMove ? '>' : '<'} dy`)) {
                $scope.createEvent(events, hero, cx, cy, dx, dy, "x");
                $scope.createEvent(events, hero, cx, cy, dx, dy, "y");
            } else {
                $scope.createEvent(events, hero, cx, cy, dx, dy, "y");
                $scope.createEvent(events, hero, cx, cy, dx, dy, "x");
            }
            $scope.traslades(hero, events);
        }
    };
    STAGE.on("stagemousedown", $scope.moveMe);
    STAGE.on("pressmove", $scope.moveMe);

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
        mapQueues[name].installPlugin(createjs.Sound);
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
        mapQueues["player_" + name].installPlugin(createjs.Sound);
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
        $scope.drawMap(FIRSTMAP);
        $scope.drawPlayer($scope.hero, PLAYER, 0, 0, 1);
        $scope.stopLoading();
    };
    $scope.init();

}]);