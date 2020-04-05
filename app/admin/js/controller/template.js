MAP = function () {
    this.data = {
        name: ""
    }
};
MAP_ = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "maps"
        });
        resolve(data.data || MAP);
    }),
    SAVE: (name, dataset, gender) => new Promise(async (resolve, reject) => {
        var data = await API.POST("save.php", {
            "folder": "maps",
            "name": name,
            "data": dataset
        });
        await CHARACTER_.UPLOAD(name, gender);
        resolve(data.data || MAP);
    }),
    DELETE: (name) => new Promise(async (resolve, reject) => {
        var data = await API.POST("delete.php", {
            "folder": "maps",
            "name": name
        });
        resolve(data.data || MAP);
    }),
    UPLOAD: (name, gender) => new Promise(async (resolve, reject) => {
        // var dataTUM = {
        //     "folder": "characters_file/" + name,
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

pokemon.controller('map', ['$scope', function ($scope) {
    $scope.clearData = function () {
        $scope.prop = {mode: "new"};
        $scope.form = new MAP;
    };
    $scope.clear = function () {
        $scope.clearData();
        $('#map_form').modal('hide');
    };

    $scope.edit = function (edit) {
        $("[loading='map']").show();
        $(".modal-body").hide();

        $scope.prop = {mode: "edit"};
        $scope.form = new MAP;
        $('#map_form').modal('show');
        setTimeout(() => {
            $scope.$digest();
            $("[loading='map']").hide(200);
            $("select").selectpicker('refresh');
            $('.form-control').each(function () {
                $(this).parents('.form-line').addClass('focused');
            });
            $(".modal-body").show();
        }, 2000);
    };
    $scope.new = function () {
        $scope.clearData();
        $('#character_form').modal('show');
        $("[loading='map']").hide();
        $("select").selectpicker('refresh');
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
            MAP_.DELETE(data.data.name).then(function () {
                $scope.clear();
                $scope.refresh().then(function () {
                    $("select").selectpicker('refresh');
                    $scope.$digest();
                    swal("deleted!");
                });
            });

        });
    };
    $scope.save = async function () {
        await MAP_.SAVE($scope.form.data.name, $scope.form, $scope.form.data.gender);
        $("[loading='map']").show();
        $("[loading='map']").hide(200);
        $scope.clear();
        await $scope.refresh();
    };
    $scope.refresh = async function () {
        $("[loading='map']").show();
        $scope.list = [];
        $scope.list = await MAP_.ALL();
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $("[loading='map']").hide(200);
        $("select").selectpicker('refresh');
        $scope.$digest();
    };
    $scope.clear();
    $scope.refresh();
}]);