POKEDEX = function () {

};
TYPES = ["Normal", "Fire", "Fighting", "Water", "Flying", "Grass", "Poison", "Electric", "Ground", "Psychic", "Rock", "Ice", "Bug", "Dragon", "Ghost", "Dark", "Steel", "Fairy"];
POKEDEX_ = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "pokedex"
        });
        resolve(data.data || {data: new POKEDEX});
    }),
    Ramdon: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "pokedex"
        });
        var keys = Object.keys(data.data[0]);
        var poke = data.data[0][keys[keys.length * Math.random() << 0]];
        resolve(POKEDEX_.Pokemon(keys[keys.length * Math.random() << 0]));

    }),
    Pokemon: (name, isShiny) => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "pokedex"
        });
        var poke = data.data[0][name];
        var shiny = isShiny ? 100 : Math.floor(Math.random() * Math.floor(100));
        console.log(poke);
        var pokepath = `../resources/poekemon/gif/front${shiny > 50 ? "_s" : ""}/${name}.gif`;
        var sound_pokepath = `../resources/poekemon/audio/cries/${POKEDEX_.cleanName(poke.baseSpecies || name)}.ogg`;
        if (poke.num <= 721) {
            sound_pokepath = `../resources/poekemon/audio/cries_anime/${POKEDEX_.cleanName(poke.baseSpecies || name)}.ogg`;
            resolve({image: pokepath, crie: sound_pokepath, name: name});
        } else {
            resolve({image: pokepath, crie: sound_pokepath, name: name});
        }

    }),
    cleanName: function (name) {
        var newName = name + ".";
        // newName = newName.toLowerCase();
        // newName = newName.replace('max.', '');
        // newName = newName.replace('mega.', '');
        // newName = newName.replace('wings.', '');
        // newName = newName.replace('megax.', '');
        // newName = newName.replace('megay.', '');
        // if (name.indexOf)
        //     for (type of TYPES) {
        //         newName = newName.replace(type.toLowerCase() + '.', '.');
        //     }
        return newName.replace('.', '');
    }
};