HOME_ = {
    PLAYERPROFILE: (id, set) => new Promise(async (resolve, reject) => {
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
                id: PROFILE.getId(),
                name: PROFILE.getName(),
                email: PROFILE.getEmail()
            };
            await API.POST("save.php", {
                "folder": folder,
                "name": "data",
                "data": sdates
            });
            resolve(sdates)
        }
    }),
};
GAME = {
    START: {x: 0, y: 0, l: 1, map: "Castillo"},
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
pokemon.controller('play', ['$scope', function ($scope) {
    //Base Variables and Configs
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    SOUNDS = {
        bgm: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.2}),
        bgs: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.1}),
        battle: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.4}),
        system: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_NONE, volume: 0.5}),
        steps: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, volume: 0.2})
    };
    $scope.medals1 = [
        {type: 'Bicho', name: 'BugCatcher'},
        {type: 'Ave', name: 'BirdKeeper'},
        {type: 'Oscuro', name: 'Delinquent'},
        {type: 'Acero', name: 'DepotAgent'},
        {type: 'Ada', name: 'FairyTaleGirl'},
        {type: 'Fantasma', name: 'HexManiac'},
        {type: 'Normal', name: 'PunkGirl'},
        {type: 'Tierra', name: 'RuinManiac'},
        {type: 'Hielo', name: 'Skier'}
    ];
    $scope.medals2 = [
        {type: 'Fuego', name: 'Kindler'},
        {type: 'Agua', name: 'Swimmer'},
        {type: 'Planta', name: 'Gardener'},
        {type: 'Electrico', name: 'Rocker'},
        {type: 'Roca', name: 'Hiker'},
        {type: 'Síquico', name: 'Psychic'},
        {type: 'Dragón  ', name: 'DragonTamer'},
        {type: 'Peleador', name: 'BlackBelt'},
        {type: 'Veneno', name: 'PunkGirl'},
    ];
    $scope._colors = _colors;
    $scope._colorsReal = _colorsReal;
    $scope.routesTick = 3;
    $scope.loadedSounds = [];
    $scope.extraResources = [];
    $scope.sounds = {};
    $scope.animationConfig = {
        "down": {frames: [1]},
        "up": {frames: [10]},
        "left": {frames: [4]},
        "right": {frames: [7]},
        "wdown": {frames: [0, 1, 2, 1]},
        "wup": {frames: [9, 10, 11, 10]},
        "wleft": {frames: [3, 4, 5, 4]},
        "wright": {frames: [6, 7, 8, 7]},
        "gire": {frames: [10, 4, 1, 7, 10, 4, 1, 7]}
    };
    $scope.extras = {};
    $scope.indexTick = 0;
    $scope.spriteFrames = 3;
    $scope.playerFrames = 12;
    $scope.pause = false;
    $scope.block = false;
    $scope.width = 12;
    $scope.height = 6;
    $scope.baseHeight = 48;
    $scope.baseWidth = 48;
    $scope.baseHeight = 48;
    $scope.baseWidth = 48;
    $scope.baseHeight = 48;
    $scope.midHeight = $scope.baseHeight / 2;
    $scope.midWidth = $scope.baseWidth / 2;
    $scope.researchMove = false;
    $scope.messageQuee = [];
    $scope.notificationText = "...";
    $scope.dialogText = "...";
    $scope.dialogHero = "...";
    $scope.dialogTiming = 0;
    $scope.dialogButtons = [{
        text: "OK", click: function () {
            ACTIONS.MESSAGE.REPLAY();
        }
    }];
    $scope.transitions = "";
    $scope.bubble = null;
    $scope.bubbleText = "...";
    $scope.animations = [];
    mapQueues = {};
    players = {};
    maps = {};
    STAGE = new createjs.Stage("game");
    STAGE.snameToPixelsEnabled = true;
    STAGE.snapToPixelEnabled = true;
    createjs.Ticker.addEventListener("tick", STAGE);
    createjs.Touch.enable(STAGE);
    for (var l = 0; l <= 9; l++) {
        eval(`layer${l} = new createjs.Container();`);
        eval(`STAGE.addChild(layer${l});`);
    }
    $scope.hero = {
        x: 0,
        y: 0,
        l: 1,
        body: null,
        shadow: null,
        speed: 300,
        base_speed: 300,
        walking: false,
        route: [],
        canJump: true,
        canDive: true,
        canFly: true,
        canBreak: true,
        canHide: true,
        canMove: true,
        canWater: true,
        deeping: false,
        flying: false,
        isPlayer: true,
        shadowY: 8,
        name: ""
    };
    $scope.NPCS = [];
    $scope.OBJECTS = [];

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
    $scope.icon = function (index) {
        index = parseInt(index);
        return {x: (Math.ceil((index - 0.01) % 16) - 1) * 32, y: (Math.ceil((index / 16) - 0.01) - 1) * 32};
    };
    $scope.collision = function (hero, cx, cy) {
        if (cx < 0 || cy < 0)
            return true;
        if (cx >= maps[FIRSTMAP].width || cy >= maps[FIRSTMAP].height)
            return true;
        if (hero.flying)
            return false;
        if (maps[FIRSTMAP]) {
            var collisions = [];

            if (hero.l === 0) {
                var object = maps[FIRSTMAP].map[`${1}_${cx}_${cy}`];
                collisions.push(object.mode !== "A1");
                setTimeout(async () => {
                    await $scope.clickEvent(hero, cx, cy, E_trigger.collision);
                }, 500);
                return collisions.indexOf(true) !== -1;
            } else {
                var object = maps[FIRSTMAP].map[`${hero.l}_${cx}_${cy}`];
                if (object) {
                    collisions.push(object.mode === "A1");
                    collisions.push(object.mode === "A1_B");
                    if (hero.l === 2) {
                        collisions.push(object.mode === "A3");
                    }
                }

                collisions.push(maps[FIRSTMAP].map[`${hero.l + 1}_${cx}_${cy}`] !== undefined);

                for (var i in $scope.NPCS) {
                    var NPC = $scope.NPCS[i];
                    if (NPC) {
                        if (NPC.body.visible) {
                            if (NPC.x === cx && NPC.y === cy)
                                if (NPC.l === hero.l || NPC.l === (hero.l + 1))
                                    collisions.push(true);
                            if (NPC.l === hero.l || NPC.l === (hero.l + 1)) {
                                if (NPC.event.trigger === E_trigger.near) {
                                    var xrange = {
                                        min: NPC.x - NPC.event.trigger_step,
                                        max: NPC.x + NPC.event.trigger_step
                                    };
                                    var yrange = {
                                        min: NPC.y - NPC.event.trigger_step,
                                        max: NPC.y + NPC.event.trigger_step
                                    };
                                    if (hero.x >= xrange.min && hero.x <= xrange.max)
                                        if (hero.y >= yrange.min && hero.y <= yrange.max) {
                                            ACTIONS.NPC.LOOK(hero, NPC);
                                            ACTIONS.NPC.LOOK(NPC, hero);
                                            if (eval(NPC.event.conditions))
                                                $scope.runActions(OSO(NPC.event.actions));
                                        }
                                }
                            }
                        }
                    }
                }

                for (var i in $scope.OBJECTS) {
                    var OBJ = $scope.OBJECTS[i];
                    if (OBJ) {
                        if (OBJ.body.visible) {
                            if (OBJ.x === cx && OBJ.y === cy) {
                                if (OBJ.l === hero.l || OBJ.l === (hero.l + 1))
                                    collisions.push(true);
                            }
                            if (OBJ.l === hero.l || OBJ.l === (hero.l + 1)) {
                                if (OBJ.event.trigger === E_trigger.near) {
                                    var xrange = {
                                        min: OBJ.x - OBJ.event.trigger_step,
                                        max: OBJ.x + OBJ.event.trigger_step
                                    };
                                    var yrange = {
                                        min: OBJ.y - OBJ.event.trigger_step,
                                        max: OBJ.y + OBJ.event.trigger_step
                                    };
                                    if (hero.x >= xrange.min && hero.x <= xrange.max)
                                        if (hero.y >= yrange.min && hero.y <= yrange.max) {
                                            if (eval(OBJ.event.conditions))
                                                $scope.runActions(OSO(OBJ.event.actions));
                                        }
                                }
                            }
                        }
                    }
                }

                if (hero.isNPC) {
                    if ($scope.hero.x === cx && $scope.hero.y === cy)
                        collisions.push(true);
                }
                if (!hero.isObject)
                    for (var l = hero.l; l >= 1; l--) {
                        collisions.push(
                            maps[FIRSTMAP].map[`${hero.l - l}_${cx}_${cy}`] !== undefined &&
                            maps[FIRSTMAP].map[`${hero.l}_${cx}_${cy}`] === undefined
                        );
                    }

                if (collisions.indexOf(true) !== -1) {
                    $scope.numberCollisions++;
                    if ($scope.numberCollisions % 70 === 0)
                        $scope.play("Collision", SOUNDS.system);
                }
                setTimeout(async () => {
                    await $scope.clickEvent(hero, cx, cy, E_trigger.collision);
                }, 500);
            }
            return collisions.indexOf(true) !== -1;
        }
    };
    $scope.numberCollisions = 0;
    //Animations
    $scope.traslades = function (hero, events, callback) {
        if (events.length > 0) {
            var event = OSO(events[0]);
            events.shift();
            $scope.traslade(hero, event.animation, event.point, event.repeat, events, callback);
        } else {
            if (callback)
                callback();
        }
    };
    $scope.runCamera = function (hero, newxN, newyN, speed) {
        if (hero.isPlayer) {
            var cameraX = newxN - (($scope.width / 2) * $scope.baseWidth);
            var cameraY = newyN - (($scope.height / 2) * $scope.baseHeight);

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
            createjs.Tween.get(STAGE).to({regX: regX, regY: regY}, speed);
        }
    };
    $scope.traslade = function (hero, animation, point, repeat, events, callback) {
        if (!hero.body)
            return;
        var newx = !isNaN(Math.floor(point.x / $scope.baseWidth)) ? Math.floor(point.x / $scope.baseWidth) : hero.x;
        var newy = !isNaN(Math.floor(point.y / $scope.baseHeight)) ? Math.floor(point.y / $scope.baseHeight) : hero.y;

        var newxN = !isNaN(Math.floor(point.x)) ? Math.floor(point.x) : hero.body.x;
        var newyN = !isNaN(Math.floor(point.y)) ? Math.floor(point.y) : hero.body.y;

        if ($scope.collision(hero, newx, newy)) {
            hero.walking = false;
            if (hero.isObject) {

            } else {
                if (hero.body) {
                    hero.body.gotoAndPlay(animation);
                    for (var wing of ["wing1", "wing2"])
                        hero["body" + wing].gotoAndPlay(animation);
                }
            }
            $scope.researchMove = !$scope.researchMove;
            return;
        }
        if (hero.isObject) {
        } else {
            if (hero.body) {
                hero.body.gotoAndPlay("w" + animation);
                for (var wing of ["wing1", "wing2"])
                    hero["body" + wing].gotoAndPlay("w" + animation);
            }
        }

        if (hero.shadow) {
            var shadow = OSO(point);
            if (shadow.y !== undefined)
                shadow.y += hero.shadowY;
            createjs.Tween.get(hero.shadow).to(shadow, hero.speed);
        }

        for (var wing of ["wing1", "wing2"]) {
            if (hero["body" + wing]) {
                var shadowD = OSO(point);
                createjs.Tween.get(hero["body" + wing]).to(shadowD, hero.speed);
            }
        }

        $scope.runCamera(hero, newxN, newyN, hero.speed);


        createjs.Tween.get(hero.body).to(point, hero.speed).call(async function () {
            hero.x = !isNaN(Math.floor(point.x / $scope.baseWidth)) ? Math.floor(point.x / $scope.baseWidth) : hero.x;
            hero.y = !isNaN(Math.floor(point.y / $scope.baseHeight)) ? Math.floor(point.y / $scope.baseHeight) : hero.y;
            if (!hero.deeping)
                $scope.play("steps" + FIRSTMAP, SOUNDS.steps);
            if (repeat <= 1) {
                if (events.length > 0) {
                    $scope.traslades(hero, events, callback);
                } else {
                    hero.walking = false;
                    if (hero.isObject) {
                    } else {
                        if (hero.body) {
                            hero.body.gotoAndPlay(animation);
                            for (var wing of ["wing1", "wing2"])
                                hero["body" + wing].gotoAndPlay(animation);
                        }
                        if (callback)
                            callback();
                    }
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
                $scope.traslade(hero, animation, point, --repeat, events, callback);
            }
        });
    };
    $scope.teleport = function (hero, point, animation) {
        var newx = !isNaN(Math.floor(point.x / $scope.baseWidth)) ? Math.floor(point.x / $scope.baseWidth) : hero.x;
        var newy = !isNaN(Math.floor(point.y / $scope.baseHeight)) ? Math.floor(point.y / $scope.baseHeight) : hero.y;

        var newxN = !isNaN(Math.floor(point.x)) ? Math.floor(point.x) : hero.body.x;
        var newyN = !isNaN(Math.floor(point.y)) ? Math.floor(point.y) : hero.body.y;

        if ($scope.collision(hero, newx, newy)) {
            if (hero.isObject) {

            } else {
                if (hero.body)
                    hero.body.gotoAndPlay(animation);
            }
            return;
        }

        if (hero.shadow) {
            var shadow = OSO(point);
            if (shadow.y !== undefined)
                shadow.y += hero.shadowY;
            createjs.Tween.get(hero.shadow).to(shadow, 1);
        }
        hero.x = newx;
        hero.y = newy;

        $scope.runCamera(hero, newxN, newyN, 1000);

        createjs.Tween.get(hero.body).to(point, 1);
        if (hero.body)
            hero.body.gotoAndPlay(animation);
    };
    $scope.moveMe = function (event) {
        if ($scope.block)
            return;
        if ($scope.pause)
            return;
        if ($scope.hero.body)
            $scope.moveOld($scope.hero, event, true);
    };
    $scope.moveMeMove = function (event) {
        if ($scope.block)
            return;
        if ($scope.pause)
            return;
        if ($scope.hero.body)
            $scope.move($scope.hero, event);
    };
    $scope.moveOld = async function (hero, event, actions, callback) {
        if (hero) {
            if ($scope.pause)
                return;
            if (!hero.walking) {
                var local = STAGE.globalToLocal(event.stageX, event.stageY);
                var cx = Math.floor(local.x / $scope.baseWidth);
                var cy = Math.floor(local.y / $scope.baseHeight);
                ACTIONS.PLAYER.LOOKDIR(cx, cy);
                if (actions) {
                    var wasEvent = await $scope.clickEvent(hero, cx, cy, E_trigger.click);
                    if (wasEvent)
                        return;
                }
            }
        }
    };
    $scope.move = async function (hero, event, actions, callback) {

        if (hero) {
            if ($scope.pause)
                return;
            if (!hero.walking) {
                var local = STAGE.globalToLocal(event.stageX, event.stageY);
                var cx = Math.floor(local.x / $scope.baseWidth);
                var cy = Math.floor(local.y / $scope.baseHeight);
                if (actions) {
                    var wasEvent = await $scope.clickEvent(hero, cx, cy, E_trigger.click);
                    if (wasEvent)
                        return;
                }
                hero.walking = true;
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
                $scope.traslades(hero, events, callback);
            }
        }
    };

    //Draws
    $scope.clearMap = function () {
        ACTIONS.GAME.STOPALL();
        ACTIONS.MESSAGE.HIDE();

        $scope.NPCS = [];
        $scope.OBJECTS = [];
        createjs.Sound.stop();
        for (var l = 0; l <= 9; l++) {
            eval(`layer${l}.removeAllChildren()`);
        }
        STAGE.update();
    };
    $scope.drawMap = function (name) {
        FIRSTMAP = name;
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
            for (var x = 0; x < maps[name].width; x++) {
                for (var y = 0; y < maps[name].height; y++) {
                    var e = maps[name].event[`${L}_${x}_${y}`];
                    if (e) {
                        if (e.isActor == "1") {
                            $scope.NPCS[e.hero.name] = {
                                name: e.hero.name,
                                x: x,
                                y: y,
                                l: L,
                                body: null,
                                shadow: null,
                                speed: e.hero.speed,
                                base_speed: e.hero.speed,
                                event: e,
                                isNPC: true,
                                canJump: true,
                                canDive: true,
                                canFly: true,
                                deeping: false,
                                shadowY: 8,
                            };
                            $scope.drawPlayer($scope.NPCS[e.hero.name], e.hero.name, x, y, L);
                            eval(`ACTIONS.NPC.${e.look || 'DOWN'}(e.hero.name)`);
                        } else {
                            $scope.OBJECTS[e.name] = {
                                isObject: true,
                                name: e.name,
                                x: x,
                                y: y,
                                l: L,
                                body: null,
                                shadow: null,
                                speed: 300,
                                base_speed: 300,
                                event: e,
                                canJump: true,
                                canDive: true,
                                canFly: true,
                                deeping: false,
                                shadowY: 8,
                            };
                            $scope.drawObject($scope.OBJECTS[e.name], e.name, x, y, L);
                        }
                    }
                }
            }
        }
        STAGE.update();
        $scope.play("bgm" + FIRSTMAP, SOUNDS.bgm);
        $scope.play("bgs" + FIRSTMAP, SOUNDS.bgs);
        ACTIONS.MESSAGE.NOTI(maps[name].displayName);
        setTimeout(function () {
            for (var i in $scope.NPCS) {
                var NPC = $scope.NPCS[i];
                if (NPC.event.trigger === E_trigger.auto) {
                    if (eval(NPC.event.conditions))
                        $scope.runActions(OSO(NPC.event.actions));
                }
            }
            for (var i in $scope.OBJECTS) {
                var NPC = $scope.OBJECTS[i];
                if (NPC.event.trigger === E_trigger.auto) {
                    if (eval(NPC.event.conditions))
                        $scope.runActions(OSO(NPC.event.actions));
                }
            }
        }, 500);
        setInterval(function () {
            if (!$scope.pause) {
                if (!$scope.runningEvent) {
                    for (var i in $scope.NPCS) {
                        var NPC = $scope.NPCS[i];
                        if (NPC.event.visible) {
                            NPC.body.visible = eval(NPC.event.visible);
                            NPC.shadow.visible = eval(NPC.event.visible);
                        }
                        if (NPC.event.route.length > 0) {
                            var route = NPC.event.route[$scope.indexTick % NPC.event.route.length];
                            $scope.runScript(route);
                        }
                    }
                    for (var i in $scope.OBJECTS) {
                        var NPC = $scope.OBJECTS[i];
                        if (NPC.event.visible)
                            NPC.body.visible = eval(NPC.event.visible);
                        if (NPC.event.route.length > 0) {
                            var route = NPC.event.route[$scope.indexTick % NPC.event.route.length];
                            $scope.runScript(route);
                        }
                    }
                    $scope.indexTick++;
                }
            }
            ACTIONS.AMBIENT.RUN();
        }, $scope.routesTick * 1000);
    };
    $scope.drawObject = function (hero, name, x, y, L) {
        x = x || hero.x;
        y = y || hero.y;
        L = L || hero.l;
        hero.x = x;
        hero.y = y;
        hero.l = L;
        var SpriteSheet = new createjs.SpriteSheet({
            framerate: hero.event.object.framerate,
            "images": [mapQueues["object_" + name].getResult("image")],
            "frames": {width: parseInt(hero.event.object.width), height: parseInt(hero.event.object.height)},
            "animations": {
                "run": {frames: hero.event.object.animation}
            }
        });
        hero.body = new createjs.Sprite(SpriteSheet, "run");
        hero.body.x = x * $scope.baseWidth;
        hero.body.y = y * $scope.baseHeight;
        hero.body.name = `object_` + name;
        if (hero.event.object.canBreak === "1") {
            if ($scope.hero.canBreak) {
                hero.body.on("click", function (evt) {
                    if ($scope.hero.staticing) {
                        return;
                    }
                    if (!ACTIONS.GAME.NEAR($scope.hero, hero))
                        return;
                    if ($scope.hero.flying)
                        return;
                    if (!$scope.breaking) {
                        $scope.breaking = true;
                        ACTIONS.PLAYER.SHAKE(50, 24, 5, function () {
                            ACTIONS.ANIMATION.PLAY_OBJECT(hero.body.name.replace('object_', ''), "Break", undefined, function () {

                            });
                            ACTIONS.ANIMATION.PLAY_OBJECT(hero.body.name.replace('object_', ''), "AfterBreak", "UP", function () {
                                eval(`layer${L}.removeChild(hero.body);`);
                                delete $scope.OBJECTS[hero.body.name.replace('object_', '')];
                                $scope.breaking = false;
                            });
                        });
                    }
                });
            }
        }
        if (hero.event.object.canMove === "1") {

            if ($scope.hero.canMove) {
                hero.body.on("click", function (evt) {
                    if ($scope.hero.staticing) {
                        return;
                    }
                    if (!ACTIONS.GAME.NEAR($scope.hero, hero))
                        return;
                    if ($scope.hero.flying)
                        return;
                    if (!$scope.breaking) {
                        $scope.breaking = true;
                        ACTIONS.GAME.BLOCK();
                        ACTIONS.PLAYER.SHAKE(10, 12, 2, function () {
                            ACTIONS.ANIMATION.PLAY_OBJECT(hero.body.name.replace('object_', ''), "Move", undefined, function () {
                                var moveer = true;
                                if (ACTIONS.PLAYER.POSITION() === "up")
                                    if ($scope.collision(hero, hero.x, hero.y - 1))
                                        moveer = false;
                                if (ACTIONS.PLAYER.POSITION() === "down")
                                    if ($scope.collision(hero, hero.x, hero.y + 1))
                                        moveer = false;
                                if (ACTIONS.PLAYER.POSITION() === "left")
                                    if ($scope.collision(hero, hero.x - 1, hero.y))
                                        moveer = false;
                                if (ACTIONS.PLAYER.POSITION() === "right")
                                    if ($scope.collision(hero, hero.x + 1, hero.y))
                                        moveer = false;

                                if (moveer) {
                                    eval(`ACTIONS.OBJECT.MOVE_${ACTIONS.PLAYER.POSITION().toUpperCase().replace("W", "").replace("DON", "DOWN")}(hero.body.name.replace('object_', ''));`)
                                }
                                $scope.breaking = false;
                                ACTIONS.GAME.UNBLOCK();
                            });
                        });
                    }
                });
            }
        }
        if (hero.event.object.canMount === "1") {
            hero.body.on("click", function (evt) {
                if (!ACTIONS.GAME.NEAR($scope.hero, hero))
                    return;
                if ($scope.hero.flying)
                    return;
                if ($scope.hero.deeping)
                    return;
                var oldposition = ACTIONS.PLAYER.POSITION();
                ACTIONS.PLAYER.GET().body.gotoAndPlay("gire");
                setTimeout(function () {
                    var x, y;
                    if (oldposition === "up") {
                        x = hero.x;
                        y = hero.y - 1;
                    }
                    if (oldposition === "down") {
                        x = hero.x;
                        y = hero.y + 1;
                    }
                    if (oldposition === "left") {
                        x = hero.x - 1;
                        y = hero.y;
                    }
                    if (oldposition === "right") {
                        x = hero.x + 1;
                        y = hero.y;
                    }

                    var uperLayer = 1;
                    var upperObject = null;
                    for (var l = 1; l <= 9; l++) {
                        var obj = maps[FIRSTMAP].map[`${l}_${(x)}_${(y)}`];
                        if (obj) {
                            uperLayer = l;
                            upperObject = obj;
                        }
                    }

                    $scope.play("Jump", SOUNDS.system);
                    eval(`layer${$scope.hero.l}.removeChild($scope.hero["body" + "wing2"]);`);
                    eval(`layer${$scope.hero.l}.removeChild($scope.hero["body" + "wing1"]);`);
                    eval(`layer${$scope.hero.l}.removeChild($scope.hero.body);`);
                    eval(`layer${$scope.hero.l}.removeChild($scope.hero.shadow);`);

                    $scope.hero.l = uperLayer;
                    eval(`layer${$scope.hero.l}.addChild($scope.hero["body" + "wing2"]);`);
                    eval(`layer${$scope.hero.l}.addChild($scope.hero.body);`);
                    eval(`layer${$scope.hero.l}.addChild($scope.hero["body" + "wing1"]);`);
                    eval(`layer${$scope.hero.l}.addChild($scope.hero.shadow);`);

                    var dx = difference($scope.hero.x, x);
                    var dy = difference($scope.hero.y, y);
                    var distance = dx > dy ? dx : dy;
                    var speed = ($scope.hero.speed / 2) * distance;


                    var jompeo = 1 + eval((`0.${distance}+1`));

                    createjs.Tween.get($scope.hero.shadow).to({
                        x: ((x) * $scope.baseWidth),
                        y: ((y) * $scope.baseWidth) + 8,
                        scale: jompeo
                    }, speed);

                    for (var wing of ["wing1", "wing2"])
                        createjs.Tween.get($scope.hero["body" + wing]).to({
                            x: ((x) * $scope.baseWidth),
                            y: ((y) * $scope.baseWidth),
                            scale: jompeo
                        }, speed);

                    $scope.runCamera($scope.hero, ((x) * $scope.baseWidth), ((y) * $scope.baseWidth), speed);
                    createjs.Tween.get($scope.hero.body).to({
                        x: ((x) * $scope.baseWidth),
                        y: ((y) * ($scope.baseHeight)),
                        scale: jompeo
                    }, speed).call(function () {
                        createjs.Tween.get($scope.hero.body).to({scale: 1}, speed);
                        for (var wing of ["wing1", "wing2"])
                            createjs.Tween.get($scope.hero["body" + wing]).to({scale: 1}, speed);


                        createjs.Tween.get($scope.hero.shadow).to({scale: 1}, speed).call(function () {
                            $scope.hero.x = x;
                            $scope.hero.y = y;
                            $scope.transition = false;
                            ACTIONS.PLAYER.GET().body.gotoAndPlay(oldposition);
                        });
                    });

                    eval(`ACTIONS.PLAYER.MOVE_${oldposition.toUpperCase().replace("W", "").replace("DON", "DOWN")}()`);
                    eval(`ACTIONS.PLAYER.MOVE_${oldposition.toUpperCase().replace("W", "").replace("DON", "DOWN")}()`);
                }, 1000);

            });
        }
        eval(`layer${L}.addChild(hero.body);`);
        STAGE.update();
    };
    $scope.breaking = false;
    $scope.reDrawObject = function (hero, filters) {
        var name = hero.body.name.replace("object_", "");
        hero.style = new createjs.Bitmap(mapQueues["object_" + name].getResult("image"));
        if (filters)
            hero.style.filters = filters;
        hero.style.cache(0, 0, hero.style.image.width, hero.style.image.height);
        var SpriteSheet = new createjs.SpriteSheet({
            framerate: hero.event.object.framerate,
            "images": [hero.style.cacheCanvas],
            "frames": {width: parseInt(hero.event.object.width), height: parseInt(hero.event.object.height)},
            "animations": {
                "run": {frames: hero.event.object.animation}
            }
        });
        var old = {x: hero.x, y: hero.y, l: hero.l};
        eval(`layer${old.l}.removeChild(hero.body);`);
        hero.body = new createjs.Sprite(SpriteSheet, "run");
        hero.body.x = old.x * $scope.baseWidth;
        hero.body.y = old.y * $scope.baseHeight;
        hero.body.name = `object_` + name;
        if (hero.event.object.canBreak === "1") {
            if ($scope.hero.canBreak) {
                hero.body.on("click", function (evt) {
                    if ($scope.hero.staticing) {
                        return;
                    }
                    if (!ACTIONS.GAME.NEAR($scope.hero, hero))
                        return;
                    if ($scope.hero.flying)
                        return;
                    if (!$scope.breaking) {
                        $scope.breaking = true;
                        ACTIONS.PLAYER.SHAKE(50, 24, 5, function () {
                            ACTIONS.ANIMATION.PLAY_OBJECT(hero.body.name.replace('object_', ''), "Break", undefined, function () {

                            });
                            ACTIONS.ANIMATION.PLAY_OBJECT(hero.body.name.replace('object_', ''), "AfterBreak", "UP", function () {
                                eval(`layer${L}.removeChild(hero.body);`);
                                delete $scope.OBJECTS[hero.body.name.replace('object_', '')];
                                $scope.breaking = false;
                            });
                        });
                    }
                });
            }
        }
        if (hero.event.object.canMove === "1") {

            if ($scope.hero.canMove) {
                hero.body.on("click", function (evt) {
                    if ($scope.hero.staticing) {
                        return;
                    }
                    if (!ACTIONS.GAME.NEAR($scope.hero, hero))
                        return;
                    if ($scope.hero.flying)
                        return;
                    if (!$scope.breaking) {
                        $scope.breaking = true;
                        ACTIONS.GAME.BLOCK();
                        ACTIONS.PLAYER.SHAKE(10, 12, 2, function () {
                            ACTIONS.ANIMATION.PLAY_OBJECT(hero.body.name.replace('object_', ''), "Move", undefined, function () {
                                var moveer = true;
                                if (ACTIONS.PLAYER.POSITION() === "up")
                                    if ($scope.collision(hero, hero.x, hero.y - 1))
                                        moveer = false;
                                if (ACTIONS.PLAYER.POSITION() === "down")
                                    if ($scope.collision(hero, hero.x, hero.y + 1))
                                        moveer = false;
                                if (ACTIONS.PLAYER.POSITION() === "left")
                                    if ($scope.collision(hero, hero.x - 1, hero.y))
                                        moveer = false;
                                if (ACTIONS.PLAYER.POSITION() === "right")
                                    if ($scope.collision(hero, hero.x + 1, hero.y))
                                        moveer = false;

                                if (moveer) {
                                    eval(`ACTIONS.OBJECT.MOVE_${ACTIONS.PLAYER.POSITION().toUpperCase().replace("W", "").replace("DON", "DOWN")}(hero.body.name.replace('object_', ''));`)
                                }
                                $scope.breaking = false;
                                ACTIONS.GAME.UNBLOCK();
                            });
                        });
                    }
                });
            }
        }
        if (hero.event.object.canMount === "1") {
            hero.body.on("click", function (evt) {
                if (!ACTIONS.GAME.NEAR($scope.hero, hero))
                    return;
                if ($scope.hero.flying)
                    return;
                if ($scope.hero.deeping)
                    return;
                var oldposition = ACTIONS.PLAYER.POSITION();
                ACTIONS.PLAYER.GET().body.gotoAndPlay("gire");
                setTimeout(function () {
                    var x, y;
                    if (oldposition === "up") {
                        x = hero.x;
                        y = hero.y - 1;
                    }
                    if (oldposition === "down") {
                        x = hero.x;
                        y = hero.y + 1;
                    }
                    if (oldposition === "left") {
                        x = hero.x - 1;
                        y = hero.y;
                    }
                    if (oldposition === "right") {
                        x = hero.x + 1;
                        y = hero.y;
                    }

                    var uperLayer = 1;
                    var upperObject = null;
                    for (var l = 1; l <= 9; l++) {
                        var obj = maps[FIRSTMAP].map[`${l}_${(x)}_${(y)}`];
                        if (obj) {
                            uperLayer = l;
                            upperObject = obj;
                        }
                    }

                    $scope.play("Jump", SOUNDS.system);
                    eval(`layer${$scope.hero.l}.removeChild($scope.hero["body" + "wing2"]);`);
                    eval(`layer${$scope.hero.l}.removeChild($scope.hero["body" + "wing1"]);`);
                    eval(`layer${$scope.hero.l}.removeChild($scope.hero.body);`);
                    eval(`layer${$scope.hero.l}.removeChild($scope.hero.shadow);`);

                    $scope.hero.l = uperLayer;
                    eval(`layer${$scope.hero.l}.addChild($scope.hero["body" + "wing2"]);`);
                    eval(`layer${$scope.hero.l}.addChild($scope.hero.body);`);
                    eval(`layer${$scope.hero.l}.addChild($scope.hero["body" + "wing1"]);`);
                    eval(`layer${$scope.hero.l}.addChild($scope.hero.shadow);`);

                    var dx = difference($scope.hero.x, x);
                    var dy = difference($scope.hero.y, y);
                    var distance = dx > dy ? dx : dy;
                    var speed = ($scope.hero.speed / 2) * distance;


                    var jompeo = 1 + eval((`0.${distance}+1`));

                    createjs.Tween.get($scope.hero.shadow).to({
                        x: ((x) * $scope.baseWidth),
                        y: ((y) * $scope.baseWidth) + 8,
                        scale: jompeo
                    }, speed);

                    for (var wing of ["wing1", "wing2"])
                        createjs.Tween.get($scope.hero["body" + wing]).to({
                            x: ((x) * $scope.baseWidth),
                            y: ((y) * $scope.baseWidth),
                            scale: jompeo
                        }, speed);

                    $scope.runCamera($scope.hero, ((x) * $scope.baseWidth), ((y) * $scope.baseWidth), speed);
                    createjs.Tween.get($scope.hero.body).to({
                        x: ((x) * $scope.baseWidth),
                        y: ((y) * ($scope.baseHeight)),
                        scale: jompeo
                    }, speed).call(function () {
                        createjs.Tween.get($scope.hero.body).to({scale: 1}, speed);
                        for (var wing of ["wing1", "wing2"])
                            createjs.Tween.get($scope.hero["body" + wing]).to({scale: 1}, speed);


                        createjs.Tween.get($scope.hero.shadow).to({scale: 1}, speed).call(function () {
                            $scope.hero.x = x;
                            $scope.hero.y = y;
                            $scope.transition = false;
                            ACTIONS.PLAYER.GET().body.gotoAndPlay(oldposition);
                        });
                    });

                    eval(`ACTIONS.PLAYER.MOVE_${oldposition.toUpperCase().replace("W", "").replace("DON", "DOWN")}()`);
                    eval(`ACTIONS.PLAYER.MOVE_${oldposition.toUpperCase().replace("W", "").replace("DON", "DOWN")}()`);
                }, 1000);

            });
        }
        eval(`layer${old.l}.addChild(hero.body);`);
        STAGE.update();
    };
    $scope.reDrawPlayer = function (hero, filters) {
        var name = hero.body.name.replace("player_", "");
        hero.style = new createjs.Bitmap(mapQueues["player_" + name].getResult(`TV`));
        if (filters)
            hero.style.filters = filters;
        hero.style.cache(0, 0, hero.style.image.width, hero.style.image.height);
        var Sprite = new createjs.SpriteSheet({
            framerate: $scope.playerFrames,
            "images": [hero.style.cacheCanvas],
            frames: {width: $scope.baseWidth, height: $scope.baseHeight, count: 12},
            "animations": $scope.animationConfig,
        });
        var old = {x: hero.x, y: hero.y, l: hero.l};
        eval(`layer${old.l}.removeChild(hero.body);`);
        hero.body = new createjs.Sprite(Sprite, ACTIONS.GAME.POSITION(hero));
        hero.body.mouseEnabled = true;
        if (!hero.isNPC && !hero.isObject)
            hero.body.on("click", function (evt) {
                ACTIONS.PLAYER.JUMPING();
            });
        hero.body.x = old.x * $scope.baseWidth;
        hero.body.y = old.y * $scope.baseHeight;
        hero.body.name = `player_` + name;
        hero.name = name;
        hero.version = players[name].version;

        for (var wing of ["wing1", "wing2"]) {
            hero[wing] = new createjs.Bitmap(mapQueues["player_" + name].getResult(wing));
            if (filters)
                hero[wing].filters = filters;
            hero[wing].cache(0, 0, hero[wing].image.width, hero[wing].image.height);

            var SpriteD = new createjs.SpriteSheet({
                framerate: $scope.playerFrames,
                "images": [hero[wing].cacheCanvas],
                frames: {width: $scope.baseWidth, height: $scope.baseHeight, count: 12},
                "animations": $scope.animationConfig,
            });
            var oldD = {x: hero.x, y: hero.y, l: hero.l};
            eval(`layer${oldD.l}.removeChild(hero["body" + wing]);`);
            hero["body" + wing] = new createjs.Sprite(SpriteD, ACTIONS.GAME.POSITION(hero));
            hero["body" + wing].x = oldD.x * $scope.baseWidth;
            hero["body" + wing].y = oldD.y * $scope.baseHeight;
            hero["body" + wing].visible = false;
            hero["body" + wing].name = `player_` + name + wing;
        }


        eval(`layer${old.l}.addChild(hero["body" + "wing2"]);`);
        eval(`layer${old.l}.addChild(hero.body);`);
        eval(`layer${old.l}.addChild(hero["body" + "wing1"]);`);
        STAGE.update();
    };
    $scope.drawPlayer = function (hero, name, x, y, L) {
        x = x === undefined ? hero.x : x;
        y = y === undefined ? hero.y : y;
        L = L === undefined ? hero.l : L;
        hero.x = x;
        hero.y = y;
        hero.l = L;
        hero.shadow = new createjs.Bitmap(mapQueues["player_" + name].getResult(`SHADOW`));
        hero.shadow.x = x * $scope.baseWidth;
        hero.shadow.y = y * $scope.baseHeight + hero.shadowY;
        hero.shadow.name = name + `_playershadow`;
        hero.shadow.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
        eval(`layer${L}.addChild(hero.shadow);`);


        hero.style = new createjs.Bitmap(mapQueues["player_" + name].getResult(`TV`));
        hero.style.cache(0, 0, hero.style.image.width, hero.style.image.height);

        var Sprite = new createjs.SpriteSheet({
            framerate: $scope.playerFrames,
            "images": [hero.style.image],
            frames: {width: $scope.baseWidth, height: $scope.baseHeight, count: 12},
            "animations": $scope.animationConfig,
        });
        hero.body = new createjs.Sprite(Sprite, "down");

        hero.body.mouseEnabled = true;
        if (!hero.isNPC && !hero.isObject)
            hero.body.on("click", function (evt) {
                ACTIONS.PLAYER.JUMPING();
            });
        hero.body.x = x * $scope.baseWidth;
        hero.body.y = y * $scope.baseHeight;
        hero.body.name = `player_` + name;
        hero.name = players[name].name;
        hero.version = players[name].version;
        if (hero.isPlayer) {
            hero.canJump = $scope.session.canJump;
            hero.canDive = $scope.session.canDive;
            hero.canFly = $scope.session.canFly;
            hero.canBreak = $scope.session.canBreak;
            hero.canMove = $scope.session.canMove;
            hero.canHide = $scope.session.canHide;
            hero.canWater = $scope.session.canWater;
            $scope.skills = [];
            for (var skille of $scope.session.logros) {
                if (LOGROS[skille]) {
                    $scope.skills.push(LOGROS[skille]);
                }
            }
        } else {
            hero.canJump = true;
            hero.canDive = true;
            hero.canFly = true;
            hero.canBreak = true;
            hero.canMove = true;
            hero.canHide = true;
        }

        for (var wing of ["wing1", "wing2"]) {
            hero[wing] = new createjs.Bitmap(mapQueues["player_" + name].getResult(wing));
            hero[wing].cache(0, 0, hero[wing].image.width, hero[wing].image.height);

            var SpriteD = new createjs.SpriteSheet({
                framerate: $scope.playerFrames,
                "images": [hero[wing].image],
                frames: {width: $scope.baseWidth, height: $scope.baseHeight, count: 12},
                "animations": $scope.animationConfig,
            });
            hero["body" + wing] = new createjs.Sprite(SpriteD, "down");
            hero["body" + wing].x = x * $scope.baseWidth;
            hero["body" + wing].y = y * $scope.baseHeight;
            hero["body" + wing].visible = false;
            hero["body" + wing].name = `player_` + name + wing;

        }

        eval(`layer${L === 0 ? 1 : L}.addChild(hero["body" + "wing2"]);`);
        eval(`layer${L === 0 ? 1 : L}.addChild(hero.body);`);
        eval(`layer${L === 0 ? 1 : L}.addChild(hero["body" + "wing1"]);`);
        if (L === 0) {
            ACTIONS.GAME.ALPHABASE(layer1, 1, 0.5);
            ACTIONS.GAME.ALPHABASE(hero, 1, 0.5);
            hero.body.framerate = 1;
            createjs.Sound.stop();
            $scope.play("Deep", SOUNDS.bgm);
            hero.deeping = true;
        }
        STAGE.update();
    };

    //Events
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
    $scope.runningEvent = false;
    $scope.runActions = async (actions) => new Promise(async (resolve, reject) => {
        if (actions.length > 0) {
            var c = OSO(actions[0]);
            actions.shift();
            try {
                await $scope.runScript(c);
                if (actions.length > 0)
                    await $scope.runActions(actions);
            } catch (error) {
                resolve(false);
            }
        }
        resolve(true);
    });
    $scope.runScript = async (c) => new Promise(async (resolve, reject) => {
        if (c.script.indexOf('@next') === -1)
            c.script += " @next";
        eval(`if (${c.CC}) { a = async function(){ ${$scope.runShortCuts(c.script)} return; }();  }`);
    });
    $scope.runShortCuts = function (script) {
        var newscript = script;
        for (var i in E_shortcuts) {
            newscript = newscript.split(i).join(E_shortcuts[i]);
        }
        return newscript;
    };
    $scope.clickEvent = async (hero, cx, cy, trigger) => new Promise(async (resolve, reject) => {
        if (!$scope.runningEvent) {
            $scope.runningEvent = true;
            for (var i in $scope.NPCS) {
                var NPC = $scope.NPCS[i];
                if (NPC)
                    if (NPC.body.visible)
                        if (NPC.x === cx && NPC.y === cy)
                            if (NPC.l === hero.l || NPC.l === (hero.l + 1)) {
                                if (NPC.event.trigger === trigger) {
                                    var xrange = {
                                        min: NPC.x - NPC.event.trigger_step,
                                        max: NPC.x + NPC.event.trigger_step
                                    };
                                    var yrange = {
                                        min: NPC.y - NPC.event.trigger_step,
                                        max: NPC.y + NPC.event.trigger_step
                                    };
                                    if ($scope.hero.x >= xrange.min && $scope.hero.x <= xrange.max)
                                        if ($scope.hero.y >= yrange.min && $scope.hero.y <= yrange.max) {
                                            ACTIONS.NPC.LOOK($scope.hero, NPC);
                                            ACTIONS.NPC.LOOK(NPC, $scope.hero);
                                            if (eval(NPC.event.conditions))
                                                await $scope.runActions(OSO(NPC.event.actions));
                                        }

                                    resolve(true);
                                }
                            }
            }
            for (var i in $scope.OBJECTS) {
                var NPC = $scope.OBJECTS[i];
                if (NPC)
                    if (NPC.body.visible) {
                        if (NPC.x === cx && NPC.y === cy) {
                            if (NPC.l === hero.l || NPC.l === (hero.l + 1)) {

                                if (NPC.event.trigger === trigger) {
                                    var xrange = {
                                        min: NPC.x - NPC.event.trigger_step,
                                        max: NPC.x + NPC.event.trigger_step
                                    };
                                    var yrange = {
                                        min: NPC.y - NPC.event.trigger_step,
                                        max: NPC.y + NPC.event.trigger_step
                                    };
                                    if ($scope.hero.x >= xrange.min && $scope.hero.x <= xrange.max)
                                        if ($scope.hero.y >= yrange.min && $scope.hero.y <= yrange.max) {
                                            ACTIONS.NPC.LOOK($scope.hero, NPC);
                                            if (eval(NPC.event.conditions))
                                                await $scope.runActions(OSO(NPC.event.actions));
                                        }

                                    resolve(true);
                                }
                            }
                        }
                    }
            }
            $scope.runningEvent = false;
        }
        resolve(false);
    });

    //Base
    STAGE.on("stagemousedown", $scope.moveMe);


    //Starters and Loadings
    $scope.addResource = function (url, object) {
        $scope.extras[url] = object;
    };
    $scope.getResource = function (url) {
        return $scope.extras[url];
    };
    $scope.addSound = function (id, url) {
        $scope.loadedSounds.push(url);
        $scope.sounds[id] = url;
    };
    $scope.existSound = function (url) {
        return $scope.loadedSounds.indexOf(url) !== -1;
    };
    $scope.play = function (id, config) {
        if ($scope.sounds[id])
            createjs.Sound.play($scope.sounds[id], config);
    };
    $scope.stop = function (id) {
        createjs.Sound.stop($scope.sounds[id]);
    };
    $scope.playLoading = function (text) {
        $scope.loadingPage.text = text;
        $scope.loadingPage.visible = true;
        $scope.loadingPage.color = _colorsReal[getRandomInt(_colorsReal.length - 1)];
        $scope.loadingPage.set({
            textAlign: "center",
            textBaseline: "middle",
            x: (($scope.width * $scope.baseWidth) / 2) + STAGE.regX,
            y: (($scope.height * $scope.baseHeight) / 2) + STAGE.regY
        });
    };
    $scope.stopLoading = function () {
        $scope.loadingPage.visible = false;
    };
    $scope.loadMap = (name) => new Promise(async (resolve, reject) => {
        if (!mapQueues[name]) {
            mapQueues[name] = new createjs.LoadQueue(false);
            mapQueues[name].installPlugin(createjs.Sound);

            maps[name] = await GAME.GETMAP(name);
            $scope.playLoading("Cargando " + name);
            var loadJson = [];
            loadJson.push({id: "BG", src: `data/maps_file/${name}/bg.png?v=${maps[name].version}`});
            for (var A = 65; A <= 67; A++) {
                for (var L = 1; L <= 9; L++) {
                    var chara = String.fromCharCode(A);
                    loadJson.push({
                        id: `layer${L}_${chara}`,
                        src: `data/maps_file/${name}/W_${L}${chara}.png?v=${maps[name].version}`
                    });
                }
            }
            if (maps[name].bgm) {

                if (!$scope.existSound(maps[name].bgm)) {
                    loadJson.push({id: "bgm" + name, src: maps[name].bgm});
                }
                $scope.addSound("bgm" + name, maps[name].bgm);
            }
            if (maps[name].bgs) {

                if (!$scope.existSound(maps[name].bgs)) {
                    loadJson.push({id: "bgs" + name, src: maps[name].bgs});
                }
                $scope.addSound("bgs" + name, maps[name].bgs);
            }
            if (maps[name].steps) {
                if (!$scope.existSound(maps[name].steps)) {
                    loadJson.push({id: "steps" + name, src: maps[name].steps});
                }
                $scope.addSound("steps" + name, maps[name].steps);
            }
            if (maps[name].battleback.music) {
                if (!$scope.existSound(maps[name].battleback.music)) {
                    loadJson.push({id: "battle" + name, src: maps[name].battleback.music});
                }
                $scope.addSound("battle" + name, maps[name].bgs);
            }


            for (var event in maps[name].event) {
                var e = maps[name].event[event];
                if (e.isActor == "1") {
                    await $scope.loadNPC(e.hero.name);
                    $scope.playLoading("Cargando " + name);

                } else {
                    await $scope.loadObject(e);
                    $scope.playLoading("Dibujando " + name);
                }
            }
            mapQueues[name].loadManifest(loadJson);
            mapQueues[name].on("complete", async function (event) {
                if (maps[name].vecinos)
                    if (maps[name].vecinos.length > 0) {
                        for (var vecino of maps[name].vecinos) {
                            await $scope.loadMap(vecino);
                            $scope.playLoading("Dibujando " + name);
                        }
                    }
                resolve(true);
            }, this);
            mapQueues[name].load();
        } else {
            resolve(true);
        }
    });
    $scope.loadNPC = (name) => new Promise(async (resolve, reject) => {
        if (!mapQueues["player_" + name]) {
            mapQueues["player_" + name] = new createjs.LoadQueue(false);
            mapQueues["player_" + name].installPlugin(createjs.Sound);
            players[name] = await GAME.GETNPC(name);
            var loadJson = [];
            loadJson.push({id: "FACE", src: `data/characters_file/${name}/face.png?v=${players[name].version}`});
            loadJson.push({id: "SV", src: `data/characters_file/${name}/sv.png?v=${players[name].version}`});
            loadJson.push({id: "TV", src: `data/characters_file/${name}/tv.png?v=${players[name].version}`});
            loadJson.push({id: "TVD", src: `data/characters_file/${name}/tvd.png?v=${players[name].version}`});
            loadJson.push({id: "SHADOW", src: `../resources/system/Shadow1.png`});
            loadJson.push({id: "wing1", src: `../resources/system/wing1.png`});
            loadJson.push({id: "wing2", src: `../resources/system/wing2.png`});
            mapQueues["player_" + name].loadManifest(loadJson);
            mapQueues["player_" + name].on("complete", function (event) {
                resolve(true);
            }, this);
            mapQueues["player_" + name].load();
        } else {
            resolve(true);
        }
    });
    $scope.loadPlayer = () => new Promise(async (resolve, reject) => {
        var name = $scope.session.id;
        if (!mapQueues["player_" + name]) {
            mapQueues["player_" + name] = new createjs.LoadQueue(false);
            mapQueues["player_" + name].installPlugin(createjs.Sound);
            players[name] = await GAME.GETPLAYER($scope.session);
            var loadJson = [];
            loadJson.push({id: "FACE", src: `data/players/${name}/images/face.png?v=${players[name].version}`});
            loadJson.push({id: "SV", src: `data/players/${name}/images/sv.png?v=${players[name].version}`});
            loadJson.push({id: "TV", src: `data/players/${name}/images/tv.png?v=${players[name].version}`});
            loadJson.push({id: "TVD", src: `data/players/${name}/images/tvd.png?v=${players[name].version}`});
            loadJson.push({id: "SHADOW", src: `../resources/system/Shadow1.png`});
            loadJson.push({id: "wing1", src: `../resources/system/wing1.png`});
            loadJson.push({id: "wing2", src: `../resources/system/wing2.png`});
            mapQueues["player_" + name].loadManifest(loadJson);
            mapQueues["player_" + name].on("complete", function (event) {
                resolve(true);
            }, this);
            mapQueues["player_" + name].load();
        } else {
            resolve(true);
        }
    });
    $scope.loadObject = (e) => new Promise(async (resolve, reject) => {
        if (!mapQueues["object_" + e.name]) {
            mapQueues["object_" + e.name] = new createjs.LoadQueue(false);
            mapQueues["object_" + e.name].installPlugin(createjs.Sound);
            players[e.name] = e.name;

            var loadJson = [];
            loadJson.push({id: "image", src: e.object.url});
            if (e.object.sound) {
                if (!$scope.existSound(e.object.sound)) {
                    loadJson.push({id: "soundobject" + e.name, src: e.object.sound});
                }
                $scope.addSound("soundobject" + e.name, e.object.sound);
            }

            mapQueues["object_" + e.name].loadManifest(loadJson);
            mapQueues["object_" + e.name].on("complete", function (event) {
                resolve(true);
            }, this);
            mapQueues["object_" + e.name].load();
        } else {
            resolve(true);
        }
    });
    $scope.loadSystem = () => new Promise(async (resolve, reject) => {
        if (!mapQueues["resources_system"]) {
            $scope.loadingPage = new createjs.Text("Cargando", "40px monospaced", _colorsReal[getRandomInt(_colorsReal.length - 1)]);
            $scope.loadingPage.set({
                textAlign: "center",
                textBaseline: "middle",
                x: (($scope.width * $scope.baseWidth) / 2) + STAGE.regX,
                y: (($scope.height * $scope.baseHeight) / 2) + STAGE.regY
            });
            $scope.loadingPage.textBaseline = "alphabetic";
            $scope.transitions = new createjs.Shape();
            $scope.transitions.set({name: "shape", x: 0, y: 0});
            $scope.transitions.graphics.beginFill("#000").drawRect(0, 0, $scope.width * $scope.baseWidth, $scope.height * $scope.baseHeight);
            $scope.transitions.alpha = 0;

            $scope.ambients = new createjs.Shape();
            $scope.ambients.set({name: "shape", x: 0, y: 0});
            $scope.ambients.graphics.beginFill("#000").drawRect(0, 0, $scope.width * $scope.baseWidth, $scope.height * $scope.baseHeight);
            $scope.ambients.alpha = 0;

            $scope.bubble = new createjs.DOMElement(document.getElementById("bubble"));
            $scope.bubble.x = 0;
            $scope.bubble.y = 0;
            $scope.bubble.visible = false;
            layer9.mouseEnabled = false;
            layer9.addChild($scope.ambients);
            layer9.addChild($scope.transitions);
            layer9.addChild($scope.loadingPage);
            layer9.addChild($scope.bubble);
            var name = "resources_system";
            mapQueues[name] = new createjs.LoadQueue(false);
            mapQueues[name].installPlugin(createjs.Sound);
            maps[FIRSTMAP] = await GAME.GETMAP(FIRSTMAP);
            var loadJson = [];

            var systemsounds = await GAME.systemSounds();
            var reforced = await GAME.ANIMATIONS();
            for (var f = 0; f < reforced.length; f++) {
                $scope.animations[reforced[f].name] = reforced[f];
                if (reforced[f].isSystem === "1") {
                    ACTIONS.LOAD.ADD([reforced[f].file]);
                }
            }
            for (var sound of systemsounds) {
                var url = sound;
                var nameFile = sound.split('/')[sound.split('/').length - 1].replace(".ogg", "");
                if (!$scope.existSound(url)) {
                    loadJson.push({id: nameFile, src: url});
                }
                $scope.addSound(nameFile, url);
            }


            mapQueues[name].loadManifest(loadJson);
            mapQueues[name].on("complete", function (event) {
                resolve(true);
            }, this);
            mapQueues[name].load();
        } else {
            layer9.addChild($scope.transitions)
            layer9.addChild($scope.loadingPage);
            layer9.addChild($scope.bubble);
            resolve(true);
        }
    });
    $scope.loadingPage = null;
    $scope.init = async function () {
        var position = await GAME.PLAYERPOSITION();
        FIRSTMAP = position.map;
        await $scope.loadSystem();
        $scope.playLoading("Cargando 20%");
        LAN = await LANGUAGE_.ALL();
        $scope.playLoading("Cargando 40%");
        $scope.LAN = LANGUAGE;
        $scope.playLoading("Cargando 50%");
        await $scope.loadMap(FIRSTMAP);
        $scope.playLoading("Cargando 80%");
        await $scope.loadPlayer();
        $scope.playLoading("Dibujando Tu Aventura");
        $scope.drawMap(FIRSTMAP);
        $scope.drawPlayer($scope.hero, $scope.session.id, parseInt(position.x), parseInt(position.y), parseInt(position.l));
        $scope.stopLoading();
        $scope.menu = true;
        ACTIONS.AMBIENT.RUN();
        APIS = {};
        APIS.MOVES = await POKEMONAPI.MOVES();
        APIS.ABILITIES = await POKEMONAPI.ABILITIES();
        APIS.TYPES = await POKEMONAPI.TYPES();
        APIS.LEARNS = await POKEMONAPI.LEARNS();
        APIS.POKEDEX = await POKEMONAPI.ALL();

        if (!$scope.$$phase)
            $scope.$digest();
        console.clear();
    };


    //Actions
    $scope.menuOpen = false;
    $scope.subMenuOpen = "perfil";
    $scope.menu = false;
    $scope.chagedBGM = false;
    $scope.chagedBGS = false;
    $scope.battleMusic = false;
    $scope.selectedPokemon = 0;
    $scope.selectedBobeda = 0;
    $scope.menuMessage = undefined;
    $scope.interface = [
        {name: 'perfil', icon: 'face', color: 'blue'},
        {name: 'pokemons', icon: 'adb', color: 'green'},
        {name: 'logros', icon: 'grade', color: 'orange'},
        {name: 'bobeda', icon: 'desktop_windows', color: 'teal'},
        {name: 'friends', icon: 'child_care', color: 'pink'},
    ];
    $scope.menuPokemon = function (index) {
        $scope.selectedPokemon = index;
        $scope.play("Pointer", SOUNDS.system);
        ACTIONS.SOUND.PLAY($scope.selectedPokemonClick().cryUrl, SOUNDS.system);
    };
    $scope.menuBobeda = function (index) {
        $scope.selectedBobeda = index;
        $scope.play("Pointer", SOUNDS.system);
        ACTIONS.SOUND.PLAY($scope.selectedBobedaClick().cryUrl, SOUNDS.system);
    };
    $scope.desc = function (term, name, desc) {
        $scope.menuMessage = {term: term, name: name, desc: desc};
        $scope.play("Pointer", SOUNDS.system);
    };
    $scope.descCancel = function (term, name, desc) {
        $scope.menuMessage = undefined;
        $scope.play("Cancel", SOUNDS.system);
    };
    $scope.subMenu = function (value) {
        $scope.play("Pointer", SOUNDS.system);
        $scope.subMenuOpen = value;
    };
    $scope.selectedPokemonClick = function () {
        if ($scope.session)
            if ($scope.session.pokemons)
                if ($scope.session.pokemons[$scope.selectedPokemon]) {
                    return $scope.session.pokemons[$scope.selectedPokemon];
                }
        return null;
    };
    $scope.selectedBobedaClick = function () {
        if ($scope.session)
            if ($scope.session.bobeda)
                if ($scope.session.bobeda[$scope.selectedBobeda]) {
                    return $scope.session.bobeda[$scope.selectedBobeda];
                }
        return null;
    };
    $scope.typeColor = TYPECOLOR;
    $scope.deletePokemon = function (item, index) {
        POKEMOMFIND.DELETE(item, index);
    };
    $scope.trasladePokemon = function (item, index) {
        POKEMOMFIND.TRASLADE(item, index);
    };
    $scope.includePokemon = function (item, index) {
        POKEMOMFIND.INCLUDE(item, index);
    };
    $scope.upPokemon = function (item, index) {
        alert(1);
    };
    $scope.deleteBobeda = function (item, index) {
        POKEMOMFIND.DELETE_BOBEDA(item, index);
    };
    $scope.ambient = "natural";
    $scope.cacheAmbient = "";
    $scope.cacheHour = 0;
    $scope.runLogro = function (logro) {
        ACTIONS.GAME.MENUOFF();
        setTimeout(() => {
            $scope.runQuickLogro(logro);
        }, 1000);
    };
    $scope.runQuickLogro = function (logro) {
        if (logro.script)
            eval(logro.script)
    };
    $scope.shorter = function (string, length) {
        if (string.length > length)
            return string.substr(0, length) + "...";
        else
            return string;
    };
    $scope.modificationTime = undefined;
    $scope.skills = [];
    $scope.transition = false;
    $scope.TimeText = "";
    ACTIONS = {
        AMBIENT: {
            RUN: function () {
                var color = "#000";
                var alpha = 0;
                var h = $scope.modificationTime !== undefined ? $scope.modificationTime : new Date().getHours();
                $scope.TimeText = ACTIONS.AMBIENT.TIME();
                if (h >= 0 && h <= 3) {
                    color = "#00003f";
                    alpha = 0.7;
                } else if (h >= 4 && h <= 6) {
                    color = "#00003f";
                    alpha = 0.5;
                } else if (h >= 7 && h <= 17) {
                    color = "#fff";
                    alpha = 0.001;
                } else if (h >= 18 && h <= 18) {
                    color = "#ff6700";
                    alpha = 0.2;
                } else if (h >= 19 && h <= 23) {
                    color = "#00003f";
                    alpha = 0.6;
                }
                if ($scope.ambient === "darkcave") {
                    color = "#000";
                    alpha = 0.9;
                }
                if ($scope.cacheAmbient !== $scope.ambient || $scope.cacheHour !== h) {
                    console.log("change ambient");
                    $scope.ambients.graphics.clear().beginFill(color || "#000").drawRect(0, 0, maps[FIRSTMAP].width * $scope.baseWidth, maps[FIRSTMAP].height * $scope.baseHeight).endFill();
                    createjs.Tween.get($scope.ambients).to({alpha: alpha}, 1 * 1000).call(function () {
                    });
                }
                $scope.cacheAmbient = $scope.ambient;
                $scope.cacheHour = h;
                if (!$scope.$$phase)
                    $scope.$digest();
            },
            CHANGETIME: function () {
                if (!$scope.transition) {
                    ACTIONS.ANIMATION.PLAY_PLAYER("TIME", undefined, function () {
                        var h = $scope.modificationTime !== undefined ? $scope.modificationTime : new Date().getHours();
                        if (h >= 0 && h <= 3) {
                            $scope.modificationTime = 4;
                        } else if (h >= 4 && h <= 6) {
                            $scope.modificationTime = 7;
                        } else if (h >= 7 && h <= 17) {
                            $scope.modificationTime = 18;
                        } else if (h >= 18 && h <= 18) {
                            $scope.modificationTime = 19;
                        } else if (h >= 19 && h <= 23) {
                            $scope.modificationTime = 0;
                        }
                        if (!$scope.$$phase)
                            $scope.$digest();
                        ACTIONS.AMBIENT.RUN();
                        $scope.transition = false;
                    });
                }
            },
            /**
             * @return {string}
             */
            TIME: function () {
                var h = $scope.modificationTime !== undefined ? $scope.modificationTime : new Date().getHours();
                if (h >= 0 && h <= 3) {
                    return "Madrugada";
                } else if (h >= 4 && h <= 6) {
                    return "Amanecer";
                } else if (h >= 7 && h <= 17) {
                    return "Día";
                } else if (h >= 18 && h <= 18) {
                    return "Atardecer";
                } else if (h >= 19 && h <= 23) {
                    return "Noche";
                }
                return "Día";
            },
            SET: function (name) {
                $scope.ambient = name;
                if (!$scope.$$phase)
                    $scope.$digest();
                ACTIONS.AMBIENT.RUN();
            }
        },
        GAME: {
            /**
             * @return {boolean}
             */
            NEAR: function (from, to) {
                if (from.x === to.x && from.y === to.y + 1)
                    return true;
                if (from.x === to.x && from.y === to.y - 1)
                    return true;
                if (from.x === to.x + 1 && from.y === to.y)
                    return true;
                return from.x === to.x - 1 && from.y === to.y;
            },
            CLICK: function () {
                if (ACTIONS.PLAYER.POSITION() === "down") {
                    $scope.moveOld($scope.hero, {
                        stageX: (($scope.hero.x) * $scope.baseWidth) - STAGE.regX,
                        stageY: (($scope.hero.y + 1) * $scope.baseHeight) - STAGE.regY
                    }, true);
                } else if (ACTIONS.PLAYER.POSITION() === "up") {
                    $scope.moveOld($scope.hero, {
                        stageX: (($scope.hero.x) * $scope.baseWidth) - STAGE.regX,
                        stageY: (($scope.hero.y - 1) * $scope.baseHeight) - STAGE.regY
                    }, true);
                } else if (ACTIONS.PLAYER.POSITION() === "left") {
                    $scope.moveOld($scope.hero, {
                        stageX: (($scope.hero.x - 1) * $scope.baseWidth) - STAGE.regX,
                        stageY: (($scope.hero.y) * $scope.baseHeight) - STAGE.regY
                    }, true);
                } else if (ACTIONS.PLAYER.POSITION() === "right") {
                    $scope.moveOld($scope.hero, {
                        stageX: (($scope.hero.x + 1) * $scope.baseWidth) - STAGE.regX,
                        stageY: (($scope.hero.y) * $scope.baseHeight) - STAGE.regY
                    }, true);
                }
                if (!$scope.$$phase)
                    $scope.$digest();
            },
            PLAY: async function () {
                $scope.session = await HOME_.PLAYERPROFILE(PROFILE.getId());
                if (!$scope.session.tier) {
                    await HOME_.PLAYERPROFILE(PROFILE.getId(),
                        {
                            tier: POKEMON.categories[0].name,
                            logros: [],
                            canJump: false,
                            canDive: false,
                            canFly: false,
                            pokemons: [],
                            bobeda: [],
                            items: [],
                            friends: [],
                        });
                }
                SESSION = $scope.session;
                $scope.init();
            },
            SESSION: async function (obj) {
                ACTIONS.GAME.PAUSE();
                SESSION = $scope.session = await HOME_.PLAYERPROFILE($scope.session.id, obj);
                ACTIONS.GAME.RESUME();
                if (!$scope.$$phase)
                    $scope.$digest();
            },
            MENUMESSAGE: function (term, name, desc) {
                $scope.desc(term, name, desc);
                if (!$scope.$$phase)
                    $scope.$digest();
            },
            MENUMESSAGE_CLOSE: function () {
                $scope.descCancel();
                if (!$scope.$$phase)
                    $scope.$digest();
            },
            MENU: function () {
                ACTIONS.GAME.SCREEN(1, "#000", 0.9);
                ACTIONS.GAME.PAUSE();
                $scope.menuOpen = true;
                $scope.play("Menu", SOUNDS.system);
                if (!$scope.$$phase)
                    $scope.$digest();
            },
            SUBMENU: function (value) {
                $scope.play("Pointer", SOUNDS.system);
                $scope.subMenuOpen = value;
                if (!$scope.$$phase)
                    $scope.$digest();
            },
            MENUTOGGLE: function () {

                $scope.menuMessage = undefined;
                if ($scope.menuOpen)
                    ACTIONS.GAME.MENUOFF();
                else
                    ACTIONS.GAME.MENU();
            },
            MUTE: function () {
                createjs.Sound.muted = true;
                $scope.muted = true;
                if (!$scope.$$phase)
                    $scope.$digest();
            },
            MUTE_OFF: function () {
                createjs.Sound.muted = false;
                $scope.muted = false;
                if (!$scope.$$phase)
                    $scope.$digest();
            },
            MENUOFF: function () {
                ACTIONS.GAME.SCREENOFF(1);
                ACTIONS.GAME.RESUME();
                $scope.menuOpen = false;
                $scope.play("Cancel", SOUNDS.system);
                if (!$scope.$$phase)
                    $scope.$digest();
            },
            TEST: function (num) {

            },
            DOCUMENTATION: function () {
                var text = "";
                for (var c in ACTIONS) {
                    text += (`'${c}':{`);
                    for (var m in ACTIONS[c]) {
                        if (typeof ACTIONS[c][m] === "function")
                            text += (`'${m}':${ACTIONS[c][m].toString().split(")")[0].replace("(", "")}`);
                    }
                    text += (`}`);
                }
                return text;
            },
            DOCUMENTATION2: function () {
                var text = [];
                for (var c in ACTIONS) {
                    for (var m in ACTIONS[c]) {
                        if (typeof ACTIONS[c][m] === "function")
                            text.push((`${c}.${m}(${ACTIONS[c][m].toString().split(")")[0].replace("(", "").replace("function ", "")})`));
                    }
                }
                return text;
            },
            STOPALL: function () {
                (function (w) {
                    w = w || window;
                    var i = w.setInterval(function () {
                    }, 100000);
                    while (i >= 0) {
                        w.clearInterval(i--);
                    }
                })(/*window*/);
            },
            PAUSE() {
                $scope.pause = true;
            },
            /**
             * @return {boolean}
             */
            ISPAUSE() {
                return $scope.pause;
            },
            ISBLOCK() {
                return $scope.block;
            },
            BLOCK() {
                $scope.block = true;
            },
            UNBLOCK() {
                $scope.block = false;
            },
            RESUME() {
                $scope.pause = false;
            },
            SCROLL: function (object, x, y, s_in, s_state, s_out, callback) {
                if (object) {
                    var ox = object.regX;
                    var oy = object.regY;
                    ACTIONS.GAME.PAUSE();
                    createjs.Tween.get(object).to({
                        regX: x * $scope.baseWidth,
                        regY: y * $scope.baseHeight
                    }, s_in * 1000).call(function () {
                        setTimeout(function () {
                            createjs.Tween.get(object).to({regX: ox, regY: oy}, s_out * 1000).call(function () {
                                ACTIONS.GAME.RESUME();
                                if (callback)
                                    callback();
                            });
                        }, s_state * 1000);

                    });
                }
            },
            SCROLLTO: function (object, to, s_in, s_state, s_out, callback) {
                if (object && to) {
                    var ox = object.regX;
                    var oy = object.regY;
                    ACTIONS.GAME.PAUSE();
                    createjs.Tween.get(object).to({
                        regX: (to.x - ($scope.width / 2)) * $scope.baseWidth,
                        regY: (to.y - ($scope.height / 2)) * $scope.baseHeight
                    }, s_in * 1000).call(function () {
                        setTimeout(function () {
                            createjs.Tween.get(object).to({regX: ox, regY: oy}, s_out * 1000).call(function () {
                                ACTIONS.GAME.RESUME();
                                if (callback)
                                    callback();
                            });
                        }, s_state * 1000);

                    });
                }
            },
            ALPHA: function (object, alpha, callback) {
                if (object) {
                    for (var wing of ["wing1", "wing2"])
                        createjs.Tween.get(object["body" + wing]).to({alpha: alpha}, 300);

                    createjs.Tween.get(object.body).to({alpha: alpha}, 300).call(function () {
                        if (callback)
                            callback()
                    });
                }
            },
            ALPHABASE: function (object, seconds, alpha, callback) {
                if (object)
                    createjs.Tween.get(object).to({alpha: alpha}, seconds * 1000).call(function () {
                        if (callback)
                            callback()
                    });
            },
            /**
             * @return {null}
             */
            POSITION: function (object) {
                if (object)
                    return object.body.currentAnimation;
                return null;
            },
            WAIT: function (seconds, callback) {
                ACTIONS.GAME.PAUSE();
                setTimeout(function () {
                    ACTIONS.GAME.RESUME();
                    if (callback)
                        callback();
                }, seconds * 1000);
            },
            WAITBLOCK: function (seconds, callback) {
                ACTIONS.GAME.BLOCK();
                setTimeout(function () {
                    ACTIONS.GAME.UNBLOCK();
                    if (callback)
                        callback();
                }, seconds * 1000);
            },
            SCREEN: function (seconds, color, alpha, callback) {
                $scope.transitions.graphics.clear().beginFill(color || "#000").drawRect(0, 0, maps[FIRSTMAP].width * $scope.baseWidth, maps[FIRSTMAP].height * $scope.baseHeight).endFill();
                createjs.Tween.get($scope.transitions).to({alpha: alpha || 1}, seconds * 1000).call(function () {
                    if (callback) {
                        callback();
                    }
                });
            },
            SCREENOFF: function (seconds, callback) {
                createjs.Tween.get($scope.transitions).to({alpha: 0}, seconds * 1000).call(function () {
                    if (callback) {
                        callback();
                    }
                });
            },
            FLASH: function (color, seconds, callback) {
                $scope.play("Flash", SOUNDS.system);
                ACTIONS.GAME.SCREEN(0, color, 1, () => {
                    ACTIONS.GAME.SCREENOFF(seconds, function () {
                        if (callback)
                            callback();
                    });
                });
            },
            SHAKE: function (object, interval, distance, times, callback) {
                if (object) {
                    var point = object.x;
                    var codes = [];
                    for (var i = 1; i <= times; i++) {
                        codes.push(`createjs.Tween.get(object).to({x: (${point} ${i % 2 === 0 ? '-' : '+'} distance ) }, interval);`);
                    }
                    for (var i = 1; i <= times; i++) {
                        setTimeout(() => {
                            eval(codes[0]);
                            codes.shift();
                        }, interval * i);
                    }
                    setTimeout(function () {
                        createjs.Tween.get(object).to({x: point}, interval);
                        if (callback)
                            callback()
                    }, interval * (times + 1));
                }
            },
            TELEPORT: async function (object, x, y, mapname, animation, callback) {
                ACTIONS.GAME.PAUSE();
                if (object) {
                    if (mapname) {
                        ACTIONS.GAME.PAUSE();
                        $scope.clearMap();
                        FIRSTMAP = mapname;
                        await $scope.loadSystem();
                        $scope.playLoading("Cargando " + mapname);
                        await $scope.loadMap(FIRSTMAP);
                        $scope.playLoading("Cargando " + mapname);
                        $scope.drawMap(FIRSTMAP);
                        $scope.drawPlayer(object, $scope.session.id, x, y, object.l);
                        $scope.runCamera(object, ((x) * $scope.baseWidth), ((y) * $scope.baseWidth), 10);
                        ACTIONS.PLAYER.OFF();
                        $scope.stopLoading();
                        setTimeout(function () {
                            ACTIONS.GAME.RESUME();
                        }, 1000)

                        if (callback)
                            callback();
                    } else {
                        $scope.teleport(object, {
                            x: x * $scope.baseWidth,
                            y: y * $scope.baseHeight
                        }, animation || "down");
                        ACTIONS.GAME.RESUME();
                        if (callback)
                            callback();
                    }
                }
            },
            TELEPORT_TO: async function (object, object2, dir, mapname, animation, callback) {
                var nextx = object2.x;
                var nexty = object2.y;
                switch (dir) {
                    case "UP": {
                        nexty -= 1;
                        break;
                    }
                    case "DOWN": {
                        nexty += 1;
                        break;
                    }
                    case "LEFT": {
                        nextx -= 1;
                        break;
                    }
                    case "RIGHT": {
                        nextx += 1;
                        break;
                    }
                }
                await ACTIONS.GAME.TELEPORT(object, nextx, nexty, mapname, animation, callback);
            },
            MOVE: function (object, name, x, y, callback) {
                if (object[name]) {
                    $scope.move(object[name], {
                        stageX: (x * $scope.baseWidth) - STAGE.regX,
                        stageY: (y * $scope.baseHeight) - STAGE.regY
                    }, undefined, callback);
                }
            },
            MOVEOBJECT: function (object, x, y, callback) {
                if (object) {
                    $scope.move(object, {
                        stageX: (x * $scope.baseWidth) - STAGE.regX,
                        stageY: (y * $scope.baseHeight) - STAGE.regY
                    }, undefined, callback);
                }
            },
            DESPEGUE: function (object) {
                var uperLayer = 8;
                var upperObject = null;
                for (var l = 8; l >= 1; l--) {
                    var obj = maps[FIRSTMAP].map[`${l}_${(x)}_${(y)}`];
                    if (obj) {
                        uperLayer = l;
                        upperObject = obj;
                    }
                }
            },
            FLY: function (object) {
                if ($scope.hero.watering)
                    return;
                if (!$scope.transition) {
                    if (object.staticing) {
                        $scope.transition = false;
                        return;
                    }
                    if (object.deeping) {
                        $scope.transition = false;
                        return;
                    }
                    ACTIONS.GAME.BLOCK();
                    if (!object.flying) {
                        object.flying = true;
                        object["body" + "wing1"].gotoAndPlay('up');
                        object["body" + "wing2"].gotoAndPlay('up');
                        if (object.speed)
                            object.speed = object.base_speed / 1.5;
                        object.body.framerate = 1;
                        createjs.Sound.stop();

                        ACTIONS.ANIMATION.PLAY_IN(object, "wing1", function () {
                            object["body" + "wing1"].visible = object["body" + "wing2"].visible = true;
                            var uperLayer = 9;
                            if (!object.isNPC && !object.isObject) {
                                $scope.play("Wind", SOUNDS.bgm);
                            }

                            eval(`layer${object.l}.removeChild(object["body" + "wing2"]);`);
                            eval(`layer${object.l}.removeChild(object["body" + "wing1"]);`);
                            eval(`layer${object.l}.removeChild(object.body);`);
                            eval(`layer${object.l}.removeChild(object.shadow);`);
                            object.l = uperLayer;
                            eval(`layer${uperLayer}.addChild(object["body" + "wing2"]);`);
                            eval(`layer${uperLayer}.addChild(object.body);`);
                            eval(`layer${uperLayer}.addChild(object["body" + "wing1"]);`);
                            eval(`layer${uperLayer}.addChild(object.shadow);`);
                            if (object.shadow)
                                object.shadowY = $scope.baseHeight;
                            ACTIONS.GAME.MOVEOBJECT(object, object.x, object.y - 1);
                            if ($scope.hero.hidden) {
                                $scope.hero.hidden = false;
                                ACTIONS.ANIMATION.PLAY_IN(object, "Show", function () {

                                });
                                ACTIONS.GAME.ALPHA(object, 1);
                            }
                            ACTIONS.GAME.SCREEN(1, "#fff", 0.8);
                            ACTIONS.ANIMATION.PLAY_IN(object, "Tornade", function () {

                                ACTIONS.GAME.UNBLOCK();
                            }, undefined, true);


                        }, undefined, true);
                    } else {
                        var uperLayer = 1;
                        var upperObject = null;
                        for (var l = 9; l >= 1; l--) {
                            var obj = maps[FIRSTMAP].map[`${l}_${(object.x)}_${(object.y + 1)}`];
                            if (obj) {
                                uperLayer = l;
                                upperObject = obj;
                                break;
                            }
                        }


                        if (object.speed)
                            object.speed = object.base_speed;
                        object.body.framerate = $scope.playerFrames;

                        if (!object.isNPC && !object.isObject) {
                            createjs.Sound.stop();
                            $scope.play("bgm" + FIRSTMAP, SOUNDS.bgm);
                            $scope.play("bgs" + FIRSTMAP, SOUNDS.bgs);
                        }

                        if (object.shadow)
                            object.shadowY = 8;

                        object["body" + "wing1"].visible = object["body" + "wing2"].visible = false;

                        ACTIONS.ANIMATION.PLAY_IN(object, "wing1", function () {
                            ACTIONS.GAME.MOVEOBJECT(object, object.x, object.y + 1, function () {
                                eval(`layer${object.l}.removeChild(object["body" + "wing2"]);`);
                                eval(`layer${object.l}.removeChild(object["body" + "wing1"]);`);
                                eval(`layer${object.l}.removeChild(object.body);`);
                                eval(`layer${object.l}.removeChild(object.shadow);`);
                                object.l = uperLayer;
                                eval(`layer${uperLayer}.addChild(object["body" + "wing2"]);`);
                                eval(`layer${uperLayer}.addChild(object.body);`);
                                eval(`layer${uperLayer}.addChild(object["body" + "wing1"]);`);
                                eval(`layer${uperLayer}.addChild(object.shadow);`);
                                object.flying = false;
                                ACTIONS.GAME.UNBLOCK();
                                if (object.isNPC) {
                                    ACTIONS.NPC.JUMP_DOWN(object.name);
                                } else
                                    ACTIONS.GAME.JUMP(object, object.x, object.y, true);
                                ACTIONS.GAME.SCREENOFF(1);
                                $scope.transition = false;
                            });
                        });

                    }
                }
            },
            JUMP: function (object, x, y, nosound) {
                if (!$scope.transition) {
                    $scope.transition = true;
                    if (object.flying) {
                        $scope.transition = false;
                        return;
                    }
                    if (object.staticing) {
                        $scope.transition = false;
                        return;
                    }

                    for (var i in $scope.NPCS) {
                        var NPC = $scope.NPCS[i];
                        if (NPC) {
                            if (NPC.body.visible) {
                                if (NPC.x === x && NPC.y === y) {
                                    $scope.transition = false;
                                    return;
                                }
                            }
                        }
                    }

                    for (var i in $scope.OBJECTS) {
                        var NPC = $scope.OBJECTS[i];
                        if (NPC) {
                            if (NPC.body.visible) {
                                if (NPC.x === x && NPC.y === y) {
                                    $scope.transition = false;
                                    return;
                                }
                            }
                        }
                    }
                    var dx = difference(object.x, x);
                    var dy = difference(object.y, y);
                    var distance = dx > dy ? dx : dy;
                    var speed = (object.speed / 2) * distance;
                    var uperLayer = 1;
                    var upperObject = null;
                    for (var l = 1; l <= 9; l++) {
                        var obj = maps[FIRSTMAP].map[`${l}_${(x)}_${(y)}`];
                        if (obj) {
                            uperLayer = l;
                            upperObject = obj;
                        }
                    }
                    if (upperObject) {
                        if (uperLayer > object.l + 1) {
                            $scope.transition = false;
                            return;
                        }
                        //canTrap
                        if (!object.watering)
                            if (uperLayer === 1 && ["A1_B"].indexOf(upperObject.mode) !== -1) {
                                $scope.transition = false;
                                return;
                            }
                        if (uperLayer === 2 && ["A3", "A4", "A1_B"].indexOf(upperObject.mode) !== -1) {
                            $scope.transition = false;
                            return;
                        }
                        if (!object.deeping)
                            if (upperObject.mode === "A1")
                                if (!object.canDive) {
                                    $scope.transition = false;
                                    return;
                                }
                        if (!object.deeping) {
                            if (upperObject.mode === "A1") {
                                uperLayer = 0;

                                if (!object.isNPC && !object.isObject)
                                    ACTIONS.GAME.ALPHABASE(layer1, 1, 0.5);

                                if (object.isNPC) {
                                    ACTIONS.NPC.ALPHA(object.name, 0.5);
                                } else if (object.isObject) {
                                    ACTIONS.OBJECT.ALPHA(object.name, 0.5);
                                } else {
                                    ACTIONS.PLAYER.ALPHA(0.5);
                                }
                                if (!$scope.hero.watering) {
                                    if (object.speed)
                                        object.speed = object.base_speed * 2;
                                } else {
                                    if (object.speed)
                                        object.speed = object.base_speed / 2;
                                }
                                object.body.framerate = 1;
                                if (!object.isNPC && !object.isObject) {
                                    createjs.Sound.stop();
                                    $scope.play("Deep", SOUNDS.bgm);
                                }
                                object.deeping = true;
                                if ($scope.hero.hidden) {
                                    $scope.hero.hidden = false;
                                }
                            }
                        } else {
                            if (uperLayer > 0) {
                                //canTrap
                                if (!object.watering)
                                    if (uperLayer === 1 && ["A1_B"].indexOf(upperObject.mode) !== -1) {
                                        $scope.transition = false;
                                        return;
                                    }

                                if (!object.isNPC && !object.isObject)
                                    ACTIONS.GAME.ALPHABASE(layer1, 1, 1);

                                if (object.isNPC) {
                                    ACTIONS.NPC.ALPHA(object.name, 1);
                                } else if (object.isObject) {
                                    ACTIONS.OBJECT.ALPHA(object.name, 1);
                                } else {
                                    ACTIONS.PLAYER.ALPHA(1);
                                }
                                if (!object.watering) {
                                    if (object.speed)
                                        object.speed = object.base_speed;
                                } else {
                                    if (object.speed)
                                        object.speed = object.base_speed * 3;
                                }

                                object.body.framerate = $scope.playerFrames;
                                $scope.play("Dive", SOUNDS.system);
                                if (!object.isNPC && !object.isObject) {
                                    createjs.Sound.stop();
                                    $scope.play("bgm" + FIRSTMAP, SOUNDS.bgm);
                                    $scope.play("bgs" + FIRSTMAP, SOUNDS.bgs);
                                }
                                object.deeping = false;
                            }
                        }

                        if (uperLayer > object.l || uperLayer < object.l) {
                            object.l = uperLayer;
                            if (object.l !== 0) {
                                eval(`layer${object.l}.removeChild(object["body" + "wing2"]);`);
                                eval(`layer${object.l}.removeChild(object["body" + "wing1"]);`);
                                eval(`layer${object.l}.removeChild(object.body);`);
                                eval(`layer${object.l}.removeChild(object.shadow);`);

                                eval(`layer${uperLayer}.addChild(object["body" + "wing2"]);`);
                                eval(`layer${uperLayer}.addChild(object.body);`);
                                eval(`layer${uperLayer}.addChild(object["body" + "wing1"]);`);
                                eval(`layer${uperLayer}.addChild(object.shadow);`);
                            }
                        }
                        if (!nosound)
                            $scope.play("Jump", SOUNDS.system);

                        var jompeo = 1 + eval((`0.${distance}+1`));
                        if (nosound)
                            jompeo = 1;

                        createjs.Tween.get(object.shadow).to({
                            x: ((x) * $scope.baseWidth),
                            y: ((y) * $scope.baseWidth) + 8,
                            scale: jompeo
                        }, speed);

                        for (var wing of ["wing1", "wing2"])
                            createjs.Tween.get(object["body" + wing]).to({
                                x: ((x) * $scope.baseWidth),
                                y: ((y) * $scope.baseWidth),
                                scale: jompeo
                            }, speed);

                        $scope.runCamera(object, ((x) * $scope.baseWidth), ((y) * $scope.baseWidth), speed);
                        createjs.Tween.get(object.body).to({
                            x: ((x) * $scope.baseWidth),
                            y: ((y) * ($scope.baseHeight)),
                            scale: jompeo
                        }, speed).call(function () {
                            createjs.Tween.get(object.body).to({scale: 1}, speed);
                            for (var wing of ["wing1", "wing2"])
                                createjs.Tween.get(object["body" + wing]).to({scale: 1}, speed);


                            createjs.Tween.get(object.shadow).to({scale: 1}, speed).call(function () {
                                object.x = x;
                                object.y = y;
                                if (object.deeping) {

                                    if (object.isNPC) {
                                        ACTIONS.ANIMATION.PLAY_NPC(object.name, "Dive", "UP");
                                    } else if (object.isObject) {
                                        ACTIONS.ANIMATION.PLAY_OBJECT(object.name, "Dive", "UP");
                                    } else {
                                        ACTIONS.ANIMATION.PLAY_PLAYER("Dive", "UP");
                                    }
                                }
                                $scope.transition = false;
                            });
                        });

                    }
                }
            },
            FILTER: function (object, light, alpha, color) {
                var color = tinycolor(color);
                if (object.isObject) {
                    $scope.reDrawObject(object);
                    $scope.reDrawObject(object, [new createjs.ColorFilter(light, light, light, alpha, color._r, color._g, color._b)]);
                } else {
                    $scope.reDrawPlayer(object);
                    $scope.reDrawPlayer(object, [new createjs.ColorFilter(light, light, light, alpha, color._r, color._g, color._b)]);
                }
            },
            FILTER_STAGE: function (light, alpha, color) {
                var color = tinycolor(color);
                layer1.filters = [new createjs.ColorFilter(light, light, light, alpha, color._r, color._g, color._b)];
            },
            CLEAR_FILTER: function (object) {
                if (object.isObject) {
                    $scope.reDrawObject(object);
                } else
                    $scope.reDrawPlayer(object);
            },
            TEXT: function (text, seconds) {
                ACTIONS.GAME.SCREEN(0.1, "#000", 1, function () {
                    $scope.playLoading(text);
                    setTimeout(function () {
                        $scope.stopLoading();
                        ACTIONS.GAME.SCREENOFF(0.1);
                    }, seconds * 1000);
                });

            }
        },
        PLAYER: {
            OFF: function () {
                if ($scope.hero.staticing) {
                    ACTIONS.PLAYER.Thunder();
                }
                if ($scope.hero.watering) {
                    ACTIONS.PLAYER.WATERELEMENTAL();
                }
                if ($scope.hero.hidden) {
                    ACTIONS.PLAYER.HIDE();
                }
                if ($scope.hero.flying) {
                    ACTIONS.PLAYER.FLY();
                }
            },
            WATERELEMENTAL: function () {
                if ($scope.hero.staticing)
                    return;
                if ($scope.hero.walking)
                    return;
                if (!$scope.transition) {
                    $scope.transition = true;
                    if ($scope.hero.flying) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.hero.deeping) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.hero.hidden) {
                        $scope.transition = false;
                        return;
                    }

                    if (!$scope.hero.watering) {
                        $scope.hero.watering = true;
                        if ($scope.hero.speed)
                            $scope.hero.speed = $scope.hero.base_speed * 4;
                        ACTIONS.ANIMATION.PLAY_PLAYER("WaterElemental", undefined, function () {
                            $scope.transition = false;
                        });
                        ACTIONS.PLAYER.FILTER(0.5, 1, "blue");
                    } else {
                        $scope.hero.watering = false;
                        if ($scope.hero.speed)
                            $scope.hero.speed = $scope.hero.base_speed;
                        ACTIONS.ANIMATION.PLAY_PLAYER("WaterElemental", undefined, function () {
                            $scope.transition = false;
                        });
                        ACTIONS.PLAYER.CLEAR_FILTER();
                    }
                }
            },
            Thunder: function () {
                if ($scope.hero.watering)
                    return;
                if ($scope.hero.walking)
                    return;
                if ($scope.hero.hidden)
                    return;
                if (!$scope.transition) {
                    $scope.transition = true;
                    if ($scope.hero.flying) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.hero.deeping) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.hero.hidden) {
                        $scope.transition = false;
                        return;
                    }

                    if (!$scope.hero.staticing) {
                        $scope.hero.staticing = true;
                        if ($scope.hero.speed)
                            $scope.hero.speed = $scope.hero.base_speed / 4;
                        ACTIONS.ANIMATION.PLAY_UP($scope.hero, "Thunder", function () {
                            ACTIONS.PLAYER.FILTER(1.5, 1, "#FFDD3C");
                            $scope.transition = false;
                        });

                    } else {
                        $scope.hero.staticing = false;
                        if ($scope.hero.speed)
                            $scope.hero.speed = $scope.hero.base_speed;
                        ACTIONS.ANIMATION.PLAY_PLAYER("Show", undefined, function () {
                            $scope.transition = false;
                        });
                        ACTIONS.PLAYER.CLEAR_FILTER();
                    }
                }
            },
            FIREELEMENTAL: function () {
                if ($scope.hero.staticing) {
                    if (!$scope.transition) {
                        $scope.transition = true;
                        if (ACTIONS.PLAYER.POSITION() === "up") {
                            ACTIONS.ANIMATION.PLAY_PLAYER("Teleport", undefined, function () {
                                ACTIONS.PLAYER.TELEPORT($scope.hero.x, 0);
                                $scope.transition = false;
                            });
                        }

                        if (ACTIONS.PLAYER.POSITION() === "down") {
                            ACTIONS.ANIMATION.PLAY_PLAYER("Teleport", undefined, function () {
                                ACTIONS.PLAYER.TELEPORT($scope.hero.x, maps[FIRSTMAP].height - 1);
                                $scope.transition = false;
                            });
                        }

                        if (ACTIONS.PLAYER.POSITION() === "left") {
                            ACTIONS.ANIMATION.PLAY_PLAYER("Teleport", undefined, function () {
                                ACTIONS.PLAYER.TELEPORT(0, $scope.hero.y);
                                $scope.transition = false;
                            });
                        }

                        if (ACTIONS.PLAYER.POSITION() === "right") {
                            ACTIONS.ANIMATION.PLAY_PLAYER("Teleport", undefined, function () {
                                ACTIONS.PLAYER.TELEPORT(maps[FIRSTMAP].width - 1, $scope.hero.y);
                                $scope.transition = false;
                            });
                        }
                    }
                    return;
                }
                if (!$scope.transition) {
                    $scope.transition = true;
                    if ($scope.hero.flying) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.hero.deeping) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.hero.hidden) {
                        $scope.transition = false;
                        return;
                    }
                    var oldposition = ACTIONS.PLAYER.POSITION();
                    ACTIONS.PLAYER.GET().body.gotoAndPlay("gire");
                    setTimeout(function () {
                        if (!$scope.hero.watering) {
                            ACTIONS.PLAYER.FILTER(0.5, 1, "red");

                            ACTIONS.ANIMATION.PLAY_PLAYER("FireElemental", undefined, function () {
                                if ($scope.hero.speed)
                                    $scope.hero.speed = 30;

                                if (oldposition === "up") {
                                    ACTIONS.PLAYER.MOVE($scope.hero.x, 0);
                                }

                                if (oldposition === "down") {
                                    ACTIONS.PLAYER.MOVE($scope.hero.x, maps[FIRSTMAP].height - 1);

                                }

                                if (oldposition === "left") {
                                    ACTIONS.PLAYER.MOVE(0, $scope.hero.y);

                                }

                                if (oldposition === "right") {
                                    ACTIONS.PLAYER.MOVE(maps[FIRSTMAP].width - 1, $scope.hero.y);
                                }

                                setTimeout(function () {
                                    if ($scope.hero.speed)
                                        $scope.hero.speed = $scope.hero.base_speed;
                                    ACTIONS.PLAYER.CLEAR_FILTER();
                                    ACTIONS.PLAYER.GET().body.gotoAndPlay(oldposition);
                                    $scope.transition = false;

                                }, 1000);
                            });
                        } else {
                            ACTIONS.ANIMATION.PLAY_PLAYER("Humo");
                            ACTIONS.PLAYER.GET().body.gotoAndPlay(oldposition);
                            $scope.transition = false;
                        }

                    }, 1000);
                }

            },
            EARTHELEMENTAL: function () {
                if (!$scope.transition) {
                    $scope.transition = true;
                    if ($scope.hero.flying) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.hero.deeping) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.hero.hidden) {
                        $scope.transition = false;
                        return;
                    }
                    var oldposition = ACTIONS.PLAYER.POSITION();

                    ACTIONS.ANIMATION.PLAY_PLAYER("EarthElemental", oldposition.toUpperCase(), function () {
                        setTimeout(function () {
                            var x, y;
                            if (oldposition === "up") {
                                x = $scope.hero.x;
                                y = $scope.hero.y - 1;
                            }
                            if (oldposition === "down") {
                                x = $scope.hero.x;
                                y = $scope.hero.y + 1;
                            }
                            if (oldposition === "left") {
                                x = $scope.hero.x - 1;
                                y = $scope.hero.y;
                            }
                            if (oldposition === "right") {
                                x = $scope.hero.x + 1;
                                y = $scope.hero.y;
                            }

                            var uperLayer = 1;
                            var upperObject = null;
                            for (var l = 1; l <= 9; l++) {
                                var obj = maps[FIRSTMAP].map[`${l}_${(x)}_${(y)}`];
                                if (obj) {
                                    uperLayer = l;
                                    upperObject = obj;
                                }
                            }

                            var L = uperLayer + 1;
                            if (!maps[FIRSTMAP].event[`${L}_${(x)}_${(y)}`]) {
                                if ($scope.hero.staticing) {

                                    x = $scope.hero.x;
                                    y = $scope.hero.y;
                                    $scope.transition = false;
                                    ACTIONS.PLAYER.CREATEMURITO(L, x, y - 1, 183, "A");
                                    ACTIONS.PLAYER.CREATEMURITO(L, x, y + 1, 183, "A2");

                                    ACTIONS.PLAYER.CREATEMURITO(L, x - 1, y - 1, 183, "B");
                                    ACTIONS.PLAYER.CREATEMURITO(L, x + 1, y - 1, 183, "C");

                                    ACTIONS.PLAYER.CREATEMURITO(L, x - 1, y + 1, 183, "B2");
                                    ACTIONS.PLAYER.CREATEMURITO(L, x + 1, y + 1, 183, "C2");

                                    ACTIONS.PLAYER.CREATEMURITO(L, x - 1, y, 183, "A");
                                    ACTIONS.PLAYER.CREATEMURITO(L, x + 1, y, 183, "A2");


                                } else {
                                    ACTIONS.PLAYER.CREATEMURITO(L, x, y, 199);
                                }
                            } else {
                                $scope.transition = false;
                            }
                        });
                    });
                }

            },
            CREATEMURITO: function (L, x, y, frame, adde) {
                var name = "Murito " + new Date().getTime() + "" + (adde || "");
                maps[FIRSTMAP].event[`${L}_${(x)}_${(y)}`] = {
                    "name": name,
                    "description": "",
                    "movement": "fixed",
                    "look": "DOWN",
                    "trigger": "click",
                    "trigger_step": 1,
                    "conditions": "1==1",
                    "actions": [],
                    "visible": "1==1",
                    "object": {
                        "url": "..\/resources\/objects\/Outside_B.png",
                        "animation": [
                            frame
                        ],
                        "framerate": 3,
                        "width": 48,
                        "height": 48,
                        "sound": "",
                        "canBreak": "0",
                        "canMove": "0",
                        "canMount": "1"
                    },
                    "isActor": "0",
                    "route": [],
                    "hero": {
                        "name": "",
                        "x": 0,
                        "y": 0,
                        "l": 1,
                        "body": null,
                        "shadow": null,
                        "speed": 300,
                        "walking": false
                    }
                };
                var e = maps[FIRSTMAP].event[`${L}_${(x)}_${(y)}`];
                $scope.loadObject(e).then(function () {
                    $scope.OBJECTS[e.name] = {
                        isObject: true,
                        name: e.name,
                        x: x,
                        y: y,
                        l: L,
                        body: null,
                        shadow: null,
                        speed: 300,
                        base_speed: 300,
                        event: e,
                        canJump: true,
                        canDive: true,
                        canFly: true,
                        deeping: false,
                        shadowY: 8,
                    };
                    $scope.drawObject($scope.OBJECTS[e.name], e.name, x, y, L);
                    $scope.transition = false;
                });
            },
            TELE: function () {

                if ($scope.hero.staticing) {
                    ACTIONS.ANIMATION.PLAY_PLAYER("Infinite", undefined, function () {
                        ACTIONS.PLAYER.TELEPORT(0, 0, "Elinfinito");
                        $scope.transition = false;
                    });
                    return;
                }
                if (!$scope.transition) {
                    $scope.transition = true;
                    if (ACTIONS.PLAYER.POSITION() === "up") {
                        ACTIONS.ANIMATION.PLAY_PLAYER("Teleport", undefined, function () {
                            ACTIONS.PLAYER.TELEPORT($scope.hero.x, 0);
                            $scope.transition = false;
                        });
                    }

                    if (ACTIONS.PLAYER.POSITION() === "down") {
                        ACTIONS.ANIMATION.PLAY_PLAYER("Teleport", undefined, function () {
                            ACTIONS.PLAYER.TELEPORT($scope.hero.x, maps[FIRSTMAP].height - 1);
                            $scope.transition = false;
                        });
                    }

                    if (ACTIONS.PLAYER.POSITION() === "left") {
                        ACTIONS.ANIMATION.PLAY_PLAYER("Teleport", undefined, function () {
                            ACTIONS.PLAYER.TELEPORT(0, $scope.hero.y);
                            $scope.transition = false;
                        });
                    }

                    if (ACTIONS.PLAYER.POSITION() === "right") {
                        ACTIONS.ANIMATION.PLAY_PLAYER("Teleport", undefined, function () {
                            ACTIONS.PLAYER.TELEPORT(maps[FIRSTMAP].width - 1, $scope.hero.y);
                            $scope.transition = false;
                        });
                    }
                }
            },
            SHAKE: function (interval, distance, times, callback) {
                if ($scope.hero) {
                    ACTIONS.GAME.SHAKE($scope.hero.body, interval, distance, times, callback);
                    ACTIONS.GAME.SHAKE($scope.hero.shadow, interval, distance, times, callback);
                }
            },
            /**
             * @return {null}
             */
            POSITION: function () {
                if ($scope.hero)
                    return $scope.hero.body.currentAnimation;
                return null;
            },
            HIDE: function () {
                if ($scope.hero.watering)
                    return;
                if (!$scope.transition) {
                    $scope.transition = true;
                    if ($scope.hero.flying) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.hero.staticing) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.hero.deeping) {
                        $scope.transition = false;
                        return;
                    }
                    if (!$scope.hero.hidden) {
                        $scope.hero.hidden = true;
                        if ($scope.hero.speed)
                            $scope.hero.speed = $scope.hero.base_speed * 1.50;
                        ACTIONS.ANIMATION.PLAY_PLAYER("Hide", undefined, function () {
                            $scope.transition = false;
                        });
                        ACTIONS.PLAYER.ALPHA(0.1);
                    } else {
                        $scope.hero.hidden = false;
                        if ($scope.hero.speed)
                            $scope.hero.speed = $scope.hero.base_speed;
                        ACTIONS.ANIMATION.PLAY_PLAYER("Show", undefined, function () {
                            $scope.transition = false;
                        });
                        ACTIONS.PLAYER.ALPHA(1);
                    }
                }
            },
            ALPHA: function (alpha, callback) {
                if ($scope.hero)
                    ACTIONS.GAME.ALPHA($scope.hero, alpha, callback);
            },
            MOVE: function (x, y, callback) {
                if ($scope.hero)
                    $scope.move($scope.hero, {
                        stageX: (x * $scope.baseWidth) - STAGE.regX,
                        stageY: (y * $scope.baseHeight) - STAGE.regY
                    }, undefined, callback);
            },
            MOVE_UP: function (callback) {
                if ($scope.hero.y - 1 >= 0)
                    ACTIONS.GAME.MOVEOBJECT($scope.hero, $scope.hero.x, $scope.hero.y - 1, callback);
            },
            MOVE_DOWN: function (callback) {
                if ($scope.hero.y + 1 < maps[FIRSTMAP].height)
                    ACTIONS.GAME.MOVEOBJECT($scope.hero, $scope.hero.x, $scope.hero.y + 1, callback);
            },
            MOVE_RIGHT: function (callback) {
                if ($scope.hero.x + 1 < maps[FIRSTMAP].width)
                    ACTIONS.GAME.MOVEOBJECT($scope.hero, $scope.hero.x + 1, $scope.hero.y, callback);
            },
            MOVE_LEFT: function (callback) {
                if ($scope.hero.x - 1 >= 0)
                    ACTIONS.GAME.MOVEOBJECT($scope.hero, $scope.hero.x - 1, $scope.hero.y, callback);
            },
            UP: function () {
                if ($scope.hero)
                    $scope.hero.body.gotoAndPlay("up");
            },
            DOWN: function () {
                if ($scope.hero)
                    $scope.hero.body.gotoAndPlay("down");
            },
            RIGHT: function () {
                if ($scope.hero)
                    $scope.hero.body.gotoAndPlay("right");
            },
            LEFT: function () {
                if ($scope.hero)
                    $scope.hero.body.gotoAndPlay("left");
            },
            GET: function () {
                return $scope.hero;
            },
            LOOK: function (to) {
                if ($scope.hero && to) {
                    var xd = difference($scope.hero.x, to.x);
                    var yd = difference($scope.hero.y, to.y);
                    if (xd === yd) {
                        if ($scope.hero.x < to.x) {
                            if ($scope.hero.body)
                                $scope.hero.body.gotoAndPlay("right");
                        } else if ($scope.hero.x > to.x) {
                            if ($scope.hero.body)
                                $scope.hero.body.gotoAndPlay("left");
                        } else if ($scope.hero.y < to.y) {
                            if ($scope.hero.body)
                                $scope.hero.body.gotoAndPlay("down");
                        } else if ($scope.hero.y > to.y) {
                            if ($scope.hero.body)
                                $scope.hero.body.gotoAndPlay("up");
                        }
                    } else if (xd > yd) {
                        if ($scope.hero.x < to.x) {
                            if ($scope.hero.body)
                                $scope.hero.body.gotoAndPlay("right");
                        } else if ($scope.hero.x > to.x) {
                            if ($scope.hero.body)
                                $scope.hero.body.gotoAndPlay("left");
                        }
                    } else {
                        if ($scope.hero.y < to.y) {
                            if ($scope.hero.body)
                                $scope.hero.body.gotoAndPlay("down");
                        } else if ($scope.hero.y > to.y) {
                            if ($scope.hero.body)
                                $scope.hero.body.gotoAndPlay("up");
                        }
                    }
                }
            },
            LOOKDIR: function (x, y) {
                var to = {x: x, y: y};
                if ($scope.hero && to) {
                    var xd = difference($scope.hero.x, to.x);
                    var yd = difference($scope.hero.y, to.y);
                    if (xd === yd) {
                        if ($scope.hero.x < to.x) {
                            if ($scope.hero.body) {
                                for (var wing of ["wing1", "wing2"])
                                    $scope.hero["body" + wing].gotoAndPlay("right");
                                $scope.hero.body.gotoAndPlay("right");
                            }
                        } else if ($scope.hero.x > to.x) {
                            if ($scope.hero.body) {
                                for (var wing of ["wing1", "wing2"])
                                    $scope.hero["body" + wing].gotoAndPlay("left");
                                $scope.hero.body.gotoAndPlay("left");
                            }
                        } else if ($scope.hero.y < to.y) {
                            if ($scope.hero.body) {
                                for (var wing of ["wing1", "wing2"])
                                    $scope.hero["body" + wing].gotoAndPlay("down");
                                $scope.hero.body.gotoAndPlay("down");
                            }
                        } else if ($scope.hero.y > to.y) {
                            if ($scope.hero.body) {
                                for (var wing of ["wing1", "wing2"])
                                    $scope.hero["body" + wing].gotoAndPlay("up");
                                $scope.hero.body.gotoAndPlay("up");
                            }
                        }
                    } else if (xd > yd) {
                        if ($scope.hero.x < to.x) {
                            if ($scope.hero.body) {
                                for (var wing of ["wing1", "wing2"])
                                    $scope.hero["body" + wing].gotoAndPlay("right");
                                $scope.hero.body.gotoAndPlay("right");
                            }
                        } else if ($scope.hero.x > to.x) {
                            if ($scope.hero.body) {
                                for (var wing of ["wing1", "wing2"])
                                    $scope.hero["body" + wing].gotoAndPlay("left");
                                $scope.hero.body.gotoAndPlay("left");
                            }
                        }
                    } else {
                        if ($scope.hero.y < to.y) {
                            if ($scope.hero.body) {
                                for (var wing of ["wing1", "wing2"])
                                    $scope.hero["body" + wing].gotoAndPlay("down");
                                $scope.hero.body.gotoAndPlay("down");
                            }
                        } else if ($scope.hero.y > to.y) {
                            if ($scope.hero.body) {
                                for (var wing of ["wing1", "wing2"])
                                    $scope.hero["body" + wing].gotoAndPlay("up");
                                $scope.hero.body.gotoAndPlay("up");
                            }
                        }
                    }
                }
            },
            LOOKNPC: function (name) {
                ACTIONS.PLAYER.LOOK($scope.NPCS[name]);
            },
            LOOKOBJECT: function (name) {
                ACTIONS.PLAYER.LOOK($scope.OBJECTS[name]);
            },
            TELEPORT: async function (x, y, mapname, animation, callback) {
                await ACTIONS.GAME.TELEPORT($scope.hero, x, y, mapname, animation, callback);
            },
            TELEPORT_NPC: async function (name, dir, mapname, animation, callback) {
                ACTIONS.GAME.TELEPORT_TO($scope.hero, $scope.NPCS[name], dir, mapname, animation, callback);
            },
            TELEPORT_OBJECT: async function (name, dir, mapname, animation, callback) {
                ACTIONS.GAME.TELEPORT_TO($scope.hero, $scope.OBJECTS[name], dir, mapname, animation, callback);
            },
            JUMP: function (x, y) {
                if ($scope.hero.canJump)
                    ACTIONS.GAME.JUMP($scope.hero, x, y);
            },
            FLY: function () {
                if ($scope.hero.canFly)
                    ACTIONS.GAME.FLY($scope.hero);
            },
            JUMP_UP: function () {
                if ($scope.hero.canJump)
                    ACTIONS.GAME.JUMP($scope.hero, $scope.hero.x, $scope.hero.y - 1);
            },
            JUMP_DOWN: function () {
                if ($scope.hero.canJump)
                    ACTIONS.GAME.JUMP($scope.hero, $scope.hero.x, $scope.hero.y + 1);
            },
            JUMP_LEFT: function () {
                if ($scope.hero.canJump)
                    ACTIONS.GAME.JUMP($scope.hero, $scope.hero.x - 1, $scope.hero.y);
            },
            JUMP_RIGHT: function () {
                if ($scope.hero.canJump)
                    ACTIONS.GAME.JUMP($scope.hero, $scope.hero.x + 1, $scope.hero.y);
            },
            JUMPING: function () {
                if ($scope.hero.canJump)
                    if (ACTIONS.PLAYER.POSITION()[0] !== "w")
                        eval(`ACTIONS.PLAYER.JUMP_${ACTIONS.PLAYER.POSITION().toUpperCase()}();`);
            },
            LIGH: function (time) {
                ACTIONS.GAME.FLASH("white", 1);
                if ($scope.ambient === "darkcave") {
                    ACTIONS.PLAYER.FILTER(2, 1, "#000");
                    $scope.ambient = "natural";
                    ACTIONS.AMBIENT.RUN();
                    setTimeout(function () {
                        ACTIONS.GAME.PAUSE();
                        $scope.ambient = "darkcave";
                        ACTIONS.AMBIENT.RUN();
                        ACTIONS.PLAYER.CLEAR_FILTER();
                        setTimeout(function () {
                            ACTIONS.GAME.RESUME();
                        }, 1000);
                    }, time * 1000)
                }
            },
            FILTER: function (light, alpha, color) {
                ACTIONS.GAME.FILTER($scope.hero, light, alpha, color);
            },
            CLEAR_FILTER: function () {
                ACTIONS.GAME.CLEAR_FILTER($scope.hero);
            }
        },
        NPC: {
            SCROLLTO: function (name, s_in, s_state, s_out, callback) {
                ACTIONS.GAME.SCROLLTO(STAGE, $scope.NPCS[name], s_in, s_state, s_out, callback);
            },
            SHAKE: function (name, interval, distance, times, callback) {
                ACTIONS.GAME.SHAKE($scope.NPCS[name].body, interval, distance, times, callback);
                ACTIONS.GAME.SHAKE($scope.NPCS[name].shadow, interval, distance, times, callback);
            },
            REMOVE: function (name) {
                if ($scope.NPCS[name]) {
                    eval(`layer${$scope.NPCS[name].l}.removeChild($scope.NPCS[name].body)`);
                    eval(`layer${$scope.NPCS[name].l}.removeChild($scope.NPCS[name].shadow)`);
                    delete $scope.NPCS[name];
                    STAGE.update();
                }
            },
            /**
             * @return {null}
             */
            POSITION: function (name) {
                if ($scope.NPCS[name])
                    return $scope.NPCS[name].body.currentAnimation;
                return null;
            },
            ALPHA: function (name, alpha, callback) {
                ACTIONS.GAME.ALPHA($scope.NPCS[name], alpha, callback);
            },
            TELEPORT: async function (name, x, y, animation, callback) {
                ACTIONS.GAME.TELEPORT($scope.NPCS[name], x, y, undefined, animation, callback);
            },
            TELEPORT_PLAYER: async function (name, dir, mapname, animation, callback) {
                ACTIONS.GAME.TELEPORT_TO($scope.NPCS[name], $scope.hero, dir, mapname, animation, callback);
            },
            TELEPORT_OBJECT: async function (npc, name, dir, mapname, animation, callback) {
                ACTIONS.GAME.TELEPORT_TO($scope.NPCS[npc], $scope.OBJECTS[name], dir, mapname, animation, callback);
            },
            MOVE: function (name, x, y, callback) {
                ACTIONS.GAME.MOVE($scope.NPCS, name, x, y, callback);
            },
            MOVE_UP: function (name, callback) {
                ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x, $scope.NPCS[name].y - 1, callback);
            },
            MOVE_DOWN: function (name, callback) {
                ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x, $scope.NPCS[name].y + 1, callback);
            },
            MOVE_RIGHT: function (name, callback) {
                ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x + 1, $scope.NPCS[name].y, callback);
            },
            MOVE_LEFT: function (name, callback) {
                ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x - 1, $scope.NPCS[name].y, callback);
            },
            UP: function (name) {
                if ($scope.NPCS[name]) {
                    for (var wing of ["wing1", "wing2"])
                        $scope.NPCS[name]["body" + wing].gotoAndPlay("up");
                    $scope.NPCS[name].body.gotoAndPlay("up");
                }
            },
            DOWN: function (name) {
                if ($scope.NPCS[name]) {
                    for (var wing of ["wing1", "wing2"])
                        $scope.NPCS[name]["body" + wing].gotoAndPlay("down");
                    $scope.NPCS[name].body.gotoAndPlay("down");
                }
            },
            RIGHT: function (name) {
                if ($scope.NPCS[name]) {
                    for (var wing of ["wing1", "wing2"])
                        $scope.NPCS[name]["body" + wing].gotoAndPlay("right");
                    $scope.NPCS[name].body.gotoAndPlay("right");
                }
            },
            LEFT: function (name) {
                if ($scope.NPCS[name]) {
                    for (var wing of ["wing1", "wing2"])
                        $scope.NPCS[name]["body" + wing].gotoAndPlay("left");
                    $scope.NPCS[name].body.gotoAndPlay("left");
                }
            },
            GET: function (name) {
                return $scope.NPCS[name];
            },
            LOOK: function (from, to) {
                if (from && to) {
                    var xd = difference(from.x, to.x);
                    var yd = difference(from.y, to.y);
                    if (xd === yd) {
                        if (from.x < to.x) {
                            for (var wing of ["wing1", "wing2"])
                                from["body" + wing].gotoAndPlay("right");
                            from.body.gotoAndPlay("right");
                        } else if (from.x > to.x) {
                            for (var wing of ["wing1", "wing2"])
                                from["body" + wing].gotoAndPlay("left");
                            from.body.gotoAndPlay("left");
                        } else if (from.y < to.y) {
                            for (var wing of ["wing1", "wing2"])
                                from["body" + wing].gotoAndPlay("down");
                            from.body.gotoAndPlay("down");
                        } else if (from.y > to.y) {
                            for (var wing of ["wing1", "wing2"])
                                from["body" + wing].gotoAndPlay("up");
                            from.body.gotoAndPlay("up");
                        }
                    } else if (xd > yd) {
                        if (from.x < to.x) {
                            for (var wing of ["wing1", "wing2"])
                                from["body" + wing].gotoAndPlay("right");
                            from.body.gotoAndPlay("right");
                        } else if (from.x > to.x) {
                            for (var wing of ["wing1", "wing2"])
                                from["body" + wing].gotoAndPlay("left");
                            from.body.gotoAndPlay("left");
                        }
                    } else {
                        if (from.y < to.y) {
                            for (var wing of ["wing1", "wing2"])
                                from["body" + wing].gotoAndPlay("down");
                            from.body.gotoAndPlay("down");
                        } else if (from.y > to.y) {
                            for (var wing of ["wing1", "wing2"])
                                from["body" + wing].gotoAndPlay("up");
                            from.body.gotoAndPlay("up");
                        }
                    }
                }
            },
            BUBBLE: function (name, message, time, callback) {
                if ($scope.NPCS[name]) {
                    ACTIONS.MESSAGE.BUBBLE($scope.NPCS[name].x, $scope.NPCS[name].y, message, time, callback);
                }
            },
            JUMP: function (name, x, y) {
                ACTIONS.GAME.JUMP($scope.NPCS[name], x, y);
            },
            JUMP_UP: function (name) {
                ACTIONS.GAME.JUMP($scope.NPCS[name], $scope.NPCS[name].x, $scope.NPCS[name].y - 1);
            },
            JUMP_DOWN: function (name) {
                ACTIONS.GAME.JUMP($scope.NPCS[name], $scope.NPCS[name].x, $scope.NPCS[name].y + 1);
            },
            JUMP_LEFT: function (name) {
                ACTIONS.GAME.JUMP($scope.NPCS[name], $scope.NPCS[name].x - 1, $scope.NPCS[name].y);
            },
            JUMP_RIGHT: function (name) {
                ACTIONS.GAME.JUMP($scope.NPCS[name], $scope.NPCS[name].x + 1, $scope.NPCS[name].y);
            },
            FILTER: function (name, light, alpha, color) {
                ACTIONS.GAME.FILTER($scope.NPCS[name], light, alpha, color);
            },
            CLEAR_FILTER: function (name) {
                ACTIONS.GAME.CLEAR_FILTER($scope.NPCS[name]);
            },
            LIGH: function (npc, time) {
                ACTIONS.GAME.FLASH("white", 1);
                if ($scope.ambient === "darkcave") {
                    ACTIONS.NPC.FILTER(npc, 2, 1, "#000");
                    $scope.ambient = "natural";
                    ACTIONS.AMBIENT.RUN();
                    setTimeout(function () {
                        ACTIONS.GAME.PAUSE();
                        $scope.ambient = "darkcave";
                        ACTIONS.AMBIENT.RUN();
                        ACTIONS.NPC.CLEAR_FILTER(npc);
                        setTimeout(function () {
                            ACTIONS.GAME.RESUME();
                        }, 1000);
                    }, time * 1000)
                }
            },
            FLY: function (name) {
                ACTIONS.GAME.FLY($scope.NPCS[name]);
            },
            HIDE: function (name) {
                if ($scope.NPCS[name].flying)
                    return;
                if ($scope.NPCS[name].deeping)
                    return;
                if (!$scope.NPCS[name].hidden) {
                    $scope.NPCS[name].hidden = true;
                    if ($scope.NPCS[name].speed)
                        $scope.NPCS[name].speed = $scope.NPCS[name].base_speed * 1.50;
                    ACTIONS.ANIMATION.PLAY_IN($scope.NPCS[name], "Hide", function () {

                    });

                    ACTIONS.NPC.ALPHA(name, 0.1);
                } else {
                    $scope.NPCS[name].hidden = false;
                    if ($scope.NPCS[name].speed)
                        $scope.NPCS[name].speed = $scope.NPCS[name].base_speed;
                    ACTIONS.ANIMATION.PLAY_IN($scope.NPCS[name], "Show", function () {

                    });
                    ACTIONS.NPC.ALPHA(name, 1);
                }
            },
            TELE: function (name) {
                if (ACTIONS.NPC.POSITION(name) === "up") {
                    ACTIONS.ANIMATION.PLAY_NPC(name, "Teleport", undefined, function () {
                        ACTIONS.NPC.TELEPORT(name, $scope.NPCS[name].x, 0);
                    });
                }

                if (ACTIONS.NPC.POSITION(name) === "down") {
                    ACTIONS.ANIMATION.PLAY_NPC(name, "Teleport", undefined, function () {
                        ACTIONS.NPC.TELEPORT(name, $scope.NPCS[name].x, maps[FIRSTMAP].height - 1);
                    });
                }

                if (ACTIONS.NPC.POSITION(name) === "left") {
                    ACTIONS.ANIMATION.PLAY_NPC(name, "Teleport", undefined, function () {
                        ACTIONS.NPC.TELEPORT(name, 0, $scope.NPCS[name].y);
                    });
                }

                if (ACTIONS.NPC.POSITION(name) === "right") {
                    ACTIONS.ANIMATION.PLAY_NPC(name, "Teleport", undefined, function () {
                        ACTIONS.NPC.TELEPORT(name, maps[FIRSTMAP].width - 1, $scope.NPCS[name].y);
                    });
                }
            },
        },
        OBJECT: {
            SHAKE: function (name, interval, distance, times, callback) {
                ACTIONS.GAME.SHAKE($scope.OBJECTS[name].body, interval, distance, times, callback);
            },
            REMOVE: function (name) {
                if ($scope.OBJECTS[name]) {
                    eval(`layer${$scope.OBJECTS[name].l}.removeChild($scope.OBJECTS[name].body)`);
                    eval(`layer${$scope.OBJECTS[name].l}.removeChild($scope.OBJECTS[name].shadow)`);
                    delete $scope.OBJECTS[name];
                    STAGE.update();
                }
            },
            ALPHA: function (name, alpha, callback) {
                ACTIONS.GAME.ALPHA($scope.OBJECTS[name], alpha, callback);
            },
            TELEPORT: async function (name, x, y, animation, callback) {
                ACTIONS.GAME.TELEPORT($scope.OBJECTS[name], x, y, undefined, animation, callback);
            },
            TELEPORT_PLAYER: async function (name, dir, mapname, animation, callback) {
                ACTIONS.GAME.TELEPORT_TO($scope.OBJECTS[name], $scope.hero, dir, mapname, animation, callback);
            },
            TELEPORT_NPC: async function (name, npc, dir, mapname, animation, callback) {
                ACTIONS.GAME.TELEPORT_TO($scope.OBJECTS[name], $scope.NPCS[npc], dir, mapname, animation, callback);
            },
            GET: function (name) {
                return $scope.OBJECTS[name];
            },
            MOVE: function (name, x, y, callback) {
                ACTIONS.GAME.MOVE($scope.OBJECTS, name, x, y, callback);
            },
            MOVE_UP: function (name, callback) {
                ACTIONS.OBJECT.MOVE(name, $scope.OBJECTS[name].x, $scope.OBJECTS[name].y - 1, callback);
            },
            MOVE_DOWN: function (name, callback) {
                ACTIONS.OBJECT.MOVE(name, $scope.OBJECTS[name].x, $scope.OBJECTS[name].y + 1, callback);
            },
            MOVE_RIGHT: function (name, callback) {
                ACTIONS.OBJECT.MOVE(name, $scope.OBJECTS[name].x + 1, $scope.OBJECTS[name].y, callback);
            },
            MOVE_LEFT: function (name, callback) {
                ACTIONS.OBJECT.MOVE(name, $scope.OBJECTS[name].x - 1, $scope.OBJECTS[name].y, callback);
            },
            BUBBLE: function (name, message, time, callback) {
                if ($scope.OBJECTS[name]) {
                    ACTIONS.MESSAGE.BUBBLE($scope.OBJECTS[name].x, $scope.OBJECTS[name].y, message, time, callback);
                }
            },
            JUMP: function (name, x, y) {
                ACTIONS.GAME.JUMP($scope.OBJECTS[name], x, y);
            },
            JUMP_UP: function (name) {
                ACTIONS.GAME.JUMP($scope.OBJECTS[name], $scope.OBJECTS[name].x, $scope.OBJECTS[name].y - 1);
            },
            JUMP_DOWN: function (name) {
                ACTIONS.GAME.JUMP($scope.OBJECTS[name], $scope.OBJECTS[name].x, $scope.OBJECTS[name].y + 1);
            },
            JUMP_LEFT: function (name) {
                ACTIONS.GAME.JUMP($scope.OBJECTS[name], $scope.OBJECTS[name].x - 1, $scope.OBJECTS[name].y);
            },
            JUMP_RIGHT: function (name) {
                ACTIONS.GAME.JUMP($scope.OBJECTS[name], $scope.OBJECTS[name].x + 1, $scope.OBJECTS[name].y);
            },
            FILTER: function (name, light, alpha, color) {
                ACTIONS.GAME.FILTER($scope.OBJECTS[name], light, alpha, color);
            },
            CLEAR_FILTER: function (name) {
                ACTIONS.GAME.CLEAR_FILTER($scope.OBJECTS[name]);
            },
            ANIMATE: function (name, frames, interval, times, sound, callback) {
                var old = OSO(ACTIONS.OBJECT.GET(name).body._animation.frames);
                var codes = [];
                for (var i = 0; i < frames.length * (times || 1); i++) {
                    codes.push(`ACTIONS.OBJECT.GET(name).body.gotoAndStop(${frames[i % frames.length]});`);
                }
                $scope.play(sound, SOUNDS.system);
                for (var t = 0; t < frames.length * (times || 1); t++) {
                    setTimeout(() => {
                        eval(codes[0]);
                        codes.shift();
                    }, interval * t);
                }
                setTimeout(function () {
                    ACTIONS.OBJECT.GET(name).body.gotoAndPlay("run");
                    if (callback)
                        callback()
                }, interval * ((frames.length * (times || 1)) + 1));
            },
            CHANGE_FRAMES: function (name, frames) {
                ACTIONS.OBJECT.GET(name).body._animation.frames = frames;
                ACTIONS.OBJECT.GET(name).body.gotoAndPlay("run");
            },
            ORIGINAL_FRAMES: function (name) {
                ACTIONS.OBJECT.GET(name).body._animation.frames = ACTIONS.OBJECT.GET(name).event.object.animation;
            },
            DESTROY: function (name) {
                ACTIONS.ANIMATION.PLAY_OBJECT(name, "Break", undefined, function () {

                });
                ACTIONS.ANIMATION.PLAY_OBJECT(name, "AfterBreak", "UP", function () {
                    eval(`layer${$scope.OBJECTS[name].l}.removeChild($scope.OBJECTS[name].body);`);
                    delete $scope.OBJECTS[name];
                });
            },
            RODATE: function (position, name) {
                var moveer = true;
                if (position === "up")
                    if ($scope.collision($scope.OBJECTS[name], $scope.OBJECTS[name].x, $scope.OBJECTS[name].y - 1))
                        moveer = false;
                if (position === "down")
                    if ($scope.collision($scope.OBJECTS[name], $scope.OBJECTS[name].x, $scope.OBJECTS[name].y + 1))
                        moveer = false;
                if (position === "left")
                    if ($scope.collision($scope.OBJECTS[name], $scope.OBJECTS[name].x - 1, $scope.OBJECTS[name].y))
                        moveer = false;
                if (position === "right")
                    if ($scope.collision($scope.OBJECTS[name], $scope.OBJECTS[name].x + 1, $scope.OBJECTS[name].y))
                        moveer = false;

                ACTIONS.ANIMATION.PLAY_OBJECT(name, "Move", undefined);
                if (moveer) {

                    eval(`ACTIONS.OBJECT.MOVE_${position.toUpperCase().replace("W", "").replace("DON", "DOWN")}(name);`);

                }
            }
        },
        MESSAGE: {
            CONFIG: {
                TIME: {MESSAGE: 3, NOTI: 2}
            },
            QUEUE: [],
            ADD: function (hero, message) {
                if (Array.isArray(message))
                    message.forEach(d => {
                        $scope.messageQuee.push({hero: hero, message: d});
                    });
                else
                    $scope.messageQuee.push({hero: hero, message: message});
            },
            ADDPLAY: function (hero, message, time, callback) {
                ACTIONS.MESSAGE.ADD(hero, message);
                ACTIONS.MESSAGE.PLAY(time, callback);
            },
            CLEAR: function () {
                $scope.messageQuee = [];
            },
            PLAY: function (time, callback) {
                if ($scope.messageQuee.length > 0) {
                    ACTIONS.GAME.PAUSE();
                    var item = OSO($scope.messageQuee[0]);
                    $scope.messageQuee.shift();
                    $scope.dialogText = item.message || "...";

                    if (item.hero.isNPC)
                        $scope.dialogHero = $scope.NPCS[item.hero];
                    else
                        $scope.dialogHero = {name: item.hero, version: new Date().getTime()};

                    if (!$scope.$$phase)
                        $scope.$digest();
                    $("#texts").show(200);
                    $scope.play("Talk", SOUNDS.system);
                    $scope.dialogTiming = setTimeout(function () {
                        $("#texts").hide(200);
                        if ($scope.messageQuee.length > 0)
                            ACTIONS.MESSAGE.PLAY(time, callback);
                        else {
                            ACTIONS.GAME.RESUME();
                            if (callback)
                                callback();
                        }
                    }, time || (ACTIONS.MESSAGE.CONFIG.TIME.MESSAGE * 1000));
                } else {
                    ACTIONS.GAME.RESUME();
                    ACTIONS.MESSAGE.HIDE();
                    if (callback)
                        callback();
                }
            },
            CHOICE: function (npc, message, buttons) {
                ACTIONS.GAME.PAUSE();
                $scope.dialogButtons = buttons;
                $scope.dialogText = message || "...";
                $scope.dialogHero = $scope.NPCS[npc];

                if ($scope.NPCS[npc])
                    $scope.dialogHero = $scope.NPCS[npc];
                else
                    $scope.dialogHero = {name: npc, version: new Date().getTime()};

                if (!$scope.$$phase)
                    $scope.$digest();
                $("#texts").show(200);
                $scope.play("Talk", SOUNDS.system);
            },
            HIDE: function (button) {
                ACTIONS.GAME.RESUME();
                $("#texts").hide();
                $scope.dialogButtons = [{
                    text: "OK", click: function () {
                        ACTIONS.MESSAGE.REPLAY();
                    }
                }];
                $scope.messageQuee = [];
                if (!$scope.$$phase)
                    $scope.$digest();
            },
            REPLAY: function (time, callback) {
                clearInterval($scope.dialogTiming);
                ACTIONS.MESSAGE.PLAY(time, callback);
            },
            NOTI: function (message, time, callback) {
                $scope.notificationText = message || "...";
                if (!$scope.$$phase)
                    $scope.$digest();
                $("#notify").show();
                setTimeout(function () {
                    $("#notify").hide();
                    if (callback)
                        callback();
                }, time || (ACTIONS.MESSAGE.CONFIG.TIME.NOTI * 1000));
            },
            BUBBLE: function (x, y, message, time, callback) {
                if ($scope.bubbleTimeOut)
                    clearInterval($scope.bubbleTimeOut);
                $scope.bubbleText = message || "...";
                if (!$scope.$$phase)
                    $scope.$digest();
                $scope.bubble.x = ((x * $scope.baseWidth) + 8);
                $scope.bubble.y = ((y - 1) * $scope.baseHeight) + $scope.midHeight;
                $scope.bubble.visible = true;
                $scope.play("Talk", SOUNDS.system);
                $scope.bubbleTimeOut = setTimeout(function () {
                    $scope.bubble.visible = false;
                    if (callback)
                        callback();
                }, (time * 1000) || (ACTIONS.MESSAGE.CONFIG.TIME.NOTI * 1000));
            },
        },
        LOAD: {
            ADD: function (resources, callback) {
                //ACTIONS.GAME.PAUSE();
                var temp = new createjs.LoadQueue(false);
                temp.installPlugin(createjs.Sound);
                var loadJson = [];
                var newR = false;
                for (var url of resources) {
                    if (url.indexOf(".ogg") !== -1) {
                        if (!$scope.existSound(url)) {
                            loadJson.push({id: url, src: url});
                            newR = true;
                        }
                        $scope.addSound(url, url);
                    } else {
                        if (!$scope.getResource(url)) {
                            loadJson.push({id: url, src: url});
                            newR = true;
                        }
                    }
                }
                if (loadJson.length > 0) {
                    temp.loadManifest(loadJson);
                    temp.on("complete", function (event) {
                        for (var loaded of loadJson) {
                            $scope.addResource(loaded.src, temp.getResult(loaded.id));
                        }
                        ACTIONS.GAME.RESUME();
                        if (callback)
                            callback();
                    }, this);
                    temp.load();
                } else {
                    ACTIONS.GAME.RESUME();
                    if (callback)
                        callback();
                }
            },
            GET: function (url) {
                return $scope.getResource(url);
            }
        },
        ANIMATION: {
            PLAY: function (name, x, y, callback, loop, nopause, light, alpha, color, scale) {
                if (!nopause)
                    ACTIONS.GAME.PAUSE();
                var animation = $scope.animations[name];
                ACTIONS.LOAD.ADD([animation.file, animation.sound], function () {
                    var img = $scope.getResource(animation.file);
                    var format = new createjs.Bitmap(img);
                    var colorR = tinycolor(color || "#000");
                    format.filters = [new createjs.ColorFilter(light || 1, light || 1, light || 1, alpha || 1, colorR._r, colorR._g, colorR._b)];
                    format.cache(0, 0, img.width, img.height);
                    var frameW = img.width / animation.columns;
                    var frameH = img.height / animation.rows;
                    var SpriteSheet = new createjs.SpriteSheet({
                        framerate: animation.framerate,
                        "images": [format.cacheCanvas],
                        "frames": {width: frameW, height: frameH},
                        "animations": {
                            "run": {frames: animation.frames}
                        }
                    });
                    var sprite = new createjs.Sprite(SpriteSheet);
                    sprite.x = ((x * $scope.baseWidth) - (frameW / 2)) + $scope.midWidth;
                    sprite.y = ((y * $scope.baseHeight) - (frameH / 2)) + $scope.midHeight;
                    sprite.scale = scale || 1;
                    layer9.addChild(sprite);
                    if (!loop) {
                        sprite.addEventListener("animationend", function () {
                            sprite.removeAllEventListeners();
                            layer9.removeChild(sprite);
                            if (!nopause)
                                ACTIONS.GAME.RESUME();
                            if (callback)
                                callback();
                        });
                    } else {
                        if (!nopause)
                            ACTIONS.GAME.RESUME();
                    }
                    sprite.gotoAndPlay("run");
                    $scope.play(animation.sound, SOUNDS.system);
                });
            },
            THROW: function (name, x, y, x2, y2, time, callback, nopause, light, alpha, color, scale) {
                if (!nopause)
                    ACTIONS.GAME.PAUSE();
                var animation = $scope.animations[name];
                ACTIONS.LOAD.ADD([animation.file, animation.sound], function () {
                    var img = $scope.getResource(animation.file);
                    var format = new createjs.Bitmap(img);
                    var colorR = tinycolor(color || "#000");
                    format.filters = [new createjs.ColorFilter(light || 1, light || 1, light || 1, alpha || 1, colorR._r, colorR._g, colorR._b)];
                    format.cache(0, 0, img.width, img.height);
                    var frameW = img.width / animation.columns;
                    var frameH = img.height / animation.rows;
                    var SpriteSheet = new createjs.SpriteSheet({
                        framerate: animation.framerate,
                        "images": [format.cacheCanvas],
                        "frames": {width: frameW, height: frameH},
                        "animations": {
                            "run": {frames: animation.frames}
                        }
                    });
                    var sprite = new createjs.Sprite(SpriteSheet);
                    sprite.x = ((x * $scope.baseWidth) - (frameW / 2)) + $scope.midWidth;
                    sprite.y = ((y * $scope.baseHeight) - (frameH / 2)) + $scope.midHeight;
                    sprite.scale = scale || 1;
                    layer9.addChild(sprite);

                    createjs.Tween.get(sprite).to({
                        x: ((x2 * $scope.baseWidth) - (frameW / 2)) + $scope.midWidth,
                        y: ((y2 * $scope.baseHeight) - (frameH / 2)) + $scope.midHeight
                    }, time).call(function () {

                        sprite.removeAllEventListeners();
                        layer9.removeChild(sprite);
                        if (!nopause)
                            ACTIONS.GAME.RESUME();
                        if (callback)
                            callback();
                    });
                    sprite.gotoAndPlay("run");
                    $scope.play(animation.sound, SOUNDS.system);
                });
            },
            THROW_FROM_TO: function (name, objectFrom, ObjectTo, time, callback, nopause, light, alpha, color, scale) {
                ACTIONS.ANIMATION.THROW(name, objectFrom.x, objectFrom.y, ObjectTo.x, ObjectTo.y, time, callback, nopause, light, alpha, color, scale);
            },
            PLAY_IN: function (object, animation, callback, loop, nopause, light, alpha, color, scale) {
                ACTIONS.ANIMATION.PLAY(animation, object.x, object.y, callback, loop, nopause, light, alpha, color, scale);
            },
            PLAY_UP: function (object, animation, callback, loop, nopause, light, alpha, color, scale) {
                ACTIONS.ANIMATION.PLAY(animation, object.x, object.y - 1, callback, loop, nopause, light, alpha, color, scale);
            },
            PLAY_DOWN: function (object, animation, callback, loop, nopause, light, alpha, color, scale) {
                ACTIONS.ANIMATION.PLAY(animation, object.x, object.y + 1, callback, loop, nopause, light, alpha, color, scale);
            },
            PLAY_RIGHT: function (object, animation, callback, loop, nopause, light, alpha, color, scale) {
                ACTIONS.ANIMATION.PLAY(animation, object.x + 1, object.y, callback, loop, nopause, light, alpha, color, scale);
            },
            PLAY_LEFT: function (object, animation, callback, loop, nopause, light, alpha, color, scale) {
                ACTIONS.ANIMATION.PLAY(animation, object.x - 1, object.y, callback, loop, nopause, light, alpha, color, scale);
            },
            PLAY_PLAYER: function (animation, direction, callback, loop, nopause, light, alpha, color, scale) {
                eval(`ACTIONS.ANIMATION.PLAY_${(direction || "IN").toUpperCase()}($scope.hero, animation, callback,loop,nopause, light, alpha, color, scale)`);
            },
            PLAY_NPC: function (name, animation, direction, callback, loop, nopause, light, alpha, color, scale) {
                eval(`ACTIONS.ANIMATION.PLAY_${(direction || "IN").toUpperCase()}($scope.NPCS[name], animation, callback,loop,nopause, light, alpha, color, scale)`);
            },
            PLAY_OBJECT: function (name, animation, direction, callback, loop, nopause, light, alpha, color, scale) {
                eval(`ACTIONS.ANIMATION.PLAY_${(direction || "IN").toUpperCase()}($scope.OBJECTS[name], animation, callback,loop,nopause, light, alpha, color, scale)`);
            },
        },
        SOUND: {
            PLAY: function (url, config, callback) {
                ACTIONS.GAME.PAUSE();
                ACTIONS.LOAD.ADD([url], function () {
                    $scope.play(url, config);
                    if (callback)
                        callback();
                });
            },
            STOPALL: function () {
                createjs.Sound.stop();
            },
            system: function (name, callback) {
                $scope.SoundSystemVar = `../resources/audio/system/${name}.ogg`;
                ACTIONS.SOUND.PLAY($scope.SoundSystemVar, SOUNDS.system, callback);
            },
            system_STOP: function () {
                if ($scope.SoundSystemVar) {
                    $scope.stop($scope.SoundSystemVar);
                    $scope.SoundSystemVar = false;
                }
            },
            Sound: function (name, callback) {
                $scope.SoundVar = `../resources/audio/Sound/${name}.ogg`;
                ACTIONS.SOUND.PLAY($scope.SoundVar, SOUNDS.system, callback);
            },
            Sound_STOP: function () {
                if ($scope.SoundVar) {
                    $scope.stop($scope.SoundVar);
                    $scope.SoundVar = false;
                }
            },
            pokemon: function (name, callback) {
                ACTIONS.SOUND.pokemon_STOP();
                $scope.pokemonMusic = `../resources/audio/pokemon/${name}.ogg`;
                ACTIONS.SOUND.PLAY($scope.pokemonMusic, SOUNDS.system, callback);
            },
            pokemon_STOP: function () {
                if ($scope.pokemonMusic) {
                    $scope.stop($scope.pokemonMusic);
                    $scope.pokemonMusic = false;
                }
            },
            Enviroment: function (name, callback) {
                ACTIONS.SOUND.Enviroment_STOP();
                $scope.Enviroment = `../resources/audio/Enviroment/${name}.ogg`;
                ACTIONS.SOUND.PLAY($scope.Enviroment, SOUNDS.system, callback);
            },
            Enviroment_STOP: function () {
                if ($scope.Enviroment) {
                    $scope.stop($scope.Enviroment);
                    $scope.Enviroment = false;
                }
            },
            BattleMusic: function (name, callback) {
                ACTIONS.SOUND.BGM_STOP();
                ACTIONS.SOUND.BGS_STOP();
                ACTIONS.SOUND.BattleMusic_STOP();
                $scope.battleMusic = `../resources/audio/BattleMusic/${name}.ogg`;
                ACTIONS.SOUND.PLAY($scope.battleMusic, SOUNDS.battle, callback);
            },
            BattleMusic_STOP: function () {
                if ($scope.battleMusic) {
                    $scope.stop($scope.battleMusic);
                    $scope.battleMusic = false;
                }
            },
            BGS: function (name, callback) {
                $scope.stop("bgs" + FIRSTMAP);
                $scope.chagedBGS = `../resources/audio/BackSound/${name}.ogg`;
                ACTIONS.SOUND.PLAY($scope.chagedBGS, SOUNDS.bgs, callback);
            },
            BGS_STOP: function () {
                $scope.stop("bgs" + FIRSTMAP, SOUNDS.bgs);
                if ($scope.chagedBGS) {
                    $scope.stop($scope.chagedBGS);
                    $scope.chagedBGS = false;
                }
            },
            BGS_RESTORE: function (name) {
                if ($scope.chagedBGS) {
                    $scope.stop($scope.chagedBGS);
                    $scope.chagedBGS = false;
                    $scope.play("bgs" + FIRSTMAP, SOUNDS.bgs);
                }
            },

            BGM: function (name, callback) {
                $scope.stop("bgm" + FIRSTMAP);
                $scope.chagedBGM = `../resources/audio/BackGround/${name}.ogg`;
                ACTIONS.SOUND.PLAY($scope.chagedBGM, SOUNDS.bgm, callback);
            },
            BGM_STOP: function () {
                $scope.stop("bgm" + FIRSTMAP, SOUNDS.bgm);
                if ($scope.chagedBGM) {
                    $scope.stop($scope.chagedBGM);
                    $scope.chagedBGM = false;
                }
            },
            BGM_RESTORE: function (name) {
                if ($scope.chagedBGM) {
                    $scope.stop($scope.chagedBGM);
                    $scope.chagedBGM = false;
                    $scope.play("bgm" + FIRSTMAP, SOUNDS.bgm);
                }
            }

        }
    };
}]);