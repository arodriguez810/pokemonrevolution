POKEDEX_F = {
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
    SAVE: (dataset) => new Promise(async (resolve, reject) => {
        var data5 = await API.POST("save.php", {
            "folder": "pokedex",
            "name": "full",
            "data": dataset
        });
        resolve(data5.data || {});
    })
};

pokemon.controller('pokedex', ['$scope', function ($scope) {
    $scope.edit = function (edit) {
        $("[loading='pokedex']").show();
        $(".modal-body").hide();

        $scope.prop = {mode: "edit"};
        $scope.form = edit;
        console.log(edit);
        $('#pokedex_form').modal('show');
        $("[loading='pokedex']").hide(200);

        $('.form-control').each(function () {
            $(this).parents('.form-line').addClass('focused');
        });
        $(".modal-body").show();
    };
    $scope.save = async function () {
        await POKEDEX_F.SAVE($scope.pokedex);
        await $scope.refresh();
    };
    $scope.move_learns = function () {
        return $scope.learns[($scope.form.baseSpecies ? $scope.form.baseSpecies.toLowerCase() : $scope.form.keyname)];
    };
    $scope.abilitiesDesc = function (ability) {
        var ab = $scope.abilities.filter(d => {
            return d.name === ability
        });
        if (ab)
            return ab[0];
        return {name: "Not Found"};
    };
    $scope.statStyle = function (stat) {
        if (stat === Object.keys($scope.form.baseStats).reduce((a, b) => $scope.form.baseStats[a] > $scope.form.baseStats[b] ? a : b))
            return `text-success`;
        if (stat === Object.keys($scope.form.baseStats).reduce((a, b) => $scope.form.baseStats[a] < $scope.form.baseStats[b] ? a : b))
            return `text-danger`;
        return `<b>${stat}<b/>`;
    };
    $scope.cache = new Date().getTime();
    $scope.filterStyle = function (cate) {
        return $scope.currentFilter === cate.rules ? 'green' : '';
    };
    $scope.selectFilter = function (cate) {
        $scope.currentFilter = cate.rules;
        if (!$scope.$$phase)
            $scope.$digest();
    };
    $scope.listFilter = function () {
        return eval(`$scope.pokedex.filter(d=>{ return ${$scope.currentFilter} })`);
    };
    $scope.byType = function (type) {
        return eval(`$scope.pokedex.filter(d=>{ if(d.types.indexOf('${type}') !== -1) return ${$scope.currentFilter} })`).length;
    };
    $scope.currentFilter = "d.keyname!==undefined";
    $scope.refresh = async function () {

        $("[loading='pokedex']").show();
        $scope.pokedex = [];
        $scope.moves = await POKEDEX_F.MOVES();
        $scope.abilities = await POKEDEX_F.ABILITIES();
        $scope.types = await POKEDEX_F.TYPES();
        $scope.learns = await POKEDEX_F.LEARNS();
        $scope.POKEMON = POKEMON;
        var result = await POKEDEX_F.ALL();
        if (!Array.isArray(result)) {
            for (var i in result) {
                result[i].keyname = i;
                $scope.pokedex.push(result[i]);
            }
        } else {
            $scope.pokedex = result;
        }
        // for (var pokemon of $scope.pokedex)
        //     pokemon.power = (pokemon.baseStats.hp + pokemon.baseStats.atk + pokemon.baseStats.def + pokemon.baseStats.spa + pokemon.baseStats.spd + pokemon.baseStats.spe);

        POKEDEXS = $scope.pokedex;
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $("[loading='pokedex']").hide(200);
        $scope.$digest();
    };
    $scope.refresh();
}]);