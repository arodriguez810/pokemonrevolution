CHARACTER = function () {
    this.data = {
        name: "",
        gender: "Female",
        title: "pueblerino",
        avatar: new AVATAR(),
        types: [],
        level: "",
        version: 1,
    }
};

HOME_ = {
    PLAYERPROFILE: (id, set) => new Promise(async (resolve, reject) => {
        var folder = `players/${id}`;
        var data = await API.POST("dataplayer.php", {
            "folder": folder
        });
        if (data.data[0]) {
            if (set) {
                var currment = data.data[0];
                for (var i in set) {
                    currment[i] = set[i];
                }
                await API.POST("save.php", {
                    "folder": folder,
                    "name": "data",
                    "data": currment
                });
                resolve(currment);
            } else {
                resolve(data.data[0]);
            }

        } else {
            var sdates = {
                id: id,
                name: id,
                email: ""
            };
            await API.POST("save.php", {
                "folder": folder,
                "name": "data",
                "data": sdates
            });
            resolve(sdates)
        }
    }),
};
CHARACTER_ = {
    GET: (id) => new Promise(async (resolve, reject) => {
        var data = await API.POST("data.php", {
            "folder": `players/${id}/indentity`
        });
        resolve(data.data[0].data || CHARACTER);
    }),
    SAVE: (name, dataset, id) => new Promise(async (resolve, reject) => {
        dataset.data.version = new Date().getTime();
        var data = await API.POST("saveplayer.php", {
            "folder": `players/${id}/indentity`,
            "name": "data",
            "data": dataset
        });
        await CHARACTER_.UPLOAD(name, id);
        resolve(data.data || CHARACTER);
    }),
    UPLOAD: (name, id) => new Promise(async (resolve, reject) => {
        var dataTUM = {
            "folder": `players/${id}/images`,
            "name": "images",
            face: FACE.toDataURL(),
            sv: SV.toDataURL(),
            tv: TV.toDataURL(),
            tvd: TVD.toDataURL()
        };
        $.ajax({
            type: "POST",
            url: DOMAIN + "upload.php",
            data: dataTUM
        }).done(function (o) {
            resolve(true);
        });


    }),
    TYPES: () => new Promise(async (resolve, reject) => {
        var data4 = await API.POST("data.php?e=TYPES", {
            "folder": "pokemon_data/types"
        });
        resolve(data4.data[0] || {});
    }),
};
GRADIENTS = [];
_colors = ["red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "grey", "blue-grey", "black"];
_colorsReal = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#000000"];
pokemon.controller('character', ['$scope', function ($scope) {
    //CRUD
    $scope.POKEMON = POKEMON;
    $scope.clearData = function () {
        $scope.prop = {mode: "new"};
        $scope.form = new CHARACTER;
    };
    $scope.clearAvatar = function () {
        $scope.selection = new SELECTION;
        $scope.form.data.avatar.init($scope.form.data.gender);
        $scope.form.data.avatar.draw($scope.form.data.gender);
        $scope.$digest();
    };
    $scope.personalities = {
        _1: "Gruñon",
        _2: "Amable",
        _3: "Presumido",
        _4: "Modesto",
        _5: "Agresivo",
        _6: "Tranquilo",
        _7: "Neutral",
        _8: "Divertido",
        _9: "Holgazan",
        _10: "Activo",
        _11: "Pesimista",
        _12: "Optimista"
    };
    $scope.cache = new Date().getTime();
    $scope.randomName = async function () {


        for (var c in AVATARDB[$scope.form.data.gender].FG) {
            category = AVATARDB[$scope.form.data.gender].FG[c];
            var item = getRandomInt(Object.size(category));
            if ($scope.form.data.avatar.required.indexOf(c) !== -1)
                item = getRandomInt(Object.size(category) - 1) + 1;
            var keys = Object.keys(category);
            item = keys[item];
            $scope.selectCategory(c);
            if (["Cloak2", "BeastEars", "Glasses", "AccB", "Cloak1", "FacialMark"].indexOf(c) !== -1) {
                item = "p00";
            }
            if (["Body"].indexOf(c) !== -1) {
                item = "p01";
            }
            $scope.selectItem(item, false);
            for (var co in AVATARDB[$scope.form.data.gender].FG[$scope.selection.category][item]) {
                var color = AVATARDB[$scope.form.data.gender].FG[$scope.selection.category][item][co];
                $scope.selectColor(co);
                var colRan = getRandomInt(COLORS.length);
                if (["Body", "Face", "Ears", "Nose", "Mouth"].indexOf(c) !== -1) {
                    colRan = getRandomIntRange(16, 45);
                }
                if (["Eyes"].indexOf(c) !== -1) {
                    if (co == "c2")
                        colRan = 0;
                }
                if ($scope.form.data.gender == "Male")
                    if (["RearHair1", "RearHair2"].indexOf(c) !== -1) {
                        $scope.form.data.avatar.color["Beard"]["c1"] = colRan;
                    }
                colRan = colRan == 24 ? colRan = 0 : colRan;

                $scope.layerIDSet(colRan, false);
            }
        }
        $scope.form.data.avatar.draw($scope.form.data.gender);
        if (!$scope.$$phase)
            $scope.$digest();
    };
    $scope.clear = function () {
        $scope.clearData();
        $('#character_form').modal('hide');
    };
    $scope.edit = function (edit) {
        if (typeof FACE !== "undefined") {
            $scope.form.data.avatar.clear();
            $scope.form.data.avatar.update();
        }
        $("[loading='avatar']").show();
        $(".modal-body").hide();

        $scope.prop = {mode: "edit"};
        $scope.form = new CHARACTER;
        $scope.selection = new SELECTION;

        $scope.form.data.name = edit.data.name;
        $scope.form.data.gender = edit.data.gender;
        $scope.form.data.title = edit.data.title;
        $scope.form.data.biography = edit.data.biography;
        $scope.form.data.objective = edit.data.objective;
        $scope.form.data.personality = edit.data.personality;
        $scope.form.data.avatar.prop = edit.data.avatar.prop;
        $scope.form.data.avatar.color = edit.data.avatar.color;
        $('#character_form').modal('show');

        setTimeout(() => {

            $scope.form.data.avatar.init($scope.form.data.gender, true);
            $scope.form.data.avatar.draw($scope.form.data.gender);
            $scope.$digest();
            $("[loading='avatar']").hide(200);

            $('.form-control').each(function () {
                $(this).parents('.form-line').addClass('focused');
            });
            $(".modal-body").show();
            $scope.stopLoading();
        }, 2000);


    };
    $scope.new = function () {
        $scope.clearData();
        $scope.clearAvatar();
        $('#character_form').modal('show');
        $("[loading='avatar']").hide();
        $scope.form.data.name = $scope.session.name || "";
        if (!$scope.$$phase)
            $scope.$digest();
        $scope.stopLoading();
    };
    $scope.delete = function (data) {
        swal({
            title: "Estas seguro?",
            text: "No podrás recuperar este archivo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {
            CHARACTER_.DELETE(data.data.name).then(function () {
                $scope.clear();
                $scope.refresh().then(function () {


                    $scope.$digest();
                    swal("deleted!");
                });
            });

        });
    };
    $scope.save = async function () {
        $scope.playLoading("Guardando Avatar");
        await CHARACTER_.SAVE($scope.form.data.name, $scope.form, $scope.session.id);
        $scope.playLoading("Guardando Perfil");
        await HOME_.PLAYERPROFILE($scope.session.id, {avatar: 1});
        $scope.playLoading("Redireccionando");
        location.href = "play.html";
        // $scope.form.data.avatar.clear();
        // $scope.form.data.avatar.update();
        // $("[loading='character']").show();
        // $("[loading='character']").hide(200);
        // $scope.clear();
        // await $scope.refresh();
    };
    $scope.playLoading = function (text) {
        _colors.forEach(d => {
            $(".spinner-layer").removeClass(`pl-${d}`)
        });
        $(".spinner-layer").addClass(`pl-${_colors[getRandomInt(_colors.length - 1)]}`);
        $("#loadingtext").html(text);
        $("#globalload").show();
    };
    $scope.stopLoading = function () {
        $("#globalload").fadeOut(3000);
    };
    $scope.gradientID = function (image) {
        return image.split('colors/')[1].replace('.png', '')
    };
    $scope.layerID = function (value) {
        if ($scope.selection)
            if ($scope.form.data.avatar.color[$scope.selection.category])
                return $scope.form.data.avatar.color[$scope.selection.category][$scope.selection.color];
    };
    $scope.layerIDSet = function (set, draw) {
        if ($scope.selection) {
            if (!$scope.form.data.avatar.color[$scope.selection.category])
                $scope.form.data.avatar.color[$scope.selection.category] = {
                    c1: "",
                    c2: "",
                    c3: "",
                    c4: "",
                    c5: "",
                    c6: ""
                };
            $scope.form.data.avatar.color[$scope.selection.category][$scope.selection.color] = set;
            if (set != 0) {
                //displayColorsHex(getColors(document.getElementById("grd_" + set + "_r")), 'pallete');
                if (GRADIENTS[set] === undefined)
                    GRADIENTS[set] = getColorsRBG(document.getElementById("grd_" + set + "_r"));
            }
            if (AVATARDB) {
                var groupFace = ["Body", "Face", "Ears", "Nose", "Mouth"];
                var groupHair = ["RearHair2", "RearHair1", "Eyebrows", "FrontHair", "FrontHair1", "FrontHair2"];
                var groupcCloack = ["Cloak1", "Cloak2"];
                var groupcWing = ["Wing", "Wing1", "Wing2"];
                var groupcTail = ["Tail", "Tail1", "Tail2"];
                var groupcBeard = ["Beard", "Beard1", "Beard2"];
                var groupcClothing = ["Clothing2"];
                $scope.runGroups(groupFace);
                $scope.runGroups(groupHair);
                $scope.runGroups(groupcCloack);
                $scope.runGroups(groupcClothing);
                $scope.runGroups(groupcWing);
                $scope.runGroups(groupcTail);
                $scope.runGroups(groupcBeard);
                if (draw === undefined)
                    $scope.form.data.avatar.draw($scope.form.data.gender);
            }
        }
    };
    $scope.refresh = async function () {
        $scope.playLoading("Cargando Avatar");
        $scope.cache = new Date().getTime();
        $("[loading='character']").show();
        AVATARDB = await AVATAR_.db();
        COLORS = await AVATAR_.colors();
        $scope.AVATARDB = await AVATAR_.db();
        $scope.COLORS = await AVATAR_.colors();
        $scope.TYPES = await CHARACTER_.TYPES();
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        $("[loading='character']").hide(200);
        $scope.$digest();
        if ($scope.session.avatar) {
            var exist = await CHARACTER_.GET($scope.session.id);
            if (exist)
                $scope.edit({data: exist})
        } else
            $scope.new();
    };
    $scope.clear();
    $scope.refresh();
    SESSION = async function () {
        if (STORAGED.exist()) {
            $scope.session = await HOME_.PLAYERPROFILE(STORAGED.get());
        } else {
            location.href = "index.html";
        }
    };
    //avatar
    $scope.selectCategory = function (category) {
        $scope.selection.category = category;
        $scope.selection.color = "c1";
        $("[href='#profile_with_icon_title']").trigger('click');
    };
    $scope.selectColor = function (color) {
        $scope.selection.color = color;
    };
    $scope.selectItem = function (item, draw) {
        $scope.selection.color = "c1";
        $scope.form.data.avatar.prop[$scope.selection.category] = item;

        if (["Wing", "Wing1", "Wing2"].indexOf($scope.selection.category) !== -1) {
            $scope.form.data.avatar.prop["Wing1"] = item;
            $scope.form.data.avatar.prop["Wing2"] = item;
            $scope.form.data.avatar.prop["Wing"] = item;
        }
        if (["Tail", "Tail1", "Tail2"].indexOf($scope.selection.category) !== -1) {
            $scope.form.data.avatar.prop["Tail"] = item;
            $scope.form.data.avatar.prop["Tail1"] = item;
            $scope.form.data.avatar.prop["Tail2"] = item;
        }
        if (["Beard", "Beard1", "Beard2"].indexOf($scope.selection.category) !== -1) {
            $scope.form.data.avatar.prop["Beard"] = item;
            $scope.form.data.avatar.prop["Beard1"] = item;
            $scope.form.data.avatar.prop["Beard2"] = item;
        }
        if (["FrontHair", "FrontHair1", "FrontHair2"].indexOf($scope.selection.category) !== -1) {
            $scope.form.data.avatar.prop["FrontHair"] = item;
            $scope.form.data.avatar.prop["FrontHair1"] = item;
            $scope.form.data.avatar.prop["FrontHair2"] = item;
        }
        if (["RearHair1", "RearHair2"].indexOf($scope.selection.category) !== -1) {
            $scope.form.data.avatar.prop["RearHair1"] = item;
            $scope.form.data.avatar.prop["RearHair2"] = item;
        }
        if ($scope.selection.category.indexOf('1') !== -1)
            $scope.form.data.avatar.prop[$scope.selection.category.replace('1', '2')] = item;
        if (draw === undefined)
            $scope.form.data.avatar.draw($scope.form.data.gender);
    };
    $scope.$watchCollection('form.data.gender', function (newValue, oldValue, scope) {
        if (AVATARDB) {
            if ($scope.prop.mode == "edit")
                $scope.form.data.avatar.draw($scope.form.data.gender, true);
            else
                $scope.form.data.avatar.draw($scope.form.data.gender);
        }
    });
    $scope.runGroups = function (groupFace) {
        if (groupFace.indexOf($scope.selection.category) !== -1) {
            for (var cat of groupFace) {
                for (var i = 1; i <= 6; i++) {
                    if (!$scope.form.data.avatar.color[cat])
                        $scope.form.data.avatar.color[cat] = {
                            c1: "",
                            c2: "",
                            c3: "",
                            c4: "",
                            c5: "",
                            c6: ""
                        };
                    $scope.form.data.avatar.color[cat]["c" + i] = $scope.form.data.avatar.color[$scope.selection.category]["c" + i];
                }
            }
        }
    };
    $scope.$watchCollection('form.data.avatar.color', function (newValue, oldValue, scope) {

    });
}]);