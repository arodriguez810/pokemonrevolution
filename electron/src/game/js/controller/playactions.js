function playactions($scope, $timeout) {
    //Actions
    $scope.DOMAIN = DOMAIN;

    $scope.DOMAINRESOURCE = DOMAINRESOURCE;
    $scope.menuOpen = false;
    $scope.subMenuOpen = "perfil";
    $scope.menu = false;
    $scope.chagedBGM = false;
    $scope.chagedBGS = false;
    $scope.battleMusic = false;
    $scope.selectedPokemon = 0;
    $scope.selectedBobeda = 0;
    $scope.menuMessage = undefined;

    $scope.menuPokemon = function (index, detail) {
        $scope.selectedPokemon = index;
        if (detail)
            $scope.PKM.pokemonDetail = true;
        $scope.play("Pointer", $scope.SOUNDS.system);
        $scope.ACTIONS.SOUND.PLAY($scope.selectedPokemonClick().cryUrl, $scope.SOUNDS.system);
    };
    $scope.menuBobeda = function (index) {
        $scope.selectedBobeda = index;
        $scope.play("Pointer", $scope.SOUNDS.system);
        $scope.ACTIONS.SOUND.PLAY($scope.selectedBobedaClick().cryUrl, $scope.SOUNDS.system);
    };
    $scope.desc = function (term, name, desc) {
        $scope.menuMessage = {term: term, name: name, desc: desc};
        $scope.play("Pointer", $scope.SOUNDS.system);
    };
    $scope.descCancel = function (term, name, desc) {
        $scope.menuMessage = undefined;
        $scope.play("Cancel", $scope.SOUNDS.system);
    };
    $scope.subMenu = function (value) {
        $scope.play("Pointer", $scope.SOUNDS.system);
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
    $scope.deletePokemon = function (item, index) {
        $scope.selectedPokemon = 0;
        $scope.POKEMOMFIND.DELETE(item, index);
        //if (!$scope.$$phase) $scope.$digest();
    };
    $scope.trasladePokemon = function (item, index) {
        $scope.selectedPokemon = 0;
        $scope.POKEMOMFIND.TRASLADE(item, index);
    };
    $scope.includePokemon = function (item, index) {
        $scope.POKEMOMFIND.INCLUDE(item, index);
    };
    $scope.upPokemon = function (item, index) {
        alert(1);
    };
    $scope.deleteBobeda = function (item, index) {
        $scope.POKEMOMFIND.DELETE_BOBEDA(item, index);
    };
    $scope.ambient = "natural";
    $scope.cacheAmbient = "";
    $scope.cacheHour = 0;
    $scope.runLogro = function (logro) {
        $scope.ACTIONS.GAME.MENUOFF();
        $timeout(() => {
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
    $scope.mensaje = function (message, button) {
        swal({
            title: message,
            showCancelButton: false,
            confirmButtonColor: "#09dd00",
            confirmButtonText: button || $scope.LAN.t("OK"),
            closeOnConfirm: true,
        }, function () {

        });
    };
    $scope.tradeCallback = null;
    $scope.ASSAULTING = false;
    $scope.CURRENTTRAINER = undefined;
    $scope.choiceFunction = function (value) {
        $scope.dialogText = undefined;
        value.click();
    };
    $scope.ACTIONS = {
        AMBIENT: {
            RUN: function (reset) {
                if (reset)
                    $scope.cacheHour = 99;
                var color = "#000";
                var alpha = 0;
                var h = $scope.modificationTime !== undefined ? $scope.modificationTime : new Date().getHours();
                $scope.TimeText = $scope.ACTIONS.AMBIENT.TIME();
                if (h >= 0 && h <= 3) {
                    color = "#00003f";
                    alpha = 0.4;
                } else if (h >= 4 && h <= 6) {
                    color = "#00003f";
                    alpha = 0.2;
                } else if (h >= 7 && h <= 16) {
                    color = "#fff";
                    alpha = 0.001;
                } else if (h >= 17 && h <= 18) {
                    color = "#ff6700";
                    alpha = 0.1;
                } else if (h >= 19 && h <= 23) {
                    color = "#00003f";
                    alpha = 0.4;
                }
                if ($scope.ambient === "darkcave") {
                    color = "#000";
                    alpha = 0.9;
                }
                if ($scope.maps[$scope.FIRSTMAP].enviroment === "inside") {
                    color = "#fff";
                    alpha = 0.001;
                }


                if ($scope.cacheAmbient !== $scope.ambient || $scope.cacheHour !== h) {
                    $scope.ambients.graphics.clear().beginFill(color || "#000").drawRect(0, 0, $scope.maps[$scope.FIRSTMAP].width * $scope.baseWidth, $scope.maps[$scope.FIRSTMAP].height * $scope.baseHeight).endFill();
                    createjs.Tween.get($scope.ambients).to({alpha: alpha}, 1 * 1000).call(function () {
                    });
                }
                $scope.cacheAmbient = $scope.ambient;
                $scope.cacheHour = h;
                //if (!$scope.$$phase) $scope.$digest();
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
                    } else if (h >= 7 && h <= 16) {
                        $scope.modificationTime = 17;
                        color = "rgb(250,158,47)";
                    } else if (h >= 17 && h <= 18) {
                        $scope.modificationTime = 19;
                        color = "rgb(27,51,250)";

                    } else if (h >= 19 && h <= 23) {
                        $scope.modificationTime = 0;
                        color = "rgb(71,13,167)";

                    }
                    if (name) {
                        $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "TIME", undefined, function () {
                            //if (!$scope.$$phase) $scope.$digest();
                            $scope.ACTIONS.AMBIENT.RUN();
                            $scope.transition = false;
                        }, undefined, undefined, 1, 1, color);
                    } else {
                        $scope.ACTIONS.ANIMATION.PLAY_PLAYER("TIME", undefined, function () {
                            //if (!$scope.$$phase) $scope.$digest();
                            $scope.ACTIONS.AMBIENT.RUN();
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
                    return "OverNight";
                } else if (h >= 4 && h <= 6) {
                    return "Dawn";
                } else if (h >= 7 && h <= 16) {
                    return "Day";
                } else if (h >= 17 && h <= 18) {
                    return "Sunset";
                } else if (h >= 19 && h <= 23) {
                    return "Night";
                }
                return "Day";
            },
            SET: function (name) {
                $scope.ambient = name;
                //if (!$scope.$$phase) $scope.$digest();
                $scope.ACTIONS.AMBIENT.RUN();
            }
        },
        GAME: {
            CHANGELANGUAGE: function (lan) {
                $scope.ACTIONS.GAME.SAVE(function () {
                    STORAGED.setlan(lan);
                    location.reload();
                });
            },
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
                if ($scope.ACTIONS.PLAYER.POSITION() === "down") {
                    $scope.moveEnter($scope.hero.x, $scope.hero.y + 1, true);
                } else if ($scope.ACTIONS.PLAYER.POSITION() === "up") {
                    $scope.moveEnter($scope.hero.x, $scope.hero.y - 1, true);
                } else if ($scope.ACTIONS.PLAYER.POSITION() === "left") {
                    $scope.moveEnter($scope.hero.x - 1, $scope.hero.y, true);
                } else if ($scope.ACTIONS.PLAYER.POSITION() === "right") {
                    $scope.moveEnter($scope.hero.x + 1, $scope.hero.y, true);
                }
                //if (!$scope.$$phase) $scope.$digest();
            },
            PLAY: async function () {
                if (STORAGED.exist()) {
                    $scope.session = await $scope.HOME_.PLAYERPROFILE(STORAGED.get());
                    if (!$scope.session.tier) {
                        $scope.session = await $scope.HOME_.PLAYERPROFILE(STORAGED.get(),
                            {
                                tier: $scope.POKEMON.categories[0].name,
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
                } else {
                    location.href = "index.html";
                }
            },
            SESSION: async function (obj) {
                $scope.ACTIONS.GAME.PAUSE();
                SESSION = $scope.session = await $scope.HOME_.PLAYERPROFILE($scope.session.id, obj,
                    {
                        "x": $scope.ACTIONS.UNIT.TEST().hero.x,
                        "y": $scope.ACTIONS.UNIT.TEST().hero.y,
                        "l": $scope.ACTIONS.UNIT.TEST().hero.l,
                        "map": $scope.FIRSTMAP
                    }
                );
                $scope.ACTIONS.GAME.RESUME();
                //if (!$scope.$$phase) $scope.$digest();
            },
            MENUMESSAGE: function (term, name, desc) {
                $scope.desc(term, name, desc);
                //if (!$scope.$$phase) $scope.$digest();
            },
            MENUMESSAGE_CLOSE: function () {
                $scope.descCancel();
                //if (!$scope.$$phase) $scope.$digest();
            },
            MENU: function () {
                $scope.ACTIONS.GAME.SCREEN(1, "#000", 0.9);
                $scope.ACTIONS.GAME.PAUSE();
                $scope.menuOpen = true;
                $scope.play("Menu", $scope.SOUNDS.system);
                //if (!$scope.$$phase) $scope.$digest();
            },
            SUBMENU: function (value) {
                $scope.play("Pointer", $scope.SOUNDS.system);
                $scope.subMenuOpen = value;
                //if (!$scope.$$phase) $scope.$digest();
            },
            MENUTOGGLE: function () {
                $scope.menuMessage = undefined;
                if ($scope.menuOpen)
                    $scope.ACTIONS.GAME.MENUOFF();
                else
                    $scope.ACTIONS.GAME.MENU();
                $scope.ACTIONS.GAME.SAVE(function () {
                });
            },
            MUTE: function () {
                if (createjs.Sound.volume < 0.20) {
                    createjs.Sound.volume = 1;
                    $scope.muted = Math.floor(createjs.Sound.volume * 100);
                    $scope.session.volume = createjs.Sound.volume;
                    return;
                }
                createjs.Sound.volume -= 0.2;
                $scope.muted = Math.floor(createjs.Sound.volume * 100);
                $scope.session.volume = createjs.Sound.volume;
            },
            MUTE_OFF: function () {
                createjs.Sound.muted = false;
                $scope.muted = false;
                //if (!$scope.$$phase) $scope.$digest();
            },
            MENUOFF: function () {
                $scope.ACTIONS.GAME.SCREENOFF(1);
                $scope.ACTIONS.GAME.RESUME();
                $scope.menuOpen = false;
                $scope.play("Cancel", $scope.SOUNDS.system);
                //if (!$scope.$$phase) $scope.$digest();
            },
            TEST: function (num) {

            },
            DOCUMENTATION: function () {
                var text = "";
                for (var c in $scope.ACTIONS) {
                    text += (`'${c}':{`);
                    for (var m in $scope.ACTIONS[c]) {
                        if (typeof$scope.ACTIONS[c][m] === "function")
                            text += (`'${m}':${$scope.ACTIONS[c][m].toString().split(")")[0].replace("(", "")}`);
                    }
                    text += (`}`);
                }
                return text;
            },
            DOCUMENTATION2: function () {
                var text = [];
                for (var c in $scope.ACTIONS) {
                    for (var m in $scope.ACTIONS[c]) {
                        if (typeof$scope.ACTIONS[c][m] === "function")
                            text.push((`${c}.${m}(${$scope.ACTIONS[c][m].toString().split(")")[0].replace("(", "").replace("function ", "")})`));
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
                //if (!$scope.$$phase) $scope.$digest();
            },
            UNBLOCK() {
                $scope.block = false;
                //if (!$scope.$$phase) $scope.$digest();
            },
            RESUME() {
                $scope.pause = false;
                $scope.block = false;
            },
            SCROLL: function (object, x, y, s_in, s_state, s_out, callback) {
                if (object) {
                    var ox = object.regX;
                    var oy = object.regY;
                    $scope.ACTIONS.GAME.PAUSE();
                    createjs.Tween.get(object).to({
                        regX: x * $scope.baseWidth,
                        regY: y * $scope.baseHeight
                    }, s_in * 1000).call(function () {
                        $timeout(() => {
                            createjs.Tween.get(object).to({regX: ox, regY: oy}, s_out * 1000).call(function () {
                                $scope.ACTIONS.GAME.RESUME();
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
                    $scope.ACTIONS.GAME.PAUSE();
                    createjs.Tween.get(object).to({
                        regX: (to.x - ($scope.width / 2)) * $scope.baseWidth,
                        regY: (to.y - ($scope.height / 2)) * $scope.baseHeight
                    }, s_in * 1000).call(function () {
                        $timeout(() => {
                            createjs.Tween.get(object).to({regX: ox, regY: oy}, s_out * 1000).call(function () {
                                $scope.ACTIONS.GAME.RESUME();
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
                $scope.ACTIONS.GAME.PAUSE();
                $timeout(() => {
                    $scope.ACTIONS.GAME.RESUME();
                    if (callback)
                        callback();
                }, seconds * 1000);
            },
            WAITBLOCK: function (seconds, callback) {
                $scope.ACTIONS.GAME.BLOCK();
                $timeout(() => {
                    $scope.ACTIONS.GAME.UNBLOCK();
                    if (callback)
                        callback();
                }, seconds * 1000);
            },
            SCREEN: function (seconds, color, alpha, callback) {
                $scope.transitions.graphics.clear().beginFill(color || "#000").drawRect(0, 0, $scope.maps[$scope.FIRSTMAP].width * $scope.baseWidth, $scope.maps[$scope.FIRSTMAP].height * $scope.baseHeight).endFill();
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
                $scope.play("Flash", $scope.SOUNDS.system);
                $scope.ACTIONS.GAME.SCREEN(0, color, 1, () => {
                    $scope.ACTIONS.GAME.SCREENOFF(seconds, function () {
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
                        $timeout(() => {
                            eval(codes[0]);
                            codes.shift();
                        }, interval * i);
                    }
                    $timeout(() => {
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
                        $timeout(() => {
                            eval(codes[0]);
                            codes.shift();
                        }, interval * i);
                    }
                    $timeout(() => {
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
                        $timeout(() => {
                            eval(codes[0]);
                            codes.shift();
                        }, interval * i);
                    }
                    $timeout(() => {
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
                        $timeout(() => {
                            eval(codes[0]);
                            codes.shift();
                        }, interval * i);
                    }
                    $timeout(() => {
                        createjs.Tween.get(object).to({y: point}, interval);
                        if (callback)
                            callback()
                    }, interval * (times + 1));
                }
            },
            TELEPORT: async function (object, x, y, mapname, animation, callback) {
                $scope.ACTIONS.GAME.PAUSE();

                if (object) {
                    if (mapname) {
                        var oldposition = $scope.ACTIONS.PLAYER.POSITION();
                        $scope.ACTIONS.GAME.PAUSE();
                        $scope.clearMap();
                        $scope.FIRSTMAP = mapname;
                        await $scope.loadSystem();
                        $scope.playLoading("Loading");
                        await $scope.loadMap($scope.FIRSTMAP);
                        $scope.playLoading("Loading");
                        $scope.drawMap($scope.FIRSTMAP);
                        $scope.drawPlayer(object, $scope.session.id, x, y, object.l);
                        $scope.runCamera(object, ((x) * $scope.baseWidth), ((y) * $scope.baseWidth), 10);
                        $scope.ACTIONS.GAME.SCREEN(0.1);
                        $scope.ACTIONS.PLAYER.OFF();
                        $scope.stopLoading();
                        $scope.hero.body.gotoAndPlay(animation || oldposition);
                        $timeout(() => {
                            $scope.ACTIONS.GAME.RESUME();
                            $scope.setLife();
                            $scope.ACTIONS.AMBIENT.RUN(true);
                            $scope.ACTIONS.GAME.SCREENOFF(1);
                            $scope.ACTIONS.POKEMON.BATTLEEND();
                        }, 1000);
                        if (callback)
                            callback();
                        $scope.ACTIONS.GAME.SAVE(function () {
                        });
                    } else {
                        $scope.teleport(object, {
                            x: x * $scope.baseWidth,
                            y: y * $scope.baseHeight
                        }, animation || $scope.ACTIONS.PLAYER.POSITION());
                        $scope.ACTIONS.GAME.RESUME();
                        $scope.ACTIONS.AMBIENT.RUN(true);
                        if (callback)
                            callback();
                        $scope.ACTIONS.GAME.SAVE(function () {
                        });
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
                await $scope.ACTIONS.GAME.TELEPORT(object, nextx, nexty, mapname, animation, callback);
            },
            MOVE: function (object, name, x, y, callback, force) {
                if (object[name]) {
                    $scope.move(object[name], {
                        stageX: (x * $scope.baseWidth) - $scope.STAGE.regX,
                        stageY: (y * $scope.baseHeight) - $scope.STAGE.regY
                    }, undefined, callback, force);
                }
            },
            MOVEOBJECT: function (object, x, y, callback) {
                if (object) {
                    $scope.move(object, {
                        stageX: (x * $scope.baseWidth) - $scope.STAGE.regX,
                        stageY: (y * $scope.baseHeight) - $scope.STAGE.regY
                    }, undefined, callback);
                }
            },
            DESPEGUE: function (object) {
                var uperLayer = 8;
                var upperObject = null;
                for (var l = 8; l >= 1; l--) {
                    var obj = $scope.maps[$scope.FIRSTMAP].map[`${l}_${(x)}_${(y)}`];
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
                    $scope.ACTIONS.GAME.BLOCK();
                    if (!object.flying) {
                        object.flying = true;
                        object["body" + "wing1"].gotoAndPlay('up');
                        object["body" + "wing2"].gotoAndPlay('up');
                        if (object.speed)
                            object.speed = object.base_speed / 1.5;
                        object.body.framerate = 1;
                        createjs.Sound.stop();

                        $scope.ACTIONS.ANIMATION.PLAY_IN(object, "wing1", function () {
                            object["body" + "wing1"].visible = object["body" + "wing2"].visible = true;
                            var uperLayer = 9;
                            if (!object.isNPC && !object.isObject) {
                                $scope.play("Wind", $scope.SOUNDS.bgm);
                            }

                            eval(` $scope.layer${object.l}.removeChild(object["body" + "wing2"]);`);
                            eval(` $scope.layer${object.l}.removeChild(object["body" + "wing1"]);`);
                            eval(` $scope.layer${object.l}.removeChild(object.body);`);
                            eval(` $scope.layer${object.l}.removeChild(object.shadow);`);
                            object.l = uperLayer;
                            eval(` $scope.layer${uperLayer}.addChild(object["body" + "wing2"]);`);
                            eval(` $scope.layer${uperLayer}.addChild(object.body);`);
                            eval(` $scope.layer${uperLayer}.addChild(object["body" + "wing1"]);`);
                            eval(` $scope.layer${uperLayer}.addChild(object.shadow);`);
                            if (object.shadow)
                                object.shadowY = $scope.baseHeight;
                            $scope.ACTIONS.GAME.MOVEOBJECT(object, object.x, object.y - 1);
                            if ($scope.hero.hidden) {
                                $scope.hero.hidden = false;
                                $scope.ACTIONS.ANIMATION.PLAY_IN(object, "Show", function () {

                                });
                                $scope.ACTIONS.GAME.ALPHA(object, 1);
                            }
                            $scope.ACTIONS.GAME.SCREEN(1, "#fff", 0.2);
                            $scope.ACTIONS.ANIMATION.PLAY_IN(object, "Tornade", function () {
                                $scope.transition = false;
                                $scope.ACTIONS.GAME.UNBLOCK();
                            }, undefined, true);


                        }, undefined, true);
                    } else {
                        var uperLayer = 1;
                        var upperObject = null;
                        for (var l = 9; l >= 1; l--) {
                            var obj = $scope.maps[$scope.FIRSTMAP].map[`${l}_${(object.x)}_${(object.y + 1)}`];
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
                            $scope.play("bgm" + $scope.FIRSTMAP, $scope.SOUNDS.bgm);
                            $scope.play("bgs" + $scope.FIRSTMAP, $scope.SOUNDS.bgs);
                        }

                        if (object.shadow)
                            object.shadowY = 8;

                        object["body" + "wing1"].visible = object["body" + "wing2"].visible = false;

                        $scope.ACTIONS.ANIMATION.PLAY_IN(object, "wing1", function () {
                            $scope.ACTIONS.GAME.MOVEOBJECT(object, object.x, object.y + 1, function () {
                                eval(` $scope.layer${object.l}.removeChild(object["body" + "wing2"]);`);
                                eval(` $scope.layer${object.l}.removeChild(object["body" + "wing1"]);`);
                                eval(` $scope.layer${object.l}.removeChild(object.body);`);
                                eval(` $scope.layer${object.l}.removeChild(object.shadow);`);
                                object.l = uperLayer;
                                eval(` $scope.layer${uperLayer}.addChild(object["body" + "wing2"]);`);
                                eval(` $scope.layer${uperLayer}.addChild(object.body);`);
                                eval(` $scope.layer${uperLayer}.addChild(object["body" + "wing1"]);`);
                                eval(` $scope.layer${uperLayer}.addChild(object.shadow);`);
                                object.flying = false;
                                $scope.ACTIONS.GAME.UNBLOCK();
                                if (object.isNPC) {
                                    $scope.ACTIONS.NPC.JUMP_DOWN(object.name);
                                } else
                                    $scope.ACTIONS.GAME.JUMP(object, object.x, object.y, true);
                                $scope.ACTIONS.GAME.SCREENOFF(1);
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
                        var obj = $scope.maps[$scope.FIRSTMAP].map[`${l}_${(x)}_${(y)}`];
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
                                    $scope.ACTIONS.GAME.ALPHABASE($scope.layer1, 1, 0.5);

                                if (object.isNPC) {
                                    $scope.ACTIONS.NPC.ALPHA(object.name, 0.5);
                                } else if (object.isObject) {
                                    $scope.ACTIONS.OBJECT.ALPHA(object.name, 0.5);
                                } else {
                                    $scope.ACTIONS.PLAYER.ALPHA(0.5);
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
                                    $scope.play("Deep", $scope.SOUNDS.bgm);
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
                                    $scope.ACTIONS.GAME.ALPHABASE($scope.layer1, 1, 1);

                                if (object.isNPC) {
                                    $scope.ACTIONS.NPC.ALPHA(object.name, 1);
                                } else if (object.isObject) {
                                    $scope.ACTIONS.OBJECT.ALPHA(object.name, 1);
                                } else {
                                    $scope.ACTIONS.PLAYER.ALPHA(1);
                                }
                                if (!object.watering) {
                                    if (object.speed)
                                        object.speed = object.base_speed;
                                } else {
                                    if (object.speed)
                                        object.speed = object.base_speed * 3;
                                }

                                object.body.framerate = $scope.playerFrames;
                                $scope.play("Dive", $scope.SOUNDS.system);
                                if (!object.isNPC && !object.isObject) {
                                    createjs.Sound.stop();
                                    $scope.play("bgm" + $scope.FIRSTMAP, $scope.SOUNDS.bgm);
                                    $scope.play("bgs" + $scope.FIRSTMAP, $scope.SOUNDS.bgs);
                                }
                                object.deeping = false;
                            }
                        }

                        if (uperLayer > object.l || uperLayer < object.l) {
                            object.l = uperLayer;
                            if (object.l !== 0) {
                                eval(` $scope.layer${object.l}.removeChild(object["body" + "wing2"]);`);
                                eval(` $scope.layer${object.l}.removeChild(object["body" + "wing1"]);`);
                                eval(` $scope.layer${object.l}.removeChild(object.body);`);
                                eval(` $scope.layer${object.l}.removeChild(object.shadow);`);

                                eval(` $scope.layer${uperLayer}.addChild(object["body" + "wing2"]);`);
                                eval(` $scope.layer${uperLayer}.addChild(object.body);`);
                                eval(` $scope.layer${uperLayer}.addChild(object["body" + "wing1"]);`);
                                eval(` $scope.layer${uperLayer}.addChild(object.shadow);`);
                            }
                        }
                        if (!nosound)
                            $scope.play("Jump", $scope.SOUNDS.system);

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
                                        $scope.ACTIONS.ANIMATION.PLAY_NPC(object.name, "Dive", "UP");
                                    } else if (object.isObject) {
                                        $scope.ACTIONS.ANIMATION.PLAY_OBJECT(object.name, "Dive", "UP");
                                    } else {
                                        $scope.ACTIONS.ANIMATION.PLAY_PLAYER("Dive", "UP");
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
            FILTER_BASE: function (object, light, alpha, color) {
                var color = tinycolor(color);
                object.filters = [new createjs.ColorFilter(light, light, light, alpha, color._r, color._g, color._b)];
            },
            FILTER_STAGE: function (light, alpha, color) {
                var color = tinycolor(color);
                $scope.layer1.filters = [new createjs.ColorFilter(light, light, light, alpha, color._r, color._g, color._b)];
            },
            CLEAR_FILTER: function (object) {
                if (object.isObject) {
                    $scope.reDrawObject(object);
                } else
                    $scope.reDrawPlayer(object);
            },
            TEXT: function (text, seconds) {
                $scope.ACTIONS.GAME.SCREEN(0.1, "#000", 1, function () {
                    $scope.playLoading(text);
                    $timeout(() => {
                        $scope.stopLoading();
                        $scope.ACTIONS.GAME.SCREENOFF(0.1);
                    }, seconds * 1000);
                });

            },
            SAVE: async function (callback) {
                await $scope.ACTIONS.GAME.SESSION($scope.session);
                if (callback)
                    callback();
            }
        },
        PLAYER: {
            OFF: function () {
                if ($scope.hero.staticing) {
                    $scope.ACTIONS.PLAYER.Thunder();
                }
                if ($scope.hero.watering) {
                    $scope.ACTIONS.PLAYER.WATERELEMENTAL();
                }
                if ($scope.hero.hidden) {
                    $scope.ACTIONS.PLAYER.HIDE();
                }
                if ($scope.hero.flying) {
                    $scope.ACTIONS.PLAYER.FLY();
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
                        $scope.ACTIONS.ANIMATION.PLAY_PLAYER("WaterElemental", "up", function () {
                            $scope.transition = false;
                        });
                        $scope.ACTIONS.PLAYER.FILTER(0.5, 1, "blue");
                    } else {
                        $scope.hero.watering = false;
                        if ($scope.hero.speed)
                            $scope.hero.speed = $scope.hero.base_speed;
                        $scope.ACTIONS.ANIMATION.PLAY_PLAYER("Show", undefined, function () {
                            $scope.transition = false;
                        });
                        $scope.ACTIONS.PLAYER.CLEAR_FILTER();
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
                        $scope.ACTIONS.ANIMATION.PLAY_IN($scope.hero, "ThunderAbi", function () {
                            $scope.ACTIONS.PLAYER.FILTER(1.5, 1, "#FFDD3C");
                            $scope.transition = false;
                        });

                    } else {
                        $scope.hero.staticing = false;
                        if ($scope.hero.speed)
                            $scope.hero.speed = $scope.hero.base_speed;
                        $scope.ACTIONS.ANIMATION.PLAY_PLAYER("Show", undefined, function () {
                            $scope.transition = false;
                        });
                        $scope.ACTIONS.PLAYER.CLEAR_FILTER();
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
                    var oldposition = $scope.ACTIONS.PLAYER.POSITION();
                    $scope.ACTIONS.PLAYER.GET().body.gotoAndPlay("gire");
                    $timeout(() => {
                        if (!$scope.hero.watering) {
                            if (!$scope.hero.staticing)
                                $scope.ACTIONS.PLAYER.FILTER(0.5, 1, "red");
                            $scope.ACTIONS.ANIMATION.PLAY_PLAYER("FireElemental", "up", function () {
                                if (!$scope.hero.staticing) {
                                    if ($scope.hero.speed)
                                        $scope.hero.speed = 30;


                                    if (oldposition === "up") {
                                        $scope.ACTIONS.PLAYER.MOVE($scope.hero.x, 0);
                                    }

                                    if (oldposition === "down") {
                                        $scope.ACTIONS.PLAYER.MOVE($scope.hero.x, $scope.maps[$scope.FIRSTMAP].height - 1);

                                    }

                                    if (oldposition === "left") {
                                        $scope.ACTIONS.PLAYER.MOVE(0, $scope.hero.y);

                                    }

                                    if (oldposition === "right") {
                                        $scope.ACTIONS.PLAYER.MOVE($scope.maps[$scope.FIRSTMAP].width - 1, $scope.hero.y);
                                    }
                                } else {
                                    $scope.ACTIONS.OBJECT.DESTROYNEAR($scope.hero.x, $scope.hero.y)
                                }

                                $timeout(() => {
                                    if (!$scope.hero.staticing)
                                        if ($scope.hero.speed)
                                            $scope.hero.speed = $scope.hero.base_speed;
                                    if (!$scope.hero.staticing)
                                        $scope.ACTIONS.PLAYER.CLEAR_FILTER();
                                    $scope.ACTIONS.PLAYER.GET().body.gotoAndPlay(oldposition);
                                    $scope.transition = false;
                                }, 1000);
                            });
                        } else {
                            $scope.ACTIONS.ANIMATION.PLAY_PLAYER("Humo");
                            $scope.ACTIONS.PLAYER.GET().body.gotoAndPlay(oldposition);
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
                    var oldposition = $scope.ACTIONS.PLAYER.POSITION();

                    var frame = $scope.hero.watering ? 79 : 199;
                    var animating = $scope.hero.watering ? "IceElemental" : "EarthElemental";
                    $scope.ACTIONS.ANIMATION.PLAY_PLAYER(animating, oldposition.toUpperCase(), function () {
                        $timeout(() => {
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
                                var obj = $scope.maps[$scope.FIRSTMAP].map[`${l}_${(x)}_${(y)}`];
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
                                $scope.ACTIONS.PLAYER.CREATEMURITO(L, x, y - 1, frame, "A");
                                $scope.ACTIONS.PLAYER.CREATEMURITO(L, x, y + 1, frame, "A2");

                                $scope.ACTIONS.PLAYER.CREATEMURITO(L, x - 1, y - 1, frame, "B");
                                $scope.ACTIONS.PLAYER.CREATEMURITO(L, x + 1, y - 1, frame, "C");

                                $scope.ACTIONS.PLAYER.CREATEMURITO(L, x - 1, y + 1, frame, "B2");
                                $scope.ACTIONS.PLAYER.CREATEMURITO(L, x + 1, y + 1, frame, "C2");

                                $scope.ACTIONS.PLAYER.CREATEMURITO(L, x - 1, y, frame, "A");
                                $scope.ACTIONS.PLAYER.CREATEMURITO(L, x + 1, y, frame, "A2");


                            } else {
                                $scope.ACTIONS.PLAYER.CREATEMURITO(L, x, y, frame);
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
                                    eval(` $scope.layer${L}.removeChild(NPC.body);`);
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
                $scope.maps[$scope.FIRSTMAP].event[`${L}_${(x)}_${(y)}`] = {
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
                var e = $scope.maps[$scope.FIRSTMAP].event[`${L}_${(x)}_${(y)}`];
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
                    $scope.ACTIONS.ANIMATION.PLAY_PLAYER("Infinite", undefined, function () {
                        $timeout(() => {
                            $scope.ACTIONS.PLAYER.TELEPORT(0, 0, "Elinfinito");
                        }, 1000);
                        $scope.transition = false;
                    });
                    return;
                }
                if (!$scope.transition) {
                    $scope.transition = true;
                    if ($scope.ACTIONS.PLAYER.POSITION() === "up") {
                        $scope.ACTIONS.ANIMATION.PLAY_PLAYER("teleport", undefined, function () {
                            $scope.ACTIONS.PLAYER.TELEPORT($scope.hero.x, 0);
                            $scope.transition = false;
                        });
                    }

                    if ($scope.ACTIONS.PLAYER.POSITION() === "down") {
                        $scope.ACTIONS.ANIMATION.PLAY_PLAYER("teleport", undefined, function () {
                            $scope.ACTIONS.PLAYER.TELEPORT($scope.hero.x, $scope.maps[$scope.FIRSTMAP].height - 1);
                            $scope.transition = false;
                        });
                    }

                    if ($scope.ACTIONS.PLAYER.POSITION() === "left") {
                        $scope.ACTIONS.ANIMATION.PLAY_PLAYER("teleport", undefined, function () {
                            $scope.ACTIONS.PLAYER.TELEPORT(0, $scope.hero.y);
                            $scope.transition = false;
                        });
                    }

                    if ($scope.ACTIONS.PLAYER.POSITION() === "right") {
                        $scope.ACTIONS.ANIMATION.PLAY_PLAYER("teleport", undefined, function () {
                            $scope.ACTIONS.PLAYER.TELEPORT($scope.maps[$scope.FIRSTMAP].width - 1, $scope.hero.y);
                            $scope.transition = false;
                        });
                    }
                }
            },
            SHAKE: function (interval, distance, times, callback) {
                if ($scope.hero) {
                    $scope.ACTIONS.GAME.SHAKE($scope.hero.body, interval, distance, times, callback);
                    $scope.ACTIONS.GAME.SHAKE($scope.hero.shadow, interval, distance, times, callback);
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
                        $scope.ACTIONS.ANIMATION.PLAY_PLAYER("Hide", undefined, function () {
                            $scope.transition = false;
                        });
                        $scope.ACTIONS.PLAYER.ALPHA(0.1);
                    } else {
                        $scope.hero.hidden = false;
                        if ($scope.hero.speed)
                            $scope.hero.speed = $scope.hero.base_speed;
                        $scope.ACTIONS.ANIMATION.PLAY_PLAYER("Show", undefined, function () {
                            $scope.transition = false;
                        });
                        $scope.ACTIONS.PLAYER.ALPHA(1);
                    }
                }
            },
            ALPHA: function (alpha, callback) {
                if ($scope.hero)
                    $scope.ACTIONS.GAME.ALPHA($scope.hero, alpha, callback);
            },
            MOVE: function (x, y, callback, force) {
                if ($scope.ASSAULTING && !force)
                    return;
                if (!$scope.walking)
                    if ($scope.hero)
                        $scope.move($scope.hero, {
                            stageX: (x * $scope.baseWidth) - $scope.STAGE.regX,
                            stageY: (y * $scope.baseHeight) - $scope.STAGE.regY
                        }, undefined, callback, force);
            },
            MOVE_UP: function (callback) {
                if ($scope.block)
                    return;
                if ($scope.ASSAULTING)
                    return;
                if (!$scope.walking)
                    if ($scope.hero.y - 1 >= 0) {
                        $scope.PKM.Assault();

                        $scope.ACTIONS.GAME.MOVEOBJECT($scope.hero, $scope.hero.x, $scope.hero.y - 1, callback);
                    }
            },
            MOVE_DOWN: function (callback) {
                if ($scope.block)
                    return;
                if ($scope.ASSAULTING)
                    return;
                if (!$scope.walking)
                    if ($scope.hero.y + 1 < $scope.maps[$scope.FIRSTMAP].height) {
                        $scope.PKM.Assault();
                        $scope.ACTIONS.GAME.MOVEOBJECT($scope.hero, $scope.hero.x, $scope.hero.y + 1, callback);
                    }
            },
            MOVE_RIGHT: function (callback) {
                if ($scope.block)
                    return;
                if ($scope.ASSAULTING)
                    return;
                if (!$scope.walking)
                    if ($scope.hero.x + 1 < $scope.maps[$scope.FIRSTMAP].width) {
                        $scope.PKM.Assault();
                        $scope.ACTIONS.GAME.MOVEOBJECT($scope.hero, $scope.hero.x + 1, $scope.hero.y, callback);
                    }
            },
            MOVE_LEFT: function (callback) {
                if ($scope.block)
                    return;
                if ($scope.ASSAULTING)
                    return;
                if (!$scope.walking)
                    if ($scope.hero.x - 1 >= 0) {
                        $scope.PKM.Assault();
                        $scope.ACTIONS.GAME.MOVEOBJECT($scope.hero, $scope.hero.x - 1, $scope.hero.y, callback);
                    }
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
                $scope.ACTIONS.PLAYER.LOOK($scope.NPCS[name]);
            },
            LOOKOBJECT: function (name) {
                $scope.ACTIONS.PLAYER.LOOK($scope.OBJECTS[name]);
            },
            ASSAULT: function (trainer) {
                if ($scope.ASSAULTING)
                    return;
                $scope.ASSAULTING = true;
                $scope.ACTIONS.SOUND.STOPALL();
                $scope.ACTIONS.GAME.PAUSE();
                $scope.ACTIONS.GAME.BLOCK();
                $scope.ACTIONS.ANIMATION.PLAY_UP($scope.ACTIONS.NPC.GET(trainer.name), "b_admiracion", function () {
                    $scope.ACTIONS.GAME.PAUSE();
                    $scope.ACTIONS.GAME.BLOCK();
                    $scope.ACTIONS.NPC.MOVE(trainer.name, $scope.ACTIONS.PLAYER.GET().x, $scope.ACTIONS.PLAYER.GET().y, function () {
                        $scope.ACTIONS.GAME.PAUSE();
                        $scope.ACTIONS.GAME.BLOCK();
                        $scope.ACTIONS.NPC.LOOK($scope.ACTIONS.NPC.GET(trainer.name), $scope.ACTIONS.PLAYER.GET());
                        $scope.ACTIONS.PLAYER.LOOK($scope.ACTIONS.NPC.GET(trainer.name));
                        $scope.ACTIONS.SOUND.system("look");
                        $scope.ACTIONS.GAME.BLOCK();
                        $scope.ACTIONS.GAME.PAUSE();
                        $scope.ACTIONS.POKEMON.BATTLESTART(trainer.name);
                    }, true);
                });
            },
            CLEARASSAULT: function () {
                $scope.ASSAULTING = false;
                $scope.ACTIONS.GAME.UNBLOCK();
                $scope.ACTIONS.GAME.RESUME();
            },
            ASSAULTNPC: function (trainer) {


                if ($scope.ASSAULTING)
                    return;

                var actions = [];
                if (trainer.event.actions.length > 0) {
                    var actionsNaturals = OSO(trainer.event.actions);
                    for (var c of actionsNaturals) {
                        if (eval(c.CC) && c.script.indexOf('//nonear') === -1) {
                            actions.push(c);
                        }
                    }
                }
                if (actions.length === 0)
                    return;

                $scope.ASSAULTING = true;
                $scope.ACTIONS.SOUND.STOPALL();
                $scope.ACTIONS.GAME.PAUSE();
                $scope.ACTIONS.GAME.BLOCK();
                $scope.ACTIONS.ANIMATION.PLAY_UP($scope.ACTIONS.NPC.GET(trainer.name), "b_admiracion", function () {
                    $scope.ACTIONS.GAME.PAUSE();
                    $scope.ACTIONS.GAME.BLOCK();
                    $scope.ACTIONS.NPC.MOVE(trainer.name, $scope.ACTIONS.PLAYER.GET().x, $scope.ACTIONS.PLAYER.GET().y, function () {
                        $scope.ACTIONS.GAME.PAUSE();
                        $scope.ACTIONS.GAME.BLOCK();
                        $scope.ACTIONS.NPC.LOOK($scope.ACTIONS.NPC.GET(trainer.name), $scope.ACTIONS.PLAYER.GET());
                        $scope.ACTIONS.PLAYER.LOOK($scope.ACTIONS.NPC.GET(trainer.name));
                        $scope.ACTIONS.SOUND.system("looknpc");
                        setTimeout(function () {
                            $scope.ACTIONS.SOUND.BGM_RESTORE();
                        }, 3000);
                        $scope.ACTIONS.GAME.RESUME();
                        $scope.runActions(actions);
                    }, true);
                });
            },
            WHOLOOKME: function (x, y) {
                if ($scope.ASSAULTING)
                    return;
                x = x || $scope.ACTIONS.PLAYER.GET().x;
                y = y || $scope.ACTIONS.PLAYER.GET().y;
                var l = $scope.ACTIONS.PLAYER.GET().l;
                var range = 5;
                if ($scope.lastEventLook !== `${x}x${y}x${l}`) {
                    $scope.TRAINERS = [];
                    for (var i in $scope.NPCS)
                        if ($scope.NPCS[i].event.trigger === $scope.E_trigger.entrenador || $scope.NPCS[i].event.trigger === $scope.E_trigger.entrenadortranquilo)
                            if ($scope.NPCS[i].body.visible)
                                $scope.TRAINERS[`${$scope.NPCS[i].x}x${$scope.NPCS[i].y}x${$scope.NPCS[i].l}`] = $scope.NPCS[i];

                    $scope.lastEventLook = `${x}x${y}x${l}`;
                    var uplimit = ((y - range));
                    if (y > 0) {
                        for (var U = y; U >= uplimit; U--) {
                            if ($scope.collision($scope.hero, x, U) && !$scope.TRAINERS[`${x}x${U}x${l}`]) {
                                break;
                            }
                            if ($scope.TRAINERS[`${x}x${U}x${l}`]) {
                                var trainer = $scope.TRAINERS[`${x}x${U}x${l}`];
                                if ($scope.ACTIONS.NPC.POSITION(trainer.name) === "down") {
                                    if (!$scope.ACTIONS.PROGRESS.GETNATURAL("trainer" + trainer.name)) {
                                        $scope.ACTIONS.PLAYER.ASSAULT(trainer);
                                        return;
                                    }
                                } else
                                    break
                            }
                        }
                    }
                    var downlimit = ((y + range));
                    if (y < $scope.maps[$scope.FIRSTMAP].height) {
                        for (var U = y; U <= downlimit; U++) {
                            if ($scope.collision($scope.hero, x, U) && !$scope.TRAINERS[`${x}x${U}x${l}`]) {
                                break;
                            }
                            if ($scope.TRAINERS[`${x}x${U}x${l}`]) {
                                var trainer = $scope.TRAINERS[`${x}x${U}x${l}`];
                                if ($scope.ACTIONS.NPC.POSITION(trainer.name) === "up") {
                                    if (!$scope.ACTIONS.PROGRESS.GETNATURAL("trainer" + trainer.name)) {
                                        $scope.ACTIONS.PLAYER.ASSAULT(trainer);
                                        return;
                                    }
                                } else
                                    break

                            }
                        }
                    }
                    var uplimitx = ((x - range));
                    if (x > 0) {
                        for (var U = x; U >= uplimitx; U--) {
                            if ($scope.collision($scope.hero, U, y) && !$scope.TRAINERS[`${U}x${y}x${l}`]) {
                                break;
                            }
                            if ($scope.TRAINERS[`${U}x${y}x${l}`]) {
                                var trainer = $scope.TRAINERS[`${U}x${y}x${l}`];
                                if ($scope.ACTIONS.NPC.POSITION(trainer.name) === "right") {
                                    if (!$scope.ACTIONS.PROGRESS.GETNATURAL("trainer" + trainer.name)) {
                                        $scope.ACTIONS.PLAYER.ASSAULT(trainer);
                                        return;
                                    }
                                } else
                                    break
                            }
                        }
                    }
                    var downlimitx = ((x + range));
                    if (x < $scope.maps[$scope.FIRSTMAP].width) {
                        for (var U = x; U <= downlimitx; U++) {
                            if ($scope.collision($scope.hero, U, y) && !$scope.TRAINERS[`${U}x${y}x${l}`]) {
                                break;
                            }
                            if ($scope.TRAINERS[`${U}x${y}x${l}`]) {
                                var trainer = $scope.TRAINERS[`${U}x${y}x${l}`];
                                if ($scope.ACTIONS.NPC.POSITION(trainer.name) === "left") {
                                    if (!$scope.ACTIONS.PROGRESS.GETNATURAL("trainer" + trainer.name)) {
                                        $scope.ACTIONS.PLAYER.ASSAULT(trainer);
                                        return;
                                    }
                                } else
                                    break
                            }
                        }
                    }
                }
            },
            WHOLOOKMENPC: function (x, y) {
                if ($scope.ASSAULTING)
                    return;
                x = x || $scope.ACTIONS.PLAYER.GET().x;
                y = y || $scope.ACTIONS.PLAYER.GET().y;
                var l = $scope.ACTIONS.PLAYER.GET().l;
                var range = 5;
                if ($scope.lastEventLookNPC !== `${x}x${y}x${l}`) {
                    $scope.NEARS = [];
                    for (var i in $scope.NPCS)
                        if ($scope.NPCS[i].event.trigger === $scope.E_trigger.near || $scope.NPCS[i].event.trigger === $scope.E_trigger.neartranquilo) {
                            if ($scope.NPCS[i].body.visible)
                                $scope.NEARS[`${$scope.NPCS[i].x}x${$scope.NPCS[i].y}x${$scope.NPCS[i].l}`] = $scope.NPCS[i];
                        }

                    $scope.lastEventLookNPC = `${x}x${y}x${l}`;
                    var uplimit = ((y - range));
                    if (y > 0) {
                        for (var U = y; U >= uplimit; U--) {
                            if ($scope.collision($scope.hero, x, U) && !$scope.NEARS[`${x}x${U}x${l}`]) {
                                break;
                            }
                            if ($scope.NEARS[`${x}x${U}x${l}`]) {
                                var trainer = $scope.NEARS[`${x}x${U}x${l}`];
                                if ($scope.ACTIONS.NPC.POSITION(trainer.name) === "down") {
                                    if (!$scope.ACTIONS.PROGRESS.GETNATURAL("trainer" + trainer.name)) {
                                        $scope.ACTIONS.PLAYER.ASSAULTNPC(trainer);
                                        return;
                                    }
                                } else
                                    break
                            }
                        }
                    }
                    var downlimit = ((y + range));
                    if (y < $scope.maps[$scope.FIRSTMAP].height) {
                        for (var U = y; U <= downlimit; U++) {
                            if ($scope.collision($scope.hero, x, U) && !$scope.NEARS[`${x}x${U}x${l}`]) {
                                break;
                            }
                            if ($scope.NEARS[`${x}x${U}x${l}`]) {
                                var trainer = $scope.NEARS[`${x}x${U}x${l}`];
                                if ($scope.ACTIONS.NPC.POSITION(trainer.name) === "up") {
                                    if (!$scope.ACTIONS.PROGRESS.GETNATURAL("trainer" + trainer.name)) {
                                        $scope.ACTIONS.PLAYER.ASSAULTNPC(trainer);
                                        return;
                                    }
                                } else
                                    break

                            }
                        }
                    }
                    var uplimitx = ((x - range));
                    if (x > 0) {
                        for (var U = x; U >= uplimitx; U--) {
                            if ($scope.collision($scope.hero, U, y) && !$scope.NEARS[`${U}x${y}x${l}`]) {
                                break;
                            }
                            if ($scope.NEARS[`${U}x${y}x${l}`]) {
                                var trainer = $scope.NEARS[`${U}x${y}x${l}`];
                                if ($scope.ACTIONS.NPC.POSITION(trainer.name) === "right") {
                                    if (!$scope.ACTIONS.PROGRESS.GETNATURAL("trainer" + trainer.name)) {
                                        $scope.ACTIONS.PLAYER.ASSAULTNPC(trainer);
                                        return;
                                    }
                                } else
                                    break
                            }
                        }
                    }
                    var downlimitx = ((x + range));
                    if (x < $scope.maps[$scope.FIRSTMAP].width) {
                        for (var U = x; U <= downlimitx; U++) {
                            if ($scope.collision($scope.hero, U, y) && !$scope.NEARS[`${U}x${y}x${l}`]) {
                                break;
                            }
                            if ($scope.NEARS[`${U}x${y}x${l}`]) {
                                var trainer = $scope.NEARS[`${U}x${y}x${l}`];
                                if ($scope.ACTIONS.NPC.POSITION(trainer.name) === "left") {
                                    if (!$scope.ACTIONS.PROGRESS.GETNATURAL("trainer" + trainer.name)) {
                                        $scope.ACTIONS.PLAYER.ASSAULTNPC(trainer);
                                        return;
                                    }
                                } else
                                    break
                            }
                        }
                    }
                }
            },
            TELEPORT: async function (x, y, mapname, animation, callback) {
                $scope.ACTIONS.GAME.PAUSE();
                $scope.ACTIONS.GAME.BLOCK();
                if (mapname)
                    $scope.ACTIONS.GAME.SCREEN(1, "black", 1);
                $timeout(async function () {
                    await $scope.ACTIONS.GAME.TELEPORT($scope.hero, x, y, mapname, animation, callback);
                    $scope.ACTIONS.GAME.RESUME();
                }, 1000);
            },
            TELEPORT_NPC: async function (name, dir, mapname, animation, callback) {
                $scope.ACTIONS.GAME.TELEPORT_TO($scope.hero, $scope.NPCS[name], dir, mapname, animation, callback);
            },
            TELEPORT_OBJECT: async function (name, dir, mapname, animation, callback) {
                $scope.ACTIONS.GAME.TELEPORT_TO($scope.hero, $scope.OBJECTS[name], dir, mapname, animation, callback);
            },
            JUMP: function (x, y) {
                if ($scope.hero.canJump)
                    $scope.ACTIONS.GAME.JUMP($scope.hero, x, y);
            },
            FLY: function () {
                if ($scope.hero.canFly)
                    $scope.ACTIONS.GAME.FLY($scope.hero);
            },
            JUMP_UP: function () {
                if ($scope.hero.canJump)
                    $scope.ACTIONS.GAME.JUMP($scope.hero, $scope.hero.x, $scope.hero.y - 1);
            },
            JUMP_DOWN: function () {
                if ($scope.hero.canJump)
                    $scope.ACTIONS.GAME.JUMP($scope.hero, $scope.hero.x, $scope.hero.y + 1);
            },
            JUMP_LEFT: function () {
                if ($scope.hero.canJump)
                    $scope.ACTIONS.GAME.JUMP($scope.hero, $scope.hero.x - 1, $scope.hero.y);
            },
            JUMP_RIGHT: function () {
                if ($scope.hero.canJump)
                    $scope.ACTIONS.GAME.JUMP($scope.hero, $scope.hero.x + 1, $scope.hero.y);
            },
            JUMPING: function () {
                if ($scope.hero.canJump)
                    if ($scope.ACTIONS.PLAYER.POSITION()[0] !== "w")
                        eval(`$scope.ACTIONS.PLAYER.JUMP_${$scope.ACTIONS.PLAYER.POSITION().toUpperCase()}();`);
            },
            LIGH: function (time) {
                $scope.ACTIONS.GAME.FLASH("white", 1);
                if ($scope.ambient === "darkcave") {
                    $scope.ACTIONS.PLAYER.FILTER(2, 1, "#000");
                    $scope.ambient = "natural";
                    $scope.ACTIONS.AMBIENT.RUN();
                    $timeout(() => {
                        $scope.ACTIONS.GAME.PAUSE();
                        $scope.ambient = "darkcave";
                        $scope.ACTIONS.AMBIENT.RUN();
                        $scope.ACTIONS.PLAYER.CLEAR_FILTER();
                        $timeout(() => {
                            $scope.ACTIONS.GAME.RESUME();
                        }, 1000);
                    }, time * 1000)
                }
            },
            FILTER: function (light, alpha, color) {
                $scope.ACTIONS.GAME.FILTER($scope.hero, light, alpha, color);
            },
            CLEAR_FILTER: function () {
                $scope.ACTIONS.GAME.CLEAR_FILTER($scope.hero);
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
                        $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "WaterElemental", "up", function () {
                            $scope.transition = false;
                        });
                        $scope.ACTIONS.NPC.FILTER(name, 0.5, 1, "blue");
                    } else {
                        $scope.NPCS[name].watering = false;
                        if ($scope.NPCS[name].speed)
                            $scope.NPCS[name].speed = $scope.NPCS[name].base_speed;
                        $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "Show", undefined, function () {
                            $scope.transition = false;
                        });
                        $scope.ACTIONS.NPC.CLEAR_FILTER(name);
                    }
                }
            },
            FIREELEMENTAL: function (name) {
                if ($scope.NPCS[name].staticing) {
                    if (!$scope.transition) {
                        $scope.transition = true;
                        if ($scope.ACTIONS.NPC.POSITION(name) === "up") {
                            $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "teleport", undefined, function () {
                                $scope.ACTIONS.NPC.TELEPORT(name, $scope.NPCS[name].x, 0);
                                $scope.transition = false;
                            });
                        }

                        if ($scope.ACTIONS.NPC.POSITION(name) === "down") {
                            $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "teleport", undefined, function () {
                                $scope.ACTIONS.NPC.TELEPORT(name, $scope.NPCS[name].x, $scope.maps[$scope.FIRSTMAP].height - 1);
                                $scope.transition = false;
                            });
                        }

                        if ($scope.ACTIONS.NPC.POSITION(name) === "left") {
                            $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "teleport", undefined, function () {
                                $scope.ACTIONS.NPC.TELEPORT(name, 0, $scope.NPCS[name].y);
                                $scope.transition = false;
                            });
                        }

                        if ($scope.ACTIONS.NPC.POSITION(name) === "right") {
                            $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "teleport", undefined, function () {
                                $scope.ACTIONS.NPC.TELEPORT(name, $scope.maps[$scope.FIRSTMAP].width - 1, $scope.NPCS[name].y);
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
                    var oldposition = $scope.ACTIONS.NPC.POSITION(name);
                    $scope.ACTIONS.NPC.GET(name).body.gotoAndPlay("gire");
                    $timeout(() => {
                        if (!$scope.NPCS[name].watering) {
                            $scope.ACTIONS.NPC.FILTER(name, 0.5, 1, "red");
                            $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "FireElemental", "up", function () {
                                if ($scope.NPCS[name].speed)
                                    $scope.NPCS[name].speed = 30;

                                if (oldposition === "up") {
                                    $scope.ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x, 0);
                                }

                                if (oldposition === "down") {
                                    $scope.ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x, $scope.maps[$scope.FIRSTMAP].height - 1);
                                }

                                if (oldposition === "left") {
                                    $scope.ACTIONS.NPC.MOVE(name, 0, $scope.NPCS[name].y);
                                }

                                if (oldposition === "right") {
                                    $scope.ACTIONS.NPC.MOVE(name, $scope.maps[$scope.FIRSTMAP].width - 1, $scope.NPCS[name].y);
                                }

                                $timeout(() => {
                                    if ($scope.NPCS[name].speed)
                                        $scope.NPCS[name].speed = $scope.NPCS[name].base_speed;
                                    $scope.ACTIONS.NPC.CLEAR_FILTER(name);
                                    $scope.ACTIONS.NPC.GET(name).body.gotoAndPlay(oldposition);
                                    $scope.transition = false;
                                }, 1000);
                            });
                        } else {
                            $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "Humo");
                            $scope.ACTIONS.NPC.GET().body.gotoAndPlay(oldposition);
                            $scope.transition = false;
                        }

                    }, 1000);
                }
            },
            SCROLLTO: function (name, s_in, s_state, s_out, callback) {
                $scope.ACTIONS.GAME.SCROLLTO($scope.STAGE, $scope.NPCS[name], s_in, s_state, s_out, callback);
            },
            SHAKE: function (name, interval, distance, times, callback) {
                $scope.ACTIONS.GAME.SHAKE($scope.NPCS[name].body, interval, distance, times, callback);
                $scope.ACTIONS.GAME.SHAKE($scope.NPCS[name].shadow, interval, distance, times, callback);
            },
            REMOVE: function (name) {
                if ($scope.NPCS[name]) {
                    eval(` $scope.layer${$scope.NPCS[name].l}.removeChild($scope.NPCS[name].body)`);
                    eval(` $scope.layer${$scope.NPCS[name].l}.removeChild($scope.NPCS[name].shadow)`);
                    delete $scope.NPCS[name];
                    $scope.STAGE.update();
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
                $scope.ACTIONS.GAME.ALPHA($scope.NPCS[name], alpha, callback);
            },
            TELEPORT: async function (name, x, y, animation, callback) {
                $scope.ACTIONS.GAME.TELEPORT($scope.NPCS[name], x, y, undefined, animation, callback);
            },
            TELEPORT_PLAYER: async function (name, dir, mapname, animation, callback) {
                $scope.ACTIONS.GAME.TELEPORT_TO($scope.NPCS[name], $scope.hero, dir, mapname, animation, callback);
            },
            TELEPORT_OBJECT: async function (npc, name, dir, mapname, animation, callback) {
                $scope.ACTIONS.GAME.TELEPORT_TO($scope.NPCS[npc], $scope.OBJECTS[name], dir, mapname, animation, callback);
            },
            MOVE: function (name, x, y, callback, force) {
                $scope.ACTIONS.GAME.MOVE($scope.NPCS, name, x, y, callback, force);
            },
            MOVE_UP: function (name, callback) {
                if ($scope.NPCS[name])
                    $scope.ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x, $scope.NPCS[name].y - 1, callback);
            },
            MOVE_DOWN: function (name, callback) {
                if ($scope.NPCS[name])
                    $scope.ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x, $scope.NPCS[name].y + 1, callback);
            },
            MOVE_RIGHT: function (name, callback) {
                if ($scope.NPCS[name])
                    $scope.ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x + 1, $scope.NPCS[name].y, callback);
            },
            MOVE_LEFT: function (name, callback) {
                if ($scope.NPCS[name])
                    $scope.ACTIONS.NPC.MOVE(name, $scope.NPCS[name].x - 1, $scope.NPCS[name].y, callback);
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
                    $scope.ACTIONS.MESSAGE.BUBBLE($scope.NPCS[name].x, $scope.NPCS[name].y, message, time, callback);
                }
            },
            JUMP: function (name, x, y) {
                $scope.ACTIONS.GAME.JUMP($scope.NPCS[name], x, y);
            },
            JUMP_UP: function (name) {
                $scope.ACTIONS.GAME.JUMP($scope.NPCS[name], $scope.NPCS[name].x, $scope.NPCS[name].y - 1);
            },
            JUMP_DOWN: function (name) {
                $scope.ACTIONS.GAME.JUMP($scope.NPCS[name], $scope.NPCS[name].x, $scope.NPCS[name].y + 1);
            },
            JUMP_LEFT: function (name) {
                $scope.ACTIONS.GAME.JUMP($scope.NPCS[name], $scope.NPCS[name].x - 1, $scope.NPCS[name].y);
            },
            JUMP_RIGHT: function (name) {
                $scope.ACTIONS.GAME.JUMP($scope.NPCS[name], $scope.NPCS[name].x + 1, $scope.NPCS[name].y);
            },
            FILTER: function (name, light, alpha, color) {
                $scope.ACTIONS.GAME.FILTER($scope.NPCS[name], light, alpha, color);
            },
            CLEAR_FILTER: function (name) {
                $scope.ACTIONS.GAME.CLEAR_FILTER($scope.NPCS[name]);
            },
            LIGH: function (npc, time) {
                $scope.ACTIONS.GAME.FLASH("white", 1);
                if ($scope.ambient === "darkcave") {
                    $scope.ACTIONS.NPC.FILTER(npc, 2, 1, "#000");
                    $scope.ambient = "natural";
                    $scope.ACTIONS.AMBIENT.RUN();
                    $timeout(() => {
                        $scope.ACTIONS.GAME.PAUSE();
                        $scope.ambient = "darkcave";
                        $scope.ACTIONS.AMBIENT.RUN();
                        $scope.ACTIONS.NPC.CLEAR_FILTER(npc);
                        $timeout(() => {
                            $scope.ACTIONS.GAME.RESUME();
                        }, 1000);
                    }, time * 1000)
                }
            },
            FLY: function (name) {
                $scope.ACTIONS.GAME.FLY($scope.NPCS[name]);
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
                    $scope.ACTIONS.ANIMATION.PLAY_IN($scope.NPCS[name], "Hide", function () {

                    });

                    $scope.ACTIONS.NPC.ALPHA(name, 0.1);
                } else {
                    $scope.NPCS[name].hidden = false;
                    if ($scope.NPCS[name].speed)
                        $scope.NPCS[name].speed = $scope.NPCS[name].base_speed;
                    $scope.ACTIONS.ANIMATION.PLAY_IN($scope.NPCS[name], "Show", function () {

                    });
                    $scope.ACTIONS.NPC.ALPHA(name, 1);
                }
            },
            TELE: function (name) {
                if ($scope.ACTIONS.NPC.POSITION(name) === "up") {
                    $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "teleport", undefined, function () {
                        $scope.ACTIONS.NPC.TELEPORT(name, $scope.NPCS[name].x, 0);
                    });
                }

                if ($scope.ACTIONS.NPC.POSITION(name) === "down") {
                    $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "teleport", undefined, function () {
                        $scope.ACTIONS.NPC.TELEPORT(name, $scope.NPCS[name].x, $scope.maps[$scope.FIRSTMAP].height - 1);
                    });
                }

                if ($scope.ACTIONS.NPC.POSITION(name) === "left") {
                    $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "teleport", undefined, function () {
                        $scope.ACTIONS.NPC.TELEPORT(name, 0, $scope.NPCS[name].y);
                    });
                }

                if ($scope.ACTIONS.NPC.POSITION(name) === "right") {
                    $scope.ACTIONS.ANIMATION.PLAY_NPC(name, "teleport", undefined, function () {
                        $scope.ACTIONS.NPC.TELEPORT(name, $scope.maps[$scope.FIRSTMAP].width - 1, $scope.NPCS[name].y);
                    });
                }
            },
        },
        OBJECT: {
            SHAKE: function (name, interval, distance, times, callback) {
                $scope.ACTIONS.GAME.SHAKE($scope.OBJECTS[name].body, interval, distance, times, callback);
            },
            REMOVE: function (name) {
                if ($scope.OBJECTS[name]) {
                    eval(` $scope.layer${$scope.OBJECTS[name].l}.removeChild($scope.OBJECTS[name].body)`);
                    eval(` $scope.layer${$scope.OBJECTS[name].l}.removeChild($scope.OBJECTS[name].shadow)`);
                    delete $scope.OBJECTS[name];
                    $scope.STAGE.update();
                }
            },
            ALPHA: function (name, alpha, callback) {
                $scope.ACTIONS.GAME.ALPHA($scope.OBJECTS[name], alpha, callback);
            },
            TELEPORT: async function (name, x, y, animation, callback) {
                $scope.ACTIONS.GAME.TELEPORT($scope.OBJECTS[name], x, y, undefined, animation, callback);
            },
            TELEPORT_PLAYER: async function (name, dir, mapname, animation, callback) {
                $scope.ACTIONS.GAME.TELEPORT_TO($scope.OBJECTS[name], $scope.hero, dir, mapname, animation, callback);
            },
            TELEPORT_NPC: async function (name, npc, dir, mapname, animation, callback) {
                $scope.ACTIONS.GAME.TELEPORT_TO($scope.OBJECTS[name], $scope.NPCS[npc], dir, mapname, animation, callback);
            },
            GET: function (name) {
                return $scope.OBJECTS[name];
            },
            MOVE: function (name, x, y, callback) {
                $scope.ACTIONS.GAME.MOVE($scope.OBJECTS, name, x, y, callback);
            },
            MOVE_UP: function (name, callback) {
                $scope.ACTIONS.OBJECT.MOVE(name, $scope.OBJECTS[name].x, $scope.OBJECTS[name].y - 1, callback);
            },
            MOVE_DOWN: function (name, callback) {
                $scope.ACTIONS.OBJECT.MOVE(name, $scope.OBJECTS[name].x, $scope.OBJECTS[name].y + 1, callback);
            },
            MOVE_RIGHT: function (name, callback) {
                $scope.ACTIONS.OBJECT.MOVE(name, $scope.OBJECTS[name].x + 1, $scope.OBJECTS[name].y, callback);
            },
            MOVE_LEFT: function (name, callback) {
                $scope.ACTIONS.OBJECT.MOVE(name, $scope.OBJECTS[name].x - 1, $scope.OBJECTS[name].y, callback);
            },
            BUBBLE: function (name, message, time, callback) {
                if ($scope.OBJECTS[name]) {
                    $scope.ACTIONS.MESSAGE.BUBBLE($scope.OBJECTS[name].x, $scope.OBJECTS[name].y, message, time, callback);
                }
            },
            JUMP: function (name, x, y) {
                $scope.ACTIONS.GAME.JUMP($scope.OBJECTS[name], x, y);
            },
            JUMP_UP: function (name) {
                $scope.ACTIONS.GAME.JUMP($scope.OBJECTS[name], $scope.OBJECTS[name].x, $scope.OBJECTS[name].y - 1);
            },
            JUMP_DOWN: function (name) {
                $scope.ACTIONS.GAME.JUMP($scope.OBJECTS[name], $scope.OBJECTS[name].x, $scope.OBJECTS[name].y + 1);
            },
            JUMP_LEFT: function (name) {
                $scope.ACTIONS.GAME.JUMP($scope.OBJECTS[name], $scope.OBJECTS[name].x - 1, $scope.OBJECTS[name].y);
            },
            JUMP_RIGHT: function (name) {
                $scope.ACTIONS.GAME.JUMP($scope.OBJECTS[name], $scope.OBJECTS[name].x + 1, $scope.OBJECTS[name].y);
            },
            FILTER: function (name, light, alpha, color) {
                $scope.ACTIONS.GAME.FILTER($scope.OBJECTS[name], light, alpha, color);
            },
            CLEAR_FILTER: function (name) {
                $scope.ACTIONS.GAME.CLEAR_FILTER($scope.OBJECTS[name]);
            },
            ANIMATE: function (name, frames, interval, times, sound, callback) {
                var old = OSO($scope.ACTIONS.OBJECT.GET(name).body._animation.frames);
                var codes = [];
                for (var i = 0; i < frames.length * (times || 1); i++) {
                    codes.push(`$scope.ACTIONS.OBJECT.GET(name).body.gotoAndStop(${frames[i % frames.length]});`);
                }
                $scope.play(sound, $scope.SOUNDS.system);
                for (var t = 0; t < frames.length * (times || 1); t++) {
                    $timeout(() => {
                        eval(codes[0]);
                        codes.shift();
                    }, interval * t);
                }
                $timeout(() => {
                    $scope.ACTIONS.OBJECT.GET(name).body.gotoAndPlay("run");
                    if (callback)
                        callback()
                }, interval * ((frames.length * (times || 1)) + 1));
            },
            CHANGE_FRAMES: function (name, frames) {
                $scope.ACTIONS.OBJECT.GET(name).body._animation.frames = frames;
                $scope.ACTIONS.OBJECT.GET(name).body.gotoAndPlay("run");
            },
            DOOR: function (name, x, y, map, sound, direction) {
                if (!$scope.ACTIONS.GAME.ISPAUSE()) {
                    $scope.ACTIONS.GAME.PAUSE();
                    var openFrame = OSO($scope.ACTIONS.OBJECT.GET(name).event.object.animation);
                    if (openFrame.length === 1)
                        openFrame.push(openFrame[0] + 12);
                    if (openFrame.length === 2)
                        openFrame.push(openFrame[1] + 12);
                    if (openFrame.length === 3)
                        openFrame.push(openFrame[2] + 12);
                    $scope.ACTIONS.OBJECT.CHANGE_FRAMES(name, openFrame);
                    $scope.ACTIONS.SOUND.system(sound || "Open2");
                    $timeout(() => {
                        $scope.ACTIONS.PLAYER.TELEPORT(x, y, map, "", function () {
                            eval(`$scope.ACTIONS.PLAYER.${direction || 'UP'}();`);
                        });
                    }, 1000);
                }
            },
            DOORIN: function (name, x, y, sound) {
                if (!$scope.ACTIONS.GAME.ISPAUSE()) {
                    $scope.ACTIONS.GAME.PAUSE();
                    $scope.ACTIONS.GAME.BLOCK();
                    var openFrame = OSO($scope.ACTIONS.OBJECT.GET(name).event.object.animation);
                    if (openFrame.length === 1)
                        openFrame.push(openFrame[0] + 12);
                    if (openFrame.length === 2)
                        openFrame.push(openFrame[1] + 12);
                    if (openFrame.length === 3)
                        openFrame.push(openFrame[2] + 12);
                    $scope.ACTIONS.OBJECT.CHANGE_FRAMES(name, openFrame);
                    if (sound)
                        $scope.ACTIONS.SOUND.Sound(sound);
                    $timeout(() => {
                        $scope.ACTIONS.OBJECT.ORIGINAL_FRAMES(name);
                        $scope.ACTIONS.PLAYER.TELEPORT(x, y, undefined, "", function () {
                            $scope.ACTIONS.GAME.RESUME();
                        });
                    }, 2000);
                }
            },
            CHEST: function (name, sound, callback) {
                var openFrame = OSO($scope.ACTIONS.OBJECT.GET(name).event.object.animation);
                if (openFrame.length === 1)
                    openFrame.push(openFrame[0] + 12);
                if (openFrame.length === 2)
                    openFrame.push(openFrame[1] + 12);
                if (openFrame.length === 3)
                    openFrame.push(openFrame[2] + 12);
                $scope.ACTIONS.OBJECT.CHANGE_FRAMES(name, openFrame);
                $scope.ACTIONS.SOUND.system(sound || "Open5");
                $timeout(() => {
                    $scope.ACTIONS.OBJECT.ORIGINAL_FRAMES(name);
                    if (callback)
                        callback();
                }, 2000);


            },
            ORIGINAL_FRAMES: function (name) {
                $scope.ACTIONS.OBJECT.GET(name).body._animation.frames = $scope.ACTIONS.OBJECT.GET(name).event.object.animation;
            },
            DESTROY: function (name) {
                $scope.ACTIONS.ANIMATION.PLAY_OBJECT(name, "Break", undefined, function () {

                });
                $scope.ACTIONS.ANIMATION.PLAY_OBJECT(name, "AfterBreak", "UP", function () {
                    eval(` $scope.layer${$scope.OBJECTS[name].l}.removeChild($scope.OBJECTS[name].body);`);
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
                                eval(` $scope.layer${$scope.OBJECTS[NPC.name].l}.removeChild($scope.OBJECTS[NPC.name].body);`);
                                delete $scope.OBJECTS[NPC.name];
                            }
                        }
                    }
                }
                if (wasdestry) {
                    $scope.ACTIONS.ANIMATION.PLAY("FireElemental", x - 2, y - 4, function () {

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

                $scope.ACTIONS.ANIMATION.PLAY_OBJECT(name, "Move", undefined);
                if (moveer) {

                    eval(`$scope.ACTIONS.OBJECT.MOVE_${position.toUpperCase().replace("W", "").replace("DON", "DOWN")}(name);`);

                }
            }
        },
        MESSAGE: {
            CONFIG: {
                TIME: {MESSAGE: 60, NOTI: 2}
            },
            QUEUE: [],
            ADD: function (hero, message, callback) {
                if (Array.isArray(message))
                    message.forEach(d => {
                        $scope.messageQuee.push({hero: hero, message: LANGUAGE.t(d)});
                    });
                else
                    $scope.messageQuee.push({hero: hero, message: LANGUAGE.t(message)});
            },
            ADDPLAY: function (hero, message, time, callback) {
                $scope.ACTIONS.MESSAGE.ADD(hero, message);
                $scope.ACTIONS.MESSAGE.PLAY(time, callback);
            },
            CLEAR: function () {
                $scope.messageQuee = [];
            },
            PLAY: function (time, callback) {
                $scope.tradeCallback = callback;
                if ($scope.messageQuee.length > 0) {
                    $scope.ACTIONS.GAME.PAUSE();
                    var item = OSO($scope.messageQuee[0]);
                    $scope.messageQuee.shift();
                    $scope.dialogText = $scope.ACTIONS.MESSAGE.FORMULATE(item.message) || "...";

                    if (item.hero.isNPC)
                        $scope.dialogHero = $scope.NPCS[item.hero];
                    else
                        $scope.dialogHero = {name: item.hero, version: new Date().getTime()};

                    $scope.$evalAsync();
                    $("#texts").show(200);
                    $scope.play("Talk", $scope.SOUNDS.system);
                    $scope.$evalAsync();
                    $scope.dialogTiming = $timeout(() => {
                        $("#texts").hide(200);
                        if ($scope.messageQuee.length > 0)
                            $scope.ACTIONS.MESSAGE.PLAY(time, $scope.tradeCallback);
                        else {
                            $scope.ACTIONS.GAME.RESUME();
                            if ($scope.tradeCallback)
                                $scope.tradeCallback();
                        }
                        $scope.$evalAsync();
                    }, time || ($scope.ACTIONS.MESSAGE.CONFIG.TIME.MESSAGE * 1000));
                } else {
                    $scope.ACTIONS.GAME.RESUME();
                    $scope.ACTIONS.MESSAGE.HIDE();
                    if ($scope.tradeCallback)
                        $scope.tradeCallback();
                }
            },
            STATIC: function (npc, messages, callback) {
                var begin = `$scope.ACTIONS.MESSAGE.CHOICE("${npc}","@MESSAGE",0,() => { `;
                var end = ` });`;
                var codes = "";
                for (var message of messages)
                    codes += begin.replace("@MESSAGE", message);
                codes += `$scope.ACTIONS.GAME.RESUME(); if(callback) callback()`;
                for (var message of messages)
                    codes += end;
                eval(codes);
            },
            CHOICE: function (npc, message, buttons, callback) {
                $scope.ACTIONS.GAME.PAUSE();
                buttons = (buttons || [{
                    text: "OK", click: function () {
                        $scope.dialogText = undefined;
                        if (callback)
                            callback();
                    }
                }]);
                for (var i in buttons) {
                    buttons[i].text = $scope.LAN.t(buttons[i].text);
                }
                //{text:'',icon:26,image:''}
                $scope.dialogButtons = buttons;
                $scope.dialogText = $scope.ACTIONS.MESSAGE.FORMULATE($scope.LAN.t(message)) || "...";
                $scope.dialogHero = $scope.NPCS[npc];

                if ($scope.NPCS[npc])
                    $scope.dialogHero = $scope.NPCS[npc];
                else
                    $scope.dialogHero = {name: npc, version: new Date().getTime()};
                $scope.play("Talk", $scope.SOUNDS.system);
                $scope.$evalAsync();
            },
            HIDE: function () {
                $scope.ACTIONS.GAME.RESUME();
                $scope.dialogText = undefined;
                $scope.dialogButtons = [{
                    text: "OK", click: function () {
                        $scope.ACTIONS.MESSAGE.REPLAY(0, $scope.tradeCallback);
                    }
                }];
                $scope.messageQuee = [];
                $scope.$evalAsync();
            },
            FORMULATE: function (text) {
                var traductor = {
                    "$amigo": capitalize(`${$scope.ACTIONS.PLAYER.GET().name}`)
                };
                var newtext = text;
                for (var i in traductor) {
                    newtext = newtext.split(i).join(traductor[i]);
                }
                return newtext;
            },
            REPLAY: function (time, callback) {
                clearInterval($scope.dialogTiming);
                $scope.ACTIONS.MESSAGE.PLAY(time, callback);
                $scope.$evalAsync();
            },
            NOTI: function (message, time, callback) {
                $scope.notificationText = $scope.ACTIONS.MESSAGE.FORMULATE(LANGUAGE.t(message)) || "...";
                $scope.$evalAsync();
                $("#notify").show();
                $timeout(() => {
                    $("#notify").hide();
                    if (callback)
                        callback();
                }, time || ($scope.ACTIONS.MESSAGE.CONFIG.TIME.NOTI * 1000));
            },
            BUBBLE: function (x, y, message, time, callback) {
                if ($scope.bubbleTimeOut)
                    clearInterval($scope.bubbleTimeOut);
                $scope.bubbleText = $scope.ACTIONS.MESSAGE.FORMULATE(LANGUAGE.t(message)) || "...";
                //if (!$scope.$$phase) $scope.$digest();
                $scope.bubble.x = ((x * $scope.baseWidth) + 8);
                $scope.bubble.y = ((y - 1) * $scope.baseHeight) + $scope.midHeight;
                $scope.bubble.visible = true;
                $scope.play("Talk", $scope.SOUNDS.system);
                $scope.bubbleTimeOut = $timeout(() => {
                    $scope.bubble.visible = false;
                    if (callback)
                        callback();
                }, (time * 1000) || ($scope.ACTIONS.MESSAGE.CONFIG.TIME.NOTI * 1000));
            },
        },
        LOAD: {
            ADD: function (resources, callback) {
                //ACTIONS.GAME.PAUSE();
                var exists = true;
                var validresources = [];
                for (var url of resources) {
                    var urlversion = url;
                    if (!$scope.getResource(urlversion) && !$scope.existSound(urlversion) && validresources.indexOf(urlversion) === -1)
                        validresources.push(urlversion);
                }
                if (validresources.length === 0) {
                    $scope.ACTIONS.GAME.RESUME();
                    if (callback)
                        callback();
                    return;
                }
                var temp = new createjs.LoadQueue(false);
                temp.installPlugin(createjs.Sound);
                var loadJson = [];
                var newR = false;
                for (var url of validresources) {
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
                            if (loaded.src.indexOf($scope.DOMAINRESOURCE) !== -1)
                                console.logorange(loaded.src);
                            $scope.addResource(loaded.src, temp.getResult(loaded.id));
                        }
                        $scope.ACTIONS.GAME.RESUME();
                        if (callback)
                            callback();
                    }, this);
                    temp.load();
                } else {
                    $scope.ACTIONS.GAME.RESUME();
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
                    $scope.ACTIONS.GAME.PAUSE();
                var animation = OSO($scope.animations[name]);
                if (!animation)
                    animation = OSO($scope.animations["GG"]);
                $scope.ACTIONS.LOAD.ADD([animation.file, $scope.toDO(animation.sound)], function () {
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
                    $scope.layerAnimation.addChild(sprite);
                    if (!loop) {
                        $timeout(() => {
                            $scope.layerAnimation.removeChild(sprite);
                        }, (animation.frames.length / parseInt(animation.framerate)) * 1000);
                        $timeout(() => {
                            if (callback)
                                callback();
                        }, (animation.frames.length / parseInt(animation.framerate)) + $scope.frameSetSave);

                    } else {
                        if (!nopause)
                            $scope.ACTIONS.GAME.RESUME();
                    }
                    sprite.gotoAndPlay("run");
                    $scope.play($scope.toDO(animation.sound), $scope.SOUNDS.system);
                });
            },
            PLAYNATURAL: function (name, x, y, callback, loop, nopause, light, alpha, color, scale) {
                if (!nopause)
                    $scope.ACTIONS.GAME.PAUSE();
                var animation = OSO($scope.animations[name]);
                if (!animation)
                    animation = OSO($scope.animations["GG"]);
                $scope.ACTIONS.LOAD.ADD([animation.file, $scope.toDO(animation.sound)], function () {
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

                    $scope.layerAnimation.addChild(sprite);
                    if (!loop) {
                        $timeout(() => {
                            $scope.layerAnimation.removeChild(sprite);
                        }, (animation.frames.length / parseInt(animation.framerate)) * 1000);
                        $timeout(() => {
                            if (callback)
                                callback();
                        }, (animation.frames.length / parseInt(animation.framerate)) + $scope.frameSetSave);
                    } else {
                        // if (!nopause)
                        //    $scope.ACTIONS.GAME.RESUME();
                        if (loop !== true) {
                            sprite.name = loop;
                            if (loop.indexOf('stop') !== -1) {
                                return 0;
                            }
                        }
                    }
                    sprite.gotoAndPlay("run");
                    $scope.play($scope.toDO(animation.sound), $scope.SOUNDS.system);
                });
            },
            THROW: function (name, x, y, x2, y2, time, callback, nopause, light, alpha, color, scale) {
                if (!nopause)
                    $scope.ACTIONS.GAME.PAUSE();
                var animation = OSO($scope.animations[name]);
                if (!animation)
                    animation = OSO($scope.animations["GG"]);
                $scope.ACTIONS.LOAD.ADD([animation.file, $scope.toDO(animation.sound)], function () {
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

                    $scope.layerAnimation.addChild(sprite);

                    var thetime = time === true ? (animation.frames.length / parseInt(animation.framerate)) * 1000 : time;
                    createjs.Tween.get(sprite).to({
                        x: ((x2 * $scope.baseWidth) - (frameW / 2)) + $scope.midWidth,
                        y: ((y2 * $scope.baseHeight) - (frameH / 2)) + $scope.midHeight
                    }, thetime).call(function () {
                        $scope.layerAnimation.removeChild(sprite);
                        // if (!nopause)
                        //    $scope.ACTIONS.GAME.RESUME();
                        if (callback)
                            callback();
                    });
                    sprite.gotoAndPlay("run");
                    $scope.play($scope.toDO(animation.sound), $scope.SOUNDS.system);
                });
            },
            THROWNATURAL: function (name, x, y, x2, y2, time, callback, nopause, light, alpha, color, scale) {
                if (!nopause)
                    $scope.ACTIONS.GAME.PAUSE();
                var animation = OSO($scope.animations[name]);
                if (!animation)
                    animation = OSO($scope.animations["GG"]);
                $scope.ACTIONS.LOAD.ADD([animation.file, $scope.toDO(animation.sound)], function () {
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
                    $scope.layerAnimation.addChild(sprite);

                    var thetime = time === true ? (animation.frames.length / parseInt(animation.framerate)) * 1000 : time;
                    createjs.Tween.get(sprite).to({
                        x: x2 - (frameW / 2),
                        y: y2 - (frameH / 2)
                    }, thetime).call(function () {
                        $scope.layerAnimation.removeChild(sprite);
                        // if (!nopause)
                        //    $scope.ACTIONS.GAME.RESUME();
                        if (callback)
                            callback();
                    });
                    sprite.gotoAndPlay("run");
                    $scope.play($scope.toDO(animation.sound), $scope.SOUNDS.system);
                });
            },
            THROW_FROM_TO: function (name, objectFrom, ObjectTo, time, callback, nopause, light, alpha, color, scale) {
                $scope.ACTIONS.ANIMATION.THROW(name, objectFrom.x, objectFrom.y, ObjectTo.x, ObjectTo.y, time, callback, nopause, light, alpha, color, scale);
            },
            THROW_FROM_TO_NATURAL: function (name, objectFrom, ObjectTo, time, callback, nopause, light, alpha, color, scale) {
                $scope.ACTIONS.ANIMATION.THROWNATURAL(name, objectFrom.x, objectFrom.y, ObjectTo.x, ObjectTo.y, time, callback, nopause, light, alpha, color, scale);
            },
            PLAY_IN: function (object, animation, callback, loop, nopause, light, alpha, color, scale) {
                $scope.ACTIONS.ANIMATION.PLAY(animation, object.x, object.y, callback, loop, nopause, light, alpha, color, scale);
            },
            PLAY_UP: function (object, animation, callback, loop, nopause, light, alpha, color, scale) {
                $scope.ACTIONS.ANIMATION.PLAY(animation, object.x, object.y - 1, callback, loop, nopause, light, alpha, color, scale);
            },
            PLAY_DOWN: function (object, animation, callback, loop, nopause, light, alpha, color, scale) {
                $scope.ACTIONS.ANIMATION.PLAY(animation, object.x, object.y + 1, callback, loop, nopause, light, alpha, color, scale);
            },
            PLAY_RIGHT: function (object, animation, callback, loop, nopause, light, alpha, color, scale) {
                $scope.ACTIONS.ANIMATION.PLAY(animation, object.x + 1, object.y, callback, loop, nopause, light, alpha, color, scale);
            },
            PLAY_LEFT: function (object, animation, callback, loop, nopause, light, alpha, color, scale) {
                $scope.ACTIONS.ANIMATION.PLAY(animation, object.x - 1, object.y, callback, loop, nopause, light, alpha, color, scale);
            },
            PLAY_PLAYER: function (animation, direction, callback, loop, nopause, light, alpha, color, scale) {
                eval(`$scope.ACTIONS.ANIMATION.PLAY_${(direction || "IN").toUpperCase()}($scope.hero, animation, callback,loop,nopause, light, alpha, color, scale)`);
            },
            PLAY_NPC: function (name, animation, direction, callback, loop, nopause, light, alpha, color, scale) {
                eval(`$scope.ACTIONS.ANIMATION.PLAY_${(direction || "IN").toUpperCase()}($scope.NPCS[name], animation, callback,loop,nopause, light, alpha, color, scale)`);
            },
            PLAY_OBJECT: function (name, animation, direction, callback, loop, nopause, light, alpha, color, scale) {
                eval(`$scope.ACTIONS.ANIMATION.PLAY_${(direction || "IN").toUpperCase()}($scope.OBJECTS[name], animation, callback,loop,nopause, light, alpha, color, scale)`);
            },
        },
        SOUND: {
            PLAY: function (url, config, callback) {
                $scope.ACTIONS.GAME.PAUSE();
                $scope.ACTIONS.LOAD.ADD([url], function () {
                    $scope.play(url, config);
                    if (callback)
                        callback();
                });
            },
            STOPALL: function () {
                createjs.Sound.stop();
            },
            system: function (name, callback, time) {
                $scope.SoundSystemVar = `../resources/audio/system/${name}.ogg`;
                $scope.ACTIONS.SOUND.PLAY($scope.SoundSystemVar, $scope.SOUNDS.system);
                if (callback) {
                    $timeout(() => {
                        $scope.ACTIONS.SOUND.BGM_RESTORE();
                        if (callback)
                            callback();
                    }, time * 1000);
                }
            },
            Sound: function (name, callback) {
                $scope.SoundVar = `../resources/audio/Sound/${name}.ogg`;
                $scope.ACTIONS.SOUND.PLAY($scope.SoundVar, $scope.SOUNDS.system, callback);
            },
            pokemon: function (name, callback) {
                $scope.ACTIONS.SOUND.STOPALL();
                $scope.pokemonMusic = `../resources/audio/pokemon/${name}.ogg`;
                $scope.ACTIONS.SOUND.PLAY($scope.pokemonMusic, $scope.SOUNDS.system, callback);
            },
            Enviroment: function (name, time, callback) {
                $scope.ACTIONS.SOUND.STOPALL();
                $scope.Enviroment = `../resources/audio/Enviroment/${name}.ogg`;
                $scope.ACTIONS.SOUND.PLAY($scope.Enviroment, $scope.SOUNDS.system);
                if (callback) {
                    $timeout(() => {
                        $scope.ACTIONS.SOUND.BGM_RESTORE();
                        if (callback)
                            callback();
                    }, (time + 1) * 1000);
                }
            },
            BattleMusic: function (name, callback) {
                $scope.ACTIONS.SOUND.STOPALL();
                if (name) {
                    $scope.battleMusic = `../resources/audio/BattleMusic/${name}.ogg`;
                    $scope.ACTIONS.SOUND.PLAY($scope.battleMusic, $scope.SOUNDS.battle, callback);
                } else {
                    if ($scope.maps[$scope.FIRSTMAP].battleback.music) {
                        $scope.stop($scope.battleMusic);
                        $scope.battleMusic = false;
                        $scope.play("battle" + $scope.FIRSTMAP, $scope.SOUNDS.bgs);
                    }

                }
            },
            BGS_RESTORE: function () {
                $scope.play("bgs" + $scope.FIRSTMAP, $scope.SOUNDS.bgs);
            },
            BGM: function (name, callback) {
                $scope.stop("bgm" + $scope.FIRSTMAP);
                $scope.chagedBGM = `../resources/audio/BackGround/${name}.ogg`;
                $scope.ACTIONS.SOUND.PLAY($scope.chagedBGM, $scope.SOUNDS.bgm, callback);
            },
            BGM_RESTORE: function () {
                $scope.play("bgm" + $scope.FIRSTMAP, $scope.SOUNDS.bgm);
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
            BATTLESTARTQUEST: function (trainer, text, wining, losing) {
                $scope.ACTIONS.MESSAGE.CHOICE(trainer, "Quieres algo más?",
                    [
                        {
                            text: "Volver a Pelear", click: function () {
                                $scope.ACTIONS.POKEMON.BATTLESTART(trainer, text, wining, losing);
                            }
                        },
                        {
                            text: "Adiós", click: function () {
                                $scope.ACTIONS.GAME.RESUME();
                            }
                        },
                    ], function () {

                    });
            },
            BATTLESTART: function (trainer, text, wining, losing) {
                $scope.ACTIONS.GAME.PAUSE();
                $scope.ACTIONS.GAME.BLOCK();
                var revenge = false;
                if (text === 'revenge') {
                    revenge = true;
                    text = undefined;
                }
                $scope.CURRENTTRAINER = OSO($scope.players[trainer]);
                $scope.CURRENTTRAINER.texts = $scope.personalities[$scope.CURRENTTRAINER.personality];
                if ($scope.CURRENTTRAINER.biography) {
                    $scope.CURRENTTRAINER.texts = JSON.parse($scope.CURRENTTRAINER.biography);
                    for (var termino in $scope.CURRENTTRAINER.texts) {
                        for (var textC in $scope.CURRENTTRAINER.texts[termino]) {
                            $scope.CURRENTTRAINER.texts[termino][textC] = LANGUAGE.t($scope.CURRENTTRAINER.texts[termino][textC]);
                        }
                    }
                }
                if ($scope.CURRENTTRAINER.objective)
                    $scope.CURRENTTRAINER.predeterminedTeam = JSON.parse($scope.CURRENTTRAINER.objective);
                if (wining) {
                    $scope.CURRENTTRAINER.win = wining;
                } else {
                    if (!$scope.CURRENTTRAINER.win) {
                        $scope.CURRENTTRAINER.win = function () {
                            $scope.ACTIONS.PROGRESS.SETNATURAL("trainer" + trainer);
                        }
                    } else {
                        $scope.CURRENTTRAINER.win += `$scope.ACTIONS.PROGRESS.SETNATURAL("trainer" + "${trainer}");`;
                    }
                }
                if (losing) {
                    $scope.CURRENTTRAINER.lose = losing;
                } else {
                    if (!$scope.CURRENTTRAINER.lose)
                        $scope.CURRENTTRAINER.lose = undefined;
                }
                var textFinal = text || randomArray($scope.CURRENTTRAINER.texts.intro);
                $scope.ACTIONS.GAME.PAUSE();
                $scope.ACTIONS.GAME.BLOCK();
                $scope.ACTIONS.MESSAGE.CHOICE(trainer, $scope.personCheck(textFinal), [{
                    text: 'Ok', click: function () {
                        $scope.ACTIONS.MESSAGE.HIDE();
                        $scope.POKEMONBATTLE.LAUNCH($scope, SESSION.tier, trainer, $scope.CURRENTTRAINER.win, $scope.CURRENTTRAINER.lose, revenge);
                    }
                }]);
            },
            BATTLEONLINE: function (friend, rating) {
                $scope.HOME_.GETFRIEND(friend).then(function (data) {
                    var loadJson = [];
                    $scope.CURRENTONLINERATING = rating;
                    $scope.CURRENTONLINE = DOMAIN + `data/players/${friend}/images/sv.png?v=${new Date().getTime()}`;
                    $scope.CURRENTONLINEDATA = data;
                    loadJson.push($scope.CURRENTONLINE);
                    $scope.ACTIONS.LOAD.ADD(loadJson, function () {
                        $scope.ACTIONS.GAME.MENUTOGGLE();
                        $scope.POKEMONBATTLE.LAUNCH($scope, SESSION.tier);
                    });
                });
            },
            BATTLEWILD: function (win, lose) {
                $scope.POKEMONBATTLE.LAUNCH($scope, SESSION.tier, undefined, win, lose);
            },
            BATTLEEND: function () {
                if ($scope.BATTLEOBJS.allowtrap !== undefined)
                    $scope.POKEMONBATTLE.END($scope, "left");
            },
            POKECENTER: function () {
                $scope.ACTIONS.GAME.BLOCK();
                $scope.ACTIONS.SOUND.STOPALL();
                $scope.ACTIONS.GAME.SCREEN(0.5, "black", 1, function () {
                    $scope.ACTIONS.SOUND.system("recovery");
                    for (var pok of $scope.session.pokemons) {
                        $scope.POKEMONBATTLE.CLEARSTATSEND(pok);
                        pok.battle.stats.hp = 0;
                        pok.battle.status = undefined;
                        pok.battle.statusTurn = 0;
                    }
                    $timeout(() => {
                        $scope.ACTIONS.GAME.SCREENOFF(0.5);
                        $scope.ACTIONS.GAME.UNBLOCK();
                        $scope.ACTIONS.SOUND.BGM_RESTORE();
                    }, 4000);
                    $scope.ACTIONS.GAME.SAVE(function () {
                    });
                });
            },
            GET: function (index) {
                return $scope.session.pokemons[index];
            },
            LIVES: function () {
                var lives = [];
                for (var pok in $scope.session.pokemons)
                    if ($scope.PKM.hp($scope.session.pokemons[pok]) > 0)
                        lives.push(pok);
                return lives;
            }

        },
        UNIT: {
            TEST: function () {
                return $scope;
            },
            RUN: function (code) {
                return eval(code);
            },
            NEXT: function () {
                $scope.POKEMONBATTLE.TARGETTEST($scope, $scope.GLOBALINDEXTEST);
            },
            FRIEND: function (index) {
                $scope.POKEMONBATTLE.FRIENDTEST($scope, index);
            },
            PKM: function () {
                return $scope.PKM;
            },
            BATTLEOBJS: function () {
                return $scope.BATTLEOBJS;
            },
            TESTMOVE: function () {
                $scope.PKM.friend().moves =
                    [
                        $scope.APIS.MOVES[$scope.ROTATEMOVE],
                        $scope.APIS.MOVES[$scope.ROTATEMOVE + 1],
                        $scope.APIS.MOVES[$scope.ROTATEMOVE + 2],
                        $scope.APIS.MOVES[$scope.ROTATEMOVE + 3],
                    ];
                console.log($scope.PKM.friend().moves);
                console.log($scope.ROTATEMOVE);
                $scope.ROTATEMOVE += 4;
            },
            CURE: function () {
                $scope.POKEMONBATTLE.CLEARSTATS($scope.PKM.friend());
                $scope.PKM.friend().battle.stats.hp = 0;
                $scope.PKM.friend().battle.status = undefined;
                $scope.PKM.friend().battle.statusTurn = 0;

                $scope.POKEMONBATTLE.CLEARSTATS($scope.PKM.target());
                $scope.PKM.target().battle.stats.hp = 0;
                $scope.PKM.target().battle.status = undefined;
                $scope.PKM.target().battle.statusTurn = 0;
            },
            PONER: function (name) {
                var prepokemon = $scope.POKEMOMFIND.GENERATE(name.toLowerCase());
                $scope.ACTIONS.LOAD.ADD([prepokemon.imageUrl, prepokemon.cryUrl], function () {
                    $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX] = prepokemon;
                    $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX].battle = OSO($scope.BATTLEDEFAULT);
                    $scope.POKEMONBATTLE.CHANGETARGET($scope, $scope.BATTLEOBJS.TARGETINDEX);
                });
            },
            VACIARTEAM: function () {
                $scope.BATTLEOBJS.TARGETS.splice(1, $scope.BATTLEOBJS.TARGETS.length - 1);
            },
            T: function () {
                $scope.ACTIONS.POKEMON.BATTLESTART("Silvano Real");
            }
        },
        PROGRESS: {
            SET: function (data) {
                if (!$scope.session.progress)
                    $scope.session.progress = [];
                if (Array.isArray(data)) {
                    for (var da in data)
                        if (!$scope.ACTIONS.PROGRESS.GET(da))
                            $scope.session.progress.push(da);
                    $scope.ACTIONS.GAME.SAVE();
                } else if (!$scope.ACTIONS.PROGRESS.GET(data)) {
                    $scope.session.progress.push($scope.FIRSTMAP + data);
                    $scope.ACTIONS.GAME.SAVE();
                }
            },
            SETNATURAL: function (data) {
                if (!$scope.session.progress)
                    $scope.session.progress = [];
                if (Array.isArray(data)) {
                    for (var da in data)
                        if (!$scope.ACTIONS.PROGRESS.GETNATURAL(da))
                            $scope.session.progress.push(da);
                    $scope.ACTIONS.GAME.SAVE();
                } else if (!$scope.ACTIONS.PROGRESS.GETNATURAL(data)) {
                    $scope.session.progress.push(data);
                    $scope.ACTIONS.GAME.SAVE();
                }
            },
            /**
             * @return {boolean}
             */
            GET: function (data) {
                if (!$scope.session.progress)
                    $scope.session.progress = [];
                return $scope.session.progress.indexOf($scope.FIRSTMAP + data) !== -1;
            },
            REQUERIMIENTS: function (datas, natural) {
                for (var data of datas) {
                    if ($scope.session.progress.indexOf((natural ? "" : $scope.FIRSTMAP) + data) === -1)
                        return false;
                }
                return true;
            },
            ATLEAST: function (datas, natural) {
                for (var data of datas) {
                    if ($scope.session.progress.indexOf((natural ? "" : $scope.FIRSTMAP) + data) !== -1)
                        return true;
                }
                return false;
            },
            /**
             * @return {boolean}
             */
            GETNATURAL: function (data) {
                if (!$scope.session.progress)
                    $scope.session.progress = [];
                return $scope.session.progress.indexOf(data) !== -1;
            },
            DELETE: function (data) {
                if (!$scope.session.progress)
                    $scope.session.progress = [];
                if ($scope.ACTIONS.PROGRESS.GET(data)) {
                    $scope.session.progress.slice($scope.session.progress.indexOf($scope.FIRSTMAP + data), 1);
                    $scope.ACTIONS.GAME.SAVE();
                }
            },
            SETLOGRO: function (logro, can) {
                if ($scope.session.logros.indexOf(logro) !== -1)
                    return;
                $scope.session.logros.push(logro);
                if (can) {
                    $scope.session[can] = true;
                    $scope.hero[can] = true;
                }
                $scope.ACTIONS.GAME.SAVE(function () {
                    for (var skille of $scope.session.logros) {
                        if ($scope.LOGROS[skille]) {
                            $scope.skills.push($scope.LOGROS[skille]);
                        }
                    }
                    $scope.ACTIONS.SOUND.system("Item");
                    swal(LANGUAGE.t(`Has aprendido `) + LANGUAGE.t(logro) + LANGUAGE.t("!, puedes encontrar la descripción en menu seguido de habilidades"));
                })
            },
            SETMEDAL: function (logro, range) {
                if ($scope.session["medal_" + logro]) {
                    if ($scope.session["medal_" + logro] !== range) {
                        $scope.session["medal_" + logro] = range;
                        var tierTist = 0;
                        for (var medal of $scope.medals1) {
                            if ($scope.session["medal_" + medal.type])
                                tierTist++
                        }
                        for (var medal of $scope.medals2) {
                            if ($scope.session["medal_" + medal.type])
                                tierTist++
                        }
                        tierTist = tierTist > 14 ? 14 : tierTist;
                        $scope.session.tier = $scope.POKEMON.categoriesarray[tierTist];
                        $scope.ACTIONS.GAME.SAVE(function () {
                            $scope.ACTIONS.SOUND.system("medal");
                            swal(LANGUAGE.t(`Has cambiado de nivel tu medalla `) + LANGUAGE.t(logro) + LANGUAGE.t("!, podrás verla en menu seguido de tu perfil"));
                        });
                    }
                    return;
                }
                $scope.session["medal_" + logro] = range;
                var tierTist = 0;
                for (var medal of $scope.medals1) {
                    if ($scope.session["medal_" + medal.type])
                        tierTist++
                }
                for (var medal of $scope.medals2) {
                    if ($scope.session["medal_" + medal.type])
                        tierTist++
                }
                tierTist = tierTist > 14 ? 14 : tierTist;
                $scope.session.tier = $scope.POKEMON.categoriesarray[tierTist];
                $scope.ACTIONS.GAME.SAVE(function () {
                    $scope.ACTIONS.SOUND.system("medal");
                    swal(LANGUAGE.t(`Has obtenido la medalla `) + LANGUAGE.t(logro) + LANGUAGE.t("!, podrás verla en menu seguido de tu perfil"));
                })
            }
        }
    };
    $scope.GLOBALINDEXTEST = 0;
    $scope.ROTATEMOVE = 0;


    // Listeners
    $scope.PKM = {};
    $scope.PKM.maper = false;
    $scope.PKM.evolutioning = false;
    $scope.ANIMATESTEPS = function (time) {
        return {
            duration: time || 1000,
            easing: 'swing',
            queue: false,
            step: function () {
                for (var prob in this) {
                    if (prob.indexOf("__") !== -1) {
                        $("#evolutionPokemon").css({
                            "-webkit-filter": `${prob.replace("__", "")}(${this[prob]}px)`,
                            "filter": `${prob.replace("__", "")}(${this[prob]}px)`
                        });
                    }
                    if (prob.indexOf("___") !== -1) {
                        $("#evolutionPokemon").css({
                            "-webkit-filter": `${prob.replace("___", "")}(${this[prob]})`,
                            "filter": `${prob.replace("___", "")}(${this[prob]})`
                        });
                    }
                    if (prob.indexOf("____") !== -1) {
                        $("#evolutionPokemon").css({
                            "-webkit-transform": `${prob.replace("____", "")}(${this[prob]})`,
                            "transform": `${prob.replace("____", "")}(${this[prob]})`
                        });
                    }
                }
            }
        };
    };
    $scope.EvolAnimate = function (pokemon, evo, callback) {
        var time = 22;
        $("#evolutionPokemon").animate({___brightness: 1}, $scope.ANIMATESTEPS(10));
        $("#evolutionPokemon").animate({____scale: 1}, $scope.ANIMATESTEPS(10));
        $("#evolutionPokemon").animate({___brightness: 1}, $scope.ANIMATESTEPS(10));
        $("#evolutionPokemon").animate({____scale: 1}, $scope.ANIMATESTEPS(10));
        $timeout(() => {
            $("#evolutionPokemon").animate({___brightness: 6}, $scope.ANIMATESTEPS((time / 2) * 1000));
            $("#evolutionPokemon").animate({____scale: 2}, $scope.ANIMATESTEPS((time / 2) * 1000));
        }, 1000);
        $timeout(() => {
            $("#evolutionPokemon").fadeOut("slow");
            $timeout(() => {
                $scope.session.pokemons[pokemon] = $scope.POKEMOMFIND.EVOLUTION($scope.session.pokemons[pokemon], evo);
                $scope.PKM.evolutioning = $scope.session.pokemons[pokemon].imageUrl;
                //if (!$scope.$$phase) $scope.$digest();
                $("#evolutionPokemon").fadeIn("slow");
                $("#evolutionPokemon").animate({___brightness: 1}, $scope.ANIMATESTEPS((time / 2) * 1000));
                $("#evolutionPokemon").animate({____scale: 1}, $scope.ANIMATESTEPS((time / 2) * 1000));
            }, 500);

        }, ((time / 2) + 1) * 1000);

        $timeout(() => {
            callback();
        }, ((time) + 1) * 1000);
    };
    $scope.PKM.evolcheck = function (lvl, force) {
        var index = 0;
        var addicional = 0;
        if (lvl !== 'salvaje') {
            addicional = $scope.POKEMON.trainersRange[lvl || "noob"].reduce(function (a, b) {
                return a + b;
            }, 0);
        }
        var tierIndex = $scope.POKEMON.categoriesarray.indexOf($scope.session.tier) + 1;
        addicional += tierIndex;
        for (var pokemon of $scope.session.pokemons) {
            var status = $scope.POKEMOMFIND.EVOLPROB(pokemon.name);
            var select = getRandomInt(100);
            var select2 = getRandomInt(100) - 15;
            if (lvl === 'salvaje') {
                status.prob = 1;
            } else {
                status.prob += addicional;
            }
            var check = (select < status.prob) && (select2 < status.prob);
            console.logblue(`add:${addicional},tier:${tierIndex} === ${pokemon.name} trying ${status.prob}:${select}&${select2} = ${check}`);
            if (status.evo) {
                if (check || force) {
                    $scope.ACTIONS.SOUND.STOPALL();
                    $scope.ACTIONS.SOUND.PLAY($scope.session.pokemons[index].cryUrl, $scope.SOUNDS.system);
                    $scope.PKM.evoltext = `${pokemon.name} esta evolucionando a ${status.evo}!`;
                    $scope.PKM.evolutioning = pokemon.imageUrl;
                    //if (!$scope.$$phase) $scope.$digest();
                    $timeout(() => {
                        $scope.play("EvolutionSound", $scope.SOUNDS.system);
                        $scope.EvolAnimate(index, status.evo, function () {
                            $scope.ACTIONS.SOUND.STOPALL();
                            $scope.ACTIONS.SOUND.PLAY($scope.session.pokemons[index].cryUrl, $scope.SOUNDS.system);
                            $timeout(() => {
                                $scope.play("Victory", $scope.SOUNDS.system);
                                $timeout(() => {
                                    $scope.ACTIONS.SOUND.BGM_RESTORE();
                                    $scope.ACTIONS.SOUND.BGS_RESTORE();
                                    $scope.PKM.evolutioning = undefined;
                                }, 7000);
                                $scope.ACTIONS.GAME.SAVE(function () {
                                });
                            });
                        });
                    }, 1000);
                    break;
                }
            }
            if (lvl === 'salvaje') {
                break;
            }
            index++;
        }
    };
    $scope.PKM.hpc = 7;
    $scope.PKM.statCalc = 10;
    $scope.PKM.statlimit = 4;
    $scope.PKM.mainMenu = false;
    $scope.PKM.menu = false;
    $scope.lastAssault = "";
    $scope.PKM.Assault = function () {
        if (!$scope.hero.hidden)
            if (`${$scope.hero.x};${$scope.hero.y}` !== $scope.lastAssault) {
                $scope.lastAssault = `${$scope.hero.x};${$scope.hero.y}`;
                var rate = $scope.maps[$scope.FIRSTMAP].rate;
                if (rate) {
                    var put = getRandomInt(100);
                    var put2 = getRandomInt(100);
                    var put3 = getRandomInt(100);
                    // console.log(`rate: ${rate}, put: ${put}, put2: ${put2}, put3: ${put3},`);
                    if (put <= rate && put2 <= rate && put3 <= rate) {
                        $scope.ACTIONS.POKEMON.BATTLEWILD();
                    }
                }
            }
    };
    $scope.PKM.RatedFight = async function () {
        $scope.PKM.ratedBattleText = true;
        var trainers = await $scope.HOME_.GETFRIENDS();
        trainers = trainers.filter(d => {
            return (d.name !== $scope.session.name && d.pokemons.length === 6);
        });
        var myratring = $scope.session.rating || 0;
        if (trainers.length > 0) {
            var justos = trainers.filter(d => {
                return (((d.rating || 0) >= myratring && (d.rating || 0) <= (myratring + 20)) && d.name !== $scope.session.name);
            });
            if (justos.length > 0) {
                var finalFriend = randomObject(justos);
                $scope.ACTIONS.POKEMON.BATTLEONLINE(finalFriend.name, (finalFriend.rating || 0));
                $scope.PKM.ratedBattleText = false;
            } else {
                var todos = trainers.filter(d => {
                    return ((d.rating || 0) > myratring && d.name !== $scope.session.name);
                });
                if (todos.length > 0) {
                    var finalFriend = randomObject(todos);
                    $scope.ACTIONS.POKEMON.BATTLEONLINE(finalFriend.name, (finalFriend.rating || 0));
                    $scope.PKM.ratedBattleText = false;
                } else {
                    swal(LANGUAGE.t(`You are too strong, there are no coaches for you`));
                    $scope.PKM.ratedBattleText = false;
                }
            }
        } else {
            swal(LANGUAGE.t(`There are no pokemon trainers`));
            $scope.PKM.ratedBattleText = false;
        }
    };
    $scope.PKM.MirrorBattle = async function () {
        swal({
            title: LANGUAGE.t(`Are you sure to fight with you`),
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: LANGUAGE.t("Yes"),
            cancelButtonText: LANGUAGE.t("No"),
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
        }, function () {
            swal.close();
            $scope.ACTIONS.POKEMON.BATTLEONLINE($scope.session.name);
        });
    };
    $scope.PKM.FightFriend = async function (friendName) {
        swal({
            title: LANGUAGE.t(`Are you sure to fight with `) + " " + friendName + "?",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: LANGUAGE.t("Yes"),
            cancelButtonText: LANGUAGE.t("No"),
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
        }, function () {
            swal.close();
            $scope.ACTIONS.POKEMON.BATTLEONLINE(friendName);
        });
    };
    $scope.PKM.DeleteFriend = async function (friendName) {
        swal({
            title: LANGUAGE.t(`Are you sure to eliminate this friend?`),
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: LANGUAGE.t("Yes"),
            cancelButtonText: LANGUAGE.t("No"),
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
        }, function () {
            $scope.session.friends.splice($scope.session.friends.indexOf(friendName));
            $scope.ACTIONS.GAME.SAVE(function () {
                swal(LANGUAGE.t(`Friend deleted`));
            });
        });
    };
    $scope.PKM.AddFriend = async function (friendName) {
        $scope.toggleText = LANGUAGE.t("Searching") + "...";
        var friend = await $scope.HOME_.EXIST(friendName);
        if (friendName === $scope.session.name) {
            $scope.toggleText = LANGUAGE.t("Add");
            $scope.toggleAddingFriend = false;
            friend = false;
        }
        if ($scope.session.friends.indexOf(friendName) !== -1) {
            $scope.mensaje($scope.LAN.t("You already have this friend trainer"));
            $scope.toggleText = LANGUAGE.t("Add");
            $scope.toggleAddingFriend = false;
            return;
        }

        if (friend) {
            $scope.session.friends.push(friendName);
            $scope.ACTIONS.GAME.SAVE(function () {
                $scope.mensaje($scope.LAN.t("Friend added"));
                $scope.toggleText = LANGUAGE.t("Add");
                $scope.toggleAddingFriend = false;
                //if (!$scope.$$phase) $scope.$digest();
            });
        } else {
            $scope.toggleText = LANGUAGE.t("Add");
            $scope.toggleAddingFriend = false;
            $scope.mensaje(friendName + " " + $scope.LAN.t("trainer does not exist"));
        }
    };
    $scope.PKM.pokemonDetail = false;
    $scope.PKM.previewClose = function () {
        $scope.PKM.pokemonDetail = false;
    };
    $scope.PKM.menu_close = function () {
        $scope.play("Cancel", $scope.SOUNDS.system);
        $scope.PKM.menu = false;
    };
    $scope.PKM.talk = function (message, time) {
        $scope.play("Talk", $scope.SOUNDS.system);
        $("#enemyText").show();
        $("#enemyTextDiv").html(`${$scope.BATTLEOBJS.ENEMY.name || $scope.PKM.target().name}: ${message}`);
        $timeout(() => {
            $("#enemyTextDiv").html("");
            $("#enemyText").hide();
        }, time * 1000);
    };
    $scope.PKM.menu_open = function () {
        $scope.play("Menu", $scope.SOUNDS.system);
        $scope.PKM.menu = true;
    };
    $scope.PKM.ability = function (obj) {
        if (obj) {
            if (obj.battle.ability) {
                return OSO($scope.APIS.ABILITIES.filter(d => d.keyname === obj.battle.ability.keyname)[0]);
            } else
                return OSO($scope.APIS.ABILITIES.filter(d => d.keyname === obj.ability.keyname)[0]);
        }
    };
    $scope.PKM.friend = function (index) {
        if ($scope.session !== undefined)
            if ($scope.session.pokemons)
                return $scope.session.pokemons[$scope.BATTLEOBJS.FRIENDINDEX];
    };
    $scope.PKM.target = function () {
        return $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX];
    };
    $scope.PKM.attack = function (move) {
        $scope.POKEMONBATTLE.RUNTURN($scope, move);
    };
    $scope.PKM.changefriend = function (index) {
        $scope.POKEMONBATTLE.RUNTURN($scope, undefined, index);
    };

    $scope.PKM.hp = function (obj) {
        if (!obj) return 0;
        var basehp = eval(`(obj.stats.hp * 1.${$scope.POKEMOMFIND.QUALITY(obj)})`);
        var base = (basehp * $scope.PKM.hpc);
        var real = (basehp * $scope.PKM.hpc) - obj.battle.stats.hp;
        real = real <= 0 ? 0 : real;
        var real2 = (real * 100) / base;
        return real2 > 100 ? 100 : real2;
    };
    $scope.PKM.hpno = function (obj) {
        var basehp = eval(`(obj.stats.hp * 1.${$scope.POKEMOMFIND.QUALITY(obj)})`);
        var base = (basehp * $scope.PKM.hpc);
        var real = (basehp * $scope.PKM.hpc) - obj.battle.stats.hp;
        real = real <= 0 ? 0 : real;
        return real;
    };
    $scope.PKM.basehp = function (obj) {
        return (obj.stats.hp * $scope.PKM.hpc);
    };
    $scope.PKM.stat = function (obj, stat, modifier) {
        if (modifier !== undefined) {
            if (stat !== "hp") {

                var info = {friendAbility: $scope.PKM.ability(obj)};

                if (info.friendAbility.blocks)
                    if (info.friendAbility.blocks.indexOf('before_stat') !== -1) {
                        if (info.friendAbility.code) {
                            eval(info.friendAbility.code);
                            console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                        }
                    }

                if (modifier > 0) {
                    if (info.friendAbility.blocks)
                        if (info.friendAbility.blocks.indexOf('before_up_stat') !== -1) {
                            if (info.friendAbility.code) {
                                eval(info.friendAbility.code);
                                console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                            }
                        }
                } else {
                    if (info.friendAbility.blocks)
                        if (info.friendAbility.blocks.indexOf('before_down_stat') !== -1) {
                            if (info.friendAbility.code) {
                                eval(info.friendAbility.code);
                                console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                            }
                        }
                }

                obj.battle.stats[stat] += parseInt(modifier);
                var modifico = true;
                if (obj.battle.stats[stat] > $scope.PKM.statlimit) {
                    obj.battle.stats[stat] = $scope.PKM.statlimit;
                    modifico = false;
                }
                if (obj.battle.stats[stat] < ($scope.PKM.statlimit * -1)) {
                    obj.battle.stats[stat] = ($scope.PKM.statlimit * -1);
                    modifico = false;
                }
                if (modifico) {
                    if (modifier > 0) {
                        if (info.friendAbility.blocks)
                            if (info.friendAbility.blocks.indexOf('up_stat') !== -1) {
                                if (info.friendAbility.code) {
                                    eval(info.friendAbility.code);
                                    console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                }
                            }
                    } else {
                        if (info.friendAbility.blocks)
                            if (info.friendAbility.blocks.indexOf('down_stat') !== -1) {
                                if (info.friendAbility.code) {
                                    eval(info.friendAbility.code);
                                    console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                }
                            }
                    }
                }
                if (obj.battle.stats[stat] > $scope.PKM.statlimit) {
                    obj.battle.stats[stat] = $scope.PKM.statlimit;
                }
                if (obj.battle.stats[stat] < ($scope.PKM.statlimit * -1)) {
                    obj.battle.stats[stat] = ($scope.PKM.statlimit * -1);
                }
            } else {
                obj.battle.stats[stat] += parseInt(modifier);
                if (obj.battle.stats[stat] < 0)
                    obj.battle.stats[stat] = 0;
            }
        }
        if (stat !== "hp") {
            var basehp = eval(`(obj.stats[stat] * 1.${$scope.POKEMOMFIND.QUALITY(obj)})`);
            return (basehp) + ((obj.battle.stats[stat] * $scope.PKM.statCalc) * -1);
        }
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
    $scope.PKM.hihgstat = function (obj) {
        var max = "";
        var valmax = 0;
        for (var stat in obj.stats) {
            if (stat !== 'hp' && stat !== 'accuracy') {
                if (valmax < obj.stats[stat]) {
                    max = stat;
                    valmax = obj.stats[stat];
                }
            }
        }
        return max;
    };
    $scope.PKM.moves = function (obj) {
        return obj.battle.moves || obj.moves;
    };
    $scope.PKM.hpcolor = function (hp) {
        if (hp > 100)
            return "bg-blue";
        if (hp >= 50 && hp <= 100)
            return "bg-light-green";
        else if (hp <= 49 && hp >= 25)
            return "bg-amber";
        else if (hp >= 1)
            return "bg-red";
        else
            return "bg-black";
    };
};