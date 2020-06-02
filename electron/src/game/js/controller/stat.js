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
    $scope.filters = [
        {name: "By Rank", rules: "rating"},
        {name: "By Power", rules: "power"}
    ];

    $scope.counts = [
        {name: "Trainers", rules: "true", color: "amber", icon: "person_add"},
        {name: "Avatar Stages", rules: "d.avatar!==1", color: "red", icon: "error"}
    ];
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

    $scope.currentStat = {name: "Trainers", rules: "true", color: "amber", icon: "person_add"};
    $scope.currentStatCalc = function (stats) {
        $scope.currentStat = stats;
    };
    $scope.asc = true;
    $scope.filterStyle = function (cate) {
        return $scope.currentFilter === cate.rules ? ($scope.asc ? 'blue' : 'red') : '';
    };
    $scope.selectFilter = function (cate) {
        if ($scope.currentFilter === cate.rules)
            $scope.asc = !$scope.asc;
        else
            $scope.asc = false;
        $scope.currentFilter = cate.rules;
        if (!$scope.$$phase)
            $scope.$digest();
    };
    $scope.listFilter = function () {
        return eval(`$scope.list.sort((a, b) => (a.${$scope.currentFilter} ${$scope.asc ? '>' : '<'} b.${$scope.currentFilter}) ? 1 : -1).filter(d=>{ return ${$scope.currentStat.rules} })`);
    };

    $scope.countFilter = function (cond) {
        return eval(`$scope.list.filter(d=>{ return ${cond} }).length`);
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
        $scope.list = $scope.list.sort((a, b) => ((a.rating || 0) < (b.rating || 0) ? 1 : -1));
        var top = 1;
        for (var gente of $scope.list) {
            var power = 0;
            for (var pokemon of gente.pokemons) {
                power += parseInt(pokemon.power);
            }
            gente.power = power;
            gente.top = top;
            top++;
        }
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $scope._colors = ["green", "blue", "red", "pink", "amber", "purple", "deep-purple", "indigo", "light-blue", "cyan", "teal", "light-green", "lime", "orange", "yellow", "deep-orange", "brown", "grey", "blue-grey", "black"];
        var index = 1;
        $scope.catarray = POKEMON.categoriesarray;
        for (var category of POKEMON.categories) {
            $scope.counts.push({
                name: `${category.name}`,
                rules: `d.tier==="${category.name}"`,
                color: $scope._colors[index],
                icon: "filter_" + `${index > 9 ? '9_plus' : index}`
            });
            index++
        }


        $("[loading='player']").hide(200);

        setTimeout(function () {
            $('.count-to').countTo();
        }, 1000);
        if (!$scope.$$phase)
            $scope.$digest();


    };
    $scope.clear();
    $scope.refresh();
}]);