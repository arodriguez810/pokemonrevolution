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
            var alltypes = {};
            for (var t in APIS.TYPES) {
                alltypes[t] = 0;
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
            return {
                quality: superShiny ? 30 : (shiny ? 20 : getRandomInt(10)),
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
    LAUNCH: function ($scope, tier, trainer, type, baseType) {
        $("#footer, #footer2").hide();


        $scope.PKM.pokemonDetail = false;
        $scope.PKM.menu = false;
        ACTIONS.GAME.BLOCK();
        ACTIONS.SOUND.STOPALL();

        $scope.BATTLEOBJS = {};

        ACTIONS.GAME.SCREEN(0.5, "#000", 1, async function () {
            for (var l = 0; l <= 9; l++) {
                eval(`layer${l}.visible =false;`);
            }
            ACTIONS.CAMERA.ZERO();
            layerBattle.removeAllChildren();
            layerBattle.alpha = 0;
            //DrawBackGround

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

            console.log($scope.PKM.friend());
            console.log($scope.PKM.target());
            var resources = {};
            $scope.playLoading("Cargando Batalla..");
            for (var r of $scope.session.pokemons) {
                resources[r.imageUrl] = r.imageUrl;
                for (var m of r.moves) {
                    var hows = [];
                    if (m.animation)
                        hows = m.animation.split(',');
                    else {
                        hows = `self:throw:Generic_${m.type}`.split(',');
                    }
                    for (var h of hows) {
                        var animation = h.split(':')[2];
                        animation = $scope.animations[animation];
                        resources[animation.file] = animation.file;
                    }

                }
            }
            for (var r of $scope.BATTLEOBJS.TARGETS) {
                resources[r.imageUrl] = r.imageUrl;
                for (var m of r.moves) {
                    var hows = [];
                    if (m.animation)
                        hows = m.animation.split(',');
                    else {
                        hows = `self:throw:Generic_${m.type}`.split(',');
                    }
                    for (var h of hows) {
                        var animation = h.split(':')[2];
                        animation = $scope.animations[animation];
                        resources[animation.file] = animation.file;
                    }

                }
            }

            resources = objToArray(resources);
            ACTIONS.LOAD.ADD(resources, function () {
                $scope.stopLoading();
                ACTIONS.SOUND.BattleMusic("");
                $scope.PKM.mainMenu = true;
                ACTIONS.GAME.ALPHABASE(layerBattle, 0.5, 1, function () {
                    //Draw Hero
                    setTimeout(async () => {
                        $scope.BATTLEOBJS.FRIEND = POKEMONBATTLE.FRIEND($scope);
                        $scope.BATTLEOBJS.HERO.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
                        ACTIONS.ANIMATION.THROWNATURAL('Pokeball_Omega',
                            $scope.BATTLEOBJS.HERO.body.x,
                            $scope.BATTLEOBJS.HERO.body.y,
                            POKEMONBATTLE.XS($scope.BATTLEOBJS.FRIEND.body.x - ($scope.BATTLEOBJS.FRIEND.body.width / 2)),
                            POKEMONBATTLE.YS($scope.BATTLEOBJS.FRIEND.body.y + ($scope.BATTLEOBJS.FRIEND.body.height / 2)),
                            true,
                            function () {
                                ACTIONS.ANIMATION.PLAYNATURAL($scope.PKM.friend().superShiny ? 'SuperShiny' : ($scope.PKM.friend().shiny ? 'Starts' : 'OutPokeball'),
                                    POKEMONBATTLE.XS($scope.BATTLEOBJS.FRIEND.body.x - ($scope.BATTLEOBJS.FRIEND.body.width / 2)),
                                    POKEMONBATTLE.YS($scope.BATTLEOBJS.FRIEND.body.y + ($scope.BATTLEOBJS.FRIEND.body.height / 2)),
                                    function () {
                                        ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.FRIEND.body, 0.3, 1);
                                        ACTIONS.SOUND.PLAY($scope.PKM.friend().cryUrl, SOUNDS.system);
                                        if (trainer) {
                                            setTimeout(async () => {
                                                $scope.BATTLEOBJS.TARGET = POKEMONBATTLE.TARGET($scope);
                                                $scope.BATTLEOBJS.ENEMY.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
                                                $scope.PKM.talk(`Yo te elijo ${$scope.PKM.target().name}`, 2);
                                                ACTIONS.ANIMATION.THROWNATURAL('Pokeball_Omega',
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
    EVALUATE: function (move, how, change) {
        if (change) {

        }
    },
    CHANGEPOKEMON: function ($scope, index) {
        $scope.PKM.pokemonDetail = false;
        $scope.PKM.menu = false;
        ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.FRIEND.body, 0.2, 0);
        $scope.BATTLEOBJS.HERO.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
        ACTIONS.ANIMATION.PLAYNATURAL($scope.PKM.friend().superShiny ? 'GetBack' : ($scope.PKM.friend().shiny ? 'GetBack' : 'GetBack'),
            POKEMONBATTLE.XS($scope.BATTLEOBJS.FRIEND.body.x - ($scope.BATTLEOBJS.FRIEND.body.width / 2)),
            POKEMONBATTLE.YS($scope.BATTLEOBJS.FRIEND.body.y + ($scope.BATTLEOBJS.FRIEND.body.height / 2)),
            function () {
                $scope.BATTLEOBJS.FRIENDINDEX = index;
                $scope.BATTLEOBJS.FRIEND = POKEMONBATTLE.FRIEND($scope);
                $scope.BATTLEOBJS.HERO.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
                ACTIONS.ANIMATION.THROWNATURAL('Pokeball_Omega',
                    $scope.BATTLEOBJS.HERO.body.x,
                    $scope.BATTLEOBJS.HERO.body.y,
                    POKEMONBATTLE.XS($scope.BATTLEOBJS.FRIEND.body.x - ($scope.BATTLEOBJS.FRIEND.body.width / 2)),
                    POKEMONBATTLE.YS($scope.BATTLEOBJS.FRIEND.body.y + ($scope.BATTLEOBJS.FRIEND.body.height / 2)),
                    true,
                    function () {
                        ACTIONS.ANIMATION.PLAYNATURAL($scope.PKM.friend().superShiny ? 'SuperShiny' : ($scope.PKM.friend().shiny ? 'Starts' : 'OutPokeball'),
                            POKEMONBATTLE.XS($scope.BATTLEOBJS.FRIEND.body.x - ($scope.BATTLEOBJS.FRIEND.body.width / 2)),
                            POKEMONBATTLE.YS($scope.BATTLEOBJS.FRIEND.body.y + ($scope.BATTLEOBJS.FRIEND.body.height / 2)),
                            function () {
                                ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.FRIEND.body, 0.3, 1);
                                ACTIONS.SOUND.PLAY($scope.PKM.friend().cryUrl, SOUNDS.system);
                            });
                    });

            });
    },
    CHANGETARGET: function ($scope, index) {
        $scope.PKM.pokemonDetail = false;
        $scope.PKM.menu = false;
        ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.TARGET.body, 0.2, 0);
        $scope.BATTLEOBJS.ENEMY.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
        ACTIONS.ANIMATION.PLAYNATURAL($scope.PKM.target().superShiny ? 'GetBack' : ($scope.PKM.target().shiny ? 'GetBack' : 'GetBack'),
            POKEMONBATTLE.XS($scope.BATTLEOBJS.TARGET.body.x + ($scope.BATTLEOBJS.TARGET.body.width / 2)),
            POKEMONBATTLE.YS($scope.BATTLEOBJS.TARGET.body.y + ($scope.BATTLEOBJS.TARGET.body.height / 2)),
            function () {
                $scope.BATTLEOBJS.TARGETINDEX = index;
                $scope.BATTLEOBJS.TARGET = POKEMONBATTLE.TARGET($scope);
                $scope.BATTLEOBJS.ENEMY.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
                ACTIONS.ANIMATION.THROWNATURAL('Pokeball_Omega',
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
                            });
                    });

            });
    },
    ATTACK: function ($scope, cmove, hero, enemy, friend, target, callback) {
        hero.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
        $scope.PKM.pokemonDetail = false;
        $scope.PKM.menu = false;
        $scope.PKM.mainMenu = false;
        var move = APIS.MOVES.filter(d => {
            return d.keyname === cmove.keyname
        });

        if (move.length > 0)
            move = move[0];

        console.log(move);
        var hows = [];
        if (move.animation)
            hows = move.animation.split(',');
        else {
            hows = `self:full:Generic_${move.type}`.split(',');
        }
        console.log(hows);

        var time = 0;
        for (var step of hows) {
            var codes = step.split(':');
            var animation = $scope.animations[codes[2]];
            if (!animation)
                animation = {framerate: 1, frames: [1]};
            var thetime = (animation.frames.length / parseInt(animation.framerate)) * 1000;
            eval(`
            setTimeout(() => {
                POKEMONBATTLE.SUBANIMATE($scope, hero, enemy, friend, target, '${codes[0]}','${codes[1]}','${codes[2]}');
            }, ${time});`);
            time += thetime;
        }
        setTimeout(function () {
            $scope.PKM.mainMenu = true;
            if (callback)
                callback()
        }, time);

    },
    SUBANIMATE: function ($scope, hero, enemy, friend, target, body, movement, animation, callback) {

        if (body === "up") {

        }
        if (body === "down") {

        }
        if (body === "hide") {

        }
        if (body === "throw") {

        }
        if (body === "self") {

        }


        if (movement === "full") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                STAGE.canvas.width / 2, 0,
                STAGE.canvas.width / 2, 0,
                true, () => {
                }, undefined, undefined, undefined, undefined, 3);
        }
        if (movement === "special") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                hero.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                hero.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                true, () => {
                    ACTIONS.ANIMATION.THROWNATURAL(animation,
                        hero.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                        hero.body.x, hero.body.y - ($scope.peopleHeight * 1.5),
                        true, () => {
                            ACTIONS.ANIMATION.THROWNATURAL(animation,
                                hero.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                                enemy.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                                true, () => {
                                }, undefined, undefined, undefined, undefined, undefined);
                        }, undefined, undefined, undefined, undefined, undefined);
                }, undefined, undefined, undefined, undefined, undefined);
        }
        if (movement === "up") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                hero.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                hero.body.x, hero.body.y - ($scope.peopleHeight * 1.5),
                true, () => {
                }, undefined, undefined, undefined, undefined, undefined);
        }
        if (movement === "down") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                hero.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                hero.body.x, hero.body.y + (($scope.peopleHeight * 1.5) * 2),
                true, () => {
                }, undefined, undefined, undefined, undefined, undefined);
        }
        if (movement === "throw") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                hero.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                enemy.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                true, () => {
                }, undefined, undefined, undefined, undefined, undefined);
        }
        if (movement === "side") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                enemy.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                enemy.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                true, () => {
                }, undefined, undefined, undefined, undefined, undefined);
        }
        if (movement === "self" || movement === "hide") {
            ACTIONS.ANIMATION.THROWNATURAL(animation,
                hero.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                hero.body.x, hero.body.y + ($scope.peopleHeight * 1.5),
                true, () => {
                }, undefined, undefined, undefined, undefined, undefined);
        }

    },
    END: function ($scope) {
        $(".pokmonDetail").hide();
        $scope.PKM.pokemonDetail = false;
        $scope.BATTLEOBJS.menu = false;
        $scope.PKM.mainMenu = false;

        ACTIONS.SOUND.STOPALL();
        ACTIONS.SOUND.BGM_RESTORE();
        ACTIONS.SOUND.BGS_RESTORE();
        ACTIONS.CAMERA.PLAYER();
        for (var l = 0; l <= 9; l++) {
            eval(`layer${l}.visible =true;`);
        }
        $scope.BATTLEOBJS.FRIEND.dom.parentNode.removeChild($scope.BATTLEOBJS.FRIEND.dom);
        $scope.BATTLEOBJS.TARGET.dom.parentNode.removeChild($scope.BATTLEOBJS.TARGET.dom);
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
        heroShadow.x = heroBody.x = 170;
        heroShadow.scaleX = heroBody.scaleX = -1;
        heroShadow.y = heroBody.y = 110;
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
        heroShadow.y = heroBody.y = 110;
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
        }
        var pokemon = $scope.session.pokemons[$scope.BATTLEOBJS.FRIENDINDEX];
        var bound = $scope.getResource(pokemon.imageUrl).cloneNode(true);
        document.getElementById("main").appendChild(bound);
        bound.style = "z-index:9;" + pokemon.style;
        var sprite = new createjs.DOMElement(bound);
        var wdif = bound.width - 70;
        sprite.x = POKEMONBATTLE.X(($scope.BATTLEOBJS.HERO.body.x + wdif));
        var hdif = 70 - bound.height;
        sprite.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.HERO.body.y + 70) + (hdif));
        sprite.height = bound.height;
        sprite.width = bound.width;
        sprite.scaleX = $scope.BATTLEOBJS.HERO.body.scaleX;
        sprite.alpha = 0;
        layerBattle.addChild(sprite);
        return ({body: sprite, dom: bound});
    },
    TARGET: function ($scope) {
        if ($scope.BATTLEOBJS.TARGET) {
            $scope.BATTLEOBJS.TARGET.dom.parentNode.removeChild($scope.BATTLEOBJS.TARGET.dom);
        }
        var pokemon = $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX];
        var bound = $scope.getResource(pokemon.imageUrl).cloneNode(true);
        document.getElementById("main").appendChild(bound);
        bound.style = "z-index:9;" + pokemon.style;
        var sprite = new createjs.DOMElement(bound);
        var wdif = bound.width - 70;
        sprite.x = POKEMONBATTLE.X(($scope.BATTLEOBJS.ENEMY.body.x - wdif));
        var hdif = 70 - bound.height;
        sprite.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.ENEMY.body.y + 70) + (hdif));
        sprite.height = bound.height;
        sprite.width = bound.width;
        sprite.scaleX = $scope.BATTLEOBJS.ENEMY.body.scaleX;
        sprite.alpha = 0;
        layerBattle.addChild(sprite);
        return ({body: sprite, dom: bound})
    },
    FRIENDTEST: function ($scope, index) {
        var prepokemon = POKEMOMFIND.GENERATE(APIS.POKEDEX[index].keyname);
        ACTIONS.LOAD.ADD([prepokemon.imageUrl, prepokemon.cryUrl], function () {
            $scope.session.pokemons[$scope.BATTLEOBJS.FRIENDINDEX] = prepokemon;
            POKEMONBATTLE.CHANGEPOKEMON($scope, $scope.BATTLEOBJS.FRIENDINDEX);
        });
    },
    TARGETTEST: function ($scope, index) {
        var prepokemon = POKEMOMFIND.GENERATE(APIS.POKEDEX[index].keyname);
        ACTIONS.LOAD.ADD([prepokemon.imageUrl, prepokemon.cryUrl], function () {
            $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX] = prepokemon;
            POKEMONBATTLE.CHANGETARGET($scope, $scope.BATTLEOBJS.TARGETINDEX);
        });
    },

};