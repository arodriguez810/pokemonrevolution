MOVE_F = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data1 = await API.POST("data.php?e=e", {
            "folder": "pokemon_data/moves"
        });
        resolve(data1.data[0] || {});
    }),
    ANIMATIONS: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "animations"
        });
        resolve(data.data || ANIMATION);
    }),
    SAVE: (dataset) => new Promise(async (resolve, reject) => {
        var data5 = await API.POST("save.php", {
            "folder": "pokemon_data/moves",
            "name": "moves",
            "data": dataset
        });
        resolve(data5.data || {});
    })
};

pokemon.controller('move', ['$scope', function ($scope) {
    $scope.edit = function (edit) {
        $("[loading='move']").show();
        $(".modal-body").hide();

        $scope.prop = {mode: "edit"};
        $scope.form = edit;
        $scope.props = [];
        for (var i in edit) {
            $scope.props.push(i);
        }
        console.log(edit);
        $('#move_form').modal('show');
        $("[loading='move']").hide(200);

        $('.form-control').each(function () {
            $(this).parents('.form-line').addClass('focused');
        });
        $(".modal-body").show();
    };
    $scope.beauty = function () {
        return JSON.stringify($scope.form, undefined, 2);
    };
    $scope.save = async function () {
        await MOVE_F.SAVE($scope.list);
        await $scope.refresh();
    };

    $scope.cache = new Date().getTime();
    $scope.refresh = async function () {
        $("[loading='move']").show();
        $scope.list = await MOVE_F.ALL();
        $scope.animations = await MOVE_F.ANIMATIONS();

        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $("[loading='move']").hide(200);
        $scope.$digest();
    };
    $scope.refresh();
}]);