willreturn = undefined;
POKEMON = {
    EVOL: 22,
    QUALITY: 35,
    QUALITY_ELE: 100,
    wildRanges: [
        [0, 87],
        [88, 96],
        [97, 99],
        [100, 100]
    ],
    wildRangesSunset: [
        [0, 40],
        [41, 96],
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
        gymFriendProFull: [1, 1, 1, 1, 1, 2],
        gym: [1, 1, 1, 1, 1, 2],
        gymPro: [1, 1, 1, 1, 2, 2],
        gymProFull: [1, 1, 1, 2, 2, 2],
        profesor: [1, 1, 2, 2, 2, 2],
        profesorPro: [2, 2, 2, 2, 2, 3],
        profesorProFull: [2, 2, 2, 2, 3, 3]
    },
    categories: [
        {
            name: "Omega",
            rules: `d.power>0 && d.power<=220`,
            pokeball: 70
        },
        {
            name: "Tiny",
            rules: `d.power>220 && d.power<=260`,
            pokeball: 90
        },
        {
            name: "Tiny Pro",
            rules: `d.power>260 && d.power<=290`,
            pokeball: 105
        },
        {
            name: "Basic",
            rules: `d.power>290 && d.power<=320`,
            pokeball: 120
        },
        {
            name: "Basic Pro",
            rules: `d.power>320 && d.power<=360`,
            pokeball: 140
        },
        {
            name: "Medium",
            rules: `d.power>360 && d.power<=390`,
            pokeball: 155
        },
        {
            name: "Medium Pro",
            rules: `d.power>390 && d.power<=420`,
            pokeball: 170
        },
        {
            name: "Advanced",
            rules: `d.power>420 && d.power<=460`,
            pokeball: 190
        },
        {
            name: "Advanced Pro",
            rules: `d.power>460 && d.power<=490`,
            pokeball: 205
        },
        {
            name: "Ultra",
            rules: `d.power>490 && d.power<=520`,
            pokeball: 220
        },
        {
            name: "Ultra Pro",
            rules: `d.power>520 && d.power<=560`,
            pokeball: 240
        },
        {
            name: "Mega",
            rules: `d.power>560 && d.power<=590`,
            pokeball: 255
        },
        {
            name: "Mega Pro",
            rules: `d.power>590 && d.power<=620`,
            pokeball: 270
        },
        {
            name: "Special",
            rules: `d.power>620 && d.power<=660`,
            pokeball: 290
        },
        {
            name: "Special Pro",
            rules: `d.power>660 && d.power<=690`,
            pokeball: 305
        },
        {
            name: "God",
            rules: `d.power>690 && d.power<=720`,
            pokeball: 320
        },
        {
            name: "God Pro",
            rules: `d.power>720 && d.power<=760`,
            pokeball: 340
        },
        {
            name: "Alphas",
            rules: `d.power>760 && d.power<=2000`,
            pokeball: 410
        },
        {
            name: "Todos",
            rules: `d.power>0 && d.power<=2000`,
            pokeball: 450
        }
    ]
};
POKEMON.categoriesarray = [];
for (var category of POKEMON.categories) {
    POKEMON.categoriesarray.push(category.name);
}
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
STATGLOBAL = ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"];

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
    /**
     * @return {boolean}
     */
    WASCATCH: function ($scope, info, intento) {
        var pokeball = POKEMOMFIND.tier_get(SESSION.tier).pokeball;
        var pokemon_power = info.pokemonTarget.power;
        var pokemonhp = $scope.PKM.hp(info.pokemonTarget) + (intento * 5);
        var prob = (100 - ((((pokemon_power) * (pokemonhp / 100)) / pokeball) * 100));
        var accert = getRandomInt(100);
        console.loggreen(`Intento de atrapar ${intento}, power: ${pokemon_power}, hp: ${pokemonhp}, prob: ${prob}, accert: ${accert}`);
        return (accert < prob);
    },
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
    /**
     * @return {number}
     */
    QUALITY: function (pokemon) {
        var date1 = new Date(pokemon.date);
        var date2 = new Date();
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        var realq = pokemon.quality;
        realq += Math.ceil(Difference_In_Days / 10);
        if (pokemon.elegido) {
            realq = realq > POKEMON.QUALITY_ELE ? POKEMON.QUALITY_ELE : realq;
        } else {
            realq = realq > POKEMON.QUALITY ? POKEMON.QUALITY : realq;
        }
        return realq;
    },
    EVOLPROB: function (name, kill) {
        var pokemon = POKEMOMFIND.firstByName(name.toLowerCase());
        var killpoke = POKEMOMFIND.firstByName((kill || "").toLowerCase());
        if (pokemon) {
            var mega = false;
            if (pokemon.otherFormes) {
                for (var form of pokemon.otherFormes) {
                    if (form.indexOf("mega") !== -1) {
                        if (!Array.isArray(mega))
                            mega = [];
                        mega.push(form);
                    }
                }
            }
            var evos = OSO(pokemon.evos);
            if (mega) {
                if (!evos) {
                    evos = [];
                }
                evos = evos.concat(mega);
            }
            if (evos) {
                if (evos.length > 0) {
                    var epokemon = POKEMOMFIND.firstByName(evos[0].toLowerCase());
                    var prob = Math.ceil(POKEMON.EVOL - ((epokemon.power - pokemon.power) / 10) - ((pokemon.power - 100) / 100));
                    if (killpoke) {
                        prob += Math.ceil(((killpoke.power - pokemon.power) / 100));
                    }
                    if (pokemon.prevo)
                        prob -= 3;
                    return {prob: (prob < 0 ? 1 : prob), evo: randomArray(evos)};
                }
            }
        }
        return {prob: 0, evo: undefined};
    },
    TRAINER: function (tier, type, base) {
        var trainer = POKEMON.trainersRange[type || "noob"];
        var pokemons = [];
        var extralevel = 0;
        var rebote = 0;
        for (var pokemon of trainer) {
            var found = false;
            while (!found) {
                var index = POKEMON.categoriesarray.indexOf(tier) + pokemon + (rebote || extralevel);
                if (!POKEMON.categoriesarray[index])
                    rebote = extralevel - 1;
                var pokis = POKEMOMFIND.WILD(POKEMON.categoriesarray[index], base || false, true);
                if (pokis === null) {
                    extralevel++;
                    if (rebote)
                        rebote--;
                } else {
                    pokemons.push(pokis);
                    found = true;
                }
            }
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
        var ranges = ACTIONS.AMBIENT.TIME() === "Sunset" ? POKEMON.wildRangesSunset : POKEMON.wildRanges;
        for (var range of ranges) {
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
            if (base.length) {
                pokemons = pokemons.filter(d => {
                    if (d.types.length === 1)
                        return base.indexOf(d.types[0]) !== -1;
                    else
                        return base.indexOf(d.types[0]) !== -1 || base.indexOf(d.types[1]) !== -1;
                });
            }
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
            if (tier === category.name) {
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
    EVOLUTION: function (pokemon, evol) {
        var newpokemon = POKEMOMFIND.GENERATE(evol, pokemon.shiny);
        var nochange = ["quality", "shiny", "gender", "superShiny", "style", "date"];
        for (var p of nochange)
            newpokemon[p] = OSO(pokemon[p]);
        return newpokemon;
    },
    GENERATE: function (name, shinyexact, elegido) {
        var pokemon = POKEMOMFIND.firstByName(name.toLowerCase());
        if (pokemon) {
            var abilities = objToArray(pokemon.abilities);
            var ability = randomArray(abilities);
            var giga = false;
            if (pokemon.otherFormes) {
                for (var form of pokemon.otherFormes) {
                    if (form.indexOf("gmax") !== -1)
                        giga = form;
                }
            }
            var sound_pokepath = DOMAINRESOURCE + `resources/poekemon/audio/cries/${POKEDEX_.cleanName(pokemon.baseSpecies || name)}.ogg`;
            if (parseInt(pokemon.num) <= 721)
                sound_pokepath = DOMAINRESOURCE + `resources/poekemon/audio/cries_anime/${POKEDEX_.cleanName(pokemon.baseSpecies || name)}.ogg`;
            var sexo = getRandomInt(100) > 50 ? "male" : "female";
            var shiny = getRandomInt(100) > 98;
            var superShiny = false;
            if (shiny) {
                superShiny = getRandomInt(100) > 80;
            }
            var style = "";
            if (superShiny) {
                shiny = false;
                style = superShiny ? `filter: hue-rotate(${getRandomIntRange(40, 320)}deg);` : "";
            }
            if (shinyexact) {
                shiny = true;
                style = "";
            }
            var mymoves = MOVESFIND.POKEMON_MOVES_GENERATE(name);
            var statis = OSO(pokemon.baseStats);
            statis.accuracy = 100;
            statis.evasion = 0;
            var finalability = MOVESFIND.ABILITY(ability);
            var ratinidex = Math.floor(finalability.rating);
            ratinidex = ratinidex < 0 ? 0 : ratinidex;

            finalability = {
                name: finalability.name,
                keyname: finalability.keyname,
                shortDesc: finalability.shortDesc,
                rating: ratinidex
            };


            var toreturn = {
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
                ability: finalability,
                heightm: pokemon.heightm,
                weightkg: pokemon.weightkg,
                giga: giga,
                battle: OSO(BATTLEDEFAULT),
                power: pokemon.power
            };
            if (elegido) {
                toreturn.elegido = true;
            }
            return toreturn;
        } else
            return undefined;
    },
    ADD: function (item) {
        var pokemons = OSO(SESSION.pokemons);
        if (pokemons.length >= 6) {
            swal({
                title: LANGUAGE.t(`You cannot have more than 6 Pokémon on your team, you want to send `) + item.name + LANGUAGE.t(` to the vault?`),
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: LANGUAGE.t("Yes"),
                cancelButtonText: LANGUAGE.t("No"),
                closeOnConfirm: false,
                showLoaderOnConfirm: false,
            }, function () {
                var bobedas = OSO(SESSION.bobeda);
                if (bobedas.length >= 10) {
                    swal(LANGUAGE.t(`Sorry your vault is already full, `) + item.name + LANGUAGE.t(` It will not be with you, be sure to create space for your next capture.`));
                } else {
                    bobedas.push(item);
                    ACTIONS.GAME.SESSION({bobeda: bobedas});
                    swal(`${item.name}, ` + LANGUAGE.t(`has been kept in your vault`));
                }
            });
        } else {
            pokemons.push(item);
            ACTIONS.GAME.SESSION({pokemons: pokemons});
            swal(`${item.name}, ` + LANGUAGE.t(`has been kept in your vault`));
            swal(`${item.name}, ` + LANGUAGE.t(`has joined your team.`));
        }
    },
    ADDWILD: function () {
        var item = POKEMOMFIND.WILD(SESSION.tier);
        POKEMOMFIND.ADD(item);
    },
    DELETE: function (item, index) {
        swal({
            title: LANGUAGE.t(`Are you sure to eliminate `) + `${item.name}?`,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: LANGUAGE.t("Yes"),
            cancelButtonText: LANGUAGE.t("No"),
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
        }, function () {
            SESSION.pokemons.splice(index, 1);
            ACTIONS.GAME.SESSION({pokemons: SESSION.pokemons});
            swal(`${item.name}, ` + LANGUAGE.t(`go back to your wild life :( bye`));
        });
    },
    TRASLADE: function (item, index) {
        swal({
            title: LANGUAGE.t(`Are you sure to move `) + `${item.name}` + LANGUAGE.t(`to your vault?`),
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: LANGUAGE.t("Yes"),
            cancelButtonText: LANGUAGE.t("No"),
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
        }, function () {
            var item = OSO(SESSION.pokemons[index]);
            SESSION.pokemons.splice(index, 1);
            var bobedas = OSO(SESSION.bobeda);
            if (bobedas.length >= 10) {
                swal(LANGUAGE.t(`Sorry your vault is already full`));
            } else {
                bobedas.push(item);
                ACTIONS.GAME.SESSION({bobeda: bobedas, pokemons: SESSION.pokemons});
                swal(`${item.name}, ` + LANGUAGE.t(`has been kept in your vault`));
            }
        });
    },
    INCLUDE: function (item, index) {
        swal({
            title: LANGUAGE.t(`Are you sure to join `) + item.name + LANGUAGE.t(` to your team? `),
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: LANGUAGE.t("Yes"),
            cancelButtonText: LANGUAGE.t("No"),
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
        }, function () {
            var item = OSO(SESSION.bobeda[index]);
            SESSION.bobeda.splice(index, 1);
            var pokemons = OSO(SESSION.pokemons);
            if (pokemons.length >= 6) {
                swal(LANGUAGE.t(`Sorry your team is already full`));
            } else {
                pokemons.push(item);
                ACTIONS.GAME.SESSION({bobeda: SESSION.bobeda, pokemons: pokemons});
                swal(`${item.name}, ` + LANGUAGE.t(`has been kept in your vault`));
                swal(`${item.name}, ` + LANGUAGE.t(`has joined your team`));
            }
        });
    },
    DELETE_BOBEDA: function (item, index) {
        swal({
            title: LANGUAGE.t(`Are you sure to eliminate `) + `${item.name}?`,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: LANGUAGE.t("Yes"),
            cancelButtonText: LANGUAGE.t("No"),
            closeOnConfirm: false,
            showLoaderOnConfirm: false,
        }, function () {
            SESSION.bobeda.splice(index, 1);
            ACTIONS.GAME.SESSION({bobeda: SESSION.bobeda});
            swal(LANGUAGE.t(`The teacher is the new owner of `) + item.name + " " + LANGUAGE.t(` Thank you`));
        });
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
    //Base
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
    LAUNCH: function ($scope, tier, trainer, win, loose, revenge) {
        if (!$scope.session.pokemons.length)
            return;
        $("#footer, #footer2").hide();

        $scope.PKM.forcehidemenu = false;
        $scope.PKM.pokemonDetail = false;
        $scope.PKM.pokeballCount = 5;
        $scope.PKM.pokeballLevel = POKEMON.categoriesarray.indexOf(tier);
        $scope.PKM.catchMove = {
            "num": 0,
            "accuracy": true,
            "basePower": 0,
            "category": "Status",
            "desc": LANGUAGE.t("Catch Pokemon depends your current medals"),
            "shortDesc": LANGUAGE.t("Catch Pokemon depends your current medals"),
            "id": "catchpokemon",
            "isViable": true,
            "name": LANGUAGE.t("Catch"),
            "pp": 5,
            "priority": 10,
            "flags": {},
            "target": "normal",
            "type": "Fire",
            "contestType": "Cool",
            "keyname": "catchpokemon"
        };
        $scope.PKM.menu = false;
        ACTIONS.GAME.BLOCK();
        ACTIONS.SOUND.STOPALL();

        $scope.BATTLEOBJS = {};
        $scope.BATTLEOBJS.allowtrap = false;
        $scope.BATTLEOBJS.winbattle = win;
        $scope.BATTLEOBJS.losebattle = loose;
        ACTIONS.GAME.SCREEN(0.5, "#000", 1, function () {
            for (var l = 0; l <= 9; l++) {
                eval(`layer${l}.visible = false;`);
            }

            layerBattle.removeAllChildren();
            layerBattle.alpha = 0;
            //DrawBackGround

            $scope.BATTLEOBJS.friendParty = {};
            $scope.BATTLEOBJS.targetParty = {};
            $scope.BATTLEOBJS.clima = "";
            $scope.BATTLEOBJS.terrain = "";
            $scope.BATTLEOBJS.batonpass = false;
            $scope.BATTLEOBJS.FRIENDINDEX = POKEMONBATTLE.LIVES($scope, $scope.session.pokemons, 99)[0];
            $scope.BATTLEOBJS.TARGETINDEX = 0;
            $scope.BATTLEOBJS.BG = POKEMONBATTLE.DRAWBG($scope);
            $scope.BATTLEOBJS.HERO = POKEMONBATTLE.HERO($scope);
            $scope.BATTLEOBJS.isWild = !trainer;

            if (CURRENTONLINE) {
                $scope.BATTLEOBJS.isWild = false;
                $scope.BATTLEOBJS.ENEMY = POKEMONBATTLE.ENEMY($scope, trainer);
                if (CURRENTONLINE) {
                    $scope.BATTLEOBJS.TARGETS = CURRENTONLINEDATA.pokemons;
                    for (var pok of $scope.BATTLEOBJS.TARGETS) {
                        POKEMONBATTLE.CLEARSTATSEND(pok);
                        pok.battle.stats.hp = 0;
                        pok.battle.status = undefined;
                        pok.battle.statusTurn = 0;
                    }
                    $scope.BATTLEOBJS.TARGETINDEX = getRandomInt($scope.BATTLEOBJS.TARGETS.length - 1);
                }
            } else if (trainer) {
                $scope.BATTLEOBJS.trainerProp = CURRENTTRAINER;
                $scope.BATTLEOBJS.ENEMY = POKEMONBATTLE.ENEMY($scope, trainer);
                var finalTypes = CURRENTTRAINER.level;
                if (revenge) {

                    finalTypes = finalTypes.replace('Pro', '').replace('Full', '');
                    finalTypes += "ProFull";
                }
                $scope.BATTLEOBJS.TARGETS =
                    $scope.BATTLEOBJS.TARGETS = $scope.BATTLEOBJS.trainerProp.predeterminedTeam ||
                        POKEMOMFIND.TRAINER(tier, finalTypes, CURRENTTRAINER.types);
            } else {
                $scope.BATTLEOBJS.ENEMY = POKEMONBATTLE.ENEMY($scope, trainer);
                $scope.BATTLEOBJS.TARGETS = [POKEMOMFIND.WILD(tier)];
            }

            var resources = {};
            $scope.playLoading(LANGUAGE.t("Loading Battle"));
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
                ACTIONS.CAMERA.ZERO();
                $scope.stopLoading();
                ACTIONS.GAME.SCREENOFF(1);

                if (CURRENTONLINERATING !== undefined)
                    ACTIONS.SOUND.BattleMusic("bw2-kanto-gym-leader");
                else if (CURRENTONLINE) {
                    if (CURRENTONLINEDATA.name === $scope.session.name)
                        ACTIONS.SOUND.BattleMusic("13. Battle! (Wild Pokémon)");
                    else
                        ACTIONS.SOUND.BattleMusic("bw-subway-trainer");
                } else
                    ACTIONS.SOUND.BattleMusic("");
                $scope.PKM.mainMenu = true;
                ACTIONS.GAME.ALPHABASE(layerBattle, 0.5, 1, function () {
                    //Draw Hero
                    setTimeout(function () {
                        ACTIONS.CAMERA.ZERO();
                        $scope.BATTLEOBJS.FRIEND = POKEMONBATTLE.FRIEND($scope);
                        $scope.BATTLEOBJS.HERO.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
                        ACTIONS.ANIMATION.THROWNATURAL('Pokeball_' + $scope.PKM.friend().quality,
                            $scope.BATTLEOBJS.HERO.body.x,
                            $scope.BATTLEOBJS.HERO.body.y,
                            POKEMONBATTLE.XS($scope.BATTLEOBJS.FRIEND.body.x + ($scope.BATTLEOBJS.FRIEND.body.width / 2)),
                            POKEMONBATTLE.YS($scope.BATTLEOBJS.FRIEND.body.y + ($scope.BATTLEOBJS.FRIEND.body.height / 2)),
                            true,
                            function () {
                                ACTIONS.CAMERA.ZERO();
                                ACTIONS.ANIMATION.PLAYNATURAL($scope.PKM.friend().superShiny ? 'SuperShiny' : ($scope.PKM.friend().shiny ? 'Starts' : 'OutPokeball'),
                                    POKEMONBATTLE.XS($scope.BATTLEOBJS.FRIEND.body.x + ($scope.BATTLEOBJS.FRIEND.body.width / 2)),
                                    POKEMONBATTLE.YS($scope.BATTLEOBJS.FRIEND.body.y + ($scope.BATTLEOBJS.FRIEND.body.height / 2)),
                                    function () {
                                        ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.FRIEND.body, 0.3, 1);
                                        ACTIONS.SOUND.PLAY($scope.PKM.friend().cryUrl, SOUNDS.system);

                                        var info = {friendAbility: $scope.PKM.ability($scope.PKM.friend())};

                                        var yosoy = "friend";


                                        if (info.friendAbility.blocks)
                                            if (info.friendAbility.blocks.indexOf('switch') !== -1) {
                                                if (info.friendAbility.code) {
                                                    eval(info.friendAbility.code);
                                                    console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                                }
                                            }
                                        if (info.friendAbility.blocks)
                                            if (info.friendAbility.blocks.indexOf('switch_friend') !== -1) {
                                                if (info.friendAbility.code) {
                                                    eval(info.friendAbility.code);
                                                    console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                                }
                                            }
                                        $scope.BATTLEOBJS.allowtrap = true;
                                        if (trainer) {
                                            setTimeout(function () {
                                                ACTIONS.CAMERA.ZERO();
                                                $scope.BATTLEOBJS.TARGET = POKEMONBATTLE.TARGET($scope);
                                                $scope.BATTLEOBJS.ENEMY.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);

                                                if (!$scope.BATTLEOBJS.isWild)
                                                    $scope.PKM.talk(`${LANGUAGE.t("I choose you")} ${$scope.PKM.target().name}`, 2);
                                                ACTIONS.ANIMATION.THROWNATURAL('Pokeball_' + $scope.PKM.target().quality,
                                                    $scope.BATTLEOBJS.ENEMY.body.x,
                                                    $scope.BATTLEOBJS.ENEMY.body.y,
                                                    POKEMONBATTLE.XS($scope.BATTLEOBJS.TARGET.body.x + ($scope.BATTLEOBJS.TARGET.body.width / 2)),
                                                    POKEMONBATTLE.YS($scope.BATTLEOBJS.TARGET.body.y + ($scope.BATTLEOBJS.TARGET.body.height / 2)),
                                                    true,
                                                    function () {
                                                        ACTIONS.CAMERA.ZERO();
                                                        ACTIONS.ANIMATION.PLAYNATURAL($scope.PKM.target().superShiny ? 'SuperShiny' : ($scope.PKM.target().shiny ? 'Starts' : 'OutPokeball'),
                                                            POKEMONBATTLE.XS($scope.BATTLEOBJS.TARGET.body.x + ($scope.BATTLEOBJS.TARGET.body.width / 2)),
                                                            POKEMONBATTLE.YS($scope.BATTLEOBJS.TARGET.body.y + ($scope.BATTLEOBJS.TARGET.body.height / 2)),
                                                            function () {
                                                                ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.TARGET.body, 0.3, 1);
                                                                ACTIONS.SOUND.PLAY($scope.PKM.target().cryUrl, SOUNDS.system);

                                                                var yosoy = "target";

                                                                var info = {friendAbility: $scope.PKM.ability($scope.PKM.target())};
                                                                if (info.friendAbility.blocks)
                                                                    if (info.friendAbility.blocks.indexOf('switch') !== -1) {
                                                                        if (info.friendAbility.code) {
                                                                            eval(info.friendAbility.code);
                                                                            console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                                                        }
                                                                    }
                                                                if (info.friendAbility.blocks)
                                                                    if (info.friendAbility.blocks.indexOf('switch_target') !== -1) {
                                                                        if (info.friendAbility.code) {
                                                                            eval(info.friendAbility.code);
                                                                            console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                                                        }
                                                                    }
                                                            }
                                                        );
                                                    });
                                            }, 500);
                                        } else {

                                            $scope.BATTLEOBJS.TARGET = POKEMONBATTLE.TARGET($scope);
                                            ACTIONS.GAME.ALPHABASE($scope.BATTLEOBJS.TARGET.body, 0.3, 1);
                                            setTimeout(function () {
                                                ACTIONS.CAMERA.ZERO();
                                                ACTIONS.SOUND.PLAY($scope.PKM.target().cryUrl, SOUNDS.system);

                                                var yosoy = "target";

                                                var info = {friendAbility: $scope.PKM.ability($scope.PKM.target())};
                                                if (info.friendAbility.blocks)
                                                    if (info.friendAbility.blocks.indexOf('switch') !== -1) {
                                                        if (info.friendAbility.code) {
                                                            eval(info.friendAbility.code);
                                                            console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                                        }
                                                    }
                                                if (info.friendAbility.blocks)
                                                    if (info.friendAbility.blocks.indexOf('switch_target') !== -1) {
                                                        if (info.friendAbility.code) {
                                                            eval(info.friendAbility.code);
                                                            console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                                        }
                                                    }
                                            }, 1000);

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

    //Calculos y animaciones
    CALCS: {
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


            if (info.friendAbility.blocks)
                if (info.friendAbility.blocks.indexOf('changeType') !== -1) {
                    if (info.friendAbility.code) {
                        eval(info.friendAbility.code);
                        console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                    }
                }

            var multiplier = POKEMONBATTLE.CALCS.MULTIPLIER(info.pokemonTarget.types, info.move.type);


            if (info.targetAbility.blocks)
                if (info.targetAbility.blocks.indexOf('before_target_multiplier') !== -1) {
                    if (info.targetAbility.code) {
                        eval(info.targetAbility.code);
                        console.logblue(info.targetAbility.shortDesc + ": " + info.targetAbility.code);
                    }
                }

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

            if ($scope.BATTLEOBJS.clima === "strongwinds")
                if (info.pokemonTarget.types.indexOf('Flying') !== -1)
                    if (["*2", "*4"].indexOf(multiplier) !== -1)
                        multiplier = "*1";

            if ($scope.BATTLEOBJS.clima === "sunlight")
                if (info.move.category !== "Status")
                    if (info.move.type === "Water")
                        multiplier = "/4";


            if (info.targetAbility.blocks)
                if (info.targetAbility.blocks.indexOf('target_multiplier') !== -1) {
                    if (info.targetAbility.code) {
                        eval(info.targetAbility.code);
                        console.logblue(info.targetAbility.shortDesc + ": " + info.targetAbility.code);
                    }
                }


            if (info.pokemonTarget.ability.keyname === "flashfire") {
                if (info.move.type === "Fire") {
                    return -1;
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
            var definicial = OSO(tdef);
            var tata = $scope.PKM.stat(info.pokemonFriend, ata);
            if (info.move.num === 251) {
                var prota = info.pokemonFriend;
                for (var po of info.team) {
                    if (fata < $scope.PKM.stat(po, ata)) {
                        fata = $scope.PKM.stat(po, ata);
                        prota = po;
                    }
                }
                ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} ${LANGUAGE.t("ha tomado la fuerza de")} ${prota.name}`);
            }


            if (info.pokemonTarget.ability.keyname === "flowergift") {
                if (def === "spd") tdef *= 1.5;
            }


            if (info.friendAbility.blocks)
                if (info.friendAbility.blocks.indexOf('calcstats') !== -1) {
                    if (info.friendAbility.code) {
                        eval(info.friendAbility.code);
                        console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                    }
                }


            if (info.targetAbility.blocks)
                if (info.targetAbility.blocks.indexOf('target_calcstats') !== -1) {
                    if (info.targetAbility.code) {
                        eval(info.targetAbility.code);
                        if (willreturn) {
                            var copyer = OSO(willreturn);
                            willreturn = undefined;
                            return copyer;
                        }
                        console.loggreen(info.targetAbility.shortDesc + ": " + info.targetAbility.code);
                    }
                }


            //KO OH
            if (info.move.ohko) {
                if (info.pokemonFriend.power < info.pokemonTarget.power) {
                    fata = 999999;

                    if (info.targetAbility.blocks)
                        if (info.targetAbility.blocks.indexOf('ohkotarget') !== -1) {
                            if (info.targetAbility.code) {
                                eval(info.targetAbility.code);
                                console.logblue(info.targetAbility.shortDesc + ": " + info.targetAbility.code);
                            }
                        }
                }
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

            if ($scope.BATTLEOBJS.clima === "sunnyday" || $scope.BATTLEOBJS.clima === "sunlight") {
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
            if ($scope.BATTLEOBJS.clima === "heavyrain") {
                if (info.move.type === "Water")
                    fata *= 1.7;
                if (info.move.type === "Electric")
                    fata *= 1.5;
                if (info.move.type === "Fire")
                    fata = -1;
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

            if (info.targetAbility.blocks)
                if (info.targetAbility.blocks.indexOf('target_terrain') !== -1) {
                    if (info.targetAbility.code) {
                        eval(info.targetAbility.code);
                        console.loggreen(info.targetAbility.shortDesc + ": " + info.targetAbility.code);
                    }
                }


            //My Status
            if (info.friendAbility.blocks)
                if (info.friendAbility.blocks.indexOf('my_status') !== -1) {
                    if (info.friendAbility.code) {
                        eval(info.friendAbility.code);
                        console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                    }
                }


            if (info.pokemonFriend.battle.status) {
                if (info.pokemonFriend.battle.status === "foresight") {
                    if (multiplier === "=-1") {
                        multiplier = "*1";
                    }
                }
                if (info.pokemonFriend.battle.status === "charge") {
                    if (info.move.type === "Electric") {
                        fata = fata * 2;
                        ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} ${LANGUAGE.t("atacó con sobrecarga")}!`);
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

            if (info.targetAbility.blocks)
                if (info.targetAbility.blocks.indexOf('target_status') !== -1) {
                    if (info.targetAbility.code) {
                        eval(info.targetAbility.code);
                        console.logblue(info.targetAbility.shortDesc + ": " + info.targetAbility.code);
                    }
                }
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
                    ACTIONS.MESSAGE.NOTI(`${info.pokemonTarget.name} ${LANGUAGE.t("ha reducido daño por auroraveil")}!`);
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
                if (info.pokemonTarget.battle.status === "tox") {
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
                            ACTIONS.MESSAGE.NOTI(`${info.pokemonTarget.name} ${LANGUAGE.t("ha reflejado daño")}!`);
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
                            ACTIONS.MESSAGE.NOTI(`${info.pokemonTarget.name} ${LANGUAGE.t("ha reflejado daño")}!`);
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
                    if (info.pokemonFriend.battle.stats[stat] < 0)
                        info.pokemonFriend.battle.stats[stat] = temp2[stat];
                POKEMONBATTLE.CLEARGOODSTATS(info.pokemonTarget);
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
                            ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} ${LANGUAGE.t("aumentó en venganza")}!`);
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
                info.pokemonTarget.battle.stats.hp = info.pokemonFriend.battle.stats.hp;
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

                if (info.friendAbility.blocks)
                    if (info.friendAbility.blocks.indexOf('penalty') !== -1) {
                        if (info.friendAbility.code) {
                            eval(info.friendAbility.code);
                            console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                        }
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

                        ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} ${LANGUAGE.t("ha dado")} ${hits} ${LANGUAGE.t("golpes")}!`);
                        $scope.play("Cancel", SOUNDS.system);
                    }
                }
                damage = eval(`calc${multiplier}`);


                //Recoil General
                var recoil = 0;
                if (info.move.recoil) {
                    recoil = damage * (info.move.recoil[0] / info.move.recoil[1]);
                    $scope.PKM.stat(info.pokemonFriend, "hp", recoil);
                    ACTIONS.MESSAGE.NOTI(`${info.pokemonFriend.name} ${LANGUAGE.t("se auto dañó")}!`);
                }
            } else {
                damage = 0;
            }
            //Info

            console.log("recoil: " + recoil + ", incialata: " + fatainicial + ", incialdef: " + definicial + ", power: " + info.move.basePower);
            console.log("hits: " + hits, " ata: " + fata, " def: " + tdef);
            console.log("effectives: " + multiplier, " penaltyType: " + penaltyType, " base: " + base);
            console.logred(info.move.type + ` :${info.move.category} damage: ` + damage);


            if (info.friendAbility.blocks)
                if (info.friendAbility.blocks.indexOf('finaldamage') !== -1) {
                    if (info.friendAbility.code) {
                        eval(info.friendAbility.code);
                        console.logblue(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                    }
                }


            if (info.targetAbility.blocks)
                if (info.targetAbility.blocks.indexOf('target_finaldamage') !== -1) {
                    if (info.targetAbility.code) {
                        eval(info.targetAbility.code);
                        console.logblue(info.targetAbility.shortDesc + ": " + info.targetAbility.code);
                    }
                }

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

            if (info.friendAbility.blocks)
                if (info.friendAbility.blocks.indexOf('pokemonAcur') !== -1) {
                    if (info.friendAbility.code) {
                        eval(info.friendAbility.code);
                        console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                    }
                }

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
        IsCRITICAL: function ($scope, info, miss) {


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


            if (info.targetAbility.blocks)
                if (info.targetAbility.blocks.indexOf('target_critical') !== -1) {
                    if (info.targetAbility.code) {
                        eval(info.targetAbility.code);
                        console.logblue(info.targetAbility.shortDesc + ": " + info.targetAbility.code);
                    }
                }

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
                    if ($scope.PKM.ability(info.pokemonFriend).keyname === "poisonheal") {
                        $scope.PKM.stat(info.pokemonFriend, "hp", $scope.PKM.basehp(info.pokemonFriend) * (1 / 8));
                    } else
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

            if (info.pokemonFriend.battle.status)
                if (info.pokemonFriend.battle.status.indexOf("Am_") !== -1)
                    info.pokemonFriend.battle.statusType = info.pokemonFriend.battle.status.replace("Am_", "");
            if (info.pokemonTarget.battle.status)
                if (info.pokemonTarget.battle.status.indexOf("Am_") !== -1)
                    info.pokemonTarget.battle.statusType = info.pokemonTarget.battle.status.replace("Am_", "");

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

                    var pregunta = 15;
                    if (info.friendAbility.blocks)
                        if (info.friendAbility.blocks.indexOf('status_slp') !== -1) {
                            if (info.friendAbility.code) {
                                eval(info.friendAbility.code);
                                console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                            }
                        }

                    if ((info.pokemonFriend.battle.statusTurn * pregunta) > prob) {
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

                if (info.pokemonFriend.battle.status)
                    if (info.pokemonFriend.battle.status.indexOf("Am_") !== -1)
                        info.pokemonFriend.battle.statusType = info.pokemonFriend.battle.status.replace("Am_", "");
                if (info.pokemonTarget.battle.status)
                    if (info.pokemonTarget.battle.status.indexOf("Am_") !== -1)
                        info.pokemonTarget.battle.statusType = info.pokemonTarget.battle.status.replace("Am_", "");
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

                        if (info.targetAbility.blocks)
                            if (info.targetAbility.blocks.indexOf('target_drain') !== -1) {
                                if (info.targetAbility.code) {
                                    eval(info.targetAbility.code);
                                    console.logblue(info.targetAbility.shortDesc + ": " + info.targetAbility.code);
                                }
                            }


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
                        if (info.pokemonFriend.battle.status !== "healblock") {
                            // $scope.PKM.stat(info.pokemonFriend, "hp", (($scope.PKM.basehp(info.pokemonFriend) * info.move.flags.heal) / 100) * -1);
                            if (info.move.heal) {
                                var percent = info.move.heal[0] / info.move.heal[1];
                                $scope.PKM.stat(info.pokemonFriend, "hp", ($scope.PKM.basehp(info.pokemonFriend) * percent) * -1);
                            }
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

        },
        TRANSFORMDIRECT: function ($scope, friend, pokemonFriend, isEnemy) {
            POKEMONBATTLE.CALCS.TRANSFORM($scope, {
                friend: friend,
                pokemonFriend: pokemonFriend,
                isEnemy: isEnemy,
                isEnemy: isEnemy
            }, function () {

            });
        },
    },
    CALCANIMATION: function ($scope, result, info, callback, last) {
        POKEMONBATTLE.CALCS.GIGA(info, $scope, info.pokemonFriend, info.friend, function () {
            if (result)
                if (result.miss) {
                    info.enemy.body.gotoAndPlay(POKEMONBATTLE.FORMS.evade);
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
                    info.hero.body.gotoAndPlay(POKEMONBATTLE.FORMS.hurt);
                    ACTIONS.ANIMATION.PLAYNATURAL('critico', POKEMONBATTLE.XS(info.target.body.x + (info.target.body.width / 2)),
                        POKEMONBATTLE.YS(info.target.body.y + (info.target.body.height / 2)));
                }
            if (callback)
                callback(false);
        });
    },

    //Turnos
    TURNING: function ($scope, info, callback, last) {
        console.log("");
        console.log("%c" + info.move.name + "--------------------------------------------------------------", "background-color:red;color:white;");
        var stats = ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"];

        if (info.move.keyname === "catchpokemon") {
            $scope.PKM.pokeballCount--;
            $scope.PKM.intentos = 0;
            info.hero.body.gotoAndPlay(POKEMONBATTLE.FORMS.punch);
            ACTIONS.ANIMATION.THROWNATURAL('Pokeball_' + ($scope.PKM.pokeballLevel + 1),
                info.hero.body.x,
                info.hero.body.y,
                POKEMONBATTLE.XS(info.target.body.x + (info.target.body.width / 2)),
                POKEMONBATTLE.YS(info.target.body.y + (info.target.body.height / 2)),
                true,
                function () {
                    ACTIONS.ANIMATION.PLAYNATURAL("GetBack",
                        POKEMONBATTLE.XS(info.target.body.x + (info.target.body.width / 2)),
                        POKEMONBATTLE.YS(info.target.body.y + (info.target.body.height / 2)),
                        function () {
                            ACTIONS.GAME.ALPHABASE(info.target.body, 0.3, 0);
                            ACTIONS.ANIMATION.PLAYNATURAL('Pokeball_' + ($scope.PKM.pokeballLevel + 1),
                                POKEMONBATTLE.XS(info.target.body.x + (info.target.body.width / 2)),
                                POKEMONBATTLE.YS(info.target.body.y + (info.target.body.height)),
                                function () {
                                }, "stop_pela");

                            setTimeout(function () {
                                $scope.play("Cancel", SOUNDS.system);
                                ACTIONS.GAME.SHAKE(layerAnimation.getChildByName("stop_pela"), 50, 10, 10);
                                setTimeout(function () {
                                    $scope.PKM.intentos++;
                                    var catched = POKEMOMFIND.WASCATCH($scope, info, $scope.PKM.intentos);
                                    if (!catched) {
                                        $scope.play("Cancel", SOUNDS.system);
                                        ACTIONS.GAME.SHAKE(layerAnimation.getChildByName("stop_pela"), 50, 10, 10);
                                        setTimeout(function () {
                                            $scope.PKM.intentos++;
                                            var catched = POKEMOMFIND.WASCATCH($scope, info, $scope.PKM.intentos);
                                            if (!catched) {
                                                $scope.play("Cancel", SOUNDS.system);
                                                ACTIONS.GAME.SHAKE(layerAnimation.getChildByName("stop_pela"), 50, 10, 10);
                                                setTimeout(function () {
                                                    $scope.PKM.intentos++;
                                                    var catched = POKEMOMFIND.WASCATCH($scope, info, $scope.PKM.intentos);
                                                    if (!catched) {
                                                        layerAnimation.removeChild(layerAnimation.getChildByName("stop_pela"));
                                                        ACTIONS.ANIMATION.PLAYNATURAL(info.pokemonTarget.superShiny ? 'SuperShiny' : (info.pokemonTarget.shiny ? 'Starts' : 'OutPokeball'),
                                                            POKEMONBATTLE.XS(info.target.body.x + (info.target.body.width / 2)),
                                                            POKEMONBATTLE.YS(info.target.body.y + (info.target.body.height / 2)),
                                                            function () {
                                                                ACTIONS.GAME.ALPHABASE(info.target.body, 0.3, 1);
                                                                if (callback) callback({
                                                                    critical: false,
                                                                    miss: true,
                                                                    damage: 0
                                                                });
                                                            });
                                                    } else {
                                                        layerAnimation.removeChild(layerAnimation.getChildByName("stop_pela"));
                                                        POKEMONBATTLE.END($scope, "catched");
                                                    }
                                                }, 1000);
                                            } else {
                                                layerAnimation.removeChild(layerAnimation.getChildByName("stop_pela"));
                                                POKEMONBATTLE.END($scope, "catched");
                                            }
                                        }, 1000);
                                    } else {
                                        layerAnimation.removeChild(layerAnimation.getChildByName("stop_pela"));
                                        POKEMONBATTLE.END($scope, "catched");
                                    }
                                }, 1000);
                            }, 1000);

                        });
                });
            return;
        }

        for (var poke of info.team) {
            if (poke.ability.keyname === "pastelveil")
                if (info.pokemonFriend.battle.status === "tox") {
                    ACTIONS.ANIMATION.PLAYNATURAL('Cureit', POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)), POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)));
                    info.pokemonFriend.battle.status = undefined;
                    info.pokemonFriend.battle.statusTurn = 0;
                }
            if (poke.ability.keyname === "sweetveil")
                if (info.pokemonFriend.battle.status === "slp") {
                    ACTIONS.ANIMATION.PLAYNATURAL('Cureit', POKEMONBATTLE.XS(info.friend.body.x + (info.friend.body.width / 2)), POKEMONBATTLE.YS(info.friend.body.y + (info.friend.body.height / 2)));
                    info.pokemonFriend.battle.status = undefined;
                    info.pokemonFriend.battle.statusTurn = 0;
                }
            if (poke.ability.keyname === "victorystar")
                if (info.pokemonFriend.battle.status === "tox") {
                    if (info.move.accuracy !== true)
                        info.move.accuracy *= 1.1;
                }
        }

        if (info.friendAbility.blocks === undefined) {
            if (info.friendAbility.code) {
                eval(info.friendAbility.code);
                console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
            }
        }

        if (info.targetAbility.blocks)
            if (info.targetAbility.blocks.indexOf('target_begin') !== -1) {
                if (info.targetAbility.code) {
                    eval(info.targetAbility.code);
                    if (willreturn) {
                        willreturn = undefined;
                        return;
                    }
                    console.loggreen(info.targetAbility.shortDesc + ": " + info.targetAbility.code);
                }
            }
        if (info.friendAbility.blocks)
            if (info.friendAbility.blocks.indexOf('begin') !== -1) {
                if (info.friendAbility.code) {
                    eval(info.friendAbility.code);
                    console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                }
            }
        if (info.move.keyname === "transform") {
            POKEMONBATTLE.CALCS.TRANSFORM($scope, info, function () {
                if (callback) callback({critical: false, miss: true, damage: 0});
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

                        if (info.targetAbility.blocks)
                            if (info.targetAbility.blocks.indexOf('blocked') !== -1) {
                                if (info.targetAbility.code) {
                                    eval(info.targetAbility.code);
                                    console.loggreen(info.targetAbility.shortDesc + ": " + info.targetAbility.code);
                                }
                            }

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
            if (!$scope.BATTLEOBJS.isWild)
                $scope.PKM.talk(`${LANGUAGE.t("Use")} ${info.move.name}`, 2);
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


        if (info.friendAbility.blocks)
            if (info.friendAbility.blocks.indexOf('mid_begin') !== -1) {
                if (info.friendAbility.code) {
                    eval(info.friendAbility.code);
                    console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                }
            }


        var miss = POKEMONBATTLE.CALCS.IsMISS($scope, info, last);

        if (info.friendAbility.blocks)
            if (info.friendAbility.blocks.indexOf('after_miss') !== -1) {
                if (info.friendAbility.code) {
                    eval(info.friendAbility.code);
                    console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                }
            }

        var volatileStop = POKEMONBATTLE.CALCS.VolatileStatus(info, $scope, last, miss);
        var critical = POKEMONBATTLE.CALCS.IsCRITICAL($scope, info, miss);

        if (info.friendAbility.blocks)
            if (info.friendAbility.blocks.indexOf('after_critical') !== -1) {
                if (info.friendAbility.code) {
                    eval(info.friendAbility.code);
                    console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                }
            }

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
            if ($scope.PKM.perishsong >= 4) {
                info.pokemonFriend.battle.stats.hp = 999999;
                info.pokemonTarget.battle.stats.hp = 999999;
                $scope.PKM.perishsong = undefined;
            }
            if (last)
                $scope.PKM.perishsong++;
        }


        if (info.pokemonFriend.battle.status)
            if (info.pokemonFriend.battle.status.indexOf("Am_") !== -1)
                info.pokemonFriend.battle.statusType = info.pokemonFriend.battle.status.replace("Am_", "");
        if (info.pokemonTarget.battle.status)
            if (info.pokemonTarget.battle.status.indexOf("Am_") !== -1)
                info.pokemonTarget.battle.statusType = info.pokemonTarget.battle.status.replace("Am_", "");


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


                                if (info.targetAbility.blocks)
                                    if (info.targetAbility.blocks.indexOf('target_downhp') !== -1) {
                                        if (info.targetAbility.code) {
                                            eval(info.targetAbility.code);
                                            console.loggreen(info.targetAbility.shortDesc + ": " + info.targetAbility.code);
                                        }
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
                                var lives = POKEMONBATTLE.LIVES($scope, info.teamTarget, info.targetIndex);
                                if (lives.length > 1) {
                                    $scope.BATTLEOBJS.batonpass = true;
                                    $scope.PKM.mainMenu = true;
                                }
                            }
                            setTimeout(function () {
                                if ($scope.PKM.hp(info.pokemonTarget) <= 0) {


                                    if (info.friendAbility.blocks)
                                        if (info.friendAbility.blocks.indexOf('afterko') !== -1) {
                                            if (info.friendAbility.code) {
                                                eval(info.friendAbility.code);
                                                console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                            }
                                        }

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
                friendIndex: $scope.BATTLEOBJS.TARGETINDEX,
                targetIndex: $scope.BATTLEOBJS.FRIENDINDEX,
                emotion: POKEMONBATTLE.FORMS.point_bad,
                isEnemy: true,
                pokemonFriend: $scope.PKM.target(),
                pokemonTarget: $scope.PKM.friend(),
                targetParty: $scope.BATTLEOBJS.friendParty,
                friendParty: $scope.BATTLEOBJS.targetParty,
                team: $scope.BATTLEOBJS.TARGETS,
                teamTarget: $scope.session.pokemons,
                friendAbility: $scope.PKM.ability($scope.PKM.target()),
                targetAbility: $scope.PKM.ability($scope.PKM.friend()),
            };
            var friendAction = {
                move: OSO(move),
                hero: $scope.BATTLEOBJS.HERO,
                enemy: $scope.BATTLEOBJS.ENEMY,
                friend: $scope.BATTLEOBJS.FRIEND,
                target: $scope.BATTLEOBJS.TARGET,
                friendIndex: $scope.BATTLEOBJS.FRIENDINDEX,
                targetIndex: $scope.BATTLEOBJS.TARGETINDEX,
                emotion: POKEMONBATTLE.FORMS.point_bad,
                pokemonFriend: $scope.PKM.friend(),
                pokemonTarget: $scope.PKM.target(),
                friendParty: $scope.BATTLEOBJS.friendParty,
                targetParty: $scope.BATTLEOBJS.targetParty,
                team: $scope.session.pokemons,
                teamTarget: $scope.BATTLEOBJS.TARGETS,
                targetAbility: $scope.PKM.ability($scope.PKM.target()),
                friendAbility: $scope.PKM.ability($scope.PKM.friend()),
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
                            friendIndex: $scope.BATTLEOBJS.TARGETINDEX,
                            targetIndex: $scope.BATTLEOBJS.FRIENDINDEX,
                            emotion: POKEMONBATTLE.FORMS.point_bad,
                            isEnemy: true,
                            pokemonFriend: $scope.PKM.target(),
                            pokemonTarget: $scope.PKM.friend(),
                            targetParty: $scope.BATTLEOBJS.friendParty,
                            friendParty: $scope.BATTLEOBJS.targetParty,
                            team: $scope.BATTLEOBJS.TARGETS,
                            teamTarget: $scope.session.pokemons,
                            friendAbility: $scope.PKM.ability($scope.PKM.target()),
                            targetAbility: $scope.PKM.ability($scope.PKM.friend()),
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
                                friendIndex: $scope.BATTLEOBJS.FRIENDINDEX,
                                targetIndex: $scope.BATTLEOBJS.TARGETINDEX,
                                emotion: POKEMONBATTLE.FORMS.point_bad,
                                pokemonFriend: $scope.PKM.friend(),
                                pokemonTarget: $scope.PKM.target(),
                                friendParty: $scope.BATTLEOBJS.friendParty,
                                targetParty: $scope.BATTLEOBJS.targetParty,
                                team: $scope.session.pokemons,
                                teamTarget: $scope.BATTLEOBJS.TARGETS,
                                targetAbility: $scope.PKM.ability($scope.PKM.target()),
                                friendAbility: $scope.PKM.ability($scope.PKM.friend()),
                            };
                            POKEMONBATTLE.TURNING($scope, friendAction, function (result) {
                                POKEMONBATTLE.CALCANIMATION($scope, result, friendAction, function (stop) {
                                    $scope.PKM.mainMenu = true;
                                }, true);
                            }, true);
                        }, 1000);
                    });
                } else {
                    var yosoy = "target";
                    var info = {friendAbility: $scope.PKM.ability($scope.PKM.target())};

                    if (info.friendAbility.blocks)
                        if (info.friendAbility.blocks.indexOf('before_speed') !== -1) {
                            if (info.friendAbility.code) {
                                eval(info.friendAbility.code);
                                console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                            }
                        }

                    yosoy = "friend";
                    var info = {friendAbility: $scope.PKM.ability($scope.PKM.friend())};
                    if (info.friendAbility.blocks)
                        if (info.friendAbility.blocks.indexOf('before_speed') !== -1) {
                            if (info.friendAbility.code) {
                                eval(info.friendAbility.code);
                                console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                            }
                        }


                    var enemySpeed = $scope.PKM.stat($scope.PKM.target(), 'spe') * (enemyAction.move.priority > 0 ? (enemyAction.move.priority * 100) : 1);
                    if ($scope.PKM.target().battle.status === "par")
                        enemySpeed = enemySpeed / 3;
                    if ($scope.PKM.target().battle.status === "tailwind")
                        enemySpeed = enemySpeed * 2;
                    var friendSpeed = $scope.PKM.stat($scope.PKM.friend(), 'spe') * (friendAction.move.priority > 0 ? (friendAction.move.priority * 100) : 1);
                    if ($scope.PKM.friend().battle.status === "par")
                        friendSpeed = friendSpeed / 3;
                    if ($scope.PKM.friend().battle.status === "tailwind")
                        friendSpeed = friendSpeed * 2;

                    console.logorange(`EnemySpeed: ${enemySpeed}, FriendSpeed: ${friendSpeed}`)


                    var yosoy = "target";
                    var info = {friendAbility: $scope.PKM.ability($scope.PKM.target())};

                    if (info.friendAbility.blocks)
                        if (info.friendAbility.blocks.indexOf('speed') !== -1) {
                            if (info.friendAbility.code) {
                                eval(info.friendAbility.code);
                                console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                            }
                        }

                    yosoy = "friend";
                    var info = {friendAbility: $scope.PKM.ability($scope.PKM.friend())};
                    if (info.friendAbility.blocks)
                        if (info.friendAbility.blocks.indexOf('speed') !== -1) {
                            if (info.friendAbility.code) {
                                eval(info.friendAbility.code);
                                console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                            }
                        }


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
                                        POKEMONBATTLE.PERSONALITY($scope);
                                        $scope.PKM.mainMenu = true;
                                    }, true);
                                }, true);
                            } else {
                                POKEMONBATTLE.PERSONALITY($scope);
                                $scope.PKM.mainMenu = true;
                            }
                        });
                    });
                }
            }
        }, 1500);

    },
    PERSONALITY: function ($scope, winOrLose) {
        var pokemon = $scope.PKM.target() ? $scope.PKM.target().name : "pokemon";
        var move = $scope.PKM.lastMove ? $scope.PKM.lastMove.name : LANGUAGE.t("attack");
        if ($scope.BATTLEOBJS.trainerProp) {
            if (winOrLose === undefined) {
                if ($scope.BATTLEOBJS.numTurn % 5 === 0) {
                    var mycount = POKEMONBATTLE.LIVES($scope, $scope.session.pokemons, 99).length;
                    var theycount = $scope.BATTLEOBJS.TARGETS.length;
                    var key = "perdiendo";
                    if (mycount > (theycount + 1)) {
                        key = "perdiendomal";
                    } else if (mycount > theycount) {
                        key = "perdiendo";
                    } else if (mycount < (theycount - 1)) {
                        key = "ganandofacil";
                    } else if (mycount < (theycount)) {
                        key = "ganando";
                    } else if (mycount === (theycount)) {
                        return;
                    }
                    var textFinal = randomArray($scope.BATTLEOBJS.trainerProp.texts[key]);
                    ACTIONS.MESSAGE.ADDPLAY($scope.BATTLEOBJS.trainerProp.name, $scope.personCheck(textFinal, move, pokemon), 4000);
                }
            } else {
                if (winOrLose === true) {
                    var textFinal = randomArray($scope.BATTLEOBJS.trainerProp.texts.alperder);
                    ACTIONS.MESSAGE.ADDPLAY($scope.BATTLEOBJS.trainerProp.name, $scope.personCheck(textFinal, move, pokemon), 5000);
                } else {
                    var textFinal = randomArray($scope.BATTLEOBJS.trainerProp.texts.alganar);
                    ACTIONS.MESSAGE.ADDPLAY($scope.BATTLEOBJS.trainerProp.name, $scope.personCheck(textFinal, move, pokemon), 5000);
                }
            }
        }
    },
    LIVES: function ($scope, team, inx) {
        var lives = [];
        for (var pok in team)
            if (pok !== inx)
                if ($scope.PKM.hp(team[pok]) > 0)
                    lives.push(pok);
        return lives;
    },
    //Inteligencia Artificial
    IAMOVE: function ($scope) {
        var moves = $scope.PKM.target().battle.moves || $scope.PKM.target().moves;
        var index = getRandomInt(moves.length - 1);
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


    //The End
    CLEARBADSTATS: function (pokemon) {
        var stats = ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"];
        for (var stat of stats) {
            if (pokemon.battle.stats[stat] > 0)
                pokemon.battle.stats[stat] = 0;
        }
    },
    CLEARGOODSTATS: function (pokemon) {
        var stats = ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"];
        for (var stat of stats) {
            if (pokemon.battle.stats[stat] < 0)
                pokemon.battle.stats[stat] = 0;
        }
    },
    CLEARSTATS: function (pokemon) {
        var stats = ["atk", "def", "spa", "spd", "spe", "accuracy", "evasion"];
        for (var stat of stats)
            pokemon.battle.stats[stat] = 0;
        pokemon.battle.ability = undefined;
        pokemon.battle.moves = undefined;
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
        pokemon.battle.ability = undefined;
        pokemon.battle.moves = undefined;
        pokemon.battle.status = undefined;
        pokemon.battle.statusTurn = 0;
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
    END: function ($scope, win) {


        $scope.PKM.perishsong = undefined;
        ACTIONS.SOUND.STOPALL();
        $(".pokmonDetail").hide();
        $scope.PKM.pokemonDetail = false;
        $scope.BATTLEOBJS.menu = false;
        $scope.PKM.mainMenu = false;
        $scope.PKM.menu = false;
        $scope.PKM.forcehidemenu = true;
        $scope.BATTLEOBJS.clima = "";
        $scope.BATTLEOBJS.terrain = "";
        if (!$scope.$$phase)
            $scope.$digest();
        for (var poke of $scope.session.pokemons) {
            POKEMONBATTLE.CLEARSTATSEND(poke);
        }
        if (win === true) {
            $scope.BATTLEOBJS.HERO.body.gotoAndStop(POKEMONBATTLE.FORMS.happy);
            $scope.BATTLEOBJS.ENEMY.body.gotoAndStop(POKEMONBATTLE.FORMS.dead);
            POKEMONBATTLE.PERSONALITY($scope, true);
            if (CURRENTONLINERATING !== undefined) {
                $scope.session.rating = ($scope.session.rating || 0);
                var myrating = $scope.session.rating;
                if (myrating === CURRENTONLINERATING) {
                    $scope.session.rating++;
                }
                if (CURRENTONLINERATING > myrating) {
                    $scope.session.rating += 2;
                }
            }
            if (!$scope.BATTLEOBJS.isWild) {
                if (typeof $scope.BATTLEOBJS.winbattle === "function")
                    $scope.BATTLEOBJS.winbattle();
                else if ($scope.BATTLEOBJS.winbattle)
                    eval($scope.BATTLEOBJS.winbattle);
                $scope.play("Victory", SOUNDS.system);
                setTimeout(function () {
                    POKEMONBATTLE.ENDFINAL($scope);
                    if (!CURRENTONLINE)
                        $scope.PKM.evolcheck(CURRENTTRAINER.level);
                }, 7000);
            } else {
                $scope.PKM.evolcheck('salvaje');
                setTimeout(function () {
                    POKEMONBATTLE.ENDFINAL($scope);
                }, 2000);
            }
        }
        if (win === "catched") {
            $scope.BATTLEOBJS.HERO.body.gotoAndStop(POKEMONBATTLE.FORMS.happy);
            if (typeof $scope.BATTLEOBJS.winbattle === "function")
                $scope.BATTLEOBJS.winbattle();
            else if ($scope.BATTLEOBJS.winbattle)
                eval($scope.BATTLEOBJS.winbattle);
            $scope.play("PokeCaught", SOUNDS.system);
            setTimeout(function () {
                POKEMONBATTLE.ENDFINAL($scope, $scope.PKM.target());
            }, 5000);
        }
        if (win === false) {
            $scope.BATTLEOBJS.ENEMY.body.gotoAndStop(POKEMONBATTLE.FORMS.happy);
            $scope.BATTLEOBJS.HERO.body.gotoAndStop(POKEMONBATTLE.FORMS.dead);
            POKEMONBATTLE.PERSONALITY($scope, false);
            if (CURRENTONLINERATING !== undefined) {
                $scope.session.rating = $scope.session.rating || 0;
                var myrating = $scope.session.rating;
                if (myrating === CURRENTONLINERATING) {
                    if (myrating > 0)
                        $scope.session.rating--;
                }
                if (CURRENTONLINERATING < myrating) {
                    if (myrating > 1)
                        $scope.session.rating -= 2;
                    if (myrating === 1)
                        $scope.session.rating = 0;
                }
            }


            if (typeof $scope.BATTLEOBJS.losebattle === "function")
                $scope.BATTLEOBJS.losebattle();
            else if ($scope.BATTLEOBJS.losebattle)
                eval($scope.BATTLEOBJS.losebattle);

            $scope.play("Defeat", SOUNDS.system);
            setTimeout(function () {
                POKEMONBATTLE.ENDFINAL($scope, false);
            }, 7000)
        }
    },
    ENDFINAL: function ($scope, pokemon) {
        ACTIONS.GAME.SAVE(function () {
            ACTIONS.GAME.SCREEN(0.5, "#000", 1);
            $scope.PKM.mainMenu = false;
            ACTIONS.SOUND.BGM_RESTORE();
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
            CURRENTONLINEDATA = undefined;
            CURRENTONLINERATING = undefined;
            CURRENTTRAINER = undefined;
            ASSAULTING = false;
            ACTIONS.GAME.SCREENOFF(1, function () {
                $scope.isBattlening = false;
                $scope.BATTLEOBJS = {};
                $("#footer, #footer2").show();
                ACTIONS.GAME.UNBLOCK();
                ACTIONS.GAME.RESUME();
                if (pokemon === false) {
                    eval(maps[FIRSTMAP].pokecenter);
                    if (maps[FIRSTMAP].pokecenter.indexOf('POKEMON.POKECENTER') === -1)
                        ACTIONS.POKEMON.POKECENTER();
                } else if (pokemon) {
                    POKEMOMFIND.ADD(OSO(pokemon));
                }
            });
        });
    },

    //Changes
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

                                var info = {friendAbility: $scope.PKM.ability($scope.PKM.friend())};

                                var yosoy = "friend";


                                if (info.friendAbility.blocks)
                                    if (info.friendAbility.blocks.indexOf('switch') !== -1) {
                                        if (info.friendAbility.code) {
                                            eval(info.friendAbility.code);
                                            console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                        }
                                    }


                                if (info.friendAbility.blocks)
                                    if (info.friendAbility.blocks.indexOf('switch_friend') !== -1) {
                                        if (info.friendAbility.code) {
                                            eval(info.friendAbility.code);
                                            console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                        }
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
            $scope.BATTLEOBJS.TARGETINDEX = 0;
            index = 0;
            $scope.BATTLEOBJS.TARGETINDEX = POKEMONBATTLE.IACHANGE($scope);
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

                                var yosoy = "target";

                                var info = {friendAbility: $scope.PKM.ability($scope.PKM.target())};
                                if (info.friendAbility.blocks)
                                    if (info.friendAbility.blocks.indexOf('switch') !== -1) {
                                        if (info.friendAbility.code) {
                                            eval(info.friendAbility.code);
                                            console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                        }
                                    }
                                if (info.friendAbility.blocks)
                                    if (info.friendAbility.blocks.indexOf('switch_target') !== -1) {
                                        if (info.friendAbility.code) {
                                            eval(info.friendAbility.code);
                                            console.loggreen(info.friendAbility.shortDesc + ": " + info.friendAbility.code);
                                        }
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
    //Draws
    DRAWBG: function ($scope) {
        var imageD = mapQueues[FIRSTMAP].getResult("BG");
        var BG = new createjs.Bitmap(mapQueues[FIRSTMAP].getResult("BG"), new createjs.Rectangle(0, 0, imageD.width, imageD.height));
        BG.scaleX = 0.575;
        BG.scaleY = 0.5;
        //BG.setDrawSize($scope.width * $scope.baseWidth, $scope.height * $scope.baseHeight);
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
        var hero = null;
        if (CURRENTONLINE) {
            hero = new createjs.Bitmap(ACTIONS.LOAD.GET(CURRENTONLINE));
            name = CURRENTONLINEDATA.name;
        } else
            hero = new createjs.Bitmap(mapQueues["player_" + (name || $scope.session.id)].getResult(`SV`));

        if (CURRENTONLINE) {
            ACTIONS.GAME.FILTER_BASE(hero, 0.6, 1, "#00f");
            hero.cache(0, 0, hero.image.width, hero.image.height);
        } else
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
        return {body: heroBody, shadow: heroShadow, name: name, online: CURRENTONLINE ? true : false};
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
        sprite.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.HERO.body.y + 25) + (hdif));
        sprite.height = bound.height;
        sprite.width = bound.width;
        sprite.cry = pokemon.cryUrl;
        sprite.scaleX = sprite.scaleY = 1.3;

        var shadow = new createjs.DOMElement(shadowDom);
        shadow.x = POKEMONBATTLE.X(($scope.BATTLEOBJS.HERO.body.x - wdif) + 50) - 20;
        shadow.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.HERO.body.y + 25) + (hdif) + bound.height);
        shadow.height = bound.height;
        shadow.width = bound.width;
        shadow.scaleX = shadow.scaleY = 1.3;

        sprite.alpha = 0;
        layerBattle.addChild(shadow);
        layerBattle.addChild(sprite);
        return ({body: sprite, dom: bound, shadowdom: shadowDom, shadow: shadow});
    },
    REFRIEND: function ($scope) {
        var pokemon = $scope.session.pokemons[$scope.BATTLEOBJS.FRIENDINDEX];
        var bound = $scope.getResource(pokemon.imageUrl.replace('/front/', '/back/').replace('/front_s/', '/back_s/')).cloneNode(true);
        $scope.BATTLEOBJS.FRIEND.dom.src = bound.src;
        bound.style = "z-index:9;" + pokemon.style;
        var sprite = $scope.BATTLEOBJS.FRIEND.body;
        var wdif = bound.width - 70;
        sprite.x = POKEMONBATTLE.X(($scope.BATTLEOBJS.HERO.body.x - wdif) + 50);
        var hdif = 70 - bound.height;
        sprite.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.HERO.body.y + 25) + (hdif));
        sprite.height = bound.height;
        sprite.width = bound.width;
        sprite.cry = pokemon.cryUrl;
        sprite.scaleX = sprite.scaleY = 1.3;
        var shadow = $scope.BATTLEOBJS.FRIEND.shadow;
        shadow.x = POKEMONBATTLE.X(($scope.BATTLEOBJS.HERO.body.x - wdif) + 50) - 20;
        shadow.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.HERO.body.y + 25) + (hdif) + bound.height);
        shadow.height = bound.height;
        shadow.width = bound.width;
        shadow.scaleX = shadow.scaleY = 1.3;
    },
    RETARGET: function ($scope) {
        var pokemon = $scope.BATTLEOBJS.TARGETS[$scope.BATTLEOBJS.TARGETINDEX];
        var bound = $scope.getResource(pokemon.imageUrl).cloneNode(true);
        $scope.BATTLEOBJS.TARGET.dom.src = bound.src;
        //$scope.BATTLEOBJS.TARGET.shadowdom.style = `background-color: black;opacity: 0.5;z-index:8;width:${bound.width + 40}px;height:${bound.height / 2}px;border-radius: 100%;`;
        bound.className = "pokemonBattleFriend";
        bound.style = "z-index:9;" + pokemon.style;
        var sprite = $scope.BATTLEOBJS.TARGET.body;
        var wdif = bound.width - 120;
        sprite.x = POKEMONBATTLE.X((STAGE.canvas.width / 2)) + 30;
        var hdif = 70 - bound.height;
        sprite.y = POKEMONBATTLE.Y(($scope.BATTLEOBJS.ENEMY.body.y - 50) + (hdif));
        sprite.height = bound.height;
        sprite.width = bound.width;
        sprite.scaleX = $scope.BATTLEOBJS.ENEMY.body.scaleX;
        sprite.cry = pokemon.cryUrl;
        var shadow = $scope.BATTLEOBJS.TARGET.shadow;
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
        return ({body: sprite, dom: bound, shadowdom: shadowDom, shadow: shadow});
    },

    //Tests
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