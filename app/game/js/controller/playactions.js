function playactions($scope) {
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
    $scope.menuPokemon = function (index, detail) {
        $scope.selectedPokemon = index;
        if (detail)
            $scope.PKM.pokemonDetail = true;
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
    $scope.selectedPokemonClick = function (detail) {
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
        $scope.selectedPokemon = 0;
        POKEMOMFIND.DELETE(item, index);
        if (!$scope.$$phase)
            $scope.$digest();
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
    $scope.cooldowns = {
        Destello: {cooldown: 40},
        Vuelo: {cooldown: 180},
        Invisibilidad: {cooldown: 60},
        Teletransportacion: {cooldown: 120},
        SoyAgua: {cooldown: 60},
        SoyFuego: {cooldown: 30},
        SoyTierra: {cooldown: 60},
        SoyTrueno: {cooldown: 300},
        Tiempo: {cooldown: 10},
    };
    $scope.inactiveTool = [];


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
                    $scope.ambients.graphics.clear().beginFill(color || "#000").drawRect(0, 0, maps[FIRSTMAP].width * $scope.baseWidth, maps[FIRSTMAP].height * $scope.baseHeight).endFill();
                    createjs.Tween.get($scope.ambients).to({alpha: alpha}, 1 * 1000).call(function () {
                    });
                }
                $scope.cacheAmbient = $scope.ambient;
                $scope.cacheHour = h;
                if (!$scope.$$phase)
                    $scope.$digest();
            },
            CHANGETIME: function (name) {
                if (!$scope.transition) {
                    var color = "rgba(11,16,167,1)"
                    var h = $scope.modificationTime !== undefined ? $scope.modificationTime : new Date().getHours();
                    if (h >= 0 && h <= 3) {
                        $scope.modificationTime = 4;
                        color = "rgb(122,160,250)";
                    } else if (h >= 4 && h <= 6) {
                        $scope.modificationTime = 7;
                        color = "rgb(250,246,82)";
                    } else if (h >= 7 && h <= 17) {
                        $scope.modificationTime = 18;
                        color = "rgb(250,158,47)";
                    } else if (h >= 18 && h <= 18) {
                        $scope.modificationTime = 19;
                        color = "rgb(27,51,250)";

                    } else if (h >= 19 && h <= 23) {
                        $scope.modificationTime = 0;
                        color = "rgb(71,13,167)";

                    }
                    if (name) {
                        ACTIONS.ANIMATION.PLAY_NPC(name, "TIME", undefined, function () {
                            if (!$scope.$$phase)
                                $scope.$digest();
                            ACTIONS.AMBIENT.RUN();
                            $scope.transition = false;
                        }, undefined, undefined, 1, 1, color);
                    } else {
                        ACTIONS.ANIMATION.PLAY_PLAYER("TIME", undefined, function () {
                            if (!$scope.$$phase)
                                $scope.$digest();
                            ACTIONS.AMBIENT.RUN();
                            $scope.transition = false;
                        }, undefined, undefined, 1, 1, color);
                    }
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
                        codes.push(`createjs.Tween.get(object).to({x: (${point} ${i % 2 === 0 ? '+' : '-'} distance ) }, interval);`);
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
            SHAKESIZE: function (object, interval, distance, times, callback) {
                if (object) {
                    var point = object.scaleX;
                    var codes = [];
                    for (var i = 1; i <= times; i++) {
                        codes.push(`createjs.Tween.get(object).to({scaleX: (${point} ${i % 2 === 0 ? '+' : '-'} distance ) }, interval);`);
                    }
                    for (var i = 1; i <= times; i++) {
                        setTimeout(() => {
                            eval(codes[0]);
                            codes.shift();
                        }, interval * i);
                    }
                    setTimeout(function () {
                        createjs.Tween.get(object).to({scaleX: point}, interval);
                        if (callback)
                            callback()
                    }, interval * (times + 1));
                }
            },
            SHAKESIZEY: function (object, interval, distance, times, callback) {
                if (object) {
                    var point = object.scaleY;
                    var codes = [];
                    for (var i = 1; i <= times; i++) {
                        codes.push(`createjs.Tween.get(object).to({scaleY: (${point} ${i % 2 === 0 ? '+' : '-'} distance ) }, interval);`);
                    }
                    for (var i = 1; i <= times; i++) {
                        setTimeout(() => {
                            eval(codes[0]);
                            codes.shift();
                        }, interval * i);
                    }
                    setTimeout(function () {
                        createjs.Tween.get(object).to({scaleY: point}, interval);
                        if (callback)
                            callback()
                    }, interval * (times + 1));
                }
            },
            SHAKEY: function (object, interval, distance, times, callback) {
                if (object) {
                    var point = object.y;
                    var codes = [];
                    for (var i = 1; i <= times; i++) {
                        codes.push(`createjs.Tween.get(object).to({y: (${point} ${i % 2 === 0 ? '+' : '-'} distance ) }, interval);`);
                    }
                    for (var i = 1; i <= times; i++) {
                        setTimeout(() => {
                            eval(codes[0]);
                            codes.shift();
                        }, interval * i);
                    }
                    setTimeout(function () {
                        createjs.Tween.get(object).to({y: point}, interval);
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
                    $scope.transition = true;
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
                                $scope.transition = false;
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
                        ACTIONS.ANIMATION.PLAY_PLAYER("WaterElemental", "up", function () {
                            $scope.transition = false;
                        });
                        ACTIONS.PLAYER.FILTER(0.5, 1, "blue");
                    } else {
                        $scope.hero.watering = false;
                        if ($scope.hero.speed)
                            $scope.hero.speed = $scope.hero.base_speed;
                        ACTIONS.ANIMATION.PLAY_PLAYER("Show", undefined, function () {
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
                            if (!$scope.hero.staticing)
                                ACTIONS.PLAYER.FILTER(0.5, 1, "red");
                            ACTIONS.ANIMATION.PLAY_PLAYER("FireElemental", "up", function () {
                                if (!$scope.hero.staticing) {
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
                                } else {
                                    ACTIONS.OBJECT.DESTROYNEAR($scope.hero.x, $scope.hero.y)
                                }

                                setTimeout(function () {
                                    if (!$scope.hero.staticing)
                                        if ($scope.hero.speed)
                                            $scope.hero.speed = $scope.hero.base_speed;
                                    if (!$scope.hero.staticing)
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

                    var frame = $scope.hero.watering ? 79 : 199;
                    var animating = $scope.hero.watering ? "IceElemental" : "EarthElemental";
                    ACTIONS.ANIMATION.PLAY_PLAYER(animating, oldposition.toUpperCase(), function () {
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


                            if ($scope.hero.staticing) {
                                frame = 183;
                                x = $scope.hero.x;
                                y = $scope.hero.y;
                                $scope.transition = false;
                                ACTIONS.PLAYER.CREATEMURITO(L, x, y - 1, frame, "A");
                                ACTIONS.PLAYER.CREATEMURITO(L, x, y + 1, frame, "A2");

                                ACTIONS.PLAYER.CREATEMURITO(L, x - 1, y - 1, frame, "B");
                                ACTIONS.PLAYER.CREATEMURITO(L, x + 1, y - 1, frame, "C");

                                ACTIONS.PLAYER.CREATEMURITO(L, x - 1, y + 1, frame, "B2");
                                ACTIONS.PLAYER.CREATEMURITO(L, x + 1, y + 1, frame, "C2");

                                ACTIONS.PLAYER.CREATEMURITO(L, x - 1, y, frame, "A");
                                ACTIONS.PLAYER.CREATEMURITO(L, x + 1, y, frame, "A2");


                            } else {
                                ACTIONS.PLAYER.CREATEMURITO(L, x, y, frame);
                            }
                            $scope.transition = false;

                        });
                    });
                }

            },
            CREATEMURITO: function (L, x, y, frame, adde) {

                for (var i in $scope.OBJECTS) {
                    var NPC = $scope.OBJECTS[i];
                    if (NPC)
                        if (NPC.body.visible) {
                            if (NPC.x === x && NPC.y === y) {
                                if (NPC.event.name.indexOf("Murito") !== -1) {
                                    eval(`layer${L}.removeChild(NPC.body);`);
                                    delete $scope.OBJECTS[NPC.body.name.replace('object_', '')];
                                }
                                return;
                            }
                        }
                }

                var name = "Murito " + new Date().getTime() + "" + (adde || "");

                var url = $scope.hero.watering ? "..\/resources\/objects\/Other1.png" : "..\/resources\/objects\/Outside_B.png";
                if ($scope.hero.watering)
                    frame = 6;
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
                        "url": url,
                        "animation": [(frame || 199)],
                        "framerate": 3,
                        "width": 48,
                        "height": 48,
                        "sound": "",
                        "canBreak": "0",
                        "canMove": $scope.hero.watering ? "1" : "0",
                        "canMount": $scope.hero.watering ? "0" : "1"
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
                        setTimeout(function () {
                            ACTIONS.PLAYER.TELEPORT(0, 0, "Elinfinito");
                        }, 1000);
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
                if (!$scope.walking)
                    if ($scope.hero)
                        $scope.move($scope.hero, {
                            stageX: (x * $scope.baseWidth) - STAGE.regX,
                            stageY: (y * $scope.baseHeight) - STAGE.regY
                        }, undefined, callback);
            },
            MOVE_UP: function (callback) {
                if (!$scope.walking)
                    if ($scope.hero.y - 1 >= 0)
                        ACTIONS.GAME.MOVEOBJECT($scope.hero, $scope.hero.x, $scope.hero.y - 1, callback);
            },
            MOVE_DOWN: function (callback) {
                if (!$scope.walking)
                    if ($scope.hero.y + 1 < maps[FIRSTMAP].height)
                        ACTIONS.GAME.MOVEOBJECT($scope.hero, $scope.hero.x, $scope.hero.y + 1, callback);
            },
            MOVE_RIGHT: function (callback) {
                if (!$scope.walking)
                    if ($scope.hero.x + 1 < maps[FIRSTMAP].width)
                        ACTIONS.GAME.MOVEOBJECT($scope.hero, $scope.hero.x + 1, $scope.hero.y, callback);
            },
            MOVE_LEFT: function (callback) {
                if (!$scope.walking)
                    if ($scope.hero.x - 1 >= 0)
                        ACTIONS.GAME.MOVEOBJECT($scope.hero, $scope.hero.x - 1, $scope.hero.y, callback);
            },
            UP: function () {
                if (!$scope.walking)
                    if ($scope.hero)
                        $scope.hero.body.gotoAndPlay("up");
            },
            DOWN: function () {
                if (!$scope.walking)
                    if ($scope.hero)
                        $scope.hero.body.gotoAndPlay("down");
            },
            RIGHT: function () {
                if (!$scope.walking)
                    if ($scope.hero)
                        $scope.hero.body.gotoAndPlay("right");
            },
            LEFT: function () {
                if (!$scope.walking)
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
            WATERELEMENTAL: function (name) {
                if ($scope.NPCS[name].staticing)
                    return;
                if ($scope.NPCS[name].walking)
                    return;
                if (!$scope.transition) {
                    $scope.transition = true;
                    if ($scope.NPCS[name].flying) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.NPCS[name].deeping) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.NPCS[name].hidden) {
                        $scope.transition = false;
                        return;
                    }

                    if (!$scope.NPCS[name].watering) {
                        $scope.NPCS[name].watering = true;
                        if ($scope.NPCS[name].speed)
                            $scope.NPCS[name].speed = $scope.NPCS[name].base_speed * 4;
                        ACTIONS.ANIMATION.PLAY_NPC(name, "WaterElemental", "up", function () {
                            $scope.transition = false;
                        });
                        ACTIONS.NPC.FILTER(name, 0.5, 1, "blue");
                    } else {
                        $scope.NPCS[name].watering = false;
                        if ($scope.NPCS[name].speed)
                            $scope.NPCS[name].speed = $scope.NPCS[name].base_speed;
                        ACTIONS.ANIMATION.PLAY_NPC(name, "Show", undefined, function () {
                            $scope.transition = false;
                        });
                        ACTIONS.NPC.CLEAR_FILTER(name);
                    }
                }
            },
            FIREELEMENTAL: function (name) {
                if ($scope.NPCS[name].staticing) {
                    if (!$scope.transition) {
                        $scope.transition = true;
                        if (ACTIONS.NPC.POSITION(name) === "up") {
                            ACTIONS.ANIMATION.PLAY_NPC(name, "Teleport", undefined, function () {
                                ACTIONS.NPC.TELEPORT(name, $scope.NPCS[name].x, 0);
                                $scope.transition = false;
                            });
                        }

                        if (ACTIONS.NPC.POSITION(name) === "down") {
                            ACTIONS.ANIMATION.PLAY_NPC(name, "Teleport", undefined, function () {
                                ACTIONS.NPC.TELEPORT(name, $scope.NPCS[name].x, maps[FIRSTMAP].height - 1);
                                $scope.transition = false;
                            });
                        }

                        if (ACTIONS.NPC.POSITION(name) === "left") {
                            ACTIONS.ANIMATION.PLAY_NPC(name, "Teleport", undefined, function () {
                                ACTIONS.NPC.TELEPORT(name, 0, $scope.NPCS[name].y);
                                $scope.transition = false;
                            });
                        }

                        if (ACTIONS.NPC.POSITION(name) === "right") {
                            ACTIONS.ANIMATION.PLAY_NPC(name, "Teleport", undefined, function () {
                                ACTIONS.NPC.TELEPORT(name, maps[FIRSTMAP].width - 1, $scope.NPCS[name].y);
                                $scope.transition = false;
                            });
                        }
                    }
                    return;
                }
                if (!$scope.transition) {
                    $scope.transition = true;
                    if ($scope.NPCS[name].flying) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.NPCS[name].deeping) {
                        $scope.transition = false;
                        return;
                    }
                    if ($scope.NPCS[name].hidden) {
                        $scope.transition = false;
                        return;
                    }
                    var oldposition = ACTIONS.NPC.POSITION(name);
                    ACTIONS.NPC.GET(name).body.gotoAndPlay("gire");
                    setTimeout(function () {
                        if (!$scope.NPCS[name].watering) {
                            ACTIONS.NPC.FILTER(name, 0.5, 1, "red");
                            ACTIONS.ANIMATION.PLAY_NPC(name, "FireElemental", "up", function () {
                                if ($scope.NPCS[name].speed)
                                    $scope.NPCS[name].speed = 30;

                                if (oldposition === "up") {
                                    ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x, 0);
                                }

                                if (oldposition === "down") {
                                    ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x, maps[FIRSTMAP].height - 1);
                                }

                                if (oldposition === "left") {
                                    ACTIONS.NPC.MOVE(name, 0, $scope.NPCS[name].y);
                                }

                                if (oldposition === "right") {
                                    ACTIONS.NPC.MOVE(name, maps[FIRSTMAP].width - 1, $scope.NPCS[name].y);
                                }

                                setTimeout(function () {
                                    if ($scope.NPCS[name].speed)
                                        $scope.NPCS[name].speed = $scope.NPCS[name].base_speed;
                                    ACTIONS.NPC.CLEAR_FILTER(name);
                                    ACTIONS.NPC.GET(name).body.gotoAndPlay(oldposition);
                                    $scope.transition = false;
                                }, 1000);
                            });
                        } else {
                            ACTIONS.ANIMATION.PLAY_NPC(name, "Humo");
                            ACTIONS.NPC.GET().body.gotoAndPlay(oldposition);
                            $scope.transition = false;
                        }

                    }, 1000);
                }
            },
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
            DESTROYNEAR: function (x, y) {
                var wasdestry = false;
                for (var i in $scope.OBJECTS) {
                    var NPC = $scope.OBJECTS[i];
                    if (NPC) {
                        if (NPC.body.visible) {
                            var thisdestry = false;
                            if (NPC.x === x && NPC.y === y - 1) {
                                thisdestry = wasdestry = true;
                            } else if (NPC.x === x - 1 && NPC.y === y - 1) {
                                thisdestry = wasdestry = true;
                            } else if (NPC.x === x + 1 && NPC.y === y - 1) {
                                thisdestry = wasdestry = true;
                            } else if (NPC.x === x - 1 && NPC.y === y) {
                                thisdestry = wasdestry = true;
                            } else if (NPC.x === x + 1 && NPC.y === y) {
                                thisdestry = wasdestry = true;
                            } else if (NPC.x === x && NPC.y === y + 1) {
                                thisdestry = wasdestry = true;
                            } else if (NPC.x === x - 1 && NPC.y === y + 1) {
                                thisdestry = wasdestry = true;
                            } else if (NPC.x === x + 1 && NPC.y === y + 1) {
                                thisdestry = wasdestry = true;
                            }
                            if (thisdestry) {
                                eval(`layer${$scope.OBJECTS[NPC.name].l}.removeChild($scope.OBJECTS[NPC.name].body);`);
                                delete $scope.OBJECTS[NPC.name];
                            }
                        }
                    }
                }
                if (wasdestry) {
                    ACTIONS.ANIMATION.PLAY("FireElemental", x - 2, y - 4, function () {

                    }, undefined, undefined, 1, 1, "#0ff", 2);
                }
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
            DIRECT: function (object, x, y, time, callback) {
                var back = {x: object.x, y: object.y};
                createjs.Tween.get(object).to({
                    x: x,
                    y: y
                }, time / 2).call(function () {
                    createjs.Tween.get(object).to({
                        x: back.x,
                        y: back.y
                    }, time / 2).call(function () {
                        if (callback)
                            callback();
                    });
                });
            },
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
                    layerAnimation.addChild(sprite);
                    if (!loop) {
                        setTimeout(() => {
                            // layerAnimation.removeChild(sprite);
                            sprite.visible = false;
                            if (!nopause)
                                ACTIONS.GAME.RESUME();
                            if (callback)
                                callback();
                        }, (animation.frames.length / parseInt(animation.framerate)) * 1000);

                    } else {
                        if (!nopause)
                            ACTIONS.GAME.RESUME();
                    }
                    sprite.gotoAndPlay("run");
                    $scope.play(animation.sound, SOUNDS.system);
                });
            },
            PLAYNATURAL: function (name, x, y, callback, loop, nopause, light, alpha, color, scale) {
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
                    sprite.x = ((x) - (frameW / 2));
                    sprite.y = ((y) - (frameH / 2));
                    sprite.scale = scale || 1;
                    layerAnimation.addChild(sprite);
                    if (!loop) {
                        setTimeout(function () {
                            // layerAnimation.removeChild(sprite);
                            sprite.visible = false;
                            if (!nopause)
                                ACTIONS.GAME.RESUME();
                            if (callback)
                                callback();
                        }, (animation.frames.length / parseInt(animation.framerate)) * 1000);
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
                    if (scale === true) {
                        var ratio = img.width / $scope.bounds().width;
                        sprite.scaleX = sprite.scaleY = ratio;
                    } else
                        sprite.scale = scale || 1;

                    layerAnimation.addChild(sprite);

                    var thetime = time === true ? (animation.frames.length / parseInt(animation.framerate)) * 1000 : time;
                    createjs.Tween.get(sprite).to({
                        x: ((x2 * $scope.baseWidth) - (frameW / 2)) + $scope.midWidth,
                        y: ((y2 * $scope.baseHeight) - (frameH / 2)) + $scope.midHeight
                    }, thetime).call(function () {
                        // layerAnimation.removeChild(sprite);
                        sprite.visible = false;
                        if (!nopause)
                            ACTIONS.GAME.RESUME();
                        if (callback)
                            callback();
                    });
                    sprite.gotoAndPlay("run");
                    $scope.play(animation.sound, SOUNDS.system);
                });
            },
            THROWNATURAL: function (name, x, y, x2, y2, time, callback, nopause, light, alpha, color, scale) {
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
                    sprite.x = ((x) - (frameW / 2));
                    sprite.y = ((y) - (frameH / 2));
                    if (scale === true) {
                        var ratio = img.width / $scope.bounds().width;
                        sprite.scaleX = sprite.scaleY = ratio;
                    } else
                        sprite.scale = scale || 1;
                    layerAnimation.addChild(sprite);

                    var thetime = time === true ? (animation.frames.length / parseInt(animation.framerate)) * 1000 : time;
                    createjs.Tween.get(sprite).to({
                        x: x2 - (frameW / 2),
                        y: y2 - (frameH / 2)
                    }, thetime).call(function () {
                        // layerAnimation.removeChild(sprite);
                        sprite.visible = false;
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
            THROW_FROM_TO_NATURAL: function (name, objectFrom, ObjectTo, time, callback, nopause, light, alpha, color, scale) {
                ACTIONS.ANIMATION.THROWNATURAL(name, objectFrom.x, objectFrom.y, ObjectTo.x, ObjectTo.y, time, callback, nopause, light, alpha, color, scale);
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
                if (name) {
                    $scope.battleMusic = `../resources/audio/BattleMusic/${name}.ogg`;
                    ACTIONS.SOUND.PLAY($scope.battleMusic, SOUNDS.battle, callback);
                } else {
                    if (maps[FIRSTMAP].battleback.music) {
                        $scope.stop($scope.battleMusic);
                        $scope.battleMusic = false;
                        $scope.play("battle" + FIRSTMAP, SOUNDS.bgs);
                    }

                }
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
        },
        CAMERA: {
            ZERO: function () {
                $scope.runCamera($scope.hero, 0, 0, 100);
            },
            PLAYER: function () {
                $scope.runCamera($scope.hero, $scope.hero.x * $scope.baseWidth, $scope.hero.y * $scope.baseHeight, 100);
            }
        },
        POKEMON: {
            BATTLESTART: function (trainer, type, baseType, win, loose) {
                POKEMONBATTLE.LAUNCH($scope, SESSION.tier, trainer, type, baseType, win, loose);
            },
            BATTLEEND: function () {
                POKEMONBATTLE.END($scope);
            },
        },
        UNIT: {
            TEST: function () {
                return $scope;
            },
            NEXT: function () {
                POKEMONBATTLE.TARGETTEST($scope, GLOBALINDEXTEST);
            },
            FRIEND: function (index) {
                POKEMONBATTLE.FRIENDTEST($scope, index);
            },
            PKM: function () {
                return $scope.PKM;
            },
            BATTLEOBJS: function () {
                return $scope.BATTLEOBJS;
            }
        }
    };
    GLOBALINDEXTEST = 0;


    // Listeners
    $scope.PKM = {};
    $scope.PKM.hpc = 10;
    $scope.PKM.statlimit = 8;
    $scope.PKM.mainMenu = false;
    $scope.PKM.menu = false;
    $scope.PKM.pokemonDetail = false;
    $scope.PKM.previewClose = function () {
        $scope.PKM.pokemonDetail = false;
    };
    $scope.PKM.menu_close = function () {
        $scope.play("Cancel", SOUNDS.system);
        $scope.PKM.menu = false;
    };
    $scope.PKM.talk = function (message, time) {
        $scope.play("Talk", SOUNDS.system);
        $("#enemyText").show();
        $("#enemyTextDiv").html(`${$scope.BATTLEOBJS.ENEMY.name}: ${message}`);
        setTimeout(function () {
            $("#enemyTextDiv").html("");
            $("#enemyText").hide();
        }, time * 1000);
    };
    $scope.PKM.menu_open = function () {
        $scope.play("Menu", SOUNDS.system);
        $scope.PKM.menu = true;
    };
    $scope.PKM.friend = function (index) {
        if ($scope.session !== undefined)
            return $scope.session.pokemons[$scope.BATTLEOBJS.FRIENDINDEX];
    };
    $scope.PKM.target = function () {
        return $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX];
    };
    $scope.PKM.attack = function (move) {
        POKEMONBATTLE.RUNTURN($scope, move);
    };
    $scope.PKM.changefriend = function (index) {
        POKEMONBATTLE.RUNTURN($scope, undefined, index);
    };
    $scope.PKM.hp = function (obj) {
        var base = (obj.stats.hp * $scope.PKM.hpc);
        var real = (obj.stats.hp * $scope.PKM.hpc) - obj.battle.stats.hp;
        real = real <= 0 ? 0 : real;
        return (real * 100) / base;
    };
    $scope.PKM.hpno = function (obj) {
        var base = (obj.stats.hp * $scope.PKM.hpc);
        var real = (obj.stats.hp * $scope.PKM.hpc) - obj.battle.stats.hp;
        real = real <= 0 ? 0 : real;
        return real;
    };
    $scope.PKM.basehp = function (obj) {
        return (obj.stats.hp * $scope.PKM.hpc);
    };
    $scope.PKM.gigamaxAttack = function (move) {
        if ($scope.PKM.friend().battle.gigamax) {
            if (move.gmaxPower)
                return "border: 4px yellow solid";
            else
                return "";
        }
        return "";
    };
    $scope.PKM.stat = function (obj, stat, modifier) {
        if (modifier !== undefined) {
            if (stat !== "hp") {
                if (obj.battle.stats[stat] < $scope.PKM.statlimit && obj.battle.stats[stat] > ($scope.PKM.statlimit * -1))
                    obj.battle.stats[stat] += parseInt(modifier);
            } else {
                obj.battle.stats[stat] += parseInt(modifier);
            }
        }
        if (stat !== "hp") {
            return (obj.stats[stat]) - obj.battle.stats[stat];
        }
    };
    $scope.PKM.moves = function (obj) {
        return obj.battle.moves || obj.moves;
    };
    $scope.PKM.hpcolor = function (hp) {
        if (hp >= 50)
            return "bg-light-green";
        else if (hp <= 49 && hp >= 25)
            return "bg-amber";
        else if (hp >= 1)
            return "bg-red";
        else
            return "bg-lala";
    };
};