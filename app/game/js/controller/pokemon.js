POKEMON = {
    wildRanges: [
        [0, 87],
        [88, 96],
        [97, 99],
        [100, 100]
    ],
    trainersRange: {
        noob: [0],
        noobPro: [0, 0, 0],
        friend: [0, 1],
        friendPro: [0, 0, 1],
        npc: [0, 1, 1],
        npcPro: [0, 0, 1, 1],
        special: [0, 1, 1, 1],
        specialPro: [0, 1, 1, 1, 1],
        gymFriend: [1, 1, 1, 1, 1],
        gymFriendPro: [1, 1, 1, 1, 1, 1],
        gym: [1, 1, 1, 1, 1, 2],
        profesor: [1, 1, 2, 2, 2, 2],
        profesorPro: [2, 2, 2, 2, 2, 2]
    },
    categories: [
        {
            name: "Omega",
            rules: `d.power>0 && d.power<=220`,
        },
        {
            name: "Tiny",
            rules: `d.power>220 && d.power<=260`,
        },
        {
            name: "Tiny Pro",
            rules: `d.power>260 && d.power<=290`,
        },
        {
            name: "Basic",
            rules: `d.power>290 && d.power<=320`,
        },
        {
            name: "Basic Pro",
            rules: `d.power>320 && d.power<=360`,
        },
        {
            name: "Medium",
            rules: `d.power>360 && d.power<=390`,
        },
        {
            name: "Medium Pro",
            rules: `d.power>390 && d.power<=420`,
        },
        {
            name: "Advanced",
            rules: `d.power>420 && d.power<=460`,
        },
        {
            name: "Advanced Pro",
            rules: `d.power>460 && d.power<=490`,
        },
        {
            name: "Ultra",
            rules: `d.power>490 && d.power<=520`,
        },
        {
            name: "Ultra Pro",
            rules: `d.power>520 && d.power<=560`,
        },
        {
            name: "Mega",
            rules: `d.power>560 && d.power<=590`,
        },
        {
            name: "Mega Pro",
            rules: `d.power>590 && d.power<=620`,
        },
        {
            name: "Special",
            rules: `d.power>620 && d.power<=660`,
        },
        {
            name: "Special Pro",
            rules: `d.power>660 && d.power<=690`,
        },
        {
            name: "God",
            rules: `d.power>690 && d.power<=720`,
        },
        {
            name: "God Pro",
            rules: `d.power>720 && d.power<=760`,
        },
        {
            name: "Alphas",
            rules: `d.power>760 && d.power<=2000`,
        },
        {
            name: "Todos",
            rules: `d.power>0`,
        }
    ]
};

POKEMONAPI = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "pokedex"
        });
        resolve(data.data[0] || {});
    }),
    MOVES: () => new Promise(async (resolve, reject) => {
        var data1 = await API.POST("data.php?e=MOVES", {
            "folder": "pokemon_data/moves"
        });
        resolve(data1.data[0] || {});
    }),
    LEARNS: () => new Promise(async (resolve, reject) => {
        var data2 = await API.POST("data.php?e=LEARNS", {
            "folder": "pokemon_data/learn"
        });
        resolve(data2.data[0] || {});
    }),
    ABILITIES: () => new Promise(async (resolve, reject) => {
        var data3 = await API.POST("data.php?e=ABILITIES", {
            "folder": "pokemon_data/abilities"
        });
        resolve(data3.data[0] || {});
    }),
    TYPES: () => new Promise(async (resolve, reject) => {
        var data4 = await API.POST("data.php?e=TYPES", {
            "folder": "pokemon_data/types"
        });
        resolve(data4.data[0] || {});
    }),
};
TYPECOLOR = {
    "Bug": "#a8b820",
    "Dragon": "#6338d5",
    "Electric": "#f8d030",
    "Fairy": "#ff65d5",
    "Fighting": "#903028",
    "Fire": "#f05030",
    "Flying": "#a890f0",
    "Ghost": "#6c5490",
    "Grass": "#78c850",
    "Ground": "#e0c068",
    "Ice": "#98d8d8",
    "Normal": "#a8a878",
    "Poison": "#833d85",
    "Psychic": "#f85888",
    "Rock": "#b8a038",
    "Steel": "#b8b8d0",
    "Water": "#6890f0",
    "Dark": "#705848",
};
POKEMOMFIND = {
    filterFirst: function (filter) {
        var data = APIS.POKEDEX.filter(filter);
        if (data.length > 0)
            return data[0];
        return undefined;
    },
    filterList: function (filter) {
        return APIS.POKEDEX.filter(filter);
    },
    firstByName: function (name) {
        return POKEMOMFIND.filterFirst(d => {
            return d.keyname === name;
        });
    },
    TRAINER: function (tier, type, base) {
        var tiers = POKEMOMFIND.tier_get(tier);
        var trainer = POKEMON.trainersRange[type || "noob"];
        var pokemons = [];
        for (var pokemon of trainer) {
            var tiersD = POKEMOMFIND.next(tiers, pokemon);
            pokemons.push(POKEMOMFIND.WILD(tiersD, base || false, true));
        }
        return pokemons;
    },
    tier_get: function (tier) {
        var tiers = POKEMON.categories.filter(d => {
            return d.name === tier
        });
        if (tiers.length > 0)
            tiers = tiers[0];
        else
            tiers = POKEMON.categories[0];
        return tiers;
    },
    WILD: function (tier, base, exclusive) {
        var tiers = POKEMOMFIND.tier_get(tier);
        var potency = getRandomInt(100);

        var next = 0;
        for (var range of POKEMON.wildRanges) {
            if (potency > range[0] && potency < range[1]) {
                break;
            } else {
                next++;
            }
        }
        if (next > 0)
            tiers = POKEMOMFIND.next(tiers, next);

        var pokemons = eval(`APIS.POKEDEX.filter(d=>{ return ${tiers.rules.split("&&")[1]} && d.forme!=='Gmax' })`);
        if (exclusive)
            pokemons = eval(`APIS.POKEDEX.filter(d=>{ return ${tiers.rules} && d.forme!=='Gmax' })`);
        if (base) {
            pokemons = pokemons.filter(d => {
                return d.types.indexOf(base) !== -1
            });
        }
        if (pokemons.length > 0) {
            var pokemon = randomArray(pokemons);
            var generated = POKEMOMFIND.GENERATE(pokemon.keyname);
            generated.tier = tiers.name;
            generated.next = next;
            return generated;
        }
        return null;
    },
    next: function (tier, count) {
        var next = 0;
        for (var category of POKEMON.categories) {
            if (next === count)
                return category;
            if (tier.name === category.name)
                next++
        }
        return tier;
    },
    /**
     * @return {undefined}
     */
    GENERATE: function (name) {
        var pokemon = POKEMOMFIND.firstByName(name);
        if (pokemon) {
            var abilities = objToArray(pokemon.abilities);
            var ability = abilities[getRandomInt(abilities.length - 1)];
            var giga = false;
            var mega = false;
            if (pokemon.otherFormes) {
                for (var form of pokemon.otherFormes) {
                    if (form.indexOf("gmax") !== -1)
                        giga = form;
                    if (form.indexOf("mega") !== -1) {
                        if (!Array.isArray(mega))
                            mega = [];
                        mega.push(form);
                    }
                }
            }
            var alltypes = {};
            for (var t in APIS.TYPES) {
                alltypes[t] = 0;
            }

            var sound_pokepath = `../resources/poekemon/audio/cries/${POKEDEX_.cleanName(pokemon.baseSpecies || name)}.ogg`;
            if (parseInt(pokemon.num) <= 721)
                sound_pokepath = `../resources/poekemon/audio/cries_anime/${POKEDEX_.cleanName(pokemon.baseSpecies || name)}.ogg`;
            var sexo = getRandomInt(100) > 50 ? "male" : "female";
            var shiny = getRandomInt(100) > 95 ? true : false;
            var superShiny = getRandomInt(1000) > 998 ? true : false;
            if (superShiny)
                shiny = false;
            var mymoves = MOVESFIND.POKEMON_MOVES_GENERATE(name);
            var evoProb = 0;
            var regresiveCount = 30;
            var myCategory = false;
            var evos = OSO(pokemon.evos);
            if (mega) {
                if (!evos) {
                    evos = [];
                }
                evos = evos.concat(mega);
            }

            if (evos) {
                if (evos.length > 0) {
                    var index = 0;
                    for (var category in POKEMON.categories) {
                        var tiers = POKEMON.categories[category];
                        var tiersNext = POKEMON.categories[index + 1];
                        var exist = eval(`APIS.POKEDEX.filter(d=>{ return ${tiers.rules} && d.keyname===pokemon.keyname })`);
                        var existEqual = eval(`APIS.POKEDEX.filter(d=>{ return ${tiers.rules} && d.keyname===evos[0] })`);
                        if (!myCategory) {
                            if (exist.length > 0)
                                myCategory = true;
                            if (existEqual.length > 0)
                                break;
                        } else {
                            if (existEqual.length > 0) {
                                regresiveCount = Math.ceil(regresiveCount / 2);
                                break;
                            } else {
                                regresiveCount = Math.ceil(regresiveCount / 2);
                            }
                        }
                        index++;
                    }
                }
            }
            return {
                quality: superShiny ? 30 : (shiny ? 20 : getRandomInt(10)),
                shiny: shiny,
                gender: sexo,
                superShiny: superShiny,
                imageUrl: shiny ? `../resources/poekemon/gif/front_s/${pokemon.keyname}.gif` : `../resources/poekemon/gif/front/${pokemon.keyname}.gif`,
                cryUrl: sound_pokepath,
                date: new Date(),
                nick: pokemon.keyname,
                name: pokemon.keyname,
                types: pokemon.types,
                moves: mymoves,
                stats: pokemon.baseStats,
                ability: MOVESFIND.ABILITY(ability),
                heightm: pokemon.heightm,
                weightkg: pokemon.weightkg,
                evos: evos,
                evosProb: regresiveCount,
                giga: giga,
                mega: mega,
                battle: {
                    temp: {
                        stats: {
                            hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0,
                        },
                        typesBust: alltypes,
                        accuracy: 0,
                        status_turns: 0,
                        typeChanges: undefined
                    },
                    status: null
                }
            };
        } else
            return undefined;
    },
    ADD: function (item) {
        var pokemons = OSO(SESSION.pokemons);
        if (pokemons.length >= 6) {
            swal({
                title: `No puedes tener mas de 6 pokemones en tu equipo, quieres enviar a ${item.name} a la bobeda?`,
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si",
                cancelButtonText: "NO",
                closeOnConfirm: false,
                showLoaderOnConfirm: false,
            }, function () {
                var bobedas = OSO(SESSION.bobeda);
                if (bobedas.length >= 10) {
                    swal(`Lo sentimos tu bóbeda ya esta llena, ${item.name} no podrá estar contiogo, asegurate de crear espacio para tu proxima captura.`);
                } else {
                    bobedas.push(item);
                    ACTIONS.GAME.SESSION({bobeda: bobedas});
                    swal(`${item.name}, se ha guardado en tu bóbeda`);
                }
            });
        } else {
            pokemons.push(item);
            ACTIONS.GAME.SESSION({pokemons: pokemons});
            swal(`${item.name}, se ha unido a tu equipo.`);
        }
    },
    ADDWILD: function () {
        var item = POKEMOMFIND.WILD(SESSION.tier);
        POKEMOMFIND.ADD(item);
    },
    DELETE: function (item, index) {
        swal({
            title: `Estas seguro de eliminar a ${item.name}?`,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            cancelButtonText: "NO",
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
        }, function () {
            SESSION.pokemons.splice(index, 1);
            ACTIONS.GAME.SESSION({pokemons: SESSION.pokemons});
            swal(`Adios ${item.name}, vuelve a tu vida salvaje :(`);
        });
    },
    TRASLADE: function (item, index) {
        swal({
            title: `Estas seguro de trasladar a ${item.name} a tu bóbeda?`,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            cancelButtonText: "NO",
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
        }, function () {
            var item = OSO(SESSION.pokemons[index]);
            SESSION.pokemons.splice(index, 1);
            var bobedas = OSO(SESSION.bobeda);
            if (bobedas.length >= 10) {
                swal(`Lo sentimos tu bóbeda ya esta llena`);
            } else {
                bobedas.push(item);
                ACTIONS.GAME.SESSION({bobeda: bobedas, pokemons: SESSION.pokemons});
                swal(`${item.name}, se ha guardado en tu bóbeda`);
            }
        });
    },
    INCLUDE: function (item, index) {
        swal({
            title: `Estas seguro de unir a ${item.name} a tu equipo?`,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            cancelButtonText: "NO",
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
        }, function () {
            var item = OSO(SESSION.bobeda[index]);
            SESSION.bobeda.splice(index, 1);
            var pokemons = OSO(SESSION.pokemons);
            if (pokemons.length >= 6) {
                swal(`Lo sentimos tu equipo ya está lleno`);
            } else {
                pokemons.push(item);
                ACTIONS.GAME.SESSION({bobeda: SESSION.bobeda, pokemons: pokemons});
                swal(`${item.name}, se ha unido a tu equipo`);
            }
        });
    },
    DELETE_BOBEDA: function (item, index) {
        swal({
            title: `Estas seguro de eliminar a ${item.name}?`,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            cancelButtonText: "NO",
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
        }, function () {
            SESSION.bobeda.splice(index, 1);
            ACTIONS.GAME.SESSION({bobeda: SESSION.bobeda});
            swal(`El profesor es el nuevo dueño de ${item.name}, gracias`);
        });
    }
};

LOGROS = {
    Saltarin: {
        "name": "Saltarin",
        "key": "Saltarin",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica podr\u00e1s saltar las estructuras, puedes hacerlo d\u00e1ndole click a tu personaje",
        "icon": 141
    },
    Bucear: {
        "name": "Bucear",
        "key": "Bucear",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica podr\u00e1s saltar las aguas para bucear, debes ser Saltarin como requisito",
        "icon": 12
    },
    Destello: {
        "name": "Destello",
        "key": "Destello",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica podr\u00e1s iluminar las cuevas por un tiempo",
        "icon": 71,
        "script": "ACTIONS.PLAYER.LIGH(30)"
    },
    Vuelo: {
        "name": "Vuelo",
        "key": "Vuelo",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica si lo deseas puedes volar!",
        "icon": 226,
        "script": "ACTIONS.PLAYER.FLY()"
    },
    Destruir: {
        "name": "Destruir",
        "key": "Destruir",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica podr\u00e1s eliminar algunos objetos al tocarlos",
        "icon": 79
    },
    Mover: {
        "name": "Mover",
        "key": "Mover",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica podr\u00e1s mover algunos objetos al tocarlos",
        "icon": 78
    },
    Invisibilidad: {
        "name": "Invisibilidad",
        "key": "Invisibilidad",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica podr\u00e1s ocultarte de los entrenadores y pokemones",
        "icon": 20,
        "script": "ACTIONS.PLAYER.HIDE()"
    },
    Teletransportacion: {
        "name": "Teletransportación",
        "key": "Teletransportacion",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica podr\u00e1s teletransportarte al limite de tu mirada, puede contener poderes ocultos",
        "icon": 307,
        "script": "ACTIONS.PLAYER.TELE()"
    },
    SoyAgua: {
        "name": "Soy Agua",
        "key": "SoyAgua",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica te unes con el agua para poder trepar cascadas y nadar mas rápido, puede contener poderes ocultos",
        "icon": 68,
        "script": "ACTIONS.PLAYER.WATERELEMENTAL()"
    },
    SoyFuego: {
        "name": "Soy Fuego",
        "key": "SoyFuego",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica te conviertes en fuego para salir impulsado como un cañón, puede contener poderes ocultos",
        "icon": 65,
        "script": "ACTIONS.PLAYER.FIREELEMENTAL()"
    },
    SoyTierra: {
        "name": "Soy Tierra",
        "key": "SoyTierra",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica podrás crear rocas que te servirán como puentes y resortes, puede contener poderes ocultos",
        "icon": 69,
        "script": "ACTIONS.PLAYER.EARTHELEMENTAL()"
    },
    SoyTrueno: {
        "name": "Soy Trueno",
        "key": "SoyTrueno",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica podrás ser uno con el trueno incrementando tus posibilidades fisicas y magicas con poderes inesperados",
        "icon": 67,
        "script": "ACTIONS.PLAYER.Thunder()"
    },
    Tiempo: {
        "name": "Control de Tiempo",
        "key": "Tiempo",
        "term": "T\u00e9cnica",
        "desc": "Con esta t\u00e9cnica podrás cambiar el tiempo actual",
        "icon": 221,
        "script": "ACTIONS.AMBIENT.CHANGETIME()"
    }

};
MOVESFIND = {
    POKEMON_MOVES: function (name) {
        var pokemon = POKEMOMFIND.firstByName(name);
        return APIS.LEARNS[(pokemon.baseSpecies ? pokemon.baseSpecies.toLowerCase() : name)];
    },
    /**
     * @return {null}
     */
    INFO: function (name) {
        var search = APIS.MOVES.filter(d => {
            if (d.keyname === name) return d
        });
        return search.length > 0 ? search[0] : null;
    },
    /**
     * @return {null}
     */
    ABILITY: function (name) {
        var search = APIS.ABILITIES.filter(d => {
            if (d.name.toLowerCase() === name.toLowerCase()) return d
        });
        return search.length > 0 ? search[0] : null;
    },
    POKEMON_MOVES_INFO: function (name) {
        var learns = MOVESFIND.POKEMON_MOVES(name);
        var moves = [];
        for (var move of learns) {
            moves.push(MOVESFIND.INFO(move));
        }
        return moves;
    },
    POKEMON_MOVES_GENERATE: function (name) {
        console.log(name);
        var pokemon = POKEMOMFIND.firstByName(name);
        var moves = MOVESFIND.POKEMON_MOVES_INFO(name);
        var moveCount = 0;
        var random = [];
        var nums = [];
        var PORS = moves.filter(d => {
            if (d.category === "Physical" || d.category === "Special") return d;
        });
        var ESTATUS = moves.filter(d => {
            if (d.category === "Status") return d
        });
        if (pokemon.types.length > 0) {
            var type = pokemon.types[0];
            var firstAttack = PORS.filter(d => {
                if (d.type.toLowerCase() === type.toLowerCase() && nums.indexOf(d.num) === -1) return d;
            });
            if (firstAttack.length > 0) {
                random.push(randomArray(firstAttack));
                nums.push(random[random.length - 1].num);
                moveCount++;
            }
            if (pokemon.types.length > 1) {
                type = pokemon.types[1];
                firstAttack = PORS.filter(d => {
                    if (d.type.toLowerCase() === type.toLowerCase() && nums.indexOf(d.num) === -1) return d;
                });
                if (firstAttack.length > 0) {
                    random.push(randomArray(firstAttack));
                    nums.push(random[random.length - 1].num);
                    moveCount++;
                }
            } else {
                type = pokemon.types[1];
                firstAttack = PORS.filter(d => {
                    if (nums.indexOf(d.num) === -1) return d;
                });
                if (firstAttack.length > 0) {
                    random.push(randomArray(firstAttack));
                    nums.push(random[random.length - 1].num);
                    moveCount++;
                }
            }
        }
        for (var i = 1; i <= (4 - moveCount); i++) {
            if (random.length <= 2) {
                var prob = getRandomInt(100);
                if (prob > 50) {
                    firstAttack = PORS.filter(d => {
                        if (nums.indexOf(d.num) === -1) return d;
                    });
                    if (firstAttack.length > 0) {
                        random.push(randomArray(firstAttack));
                        nums.push(random[random.length - 1].num);
                    }
                } else {
                    firstAttack = ESTATUS.filter(d => {
                        if (nums.indexOf(d.num) === -1) return d;
                    });
                    if (firstAttack.length > 0) {
                        random.push(randomArray(firstAttack));
                        nums.push(random[random.length - 1].num);
                    }
                }
            } else {
                firstAttack = ESTATUS.filter(d => {
                    if (nums.indexOf(d.num) === -1) return d;
                });
                if (firstAttack.length > 0) {
                    random.push(randomArray(firstAttack));
                    nums.push(random[random.length - 1].num);
                }
            }
        }

        return random;
    }
};

GAMESCREEN = $("#game");
POKEMONBATTLE = {
    FORMS: {
        "stand": "stand",
        "punch": "punch",
        "evade": "evade",
        "bad": "bad",
        "order": "order",
        "happy": "happy",
        "confiado": "confiado",
        "point_bad": "point_bad",
        "sad": "sad",
        "stand_fight": "stand_fight",
        "stand_fight_interrogation": "stand_fight_interrogation",
        "sad_2": "sad_2",
        "hurt": "hurt",
        "stand_order": "stand_order",
        "sad_3": "sad_3",
        "evade_2": "evade_2",
        "animate": "animate",
        "dead": "dead",
    },
    LAUNCH: function ($scope, tier, trainer, type, baseType) {
        $("#footer").hide();
        $("#battleMenu").show();

        ACTIONS.GAME.BLOCK();
        ACTIONS.SOUND.STOPALL();
        ACTIONS.SOUND.BattleMusic("");
        $scope.BATTLEOBJS = {};

        ACTIONS.GAME.SCREEN(0.5, "#000", 1, async function () {
            for (var l = 0; l <= 9; l++) {
                eval(`layer${l}.visible =false;`);
            }
            ACTIONS.CAMERA.ZERO();
            layerBattle.removeAllChildren();
            layerBattle.alpha = 0;
            //DrawBackGround
            $scope.BATTLEOBJS.menu = false;
            $scope.BATTLEOBJS.menu_close = function () {
                $scope.play("Cancel", SOUNDS.system);
                $scope.BATTLEOBJS.menu = false;
            };
            $scope.BATTLEOBJS.menu_open = function () {
                $scope.play("Menu", SOUNDS.system);
                $scope.BATTLEOBJS.menu = true;
            };

            $scope.BATTLEOBJS.hpc = 4;
            $scope.BATTLEOBJS.FRIENDINDEX = 0;
            $scope.BATTLEOBJS.TARGETINDEX = 0;
            $scope.BATTLEOBJS.BG = POKEMONBATTLE.DRAWBG($scope);
            $scope.BATTLEOBJS.HERO = POKEMONBATTLE.HERO($scope);
            $scope.BATTLEOBJS.ENEMY = POKEMONBATTLE.ENEMY($scope, trainer);

            if (trainer) {
                $scope.BATTLEOBJS.TARGETS = POKEMOMFIND.TRAINER(tier, type, baseType);
            } else {
                $scope.BATTLEOBJS.TARGETS = [POKEMOMFIND.WILD(tier)];
            }

            console.log($scope.session.pokemons[$scope.BATTLEOBJS.FRIENDINDEX]);

            // Listeners
            $scope.BATTLEOBJS.friend = function () {
                return $scope.session.pokemons[$scope.BATTLEOBJS.FRIENDINDEX];
            };
            $scope.BATTLEOBJS.friend_hp = function () {
                var base = ($scope.BATTLEOBJS.friend().stats.hp * $scope.BATTLEOBJS.hpc);
                var real = ($scope.BATTLEOBJS.friend().stats.hp * $scope.BATTLEOBJS.hpc) - $scope.BATTLEOBJS.friend().battle.temp.stats.hp;
                return (real * 100) / base;
            };
            $scope.BATTLEOBJS.friend_stat = function (stat, modifier) {
                if (modifier !== undefined) {
                    $scope.BATTLEOBJS.friend().battle.temp.stats[stat] += parseInt(modifier);
                }
                return ($scope.BATTLEOBJS.friend().stats[stat]) - $scope.BATTLEOBJS.friend().battle.temp.stats[stat];
            };
            $scope.BATTLEOBJS.friend_moves = function () {
                return $scope.BATTLEOBJS.friend().moves;
            };

            $scope.BATTLEOBJS.target = function () {
                return $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX];
            };
            $scope.BATTLEOBJS.target_hp = function () {
                var base = ($scope.BATTLEOBJS.target().stats.hp * $scope.BATTLEOBJS.hpc);
                var real = ($scope.BATTLEOBJS.target().stats.hp * $scope.BATTLEOBJS.hpc) - $scope.BATTLEOBJS.target().battle.temp.stats.hp;
                return (real * 100) / base;
            };
            $scope.BATTLEOBJS.target_stat = function (stat, modifier) {
                if (modifier !== undefined) {
                    $scope.BATTLEOBJS.target().battle.temp.stats[stat] += parseInt(modifier);
                }
                return ($scope.BATTLEOBJS.target().stats[stat]) - $scope.BATTLEOBJS.target().battle.temp.stats[stat];
            };
            // Listeners

            ACTIONS.GAME.ALPHABASE(layerBattle, 0.5, 1, function () {
                //Draw Hero
                setTimeout(async () => {
                    $scope.BATTLEOBJS.FRIEND = await POKEMONBATTLE.FRIEND($scope);
                    $scope.BATTLEOBJS.HERO.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
                    ACTIONS.ANIMATION.THROWNATURAL('Pokeball_Omega',
                        $scope.BATTLEOBJS.HERO.body.x,
                        $scope.BATTLEOBJS.HERO.body.y,
                        $scope.BATTLEOBJS.HERO.body.x,
                        $scope.BATTLEOBJS.HERO.body.y + ($scope.peopleHeight * 1.5),
                        400,
                        function () {
                            ACTIONS.ANIMATION.PLAYNATURAL('OutPokeball', $scope.BATTLEOBJS.HERO.body.x, $scope.BATTLEOBJS.HERO.body.y + ($scope.peopleHeight * 1.5), function () {
                                ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.FRIEND.body, 0.3, 1);
                                ACTIONS.SOUND.PLAY($scope.BATTLEOBJS.friend().cryUrl, SOUNDS.system);
                                if (trainer) {
                                    setTimeout(async () => {
                                        $scope.BATTLEOBJS.TARGET = await POKEMONBATTLE.TARGET($scope);
                                        $scope.BATTLEOBJS.ENEMY.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
                                        ACTIONS.ANIMATION.THROWNATURAL('Pokeball_Omega',
                                            $scope.BATTLEOBJS.ENEMY.body.x,
                                            $scope.BATTLEOBJS.ENEMY.body.y,
                                            $scope.BATTLEOBJS.ENEMY.body.x,
                                            $scope.BATTLEOBJS.ENEMY.body.y + ($scope.peopleHeight * 1.5),
                                            400,
                                            function () {
                                                ACTIONS.ANIMATION.PLAYNATURAL('OutPokeball', $scope.BATTLEOBJS.ENEMY.body.x, $scope.BATTLEOBJS.ENEMY.body.y + ($scope.peopleHeight * 1.5), function () {
                                                    ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.TARGET.body, 0.3, 1);
                                                    ACTIONS.SOUND.PLAY($scope.BATTLEOBJS.target().cryUrl, SOUNDS.system);
                                                });
                                            });
                                    }, 500);
                                } else {
                                    $scope.BATTLEOBJS.TARGET = POKEMONBATTLE.TARGET($scope);
                                    ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.TARGET.body, 0.3, 1);
                                }
                            });
                        });
                }, 1000);
            });
        });
    },
    END: function ($scope) {
        ACTIONS.SOUND.STOPALL();
        ACTIONS.SOUND.BGM_RESTORE();
        ACTIONS.SOUND.BGS_RESTORE();
        ACTIONS.CAMERA.PLAYER();
        for (var l = 0; l <= 9; l++) {
            eval(`layer${l}.visible =true;`);
        }
        $scope.BATTLEOBJS.FRIEND.dom.parentNode.removeChild($scope.BATTLEOBJS.FRIEND.dom);
        layerBattle.removeAllChildren();
        layerBattle.alpha = 0;
        ACTIONS.GAME.SCREENOFF(1, function () {
            $("#footer").show();
            ACTIONS.GAME.UNBLOCK();
        })
    },
    DRAWBG: function ($scope) {
        var imageD = mapQueues[FIRSTMAP].getResult("BG");
        var BG = new createjs.ScaleBitmap(mapQueues[FIRSTMAP].getResult("BG"), new createjs.Rectangle(0, 0, imageD.width, imageD.height));
        BG.setDrawSize($scope.width * $scope.baseWidth, $scope.height * $scope.baseHeight);
        layerBattle.addChild(BG);
        return BG;
    },
    HERO: function ($scope) {
        var hero = new createjs.Bitmap(mapQueues["player_" + $scope.session.id].getResult(`SV`));
        hero.cache(0, 0, hero.width, hero.height);
        var Sprite = new createjs.SpriteSheet({
            framerate: $scope.playerFrames,
            "images": [hero.image],
            frames: {width: $scope.peopleWidth, height: $scope.peopleHeight, count: 54},
            "animations": $scope.peopleAnimationConfig,
        });
        var heroBody = new createjs.Sprite(Sprite, "stand");
        var heroShadow = new createjs.Bitmap(mapQueues["player_" + $scope.session.id].getResult(`SHADOWBIG`));
        heroShadow.x = heroBody.x = 170;
        heroShadow.scaleX = heroBody.scaleX = -1;
        heroShadow.y = heroBody.y = 70;
        heroShadow.y += 43;
        heroShadow.x += 10;
        layerBattle.addChild(heroShadow);
        layerBattle.addChild(heroBody);
        return {body: heroBody, shadow: heroShadow};
    },
    ENEMY: function ($scope, name) {
        var hero = new createjs.Bitmap(mapQueues["player_" + (name || $scope.session.id)].getResult(`SV`));
        hero.cache(0, 0, hero.width, hero.height);
        var Sprite = new createjs.SpriteSheet({
            framerate: $scope.playerFrames,
            "images": [hero.image],
            frames: {width: $scope.peopleWidth, height: $scope.peopleHeight, count: 54},
            "animations": $scope.peopleAnimationConfig,
        });
        var heroBody = new createjs.Sprite(Sprite, "stand");
        var heroShadow = new createjs.Bitmap(mapQueues["player_" + $scope.session.id].getResult(`SHADOWBIG`));
        heroShadow.x = heroBody.x = 400;
        heroShadow.y = heroBody.y = 70;
        heroShadow.y += 43;
        heroShadow.x -= 10;
        layerBattle.addChild(heroShadow);
        layerBattle.addChild(heroBody);
        if (!name) {
            heroBody.visible = false;
            heroShadow.visible = false;
        }
        return {body: heroBody, shadow: heroShadow};
    },
    FRIEND: ($scope) => new Promise(async (resolve, reject) => {
        var firend = new Image();
        firend.style = "z-index: 1;top 0;left: 0;";
        firend.src = $scope.session.pokemons[$scope.BATTLEOBJS.FRIENDINDEX].imageUrl;
        document.getElementById("main").appendChild(firend);
        var friendBox = new createjs.DOMElement(firend);
        friendBox.scaleX = -1;
        friendBox.x = GAMESCREEN.width() / 4;
        friendBox.y = 70;
        friendBox.y += 43;
        friendBox.y += 64;
        friendBox.alpha = 0;
        firend.onload = function (evt) {
            var img = evt.path[0];
            //friendBox.x += img.width;
            // friendBox.y += img.height;
            layerBattle.addChild(friendBox);
            resolve({body: friendBox, dom: firend});
        };

    }),
    TARGET: ($scope) => new Promise(async (resolve, reject) => {
        var firend = new Image();
        firend.style = "z-index: 1;top 0;left: 0;";
        firend.src = $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX].imageUrl;
        document.getElementById("main").appendChild(firend);
        var friendBox = new createjs.DOMElement(firend);
        friendBox.x = GAMESCREEN.width() - (GAMESCREEN.width() / 4);
        friendBox.y = 70;
        friendBox.y += 43;
        friendBox.y += 64;
        friendBox.alpha = 0;

        firend.onload = function (evt) {
            var img = evt.path[0];
            friendBox.x -= img.width;
            if ($scope.BATTLEOBJS.FRIEND.dom.height > img.height)
                friendBox.y += ($scope.BATTLEOBJS.FRIEND.dom.height - img.height);
            else
                friendBox.y -= (img.height - $scope.BATTLEOBJS.FRIEND.dom.height);
            layerBattle.addChild(friendBox);
            resolve({body: friendBox, dom: firend});
        };
    }),
};