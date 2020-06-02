SPANISH = function () {
    this.data = {
        name: ""
    }
};
SPANISH_ = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "language_es"
        });
        resolve(data.data || SPANISH);
    }),
    SAVE: (name, dataset, gender) => new Promise(async (resolve, reject) => {
        var data = await API.POST("save.php", {
            "folder": "language_es",
            "name": name,
            "data": dataset
        });
        resolve(data.data || SPANISH);
    }),
    DELETE: (name) => new Promise(async (resolve, reject) => {
        var data = await API.POST("delete.php", {
            "folder": "language_es",
            "name": name
        });
        resolve(data.data || SPANISH);
    }),
    UPLOAD: (name, gender) => new Promise(async (resolve, reject) => {
        // var dataTUM = {
        //     "folder": "spanishs_file/" + name,
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

pokemon.controller('spanish', ['$scope', function ($scope) {
    $scope.clearData = function () {
        $scope.prop = {mode: "new"};
        $scope.form = new SPANISH;
    };
    $scope.clear = function () {
        $scope.clearData();
        $('#spanish_form').modal('hide');
    };

    $scope.edit = function (edit) {
        $("[loading='spanish']").show();
        $(".modal-body").hide();

        $scope.prop = {mode: "edit"};
        $scope.form = edit;
        $('#spanish_form').modal('show');
        setTimeout(() => {
            $scope.$digest();
            $("[loading='spanish']").hide(200);

            $('.form-control').each(function () {
                $(this).parents('.form-line').addClass('focused');
            });
            $(".modal-body").show();
        }, 2000);
    };
    $scope.new = function () {
        $scope.clearData();
        $('#spanish_form').modal('show');
        $("[loading='spanish']").hide();

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
            SPANISH_.DELETE(data.data.name).then(function () {
                $scope.clear();
                $scope.refresh().then(function () {

                    $scope.$digest();
                    swal("deleted!");
                });
            });

        });
    };
    $scope.save = async function () {
        await SPANISH_.SAVE("game", $scope.list[0]);
        $("[loading='spanish']").show();
        $("[loading='spanish']").hide(200);
        $scope.clear();
        await $scope.refresh();
    };
    $scope.refresh = async function () {
        $("[loading='spanish']").show();
        $scope.list = [];
        $scope.list = await SPANISH_.ALL();
        console.log($scope.list);
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $("[loading='spanish']").hide(200);

        $scope.$digest();
    };
    $scope.clear();
    $scope.refresh();
}]);