PLAYER = function () {
    this.data = {
        name: ""
    }
};
PLAYER_ = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("dataonline.php", {
            "folder": "players"
        });
        resolve(data.data || PLAYER);
    }),
    DELETE: (name) => new Promise(async (resolve, reject) => {
        var data = await API.POST("deletefolder.php", {
            "folder": "players",
            "name": name
        });
        resolve(data.data || PLAYER);
    }),
    UPLOAD: (name, gender) => new Promise(async (resolve, reject) => {
        // var dataTUM = {
        //     "folder": "players_file/" + name,
        //     "name": name,
        //     face: FACE.toDataURL(),
        //     sv: SV.toDataURL(),
        //     tv: TV.toDataURL(),
        //     tvd: TVD.toDataURL()
        // };
        // $.ajax({
        //     type: "POST",
        //     url: "upload.php",
        //     data: dataTUM
        // }).done(function (o) {
        //     resolve(true);
        // });
        resolve(true);
    })
};

pokemon.controller('player', ['$scope', function ($scope) {
    $scope.clearData = function () {
        $scope.prop = {mode: "new"};
        $scope.form = new PLAYER;
    };
    $scope.clear = function () {
        $scope.clearData();
        $('#player_form').modal('hide');
    };

    $scope.edit = function (edit) {
        $("[loading='player']").show();
        $(".modal-body").hide();

        $scope.prop = {mode: "edit"};
        $scope.form = edit;
        $('#player_form').modal('show');
        setTimeout(() => {
            $scope.$digest();
            $("[loading='player']").hide(200);

            $('.form-control').each(function () {
                $(this).parents('.form-line').addClass('focused');
            });
            $(".modal-body").show();
        }, 2000);
    };
    $scope.new = function () {
        $scope.clearData();
        $('#player_form').modal('show');
        $("[loading='player']").hide();

    };
    $scope.delete = function (data) {
        swal({
            title: "Are you sure?",
            text: "No podrás recuperar este archivo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {
            PLAYER_.DELETE(data.name).then(function () {
                $scope.clear();
                $scope.refresh().then(function () {

                    $scope.$digest();
                    swal("deleted!");
                });
            });

        });
    };
    $scope.save = async function () {
        await PLAYER_.SAVE($scope.form.data.name, $scope.form, $scope.form.data.gender);
        $("[loading='player']").show();
        $("[loading='player']").hide(200);
        $scope.clear();
        await $scope.refresh();
    };
    $scope.refresh = async function () {
        $("[loading='player']").show();
        $scope.list = [];
        $scope.list = await PLAYER_.ALL();
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $("[loading='player']").hide(200);

        $scope.$digest();
    };
    $scope.clear();
    $scope.refresh();
}]);