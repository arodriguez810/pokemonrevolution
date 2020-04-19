ABILITIES_F = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data1 = await API.POST("data.php?e=e", {
            "folder": "pokemon_data/abilities"
        });
        resolve(data1.data[0] || {});
    }),
    SAVE: (dataset) => new Promise(async (resolve, reject) => {
        var data5 = await API.POST("save.php", {
            "folder": "pokemon_data/abilities",
            "name": "abilities",
            "data": dataset
        });
        resolve(data5.data || {});
    })
};

pokemon.controller('abilities', ['$scope', function ($scope) {
    $scope.edit = function (edit) {
        $("[loading='abilities']").show();
        $(".modal-body").hide();

        $scope.prop = {mode: "edit"};
        $scope.form = edit;
        $scope.props = [];
        for (var i in edit) {
            $scope.props.push(i);
        }
        console.log(edit);
        $('#abilities_form').modal('show');
        $("[loading='abilities']").hide(200);

        $('.form-control').each(function () {
            $(this).parents('.form-line').addClass('focused');
        });
        $(".modal-body").show();
    };
    $scope.beauty = function () {
        return JSON.stringify($scope.form, undefined, 2);
    };
    $scope.save = async function () {
        await ABILITIES_F.SAVE($scope.list);
        await $scope.refresh();
    };

    $scope.cache = new Date().getTime();
    $scope.refresh = async function () {
        $("[loading='abilities']").show();
        $scope.list  = await ABILITIES_F.ALL();
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $("[loading='abilities']").hide(200);
        $scope.$digest();
    };
    $scope.refresh();
}]);