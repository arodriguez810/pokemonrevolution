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
        bgm: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.3}),
        bgs: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.1}),
        system: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_NONE, volume: 0.5}),
        steps: new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, volume: 0.2})
    };
    $scope._colors = _colors;
    $scope._colorsReal = _colorsReal;
    $scope.routesTick = 3;
    $scope.loadedSounds = [];
    $scope.sounds = {};
    $scope.indexTick = 0;
    $scope.spriteFrames = 1;
    $scope.playerFrames = 6;
    $scope.width = 12;
    $scope.pause = false;
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
    $scope.shadowY = 8;
    mapQueues = {};
    players = {};
    maps = {};
    STAGE = new createjs.Stage("game");
    createjs.Ticker.addEventListener("tick", STAGE);
    createjs.Ticker.addEventListener("tick", function (event) {
        if ($scope.hero) {
            if ($scope.hero.body) {
                if (maps[FIRSTMAP]) {
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
        speed: 300,
        walking: false,
        route: []
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
        return {x: (Math.ceil((index - 0.01) % 16) - 1) * 32, y: (Math.ceil((index / 16) - 0.01) - 1) * 32};
    };
    $scope.collision = function (hero, cx, cy) {
        if (maps[FIRSTMAP]) {
            var collisions = [];
            var object = maps[FIRSTMAP].map[`${hero.l}_${cx}_${cy}`];
            if (object) {
                collisions.push(object.mode === "A1");
                collisions.push(object.mode === "A1_B");
            }
            collisions.push(maps[FIRSTMAP].map[`${hero.l + 1}_${cx}_${cy}`] !== undefined);

            for (var i in $scope.NPCS) {
                var NPC = $scope.NPCS[i];
                if (NPC.x === cx && NPC.y === cy)
                    if (NPC.l >= hero.l)
                        collisions.push(true)
                if (NPC.l === hero.l || NPC.l === (hero.l + 1)) {
                    if (NPC.event.trigger === E_trigger.near) {
                        var xrange = {min: NPC.x - NPC.event.trigger_step, max: NPC.x + NPC.event.trigger_step};
                        var yrange = {min: NPC.y - NPC.event.trigger_step, max: NPC.y + NPC.event.trigger_step};
                        if ($scope.hero.x >= xrange.min && $scope.hero.x <= xrange.max)
                            if ($scope.hero.y >= yrange.min && $scope.hero.y <= yrange.max) {
                                ACTIONS.NPC.LOOK($scope.hero, NPC);
                                ACTIONS.NPC.LOOK(NPC, $scope.hero);
                                if (eval(NPC.event.conditions))
                                    $scope.runActions(OSO(NPC.event.actions));
                            }
                    }
                }
            }

            for (var i in $scope.OBJECTS) {
                var NPC = $scope.OBJECTS[i];
                if (NPC.x === cx && NPC.y === cy) {
                    if (NPC.l === hero.l + 1)
                        collisions.push(true)
                }
                if (NPC.l === hero.l || NPC.l === (hero.l + 1)) {
                    if (NPC.event.trigger === E_trigger.near) {
                        var xrange = {min: NPC.x - NPC.event.trigger_step, max: NPC.x + NPC.event.trigger_step};
                        var yrange = {min: NPC.y - NPC.event.trigger_step, max: NPC.y + NPC.event.trigger_step};
                        if ($scope.hero.x >= xrange.min && $scope.hero.x <= xrange.max)
                            if ($scope.hero.y >= yrange.min && $scope.hero.y <= yrange.max) {
                                if (eval(NPC.event.conditions))
                                    $scope.runActions(OSO(NPC.event.actions));
                            }
                    }
                }
            }

            if (hero.isNPC) {
                if ($scope.hero.x === cx && $scope.hero.y === cy)
                    collisions.push(true);
            }
            if (!hero.isObject)
                for (var l = hero.l; l >= 1; l--)
                    collisions.push(maps[FIRSTMAP].map[`${hero.l - l}_${cx}_${cy}`] !== undefined);

            if (collisions.indexOf(true) !== -1) {
                $scope.play("Collision", SOUNDS.system);

            }
            setTimeout(() => {
                $scope.clickEvent(hero, cx, cy, E_trigger.collision);
            }, 500);

            return collisions.indexOf(true) !== -1;
        }
    };

    //Animations
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
            if (hero.isObject) {

            } else
                hero.body.gotoAndPlay(animation);
            $scope.researchMove = !$scope.researchMove;
            return;
        }
        if (hero.isObject) {
        } else
            hero.body.gotoAndPlay("w" + animation);

        if (hero.shadow) {
            var shadow = OSO(point);
            if (shadow.y !== undefined)
                shadow.y += $scope.shadowY;
            createjs.Tween.get(hero.shadow).to(shadow, hero.speed);
        }
        createjs.Tween.get(hero.body).to(point, hero.speed).call(async function () {
            hero.x = !isNaN(Math.floor(point.x / $scope.baseWidth)) ? Math.floor(point.x / $scope.baseWidth) : hero.x;
            hero.y = !isNaN(Math.floor(point.y / $scope.baseHeight)) ? Math.floor(point.y / $scope.baseHeight) : hero.y;
            $scope.play("steps" + FIRSTMAP, SOUNDS.steps);
            if (repeat <= 1) {
                if (events.length > 0) {
                    $scope.traslades(hero, events);
                } else {
                    hero.walking = false;
                    if (hero.isObject) {
                    } else
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
    $scope.teleport = function (hero, point, animation) {
        var newx = !isNaN(Math.floor(point.x / $scope.baseWidth)) ? Math.floor(point.x / $scope.baseWidth) : hero.x;
        var newy = !isNaN(Math.floor(point.y / $scope.baseHeight)) ? Math.floor(point.y / $scope.baseHeight) : hero.y;

        if ($scope.collision(hero, newx, newy)) {
            if (hero.isObject) {

            } else
                hero.body.gotoAndPlay(animation);
            return;
        }

        if (hero.shadow) {
            var shadow = OSO(point);
            if (shadow.y !== undefined)
                shadow.y += $scope.shadowY;
            createjs.Tween.get(hero.shadow).to(shadow, 1);
        }
        hero.x = newx;
        hero.y = newy;
        createjs.Tween.get(hero.body).to(point, 1);
        hero.body.gotoAndPlay(animation);
    };
    $scope.moveMe = function (event) {
        if ($scope.hero.body)
            $scope.move($scope.hero, event, true);
    };
    $scope.moveMeMove = function (event) {
        if ($scope.hero.body)
            $scope.move($scope.hero, event);
    };
    $scope.move = async function (hero, event, actions) {
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
                $scope.traslades(hero, events);
            }
        }
    };

    //Draws
    $scope.clearMap = function () {
        ACTIONS.MESSAGE.HIDE();
        $scope.NPCS = [];
        $scope.OBJECTS = [];
        createjs.Sound.stop();
        for (var l = 1; l <= 9; l++) {
            eval(`layer${l}.removeAllChildren()`);
        }
        ACTIONS.GAME.STOPALL();
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
                                event: e,
                                isNPC: true,
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
                                event: e
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
                        if (NPC.event.route.length > 0) {
                            var route = NPC.event.route[$scope.indexTick % NPC.event.route.length];
                            $scope.runScript(route);
                        }
                    }
                    for (var i in $scope.OBJECTS) {
                        var NPC = $scope.OBJECTS[i];
                        if (NPC.event.route.length > 0) {
                            var route = NPC.event.route[$scope.indexTick % NPC.event.route.length];
                            $scope.runScript(route);
                        }
                    }
                    $scope.indexTick++;
                }
            }
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
        eval(`layer${L}.addChild(hero.body);`);
        STAGE.update();
    };
    $scope.drawPlayer = function (hero, name, x, y, L) {
        x = x || hero.x;
        y = y || hero.y;
        L = L || hero.l;
        hero.x = x;
        hero.y = y;
        hero.l = L;
        hero.shadow = new createjs.Bitmap(mapQueues["player_" + name].getResult(`SHADOW`));
        hero.shadow.x = x * $scope.baseWidth;
        hero.shadow.y = y * $scope.baseHeight + $scope.shadowY;
        hero.shadow.name = name + `_playershadow`;
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
        hero.body.name = `player_` + name;
        eval(`layer${L}.addChild(hero.body);`);
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
                    if (NPC.x === cx && NPC.y === cy)
                        if (NPC.l === hero.l || NPC.l === (hero.l + 1)) {
                            if (NPC.event.trigger === trigger) {
                                var xrange = {min: NPC.x - NPC.event.trigger_step, max: NPC.x + NPC.event.trigger_step};
                                var yrange = {min: NPC.y - NPC.event.trigger_step, max: NPC.y + NPC.event.trigger_step};
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
                    if (NPC.x === cx && NPC.y === cy)
                        if (NPC.l === hero.l || NPC.l === (hero.l + 1)) {
                            if (NPC.event.trigger === trigger) {
                                var xrange = {min: NPC.x - NPC.event.trigger_step, max: NPC.x + NPC.event.trigger_step};
                                var yrange = {min: NPC.y - NPC.event.trigger_step, max: NPC.y + NPC.event.trigger_step};
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
            $scope.runningEvent = false;
        }
        resolve(false);
    });

    //Base and Actions
    ACTIONS = {
        GAME: {
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
            RESUME() {
                $scope.pause = false;
            },
            ALPHA: function (object, alpha) {
                createjs.Tween.get(object.body).to({alpha: alpha}, object.speed);
            },
            TELEPORT: async function (object, x, y, mapname, animation) {
                if (mapname) {
                    $scope.clearMap();
                    FIRSTMAP = mapname;
                    await $scope.loadSystem();
                    $scope.playLoading("Cargando " + mapname);
                    await $scope.loadMap(FIRSTMAP);
                    $scope.drawMap(FIRSTMAP);
                    $scope.drawPlayer(object, PLAYER, x, y, 1);
                    $scope.stopLoading();
                } else {
                    $scope.teleport(object, {x: x * $scope.baseWidth, y: y * $scope.baseHeight}, animation || "down");
                }
            },
            MOVE: function (object, name, x, y) {
                $scope.move(object[name], {stageX: x * $scope.baseWidth, stageY: y * $scope.baseHeight});
            },
        },
        PLAYER: {
            MOVE: function (x, y) {
                $scope.move($scope.hero, {stageX: x * $scope.baseWidth, stageY: y * $scope.baseHeight});
            },
            TELEPORT: async function (x, y, mapname, animation) {
                await ACTIONS.GAME.TELEPORT($scope.hero, x, y, mapname, animation);
            },
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
            CLEAR: function () {
                $scope.messageQuee = [];
            },
            PLAY: function (time) {
                if ($scope.messageQuee.length > 0) {
                    ACTIONS.GAME.PAUSE();
                    var item = OSO($scope.messageQuee[0]);
                    $scope.messageQuee.shift();
                    $scope.dialogText = item.message || "...";
                    $scope.dialogHero = $scope.NPCS[item.hero];
                    if (!$scope.$$phase)
                        $scope.$digest();
                    $("#texts").show(200);
                    $scope.play("Talk", SOUNDS.system);
                    $scope.dialogTiming = setTimeout(function () {
                        $("#texts").hide(200);
                        if ($scope.messageQuee.length > 0)
                            ACTIONS.MESSAGE.PLAY(time);
                        else
                            ACTIONS.GAME.RESUME();
                    }, time || (ACTIONS.MESSAGE.CONFIG.TIME.MESSAGE * 1000));
                } else {
                    ACTIONS.GAME.RESUME();
                    ACTIONS.MESSAGE.HIDE();
                }
            },
            CHOICE: function (npc, message, buttons) {
                ACTIONS.GAME.PAUSE();
                $scope.dialogButtons = buttons;
                $scope.dialogText = message || "...";
                $scope.dialogHero = $scope.NPCS[npc];
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
            REPLAY: function () {
                clearInterval($scope.dialogTiming);
                ACTIONS.MESSAGE.PLAY();
            },
            NOTI: function (message, time) {
                $scope.notificationText = message || "...";
                if (!$scope.$$phase)
                    $scope.$digest();
                $("#notify").show(200);
                setTimeout(function () {
                    $("#notify").hide(200);
                }, time || (ACTIONS.MESSAGE.CONFIG.TIME.NOTI * 1000));
            },
        },
        NPC: {
            TELEPORT: async function (name, x, y, mapname, animation) {
                ACTIONS.GAME.TELEPORT($scope.NPCS[name], x, y, mapname, animation);
            },
            MOVE: function (name, x, y) {
                ACTIONS.GAME.MOVE($scope.NPCS, name, x, y);
            },
            MOVE_UP: function (name) {
                ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x, $scope.NPCS[name].y - 1);
            },
            MOVE_DOWN: function (name) {
                ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x, $scope.NPCS[name].y + 1);
            },
            MOVE_RIGHT: function (name) {
                ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x + 1, $scope.NPCS[name].y);
            },
            MOVE_LEFT: function (name) {
                ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x - 1, $scope.NPCS[name].y);
            },
            UP: function (name) {
                $scope.NPCS[name].body.gotoAndPlay("up");
            },
            DOWN: function (name) {
                $scope.NPCS[name].body.gotoAndPlay("down");
            },
            RIGHT: function (name) {
                $scope.NPCS[name].body.gotoAndPlay("right");
            },
            LEFT: function (name) {
                $scope.NPCS[name].body.gotoAndPlay("left");
            },
            GET: function (name) {
                return $scope.NPCS[name];
            },
            LOOK: function (from, to) {
                var xd = difference(from.x, to.x);
                var yd = difference(from.y, to.y);
                if (xd === yd) {
                    if (from.x < to.x) {
                        from.body.gotoAndPlay("right");
                    } else if (from.x > to.x) {
                        from.body.gotoAndPlay("left");
                    } else if (from.y < to.y) {
                        from.body.gotoAndPlay("down");
                    } else if (from.y > to.y) {
                        from.body.gotoAndPlay("up");
                    }
                } else if (xd > yd) {
                    if (from.x < to.x) {
                        from.body.gotoAndPlay("right");
                    } else if (from.x > to.x) {
                        from.body.gotoAndPlay("left");
                    }
                } else {
                    if (from.y < to.y) {
                        from.body.gotoAndPlay("down");
                    } else if (from.y > to.y) {
                        from.body.gotoAndPlay("up");
                    }
                }
            }
        },
        OBJECT: {
            TELEPORT: async function (name, x, y, mapname, animation) {
                ACTIONS.GAME.TELEPORT($scope.OBJECTS[name], x, y, mapname, animation);
            },
            GET: function (name) {
                return $scope.OBJECTS[name];
            },
            MOVE: function (name, x, y) {
                ACTIONS.GAME.MOVE($scope.OBJECTS, name, x, y);
            },
            MOVE_UP: function (name) {
                ACTIONS.OBJECT.MOVE(name, $scope.OBJECTS[name].x, $scope.OBJECTS[name].y - 1);
            },
            MOVE_DOWN: function (name) {
                ACTIONS.OBJECT.MOVE(name, $scope.OBJECTS[name].x, $scope.OBJECTS[name].y + 1);
            },
            MOVE_RIGHT: function (name) {
                ACTIONS.OBJECT.MOVE(name, $scope.OBJECTS[name].x + 1, $scope.OBJECTS[name].y);
            },
            MOVE_LEFT: function (name) {
                ACTIONS.OBJECT.MOVE(name, $scope.OBJECTS[name].x - 1, $scope.OBJECTS[name].y);
            }
        }
    };
    STAGE.on("stagemousedown", $scope.moveMe);
    STAGE.on("pressmove", $scope.moveMeMove);

    //Starters and Loadings
    $scope.existSound = function (url) {
        return $scope.loadedSounds.indexOf(url) !== -1;
    };
    $scope.addSound = function (id, url) {
        $scope.loadedSounds.push(url);
        $scope.sounds[id] = url;
    };
    $scope.play = function (id, config) {
        if ($scope.sounds[id])
            createjs.Sound.play($scope.sounds[id], config);
    };
    $scope.stop = function (id, config) {
        createjs.Sound.stop($scope.sounds[id]);
    };
    $scope.playLoading = function (text) {
        $scope.loadingPage.text = text;
        $scope.loadingPage.visible = true;
        $scope.loadingPage.color = _colorsReal[getRandomInt(_colorsReal.length - 1)];
    };
    $scope.stopLoading = function () {
        $scope.loadingPage.visible = false;
    };
    $scope.loadMap = (name) => new Promise(async (resolve, reject) => {
        if (!mapQueues[name]) {
            mapQueues[name] = new createjs.LoadQueue(false);
            mapQueues[name].installPlugin(createjs.Sound);
            maps[name] = await GAME.GETMAP(name);
            var loadJson = [];
            loadJson.push({id: "BG", src: `data/maps_file/${name}/bg.png`});
            for (var A = 65; A <= 67; A++) {
                for (var L = 1; L <= 9; L++) {
                    var chara = String.fromCharCode(A);
                    loadJson.push({id: `layer${L}_${chara}`, src: `data/maps_file/${name}/W_${L}${chara}.png`});
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
                    await $scope.loadPlayer(e.hero.name);
                } else {
                    await $scope.loadObject(e);
                }
            }
            mapQueues[name].loadManifest(loadJson);
            mapQueues[name].on("complete", function (event) {
                resolve(true);
            }, this);
            mapQueues[name].load();
        } else {
            resolve(true);
        }
    });
    $scope.loadPlayer = (name) => new Promise(async (resolve, reject) => {
        if (!mapQueues["player_" + name]) {
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
            $scope.loadingPage = new createjs.Text("Loading", "20px monospaced", _colorsReal[getRandomInt(_colorsReal.length - 1)]);
            $scope.loadingPage.set({
                textAlign: "center",
                textBaseline: "middle",
                x: ($scope.width * $scope.baseWidth) / 2,
                y: ($scope.height * $scope.baseHeight) / 2
            });
            $scope.loadingPage.textBaseline = "alphabetic";
            layer9.addChild($scope.loadingPage);
            var name = "resources_system";
            mapQueues[name] = new createjs.LoadQueue(false);
            mapQueues[name].installPlugin(createjs.Sound);
            maps[FIRSTMAP] = await GAME.GETMAP(FIRSTMAP);
            var loadJson = [];

            if (!$scope.existSound(`../resources/audio/system/Collition.ogg`)) {
                loadJson.push({id: "Collision", src: `../resources/audio/system/Collition.ogg`});
            }
            $scope.addSound("Collision", `../resources/audio/system/Collition.ogg`);

            if (!$scope.existSound(`../resources/audio/system/talk.ogg`)) {
                loadJson.push({id: "Talk", src: `../resources/audio/system/talk.ogg`});
            }
            $scope.addSound("Talk", `../resources/audio/system/talk.ogg`);


            mapQueues[name].loadManifest(loadJson);
            mapQueues[name].on("complete", function (event) {
                resolve(true);
            }, this);
            mapQueues[name].load();
        } else {
            layer9.addChild($scope.loadingPage);
            resolve(true);
        }
    });
    $scope.loadingPage = null;
    $scope.init = async function () {
        await $scope.loadSystem();
        $scope.playLoading("Cargando Texto");
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $scope.stopLoading();
        $scope.playLoading("Cargando Juego");
        await $scope.loadMap(FIRSTMAP);
        await $scope.loadPlayer(PLAYER);
        $scope.drawMap(FIRSTMAP);
        $scope.drawPlayer($scope.hero, PLAYER, 0, 0, 1);
        $scope.stopLoading();
    };
    $scope.init();
}]);