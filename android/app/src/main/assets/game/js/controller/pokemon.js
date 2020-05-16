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
        noobProFull: [0, 0, 0, 0, 0, 0],
        friend: [0, 1],
        friendPro: [0, 0, 1],
        friendProFull: [0, 0, 0, 0, 0, 1],
        npc: [0, 1, 1],
        npcPro: [0, 0, 1, 1],
        npcProFull: [0, 0, 0, 0, 1, 1],
        special: [0, 1, 1, 1],
        specialPro: [0, 1, 1, 1, 1],
        specialProFull: [0, 0, 1, 1, 1, 1],
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


TYPEDEFF = [
    "Bug",
    "Dragon",
    "Electric",
    "Fairy",
    "Fighting",
    "Fire",
    "Flying",
    "Ghost",
    "Grass",
    "Ground",
    "Ice",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Steel",
    "Water",
    "Dark"
];
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
        var trainer = POKEMON.trainersRange[type || "noobProFull"];
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


            var sound_pokepath = DOMAINRESOURCE + `resources/poekemon/audio/cries/${POKEDEX_.cleanName(pokemon.baseSpecies || name)}.ogg`;
            if (parseInt(pokemon.num) <= 721)
                sound_pokepath = DOMAINRESOURCE + `resources/poekemon/audio/cries_anime/${POKEDEX_.cleanName(pokemon.baseSpecies || name)}.ogg`;
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
                imageUrl: shiny ? DOMAINRESOURCE + `resources/poekemon/gif/front_s/${pokemon.keyname}.gif` : DOMAINRESOURCE + `resources/poekemon/gif/front/${pokemon.keyname}.gif`,
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

console.logblue = function (text) {
    console.log("%c" + text, "font-size:16px;background-color:lightblue;color:black;");
};
console.logred = function (text) {
    console.log("%c" + text, "font-size:16px;background-color:red;color:white;");
};
console.loggreen = function (text) {
    console.log("%c" + text, "font-size:16px;background-color:green;color:white;");
};
console.logorange = function (text) {
    console.log("%c" + text, "font-size:16px;background-color:orange;color:black;");
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
            $scope.BATTLEOBJS.terrain = "";
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
                resources[r.imageUrl] = r.imageUrl;
                resources[r.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/')] = r.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/');
                if (r.giga) {
                    resources[r.imageUrl.replace(`${r.name}.gif`, `${r.giga}.gif`)] = r.imageUrl.replace(`${r.name}.gif`, `${r.giga}.gif`);
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
                resources[r.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/')] = r.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/');
                if (r.giga) {
                    resources[r.imageUrl.replace(`${r.name}.gif`, `${r.giga}.gif`)] = r.imageUrl.replace(`${r.name}.gif`, `${r.giga}.gif`);
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
//ignoreAbility
        MULTIPLIER: function (types, moveType, intt) {
            var effectives = ["=-1", "/4", "/2", "*1", "*2", "*4"];
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
        DAMAGE: function ($scope, info, critial, base, last, miss) {
            var stats = ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"];
            var statsDef = ["def", "spd", "evasion"];
            var statsAtack = ["atk", "spa", "spe"];
            var speedSpeed = ["spe", "evasion"];
            var damage = 0;
            var ata = "atk";
            var def = "def";
            if (info.move.selfdestruct === "always") {
                $scope.PKM.stat(info.pokemonFriend, "hp", 999999);
            }
            console.logorange(info.move.shortDesc);
            if (miss)
                return 0;


            //Cambio de tipos
            if (info.pokemonFriend.battle.status === "electrify") {
                info.pokemonFriend.battle.statusTurn = 0;
                info.pokemonFriend.battle.status = undefined;
                info.move.type = "Electric";
            }
            if (info.move.keyname === "reflecttype") {
                info.pokemonFriend.battle.status = `Am_${randomArray(info.pokemonTarget.types)}`;
            }
            if ($scope.BATTLEOBJS.terrain === "iondeluge") {
                if (info.move.type === "Normal") {
                    info.move.type = "Electric";
                }
            }
            if (["judgment", "hiddenpower", "multiattack", "naturepower", "revelationdance", "secretpower", "technoblast"].indexOf(info.move.keyname) !== -1) {
                info.move.type = randomArray(TYPEDEFF);
            }

            var multiplier = POKEMONBATTLE.CALCS.MULTIPLIER(info.pokemonTarget.types, info.move.type);


            //Cambio de multiplier
            if (info.pokemonTarget.battle.status) {
                if (info.pokemonTarget.battle.status.indexOf("Am_") !== -1) {
                    var typesDD = [info.pokemonTarget.battle.status.replace("Am_", "")];
                    multiplier = POKEMONBATTLE.CALCS.MULTIPLIER(typesDD, info.move.type);
                }
            }
            if (["snatch", "sonicboom"].indexOf(info.move.keyname) !== -1) {
                multiplier = "*1";
            }
            if (info.pokemonTarget.battle.status === "snatch") {
                multiplier = "*1";
            }
            if (["smackdown", "gravity", "ingrain"].indexOf(info.pokemonTarget.battle.status) !== -1) {
                if (info.move.type === "Ground") {
                    if (multiplier === "=-1") {
                        multiplier = "*1";
                    }
                }
            }
            if ($scope.BATTLEOBJS.terrain === "gravity") {
                if (info.move.type === "Ground") {
                    if (multiplier === "=-1") {
                        multiplier = "*1";
                    }
                }
            }

            if (multiplier === "=-1") {
                return -1;
            }

            //Direct Damage
            if (info.move.damage === "level") {
                return info.pokemonTarget.power;
            }
            if (info.move.keyname === "reversal" || info.move.keyname === "waterspout" || info.move.keyname === "wringout") {
                return $scope.PKM.basehp(info.pokemonFriend) - info.pokemonFriend.battle.stats.hp;
            }
            if (info.move.keyname === "psywave") {
                return getRandomIntRange(0, 250);
            }
            if (info.move.num === 462) {
                return ($scope.PKM.hpno(info.pokemonTarget) / 3);
            }
            if (info.move.keyname === "naturesmadness") {
                return $scope.PKM.hpno(info.pokemonTarget) * (1 / 2);
            }
            if (info.move.keyname === "superfang") {
                return $scope.PKM.hpno(info.pokemonTarget) / 2;
            }
            if (info.move.damage === "level") {
                return info.pokemonTarget.power;
            }


            //Seleccionar stats
            if (info.move.category === "Special") {
                ata = "spa";
                def = "spd";
                if (info.move.useSourceDefensiveAsOffensive)
                    ata = "spd";
            }
            if ($scope.BATTLEOBJS.terrain === "wonderroom") {
                if (def === "def")
                    def = "spd";
                else
                    def = "def";
            }
            if (info.move.keyname === "psyshock" || info.move.keyname === "psystrike") {
                def = "def";
            }
            if (["secretsword", "lightthatburnsthesky", "photongeyser"].indexOf(info.move.keyname) !== -1) {
                if ($scope.PKM.stat(info.pokemonFriend, "atk") > $scope.PKM.stat(info.pokemonFriend, "spa"))
                    ata = "atk";
                else
                    ata = "spa";
            }


            //Calcular stats
            var fata = $scope.PKM.stat(info.pokemonFriend, ata);
            var fatainicial = OSO(fata);
            var mdef = $scope.PKM.stat(info.pokemonFriend, def);
            var tdef = $scope.PKM.stat(info.pokemonTarget, def) / 2;
            var tata = $scope.PKM.stat(info.pokemonFriend, ata);
            if (info.move.num === 251) {
                var prota = info.pokemonFriend;
                for (var po of info.team) {
                    if (fata < $scope.PKM.stat(po, ata)) {
                        fata = $scope.PKM.stat(po, ata);
                        prota = po;
                    }
                }
                ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} ha tomado la fuerza de ${prota.name}`);
            }

            //KO OH
            if (info.move.ohko) {
                if (info.pokemonFriend.power < info.pokemonTarget.power)
                    fata = 999999;
            }
            if (info.move.selfdestruct === "ifHit") {
                if (info.move.keyname === "healingwish") {
                    $scope.BATTLEOBJS.slot = "healingwish";
                }
                if (info.move.keyname === "lunardance") {
                    $scope.BATTLEOBJS.slot = "healingwish";
                }
                $scope.PKM.stat(info.pokemonFriend, "hp", 9999999);
            }

            //Move Effects Calcs

            //Clima Calcs
            if ($scope.BATTLEOBJS.clima === "sunnyday") {
                if (info.move.type === "Fire")
                    fata *= 1.5;
                if (info.move.type === "Grass")
                    fata *= 1.7;
                if (info.move.type === "Water")
                    fata *= 0.5;
                if (info.move.type === "Ice")
                    fata *= 0.5;
            }
            if ($scope.BATTLEOBJS.clima === "RainDance") {
                if (info.move.type === "Water")
                    fata *= 1.5;
                if (info.move.type === "Electric")
                    fata *= 1.7;
                if (info.move.type === "Fire")
                    fata *= 0.5;
                if (info.move.type === "Ground")
                    fata *= 0.5;
            }
            if ($scope.BATTLEOBJS.clima === "hail") {
                if (info.move.type === "Ice")
                    fata *= 1.5;
                if (info.move.type === "Water")
                    fata *= 0.8;
                if (info.pokemonFriend.types.indexOf("Ice") === -1)
                    $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 12));
            }
            if ($scope.BATTLEOBJS.clima === "Sandstorm") {
                if (info.pokemonTarget.types.indexOf("Rock") !== -1
                    || info.pokemonTarget.types.indexOf("Steel") !== -1
                    || info.pokemonTarget.types.indexOf("Ground") !== -1) {
                    tdef *= 1.5;
                    $scope.PKM.stat(info.pokemonTarget, "accuracy", 1);
                }

                if (info.pokemonFriend.types.indexOf("Rock") === -1
                    || info.pokemonFriend.types.indexOf("Steel") === -1
                    || info.pokemonFriend.types.indexOf("Ground") === -1) {
                    $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 16));
                } else {
                    $scope.PKM.stat(info.pokemonFriend, "accuracy", -1);
                }
            }

            //Terrain Calcs
            if ($scope.BATTLEOBJS.terrain === "grassyterrain") {
                if (info.move.type === "Grass") {
                    fata *= 2;
                }
            }
            if ($scope.BATTLEOBJS.terrain === "mistyterrain") {
                if (info.move.type === "Dragon" || info.move.type === "Ground") {
                    return 0;
                }
            }
            if ($scope.BATTLEOBJS.terrain === "psychicterrain") {
                if (info.move.type === "Psychic") {
                    fata *= 2;
                }
            }
            if ($scope.BATTLEOBJS.terrain === "electricterrain") {
                if (info.move.type === "Electric") {
                    fata *= 2;
                }
            }
            if ($scope.BATTLEOBJS.terrain === "gravity") {
                if (info.move.type === "Ground") {
                    fata *= 2;
                }
            }
            if ($scope.BATTLEOBJS.terrain === "magicroom") {
                POKEMONBATTLE.CLEARSTATS(info.pokemonFriend);
                POKEMONBATTLE.CLEARSTATS(info.pokemonTarget);
            }
            if ($scope.BATTLEOBJS.terrain === "mudsport") {
                if (info.move.type === "Electric") {
                    fata /= 3;
                }
            }
            if ($scope.BATTLEOBJS.terrain === "watersport") {
                if (info.move.type === "Fire") {
                    fata /= 3;
                }
            }

            //My Status
            if (info.pokemonFriend.battle.status) {
                if (info.pokemonFriend.battle.status === "foresight") {
                    if (multiplier === "=-1") {
                        multiplier = "*1";
                    }
                }
                if (info.pokemonFriend.battle.status === "charge") {
                    if (info.move.type === "Electric") {
                        fata = fata * 2;
                        ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} atacó con sobrecarga!`);
                    }
                    if (info.pokemonFriend.battle.statusTurn >= 1) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    }
                }
                if (info.pokemonFriend.battle.status === "bide") {
                    if (info.pokemonFriend.battle.statusTurn >= 2) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                        fata = fata * 2;
                    }
                }
                if (info.pokemonFriend.battle.status === "curse") {
                    if (info.pokemonFriend.battle.statusTurn >= 2) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                        var crusLife = ($scope.PKM.hpno(info.pokemonFriend) / 2);
                        $scope.PKM.stat(info.pokemonFriend, "hp", crusLife);
                    }
                }
                if (info.pokemonFriend.battle.status === "doubled") {
                    if (info.move.doubled) {
                        fata += (10 * info.pokemonFriend.battle.statusTurn);
                    } else {
                        info.pokemonFriend.battle.status = undefined;
                    }
                }
                if (info.pokemonFriend.battle.status === "gastroacid") {
                    POKEMONBATTLE.CLEARSTATS(info.pokemonFriend);
                    info.pokemonFriend.battle.status = undefined;
                    info.pokemonFriend.battle.statusTurn = 0;
                }
                if (info.pokemonFriend.battle.status === "helpinghand") {
                    if (info.pokemonFriend.battle.statusTurn >= 1) {
                        info.pokemonFriend.battle.status = undefined;
                        info.pokemonFriend.battle.statusTurn = 0;
                        fata *= 3;
                    }
                }
            }

            //Target Status Calcs
            if (info.pokemonTarget.battle.status) {
                if (info.pokemonTarget.battle.status === "magnetrise") {
                    if (info.move.type === "Ground") {
                        if (info.pokemonTarget.types.indexOf("Electric") !== -1) {
                            return 0;
                        }
                    }
                }
                if (info.pokemonTarget.battle.status === "powder") {
                    if (info.move.type === "Fire") {
                        $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 4));
                        return 0;
                    }
                }
                if (info.pokemonTarget.battle.status === "auroraveil") {
                    ACTIONS.MESSAGE.NOTI(`${info.pokemonTarget.name} ha reducido daño por auroraveil!`);
                    fata = fata / 2;
                }
                if (info.pokemonTarget.battle.status === "substitute") {
                    if (info.pokemonTarget.battle.statusTurn >= 3) {
                        info.pokemonTarget.battle.status = undefined;
                        info.pokemonTarget.battle.statusTurn = 0;
                        info.target.dom.style.filter = OSO(info.pokemonTarget.battle.statusfilter);

                        if (!info.isEnemy) {
                            info.target.body.y -= info.target.body.height - 39;
                            info.target.dom.src = info.pokemonTarget.imageUrl;
                        } else {
                            info.target.body.y -= info.target.body.height - 38;
                            info.target.dom.src = info.pokemonTarget.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/');
                        }
                        info.pokemonTarget.battle.statusfilter = undefined;
                    } else {
                        if (!info.pokemonTarget.battle.statusfilter) {

                            info.pokemonTarget.battle.statusfilter = OSO(info.target.dom.src);
                            $scope.PKM.stat(info.pokemonTarget, "hp", ($scope.PKM.basehp(info.pokemonTarget) / 3));
                            if (!info.isEnemy) {
                                info.target.body.y += info.target.body.height - 39;
                                info.target.dom.src = DOMAINRESOURCE + "resources/poekemon/gif/front/substitute.gif";
                            } else {
                                info.target.body.y += info.target.body.height - 38;
                                info.target.dom.src = DOMAINRESOURCE + "resources/poekemon/gif/back/substitute.gif";
                            }

                            POKEMONBATTLE.CLEARSTATS(info.pokemonTarget);
                        }
                        fata = fata / 16;
                    }
                }
                if (info.pokemonTarget.battle.status === "powertrick") {
                    var temp = fata;
                    fata = tdef;
                    tdef = fata;
                }
                if (info.pokemonTarget.battle.status === "future") {
                    if (info.pokemonTarget.battle.statusTurn >= 2) {
                        info.pokemonTarget.battle.status = undefined;
                        info.pokemonTarget.battle.statusTurn = 0;
                        fata += 120;
                    }
                }
                if (info.pokemonTarget.battle.status === "par") {
                    if (info.move.keyname === "smellingsalts") {
                        info.pokemonTarget.battle.status = undefined;
                        info.pokemonTarget.battle.statusTurn = 0;
                        fata *= 2;
                    }
                }
                if (info.pokemonTarget.battle.status === "psn") {
                    if (info.move.keyname === "venoshock") {
                        fata *= 2;
                    }
                }
                if (info.pokemonTarget.battle.status === "slp") {
                    if (info.move.keyname === "wakeupslap") {
                        info.pokemonTarget.battle.status = undefined;
                        info.pokemonTarget.battle.statusTurn = 0;
                        fata *= 2;
                    }
                }
                if (info.pokemonTarget.battle.status === "obstruct") {
                    if (info.move.category === "Physical") {
                        $scope.PKM.stat(info.pokemonFriend, "def", 2);
                    }
                }
                if (info.pokemonTarget.battle.status === "banefulbunker") {
                    if (info.move.category === "Physical") {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = "tox";
                        info.pokemonFriend.battle.statusType = "Poison";
                        info.pokemonFriend.battle.statusCondition = "bad";
                    }
                }
                if (info.pokemonTarget.battle.status === "spikyshield") {
                    if (info.move.category === "Physical") {
                        $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) * (1 / 8)));
                    }
                }
                if (info.pokemonTarget.battle.status === "reflect") {
                    if (info.move.num === 280) {
                        info.pokemonTarget.battle.status = undefined;
                        info.pokemonTarget.battle.statusTurn = 0;
                    } else {
                        if (info.move.category === "Physical") {
                            fata = fata / 2;
                            ACTIONS.MESSAGE.NOTI(`${info.pokemonTarget.name} ha reflejado daño!`);
                        }
                    }
                }
                if (info.pokemonTarget.battle.status === "lightscreen") {
                    if (info.move.num === 280) {
                        info.pokemonTarget.battle.status = undefined;
                        info.pokemonTarget.battle.statusTurn = 0;
                    } else {
                        if (info.move.category === "Physical") {
                            fata = fata / 3;
                            ACTIONS.MESSAGE.NOTI(`${info.pokemonTarget.name} ha reflejado daño!`);
                        }
                    }
                }
            }

            //stats
            if (info.move.stealsBoosts) {
                for (var stat of stats)
                    info.pokemonTarget.battle.stats[stat] = 0;
            }
            if (info.move.keyname === "rage") {
                $scope.PKM.stat(info.pokemonFriend, "atk", -1);
            }
            if (["storedpower", "magicpowder"].indexOf(info.move.keyname) !== -1) {
                for (var stat of stats)
                    info.pokemonTarget.battle.stats[stat] = temp[stat] * -1;
            }
            if (["punishment", "powertrip"].indexOf(info.move.keyname) !== -1) {
                for (var stat of stats)
                    if (info.pokemonTarget.battle.stats[stat] !== 0) {
                        fata += 20;
                    }
            }
            if (info.move.useSourceDefensiveAsOffensive) {
                fata = mdef;
            }
            //return
            if ([494, 756, 391, 285, 415, 576, 432].indexOf(info.move.num) !== -1) {
                var temp = OSO(info.pokemonFriend.battle.stats);
                var temp2 = OSO(info.pokemonTarget.battle.stats);
                for (var stat of stats)
                    info.pokemonTarget.battle.stats[stat] = temp[stat];
                for (var stat of stats)
                    info.pokemonFriend.battle.stats[stat] = temp2[stat];
                return 0;
            }
            //return
            if (["guardswap", "guardsplit", "roleplay"].indexOf(info.move.keyname) !== -1) {
                var temp = OSO(info.pokemonFriend.battle.stats);
                var temp2 = OSO(info.pokemonTarget.battle.stats);
                for (var stat of statsDef)
                    info.pokemonTarget.battle.stats[stat] = temp[stat];
                for (var stat of statsDef)
                    info.pokemonFriend.battle.stats[stat] = temp2[stat];
                return 0;
            }
            //return
            if (["powersplit", "powerswap", "roleplay"].indexOf(info.move.keyname) !== -1) {
                var temp = OSO(info.pokemonFriend.battle.stats);
                var temp2 = OSO(info.pokemonTarget.battle.stats);
                for (var stat of statsAtack)
                    info.pokemonTarget.battle.stats[stat] = temp[stat];
                for (var stat of statsAtack)
                    info.pokemonFriend.battle.stats[stat] = temp2[stat];
                return 0;
            }
            //return
            if (["speedswap"].indexOf(info.move.keyname) !== -1) {
                var temp = OSO(info.pokemonFriend.battle.stats);
                var temp2 = OSO(info.pokemonTarget.battle.stats);
                for (var stat of speedSpeed)
                    info.pokemonTarget.battle.stats[stat] = temp[stat];
                for (var stat of speedSpeed)
                    info.pokemonFriend.battle.stats[stat] = temp2[stat];
                return 0;
            }
            if ([374, 373, 365, 450].indexOf(info.move.num) !== -1) {
                var temp2 = OSO(info.pokemonTarget.battle.stats);
                for (var stat of stats)
                    info.pokemonFriend.battle.stats[stat] = temp2[stat];
                POKEMONBATTLE.CLEARSTATS(info.pokemonTarget);
            }
            if (info.move.keyname === "foulplay") {
                fata = tata;
            }

            //Aumentar Attack
            if (info.move.num === 362) {
                if ($scope.PKM.hp(info.pokemonTarget) <= 50) {
                    fata = fata * 2;
                }
            }
            if (info.move.num === 68) {
                if (info.move.category === "Physical")
                    fata = fata * 2;
            }
            if ([755, 754].indexOf(info.move.num) !== -1) {
                if (!last) {
                    fata = fata * 2;
                }
            }
            if (info.move.num === 486) {
                if ($scope.PKM.stat(info.pokemonFriend, "spd") > $scope.PKM.stat(info.pokemonTarget, "spd"))
                    fata = fata * 2;
            }
            if (info.move.flags) {
                if (info.move.flags.mirror) {
                    if (last) {
                        if (info.move.shortDesc.indexOf("doubles") !== -1) {
                            ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} aumentó en venganza!`);
                            fata = fata * 2;
                        }
                    }
                }
            }
            if (info.move.num === 284) {
                fata += $scope.PKM.hp(info.pokemonFriend);
            }
            if (info.move.num === 175) {
                fata += (100 - $scope.PKM.hp(info.pokemonFriend));
            }
            if (info.move.keyname === "guardianofalola") {
                fata = $scope.PKM.hpno(info.pokemonTarget) * (3 / 4);
            }
            if (["hex", "knockoff"].indexOf(info.move.keyname) !== -1) {
                var hexy = false;
                for (var stat of stats)
                    if (info.pokemonTarget.battle.stats[stat] !== 0) {
                        hexy = true;
                    }
                if (hexy)
                    fata *= 2;
            }

            //heals
            if (info.move.cure) {
                if (info.pokemonFriend.battle.status === info.move.cure) {
                    info.pokemonFriend.battle.statusTurn = 0;
                    info.pokemonFriend.battle.status = undefined;
                }
                if (info.move.cure === "all") {
                    info.pokemonFriend.battle.statusTurn = 0;
                    info.pokemonFriend.battle.status = undefined;
                }
            }
            if (info.move.keyname === "strengthsap") {
                $scope.PKM.stat(info.pokemonFriend, "hp", $scope.PKM.stat(info.pokemonTarget, "atk") * -1);
            }
            if (info.move.keyname === "refresh") {
                if (["brn", "tox", "par"].indexOf(info.pokemonFriend.battle.status) !== -1) {
                    info.pokemonFriend.battle.status = undefined;
                    info.pokemonFriend.battle.statusTurn = 0;
                }
            }
            if (info.move.keyname === "rest") {
                info.pokemonFriend.battle.stats.hp = 0;
                info.pokemonFriend.battle.status = "slp";
                info.pokemonFriend.battle.statusTurn = 0;
            }
            if (info.move.keyname === "shoreup") {
                var perheal = (1 / 2);
                if ($scope.BATTLEOBJS.clima === "Sandstorm") {
                    perheal = (2 / 3);
                }
                ACTIONS.ANIMATION.PLAYNATURAL("Heal",
                    POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                    POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                    function () {
                        $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) * perheal) * -1);
                    }, undefined, undefined, undefined, undefined, undefined);
            }
            if (info.move.flags) {
                if (info.move.flags.cure) {
                    POKEMONBATTLE.CLEARSTATS(info.pokemonFriend);
                }
            }
            if ([739, 114].indexOf(info.move.num) !== -1) {
                POKEMONBATTLE.CLEARSTATS(info.pokemonTarget);
                POKEMONBATTLE.CLEARSTATS(info.pokemonFriend);
            }
            if (info.move.keyname === "purify") {
                if (info.pokemonFriend.battle.status) {
                    info.pokemonFriend.battle.status = undefined;
                    info.pokemonFriend.battle.statusTurn = 0;
                    POKEMONBATTLE.CLEARSTATS(info.pokemonFriend);
                    $scope.PKM.stat(info.pokemonFriend, "hp", (($scope.PKM.basehp(info.pokemonFriend) / 2)) * -1);
                }
            }
            if (info.move.num === 499) {
                POKEMONBATTLE.CLEARSTATS(info.pokemonTarget);
            }

            //Recoil and HP
            if (info.move.struggleRecoil) {
                $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 4));
            }
            if (info.move.mindBlownRecoil) {
                $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 2));
            }
            //return
            if (info.move.num === 283) {
                info.pokemonTarget.battle.stats.hp = info.pokemonTarget.stats.hp * ($scope.PKM.hp(info.pokemonFriend) / 100);
                return 0;
            }
            if (info.move.num === 775) {
                $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 33));
            }

            //Status
            if (info.move.keyname === "psychoshift") {
                info.pokemonTarget.battle.status = info.pokemonFriend.battle.status;
                info.pokemonTarget.battle.statusTurn = info.pokemonFriend.battle.statusTurn;
                info.pokemonTarget.battle.statusType = info.pokemonFriend.battle.statusType;
            }
            if (info.move.keyname === "facade") {
                if (["brn", "tox", "par"].indexOf(info.pokemonFriend.battle.status) !== -1) {
                    fata = fata * 2;
                }
            }
            if (info.move.keyname === "teatime") {
                info.pokemonFriend.battle.status = undefined;
                info.pokemonFriend.battle.statusTurn = 0;
                POKEMONBATTLE.CLEARSTATS(info.pokemonFriend);
                info.pokemonTarget.battle.status = undefined;
                info.pokemonTarget.battle.statusTurn = 0;
                POKEMONBATTLE.CLEARSTATS(info.pokemonTarget);
            }
            if (info.move.doubled) {
                info.pokemonFriend.battle.statusTurn = 1;
                info.pokemonFriend.battle.status = "doubled";
                info.pokemonFriend.battle.statusType = "Dark";
                info.pokemonTarget.battle.statusCondition = "good";
            }

            //Especiales
            if (info.move.keyname === "present") {
                var random = getRandomInt(3);
                if (random === 0)
                    fata += 20;
                if (random === 1)
                    fata += 40;
                if (random === 2)
                    fata += 120;
                if (random === 3) {
                    ACTIONS.ANIMATION.PLAYNATURAL("Heal",
                        POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                        POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                        function () {
                            $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 4) * -1);
                        }, undefined, undefined, undefined, undefined, undefined);
                }
            }
            if (info.move.breaksProtect) {
                if (["reflect", "lightscreen", "craftyshield", "safeguard", "kingsshield", "matblock", "maxguard"].indexOf(info.pokemonTarget.battle.status) !== -1) {
                    info.pokemonTarget.battle.statusTurn = 0;
                    info.pokemonTarget.battle.status = undefined;
                }
            }
            if (info.pokemonFriend.battle.gigamax) {
                if (info.move.gmaxPower) {
                    fata += info.move.gmaxPower;
                }
                fata = fata * 2;
                if (info.move.num === 782) {
                    fata = fata * 2;
                }
                if (info.move.num === 781) {
                    fata = fata * 2;
                }
            }
            if (info.move.future) {
                info.pokemonTarget.battle.statusTurn = 1;
                info.pokemonTarget.battle.status = "future";
                info.pokemonTarget.battle.statusType = "Psychic";
                info.pokemonTarget.battle.statusCondition = "good";
            }

            if (info.move.category !== "Status") {
                //Final Calc
                if (base) tdef = 0;
                if (info.move.ignoreDefensive) tdef = 0;
                var calc = ((fata - tdef) + info.move.basePower);
                if (critial) calc += (calc / 3);
                var penaltyType = 1;
                penaltyType -= info.pokemonFriend.types.indexOf(info.move.type) !== -1 ? 0 : 0.25;
                if (info.pokemonFriend.types.indexOf(info.move.type) === -1)
                    for (var type of info.pokemonFriend.types) {
                        var taken = APIS.TYPES[type].damageTaken[info.move.type];
                        if (taken === 1)
                            penaltyType -= 0.25;
                    }
                calc = calc * penaltyType;
                var hits = 1;
                if (info.move.multihit) {
                    if (Array.isArray(info.move.multihit)) {
                        hits = getRandomIntRange(info.move.multihit[0], info.move.multihit[1]);
                    } else {
                        hits = info.move.multihit;
                    }
                }
                calc *= hits;
                if (hits > 1) {
                    for (var h = 1; h <= hits; h++) {
                        ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} ha dado ${hits} golpes!`);
                        $scope.play("Cancel", SOUNDS.system);
                    }
                }
                damage = eval(`calc${multiplier}`);


                //Recoil General
                var recoil = 0;
                if (info.move.recoil) {
                    recoil = damage * (info.move.recoil[0] / info.move.recoil[1]);
                    $scope.PKM.stat(info.pokemonFriend, "hp", recoil);
                    ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} se auto dañó!`);
                }
            } else {
                damage = 0;
            }
            //Info
            console.log("recoil: " + recoil + ", incial: " + fatainicial + ", power: " + info.move.basePower);
            console.log("hits: " + hits, " ata: " + fata, " def: " + tdef);
            console.log("effectives: " + multiplier, " penaltyType: " + penaltyType, " base: " + base);
            console.logred("damage: " + damage);

            return damage;
        },
        /**
         * @return {boolean}
         */
        IsMISS: function ($scope, info, last) {
            if (info.move.keyname === "thunder") {
                if ($scope.BATTLEOBJS.clima === "RainDance") {
                    return false
                }
            }
            if (info.move.keyname === "blizzard") {
                if ($scope.BATTLEOBJS.clima === "hail") {
                    return false
                }
            }
            if (info.pokemonTarget.battle.status === "telekinesis") {
                if (!info.move.ohko) {
                    return true;
                }
            }
            if (info.pokemonFriend.battle.status === "taunt") {
                if (info.move.category === "Status")
                    return true;
            }
            if (info.pokemonTarget.battle.status === "wideguard") {
                if (info.move.multihit)
                    return true;
            }
            if (info.pokemonFriend.battle.status === "nomiss") {
                info.pokemonFriend.battle.status = undefined;
                info.pokemonFriend.battle.statusTurn = 0;
                return false;
            }
            if (info.move.accuracy === true)
                return false;
            if (info.move.keyname === "snore") {
                if (info.pokemonFriend.battle.status !== "slp") {
                    return true;
                }
            }
            if (info.move.missLast === true) {
                if (last) {
                    return true;
                }
            }
            if (info.pokemonFriend.battle.status === "imprison") {
                for (var mm of info.pokemonTarget.moves)
                    if (info.move.num === mm.num)
                        return true;
            }


            var moveAccuracy = 100 - info.move.accuracy;
            var pokemonAcur = 100 - $scope.PKM.stat(info.pokemonFriend, "accuracy");
            var targetEvasion = $scope.PKM.stat(info.pokemonTarget, "evasion");
            targetEvasion = targetEvasion / 2;
            if (info.move.ignoreEvasion)
                targetEvasion = 0;
            var ratio = 5 + (moveAccuracy + pokemonAcur) + targetEvasion;
            var accept = getRandomIntRange(0, 100);
            console.logblue("miss ratio: " + ratio + " enemy evasion: " + targetEvasion + "miss: " + (accept > (100 - ratio)));
            return accept > (100 - ratio);
        },
        /**
         * @return {boolean}
         */
        IsCRITICAL: function (info, miss) {


            if (info.move.category === "Status")
                return false;
            if (miss)
                return false;


            if (info.pokemonTarget.battle.status === "luckychant") {
                info.pokemonFriend.battle.statusTurn = 0;
                info.pokemonFriend.battle.status = undefined;
                return false;
            }


            var ratio = 5;
            if (info.pokemonFriend.battle.status === "focusenergy") {
                info.pokemonFriend.battle.statusTurn = 0;
                info.pokemonFriend.battle.status = undefined;
                ratio += 50;
            }
            if (info.pokemonFriend.battle.status === "laserfocus") {
                info.pokemonFriend.battle.statusTurn = 0;
                info.pokemonFriend.battle.status = undefined;
                ratio = 100;
            }
            if (info.move.willCrit === true) {
                ratio = 100;
            }


            if (info.move.critRatio)
                ratio = info.move.critRatio * 10;


            var accept = getRandomIntRange(0, 100);
            console.logred("crit ratio: " + ratio + ", critico? " + (accept > (100 - ratio)));
            return accept > (100 - ratio);
        },
        IsWORKS: function (info) {

        },
        /**
         * @return {string}
         */
        VolatileStatus: function (info, $scope, last, miss) {
            var multiplier = POKEMONBATTLE.CALCS.MULTIPLIER(info.pokemonTarget.types, info.move.type);
            if (multiplier === "=-1")
                return;
            if (miss)
                return;
            var MeMulti = POKEMONBATTLE.CALCS.MULTIPLIER(info.pokemonFriend.types, info.move.type) === "=-1";
            var SuMulti = POKEMONBATTLE.CALCS.MULTIPLIER(info.pokemonTarget.types, info.move.type) === "=-1";
            var willreflect = false;
            if (info.pokemonTarget.battle.status === "magiccoat") {
                willreflect = true;
            }
            if (info.pokemonTarget.battle.status === "substitute") {
                return "";
            }
            if ($scope.BATTLEOBJS.terrain === "electricterrain") {
                return "";
            }
            var prob = getRandomIntRange(0, 100);
            if (info.move.secondary) {
                if (info.move.secondary.volatileStatus) {
                    if (info.move.secondary.chance) {
                        var chance = info.move.secondary.chance;
                        if (prob > (100 - chance)) {
                            if (info.move.target === "self" || info.move.target.toLowerCase().indexOf("ally") !== -1) {
                                if (MeMulti)
                                    return;
                                info.pokemonFriend.battle.statusTurn = 0;
                                info.pokemonFriend.battle.status = info.move.secondary.volatileStatus;
                                info.pokemonFriend.battle.statusType = info.move.type;
                                info.pokemonFriend.battle.statusCondition = "good";
                            } else {
                                if (SuMulti)
                                    return;
                                info.pokemonTarget.battle.statusTurn = 0;
                                info.pokemonTarget.battle.status = info.move.secondary.volatileStatus;
                                info.pokemonTarget.battle.statusType = info.move.type;
                                info.pokemonTarget.battle.statusCondition = "bad";
                            }
                        }
                    }
                }
            }

            if (info.move.status) {
                var chance = 90;
                if (prob > (100 - chance)) {
                    if (info.move.target === "self" || info.move.target.toLowerCase().indexOf("ally") !== -1) {
                        if (MeMulti)
                            return;
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = info.move.status;
                        info.pokemonFriend.battle.statusType = info.move.type;
                        info.pokemonFriend.battle.statusCondition = "good";
                    } else {
                        if (SuMulti)
                            return;
                        info.pokemonTarget.battle.statusTurn = 0;
                        info.pokemonTarget.battle.status = info.move.status;
                        info.pokemonTarget.battle.statusType = info.move.type;
                        info.pokemonTarget.battle.statusCondition = "bad";
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

            var changeTypes = {
                "confusion": "Psychic",
                "brn": "Fire",
                "frz": "Ice",
                "aquaring": "Water",
                "leechseed": "Fairy",
                "tox": "Poison",
                "spikes": "Rock",
                "toxicspikes": "Poison",
                "stealthrock": "Rock",
                "nightmare": "Ghost",
                "par": "Electric",
                "slp": "Grass",
                "attract": "Fairy"
            };
            for (var tt in changeTypes) {
                var item = changeTypes[tt];
                if (info.pokemonTarget.battle.status) {
                    if (info.pokemonTarget.battle.status === tt) {
                        info.pokemonTarget.battle.statusType = item;
                    }
                }
                if (info.pokemonFriend.battle.status) {
                    if (info.pokemonFriend.battle.status === tt) {
                        info.pokemonFriend.battle.statusType = item;
                    }
                }
            }

            if (willreflect) {
                info.pokemonFriend.battle.status = OSO(info.pokemonTarget.battle.status);
                info.pokemonFriend.battle.statusTurn = OSO(info.pokemonTarget.battle.statusTurn);
                info.pokemonTarget.battle.status = undefined;
                info.pokemonTarget.battle.statusTurn = 0;
            }

            return "";
        },
        /**
         * @return {string}
         */
        RunStatus: function (result, $scope, info, neddanimation) {
            if (neddanimation) {

                if (info.pokemonFriend.battle.status === "octolock") {
                    $scope.PKM.stat(info.pokemonFriend, "spd", 1);
                }
                if (info.pokemonFriend.battle.status === "confusion") {

                    if (!result.miss)
                        $scope.PKM.stat(info.pokemonFriend, "hp", result.damage);
                }
                if (info.pokemonFriend.battle.status === "aquaring") {
                    $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 16) * -1);
                }
                if (info.pokemonTarget.battle.status === "leechseed") {
                    $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonTarget) / 8) * -1);
                    $scope.PKM.stat(info.pokemonTarget, "hp", ($scope.PKM.basehp(info.pokemonTarget) / 8));
                }
                if (info.pokemonFriend.battle.status === "ingrain") {
                    $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 16) * -1);
                }
                if (info.pokemonFriend.battle.status === "tox") {
                    $scope.PKM.stat(info.pokemonFriend, "hp", (info.pokemonFriend.battle.statusTurn + 1) * 15);
                }
                if (info.pokemonFriend.battle.status === "toxicspikes") {
                    $scope.PKM.stat(info.pokemonFriend, "hp", (info.pokemonFriend.battle.statusTurn + 1) * 10);
                }
                if (info.pokemonFriend.battle.status === "nightmare") {
                    $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) * (1 / 4)));
                }
                if (info.pokemonFriend.battle.status === "brn") {
                    $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 10));
                }
            }
        },
        Status: function (result, info, $scope, callback) {

            if (info.pokemonTarget.battle.status === "substitute") {
                callback(false, false);
                return;
            }
            var prob = getRandomIntRange(0, 100);
            var neddanimation = false;
            if (info.pokemonFriend.battle.status) {
                info.pokemonFriend.battle.statusTurn++;
                var stop = false;

                if (info.pokemonFriend.battle.status === "aquaring") {
                    neddanimation = true;
                }
                if (info.pokemonFriend.battle.status === "octolock") {
                    neddanimation = true;
                }
                if (info.pokemonFriend.battle.status === "leechseed") {
                    neddanimation = true;
                }
                if (info.pokemonFriend.battle.status === "ingrain") {
                    neddanimation = true;
                }
                if (info.pokemonFriend.battle.status === "tox") {
                    neddanimation = true;
                }
                if (info.pokemonFriend.battle.status === "toxicspikes") {
                    neddanimation = true;
                }
                if (info.pokemonFriend.battle.status === "nightmare") {
                    neddanimation = true;
                }
                if (info.pokemonFriend.battle.status === "brn") {
                    neddanimation = true;
                }
                if (info.pokemonFriend.battle.status === "par") {
                    if (prob > 50) {
                        stop = true;
                        info.pokemonFriend.battle.statusType = "Electric";
                        info.pokemonFriend.battle.statusCondition = "bad";
                        neddanimation = true;
                    }
                }
                if (info.pokemonFriend.battle.status === "confusion") {
                    if ((info.pokemonFriend.battle.statusTurn * 10) > prob) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        if (prob > 50) {
                            stop = true;
                            info.pokemonFriend.battle.statusType = "Psychic";
                            info.pokemonFriend.battle.statusCondition = "bad";
                            neddanimation = true;
                        }
                    }
                }
                if (info.pokemonFriend.battle.status === "slp") {
                    if ((info.pokemonFriend.battle.statusTurn * 15) > prob) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        if (["sleeptalk", "snore"].indexOf(info.move.keyname) !== -1) {
                            stop = false;
                            info.pokemonFriend.battle.statusType = "Grass";
                            info.pokemonFriend.battle.statusCondition = "bad";
                            neddanimation = true;
                        } else {
                            stop = true;
                            info.pokemonFriend.battle.statusType = "Grass";
                            info.pokemonFriend.battle.statusCondition = "bad";
                            neddanimation = true;
                        }
                    }
                }
                if (info.pokemonFriend.battle.status === "frz") {
                    if (((info.pokemonFriend.battle.statusTurn) * 5) > prob) {
                        stop = true;
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
                            stop = true;
                            info.pokemonFriend.battle.statusType = "Fairy";
                            info.pokemonFriend.battle.statusCondition = "good";
                            neddanimation = true;
                        }
                    }
                }
                if (info.pokemonFriend.battle.status === "magnetrise") {
                    if (info.pokemonFriend.battle.statusTurn >= 5) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        neddanimation = true;
                    }
                }
                if (info.pokemonFriend.battle.status === "taunt") {
                    if (info.pokemonFriend.battle.statusTurn >= 3) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        neddanimation = true;
                    }
                }
                if (info.pokemonFriend.battle.status === "telekinesis") {
                    if (info.pokemonFriend.battle.statusTurn >= 3) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        neddanimation = true;
                    }
                }
                if (info.pokemonFriend.battle.status === "uproar") {
                    if (info.pokemonFriend.battle.statusTurn >= 3) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        neddanimation = true;
                    }
                }

                if (info.pokemonFriend.battle.status === "auroraveil") {
                    if (info.pokemonFriend.battle.statusTurn >= 5) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        neddanimation = true;
                    }
                }

                if (info.pokemonFriend.battle.status === "tailwind") {
                    if (info.pokemonFriend.battle.statusTurn >= 4) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        neddanimation = true;
                    }
                }
                if (info.pokemonTarget.battle.status === "magiccoat") {
                    if (info.move.category === "Status") {
                        neddanimation = true;
                    }
                    if (info.pokemonTarget.battle.statusTurn >= 2) {
                        info.pokemonTarget.battle.statusTurn = 0;
                        info.pokemonTarget.battle.status = undefined;
                    }
                }
                if (info.pokemonFriend.battle.status === "banefulbunker") {

                    if (info.pokemonFriend.battle.statusTurn >= 2) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    }
                }
                if (info.pokemonFriend.battle.status === "spikyshield") {

                    if (info.pokemonFriend.battle.statusTurn >= 2) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    }
                }
                if (info.pokemonFriend.battle.status === "reflect") {
                    if (info.pokemonFriend.battle.statusTurn >= 5) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        neddanimation = true;
                    }
                }
                if (info.pokemonFriend.battle.status === "lightscreen") {

                    if (info.pokemonFriend.battle.statusTurn >= 5) {
                        info.pokemonFriend.battle.statusTurn = 0;
                        info.pokemonFriend.battle.status = undefined;
                    } else {
                        neddanimation = true;
                    }
                }
                if (info.pokemonTarget.battle.status === "disable") {
                    if (info.pokemonTarget.battle.statusTurn >= 4) {
                        info.pokemonTarget.battle.status = undefined;
                        info.pokemonTarget.battle.statusTurn = 0;
                        $scope.BATTLEOBJS.disableMove = undefined;
                    }
                }
                if (neddanimation) {
                    if (callback)
                        callback(stop, neddanimation);

                } else {
                    if (callback)
                        callback(false, false);
                }
                return;
            } else {
                info.pokemonFriend.battle.statusTurn = 0;
            }
            if (callback)
                callback(false, false);
        },
        MyEffect: function (info, $scope, critial, miss, callback) {
            var multiplier = POKEMONBATTLE.CALCS.MULTIPLIER(info.pokemonTarget.types, info.move.type);
            if (multiplier === "=-1") {
                if (callback)
                    callback();
                return;
            }
            if (miss) {
                if (callback)
                    callback();
                return;
            }
            if (info.pokemonTarget.battle.status === "substitute") {
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

            if (info.move.self)
                if (info.move.self.boosts)
                    for (var sec in info.move.self.boosts) {
                        var item = info.move.self.boosts[sec];
                        $scope.PKM.stat(info.pokemonFriend, sec, item * -1);
                        var animation = sec + "up";
                        if (item < 0)
                            animation = sec + "down";
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
            if (info.move.secondary) {
                var chance = info.move.secondary.chance;
                if (prob > (100 - chance)) {
                    if (info.move.secondary.boosts)
                        for (var sec in info.move.secondary.boosts) {
                            var item = info.move.secondary.boosts[sec];
                            $scope.PKM.stat(info.pokemonTarget, sec, item * -1);
                            var animation = sec + "up";
                            if (item < 0)
                                animation = sec + "down";
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
                        if (info.move.num === 176) {
                            healme = $scope.PKM.basehp(info.pokemonTarget);
                        }
                        var percent = info.move.drain[0] / info.move.drain[1];
                        healme = (healme * percent);
                        if (info.pokemonFriend.battle.status !== "healblock")
                            $scope.PKM.stat(info.pokemonFriend, "hp", healme * -1);
                        console.loggreen("heal: " + healme);
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
                    } else {
                        if (info.pokemonFriend.battle.status !== "healblock")
                            $scope.PKM.stat(info.pokemonFriend, "hp", (($scope.PKM.basehp(info.pokemonFriend) * info.move.flags.heal) / 100) * -1);

                        if (info.move.heal) {
                            var percent = info.move.heal[0] / info.move.heal[1];
                            $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) * percent) * -1);
                        }
                    }
                }

            if (info.move.target.toLowerCase().indexOf("ally") !== -1) {
                if (info.move.effect) {
                    info.pokemonFriend.battle.effect = OSO(info.move.effect);
                }
            }

            if (info.pokemonTarget.battle.effect) {
                if (info.pokemonTarget.battle.effect.duration > 0) {
                    info.pokemonTarget.battle.effect.duration--;
                } else {
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
                if (prob > 98) {
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
        },
        TRANSFORM: function ($scope, info, callback) {
            var trasnum = getRandomInt(7);
            ACTIONS.ANIMATION.THROWNATURAL("transform" + trasnum,
                POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                true, function () {
                    var getHP = OSO(info.pokemonFriend.battle.stats.hp);
                    if (info.isEnemy) {
                        var temp = OSO($scope.PKM.target());
                        $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX] = OSO($scope.PKM.friend());
                        $scope.PKM.target().transform = temp;
                        $scope.PKM.target().battle.stats.hp = getHP;
                        POKEMONBATTLE.RETARGET($scope);
                        ACTIONS.SOUND.PLAY($scope.PKM.friend().cryUrl, SOUNDS.system);
                    } else {
                        var temp = OSO($scope.PKM.friend());
                        $scope.session.pokemons[$scope.BATTLEOBJS.FRIENDINDEX] = OSO($scope.PKM.target());
                        $scope.PKM.friend().transform = temp;
                        $scope.PKM.friend().battle.stats.hp = getHP;
                        POKEMONBATTLE.REFRIEND($scope);
                        ACTIONS.SOUND.PLAY($scope.PKM.target().cryUrl, SOUNDS.system);
                    }
                    if (callback)
                        callback();

                }, undefined, undefined, undefined, undefined, undefined);

        }
    },
    CALCANIMATION: function ($scope, result, info, callback, last) {
        POKEMONBATTLE.CALCS.GIGA(info, $scope, info.pokemonFriend, info.friend, function () {
            if (result)
                if (result.miss) {
                    ACTIONS.ANIMATION.PLAYNATURAL("b_intrerrogation",
                        POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                        POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                        function () {
                            if (callback)
                                callback(false);
                        }, undefined, undefined, undefined, undefined, undefined);
                    return;
                }
            if (result)
                if (result.critical) {
                    ACTIONS.ANIMATION.PLAYNATURAL('critico', POKEMONBATTLE.XS(info.target.body.x + (info.target.body.width / 2)),
                        POKEMONBATTLE.YS(info.target.body.y + (info.target.body.height / 2)));
                }
            if (callback)
                callback(false);
        });
    },
    TURNING: function ($scope, info, callback, last) {
        console.log("");
        console.log("%c" + info.move.name + "--------------------------------------------------------------", "background-color:red;color:white;");
        if (info.move.keyname === "transform") {
            POKEMONBATTLE.CALCS.TRANSFORM($scope, info, function () {
                if (callback)
                    callback({critical: false, miss: true, damage: 0});
            });
            return;
        }
        if (info.pokemonFriend.battle.status === "Wish") {
            $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) / 2) * -1);
            info.pokemonFriend.battle.status = undefined;
            info.pokemonFriend.battle.statusTurn = 0;
            ACTIONS.ANIMATION.PLAYNATURAL("wishouts",
                POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                function () {

                }, undefined, undefined, undefined, undefined, undefined);
        }
        if (info.pokemonTarget.battle.status === "uproar") {
            if (info.move.status)
                if (info.move.status === "slp") {
                    if (callback)
                        callback({critical: false, miss: true, damage: 0});
                }
            if (info.move.secundary)
                if (info.move.secundary.status === "slp") {
                    if (callback)
                        callback({critical: false, miss: true, damage: 0});
                }
        }
        if (["noretreat"].indexOf(info.move.keyname) !== -1) {
            info.pokemonFriend.battle.status = "partiallytrapped";
            info.pokemonFriend.battle.statusTurn = 0;
        }
        if (["triattack"].indexOf(info.move.keyname) !== -1) {
            info.move.secondary.status = randomArray(["brn", "par", "frz"]);
        }
        if (["conversion2"].indexOf(info.move.keyname) !== -1) {
            if ($scope.PKM.lastMove) {
                var newtype = "";
                for (var t in APIS.TYPES[$scope.PKM.lastMove.type].damageTaken) {
                    if (APIS.TYPES[$scope.PKM.lastMove.type].damageTaken[t] === 2) {
                        newtype = t;
                        break;
                    }
                }
                if (newtype) {
                    info.pokemonFriend.battle.status = "Am_" + newtype;
                    info.pokemonFriend.battle.statusTurn = 0;
                }
            }
        }
        if ($scope.BATTLEOBJS.tourmentMove) {
            if ($scope.BATTLEOBJS.tourmentMove === info.move.num) {
                $scope.BATTLEOBJS.tourmentMove = 9999;
                ACTIONS.ANIMATION.PLAYNATURAL("flinch",
                    POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                    POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                    function () {

                        if (callback)
                            callback({critical: false, miss: true, damage: 0});

                    }, undefined, undefined, undefined, undefined, undefined);
                return;
            }
        }
        if (info.pokemonFriend.battle.status === "torment") {
            $scope.BATTLEOBJS.tourmentMove = info.move.num;
        }
        if (info.move.num === 364) {
            info.pokemonTarget.battle.status = undefined;
            info.pokemonTarget.battle.statusTurn = 0;
        }
        if ($scope.BATTLEOBJS.numTurn % 3 === 0) {
            if (["kingsshield", "protect", "detect", "matblock", "quickguard"].indexOf(info.pokemonTarget.battle.status) !== -1) {

                info.pokemonTarget.battle.status = undefined;
                info.pokemonTarget.battle.statusTurn = 0;

                ACTIONS.ANIMATION.PLAYNATURAL("barrier",
                    POKEMONBATTLE.XS(info.target.body.x + (info.target.body.width / 2)),
                    POKEMONBATTLE.YS(info.target.body.y + (info.target.body.height / 2)),
                    function () {
                        if (callback)
                            callback({critical: false, miss: true, damage: 0});
                    }, undefined, undefined, undefined, undefined, undefined);
                return;
            }
        }
        if (last) {
            if (info.pokemonFriend.battle.status === "flinch") {
                info.pokemonFriend.battle.status = undefined;
                ACTIONS.ANIMATION.PLAYNATURAL("flinch",
                    POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                    POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                    function () {
                        if (callback)
                            callback(result);
                    }, undefined, undefined, undefined, undefined, undefined);
                return;
            }
        } else {
            if (info.pokemonFriend.battle.status === "flinch") {
                info.pokemonFriend.battle.status = undefined;
            }
        }
        if (info.pokemonTarget.battle.status === "safeguard") {
            if (info.move.category === "Status") {
                info.pokemonTarget.battle.statusTurn = 0;
                info.pokemonTarget.battle.status = undefined;
                if ($scope.PKM.lastMove) {
                    info.move = OSO($scope.PKM.lastMove);
                    $scope.PKM.lastMove = undefined;
                }
                return;
            }
        }
        if (info.move.num === 50) {
            if ($scope.PKM.lastMove) {
                $scope.BATTLEOBJS.disableMove = $scope.PKM.lastMove;
                $scope.PKM.lastMove = undefined;
            }
        }
        if (info.move.weather) {
            $scope.BATTLEOBJS.clima = info.move.weather;
            $scope.BATTLEOBJS.climaTurn = 0;
        }
        if ($scope.BATTLEOBJS.climaTurn !== undefined) {
            if ($scope.BATTLEOBJS.climaTurn >= 5) {
                $scope.BATTLEOBJS.clima = "";
                $scope.BATTLEOBJS.climaTurn = 0;
            }
            if (last)
                $scope.BATTLEOBJS.climaTurn++;
        }
        if (info.move.pseudoWeather) {
            $scope.BATTLEOBJS.terrain = info.move.pseudoWeather;
            $scope.BATTLEOBJS.terrainTurn = 0;
        }
        if ($scope.BATTLEOBJS.terrainTurn !== undefined) {
            if ($scope.BATTLEOBJS.terrainTurn >= 5) {
                $scope.BATTLEOBJS.terrain = "";
                $scope.BATTLEOBJS.terrainTurn = 0;
            }
            if (last)
                $scope.BATTLEOBJS.terrainTurn++;
        }
        if (["metronome", "sleeptalk"].indexOf(info.move.keyname) !== -1) {
            info.move = OSO(randomObject(APIS.MOVES));
        }
        if (info.pokemonTarget.battle.status === "metronome") {
            info.pokemonTarget.battle.statusTurn = 0;
            info.pokemonTarget.battle.status = undefined;
            if ($scope.PKM.lastMove) {
                info.move = OSO($scope.PKM.lastMove);
                $scope.PKM.lastMove = undefined;
            }
        }
        if (["mimic", "encore"].indexOf(info.move.keyname) !== -1) {
            if ($scope.PKM.lastMove) {
                info.move = OSO($scope.PKM.lastMove);
                $scope.PKM.lastMove = undefined;
            }
        }
        if (info.pokemonFriend.battle.status === "encore") {
            info.pokemonFriend.battle.statusTurn = 0;
            info.pokemonFriend.battle.status = undefined;
            if ($scope.PKM.lastMove) {
                info.move = OSO($scope.PKM.lastMove);
                $scope.PKM.lastMove = undefined;
            }
        }
        if (info.move.forceSwitch) {
            if (info.isEnemy) {
                var lives = [];
                for (var pok in $scope.session.pokemons)
                    if (pok !== $scope.BATTLEOBJS.FRIENDINDEX)
                        if ($scope.PKM.hp($scope.session.pokemons[pok]) > 0)
                            lives.push(pok);
                if (lives.length > 0) {
                    $scope.BATTLEOBJS.FRIENDINDEX = randomArray(lives);
                    POKEMONBATTLE.CHANGEPOKEMON($scope, $scope.BATTLEOBJS.FRIENDINDEX, function () {
                        if (callback)
                            callback({volatile: "", critical: false, miss: false, damage: 0, last: last});
                    });

                    return;
                }
            } else {
                if ($scope.BATTLEOBJS.TARGETS.length > 1) {
                    var indexCambiar = getRandomIntRange(1, $scope.BATTLEOBJS.TARGETS.length - 1);
                    if (indexCambiar) {
                        POKEMONBATTLE.CHANGETARGET($scope, indexCambiar, false, function () {
                            if (callback)
                                callback({volatile: "", critical: false, miss: false, damage: 0, last: last});
                        });
                    } else {
                        if (callback)
                            callback({volatile: "", critical: false, miss: false, damage: 0, last: last});
                    }
                    return;
                }
            }
        }
        if ($scope.PKM.hp(info.pokemonFriend) <= 0) {
            if (info.pokemonFriend.battle.status === "grudge") {
                if ($scope.PKM.lastMove) {
                    $scope.BATTLEOBJS.disableMove = $scope.PKM.lastMove;
                    $scope.PKM.lastMove = undefined;
                }
            }
            if (info.pokemonFriend.battle.status === "endure") {
                info.pokemonFriend.battle.status = undefined;
                info.pokemonFriend.battle.statusTurn = 0;
                info.pokemonFriend.battle.stats.hp = info.pokemonFriend.stats.hp - 10;
            } else {
                info.pokemonFriend.battle.status = undefined;
                POKEMONBATTLE.RUNLOSE($scope);
                if (callback)
                    callback({critical: false, miss: true, damage: 0});
                return;
            }
        }
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
        if (info.move.num === 383) {
            if ($scope.PKM.lastMove) {
                info.move = OSO($scope.PKM.lastMove);
                $scope.PKM.lastMove = undefined;
            }
        }
        var miss = POKEMONBATTLE.CALCS.IsMISS($scope, info, last);
        var volatileStop = POKEMONBATTLE.CALCS.VolatileStatus(info, $scope, last, miss);
        var critical = POKEMONBATTLE.CALCS.IsCRITICAL(info, miss);
        var damage = POKEMONBATTLE.CALCS.DAMAGE($scope, info, critical, false, last, miss);
        var result = {volatile: volatileStop, critical: critical, miss: miss, damage: damage, last: last};
        if (miss) {

            if (info.move.hasCustomRecoil) {
                $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.hpno(info.pokemonFriend) * 0.5));
            }
        }
        if (info.pokemonTarget.battle.status === "craftyshield") {
            info.pokemonTarget.battle.status = undefined;
            if (info.move.category === "Status") {
                ACTIONS.ANIMATION.PLAYNATURAL("barrier",
                    POKEMONBATTLE.XS(info.target.body.x + (info.target.body.width / 2)),
                    POKEMONBATTLE.YS(info.target.body.y + (info.target.body.height / 2)),
                    function () {
                        if (callback)
                            callback(result);
                    }, undefined, undefined, undefined, undefined, undefined);
                return;
            }
        }


        if (["painsplit"].indexOf(info.move.keyname) !== -1) {
            var las2hp = info.pokemonFriend.battle.stats.hp + info.pokemonTarget.battle.stats.hp;
            info.pokemonFriend.battle.stats.hp = las2hp / 2;
            info.pokemonTarget.battle.stats.hp = las2hp / 2;
        }

        if (info.move.keyname === "perishsong") {
            $scope.PKM.perishsong = 1;
        }
        if ($scope.PKM.perishsong) {
            if ($scope.PKM.perishsong >= 5) {
                info.pokemonFriend.battle.stats.hp = 999999;
                info.pokemonTarget.battle.stats.hp = 999999;
                $scope.PKM.perishsong = undefined;
            }
            if (last)
                $scope.PKM.perishsong++;
        }


        POKEMONBATTLE.CALCS.Status(result, info, $scope, function (statusstop, animation) {
            if (statusstop) {

                var time = 2100;
                if (animation) {
                    ACTIONS.ANIMATION.PLAYNATURAL("Generic_" + info.pokemonFriend.battle.statusType + "_" + info.pokemonFriend.battle.statusCondition,
                        POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                        POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                        function () {
                            POKEMONBATTLE.CALCS.RunStatus(result, $scope, info, animation);
                        }, undefined, undefined, undefined, undefined, undefined);
                    time += 1000;
                }
                setTimeout(function () {
                    if ($scope.PKM.hp(info.pokemonTarget) <= 0) {
                        info.pokemonTarget.battle.status = undefined;
                        if (info.pokemonTarget.battle.status === "endure") {
                            info.pokemonTarget.battle.status = undefined;
                            info.pokemonTarget.battle.statusTurn = 0;
                            info.pokemonTarget.battle.stats.hp = info.pokemonTarget.stats.hp - 10;
                        } else if (!info.isEnemy) {
                            POKEMONBATTLE.CHANGETARGET($scope, $scope.BATTLEOBJS.TARGETINDEX, true);
                        }
                    }
                    POKEMONBATTLE.RUNLOSE($scope);
                    if (info.pokemonTarget.battle.status === "destinybond") {
                        info.pokemonFriend.battle.stats.hp = info.pokemonFriend.stats.hp * ($scope.PKM.hp(info.pokemonTarget) / 100);
                    }
                    console.log("%c" + info.move.name + "--------------------------------------------------------------", "background-color:red;color:white;");

                    if (callback)
                        callback(result);
                }, time);

            } else {
                if (info.move.sound) {
                    ACTIONS.SOUND.PLAY(info.pokemonFriend.cryUrl, SOUNDS.system);
                }
                POKEMONBATTLE.ATTACK($scope, info.move, info.hero, info.enemy, info.friend, info.target,
                    function () {
                        POKEMONBATTLE.CALCS.MyEffect(info, $scope, critical, miss, function () {

                            if (damage < 0) {
                                ACTIONS.ANIMATION.PLAYNATURAL("b_strange",
                                    POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                                    POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                                    function () {
                                        if (callback)
                                            callback(false);
                                    }, undefined, undefined, undefined, undefined, undefined);
                                console.log("%c" + info.move.name + "--------------------------------------------------------------", "background-color:red;color:white;");
                                return;
                            }
                            if (!miss) {
                                $scope.PKM.stat(info.pokemonTarget, "hp", damage);
                                if (info.pokemonTarget.battle.status === "endure") {
                                    info.pokemonTarget.battle.status = undefined;
                                    info.pokemonTarget.battle.statusTurn = 0;
                                    info.pokemonTarget.battle.stats.hp = info.pokemonTarget.stats.hp - 20;
                                }
                            }

                            var time = 2000;
                            if (animation) {
                                ACTIONS.ANIMATION.PLAYNATURAL("Generic_" + info.pokemonFriend.battle.statusType + "_" + info.pokemonFriend.battle.statusCondition,
                                    POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)),
                                    POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)),
                                    function () {
                                        POKEMONBATTLE.CALCS.RunStatus(result, $scope, info, animation);
                                    }, undefined, undefined, undefined, undefined, undefined);
                                time += 1000;
                            }
                            if ([521, 369].indexOf(info.move.num) !== -1) {
                                $scope.BATTLEOBJS.batonpass = true;
                                $scope.PKM.mainMenu = true;
                            }
                            setTimeout(function () {
                                if ($scope.PKM.hp(info.pokemonTarget) <= 0) {
                                    if (info.move.num === 565) {
                                        $scope.PKM.stat(info.pokemonFriend, "atk", -4);
                                    }
                                    info.pokemonTarget.battle.status = undefined;
                                    if (!info.isEnemy) {
                                        POKEMONBATTLE.CHANGETARGET($scope, $scope.BATTLEOBJS.TARGETINDEX, true);
                                    }
                                }
                                $scope.PKM.lastMove = info.move;
                                POKEMONBATTLE.RUNLOSE($scope);
                                if (info.pokemonTarget.battle.status === "destinybond") {
                                    info.pokemonFriend.battle.stats.hp = info.pokemonFriend.stats.hp * ($scope.PKM.hp(info.pokemonTarget) / 100);
                                }
                                console.log("%c" + info.move.name + "--------------------------------------------------------------", "background-color:red;color:white;");
                                if (callback)
                                    callback(result);
                            }, time);
                        });
                    }, miss);

            }
        });

    },
    /**
     * @return {boolean}
     */
    IAMOVE: function ($scope) {
        var moves = $scope.PKM.target().battle.moves || $scope.PKM.target().moves;
        var index = getRandomInt(3);
        var pokemon = $scope.PKM.friend();
        var tyypes = pokemon.types;

        var yo = $scope.PKM.target();
        var yoTypess = $scope.PKM.target().types;
        var count = 0;
        var report = [];
        var nolodebili = 0;
        console.log("");
        if (pokemon.battle.status)
            if (pokemon.battle.status.indexOf("Am_") !== -1) {
                tyypes = [pokemon.battle.status.replace("Am_", "")];
                console.logblue("cambio a tipo " + tyypes + " pero no me engañará");
            }
        if (yo.battle.status)
            if (yo.battle.status.indexOf("Am_") !== -1) {
                yoTypess = [yo.battle.status.replace("Am_", "")];
                console.logblue("me cambie a tipo " + tyypes + " mmm");
            }

        for (var move of moves) {
            if (nolodebili >= 2)
                break;
            report[move.name] = [];
            if ($scope.BATTLEOBJS.disableMove)
                if ($scope.BATTLEOBJS.disableMove.num === move.num) {
                    report[move.name].push("disabled");
                    continue;
                }
            var prob = 0;
            //explotar
            if ($scope.PKM.hp($scope.PKM.target()) <= 25) {
                if (move.selfdestruct) {
                    report[move.name].push("no me queda mucho asi que explotaré");
                    return count;
                }
            } else {
                if (move.selfdestruct) {
                    continue;
                }
            }

            var multiplier = POKEMONBATTLE.CALCS.MULTIPLIER(tyypes, move.type, true);
            if (multiplier < 1) {
                report[move.name].push(" no le afecta");
                continue;
            }
            // 10 - 50
            if (move.flags.heal || move.drain) {
                if ($scope.PKM.hp(yo) < 40) {
                    prob += 50;
                    report[move.name].push(" para llenarme, porque estoy bajito " + prob);

                } else {
                    prob += 10;
                    report[move.name].push(" para llenarme " + prob);

                }
            }
            // 10 - 60
            if (move.secondary) {
                prob += 10;
                report[move.name].push("porque tiene algo adicional " + prob);

            }
            if (move.category !== "Status") {
                // 40 - 90
                prob += 20;
                report[move.name].push(" no es estatus " + prob);


                // 50 - 100
                if (yoTypess.indexOf(move.type) !== -1) {
                    prob += 15;
                    report[move.name].push(" es de mi tipo " + prob);

                }

                // 70 - 120
                if (move.basePower > 90) {
                    prob += 10;
                    report[move.name].push(" tiene mucho poder " + prob);

                }
                if (move.basePower > 150) {
                    prob += 20;
                    report[move.name].push(" esta OP " + prob);

                }

                // 80 - 130
                if ($scope.PKM.stat(yo, "spa") > $scope.PKM.stat(yo, "atk"))
                    if (move.category === "Special") {
                        prob += 15;
                        report[move.name].push(" pega con mis estadisticas especial " + prob);

                    }
                if ($scope.PKM.stat(yo, "spa") < $scope.PKM.stat(yo, "atk"))
                    if (move.category === "Physical") {
                        prob += 15;
                        report[move.name].push("pega con mis estadisticas fisica " + prob);
                    }
                if (yo.battle.stats.accuracy > 0) {
                    if (move.category.accuracy === true) {
                        prob += 30;
                        report[move.name].push("porque me segaron " + prob);
                    }
                }

                // 70 - 170
                if (multiplier === 3) {
                    prob += 10;
                    report[move.name].push(" porque por lo menos le doy " + prob);
                } else if (multiplier === 4) {
                    prob += 20;
                    report[move.name].push(" porque lo debilito " + prob);
                } else if (multiplier > 4) {
                    prob += 40;
                    report[move.name].push(" porque lo debilito mucho " + prob);
                } else if (multiplier === 2) {
                    nolodebili++;
                    prob -= 40;
                    report[move.name].push(" porque no lo debilito " + prob);
                } else if (multiplier === 1) {
                    nolodebili++;
                    prob -= 70;
                    report[move.name].push(" porque no lo debilito mucho " + prob);
                }

            } else {
                if (move.target === "self") {
                    if ($scope.PKM.stat(yo, "spa") > $scope.PKM.stat(yo, "atk")) {
                        var haystats = move.boosts ? move.boosts.spa : undefined;
                        if (!haystats)
                            if (move.self)
                                haystats = move.self.boots ? move.self.boots.spa : undefined;
                        if (haystats) {
                            if ($scope.PKM.target().battle.stats < 4) {
                                prob += (50 - ($scope.PKM.target().battle.stats * 10));
                                report[move.name].push(" porque incrementare mi mejor estadistica " + prob);
                            }
                        }
                    }
                    if ($scope.PKM.stat(yo, "atk") > $scope.PKM.stat(yo, "spa")) {
                        var haystats = move.boosts ? move.boosts.atk : undefined;
                        if (!haystats)
                            if (move.self)
                                haystats = move.self.boots ? move.self.boots.atk : undefined;
                        if (haystats) {
                            if ($scope.PKM.target().battle.stats < 4) {
                                prob += (50 - ($scope.PKM.target().battle.stats * 10));
                                report[move.name].push(" porque incrementare mi mejor estadistica " + prob);
                            }
                        }
                    }
                }

                if (move.status) {
                    prob += 10;
                    report[move.name].push(" porque me favorece con status " + prob);
                }
                if (move.volatileStatus) {
                    prob += 10;
                    report[move.name].push(" porque me favorece con status volatil " + prob);
                }
            }

            var proby = getRandomInt(100);
            report[move.name].push(prob + " >= " + proby);
            if (prob >= proby) {
                report[move.name].push("seleccionado! " + prob);
                console.log(report);
                return count;
            }
            count++;
        }
        console.log(report);
        console.logorange("pero como quiera voy a probar " + moves[index].name);
        console.log("");
        if (moves[index].selfdestruct) {
            index++;
            if (index > 3)
                index = 0;
        }
        return index;
    },
    IAKNOW: function () {
        POKEMONBATTLE.IACHANGE(ACTIONS.UNIT.TEST());
        ACTIONS.UNIT.TEST().PKM.target().moves[POKEMONBATTLE.IAMOVE(ACTIONS.UNIT.TEST())];
    },
    IAMASANALYST: function ($scope, medebilitacon, lodebilitacon, prob, selec) {
        if (selec <= prob) {
            if ((medebilitacon.length) > 0) {
                if ((lodebilitacon.length) > 0) {
                    var mypok = randomArray(lodebilitacon);
                    console.loggreen(`Me sirves!, te elijo a ti  ${$scope.BATTLEOBJS.TARGETS[mypok].name}`);
                    return {change: true, index: mypok};
                }
            }
        }
        return false;
    },
    IAMASPODEROSO: function ($scope, muchomaspoderoso, supertengomaspoderosos, prob, selec) {
        if (selec <= prob) {
            if (muchomaspoderoso) {
                if (supertengomaspoderosos.length > 1) {
                    var descartado = [];
                    for (var des of supertengomaspoderosos) {
                        for (var mov of $scope.PKM.friend().moves) {
                            if (mov.category !== "Status") {
                                var tyypes = $scope.BATTLEOBJS.TARGETS[des].types;
                                if ($scope.BATTLEOBJS.TARGETS[des].battle.status)
                                    if ($scope.BATTLEOBJS.TARGETS[des].battle.status.indexOf("Am_") !== -1) {
                                        tyypes = [$scope.BATTLEOBJS.TARGETS[des].battle.status.replace("Am_", "")];
                                    }
                                var conataqueeste = POKEMONBATTLE.CALCS.MULTIPLIER(tyypes, mov.type, true);
                                if (conataqueeste === 4) {
                                    descartado.push(des);
                                    console.logblue(`${$scope.BATTLEOBJS.TARGETS[des].name} es mas poderoso pero me lo debilita`);
                                }
                                if (conataqueeste > 4) {
                                    descartado.push(des);
                                    console.logblue(`${$scope.BATTLEOBJS.TARGETS[des].name} es mas poderoso pero me lo debilita muchisimo`);
                                }
                            }
                        }
                    }
                    if (descartado.length === supertengomaspoderosos.length) {
                        console.logorange(`pero no tengo opción, debo elegir uno porque me servirá más`);
                        return {change: true, index: randomArray(supertengomaspoderosos)};
                    } else {
                        for (var des of supertengomaspoderosos) {
                            if (descartado.indexOf(des) === -1) {
                                console.loggreen(`Eres poderoso, ${$scope.BATTLEOBJS.TARGETS[des].name} te elijo a ti!`);
                                return {change: true, index: des};
                            }
                        }
                    }
                }
            }
        }
        return false;
    },
    IACHANGE: function ($scope) {
        console.log("");

        if ($scope.PKM.target().battle.status === 'octolock' || $scope.PKM.target().battle.status === 'partiallytrapped' || $scope.PKM.friend().battle.status === 'ingrain') {
            return {change: false, index: 0};
        }
        //change logic
        if ($scope.BATTLEOBJS.TARGETS.length > 1) {
            var tyypes = $scope.PKM.target().types;
            if ($scope.PKM.target().battle.status)
                if ($scope.PKM.target().battle.status.indexOf("Am_") !== -1) {
                    tyypes = [$scope.PKM.target().battle.status.replace("Am_", "")];
                }
            var propfrad = getRandomInt(100);

            if ($scope.PKM.hp($scope.PKM.target()) < 30) {
                console.logred(`Pero No vale la pena cambiar ${$scope.PKM.target().name} esta casi muerto`);
                return {change: false, index: 0};
            }

            var maspoderoso = false;
            var muchomaspoderoso = false;
            if ($scope.PKM.target().power < ($scope.PKM.friend().power - 50)) {
                console.logorange("es mas poderoso que yo");
                maspoderoso = true;
            } else if ($scope.PKM.target().power < ($scope.PKM.friend().power - 100)) {
                console.logred("es mucho, mas poderoso que yo");
                muchomaspoderoso = true;
            }
            var tengomaspoderosos = [];
            var supertengomaspoderosos = [];
            var indexD = 0;
            var problemadepoderes = false;

            //Contra posibilidad
            var posiblementenoob = 0;
            for (var mov of $scope.PKM.friend().moves) {
                if (mov.category !== "Status") {
                    var conataqueeste = POKEMONBATTLE.CALCS.MULTIPLIER(tyypes, mov.type, true);
                    if (conataqueeste < 3) {
                        posiblementenoob += 1;
                        console.logblue("posiblemente el no sepa que no me afecta mucho " + mov.name);
                    }
                    if (conataqueeste > 3) {
                        if (posiblementenoob) {
                            posiblementenoob -= 1;
                            console.logorange("pero me debilita con " + mov.name + ", así que lo pensare mejor");
                        }
                    }
                }
            }
            var conataqueesteint = 0;
            for (var mov of $scope.PKM.target().moves) {
                if (mov.category !== "Status") {
                    var conataqueeste = POKEMONBATTLE.CALCS.MULTIPLIER($scope.PKM.friend().types, mov.type, true);
                    if (conataqueeste === 4) {
                        conataqueesteint++;
                        console.logblue("pero puedo atacarlo con " + mov.name);
                    }
                    if (conataqueeste > 4) {
                        conataqueesteint += 2;
                        console.loggreen("pero puedo atacarlo muy bien con " + mov.name);
                    }
                }
            }

            var medebilitacon = [];
            var medebilitaconmucho = [];
            for (var mov of $scope.PKM.friend().moves) {
                if (mov.category !== "Status") {
                    var conataqueeste = POKEMONBATTLE.CALCS.MULTIPLIER(tyypes, mov.type, true);
                    if (conataqueeste === 4) {
                        medebilitacon.push(mov);
                        console.logorange("me debilita con " + mov.name);
                    }
                    if (conataqueeste > 4) {
                        medebilitaconmucho.push(mov);
                        console.logred("me debilita mucho con " + mov.name);
                    }
                }
            }


            var frecuencia = [];

            var lodebilitacon = [];
            var lodebilitaconmucho = [];
            var indexD = 0;
            for (var mypok of $scope.BATTLEOBJS.TARGETS) {
                if (indexD === 0) {
                    indexD++;
                    continue;
                }
                for (var mov of mypok.moves) {
                    if (mov.category !== "Status") {
                        var conataqueeste = POKEMONBATTLE.CALCS.MULTIPLIER($scope.PKM.friend().types, mov.type, true);
                        var vanivel1 = false;
                        var vanivel2 = false;
                        if (conataqueeste === 4) {
                            vanivel1 = true;
                            console.logblue(`mmm, ${mypok.name} tiene: ` + mov.name);
                        }
                        if (conataqueeste > 4) {
                            vanivel2 = true;
                            console.logblue(`wow, ${mypok.name} tiene: ` + mov.name + "!");
                        }

                        if (vanivel1 || vanivel2) {
                            for (var mover of $scope.PKM.friend().moves) {
                                if (mover.category !== "Status") {
                                    var andaa = POKEMONBATTLE.CALCS.MULTIPLIER(mypok.types, mover.type, true);
                                    if (andaa === 4) {
                                        vanivel2 = vanivel1 = false;
                                        console.logorange(`pero ${mypok.name} es debil contra ` + mover.name);
                                    }
                                    if (andaa > 4) {
                                        vanivel2 = vanivel1 = false;
                                        console.logorange(`pero ${mypok.name} es debil contra ` + mover.name);
                                    }
                                }
                            }
                        }
                        if (vanivel1) {
                            if (!frecuencia[indexD])
                                frecuencia[indexD] = 1;
                            else
                                frecuencia[indexD]++;
                            lodebilitacon.push(indexD);
                        }
                        if (vanivel2) {
                            if (!frecuencia[indexD])
                                frecuencia[indexD] = 2;
                            else
                                frecuencia[indexD] += 2;
                            lodebilitaconmucho.push(indexD);
                        }
                    }
                }
                indexD++;
            }
            var resistocon = [];
            var resistoconmucho = [];
            var indexD = 0;
            for (var mypok of $scope.BATTLEOBJS.TARGETS) {
                if (indexD === 0) {
                    indexD++;
                    continue;
                }
                for (var mov of $scope.PKM.friend().moves) {
                    if (mov.category !== "Status") {
                        var conataqueeste = POKEMONBATTLE.CALCS.MULTIPLIER(mypok.types, mov.type, true);
                        var vanivel1 = false;
                        var vanivel2 = false;
                        if (conataqueeste === 2) {
                            vanivel1 = true;
                            console.logblue(`mmm, ${mypok.name} es resistente contra: ` + mov.name);
                        }
                        if (conataqueeste < 2) {
                            vanivel2 = true;
                            console.logblue(`wow, ${mypok.name} es muy resistente contra: ` + mov.name + "!");
                        }
                        if (vanivel1 || vanivel2) {
                            for (var mover of $scope.PKM.friend().moves) {
                                if (mover.category !== "Status") {
                                    var conataqueestecontrarestar = POKEMONBATTLE.CALCS.MULTIPLIER(mypok.types, mover.type, true);
                                    if (conataqueestecontrarestar > 3) {
                                        vanivel2 = vanivel1 = false;
                                        console.logorange(`pero, ${mypok.name} es debil contra: ` + mover.name);
                                        break;
                                    }
                                }
                            }
                        }
                        if (vanivel1) {
                            if (!frecuencia[indexD])
                                frecuencia[indexD] = 1;
                            else
                                frecuencia[indexD]++;
                            resistocon.push(indexD);
                        }
                        if (vanivel2) {
                            if (!frecuencia[indexD])
                                frecuencia[indexD] = 2;
                            else
                                frecuencia[indexD] += 2;
                            resistoconmucho.push(indexD);
                        }
                    }
                }
                indexD++;
            }

            if (maspoderoso || muchomaspoderoso) {
                var sguir = true;


                if (lodebilitacon.length !== 0 && lodebilitaconmucho.length !== 0) {
                    console.loggreen("es poderoso pero lo debilito");
                    sguir = false;
                }

                if (medebilitacon.length <= 0 && medebilitaconmucho.length <= 0)
                    if (resistocon.length !== 0 && resistoconmucho.length !== 0) {
                        console.loggreen("es poderoso pero lo resisto");
                        sguir = false;
                    }

                if (sguir) {
                    problemadepoderes = true;
                    for (var mypok of $scope.BATTLEOBJS.TARGETS) {
                        if (indexD === 0) {
                            indexD++;
                            continue;
                        }

                        var vanivel1 = false;
                        var vanivel2 = false;
                        if (mypok.power > ($scope.PKM.friend().power + 50)) {
                            vanivel1 = true;
                            console.logblue("tengo a " + mypok.name + " que es mas poderoso");
                        } else if (mypok.power > ($scope.PKM.friend().power + 100)) {
                            vanivel2 = true;
                            console.loggreen("tengo a " + mypok.name + " que es mucho mas poderoso");
                        }

                        for (var mover of $scope.PKM.friend().moves) {
                            if (mover.category !== "Status") {
                                var andaa = POKEMONBATTLE.CALCS.MULTIPLIER(mypok.types, mover.type, true);
                                if (andaa === 4) {
                                    vanivel2 = vanivel1 = false;
                                    console.logorange(`pero ${mypok.name} es debil contra ` + mover.name);
                                }
                                if (andaa > 4) {
                                    vanivel2 = vanivel1 = false;
                                    console.logorange(`pero ${mypok.name} es debil contra ` + mover.name);
                                }
                            }
                        }

                        if (vanivel1) {
                            if (!frecuencia[indexD])
                                frecuencia[indexD] = 1;
                            else
                                frecuencia[indexD]++;
                            tengomaspoderosos.push(indexD);
                        }
                        if (vanivel2) {
                            if (!frecuencia[indexD])
                                frecuencia[indexD] = 2;
                            else
                                frecuencia[indexD] += 2;
                            supertengomaspoderosos.push(indexD);
                        }
                        indexD++;
                    }

                    //maspoderosos
                    var cambio = POKEMONBATTLE.IAMASPODEROSO($scope, muchomaspoderoso, supertengomaspoderosos, 100, propfrad);
                    if (cambio)
                        return cambio;
                    cambio = POKEMONBATTLE.IAMASPODEROSO($scope, maspoderoso, supertengomaspoderosos, 60, propfrad);
                    if (cambio)
                        return cambio;
                    cambio = POKEMONBATTLE.IAMASPODEROSO($scope, maspoderoso, tengomaspoderosos, 30, propfrad);
                    if (cambio)
                        return cambio;
                    //maspoderosos
                }
            }


            var todoestatranquilo = false;
            if (medebilitacon.length === 0 && medebilitaconmucho.length === 0) {
                if (conataqueesteint > 0 || posiblementenoob > 1) {
                    if ((posiblementenoob) > 2) {
                        console.loggreen("Me quedo con este por posiblemente noob alto");
                        return {change: false, index: 0};
                    }
                    if ((conataqueesteint) > 2) {
                        console.loggreen("Me quedo con este porque tengo muchas opciones");
                        return {change: false, index: 0};
                    }
                    if ((conataqueesteint + posiblementenoob) > 2) {
                        console.loggreen("Me quedo con este por opciones y noob");
                        return {change: false, index: 0};
                    }
                    if ((conataqueesteint + posiblementenoob) > 1) {

                        if (propfrad > 10) {
                            console.logblue("Me quedo con este aunque podria cambiar 10%");
                            return {change: false, index: 0};
                        }
                    }
                    if ((conataqueesteint + posiblementenoob) > 0) {
                        if (propfrad > 25) {
                            console.logblue("Me quedo con este aunque podria cambiar 25%");
                            return {change: false, index: 0};
                        }
                    }
                } else {
                    todoestatranquilo = true;
                }
            }

            if (todoestatranquilo) {
                var freco = 0;
                for (var freq in frecuencia) {
                    if (frecuencia[freq] > 2) {
                        freco = freq;
                    }
                }
                if (freco && propfrad <= (frecuencia[freq] * 15)) {
                    console.loggreen("Todo esta tranquilo pero aún así tengo muchas opciones con " + $scope.BATTLEOBJS.TARGETS[freco].name);
                    return {change: true, index: freco};
                } else {
                    console.loggreen("Aunque no sea mcuha ventaja, Todo esta bajo control con este pokemon");
                    return {change: false, index: 0};
                }
            }


            //kunay
            cambio = POKEMONBATTLE.IAMASANALYST($scope, medebilitaconmucho, lodebilitaconmucho, 100, propfrad);
            if (cambio) return cambio;
            cambio = POKEMONBATTLE.IAMASANALYST($scope, medebilitaconmucho, lodebilitacon, 95, propfrad);
            if (cambio) return cambio;
            cambio = POKEMONBATTLE.IAMASANALYST($scope, medebilitaconmucho, resistoconmucho, 85, propfrad);
            if (cambio) return cambio;
            cambio = POKEMONBATTLE.IAMASANALYST($scope, medebilitaconmucho, resistocon, 75, propfrad);
            if (cambio) return cambio;

            cambio = POKEMONBATTLE.IAMASANALYST($scope, medebilitacon, lodebilitaconmucho, 100, propfrad);
            if (cambio) return cambio;
            cambio = POKEMONBATTLE.IAMASANALYST($scope, medebilitacon, lodebilitacon, 95, propfrad);
            if (cambio) return cambio;
            cambio = POKEMONBATTLE.IAMASANALYST($scope, medebilitacon, resistoconmucho, 75, propfrad);
            if (cambio) return cambio;
            cambio = POKEMONBATTLE.IAMASANALYST($scope, medebilitacon, resistocon, 70, propfrad);
            if (cambio) return cambio;


            if (propfrad >= 99) {
                var randomIndex = getRandomIntRange(1, $scope.BATTLEOBJS.TARGETS.length - 1);
                console.logorange(`por amor al arte elijo a ${$scope.BATTLEOBJS.TARGETS[randomIndex].name}`);
                return {change: true, index: randomIndex};
            }

        }
        return {change: false, index: 0};
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
        if (pokemon.battle.status === "attract") {
            pokemon.battle.status = undefined;
        }
    },
    CLEARSTATSEND: function (pokemon) {
        var getHP = OSO(pokemon.battle.stats.hp);
        if (pokemon.battle.transform) {
            pokemon = OSO(pokemon.battle.transform);
            pokemon.battle.stats.hp = getHP;
        }
        var stats = ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"];
        for (var stat of stats)
            pokemon.battle.stats[stat] = 0;
        pokemon.battle.status = undefined;
        pokemon.battle.statusTurn = 0;
    },
    RUNTURN: function ($scope, move, change) {
        console.clear();
        $scope.PKM.pokemonDetail = false;
        $scope.PKM.menu = false;
        $scope.PKM.mainMenu = false;
        if ($scope.BATTLEOBJS.numTurn === undefined)
            $scope.BATTLEOBJS.numTurn = 1;
        else
            $scope.BATTLEOBJS.numTurn++;
        if (move)
            if ([226, 516, 575].indexOf(move.num) !== -1) {
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
                }, whyisDead);
            } else {
                var enemyChange = POKEMONBATTLE.IACHANGE($scope);
                if (enemyChange.change) {
                    POKEMONBATTLE.CHANGETARGET($scope, enemyChange.index, false, function () {

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
                    var enemySpeed = $scope.PKM.stat($scope.PKM.target(), 'spd') * (enemyAction.move.priority * 100);
                    if ($scope.PKM.target().battle.status === "par")
                        enemySpeed = enemySpeed / 3;
                    if ($scope.PKM.target().battle.status === "tailwind")
                        enemySpeed = enemySpeed * 2;
                    var friendSpeed = $scope.PKM.stat($scope.PKM.friend(), 'spd') * (friendAction.move.priority * 100);
                    if ($scope.PKM.friend().battle.status === "par")
                        friendSpeed = friendSpeed / 3;
                    if ($scope.PKM.friend().battle.status === "tailwind")
                        friendSpeed = friendSpeed * 2;
                    var primero = {};
                    var segundo = {};
                    if (enemySpeed > friendSpeed) {
                        primero = enemyAction;
                        segundo = friendAction;
                    } else {
                        segundo = enemyAction;
                        primero = friendAction;
                    }
                    if ($scope.BATTLEOBJS.terrain === "trickroom") {
                        if (enemySpeed < friendSpeed) {
                            primero = enemyAction;
                            segundo = friendAction;
                        } else {
                            segundo = enemyAction;
                            primero = friendAction;
                        }
                    }
                    POKEMONBATTLE.TURNING($scope, primero, function (result) {
                        POKEMONBATTLE.CALCANIMATION($scope, result, primero, function (stop) {
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
    CHANGEPOKEMON: function ($scope, index, callback, isdead) {
        var pass = "";
        if (isdead)
            POKEMONBATTLE.CLEARSTATSEND($scope.PKM.friend());
        else
            POKEMONBATTLE.CLEARSTATS($scope.PKM.friend());
        if ($scope.PKM.friend())
            if ($scope.PKM.friend().battle)
                if ($scope.PKM.friend().battle.status) {
                    if ($scope.PKM.friend().battle.status === "spikes") {
                        pass = "spikes";
                    }
                    if ($scope.PKM.friend().battle.status === "toxicspikes") {
                        pass = "toxicspikes";
                    }
                    if ($scope.PKM.friend().battle.status === "stealthrock") {
                        pass = "stealthrock";
                    }
                }
        ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.FRIEND.body, 0.2, 0);
        $scope.BATTLEOBJS.HERO.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
        var animationBack = $scope.BATTLEOBJS.batonpass ? "BatonAnimation" : "GetBack";
        $scope.BATTLEOBJS.batonpass = false;

        ACTIONS.ANIMATION.PLAYNATURAL(animationBack,
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
                                if ($scope.BATTLEOBJS.slot === "healingwish") {
                                    $scope.PKM.friend().battle.stats.hp = 0;
                                }
                                if (pass === "spikes") {
                                    $scope.PKM.friend().battle.status = "spikes";
                                    $scope.PKM.friend().battle.statusTurn = 0;
                                    $scope.PKM.stat($scope.PKM.friend(), "hp", ($scope.PKM.hpno($scope.PKM.friend()) / 3))
                                }
                                if (pass === "toxicspikes") {
                                    $scope.PKM.friend().battle.status = "toxicspikes";
                                    $scope.PKM.friend().battle.statusTurn = 0;
                                }
                                if (pass === "stealthrock") {
                                    $scope.PKM.friend().battle.status = "stealthrock";
                                    $scope.PKM.friend().battle.statusTurn = 0;
                                    $scope.PKM.stat($scope.PKM.friend(), "hp", ($scope.PKM.hpno($scope.PKM.friend()) / 3))
                                }
                                setTimeout(function () {
                                    if (callback)
                                        callback();
                                }, 1000);
                            });
                    });

            });
    },
    CHANGETARGET: function ($scope, index, isdead, callback) {
        var pass = "";
        POKEMONBATTLE.CLEARSTATS($scope.PKM.target());
        if ($scope.PKM.target())
            if ($scope.PKM.target().battle)
                if ($scope.PKM.target().battle.status) {
                    if ($scope.PKM.target().battle.status === "spikes") {
                        pass = "spikes";
                    }
                    if ($scope.PKM.target().battle.status === "toxicspikes") {
                        pass = "toxicspikes";
                    }
                    if ($scope.PKM.friend().battle.status === "stealthrock") {
                        pass = "stealthrock";
                    }
                }
        if (isdead) {
            if ($scope.BATTLEOBJS.TARGETS.length === 1) {
                POKEMONBATTLE.END($scope, true);
                return;
            }
            $scope.BATTLEOBJS.TARGETS.splice($scope.BATTLEOBJS.TARGETINDEX, 1);
        }
        $scope.PKM.pokemonDetail = false;
        $scope.PKM.menu = false;


        ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.TARGET.body, 0.2, 0);
        $scope.BATTLEOBJS.ENEMY.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
        ACTIONS.ANIMATION.PLAYNATURAL("GetBack",
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
                                if ($scope.BATTLEOBJS.slot === "healingwish") {
                                    $scope.PKM.target().battle.stats.hp = 0;
                                }
                                if (pass === "spikes") {
                                    $scope.PKM.target().battle.status = "spikes";
                                    $scope.PKM.friend().battle.statusTurn = 0;
                                    $scope.PKM.stat($scope.PKM.target(), "hp", ($scope.PKM.hpno($scope.PKM.target()) / 3))
                                }
                                if (pass === "toxicspikes") {
                                    $scope.PKM.target().battle.status = "toxicspikes";
                                    $scope.PKM.target().battle.statusTurn = 0;
                                }
                                if (pass === "stealthrock") {
                                    $scope.PKM.target().battle.status = "stealthrock";
                                    $scope.PKM.friend().battle.statusTurn = 0;
                                    $scope.PKM.stat($scope.PKM.target(), "hp", ($scope.PKM.hpno($scope.PKM.target()) / 3))
                                }
                                if (callback)
                                    callback();
                            });
                    });

            });
    },
    ATTACK: function ($scope, cmove, hero, enemy, friend, target, callback, miss) {
        if (miss) {
            setTimeout(function () {

                if (callback)
                    callback()
            }, 500);
            return;
        }
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
            var genericAnimation = `Generic_${cmove.type}${Addi}`;

            var sufri = "shake";
            if (move.isZ) {
                sufri = "supershake";
            }

            var existanimation = $scope.animations[cmove.keyname];
            if (existanimation)
                genericAnimation = existanimation.name;

            var howsfinal = `${genericPokemon}:${genericAction}:${genericAnimation}:${sufri}`;
            if (move.drain) {
                howsfinal = "," + `${genericPokemon}:back:${genericAnimation}:${sufri}`;
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
            ACTIONS.SOUND.PLAY(friend.body.cry, SOUNDS.system);
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
        $scope.BATTLEOBJS.clima = "";
        for (var poke of $scope.session.pokemons) {
            POKEMONBATTLE.CLEARSTATSEND($scope.PKM.friend());
        }
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
        sprite.cry = pokemon.cryUrl;
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
    REFRIEND: function ($scope) {
        var pokemon = $scope.session.pokemons[$scope.BATTLEOBJS.FRIENDINDEX];
        var bound = $scope.getResource(pokemon.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/')).cloneNode(true);
        $scope.BATTLEOBJS.FRIEND.dom.src = bound.src;
        $scope.BATTLEOBJS.FRIEND.shadowdom.style = `background-color: black;opacity: 0.5;z-index:8;width:${bound.width + 40}px;height:${bound.height / 2}px;border-radius: 100%;`;
        bound.style = "z-index:9;" + pokemon.style;
        var sprite = $scope.BATTLEOBJS.FRIEND.body;
        var wdif = bound.width - 70;
        sprite.x = POKEMONBATTLE.X(($scope.BATTLEOBJS.HERO.body.x - wdif) + 50);
        var hdif = 70 - bound.height;
        sprite.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.HERO.body.y + 50) + (hdif));
        sprite.height = bound.height;
        sprite.width = bound.width;
        sprite.cry = pokemon.cryUrl;
        sprite.scaleX = sprite.scaleY = 1.3;
        var shadow = $scope.BATTLEOBJS.FRIEND.shadowdom;
        shadow.x = POKEMONBATTLE.X(($scope.BATTLEOBJS.HERO.body.x - wdif) + 50) - 20;
        shadow.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.HERO.body.y + 50) + (hdif) + bound.height);
        shadow.height = bound.height;
        shadow.width = bound.width;
        shadow.scaleX = shadow.scaleY = 1.3;
    },
    RETARGET: function ($scope) {
        var pokemon = $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX];
        var bound = $scope.getResource(pokemon.imageUrl).cloneNode(true);
        $scope.BATTLEOBJS.TARGET.dom.src = bound.src;
        $scope.BATTLEOBJS.TARGET.shadowdom.style = `background-color: black;opacity: 0.5;z-index:8;width:${bound.width + 40}px;height:${bound.height / 2}px;border-radius: 100%;`;
        bound.className = "pokemonBattleFriend";
        bound.style = "z-index:9;" + pokemon.style;
        var sprite = $scope.BATTLEOBJS.TARGET.body; //kunay
        var wdif = bound.width - 120;
        sprite.x = POKEMONBATTLE.X((STAGE.canvas.width / 2)) + 30;
        var hdif = 70 - bound.height;
        sprite.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.ENEMY.body.y - 50) + (hdif));
        sprite.height = bound.height;
        sprite.width = bound.width;
        sprite.scaleX = $scope.BATTLEOBJS.ENEMY.body.scaleX;
        sprite.cry = pokemon.cryUrl;
        var shadow = $scope.BATTLEOBJS.TARGET.shadowdom;
        shadow.x = (POKEMONBATTLE.X((STAGE.canvas.width / 2)) + 30) - 20;
        shadow.y = sprite.y + (bound.height / 2) + 15;
        shadow.height = bound.height;
        shadow.width = bound.width;
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
        sprite.cry = pokemon.cryUrl;
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
    }

};