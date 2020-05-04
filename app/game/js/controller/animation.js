ANIMATION = function () {
    this.name = "";
    this.category = "Dark";
    this.file = "";
    this.frames = [];
    this.sound = "";
    this.rows = 1;
    this.columns = 1;
    this.framerate = 30;
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
        resolve(data.data || ANIMATION);
    }),
    DELETE: (name) => new Promise(async (resolve, reject) => {
        var data = await API.POST("delete.php", {
            "folder": "animations",
            "name": name
        });
        resolve(data.data || ANIMATION);
    }),
    animationdb: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("animationdb.php", {});
        resolve(data.data || {});
    }),
    sounddb: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("sounddb.php", {});
        resolve(data.data || {});
    }),
};

pokemon.controller('animation', ['$scope', function ($scope) {
    //Variables
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    PLAYER = new createjs.Stage("player");
    createjs.Ticker.addEventListener("tick", PLAYER);
    //Logic
    $scope.bound = function () {
        return {
            w: $("#currentImage")[0].width,
            h: $("#currentImage")[0].height
        };
    };
    $scope.img = function () {
        return {
            w: $("#currentImage")[0].width / $scope.form.columns,
            h: $("#currentImage")[0].height / $scope.form.rows
        };
    };
    $scope.getObjects = function () {
        if ($scope.form.file) {
            var cubes = [];
            var index = 0;
            for (var yy = 0; yy < $scope.form.rows; yy++) {
                for (var xx = 0; xx < $scope.form.columns; xx++) {
                    cubes.push(index);
                    index++;
                }
            }
            return cubes;
        }
        return [0];
    };

    //CRUD
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
        await ANIMATION_.SAVE($scope.form.name, $scope.form, '');
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
        $scope.sprites = await ANIMATION_.animationdb();
        $scope.SOUNDSDB = await ANIMATION_.sounddb();
        $("[loading='animation']").hide(200);
        $scope.$digest();
    };
    $scope.clear();
    $scope.refresh();

    $scope.loadedSounds = [];
    $scope.sounds = [];
    $scope.existSound = function (url) {
        return $scope.loadedSounds.indexOf(url) !== -1;
    };
    $scope.addSound = function (id, url) {
        $scope.loadedSounds.push(url);
        $scope.sounds[id] = url;
    };
    $scope.playSound = function (id, config) {
        if ($scope.sounds[id])
            createjs.Sound.play($scope.sounds[id], config);
    };
    $scope.setall = function () {
        $scope.form.frames = $scope.getObjects();
    };
    $scope.play = function () {
        $("#loadingAni").show();
        PLAYER.removeAllChildren();
        var queue = new createjs.LoadQueue(false);
        queue.installPlugin(createjs.Sound);
        var loadJson = [];
        loadJson.push({id: "image", src: $scope.form.file});

        if (!$scope.existSound($scope.form.sound)) {
            loadJson.push({id: $scope.form.sound, src: $scope.form.sound});
        }
        $scope.addSound($scope.form.sound, $scope.form.sound);
        queue.loadManifest(loadJson);
        queue.on("complete", function (event) {
            var SpriteSheet = new createjs.SpriteSheet({
                framerate: $scope.form.framerate,
                "images": [queue.getResult(`image`)],
                "frames": {width: parseFloat($scope.img().w), height: parseFloat($scope.img().h)},
                "animations": {
                    "run": {frames: $scope.form.frames}
                }
            });
            sprite = new createjs.Sprite(SpriteSheet);
            sprite.x = 0;
            sprite.y = 0;
            PLAYER.addChild(sprite);
            PLAYER.update();
            sprite.addEventListener("animationend", function () {
                PLAYER.removeChild(sprite);
            });
            sprite.gotoAndPlay("run");
            $scope.playSound($scope.form.sound);
            $("#loadingAni").hide();


        }, this);
        queue.load();
    };

    //Watchers
    $scope.$watch('form.sound', function (newValue, oldValue, scope) {
        if ($scope.form)
            document.getElementById("sound").src = $scope.form.sound;
    });
}]);