function playfunctions($scope) {


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
        if (maps[FIRSTMAP].maper) {
            var positens = maps[FIRSTMAP].maper.split(',');
            if (positens.length === 2) {
                $scope.mapperIconReorder(positens);
            }
        }
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
        $scope.fristRouteTick = true;
        setInterval(function () {
            $scope.fristRouteTick = false;
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
            $scope.transition = false;
        }, $scope.fristRouteTick ? 0 : ($scope.routesTick * 1000));

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
                    if (ACTIONS.UNIT.TEST().session.logros.indexOf("Destruir") !== -1) {
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
                    }
                });
            }
        }
        if (hero.event.object.canMove === "1") {

            if ($scope.hero.canMove) {
                hero.body.on("click", function (evt) {
                    if (ACTIONS.UNIT.TEST().session.logros.indexOf("Mover") !== -1) {
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
                createjs.Tween.get($scope.hero.body).to({scale: 0.7}, 500);
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
                    if (ACTIONS.UNIT.TEST().session.logros.indexOf("Destruir") !== -1) {
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
                    }
                });
            }
        }
        if (hero.event.object.canMove === "1") {

            if ($scope.hero.canMove) {
                hero.body.on("click", function (evt) {
                    if (ACTIONS.UNIT.TEST().session.logros.indexOf("Mover") !== -1) {
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
                createjs.Tween.get($scope.hero.body).to({scale: 0.7}, 500);
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
        if (eval(c.CC)) {
            eval(`a = async function(){ ${$scope.runShortCuts(c.script)} return; }();  `);
        } else {
            resolve(false);
        }

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
                    if (NPC.body.visible || NPC.event.trigger === E_trigger.collision) {
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
            }
            for (var i in $scope.OBJECTS) {
                var NPC = $scope.OBJECTS[i];
                if (NPC)
                    if (NPC.body.visible || NPC.event.trigger === E_trigger.collision) {
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
    STAGE.on("click", $scope.moveMe);


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
    $scope.toDO = function (url) {
        return url;
        // if (url) {
        //     var parts = url.split('../resources');
        //     if (parts.length > 1)
        //         return DOMAINRESOURCE + 'resources/' + parts[1];
        //     return url;
        // } else
        //     return url;
    };
    $scope.loadMap = (name) => new Promise(async (resolve, reject) => {
        if (!mapQueues[name]) {
            mapQueues[name] = new createjs.LoadQueue(false);
            mapQueues[name].installPlugin(createjs.Sound);

            maps[name] = await GAME.GETMAP(name);
            $scope.playLoading(LANGUAGE.t("Loading"));
            var loadJson = [];
            loadJson.push({id: "BG", src: DOMAIN + `data/maps_file/${name}/bg.png?v=${maps[name].version}`});
            for (var A = 65; A <= 67; A++) {
                for (var L = 1; L <= 9; L++) {
                    var chara = String.fromCharCode(A);
                    loadJson.push({
                        id: `layer${L}_${chara}`,
                        src: DOMAIN + `data/maps_file/${name}/W_${L}${chara}.png?v=${maps[name].version}`
                    });
                }
            }
            if (maps[name].bgm) {
                if (!$scope.existSound($scope.toDO(maps[name].bgm))) {
                    loadJson.push({id: "bgm" + name, src: $scope.toDO(maps[name].bgm)});
                }
                $scope.addSound("bgm" + name, $scope.toDO(maps[name].bgm));
            }
            if (maps[name].bgs) {

                if (!$scope.existSound($scope.toDO(maps[name].bgs))) {
                    loadJson.push({id: "bgs" + name, src: $scope.toDO(maps[name].bgs)});
                }
                $scope.addSound("bgs" + name, $scope.toDO(maps[name].bgs));
            }
            if (maps[name].steps) {
                if (!$scope.existSound($scope.toDO(maps[name].steps))) {
                    loadJson.push({id: "steps" + name, src: $scope.toDO(maps[name].steps)});
                }
                $scope.addSound("steps" + name, $scope.toDO(maps[name].steps));
            }
            if (maps[name].battleback.music) {
                if (!$scope.existSound($scope.toDO(maps[name].battleback.music))) {
                    loadJson.push({id: "battle" + name, src: $scope.toDO(maps[name].battleback.music)});
                }
                $scope.addSound("battle" + name, $scope.toDO(maps[name].battleback.music));
            }


            for (var event in maps[name].event) {
                var e = maps[name].event[event];
                if (e.isActor == "1") {
                    await $scope.loadNPC(e.hero.name);
                    $scope.playLoading(LANGUAGE.t("Loading"));

                } else {
                    await $scope.loadObject(e);
                    $scope.playLoading(LANGUAGE.t("Loading"));
                }
            }
            mapQueues[name].loadManifest(loadJson);
            mapQueues[name].on("complete", async function (event) {
                if (maps[name].vecinos)
                    if (maps[name].vecinos.length > 0) {
                        for (var vecino of maps[name].vecinos) {
                            await $scope.loadMap(vecino);
                            $scope.playLoading(LANGUAGE.t("Loading"));
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
            loadJson.push({
                id: "FACE",
                src: DOMAIN + `data/characters_file/${name}/face.png?v=${players[name].version}`
            });
            loadJson.push({id: "SV", src: DOMAIN + `data/characters_file/${name}/sv.png?v=${players[name].version}`});
            loadJson.push({id: "TV", src: DOMAIN + `data/characters_file/${name}/tv.png?v=${players[name].version}`});
            loadJson.push({id: "TVD", src: DOMAIN + `data/characters_file/${name}/tvd.png?v=${players[name].version}`});
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
            loadJson.push({
                id: "FACE",
                src: DOMAIN + `data/players/${name}/images/face.png?v=${players[name].version}`
            });
            loadJson.push({id: "SV", src: DOMAIN + `data/players/${name}/images/sv.png?v=${players[name].version}`});
            loadJson.push({id: "TV", src: DOMAIN + `data/players/${name}/images/tv.png?v=${players[name].version}`});
            loadJson.push({id: "TVD", src: DOMAIN + `data/players/${name}/images/tvd.png?v=${players[name].version}`});
            loadJson.push({id: "SHADOW", src: `../resources/system/Shadow1.png`});
            loadJson.push({id: "SHADOWBIG", src: `../resources/system/Shadow2.png`});
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
            $scope.loadingPage = new createjs.Text(LANGUAGE.t("Loading"), "40px monospaced", _colorsReal[getRandomInt(_colorsReal.length - 1)]);
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
            layerAnimation.addChild($scope.ambients);
            layerAnimation.addChild($scope.transitions);
            layerAnimation.addChild($scope.loadingPage);
            layerAnimation.addChild($scope.bubble);
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
            layerAnimation.addChild($scope.ambients);
            layerAnimation.addChild($scope.transitions)
            layerAnimation.addChild($scope.loadingPage);
            layerAnimation.addChild($scope.bubble);
            resolve(true);
        }
    });
    $scope.loadingPage = null;
    $scope.padder = false;
    $scope.mapperIconReorder = function (positens) {
        if (positens.length === 2) {
            $scope.mapperIcon = `margin-left:${POKEMONBATTLE.X(0)};margin-top:${POKEMONBATTLE.Y(0)};top: ${positens[1]}px;left: ${positens[0]}px;`;
        }
    };
    $scope.TRAINERS = [];
    $scope.init = async function () {
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        var position = await GAME.PLAYERPOSITION();
        $scope.gposition = position;
        FIRSTMAP = position.map;
        await $scope.loadSystem();
        $scope.playLoading(LANGUAGE.t("Loading"));
        $scope.playLoading(LANGUAGE.t("Loading"));
        $scope.interface = [
            {name: 'perfil', icon: 'face', color: 'blue', text: LANGUAGE.t("Profile")},
            {name: 'pokemons', icon: 'adb', color: 'green', text: LANGUAGE.t("Pokemons")},
            {name: 'logros', icon: 'grade', color: 'orange', text: LANGUAGE.t("Skills")},
            {name: 'bobeda', icon: 'desktop_windows', color: 'teal', text: LANGUAGE.t("Vault")},
            {name: 'friends', icon: 'child_care', color: 'pink', text: LANGUAGE.t("Friends")},
        ];
        LOGROS = {
            Saltarin: {
                "name": LANGUAGE.t("Jumping"),
                "key": "Saltarin",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you will be able to jump the structures, you can do it by clicking on your character"),
                "icon": 141
            },
            Bucear: {
                "name": LANGUAGE.t("Dive"),
                "key": "Dive",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you will be able to jump the waters to dive, you must be Jump as a requirement"),
                "icon": 12
            },
            Destello: {
                "name": LANGUAGE.t("Flash"),
                "key": "Flash",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you will be able to light up the caves for a while"),
                "icon": 71,
                "script": "ACTIONS.PLAYER.LIGH (30)"
            },
            Vuelo: {
                "name": LANGUAGE.t("Flight"),
                "key": "Flight",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you can fly if you want!"),
                "icon": 226,
                "script": "ACTIONS.PLAYER.FLY ()"
            },
            Destruir: {
                "name": LANGUAGE.t("Destroy"),
                "key": "Destroy",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you can remove some objects by touching them"),
                "icon": 79
            },
            Mover: {
                "name": LANGUAGE.t("Move"),
                "key": "Move",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you will be able to move some objects by touching them"),
                "icon": 78
            },
            Invisibilidad: {
                "name": LANGUAGE.t("Invisibility"),
                "key": "Invisibility",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you will be able to hide from coaches and pokemon"),
                "icon": 20,
                "script": "ACTIONS.PLAYER.HIDE ()"
            },
            Teletransportacion: {
                "name": LANGUAGE.t("Teleportation"),
                "key": "Teleportation",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you will be able to teleport to the limit of your gaze, it may contain hidden powers"),
                "icon": 307,
                "script": "ACTIONS.PLAYER.TELE ()"
            },
            SoyAgua: {
                "name": LANGUAGE.t("I am Water"),
                "key": "SoyAgua",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you unite with the water to be able to climb waterfalls and swim faster, it may contain hidden powers"),
                "icon": 68,
                "script": "ACTIONS.PLAYER.WATERELEMENTAL ()"
            },
            SoyFuego: {
                "name": LANGUAGE.t("I am Fire"),
                "key": "SoyFuego",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you turn into fire to be driven like a cannon, it may contain hidden powers"),
                "icon": 65,
                "script": "ACTIONS.PLAYER.FIREELEMENTAL ()"
            },
            SoyTierra: {
                "name": LANGUAGE.t("I am Earth"),
                "key": "SoyTierra",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you can create rocks that will serve as bridges and springs, it can contain hidden powers"),
                "icon": 69,
                "script": "ACTIONS.PLAYER.EARTHELEMENTAL ()"
            },
            SoyTrueno: {
                "name": LANGUAGE.t("I am Thunder"),
                "key": "SoyTrueno",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you can be one with thunder, increasing your physical and magical possibilities with unexpected powers"),
                "icon": 67,
                "script": "ACTIONS.PLAYER.Thunder ()"
            },
            Tiempo: {
                "name": LANGUAGE.t("Time Control"),
                "key": "Time",
                "term": LANGUAGE.t("Skill"),
                "desc": LANGUAGE.t("With this technique you can change the current time"),
                "icon": 221,
                "script": "ACTIONS.AMBIENT.CHANGETIME ()"
            }

        };
        $scope.playLoading(LANGUAGE.t("Loading"));
        await $scope.loadMap(FIRSTMAP);
        $scope.mapperIconReorder([0, 0]);

        $scope.playLoading(LANGUAGE.t("Loading"));
        await $scope.loadPlayer();
        $scope.playLoading(LANGUAGE.t("Loading"));
        $scope.drawMap(FIRSTMAP);
        $scope.drawPlayer($scope.hero, $scope.session.id, parseInt(position.x), parseInt(position.y), parseInt(position.l));
        ACTIONS.CAMERA.PLAYER();
        $scope.stopLoading();
        $scope.menu = true;
        ACTIONS.AMBIENT.RUN();
        APIS = {};
        APIS.MOVES = await POKEMONAPI.MOVES();
        APIS.ABILITIES = await POKEMONAPI.ABILITIES();
        APIS.TYPES = await POKEMONAPI.TYPES();
        APIS.LEARNS = await POKEMONAPI.LEARNS();
        APIS.POKEDEX = await POKEMONAPI.ALL();
        for (var termino in $scope.personalities) {
            for (var category in $scope.personalities[termino]) {
                for (var text in $scope.personalities[termino][category]) {
                    $scope.personalities[termino][category][text] = LANGUAGE.t($scope.personalities[termino][category][text]);
                }
            }
        }
        // for (var termino of APIS.ABILITIES) {
        //     termino.name = LANGUAGE.t(termino.name);
        //     termino.shortDesc = LANGUAGE.t(termino.shortDesc);
        // }
        // for (var termino in APIS.TYPES) LANGUAGE.t(termino);
        //APIS.POKEDEX = APIS.POKEDEX.sort((a, b) => (a.keyname > b.keyname) ? 1 : -1);
        if (maps[FIRSTMAP].enviroment === "cave") {
            $scope.ambient = "darkcave";
        }
        $scope.TRAINERS = $scope.NPCS.filter(d => {
            return d.event.trigger === E_trigger.entrenador
        });
        if (!$scope.$$phase)
            $scope.$digest();
        LASTMOVEMENT = undefined;
        TOUCHER = undefined;
        //console.clear();
    };
}