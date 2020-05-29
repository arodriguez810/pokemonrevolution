ENGLISH = function () {
    this.data = {
        name: ""
    }
};
ENGLISH_ = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": "language"
        });
        resolve(data.data || ENGLISH);
    }),
    SAVE: (name, dataset, gender) => new Promise(async (resolve, reject) => {
        var data = await API.POST("save.php", {
            "folder": "language",
            "name": name,
            "data": dataset
        });
        resolve(data.data || ENGLISH);
    }),
    DELETE: (name) => new Promise(async (resolve, reject) => {
        var data = await API.POST("delete.php", {
            "folder": "language",
            "name": name
        });
        resolve(data.data || ENGLISH);
    }),
    UPLOAD: (name, gender) => new Promise(async (resolve, reject) => {
        // var dataTUM = {
        //     "folder": "englishs_file/" + name,
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

pokemon.controller('english', ['$scope', function ($scope) {
    $scope.clearData = function () {
        $scope.prop = {mode: "new"};
        $scope.form = new ENGLISH;
    };
    $scope.clear = function () {
        $scope.clearData();
        $('#english_form').modal('hide');
    };

    $scope.edit = function (edit) {
        $("[loading='english']").show();
        $(".modal-body").hide();

        $scope.prop = {mode: "edit"};
        $scope.form = edit;
        $('#english_form').modal('show');
        setTimeout(() => {
            $scope.$digest();
            $("[loading='english']").hide(200);

            $('.form-control').each(function () {
                $(this).parents('.form-line').addClass('focused');
            });
            $(".modal-body").show();
        }, 2000);
    };
    $scope.new = function () {
        $scope.clearData();
        $('#english_form').modal('show');
        $("[loading='english']").hide();

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
            ENGLISH_.DELETE(data.data.name).then(function () {
                $scope.clear();
                $scope.refresh().then(function () {

                    $scope.$digest();
                    swal("deleted!");
                });
            });

        });
    };
    $scope.save = async function () {
        await ENGLISH_.SAVE("game", $scope.list[0]);
        $("[loading='english']").show();
        $("[loading='english']").hide(200);
        $scope.clear();
        await $scope.refresh();
    };
    $scope.refresh = async function () {
        $("[loading='english']").show();
        $scope.list = [];
        $scope.list = await ENGLISH_.ALL();
        console.log($scope.list);
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $("[loading='english']").hide(200);

        $scope.$digest();
    };
    $scope.clear();
    $scope.refresh();
}]);