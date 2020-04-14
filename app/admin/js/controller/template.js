ANIMATION = function () {
    this.data = {
        name: ""
    }
};
ANIMATION_ = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "animations"
        });
        resolve(data.data || ANIMATION);
    }),
    SAVE: (name, dataset, gender) => new Promise(async (resolve, reject) => {
        var data = await API.POST("save.php", {
            "folder": "animations",
            "name": name,
            "data": dataset
        });
        //await CHARACTER_.UPLOAD(name, gender);
        resolve(data.data || ANIMATION);
    }),
    DELETE: (name) => new Promise(async (resolve, reject) => {
        var data = await API.POST("delete.php", {
            "folder": "animations",
            "name": name
        });
        resolve(data.data || ANIMATION);
    }),
    UPLOAD: (name, gender) => new Promise(async (resolve, reject) => {
        // var dataTUM = {
        //     "folder": "animations_file/" + name,
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

pokemon.controller('animation', ['$scope', function ($scope) {
    $scope.clearData = function () {
        $scope.prop = {mode: "new"};
        $scope.form = new ANIMATION;
    };
    $scope.clear = function () {
        $scope.clearData();
        $('#animation_form').modal('hide');
    };

    $scope.edit = function (edit) {
        $("[loading='animation']").show();
        $(".modal-body").hide();

        $scope.prop = {mode: "edit"};
        $scope.form = edit;
        $('#animation_form').modal('show');
        setTimeout(() => {
            $scope.$digest();
            $("[loading='animation']").hide(200);

            $('.form-control').each(function () {
                $(this).parents('.form-line').addClass('focused');
            });
            $(".modal-body").show();
        }, 2000);
    };
    $scope.new = function () {
        $scope.clearData();
        $('#animation_form').modal('show');
        $("[loading='animation']").hide();

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
            ANIMATION_.DELETE(data.data.name).then(function () {
                $scope.clear();
                $scope.refresh().then(function () {

                    $scope.$digest();
                    swal("deleted!");
                });
            });

        });
    };
    $scope.save = async function () {
        await ANIMATION_.SAVE($scope.form.data.name, $scope.form, $scope.form.data.gender);
        $("[loading='animation']").show();
        $("[loading='animation']").hide(200);
        $scope.clear();
        await $scope.refresh();
    };
    $scope.refresh = async function () {
        $("[loading='animation']").show();
        $scope.list = [];
        $scope.list = await ANIMATION_.ALL();
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $("[loading='animation']").hide(200);

        $scope.$digest();
    };
    $scope.clear();
    $scope.refresh();
}]);