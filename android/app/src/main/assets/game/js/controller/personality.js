PERSONALITY = function () {
    this.data = {
        name: ""
    }
};
PERSONALITY_ = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "personalitys"
        });
        resolve(data.data || PERSONALITY);
    }),
    SAVE: (name, dataset, gender) => new Promise(async (resolve, reject) => {
        var data = await API.POST("save.php", {
            "folder": "personalitys",
            "name": name,
            "data": dataset
        });
        resolve(data.data || PERSONALITY);
    }),
    DELETE: (name) => new Promise(async (resolve, reject) => {
        var data = await API.POST("delete.php", {
            "folder": "personalitys",
            "name": name
        });
        resolve(data.data || PERSONALITY);
    }),
    UPLOAD: (name, gender) => new Promise(async (resolve, reject) => {
        // var dataTUM = {
        //     "folder": "personalitys_file/" + name,
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

pokemon.controller('personality', ['$scope', function ($scope) {
    $scope.clearData = function () {
        $scope.prop = {mode: "new"};
        $scope.form = new PERSONALITY;
    };
    $scope.clear = function () {
        $scope.clearData();
        $('#personality_form').modal('hide');
    };

    $scope.edit = function (edit) {
        $("[loading='personality']").show();
        $(".modal-body").hide();

        $scope.prop = {mode: "edit"};
        $scope.form = edit;
        $('#personality_form').modal('show');
        setTimeout(() => {
            $scope.$digest();
            $("[loading='personality']").hide(200);

            $('.form-control').each(function () {
                $(this).parents('.form-line').addClass('focused');
            });
            $(".modal-body").show();
        }, 2000);
    };
    $scope.new = function () {
        $scope.clearData();
        $('#personality_form').modal('show');
        $("[loading='personality']").hide();

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
             $scope.PERSONALITY_.DELETE(data.data.name).then(function () {
                $scope.clear();
                $scope.refresh().then(function () {

                    $scope.$digest();
                    swal("deleted!");
                });
            });

        });
    };
    $scope.save = async function () {
        await  $scope.PERSONALITY_.SAVE($scope.form.name, $scope.form);
        $("[loading='personality']").show();
        $("[loading='personality']").hide(200);
        $scope.clear();
        await $scope.refresh();
    };
    $scope.refresh = async function () {
        $("[loading='personality']").show();
        $scope.list = [];
        $scope.list = await  $scope.PERSONALITY_.ALL();
        console.log($scope.list);
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $("[loading='personality']").hide(200);

        $scope.$digest();
    };
    $scope.clear();
    $scope.refresh();
}]);