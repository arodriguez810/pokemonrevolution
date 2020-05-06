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
            rules: `d.power>0 && d.power<=2000`,
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

BATTLEDEFAULT = {
    stats: {
        hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, accuracy: 0, evasion: 0
    },
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
        var trainer = POKEMON.trainersRange[type || "noobPro"];
        var pokemons = [];
        for (var pokemon of trainer) {
            var tiersD = POKEMOMFIND.next(tiers.name, pokemon);
            pokemons.push(POKEMOMFIND.WILD(tiersD, base || false, true));
        }
        return pokemons;
    },
    tier_get: function (tier) {
        var tiers = POKEMON.categories.filter(d => {
            return d.name === tier;
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
        var begin = false;
        for (var category of POKEMON.categories) {
            if (next >= (POKEMON.categories.length - 1))
                return category;
            if (tier.name === category.name) {
                begin = true;
            } else
                continue;
            if (next === count)
                return category;
            else
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


            var sound_pokepath = `../resources/poekemon/audio/cries/${POKEDEX_.cleanName(pokemon.baseSpecies || name)}.ogg`;
            if (parseInt(pokemon.num) <= 721)
                sound_pokepath = `../resources/poekemon/audio/cries_anime/${POKEDEX_.cleanName(pokemon.baseSpecies || name)}.ogg`;
            var sexo = getRandomInt(100) > 50 ? "male" : "female";
            var shiny = getRandomInt(100) > 98 ? true : false;
            var superShiny = false;
            if (shiny) {
                superShiny = getRandomInt(100) > 80 ? true : false;
            }
            var style = "";
            if (superShiny) {
                shiny = false;
                style = superShiny ? `filter: hue-rotate(${getRandomIntRange(40, 320)}deg);` : "";
            }
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
            var statis = OSO(pokemon.baseStats);
            statis.accuracy = 100;
            statis.evasion = 0;
            return {
                quality: superShiny ? getRandomIntRange(21, 27) : (shiny ? getRandomIntRange(11, 20) : getRandomIntRange(1, 20)),
                shiny: shiny,
                gender: sexo,
                superShiny: superShiny,
                style: style,
                imageUrl: shiny ? `../resources/poekemon/gif/front_s/${pokemon.keyname}.gif` : `../resources/poekemon/gif/front/${pokemon.keyname}.gif`,
                cryUrl: sound_pokepath,
                date: new Date(),
                nick: pokemon.keyname,
                name: pokemon.keyname,
                types: pokemon.types,
                moves: mymoves,
                stats: statis,
                ability: MOVESFIND.ABILITY(ability),
                heightm: pokemon.heightm,
                weightkg: pokemon.weightkg,
                evos: evos,
                evosProb: regresiveCount,
                giga: giga,
                mega: mega,
                battle: OSO(BATTLEDEFAULT),
                power: pokemon.power
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
        if (APIS.LEARNS[(pokemon.baseSpecies ? pokemon.baseSpecies.toLowerCase() : name)])
            return APIS.LEARNS[(pokemon.baseSpecies ? pokemon.baseSpecies.toLowerCase() : name)];
        else
            return APIS.LEARNS[name];
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
        if (Array.isArray(learns)) {
            for (var move of learns) {
                moves.push(MOVESFIND.INFO(move));
            }
        } else {

        }
        return moves;
    },
    POKEMON_MOVES_GENERATE: function (name) {
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


POKEMONBATTLE = {
    X: function (x) {
        return x + parseFloat(getComputedStyle(document.getElementById("game")).marginLeft);
    },
    Y: function (y) {
        return y + parseFloat(getComputedStyle(document.getElementById("game")).marginTop);
    },
    XS: function (x) {
        return x - parseFloat(getComputedStyle(document.getElementById("game")).marginLeft);
    },
    YS: function (y) {
        return y - parseFloat(getComputedStyle(document.getElementById("game")).marginTop);
    },
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
    LAUNCH: function ($scope, tier, trainer, type, baseType, win, loose) {
        $("#footer, #footer2").hide();


        $scope.PKM.pokemonDetail = false;
        $scope.PKM.menu = false;
        ACTIONS.GAME.BLOCK();
        ACTIONS.SOUND.STOPALL();

        $scope.BATTLEOBJS = {};
        $scope.BATTLEOBJS.winbattle = win;
        $scope.BATTLEOBJS.losebattle = loose;

        ACTIONS.GAME.SCREEN(0.5, "#000", 1, async function () {
            for (var l = 0; l <= 9; l++) {
                eval(`layer${l}.visible = false;`);
            }
            ACTIONS.CAMERA.ZERO();
            layerBattle.removeAllChildren();
            layerBattle.alpha = 0;
            //DrawBackGround

            $scope.BATTLEOBJS.friendParty = {};
            $scope.BATTLEOBJS.targetParty = {};
            $scope.BATTLEOBJS.clima = "";
            $scope.BATTLEOBJS.batonpass = false;
            $scope.BATTLEOBJS.FRIENDINDEX = 0;
            $scope.BATTLEOBJS.TARGETINDEX = 0;
            $scope.BATTLEOBJS.BG = POKEMONBATTLE.DRAWBG($scope);
            $scope.BATTLEOBJS.HERO = POKEMONBATTLE.HERO($scope);
            $scope.BATTLEOBJS.isWild = !trainer;
            $scope.BATTLEOBJS.ENEMY = POKEMONBATTLE.ENEMY($scope, trainer);
            if (trainer) {
                $scope.BATTLEOBJS.TARGETS = POKEMOMFIND.TRAINER(tier, type, baseType);
            } else {
                $scope.BATTLEOBJS.TARGETS = [POKEMOMFIND.WILD(tier)];
            }

            var resources = {};
            $scope.playLoading("Cargando Batalla..");
            for (var r of $scope.session.pokemons) {
                resources[r.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/')] = r.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/');
                if (r.giga) {
                    resources[r.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/').replace(`${r.name}.gif`, `${r.giga}.gif`)]
                        = r.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/').replace(`${r.name}.gif`, `${r.giga}.gif`);
                }
                for (var m of r.moves) {
                    var hows = [];
                    if (m.animation)
                        hows = m.animation.split(',');
                    else {
                        hows = `self:throw:Generic_${m.type}`.split(',');
                    }
                    var existanimation = $scope.animations[m.keyname];
                    if (existanimation)
                        resources[existanimation.file] = existanimation.file;
                    for (var h of hows) {
                        var animation = h.split(':')[2];
                        animation = $scope.animations[animation];
                        resources[animation.file] = animation.file;
                    }

                }
            }
            for (var r of $scope.BATTLEOBJS.TARGETS) {
                resources[r.imageUrl] = r.imageUrl;
                if (r.giga) {
                    resources[r.imageUrl.replace(`${r.name}.gif`, `${r.giga}.gif`)] = r.imageUrl.replace(`${r.name}.gif`, `${r.giga}.gif`);
                }

                for (var m of r.moves) {
                    var hows = [];
                    if (m.animation)
                        hows = m.animation.split(',');
                    else {
                        hows = `self:throw:Generic_${m.type}`.split(',');
                    }
                    var existanimation = $scope.animations[m.keyname];
                    if (existanimation)
                        resources[existanimation.file] = existanimation.file;

                    for (var h of hows) {
                        var animation = h.split(':')[2];
                        animation = $scope.animations[animation];
                        resources[animation.file] = animation.file;
                    }

                }
            }

            resources = objToArray(resources);
            $scope.isBattlening = true;
            ACTIONS.LOAD.ADD(resources, function () {
                $scope.stopLoading();
                ACTIONS.GAME.SCREENOFF(1);
                ACTIONS.SOUND.BattleMusic("");
                $scope.PKM.mainMenu = true;
                ACTIONS.GAME.ALPHABASE(layerBattle, 0.5, 1, function () {
                    //Draw Hero
                    setTimeout(async () => {
                        $scope.BATTLEOBJS.FRIEND = POKEMONBATTLE.FRIEND($scope);
                        $scope.BATTLEOBJS.HERO.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
                        ACTIONS.ANIMATION.THROWNATURAL('Pokeball_' + $scope.PKM.friend().quality,
                            $scope.BATTLEOBJS.HERO.body.x,
                            $scope.BATTLEOBJS.HERO.body.y,
                            POKEMONBATTLE.XS($scope.BATTLEOBJS.FRIEND.body.x + ($scope.BATTLEOBJS.FRIEND.body.width / 2)),
                            POKEMONBATTLE.YS($scope.BATTLEOBJS.FRIEND.body.y + ($scope.BATTLEOBJS.FRIEND.body.height / 2)),
                            true,
                            function () {
                                ACTIONS.ANIMATION.PLAYNATURAL($scope.PKM.friend().superShiny ? 'SuperShiny' : ($scope.PKM.friend().shiny ? 'Starts' : 'OutPokeball'),
                                    POKEMONBATTLE.XS($scope.BATTLEOBJS.FRIEND.body.x + ($scope.BATTLEOBJS.FRIEND.body.width / 2)),
                                    POKEMONBATTLE.YS($scope.BATTLEOBJS.FRIEND.body.y + ($scope.BATTLEOBJS.FRIEND.body.height / 2)),
                                    function () {
                                        ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.FRIEND.body, 0.3, 1);
                                        ACTIONS.SOUND.PLAY($scope.PKM.friend().cryUrl, SOUNDS.system);
                                        if (trainer) {
                                            setTimeout(function () {
                                                $scope.BATTLEOBJS.TARGET = POKEMONBATTLE.TARGET($scope);
                                                $scope.BATTLEOBJS.ENEMY.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
                                                $scope.PKM.talk(`Yo te elijo ${$scope.PKM.target().name}`, 2);
                                                ACTIONS.ANIMATION.THROWNATURAL('Pokeball_' + $scope.PKM.target().quality,
                                                    $scope.BATTLEOBJS.ENEMY.body.x,
                                                    $scope.BATTLEOBJS.ENEMY.body.y,
                                                    POKEMONBATTLE.XS($scope.BATTLEOBJS.TARGET.body.x + ($scope.BATTLEOBJS.TARGET.body.width / 2)),
                                                    POKEMONBATTLE.YS($scope.BATTLEOBJS.TARGET.body.y + ($scope.BATTLEOBJS.TARGET.body.height / 2)),
                                                    true,
                                                    function () {
                                                        ACTIONS.ANIMATION.PLAYNATURAL($scope.PKM.target().superShiny ? 'SuperShiny' : ($scope.PKM.target().shiny ? 'Starts' : 'OutPokeball'),
                                                            POKEMONBATTLE.XS($scope.BATTLEOBJS.TARGET.body.x + ($scope.BATTLEOBJS.TARGET.body.width / 2)),
                                                            POKEMONBATTLE.YS($scope.BATTLEOBJS.TARGET.body.y + ($scope.BATTLEOBJS.TARGET.body.height / 2)),
                                                            function () {
                                                                ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.TARGET.body, 0.3, 1);
                                                                ACTIONS.SOUND.PLAY($scope.PKM.target().cryUrl, SOUNDS.system);
                                                            }
                                                        )
                                                        ;
                                                    });
                                            }, 500);
                                        } else {
                                            $scope.BATTLEOBJS.TARGET = POKEMONBATTLE.TARGET($scope);
                                            ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.TARGET.body, 0.3, 1);
                                        }
                                    });
                            }
                        )
                        ;
                    }, 1000);
                });
            });


        });
    },
    CALCS: {

        MULTIPLIER: function (types, moveType, intt) {
            var effectives = ["=0", "/4", "/2", "*1", "*2", "*4"];
            var multiplier = 3;
            for (var type of types) {
                var taken = APIS.TYPES[type].damageTaken[moveType];
                if (taken === 1)
                    multiplier++;
                if (taken === 2)
                    multiplier--;
                if (taken === 3) {
                    multiplier = 0;
                    break;
                }
            }
            if (intt)
                return multiplier;
            else
                return effectives[multiplier];
        },
        /**
         * @return {number}
         */
        DAMAGE: function ($scope, info, critial, base, last) {
            var damage = 0;
            var ata = "atk";
            var def = "def";
            if (info.move.useSourceDefensiveAsOffensive)
                ata = "def";

            if (info.move.category === "Status")
                return damage;
            if (info.move.category === "Special") {
                ata = "spa";
                def = "spd";
                if (info.move.useSourceDefensiveAsOffensive)
                    ata = "spd";
            }
            var fata = $scope.PKM.stat(info.pokemonFriend, ata);

            if (info.move.num === 251) {
                var prota = info.pokemonFriend;
                for (var po of info.team) {
                    if (fata < $scope.PKM.stat(po, "atk")) {
                        fata = $scope.PKM.stat(po, "atk");
                        prota = po;
                    }
                }
                ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} ha tomado la fuerza de ${prota.name}`);
            }


            var tdef = $scope.PKM.stat(info.pokemonTarget, def) / 2;
            var multiplier = POKEMONBATTLE.CALCS.MULTIPLIER(info.pokemonTarget.types, info.move.type);


            if (base)
                tdef = 0;

            var calc = ((fata - tdef) + info.move.basePower);
            calc = eval(`calc${multiplier}`);
            if (critial)
                calc += (calc / 3);

            damage = calc;


            var penaltyType = 1;
            penaltyType -= info.pokemonFriend.types.indexOf(info.move.type) !== -1 ? 0 : 0.25;
            if (info.pokemonFriend.types.indexOf(info.move.type) === -1)
                for (var type of info.pokemonFriend.types) {
                    var taken = APIS.TYPES[type].damageTaken[info.move.type];
                    if (taken === 1)
                        penaltyType -= 0.25;
                }

            damage = calc * penaltyType;

            var hits = 1;
            if (info.move.multihit) {
                if (Array.isArray(info.move.multihit)) {
                    hits = getRandomIntRange(info.move.multihit[0], info.move.multihit[1]);
                } else {
                    hits = info.move.multihit;
                }
            }

            damage *= hits;
            if (hits > 1) {
                for (var h = 1; h <= hits; h++) {
                    ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} ha dado ${hits} golpes!`);
                    $scope.play("Cancel", SOUNDS.system);
                }
            }

            if (info.pokemonTarget.battle.status === "auroraveil") {
                ACTIONS.MESSAGE.NOTI(`${info.pokemonTarget.name} ha reducido daño por auroraveil!`);
                damage = damage / 2;
            }

            if (info.pokemonFriend.battle.status === "bide") {
                if (info.pokemonFriend.battle.statusTurn >= 2) {
                    info.pokemonFriend.battle.statusTurn = 0;
                    info.pokemonFriend.battle.status = undefined;
                    damage = damage * 2;
                }
            }

            if (info.pokemonFriend.battle.gigamax) {
                if (info.move.gmaxPower) {
                    damage += info.move.gmaxPower;
                }
                damage = damage * 2;
                if (info.move.num === 782) {
                    damage = damage * 2;
                }
                if (info.move.num === 781) {
                    damage = damage * 2;
                }
            }
            if (info.move.num === 754) {
                if (!last) {
                    damage = damage * 2;
                }
            }

            if (info.move.num === 362) {
                if ($scope.PKM.stat(info.pokemonFriend, "hp") <= 50) {
                    damage = damage * 2;
                }
            }

            if (info.move.flags) {
                if (info.move.flags.mirror) {
                    if (last) {
                        if (info.move.shortDesc.indexOf("doubles") !== -1) {
                            ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} aumento en venganza!`);
                            damage = damage * 2;
                        }
                    }
                }
            }

            if (info.move.recoil) {
                var recoil = damage * (info.move.recoil[0] / info.move.recoil[1]);
                $scope.PKM.stat(info.pokemonFriend, "hp", recoil);
                ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} se auto dañó!`);
            }

            console.log(info.move);
            console.log("hits", hits);
            console.log("power", info.move.basePower, "ata", fata, "def", tdef, "damage", damage, "effectives", multiplier, "penaltyType", penaltyType, "base", base);
            return damage;
        },
        /**
         * @return {boolean}
         */
        IsMISS: function ($scope, info) {
            if (info.move.accuracy === true)
                return false;

            for (var type of info.pokemonTarget.types) {
                var taken = APIS.TYPES[type].damageTaken[info.move.type];
                if (taken === 3) {
                    return true;
                }
            }

            var moveAccuracy = 100 - info.move.accuracy;
            var pokemonAcur = 100 - $scope.PKM.stat(info.pokemonFriend, "accuracy");
            var targetEvasion = $scope.PKM.stat(info.pokemonTarget, "evasion");
            var ratio = 5 + (moveAccuracy + pokemonAcur) + targetEvasion;
            console.log("miss ratio", ratio, "enemy evasion", targetEvasion);
            var accept = getRandomIntRange(0, 100);
            return accept > (100 - ratio);
        },
        /**
         * @return {boolean}
         */
        IsCRITICAL: function (info) {
            if (info.pokemonTarget.battle.effect)
                if (info.pokemonTarget.battle.effect.onCriticalHit) {
                    if (info.pokemonTarget.battle.effect.duration > 0) {
                        return false;
                    } else {
                        delete info.pokemonTarget.battle.effect;
                    }
                }

            if (info.pokemonTarget.battle.effect)
                if (info.pokemonTarget.battle.effect.onCriticalHit) {
                    if (info.pokemonTarget.battle.effect.duration > 0) {
                        return false;
                    } else {
                        delete info.pokemonTarget.battle.effect;
                    }
                }

            var ratio = 5;
            if (info.move.critRatio)
                ratio = info.move.critRatio * 10;

            console.log("crit ratio", ratio);
            var accept = getRandomIntRange(0, 100);
            return accept > (100 - ratio);
        },
        IsWORKS: function (info) {

        },
        /**
         * @return {string}
         */
        VolatileStatus: function (info, $scope, last) {

            var MeMulti = POKEMONBATTLE.CALCS.MULTIPLIER(info.pokemonFriend.types, info.move.type) === "*0";
            var SuMulti = POKEMONBATTLE.CALCS.MULTIPLIER(info.pokemonTarget.types, info.move.type) === "*0";

            var prob = getRandomIntRange(0, 100);
            if (info.move.secondary) {
                if (info.move.secondary.volatileStatus) {
                    var chance = info.move.secondary.chance;
                    if (prob > (100 - chance)) {
                        return info.move.secondary.volatileStatus;
                    }
                }
            }

            if (info.move.secondary) {
                if (info.move.target === "normal") {
                    if (info.move.secondary.status) {
                        var chance = info.move.secondary.chance;
                        if (prob > (100 - chance)) {
                            info.pokemonTarget.battle.statusTurn = 0;
                            info.pokemonTarget.battle.status = info.move.secondary.status;
                            info.pokemonTarget.battle.statusType = info.move.type;
                            info.pokemonTarget.battle.statusCondition = "bad";
                        }
                    }
                }
                if (info.move.target === "self" || info.move.target.toLowerCase().indexOf("ally") !== -1) {
                    if (info.move.secondary.status) {
                        var chance = info.move.secondary.chance;
                        if (prob > (100 - chance)) {
                            info.pokemonFriend.battle.statusTurn = 0;
                            info.pokemonFriend.battle.status = info.move.secondary.status;
                            info.pokemonFriend.battle.statusType = info.move.type;
                            info.pokemonFriend.battle.statusCondition = "good";
                        }
                    }
                }
            }

            if (last) {
                if ($scope.PKM.lastMove) {
                    if (info.move.num === 690) {
                        if ($scope.PKM.lastMove.category === "Physical") {
                            info.pokemonTarget.battle.statusTurn = 0;
                            info.pokemonTarget.battle.status = "brn";
                            info.pokemonTarget.battle.statusType = "Fire";
                            info.pokemonTarget.battle.statusCondition = "bad";
                        }
                    }
                }
            }
            if (info.move.volatileStatus) {
                if (info.move.target === "self" || info.move.target.toLowerCase().indexOf("ally") !== -1) {
                    if (MeMulti)
                        return;
                    info.pokemonFriend.battle.statusTurn = 0;
                    info.pokemonFriend.battle.status = info.move.volatileStatus;
                    info.pokemonFriend.battle.statusType = info.move.type;
                    info.pokemonFriend.battle.statusCondition = "good";
                } else {
                    if (SuMulti)
                        return;
                    info.pokemonTarget.battle.statusTurn = 0;
                    info.pokemonTarget.battle.status = info.move.volatileStatus;
                    info.pokemonTarget.battle.statusType = info.move.type;
                    info.pokemonTarget.battle.statusCondition = "bad";
                }
            }
            if (info.move.self) {
                if (info.move.self.sideCondition) {
                    if (MeMulti)
                        return;
                    info.pokemonFriend.battle.statusTurn = 0;
                    info.pokemonFriend.battle.status = info.move.self.sideCondition;
                    info.pokemonFriend.battle.statusType = info.move.type;
                    info.pokemonFriend.battle.statusCondition = "good";
                }

            }

            if (info.move.sideCondition) {
                if (info.move.target === "self" || info.move.target.toLowerCase().indexOf("ally") !== -1) {
                    if (MeMulti)
                        return;
                    info.pokemonFriend.battle.statusTurn = 0;
                    info.pokemonFriend.battle.status = info.move.sideCondition;
                    info.pokemonFriend.battle.statusType = info.move.type;
                    info.pokemonFriend.battle.statusCondition = "good";
                } else {
                    if (SuMulti)
                        return;
                    info.pokemonTarget.battle.statusTurn = 0;
                    info.pokemonTarget.battle.status = info.move.sideCondition;
                    info.pokemonTarget.battle.statusType = info.move.type;
                    info.pokemonTarget.battle.statusCondition = "bad";
                }
            }

            if (info.pokemonTarget.battle.status) {
                if (SuMulti)
                    return;
                if (info.pokemonTarget.battle.status === 'confusion') {
                    info.pokemonTarget.battle.statusType = "Psychic";
                    info.pokemonTarget.battle.statusCondition = "bad";
                }
            }

            if (info.pokemonFriend.battle.status)
                if (MeMulti)
                    return;
            if (info.pokemonFriend.battle.status === 'confusion') {
                info.pokemonFriend.battle.statusType = "Psychic";
                info.pokemonFriend.battle.statusCondition = "bad";
            }
            return "";
        },
        Status: function (info, $scope, callback, knowstop) {
            var prob = getRandomIntRange(0, 100);
            var normalcallback = true;
            var twocallback = false;
            var neddanimation = false;
            if (info.pokemonFriend.battle.status) {

                if (!knowstop)
                    info.pokemonFriend.battle.statusTurn++;
                console.log("current Status ", info.pokemonFriend.battle.status, info.pokemonFriend.battle.statusType, info.pokemonFriend.battle.statusCondition);
                if (info.pokemonFriend.battle.status === "aquaring") {
                    if (knowstop) {
                        if (callback)
                            callback(false);
                        return;
                    }
                    neddanimation = true;
                    $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 16) * -1);
                }
                if (info.pokemonFriend.battle.status === "tox") {
                    if (knowstop) {
                        if (callback)
                            callback(false);
                        return;
                    }
                    neddanimation = true;
                    $scope.PKM.stat(info.pokemonFriend, "hp", (info.pokemonFriend.battle.statusTurn + 1) * 15);
                }
                if (info.pokemonFriend.battle.status === "brn") {
                    if (knowstop) {
                        if (callback)
                            callback(false);
                        return;
                    }
                    neddanimation = true;
                    $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 12));
                }
                if (info.pokemonFriend.battle.status === "par") {
                    if (prob > 50) {
                        if (knowstop) {
                            if (callback)
                                callback(true);
                            return;
                        }
                        info.pokemonFriend.battle.statusType = "Electric";
                        info.pokemonFriend.battle.statusCondition = "bad";
                        neddanimation = true;
                    }
                }

                if (info.pokemonFriend.battle.status === "confusion") {
                    var confprob = getRandomInt(100);
                    if ((info.pokemonFriend.battle.statusTurn * 10) > confprob) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        if (confprob > 50) {
                            if (knowstop) {
                                if (callback)
                                    callback(true);
                                return;
                            }
                            neddanimation = true;

                        }
                    }
                } else {

                }

                if (info.pokemonFriend.battle.status === "frz") {
                    if (prob > ((info.pokemonFriend.battle.statusTurn) * 10)) {
                        if (knowstop) {
                            if (callback)
                                callback(true);
                            return;
                        }
                        info.pokemonFriend.battle.statusType = "Ice";
                        info.pokemonFriend.battle.statusCondition = "bad";
                        neddanimation = true;
                    } else {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    }
                }

                if (info.pokemonFriend.battle.status === "attract") {
                    if (info.pokemonFriend.gender !== info.pokemonTarget.gender) {
                        if (prob > 50) {
                            if (knowstop) {
                                if (callback)
                                    callback(true);
                                return;
                            }
                            info.pokemonFriend.battle.statusType = "Fairy";
                            info.pokemonFriend.battle.statusCondition = "good";
                            neddanimation = true;
                        }
                    }
                }
                if (info.pokemonFriend.battle.status === "auroraveil") {
                    if (knowstop) {
                        if (callback)
                            callback(false);
                        return;
                    }
                    if (info.pokemonFriend.battle.statusTurn >= 6) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        neddanimation = true;
                    }
                }
                if (info.pokemonTarget.battle.status === "magiccoat") {
                    if (info.move.category === "Status") {
                        if (knowstop) {
                            if (callback)
                                callback(true);
                            return;
                        }
                    }
                    if (info.pokemonTarget.battle.statusTurn >= 2) {
                        info.pokemonTarget.battle.statusTurn = 0;
                        info.pokemonTarget.battle.status = undefined;
                    }
                }
                if (info.pokemonFriend.battle.status === "banefulbunker") {
                    if (knowstop) {
                        if (callback)
                            callback(false);
                        return;
                    }
                    if (info.pokemonFriend.battle.statusTurn >= 2) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    }
                }
                if (info.pokemonFriend.battle.status === "reflect") {
                    if (knowstop) {
                        if (callback)
                            callback(false);
                        return;
                    }
                    if (info.pokemonFriend.battle.statusTurn >= 5) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        neddanimation = true;
                    }
                }
                normalcallback = false;

                if (neddanimation) {
                    ACTIONS.ANIMATION.PLAYNATURAL("Generic_" + info.pokemonFriend.battle.statusType + "_" + info.pokemonFriend.battle.statusCondition,
                        POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                        POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                        function () {
                            if (!twocallback)
                                if (callback)
                                    callback(false);
                            twocallback = true;
                        }, undefined, undefined, undefined, undefined, undefined);
                } else {
                    setTimeout(function () {
                        if (!twocallback)
                            if (callback)
                                callback(false);
                        twocallback = true;
                    }, 1000)
                }

            } else {
                info.pokemonFriend.battle.statusTurn = 0;
            }
            if (normalcallback) {
                if (callback)
                    callback(false);
            }
        },
        MyEffect: function (info, $scope, critial, miss, callback) {
            if (miss) {
                if (callback)
                    callback();
                return;
            }
            var prob = getRandomIntRange(0, 100);
            var normalcallback = true;
            var twocallback = false;

            if (info.move.num === 187) {
                $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.hpno(info.pokemonFriend) / 2));
            }

            if (info.move.num === 367) {
                var stats = ["atk", "def", "spa", "spd", "spe"];
                var random = randomArray(stats);
                var animation = random + "up";
                console.log("stats", animation);
                $scope.PKM.stat(info.pokemonFriend, random, -2);
                normalcallback = false;
                ACTIONS.ANIMATION.PLAYNATURAL(animation,
                    POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                    POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                    function () {
                        if (!twocallback)
                            if (callback)
                                callback();
                        twocallback = true;
                    }, undefined, undefined, undefined, undefined, undefined);
            }
            if (info.move.num === 312) {
                for (var pokemon in info.team) {
                    info.pokemonTarget.battle.status = undefined;
                }
            }
            info.pokemonTarget.battle.canChange = true;
            if (info.move.preventChange === true) {
                info.pokemonTarget.battle.canChange = false;
            }

            if (info.move.boosts) {
                if (info.move.target === "self")
                    for (var sec in info.move.boosts) {
                        var item = info.move.boosts[sec];
                        $scope.PKM.stat(info.pokemonFriend, sec, item * -1);
                        var animation = sec + "up";
                        if (item < 0)
                            animation = sec + "down";
                        console.log("stats", animation);
                        normalcallback = false;
                        ACTIONS.ANIMATION.PLAYNATURAL(animation,
                            POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                            POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                            function () {
                                if (!twocallback)
                                    if (callback)
                                        callback();
                                twocallback = true;
                            }, undefined, undefined, undefined, undefined, undefined);

                    }
                if (info.move.target !== "self")
                    for (var sec in info.move.boosts) {
                        var item = info.move.boosts[sec];
                        $scope.PKM.stat(info.pokemonTarget, sec, item * -1);
                        var animation = sec + "up";
                        if (item < 0)
                            animation = sec + "down";
                        console.log("stats", animation);
                        normalcallback = false;
                        ACTIONS.ANIMATION.PLAYNATURAL(animation,
                            POKEMONBATTLE.XS(info.target.body.x + (info.target.body.width / 2)),
                            POKEMONBATTLE.YS(info.target.body.y + (info.target.body.height / 2)),
                            function () {
                                if (!twocallback)
                                    if (callback)
                                        callback();
                                twocallback = true;
                            }, undefined, undefined, undefined, undefined, undefined);

                    }
            }
            if (info.move.secondary) {
                console.log("calc stats", info.move.secondary);
                var chance = info.move.secondary.chance;
                //chance = 100;
                if (prob > (100 - chance)) {
                    if (info.move.secondary.boosts)
                        for (var sec in info.move.secondary.boosts) {
                            var item = info.move.secondary.boosts[sec];
                            $scope.PKM.stat(info.pokemonTarget, sec, item * -1);
                            var animation = sec + "up";
                            if (item < 0)
                                animation = sec + "down";
                            console.log("stats enemy", animation);
                            normalcallback = false;

                            ACTIONS.ANIMATION.PLAYNATURAL(animation,
                                POKEMONBATTLE.XS(info.target.body.x + (info.target.body.width / 2)),
                                POKEMONBATTLE.YS(info.target.body.y + (info.target.body.height / 2)),
                                function () {
                                    if (!twocallback)
                                        if (callback)
                                            callback();
                                    twocallback = true;
                                }, undefined, undefined, undefined, undefined, undefined);

                        }
                    if (info.move.secondary.self)
                        if (info.move.secondary.self.boosts)
                            for (var sec in info.move.secondary.self.boosts) {
                                var item = info.move.secondary.self.boosts[sec];
                                $scope.PKM.stat(info.pokemonFriend, sec, item * -1);
                                var animation = sec + "up";
                                if (item < 0)
                                    animation = sec + "down";
                                console.log("stats", animation);
                                normalcallback = false;
                                ACTIONS.ANIMATION.PLAYNATURAL(animation,
                                    POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                                    POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                                    function () {
                                        if (!twocallback)
                                            if (callback)
                                                callback();
                                        twocallback = true;
                                    }, undefined, undefined, undefined, undefined, undefined);

                            }
                }
            }
            if (info.move.flags)
                if (info.move.flags.heal) {
                    if (info.move.drain) {
                        var healme = POKEMONBATTLE.CALCS.DAMAGE($scope, info, critial, true, false);
                        var percent = 100;
                        percent = percent / info.move.drain[1];
                        healme = (healme * percent) / 100;
                        $scope.PKM.stat(info.pokemonFriend, "hp", healme * -1);
                        console.log("heal", healme);
                        normalcallback = false;
                        ACTIONS.ANIMATION.PLAYNATURAL("Heal",
                            POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                            POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                            function () {
                                if (!twocallback)
                                    if (callback)
                                        callback();
                                twocallback = true;
                            }, undefined, undefined, undefined, undefined, undefined);
                    }
                }

            if (info.move.target.toLowerCase().indexOf("ally") !== -1) {
                if (info.move.effect) {
                    info.pokemonFriend.battle.effect = OSO(info.move.effect);
                    console.log("info.pokemonFriend.battle.effect", info.pokemonFriend.battle.effect);
                }
            }

            if (info.pokemonTarget.battle.effect) {
                if (info.pokemonTarget.battle.effect.duration > 0) {
                    info.pokemonTarget.battle.effect.duration--;
                    console.log("effect", info.pokemonTarget.battle.effect);
                } else {
                    console.log("down effect", info.pokemonTarget.battle.effect);
                    delete info.pokemonTarget.battle.effect;
                }
            }


            if (normalcallback) {
                if (callback)
                    callback();
            }
        },
        GIGA: function (info, $scope, pokemon, friend, callback) {
            var isEnemy = info.isEnemy;
            if ($scope.PKM.hp(info.pokemonFriend) <= 0) {
                if (callback)
                    callback();
                return;
            }
            var prob = getRandomInt(100);
            if (pokemon.battle.gigamax) {
                pokemon.battle.gigamax = false;
                ACTIONS.ANIMATION.THROWNATURAL("gigamaxdown",
                    POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                    POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                    POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                    POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                    true, function () {
                        var realUrl = pokemon.imageUrl;
                        if (!isEnemy)
                            realUrl = realUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/');
                        var gigabound = $scope.getResource(realUrl.replace(`${pokemon.name}.gif`, `${pokemon.giga}.gif`));

                        friend.dom.src = realUrl;

                        var hdif = gigabound.height - friend.body.height;
                        var wdif = gigabound.width - friend.body.width;
                        friend.body.x += wdif;
                        friend.body.y += hdif;
                        if (callback)
                            callback();
                    }, undefined, undefined, undefined, undefined, undefined);
                return;
            }
            if (pokemon.giga) {
                if (prob > 90) {
                    pokemon.battle.gigamax = true;
                    ACTIONS.ANIMATION.THROWNATURAL("gigamax",
                        POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                        POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                        POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                        POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                        true, function () {
                            var realUrl = pokemon.imageUrl;
                            if (!isEnemy)
                                realUrl = realUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/');
                            friend.dom.src = realUrl.replace(`${pokemon.name}.gif`, `${pokemon.giga}.gif`);
                            var gigabound = $scope.getResource(realUrl.replace(`${pokemon.name}.gif`, `${pokemon.giga}.gif`));
                            var hdif = gigabound.height - friend.body.height;
                            var wdif = gigabound.width - friend.body.width;
                            friend.body.x -= wdif;
                            friend.body.y -= hdif;

                            if (callback)
                                callback();
                        }, undefined, undefined, undefined, undefined, undefined);
                    return;
                }
            }
            if (callback)
                callback();
        }
    },
    CALCANIMATION: function ($scope, result, info, callback, last) {
        POKEMONBATTLE.CALCS.GIGA(info, $scope, info.pokemonFriend, info.friend, function () {
            if (result.miss) {
                $scope.play("Jump", SOUNDS.system);
                ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} falló!`);
                ACTIONS.GAME.SHAKE(info.target.body, 100, 50, 1, function () {
                    if (callback)
                        callback(false);
                });
                return;
            }
            if (result.critical) {
                ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} dió un golpe crítico!`);
                ACTIONS.ANIMATION.PLAYNATURAL('b_rage', POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                    POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)));
            }
            if (last !== true) {
                if (result.volatile === "flinch") {
                    ACTIONS.MESSAGE.NOTI(`${info.pokemonTarget.name} ha sido paralizado!`);
                    ACTIONS.ANIMATION.PLAYNATURAL("flinch",
                        POKEMONBATTLE.XS(info.target.body.x + (info.target.body.width / 2)),
                        POKEMONBATTLE.YS(info.target.body.y + (info.target.body.height / 2)),
                        function () {
                            if (callback)
                                callback(true);
                        }, undefined, undefined, undefined, undefined, undefined);
                    return;
                }
            }
            if (callback)
                callback(false);

        });
    },
    TURNING: function ($scope, info, callback, last) {

        if ($scope.PKM.hp(info.pokemonFriend) <= 0) {
            info.pokemonFriend.battle.status = undefined;
            POKEMONBATTLE.RUNLOSE($scope);
            if (callback)
                callback({critical: false, miss: true, damage: 0});
            return;
        }
        info.hero.body.gotoAndPlay(info.emotion);
        if (info.isEnemy) {
            $scope.PKM.talk(`Usa ${info.move.name}`, 2);
            if (info.move.num === 226) {
                if ($scope.BATTLEOBJS.TARGETS.length > 1) {

                    var temp = OSO($scope.BATTLEOBJS.TARGETS[0]);
                    $scope.BATTLEOBJS.TARGETS[0] = OSO($scope.BATTLEOBJS.TARGETS[1]);
                    $scope.BATTLEOBJS.TARGETS[1] = temp;

                    POKEMONBATTLE.CHANGETARGET($scope, 0, false, function () {
                        setTimeout(function () {
                            POKEMONBATTLE.RUNLOSE($scope);
                            if (callback)
                                callback(result);
                        }, 2000);
                    });
                }
                return;
            }
        }

        if (info.move.num === 274) {
            var pokemonRandom = randomObject(info.team);
            var moveRandon = randomObject(pokemonRandom.moves);
            info.move = moveRandon;
        }


        console.log(info.move.name + "-----------------------------------------");
        var volatileStop = POKEMONBATTLE.CALCS.VolatileStatus(info, $scope, last);
        console.log("volatile", volatileStop);
        var critical = POKEMONBATTLE.CALCS.IsCRITICAL(info);
        console.log("critical", critical);
        var miss = POKEMONBATTLE.CALCS.IsMISS($scope, info);
        console.log("miss", miss);
        var damage = POKEMONBATTLE.CALCS.DAMAGE($scope, info, critical, false, last);


        if (info.pokemonTarget.battle.status)
            if (info.pokemonTarget.battle.status === "banefulbunker") {
                if (info.move.category === "Physical") {
                    info.pokemonFriend.battle.statusTurn = 0;
                    info.pokemonFriend.battle.status = "tox";
                    info.pokemonFriend.battle.statusType = "Poison";
                    info.pokemonFriend.battle.statusCondition = "bad";
                }
            }


        if (info.pokemonTarget.battle.status)
            if (info.pokemonTarget.battle.status === "reflect") {
                if (info.move.num === 280) {
                    info.pokemonTarget.battle.status = undefined;
                    info.pokemonTarget.battle.statusTurn = 0;
                } else {
                    if (info.move.category === "Physical") {
                        damage = damage / 2;
                        ACTIONS.MESSAGE.NOTI(`${info.pokemonTarget.name} ha reflejado daño!`);
                    }
                }
            }

        var result = {volatile: volatileStop, critical: critical, miss: miss, damage: damage, last: last};


        POKEMONBATTLE.CALCS.Status(info, $scope, function (statusstop) {
            if (statusstop) {
                console.log(info.move.name + "------------------------------------------");
                if (info.pokemonFriend.battle.status === "confusion")
                    $scope.PKM.stat(info.pokemonFriend, "hp", damage);
                POKEMONBATTLE.CALCS.Status(info, $scope, function () {
                    setTimeout(function () {
                        if ($scope.PKM.hp(info.pokemonTarget) <= 0) {
                            info.pokemonTarget.battle.status = undefined;
                            if (!info.isEnemy) {
                                POKEMONBATTLE.CHANGETARGET($scope, $scope.BATTLEOBJS.TARGETINDEX, true);
                            }
                        }
                        POKEMONBATTLE.RUNLOSE($scope);
                        if (callback)
                            callback(result);
                    }, 2100);
                });
            } else {
                POKEMONBATTLE.ATTACK($scope, info.move, info.hero, info.enemy, info.friend, info.target,
                    function () {
                        POKEMONBATTLE.CALCS.MyEffect(info, $scope, critical, miss, function () {
                            if (!miss) {
                                $scope.PKM.stat(info.pokemonTarget, "hp", damage);
                            }
                            console.log(info.move.name + "-----------------------------------------");
                            POKEMONBATTLE.CALCS.Status(info, $scope, function () {
                                setTimeout(function () {
                                    if ($scope.PKM.hp(info.pokemonTarget) <= 0) {
                                        info.pokemonTarget.battle.status = undefined;
                                        if (!info.isEnemy) {
                                            POKEMONBATTLE.CHANGETARGET($scope, $scope.BATTLEOBJS.TARGETINDEX, true);
                                        }
                                    }
                                    $scope.PKM.lastMove = info.move;
                                    POKEMONBATTLE.RUNLOSE($scope);
                                    if (callback)
                                        callback(result);
                                }, 2000);
                            });
                        });
                    });
            }
        }, true);


    },
    /**
     * @return {boolean}
     */
    IAMOVE: function ($scope) {
        var moves = $scope.PKM.target().moves;
        var index = getRandomInt(3);
        var pokemon = $scope.PKM.friend();
        var count = 0;

        for (var move of moves) {
            var prob = 20;
            var multiplier = POKEMONBATTLE.CALCS.MULTIPLIER(pokemon.types, move.type, true);
            if (multiplier > 3) {
                prob += 30;
            }
            if (move.category !== "Status") {
                prob += 30;
            }
            if (move.boosts) {
                prob += 10;
            }
            if (move.secondary) {
                prob += 10;
            }
            if (multiplier < 3) {
                prob -= 50;
            }
            if (multiplier < 1) {
                prob -= 10;
            }
            var proby = getRandomInt(100);
            if (proby <= prob) {
                return count;
            }
            count++;
        }
        return index;
    },
    IACHANGE: function ($scope) {
        if ($scope.PKM.target().battle.status === 'partiallytrapped') {
            return {change: false, index: 0};
        }
        var enemyChange = false;
        var attindex = 1;
        var reazons = 0;
        //change logic
        if ($scope.BATTLEOBJS.TARGETS.length > 1) {
            if ($scope.PKM.target().power < ($scope.PKM.friend().power - 50)) {
                console.log("es mucho mas poderoso que yo");
                reazons++;
            }
            if ($scope.PKM.target().power < ($scope.PKM.friend().power - 100)) {
                console.log("es mucho mas poderoso que yo 2");
                reazons++;
            }
            var multiplier = POKEMONBATTLE.CALCS.MULTIPLIER($scope.PKM.target().types, $scope.PKM.friend().types[0]);

            if (["*2", "*4"].indexOf(multiplier) !== -1) {
                reazons += 2;
                console.log("me debilitan");
            }
            var index = 0;
            var mydesitions = false;
            for (var mypok of $scope.BATTLEOBJS.TARGETS) {
                if (index === 0) {
                    index++;
                    continue;
                }
                var multiplier = POKEMONBATTLE.CALCS.MULTIPLIER($scope.PKM.friend().types, mypok.types[0]);
                if (["*2", "*4"].indexOf(multiplier) !== -1) {
                    reazons += 2;
                    attindex = index;
                    mydesitions = true;
                    console.log("tengo que lo debilite");
                    break;
                }
            }
            var candoSomething = false;
            for (var mov of $scope.PKM.target().moves) {
                var multiplier = POKEMONBATTLE.CALCS.MULTIPLIER($scope.PKM.friend().types, mov.type);
                if (["*2", "*4"].indexOf(multiplier) !== -1) {
                    candoSomething = true;
                    break;
                }
            }
            var enemyCanDoSomeThing = false;
            for (var mov of $scope.PKM.friend().moves) {
                var multiplier = POKEMONBATTLE.CALCS.MULTIPLIER($scope.PKM.target().types, mov.type);
                if (["*2", "*4"].indexOf(multiplier) !== -1) {
                    enemyCanDoSomeThing = true;
                    break;
                }
            }
            if (!candoSomething) {
                console.log("no pudeo hacer nada");
                reazons++;
            }
            if (enemyCanDoSomeThing) {
                console.log("me pueden debilitar");
                reazons++;
            }

            var prob = getRandomIntRange(3, 10);

            if (prob < reazons) {
                enemyChange = true;
                if (!mydesitions) {
                    var randomIndex = getRandomIntRange(1, $scope.BATTLEOBJS.TARGETS.length - 1);
                    attindex = randomIndex;
                }
            }
            console.log("voy a cambiar?", prob, reazons, enemyChange);
        }
        return {change: enemyChange, index: attindex};
    },
    RUNLOSE: function ($scope) {
        var onealive = false;
        for (var isdead of $scope.session.pokemons) {
            if ($scope.PKM.hp(isdead) > 0)
                onealive = true;
        }
        if (!onealive)
            POKEMONBATTLE.END($scope, false);
    },
    CLEARSTATS: function (pokemon) {
        var stats = ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"];
        for (var stat of stats)
            pokemon.battle.stats[stat] = 0;
    },
    RUNTURN: function ($scope, move, change) {

        $scope.PKM.pokemonDetail = false;
        $scope.PKM.menu = false;
        $scope.PKM.mainMenu = false;

        if (move)
            if ([226, 516].indexOf(move.num) !== -1) {
                $scope.BATTLEOBJS.batonpass = true;
                $scope.PKM.mainMenu = true;
                return;
            }

        setTimeout(function () {
            var enemyAction = {
                move: OSO($scope.PKM.target().moves[POKEMONBATTLE.IAMOVE($scope)]),
                hero: $scope.BATTLEOBJS.ENEMY,
                enemy: $scope.BATTLEOBJS.HERO,
                friend: $scope.BATTLEOBJS.TARGET,
                target: $scope.BATTLEOBJS.FRIEND,
                emotion: POKEMONBATTLE.FORMS.point_bad,
                isEnemy: true,
                pokemonFriend: $scope.PKM.target(),
                pokemonTarget: $scope.PKM.friend(),
                targetParty: $scope.BATTLEOBJS.friendParty,
                friendParty: $scope.BATTLEOBJS.targetParty,
                team: $scope.BATTLEOBJS.TARGETS
            };
            var friendAction = {
                move: OSO(move),
                hero: $scope.BATTLEOBJS.HERO,
                enemy: $scope.BATTLEOBJS.ENEMY,
                friend: $scope.BATTLEOBJS.FRIEND,
                target: $scope.BATTLEOBJS.TARGET,
                emotion: POKEMONBATTLE.FORMS.point_bad,
                pokemonFriend: $scope.PKM.friend(),
                pokemonTarget: $scope.PKM.target(),
                friendParty: $scope.BATTLEOBJS.friendParty,
                targetParty: $scope.BATTLEOBJS.targetParty,
                team: $scope.session.pokemons
            };


            if (change !== undefined) {
                var whyisDead = $scope.PKM.hp($scope.PKM.friend()) <= 0;
                if ($scope.BATTLEOBJS.batonpass) {
                    var passStats = OSO($scope.PKM.friend().battle.stats);
                    for (var stat in passStats) {
                        if (stat !== "hp" && stat !== "status") {
                            $scope.session.pokemons[change].battle.stats[stat] = passStats[stat];
                        }
                    }
                }
                POKEMONBATTLE.CHANGEPOKEMON($scope, change, function () {
                    if ($scope.PKM.target().battle.status === "attract") {
                        $scope.PKM.target().battle.status = undefined;
                    }
                    setTimeout(function () {
                        enemyAction = {
                            move: OSO($scope.PKM.target().moves[POKEMONBATTLE.IAMOVE($scope)]),
                            hero: $scope.BATTLEOBJS.ENEMY,
                            enemy: $scope.BATTLEOBJS.HERO,
                            friend: $scope.BATTLEOBJS.TARGET,
                            target: $scope.BATTLEOBJS.FRIEND,
                            emotion: POKEMONBATTLE.FORMS.point_bad,
                            isEnemy: true,
                            pokemonFriend: $scope.PKM.target(),
                            pokemonTarget: $scope.PKM.friend(),
                            targetParty: $scope.BATTLEOBJS.friendParty,
                            friendParty: $scope.BATTLEOBJS.targetParty,
                            team: $scope.BATTLEOBJS.TARGETS
                        };
                        if (!whyisDead) {
                            POKEMONBATTLE.TURNING($scope, enemyAction, function (result) {
                                POKEMONBATTLE.CALCANIMATION($scope, result, enemyAction, function (stop) {
                                    $scope.PKM.mainMenu = true;
                                }, true);
                            }, true);
                        } else {
                            $scope.PKM.friend().battle.status = undefined;
                            $scope.PKM.mainMenu = true;
                        }
                    }, 1000);
                });
            } else {
                var enemyChange = POKEMONBATTLE.IACHANGE($scope);
                if (enemyChange.change) {
                    var temp = OSO($scope.BATTLEOBJS.TARGETS[0]);
                    $scope.BATTLEOBJS.TARGETS[0] = OSO($scope.BATTLEOBJS.TARGETS[enemyChange.index]);
                    $scope.BATTLEOBJS.TARGETS[enemyChange.index] = temp;

                    POKEMONBATTLE.CHANGETARGET($scope, $scope.BATTLEOBJS.TARGETINDEX, false, function () {

                        setTimeout(function () {
                            friendAction = {
                                move: OSO(move),
                                hero: $scope.BATTLEOBJS.HERO,
                                enemy: $scope.BATTLEOBJS.ENEMY,
                                friend: $scope.BATTLEOBJS.FRIEND,
                                target: $scope.BATTLEOBJS.TARGET,
                                emotion: POKEMONBATTLE.FORMS.point_bad,
                                pokemonFriend: $scope.PKM.friend(),
                                pokemonTarget: $scope.PKM.target(),
                                friendParty: $scope.BATTLEOBJS.friendParty,
                                targetParty: $scope.BATTLEOBJS.targetParty,
                                team: $scope.session.pokemons
                            };
                            POKEMONBATTLE.TURNING($scope, friendAction, function (result) {
                                POKEMONBATTLE.CALCANIMATION($scope, result, friendAction, function (stop) {
                                    $scope.PKM.mainMenu = true;
                                }, true);
                            }, true);
                        }, 1000);
                    });

                } else {
                    var enemySpeed = $scope.PKM.stat($scope.PKM.target(), 'spd') * (enemyAction.move.priority + 1);
                    var friendSpeed = $scope.PKM.stat($scope.PKM.friend(), 'spd') * (friendAction.move.priority + 1);
                    var primero = {};
                    var segundo = {};

                    if (enemySpeed > friendSpeed) {
                        primero = enemyAction;
                        segundo = friendAction;
                    } else {
                        segundo = enemyAction;
                        primero = friendAction;
                    }
                    POKEMONBATTLE.TURNING($scope, primero, function (result) {
                        POKEMONBATTLE.CALCANIMATION($scope, result, primero, function (stop) {
                            console.log("stop anima ", stop);
                            if (stop === false) {
                                POKEMONBATTLE.TURNING($scope, segundo, function (result) {
                                    POKEMONBATTLE.CALCANIMATION($scope, result, segundo, function () {
                                        $scope.PKM.mainMenu = true;
                                    }, true);
                                }, true);
                            } else {
                                $scope.PKM.mainMenu = true;
                            }
                        });
                    });
                }
            }
        }, 1500);

    },
    CHANGEPOKEMON: function ($scope, index, callback) {
        ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.FRIEND.body, 0.2, 0);
        $scope.BATTLEOBJS.HERO.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
        var animationBack = $scope.BATTLEOBJS.batonpass ? "BatonAnimation" : "GetBack";
        $scope.BATTLEOBJS.batonpass = false;
        POKEMONBATTLE.CLEARSTATS($scope.PKM.friend());
        ACTIONS.ANIMATION.PLAYNATURAL($scope.PKM.friend().superShiny ? animationBack : ($scope.PKM.friend().shiny ? animationBack : animationBack),
            POKEMONBATTLE.XS($scope.BATTLEOBJS.FRIEND.body.x + ($scope.BATTLEOBJS.FRIEND.body.width / 2)),
            POKEMONBATTLE.YS($scope.BATTLEOBJS.FRIEND.body.y + ($scope.BATTLEOBJS.FRIEND.body.height / 2)),
            function () {
                $scope.BATTLEOBJS.FRIENDINDEX = index;
                $scope.BATTLEOBJS.FRIEND = POKEMONBATTLE.FRIEND($scope);
                $scope.BATTLEOBJS.HERO.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
                ACTIONS.ANIMATION.THROWNATURAL('Pokeball_' + $scope.PKM.friend().quality,
                    $scope.BATTLEOBJS.HERO.body.x,
                    $scope.BATTLEOBJS.HERO.body.y,
                    POKEMONBATTLE.XS($scope.BATTLEOBJS.FRIEND.body.x + ($scope.BATTLEOBJS.FRIEND.body.width / 2)),
                    POKEMONBATTLE.YS($scope.BATTLEOBJS.FRIEND.body.y + ($scope.BATTLEOBJS.FRIEND.body.height / 2)),
                    true,
                    function () {
                        ACTIONS.ANIMATION.PLAYNATURAL($scope.PKM.friend().superShiny ? 'SuperShiny' : ($scope.PKM.friend().shiny ? 'Starts' : 'OutPokeball'),
                            POKEMONBATTLE.XS($scope.BATTLEOBJS.FRIEND.body.x + ($scope.BATTLEOBJS.FRIEND.body.width / 2)),
                            POKEMONBATTLE.YS($scope.BATTLEOBJS.FRIEND.body.y + ($scope.BATTLEOBJS.FRIEND.body.height / 2)),
                            function () {
                                ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.FRIEND.body, 0.3, 1);
                                ACTIONS.SOUND.PLAY($scope.PKM.friend().cryUrl, SOUNDS.system);
                                setTimeout(function () {
                                    if (callback)
                                        callback();
                                }, 1000);
                            });
                    });

            });
    },
    CHANGETARGET: function ($scope, index, isdead, callback) {
        if (isdead) {
            if ($scope.BATTLEOBJS.TARGETS.length === 1) {
                POKEMONBATTLE.END($scope, true);
                return;
            }
            $scope.BATTLEOBJS.TARGETS.splice($scope.BATTLEOBJS.TARGETINDEX, 1);
        }
        $scope.PKM.pokemonDetail = false;
        $scope.PKM.menu = false;
        POKEMONBATTLE.CLEARSTATS($scope.PKM.target());
        ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.TARGET.body, 0.2, 0);
        $scope.BATTLEOBJS.ENEMY.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
        ACTIONS.ANIMATION.PLAYNATURAL($scope.PKM.target().superShiny ? 'GetBack' : ($scope.PKM.target().shiny ? 'GetBack' : 'GetBack'),
            POKEMONBATTLE.XS($scope.BATTLEOBJS.TARGET.body.x + ($scope.BATTLEOBJS.TARGET.body.width / 2)),
            POKEMONBATTLE.YS($scope.BATTLEOBJS.TARGET.body.y + ($scope.BATTLEOBJS.TARGET.body.height / 2)),
            function () {
                $scope.BATTLEOBJS.TARGETINDEX = index;
                $scope.BATTLEOBJS.TARGET = POKEMONBATTLE.TARGET($scope);
                $scope.BATTLEOBJS.ENEMY.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
                ACTIONS.ANIMATION.THROWNATURAL('Pokeball_' + $scope.PKM.target().quality,
                    $scope.BATTLEOBJS.ENEMY.body.x,
                    $scope.BATTLEOBJS.ENEMY.body.y,
                    POKEMONBATTLE.XS($scope.BATTLEOBJS.TARGET.body.x + ($scope.BATTLEOBJS.TARGET.body.width / 2)),
                    POKEMONBATTLE.YS($scope.BATTLEOBJS.TARGET.body.y + ($scope.BATTLEOBJS.TARGET.body.height / 2)),
                    true,
                    function () {
                        ACTIONS.ANIMATION.PLAYNATURAL($scope.PKM.target().superShiny ? 'SuperShiny' : ($scope.PKM.target().shiny ? 'Starts' : 'OutPokeball'),
                            POKEMONBATTLE.XS($scope.BATTLEOBJS.TARGET.body.x + ($scope.BATTLEOBJS.TARGET.body.width / 2)),
                            POKEMONBATTLE.YS($scope.BATTLEOBJS.TARGET.body.y + ($scope.BATTLEOBJS.TARGET.body.height / 2)),
                            function () {
                                ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.TARGET.body, 0.3, 1);
                                ACTIONS.SOUND.PLAY($scope.PKM.target().cryUrl, SOUNDS.system);
                                if (callback)
                                    callback();
                            });
                    });

            });
    },
    ATTACK: function ($scope, cmove, hero, enemy, friend, target, callback) {
        hero.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);

        var move = APIS.MOVES.filter(d => {
            return d.keyname === cmove.keyname
        });

        if (move.length > 0)
            move = move[0];

        var hows = [];
        if (move.animation)
            hows = move.animation.split(',');
        else {
            var genericPokemon = "throw";
            if (move.category === "Special" || move.category === "Status")
                genericPokemon = "self";
            var genericAction = "throw";
            if (move.category === "Physical")
                genericAction = "side";
            if (move.category === "Status") {
                if (move.target === "self" || move.target.toLowerCase().indexOf("ally") !== -1)
                    genericAction = "self";
                else
                    genericAction = "side";
            }
            if (move.category === "Special") {
                if (move.target === "self" || move.target.toLowerCase().indexOf("ally") !== -1)
                    genericAction = "self";
                else
                    genericAction = "side";
            }
            if (move.isZ) {
                genericAction = "special";
            }

            var Addi = "";
            if (move.category === "Status")
                Addi = "Status";
            var genericAnimation = `Generic_${move.type}${Addi}`;

            var sufri = "shake";
            if (move.isZ) {
                sufri = "supershake";
            }

            var existanimation = $scope.animations[cmove.keyname];
            if (existanimation)
                genericAnimation = existanimation.name;

            var howsfinal = `${genericPokemon}:${genericAction}:${genericAnimation}:${sufri}`;
            if (move.drain) {
                howsfinal += "," + `${genericPokemon}:back:${genericAnimation}:${sufri}`;
                howsfinal += "," + `self:selft:Heal:${sufri}`;
            }
            hows = howsfinal.split(',');
        }

        var time = 0;
        for (var step of hows) {
            var codes = step.split(':');
            var animation = $scope.animations[codes[2]];
            if (!animation)
                animation = {framerate: 1, frames: [1]};
            var thetime = (animation.frames.length / parseInt(animation.framerate)) * 1000;
            eval(`
            setTimeout(function () {
                POKEMONBATTLE.SUBANIMATE($scope, hero, enemy, friend, target, '${codes[0]}','${codes[1]}','${codes[2]}','${codes[3]}');
            }, ${time});`);
            time += (codes[1] === "special" ? (thetime * 3) : thetime);
        }

        setTimeout(function () {

            if (callback)
                callback()
        }, time);

    },
    SUBANIMATE: function ($scope, hero, enemy, friend, target, body, movement, animation, sufri, callback) {

        if (friend.isHide) {
            friend.isHid = false;
            ACTIONS.GAME.ALPHABASE(friend.body, 1, 1);
        }
        if (body === "up") {
            friend.isHide = true;
            ACTIONS.GAME.ALPHABASE(friend.body, 1, 0);
            ACTIONS.ANIMATION.DIRECT(friend.body, friend.body.x, -2000, 2000, function () {

            });
        }
        if (body === "down") {
            friend.isHide = true;
            ACTIONS.GAME.ALPHABASE(friend.body, 1, 0);
            ACTIONS.ANIMATION.DIRECT(friend.body, friend.body.x, 2000, 2000, function () {

            });
        }
        if (body === "hide") {
            friend.isHide = true;
            ACTIONS.GAME.ALPHABASE(friend.body, 1, 0);
        }
        if (body === "throw") {
            ACTIONS.ANIMATION.DIRECT(friend.body, target.body.x, target.body.y, 500, function () {

            });
        }

        if (body === "self") {
            ACTIONS.GAME.SHAKEY(friend.body, 100, 30, 1);
        }

        var vsufri = sufri || "shake";
        var codesufri = "";
        if (vsufri === "shake") {
            codesufri = "ACTIONS.GAME.SHAKE(target.body, 20, 20, 5);";
        }
        if (vsufri === "supershake") {
            codesufri = "ACTIONS.GAME.SHAKE(target.body, 10, 30, 40);";
        }


        if (movement === "full") {
            eval(codesufri);
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                0, -100,
                0, -100,
                true, function () {
                    eval(codesufri);
                }, undefined, undefined, undefined, undefined, 4);
        }
        if (movement === "special") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                true, function () {
                    ACTIONS.ANIMATION.THROWNATURAL(animation,
                        POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                        POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                        POKEMONBATTLE.XS(target.body.x + (target.body.width / 2)),
                        POKEMONBATTLE.YS(target.body.y + (target.body.height / 2)),
                        true, function () {
                            eval(codesufri);
                            ACTIONS.ANIMATION.THROWNATURAL(animation,
                                POKEMONBATTLE.XS(target.body.x + (target.body.width / 2)),
                                POKEMONBATTLE.YS(target.body.y + (target.body.height / 2)),
                                POKEMONBATTLE.XS(target.body.x + (target.body.width / 2)),
                                POKEMONBATTLE.YS(target.body.y + (target.body.height / 2)),
                                true, function () {

                                }, undefined, undefined, undefined, undefined, undefined);
                        }, undefined, undefined, undefined, undefined, undefined);
                }, undefined, undefined, undefined, undefined, undefined);
        }
        if (movement === "up") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)), -1000,
                true, function () {
                }, undefined, undefined, undefined, undefined, undefined);
        }
        if (movement === "down") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)), 1000,
                true, function () {
                }, undefined, undefined, undefined, undefined, undefined);
        }
        if (movement === "throw") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                POKEMONBATTLE.XS(target.body.x + (target.body.width / 2)),
                POKEMONBATTLE.YS(target.body.y + (target.body.height / 2)),
                true, function () {
                    eval(codesufri);
                }, undefined, undefined, undefined, undefined, undefined);
        }
        if (movement === "back") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                POKEMONBATTLE.XS(target.body.x + (target.body.width / 2)),
                POKEMONBATTLE.YS(target.body.y + (target.body.height / 2)),
                POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                true, function () {
                    eval(codesufri);
                }, undefined, undefined, undefined, undefined, undefined);
        }
        if (movement === "side") {
            eval(codesufri);
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                POKEMONBATTLE.XS(target.body.x + (target.body.width / 2)),
                POKEMONBATTLE.YS(target.body.y + (target.body.height / 2)),
                POKEMONBATTLE.XS(target.body.x + (target.body.width / 2)),
                POKEMONBATTLE.YS(target.body.y + (target.body.height / 2)),
                true, function () {
                }, undefined, undefined, undefined, undefined, undefined);
        }
        if (movement === "self" || movement === "hide") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                POKEMONBATTLE.XS(friend.body.x + (friend.body.width / 2)),
                POKEMONBATTLE.YS(friend.body.y + (friend.body.height / 2)),
                true, function () {
                }, undefined, undefined, undefined, undefined, undefined);
        }

    },
    END: function ($scope, win) {
        ACTIONS.SOUND.STOPALL();
        $(".pokmonDetail").hide();
        $scope.isBattlening = false;
        $scope.PKM.pokemonDetail = false;
        $scope.BATTLEOBJS.menu = false;
        $scope.PKM.mainMenu = false;
        if (win === true) {
            eval($scope.BATTLEOBJS.winbattle);
            $scope.play("Victory", SOUNDS.system);
            setTimeout(function () {
                POKEMONBATTLE.ENDFINAL($scope);
            }, 7000)
        }
        if (win === false) {
            eval($scope.BATTLEOBJS.losebattle);
            $scope.play("Defeat", SOUNDS.system);
            setTimeout(function () {
                POKEMONBATTLE.ENDFINAL($scope);
            }, 7000)
        }


    },
    ENDFINAL: function ($scope) {
        $scope.PKM.mainMenu = false;
        ACTIONS.SOUND.BGM_RESTORE();
        ACTIONS.SOUND.BGS_RESTORE();
        ACTIONS.CAMERA.PLAYER();
        for (var l = 0; l <= 9; l++) {
            eval(`layer${l}.visible =true;`);
        }
        if ($scope.BATTLEOBJS.FRIEND.dom)
            if ($scope.BATTLEOBJS.FRIEND.dom.parentNode)
                $scope.BATTLEOBJS.FRIEND.dom.parentNode.removeChild($scope.BATTLEOBJS.FRIEND.dom);
        if ($scope.BATTLEOBJS.TARGET.dom)
            if ($scope.BATTLEOBJS.TARGET.dom.parentNode)
                $scope.BATTLEOBJS.TARGET.dom.parentNode.removeChild($scope.BATTLEOBJS.TARGET.dom);
        if ($scope.BATTLEOBJS.FRIEND.shadowdom)
            if ($scope.BATTLEOBJS.FRIEND.shadowdom.parentNode)
                $scope.BATTLEOBJS.FRIEND.shadowdom.parentNode.removeChild($scope.BATTLEOBJS.FRIEND.shadowdom);
        if ($scope.BATTLEOBJS.TARGET.shadowdom)
            if ($scope.BATTLEOBJS.TARGET.shadowdom.parentNode)
                $scope.BATTLEOBJS.TARGET.shadowdom.parentNode.removeChild($scope.BATTLEOBJS.TARGET.shadowdom);
        layerBattle.removeAllChildren();
        layerBattle.alpha = 0;
        ACTIONS.GAME.SCREENOFF(1, function () {
            $("#footer, #footer2").show();

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
        heroShadow.x = heroBody.x = 90;
        heroShadow.scaleX = heroBody.scaleX = -1;
        heroShadow.y = heroBody.y = 200;
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
        heroShadow.x = heroBody.x = 480;
        heroShadow.y = heroBody.y = 200;
        heroShadow.y += 43;
        heroShadow.x -= 10;
        layerBattle.addChild(heroShadow);
        layerBattle.addChild(heroBody);
        if (!name) {
            heroBody.visible = false;
            heroShadow.visible = false;
        }
        return {body: heroBody, shadow: heroShadow, name: name};
    },
    FRIEND: function ($scope) {
        if ($scope.BATTLEOBJS.FRIEND) {
            $scope.BATTLEOBJS.FRIEND.dom.parentNode.removeChild($scope.BATTLEOBJS.FRIEND.dom);
            $scope.BATTLEOBJS.FRIEND.shadowdom.parentNode.removeChild($scope.BATTLEOBJS.FRIEND.shadowdom);
        }
        var pokemon = $scope.session.pokemons[$scope.BATTLEOBJS.FRIENDINDEX];
        var bound = $scope.getResource(pokemon.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/')).cloneNode(true);
        var shadowDom = document.createElement("div");
        shadowDom.style = `background-color: black;opacity: 0.5;z-index:8;width:${bound.width + 40}px;height:${bound.height / 2}px;border-radius: 100%;`;
        document.getElementById("main").appendChild(bound);
        document.getElementById("main").appendChild(shadowDom);
        bound.style = "z-index:9;" + pokemon.style;
        var sprite = new createjs.DOMElement(bound);
        var wdif = bound.width - 70;
        sprite.x = POKEMONBATTLE.X(($scope.BATTLEOBJS.HERO.body.x - wdif) + 50);
        var hdif = 70 - bound.height;
        sprite.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.HERO.body.y + 50) + (hdif));
        sprite.height = bound.height;
        sprite.width = bound.width;
        sprite.scaleX = sprite.scaleY = 1.3;

        var shadow = new createjs.DOMElement(shadowDom);
        shadow.x = POKEMONBATTLE.X(($scope.BATTLEOBJS.HERO.body.x - wdif) + 50) - 20;
        shadow.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.HERO.body.y + 50) + (hdif) + bound.height);
        shadow.height = bound.height;
        shadow.width = bound.width;
        shadow.scaleX = shadow.scaleY = 1.3;

        sprite.alpha = 0;
        layerBattle.addChild(shadow);
        layerBattle.addChild(sprite);
        return ({body: sprite, dom: bound, shadowdom: shadowDom});
    },
    TARGET: function ($scope) {
        if ($scope.BATTLEOBJS.TARGET) {
            $scope.BATTLEOBJS.TARGET.dom.parentNode.removeChild($scope.BATTLEOBJS.TARGET.dom);
            $scope.BATTLEOBJS.TARGET.shadowdom.parentNode.removeChild($scope.BATTLEOBJS.TARGET.shadowdom);
        }
        var pokemon = $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX];
        var bound = $scope.getResource(pokemon.imageUrl).cloneNode(true);
        var shadowDom = document.createElement("div");
        shadowDom.style = `background-color: black;opacity: 0.5;z-index:8;width:${bound.width + 40}px;height:${bound.height / 2}px;border-radius: 100%;`;
        bound.className = "pokemonBattleFriend";
        document.getElementById("main").appendChild(bound);
        document.getElementById("main").appendChild(shadowDom);
        bound.style = "z-index:9;" + pokemon.style;
        var sprite = new createjs.DOMElement(bound);
        var wdif = bound.width - 120;
        sprite.x = POKEMONBATTLE.X((STAGE.canvas.width / 2)) + 30;
        var hdif = 70 - bound.height;
        sprite.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.ENEMY.body.y - 50) + (hdif));
        sprite.height = bound.height;
        sprite.width = bound.width;
        sprite.scaleX = $scope.BATTLEOBJS.ENEMY.body.scaleX;

        var shadow = new createjs.DOMElement(shadowDom);
        shadow.x = (POKEMONBATTLE.X((STAGE.canvas.width / 2)) + 30) - 20;
        shadow.y = sprite.y + (bound.height / 2) + 15;
        shadow.height = bound.height;
        shadow.width = bound.width;

        sprite.alpha = 0;
        layerBattle.addChild(shadow);
        layerBattle.addChild(sprite);
        return ({body: sprite, dom: bound, shadowdom: shadowDom});
    },
    FRIENDTEST: function ($scope, index) {
        var prepokemon = POKEMOMFIND.GENERATE(randomArray(APIS.POKEDEX).keyname);
        ACTIONS.LOAD.ADD([prepokemon.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/'), prepokemon.cryUrl], function () {
            $scope.session.pokemons[$scope.BATTLEOBJS.FRIENDINDEX] = prepokemon;
            POKEMONBATTLE.CHANGEPOKEMON($scope, $scope.BATTLEOBJS.FRIENDINDEX);
        });
    },
    TARGETTEST: function ($scope, index) {
        var prepokemon = POKEMOMFIND.GENERATE(randomArray(APIS.POKEDEX).keyname);
        ACTIONS.LOAD.ADD([prepokemon.imageUrl, prepokemon.cryUrl], function () {
            $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX] = prepokemon;
            $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX].battle = OSO(BATTLEDEFAULT);
            POKEMONBATTLE.CHANGETARGET($scope, $scope.BATTLEOBJS.TARGETINDEX);
        });
    },
};