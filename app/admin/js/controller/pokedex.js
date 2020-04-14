POKEDEX_F = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "pokedex"
        });
        resolve(data.data[0] || {});
    }),
    SAVE: (dataset) => new Promise(async (resolve, reject) => {
        var data = await API.POST("save.php", {
            "folder": "pokedex",
            "name": "full",
            "data": dataset
        });
        resolve(data.data || {});
    })
};

pokemon.controller('pokedex', ['$scope', function ($scope) {
    $scope.edit = function (edit) {
        $("[loading='pokedex']").show();
        $(".modal-body").hide();

        $scope.prop = {mode: "edit"};
        $scope.form = edit;
        $('#pokedex_form').modal('show');
        setTimeout(() => {
            $scope.$digest();
            $("[loading='pokedex']").hide(200);

            $('.form-control').each(function () {
                $(this).parents('.form-line').addClass('focused');
            });
            $(".modal-body").show();
        }, 2000);
    };
    $scope.save = async function () {
        await POKEDEX_F.SAVE($scope.pokedex);
        await $scope.refresh();
    };
    $scope.cache = new Date().getTime();
    $scope.refresh = async function () {
        $("[loading='pokedex']").show();
        $scope.pokedex = [];
        var result = await POKEDEX_F.ALL();
        if (!Array.isArray(result)) {
            for (var i in result) {
                result[i].keyname = i;
                $scope.pokedex.push(result[i]);
            }
        } else {
            $scope.pokedex = result;
        }
        POKEDEXS = $scope.pokedex;
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $("[loading='pokedex']").hide(200);
        $scope.$digest();
    };
    $scope.refresh();
}]);