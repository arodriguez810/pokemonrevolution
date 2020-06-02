function playvars($scope, $timeout) {
    $scope.personCheck = function (text, move, pokemon) {
        var textFinal = text.split('$amigo').join($scope.session.name);
        if (move) textFinal = textFinal.split('$move').join(move);
        if (pokemon) textFinal = textFinal.split('$pokemon').join(pokemon);
        return textFinal;
    };

    $scope.frameSetSave = 500;
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
        "evade": [6, 8, "stand", 0.5],
        "bad": [9, 11, "stand", 0.5],
        "order": [12, 14, "stand", 0.5],
        "happy": [15, 17, "stand", 0.5],
        "confiado": [18, 20, "stand", 0.5],
        "point_bad": [21, 23, "stand", 0.5],
        "sad": [24, 26, "stand", 0.5],
        "stand_fight": [27, 29, "stand", 0.5],
        "stand_fight_interrogation": [30, 31, 32, 31, "stand", 0.5],
        "sad_2": [33, 35, "stand", 0.5],
        "hurt": [36, 38, "stand", 0.5],
        "stand_order": [39, 41, "stand", 0.5],
        "sad_3": [42, 44, "stand", 0.5],
        "evade_2": [45, 47, "stand", 0.5],
        "animate": [48, 50, "stand", 0.5],
        "dead": [51, 53, "stand", 0.5]
    };
    $scope.extras = {};
    $scope.indexTick = 0;
    $scope.spriteFrames = 3;
    $scope.playerFrames = 12;
    $scope.pause = false;
    $scope.block = false;
    $scope.width = 12;
    $scope.height = 8;
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
    $scope.messageChoices = [];
    $scope.notificationText = undefined;
    $scope.dialogText = undefined;
    $scope.dialogHero = undefined;
    $scope.dialogTiming = 0;
    $scope.dialogButtons = [{
        text: "OK", click: function () {
            $scope.ACTIONS.MESSAGE.REPLAY();
        }
    }];
    $scope.transitions = "";
    $scope.bubble = null;
    $scope.bubbleText = undefined;
    $scope.animations = [];
    $scope.battleObjects = {};
    $scope.mapQueues = {};
    $scope.players = {};
    $scope.maps = {};
    $scope.STAGE = new createjs.Stage("game");
    $scope.ANIMATIONSSTAGE = new createjs.Stage("animations");
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    $scope.STAGE.snameToPixelsEnabled = true;
    $scope.STAGE.snapToPixelEnabled = true;
    createjs.Ticker.addEventListener("tick", $scope.STAGE);
    createjs.Ticker.addEventListener("tick", $scope.ANIMATIONSSTAGE);
    //createjs.Ticker.maxDelta = 60;
    createjs.Touch.enable($scope.STAGE);
    $scope.ANIMATIONSSTAGE.mouseEnabled = false;
    $scope.ANIMATIONSSTAGE.mouseChildren = false;
    for (var l = 0; l <= 9; l++) {
        eval(`$scope.layer${l} = new createjs.Container();`);
        eval(`  $scope.STAGE.addChild($scope.layer${l});`);
    }
    $scope.layerBattle = new createjs.Container();
    $scope.STAGE.addChild($scope.layerBattle);
    $scope.layerAnimation = new createjs.Container();
    $scope.ANIMATIONSSTAGE.addChild($scope.layerAnimation);

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

    $scope.PADMOVE = function (key) {
        var e = {key: key};
        if (key === "q") {
            clearInterval(TOUCHER);
            TOUCHER = undefined;
        }
        if (e.key === "w" || e.key === "ArrowUp") {
            LASTMOVEMENT = "UP";
            $scope.ACTIONS.PLAYER.MOVE_UP();
            if (!TOUCHER) {
                TOUCHER = setInterval(function () {
                    if (LASTMOVEMENT)
                        if (!$scope.ACTIONS.GAME.ISBLOCK())
                            eval(`$scope.ACTIONS.PLAYER.MOVE_${LASTMOVEMENT}();`);
                }, 10);
            }
        } else if (e.key === "s" || e.key === "ArrowDown") {
            LASTMOVEMENT = "DOWN";
            $scope.ACTIONS.PLAYER.MOVE_DOWN();
            if (!TOUCHER) {
                TOUCHER = setInterval(function () {
                    if (LASTMOVEMENT)
                        if (!$scope.ACTIONS.GAME.ISBLOCK())
                            eval(`$scope.ACTIONS.PLAYER.MOVE_${LASTMOVEMENT}();`);
                }, 10);
            }
        } else if (e.key === "a" || e.key === "ArrowLeft") {
            LASTMOVEMENT = "LEFT";
            $scope.ACTIONS.PLAYER.MOVE_LEFT();
            if (!TOUCHER) {
                TOUCHER = setInterval(function () {
                    if (LASTMOVEMENT)
                        if (!$scope.ACTIONS.GAME.ISBLOCK())
                            eval(`$scope.ACTIONS.PLAYER.MOVE_${LASTMOVEMENT}();`);
                }, 10);
            }
        } else if (e.key === "d" || e.key === "ArrowRight") {
            LASTMOVEMENT = "RIGHT";
            $scope.ACTIONS.PLAYER.MOVE_RIGHT();
            if (!TOUCHER) {
                TOUCHER = setInterval(function () {
                    if (LASTMOVEMENT)
                        if (!$scope.ACTIONS.GAME.ISBLOCK())
                            eval(`$scope.ACTIONS.PLAYER.MOVE_${LASTMOVEMENT}();`);
                }, 10);
            }
        }
    };
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
        if (cx >= $scope.maps[$scope.FIRSTMAP].width || cy >= $scope.maps[$scope.FIRSTMAP].height)
            return true;
        if (hero.flying)
            return false;
        if ($scope.maps[$scope.FIRSTMAP]) {
            var collisions = [];

            if (hero.l === 0) {
                var object = $scope.maps[$scope.FIRSTMAP].map[`${1}_${cx}_${cy}`];
                collisions.push(object.mode !== "A1");
                return collisions.indexOf(true) !== -1;
            } else {
                var object = $scope.maps[$scope.FIRSTMAP].map[`${hero.l}_${cx}_${cy}`];
                if (object) {
                    collisions.push(object.mode === "A1");
                    collisions.push(object.mode === "A1_B");
                    if (hero.l === 2) {
                        collisions.push(object.mode === "A3");
                    }
                }

                collisions.push($scope.maps[$scope.FIRSTMAP].map[`${hero.l + 1}_${cx}_${cy}`] !== undefined);

                for (var i in $scope.NPCS) {
                    var NPC = $scope.NPCS[i];
                    if (NPC) {
                        if (NPC.body.visible) {
                            if (NPC.x === cx && NPC.y === cy)
                                if (NPC.l === hero.l || NPC.l === (hero.l + 1))
                                    collisions.push(true);
                        }
                    }
                }

                for (var i in $scope.OBJECTS) {
                    var OBJ = $scope.OBJECTS[i];
                    if (OBJ) {
                        if (OBJ.body.visible) {
                            if (OBJ.x === cx && OBJ.y === cy) {
                                if (OBJ.l === (hero.l + 1))
                                    collisions.push(true);
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
                            $scope.maps[$scope.FIRSTMAP].map[`${hero.l - l}_${cx}_${cy}`] !== undefined &&
                            $scope.maps[$scope.FIRSTMAP].map[`${hero.l}_${cx}_${cy}`] === undefined
                        );
                    }

                if (collisions.indexOf(true) !== -1) {
                    $scope.numberCollisions++;
                    if ($scope.numberCollisions % 70 === 0)
                        $scope.play("Collision", $scope.SOUNDS.system);
                }
            }
            return collisions.indexOf(true) !== -1;
        }
    };
    $scope.numberCollisions = 0;
    //Animations
    $scope.traslades = function (hero, events, callback, force) {
        if (events.length > 0) {
            var event = OSO(events[0]);
            events.shift();
            $scope.traslade(hero, event.animation, event.point, event.repeat, events, callback, force);
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
                var limitX = (($scope.maps[$scope.FIRSTMAP].width * $scope.baseWidth) - ($scope.width * $scope.baseWidth));
                regX = regX > limitX ? limitX : regX;
            }
            if (regY !== 0) {
                var limitY = (($scope.maps[$scope.FIRSTMAP].height * $scope.baseHeight) - ($scope.height * $scope.baseHeight));
                regY = regY > limitY ? limitY : regY;
            }
            $scope.ANIMATIONSSTAGE.regX = regX;
            $scope.ANIMATIONSSTAGE.regY = regY;
            createjs.Tween.get($scope.STAGE).to({regX: regX, regY: regY}, speed);
        }
    };
    $scope.traslade = function (hero, animation, point, repeat, events, callback, force) {
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
                    if (callback)
                        callback();
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
                $scope.play("steps" + $scope.FIRSTMAP, $scope.SOUNDS.steps);
            if (repeat <= 1) {
                if (events.length > 0) {
                    $scope.traslades(hero, events, callback, force);
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
                $scope.traslade(hero, animation, point, --repeat, events, callback, force);
            }
        });
    };
    $scope.teleport = function (hero, point, animation, callback) {
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
        if (callback)
            callback();
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
    $scope.moveOld = function (hero, event, actions, callback) {
        if (hero) {
            if ($scope.pause)
                return;
            if (!hero.walking) {
                var local = $scope.STAGE.globalToLocal(event.stageX, event.stageY);
                var cx = Math.floor(local.x / $scope.baseWidth);
                var cy = Math.floor(local.y / $scope.baseHeight);
                $scope.ACTIONS.PLAYER.LOOKDIR(cx, cy);
                if (actions) {
                    $scope.clickEvent(hero, cx, cy,  $scope.E_trigger.click);
                }
            }
        }
    };
    $scope.moveEnter = function (x, y, actions) {
        if ($scope.hero) {
            if ($scope.pause)
                return;
            if (!$scope.hero.walking) {
                var cx = x;
                var cy = y;
                $scope.ACTIONS.PLAYER.LOOKDIR(cx, cy);
                if (actions) {
                    $scope.clickEvent($scope.hero, cx, cy,  $scope.E_trigger.click);
                }
            }
        }
    };
    $scope.lastEventCollision = "";
    $scope.lastEventLook = "";
    $scope.lastEventLookNPC = "";
    $scope.move = function (hero, event, actions, callback, force) {

        if (hero) {
            if ($scope.pause && !force)
                return;
            if (!hero.walking) {
                var local = $scope.STAGE.globalToLocal(event.stageX, event.stageY);
                var cx = Math.floor(local.x / $scope.baseWidth);
                var cy = Math.floor(local.y / $scope.baseHeight);
                if (actions) {
                    if (!hero.isNPC) {
                        var wasEvent = $scope.clickEvent(hero, cx, cy,  $scope.E_trigger.click);
                        if (wasEvent || wasEventC)
                            return;
                    }
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
                if (!hero.isNPC) {
                    if ($scope.lastEventCollision !== `${cx}x${cy}`) {
                        $scope.lastEventCollision = `${cx}x${cy}`;
                        $scope.ACTIONS.PLAYER.WHOLOOKME();
                        $scope.ACTIONS.PLAYER.WHOLOOKMENPC();
                        $scope.clickEvent(hero, cx, cy,  $scope.E_trigger.collision);
                    }
                }
                $scope.traslades(hero, events, callback, force);
            }
        }
    };

}