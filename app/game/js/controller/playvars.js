function playvars($scope) {
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
    $scope.BATTLEOBJS = {};
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
    $scope.peopleAnimationConfig = {
        "stand": [0, 2, "stand", 0.5],
        "punch": [3, 5, "stand", 0.5],
        "evade": [6, 7, 8, 7, "stand", 0.5],
        "bad": [9, 10, 11, 10, "stand", 0.5],
        "order": [12, 14, "stand", 0.5],
        "happy": [15, 16, 17, 16, "stand", 0.5],
        "confiado": [18, 19, 20, 19, "stand", 0.5],
        "point_bad": [21, 22, 23, 22, "stand", 0.5],
        "sad": [24, 25, 26, 25, "stand", 0.5],
        "stand_fight": [27, 28, 29, 28, "stand", 0.5],
        "stand_fight_interrogation": [30, 31, 32, 31, "stand", 0.5],
        "sad_2": [33, 34, 35, 34, "stand", 0.5],
        "hurt": [36, 37, 38, 37, "stand", 0.5],
        "stand_order": [39, 40, 41, 40, "stand", 0.5],
        "sad_3": [42, 43, 44, 43, "stand", 0.5],
        "evade_2": [45, 46, 47, 46, "stand", 0.5],
        "animate": [48, 49, 50, 49, "stand", 0.5],
        "dead": [51, 52, 53, 52, "stand", 0.5]
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

    $scope.peopleWidth = 64;
    $scope.peopleHeight = 64;

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
    $scope.battleObjects = {};
    mapQueues = {};
    players = {};
    maps = {};
    STAGE = new createjs.Stage("game");
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    STAGE.snameToPixelsEnabled = true;
    STAGE.snapToPixelEnabled = true;
    createjs.Ticker.addEventListener("tick", STAGE);
    createjs.Touch.enable(STAGE);
    //createjs.Ticker.maxDelta = 50;
    for (var l = 0; l <= 9; l++) {
        eval(`layer${l} = new createjs.Container();`);
        eval(`STAGE.addChild(layer${l});`);
    }
    eval(`layerBattle = new createjs.Container();`);
    eval(`STAGE.addChild(layerBattle);`);

    eval(`layerAnimation = new createjs.Container();`);
    eval(`STAGE.addChild(layerAnimation);`);

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

        for (var wing of ["wing1", "wing2"]) {
            if (hero["body" + wing]) {
                var shadowD = OSO(point);
                createjs.Tween.get(hero["body" + wing]).to(shadowD, hero.speed);
            }
        }

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
}