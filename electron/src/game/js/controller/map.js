MAP = function () {
    this.data = {
        map: {},
        event: {},
        name: "Sin Nombre " + new Date().getTime(),
        displayName: "",
        description: "",
        vecinos: [],
        width: 17,
        height: 13,
        bgm: "",
        bgs: "",
        steps: "",
        rate: 1,
        enviroment: "outside",
        inside: false,
        maper: "0,0",
        pokecenter: "ACTIONS.PLAYER.TELEPORT(0,0,\"MapName\",undefined,function(){\n" + "ACTIONS.POKEMON.POKECENTER();\n" + "})",
        type: "Outside",
        battleback: {
            floor: "",
            back: "",
            music: ""
        },
        background: "",
        version: new Date().getTime()
    }
};
EVENT = function () {
    this.name = "Sin Nombre " + new Date().getTime();
    this.description = "";
    this.movement = "fixed";
    this.look = "DOWN";
    this.trigger = "click";
    this.trigger_step = 1;
    this.conditions = "1==1";
    this.actions = [];
    this.visible = "1==1";
    this.object = {
        url: "",
        animation: [],
        framerate: 3,
        width: 48,
        height: 48,
        sound: "",
        canBreak: "0",
        canMove: "0",
        canMount: "0"
    };
    this.isActor = "0";
    this.route = [];
    this.hero = {
        name: "",
        x: 0,
        y: 0,
        l: 1,
        body: null,
        shadow: null,
        speed: 300,
        walking: false
    };
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
        if (IKNOWTOSAVE) {
            await MAP_.UPLOAD(name, gender);
        }
        resolve(data.data || MAP);
    }),
    DELETE: (name) => new Promise(async (resolve, reject) => {
        var data = await API.POST("delete.php", {
            "folder": "maps",
            "name": name
        });
        resolve(data.data || MAP);
    }),
    UPLOAD: (name) => new Promise(async (resolve, reject) => {
        var dataTUM = {
            "folder": "maps_file/" + name,
            "name": name,
            bg: BG.toDataURL()
        };
        for (var a = 1; a <= 3; a++) {
            for (var i = 1; i <= 9; i++) {
                eval(`W_${i}A.children.forEach(d => {if(d.gotoAndStop) {d.gotoAndStop(${a})}});`);
                eval(`W_${i}A.update();`);
                var letter = String.fromCharCode(64 + a);
                eval(`dataTUM.W_${i}${letter} = W_${i}A.toDataURL();`);
            }
        }

        $.ajax({
            type: "POST",
            url: "uploadworld.php",
            data: dataTUM
        }).done(function (o) {
            resolve(true);
        });
        resolve(true);

    }),
    tilesetdb: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("tilesetdb.php", {});
        resolve(data.data || {});
    }),
    bgmdb: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("bgmdb.php", {});
        resolve(data.data || {});
    }),
    sounddb: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("sounddb.php", {});
        resolve(data.data || {});
    }),
    objects: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("objectdb.php", {});
        resolve(data.data || {});
    }),
    bgsdb: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("bgsdb.php", {});
        resolve(data.data || {});
    }),
    battlemusicdb: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("battlemusicdb.php", {});
        resolve(data.data || {});
    }),
    battlebackdb: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("battlebackdb.php", {});
        resolve(data.data || {});
    }),
    battlefloordb: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("battlefloordb.php", {});
        resolve(data.data || {});
    }),
};

_colors = ["red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "grey", "blue-grey", "black"];
_colorsReal = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#000000"];

$(document).on("keydown", function (e) {
    if (e.ctrlKey)
        PRESS.CTRL = true;
    if (e.shiftKey)
        PRESS.SHIFT = true;
});
$(document).on("keyup", function (e) {
    PRESS.CTRL = false;
    PRESS.SHIFT = false;
});

pokemon.controller('map', ['$scope', function ($scope) {
    //Draw tools
    createjs.Ticker.framerate = 3;
    $scope.codeProp = {
        smartIndent: true,
        lineWrapping: true,
        lineNumbers: true,
        mode: 'javascript',
        autoRefresh: true
    };
    $scope.E_movement = ["fixed", "random", "fallow"];
    $scope.E_trigger = ["click", "auto", "collision", "near", "neartranquilo", "entrenador", "entrenadortranquilo", "andante", "andantetranquilo"];
    $scope.E_emviroment = ["outside", "inside", "cave"];
    $scope.selectorImage = "../resources/selectors/red.png";
    $scope.selectorImageBlue = "../resources/selectors/bluep.png?v=1";
    $scope.baseWidth = 48;
    $scope.baseHeight = 48;
    $scope.midHeight = $scope.baseHeight / 2;
    $scope.midWidth = $scope.baseWidth / 2;
    $scope.battleWith = 1000;
    $scope.battleHeight = 740;
    $scope.overlay = "#000";
    $scope.selectors = [];
    $scope.selecteds = [];
    $scope.selectedsBMPS = [];
    $scope.selectorLimit = 8;
    $scope.squareClick = [];
    WORLD = new createjs.Stage("canvas_world");
    createjs.Ticker.addEventListener("tick", WORLD);
    createjs.Touch.enable(WORLD);
    $scope.clearAll = function () {
        $scope.form.data.map = {};
        for (var l = 0; l < $scope.layers.length; l++) {
            eval(`W_${$scope.layers[l]}A.removeAllChildren();`);
            eval(`W_${$scope.layers[l]}A.update();`);
        }
    };
    $scope.getTab = function () {
        if ($('#map_form').is(":visible"))
            return $scope.TILESET[$scope.form.data.type][$scope.selection.tab];
    };
    $scope.selectTab = function (key) {
        $scope.selection.tab = key;
        $scope.selectTiles();
        $scope.drawTools();
    };
    $scope.selectTool = function (key) {
        $scope.selection.tool = key;
    };
    $scope.selectLayer = function (key) {
        $scope.selection.layer = key;
    };
    $scope.hideLayers = [];
    $scope.hideLayer = function (key) {
        var index = $scope.hideLayers.indexOf(key);
        if (index !== -1) {
            $scope.hideLayers.splice(index, 1);
        } else {
            $scope.hideLayers.push(key);
        }

    };
    $scope.getSelectors = function () {
        var selectors = [];
        var tab = $scope.getTab();
        if (tab) {
            switch ($scope.selection.tab) {
                case "A1": {
                    for (var i = 1; i <= 10; i += 3) {
                        selectors.push({
                            x: 1,
                            y: i,
                            type: $scope.selection.tab,
                            mode: "A1",
                            url: tab.url,
                            triange: true
                        });
                    }
                    for (var i = 1; i <= 10; i += 3) {
                        selectors.push({
                            x: 9,
                            y: i,
                            type: $scope.selection.tab,
                            mode: "A1",
                            url: tab.url,
                            triange: true
                        });
                    }
                    for (var i = 7; i <= 10; i += 3) {
                        selectors.push({
                            x: 7,
                            y: i,
                            type: $scope.selection.tab,
                            mode: "A1_B",
                            url: tab.url,
                            triange: true
                        });
                    }
                    for (var i = 1; i <= 10; i += 3) {
                        selectors.push({
                            x: 15,
                            y: i,
                            type: $scope.selection.tab,
                            mode: "A1_B",
                            url: tab.url,
                            triange: true
                        });
                    }

                    for (var i = 1; i <= 4; i += 3) {
                        selectors.push({
                            x: 7,
                            y: i,
                            type: $scope.selection.tab,
                            mode: "A2",
                            url: tab.url
                        });
                    }
                    $scope.selectorLimit = 8;
                    break;
                }
                case "A2": {
                    for (var y = 1; y <= 10; y += 3) {
                        for (var x = 1; x <= 15; x += 2) {
                            selectors.push({
                                x: x,
                                y: y,
                                type: $scope.selection.tab,
                                mode: "A2",
                                url: tab.url
                            });
                        }
                    }
                    $scope.selectorLimit = 8;
                    break;
                }
                case "A3": {
                    for (var y = 1; y <= 7; y += 2) {
                        for (var x = 1; x <= 15; x += 2) {
                            selectors.push({
                                x: x,
                                y: y,
                                type: $scope.selection.tab,
                                mode: "A3",
                                url: tab.url
                            });
                        }
                    }
                    $scope.selectorLimit = 8;
                    break;
                }
                case "A4": {

                    for (var x = 1; x <= 15; x += 2) {
                        selectors.push({
                            x: x,
                            y: 1,
                            type: $scope.selection.tab,
                            mode: "A2",
                            url: tab.url
                        });
                    }
                    for (var x = 1; x <= 15; x += 2) {
                        selectors.push({
                            x: x,
                            y: 4,
                            type: $scope.selection.tab,
                            mode: "A3",
                            url: tab.url
                        });
                    }

                    for (var x = 1; x <= 15; x += 2) {
                        selectors.push({
                            x: x,
                            y: 6,
                            type: $scope.selection.tab,
                            mode: "A2",
                            url: tab.url
                        });
                    }
                    for (var x = 1; x <= 15; x += 2) {
                        selectors.push({
                            x: x,
                            y: 9,
                            type: $scope.selection.tab,
                            mode: "A3",
                            url: tab.url
                        });
                    }

                    for (var x = 1; x <= 15; x += 2) {
                        selectors.push({
                            x: x,
                            y: 11,
                            type: $scope.selection.tab,
                            mode: "A2",
                            url: tab.url
                        });
                    }
                    for (var x = 1; x <= 15; x += 2) {
                        selectors.push({
                            x: x,
                            y: 14,
                            type: $scope.selection.tab,
                            mode: "A3",
                            url: tab.url
                        });
                    }


                    $scope.selectorLimit = 8;
                    break;
                }
                case "A5": {
                    var bmp = new createjs.Bitmap(queueTILETS.getResult(tab.url));
                    var ylimit = bmp.image.height / $scope.baseHeight;
                    var xlimit = bmp.image.width / $scope.baseHeight;
                    for (var y = 1; y <= ylimit; y++) {
                        for (var x = 1; x <= xlimit; x++) {
                            selectors.push({
                                x: x,
                                y: y,
                                type: $scope.selection.tab,
                                mode: "N",
                                url: tab.url
                            });
                        }
                    }
                    $scope.selectorLimit = 8;
                    break;
                }
                default: {
                    var bmp = new createjs.Bitmap(queueTILETS.getResult(tab.url));
                    var ylimit = bmp.image.height / $scope.baseHeight;
                    var xlimit = bmp.image.width / $scope.baseHeight;
                    if (xlimit > 8) {

                        for (var y = 1; y <= ylimit; y++) {
                            for (var x = 1; x <= 8; x++) {
                                selectors.push({
                                    x: x,
                                    y: y,
                                    type: $scope.selection.tab,
                                    mode: "N",
                                    url: tab.url
                                });
                            }
                        }

                        for (var y = 1; y <= ylimit; y++) {
                            for (var x = 9; x <= 16; x++) {
                                selectors.push({
                                    x: x,
                                    y: y,
                                    type: $scope.selection.tab,
                                    mode: "N",
                                    url: tab.url
                                });
                            }
                        }
                    } else {
                        for (var y = 1; y <= ylimit; y++) {
                            for (var x = 1; x <= xlimit; x++) {
                                selectors.push({
                                    x: x,
                                    y: y,
                                    type: $scope.selection.tab,
                                    mode: "N",
                                    url: tab.url
                                });
                            }
                        }
                    }

                    $scope.selectorLimit = 8;
                    break;
                }
            }
            var ii = 1;
            for (var selector of selectors) {
                selector.xx = Math.ceil((ii - 0.01) % $scope.selectorLimit);
                selector.yy = Math.ceil((ii / $scope.selectorLimit) - 0.01);
                selector.id = `${tab.url}_${ii}`;
                ii++;
            }
        }
        return selectors;
    };
    $scope.selectTiles = function (piece, event) {
        if (!PRESS.CTRL) {
            $scope.selecteds = [];
            $(".oblock").css('border', 'none');
        }
        if (["A1", "A2", "A3", "A4"].indexOf($scope.selection.tab) !== -1) {
            $scope.selecteds = [];
            $(".oblock").css('border', 'none');
        }
        if (piece) {
            $(event).css('border', 'red 1px solid');
            $scope.selecteds.push(piece);
            $scope.selecteds[$scope.selecteds.length - 1].color = $scope.overlay
        }
    };
    $scope.putTile = function (l, x, y, value) {
        $scope.form.data.map[`${l}_${x}_${y}`] = OSO(value);
    };
    $scope.getTile = function (l, x, y) {
        return $scope.form.data.map[`${l}_${x}_${y}`];
    };
    $scope.getTiles = function () {
        return $scope.TILESET[$scope.form.data.type];
    };
    $scope.removeTile = function (l, x, y) {
        $scope.deleteOne(l, x, y, true, true);
        delete $scope.form.data.map[`${l}_${x}_${y}`];
    };
    $scope.currentEvent = new EVENT;
    $scope.currentEventX = 0;
    $scope.currentEventY = 0;
    $scope.clearEvent = function () {
        delete $scope.form.data.event[`${$scope.selection.layer}_${$scope.currentEventX}_${$scope.currentEventY}`];
        $scope.drawEvents();
    };
    $scope.saveEvent = function () {
        $('#event_form').modal('hide');
        $scope.drawEvents();
    };
    $scope.getObjectsBound = function () {
        if ($scope.currentEvent) {
            if ($scope.currentEvent.object.url) {
                var width = queueTILETS.getResult($scope.currentEvent.object.url).width;
                var height = queueTILETS.getResult($scope.currentEvent.object.url).height;
                return {w: width, h: height};
            }
        }
        return {w: 0, h: 0};
    };

    $scope.getObjects = function () {
        if ($scope.currentEvent) {
            if ($scope.currentEvent.object.url) {
                var width = queueTILETS.getResult($scope.currentEvent.object.url).width / $scope.currentEvent.object.width;
                var height = queueTILETS.getResult($scope.currentEvent.object.url).height / $scope.currentEvent.object.height;
                var cubes = [];
                var index = 0;
                for (var yy = 0; yy < height; yy++) {
                    for (var xx = 0; xx < width; xx++) {
                        cubes.push(index);
                        index++;
                    }
                }
                return cubes;
            }
        }
        return [0];
    };
    $scope.newEvent = function (x, y) {
        if (!$scope.form.data.event[`${$scope.selection.layer}_${x}_${y}`])
            $scope.form.data.event[`${$scope.selection.layer}_${x}_${y}`] = new EVENT;
        $scope.currentEvent = $scope.form.data.event[`${$scope.selection.layer}_${x}_${y}`];
        $scope.currentEventX = x;
        $scope.currentEventY = y;
        $('#event_form').modal('show');
        setTimeout(() => {

        }, 1000);
        setTimeout(function () {

            $('.form-control').each(function () {
                $(this).parents('.form-line').addClass('focused');
            });
        }, 2000);


        setTimeout(() => {
            $scope.$digest();
        }, 500);
    };
    $scope.eventForMove = undefined;
    IKNOWTOSAVE = false;
    $scope.drawTiles = function (event) {
        IKNOWTOSAVE = true;
        var x = Math.floor(event.stageX / $scope.baseWidth);
        var y = Math.floor(event.stageY / $scope.baseHeight);
        if ($scope.selection.tool === "select") {
            if (PRESS.SHIFT) {
                if (!$scope.eventForMove) {
                    if ($scope.form.data.event[`${$scope.selection.layer}_${x}_${y}`])
                        $scope.eventForMove = OSO($scope.form.data.event[`${$scope.selection.layer}_${x}_${y}`]);
                    return;
                } else {
                    $scope.form.data.event[`${$scope.selection.layer}_${x}_${y}`] = OSO($scope.eventForMove);
                    delete $scope.eventForMove;
                    $scope.drawEvents();
                }
                return;
            }
            if (PRESS.CTRL) {
                if (!$scope.eventForMove) {
                    if ($scope.form.data.event[`${$scope.selection.layer}_${x}_${y}`])
                        $scope.eventForMove = OSO($scope.form.data.event[`${$scope.selection.layer}_${x}_${y}`]);

                } else {
                    $scope.form.data.event[`${$scope.selection.layer}_${x}_${y}`] = OSO($scope.eventForMove);
                    delete $scope.eventForMove;
                    $scope.drawEvents();
                }
                return;
            }
            $scope.newEvent(x, y);
            return;
        } else {
            IKNOWTOSAVE = true;
        }

        if ($scope.hideLayers.indexOf($scope.selection.layer) === -1) {

            var e = $scope.getTile($scope.selection.layer, x, y);
            if (PRESS.SHIFT) {
                $scope.selecteds = [];
                if (e) {
                    $scope.selecteds.push($scope.form.data.map[`${$scope.selection.layer}_${x}_${y}`]);
                    return;
                }
            }
            if ($scope.selection.tool === "deletesquare") {
                if ($scope.selecteds.length === 1) {
                    $scope.squareClick.push({x: x, y: y});
                    if (e)
                        $scope.removeTile($scope.selection.layer, x, y);
                    if ($scope.squareClick.length > 1) {
                        var x1 = $scope.squareClick[0].x;
                        var x2 = $scope.squareClick[1].x;

                        var y1 = $scope.squareClick[0].y;
                        var y2 = $scope.squareClick[1].y;

                        var burbuja = 0;
                        if (x2 < x1) {
                            burbuja = x1;
                            x1 = x2;
                            x2 = burbuja;
                        }
                        if (y2 < y1) {
                            burbuja = y1;
                            y1 = y2;
                            y2 = burbuja;
                        }
                        for (var rX = x1; rX <= x2; rX++) {
                            for (var rY = y1; rY <= y2; rY++) {
                                if ($scope.getTile($scope.selection.layer, rX, rY))
                                    $scope.removeTile($scope.selection.layer, rX, rY);
                            }
                        }
                        $scope.squareClick = [];
                    }
                }
            } else if ($scope.selection.tool === "square") {
                if ($scope.selecteds.length === 1) {
                    $scope.squareClick.push({x: x, y: y});
                    var drawe = true;
                    if (e) {
                        if (e.id === $scope.selecteds[0].id) {
                            drawe = false;
                        }
                    }
                    if (drawe) {
                        $scope.putTile($scope.selection.layer, x, y, $scope.selecteds[0]);
                        $scope.addOne($scope.selection.layer, x, y, true);
                    }
                    if ($scope.squareClick.length > 1) {
                        var x1 = $scope.squareClick[0].x;
                        var x2 = $scope.squareClick[1].x;

                        var y1 = $scope.squareClick[0].y;
                        var y2 = $scope.squareClick[1].y;

                        var burbuja = 0;
                        if (x2 < x1) {
                            burbuja = x1;
                            x1 = x2;
                            x2 = burbuja;
                        }
                        if (y2 < y1) {
                            burbuja = y1;
                            y1 = y2;
                            y2 = burbuja;
                        }
                        for (var rX = x1; rX <= x2; rX++) {
                            for (var rY = y1; rY <= y2; rY++) {
                                var f = $scope.getTile($scope.selection.layer, rX, rY);
                                if (f) {
                                    if (f.id === $scope.selecteds[0].id)
                                        continue;
                                }
                                $scope.putTile($scope.selection.layer, rX, rY, $scope.selecteds[0]);
                                $scope.deleteOne($scope.selection.layer, rX, rY);
                                $scope.createOne($scope.selection.layer, rX, rY);
                            }
                        }
                        $scope.draw();
                        $scope.squareClick = [];
                    }
                }
            } else if ($scope.selection.tool === "draw") {
                $scope.squareClick = [];
                var base = undefined;

                for (var selector of $scope.selecteds) {
                    if (!base) {
                        base = {x: x, y: y, data: selector};

                        if (e) {
                            if (e.id === selector.id)
                                continue;
                        }
                        $scope.putTile($scope.selection.layer, x, y, selector);
                        $scope.addOne($scope.selection.layer, x, y, true);
                    } else {
                        var dx = selector.xx - base.data.xx;
                        var dy = selector.yy - base.data.yy;
                        var xx = x + (dx);
                        var yy = y + (dy);
                        if (xx >= 0 && yy >= 0) {
                            var f = $scope.getTile($scope.selection.layer, xx, yy);
                            if (f) {
                                if (f.id === selector.id)
                                    continue;
                            }
                            $scope.putTile($scope.selection.layer, xx, yy, selector);
                            $scope.addOne($scope.selection.layer, xx, yy, true);
                        }
                    }

                }
            } else if ($scope.selection.tool === "delete") {
                $scope.squareClick = [];
                if (e)
                    $scope.removeTile($scope.selection.layer, x, y);
            }
        }
    };


    //Canvas
    $scope.layers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    $scope.canvas = ["canvas_bg"];
    for (var can of $scope.canvas) {
        eval(`${can.split('_')[1].toUpperCase()} = new createjs.Stage("${can}");`);
    }
    for (var l = 0; l < $scope.layers.length; l++) {
        eval(`W_${$scope.layers[l]}A = new createjs.Stage("W_${$scope.layers[l]}A");`);
    }


    queueTILETS = new createjs.LoadQueue(false);
    $scope.init = async function (callback) {
        $scope.characters = await CHARACTER_.ALL();
        LAN = await LANGUAGE_.ALL();
        $scope.LAN = LANGUAGE;
        BGM = await MAP_.bgmdb();
        $scope.BGM = BGM;
        SOUNDSDB = await MAP_.sounddb();
        $scope.SOUNDSDB = SOUNDSDB;
        BGS = await MAP_.bgsdb();
        $scope.BGS = BGS;
        BATTLEMUSIC = await MAP_.battlemusicdb();
        $scope.BATTLEMUSIC = BATTLEMUSIC;
        BATTLEBACK = await MAP_.battlebackdb();
        $scope.BATTLEBACK = BATTLEBACK;
        BATTLEFLOOR = await MAP_.battlefloordb();
        $scope.BATTLEFLOOR = BATTLEFLOOR;
        TILESET = await MAP_.tilesetdb();
        $scope.TILESET = TILESET;
        OBJECTS = await MAP_.objects();
        $scope.OBJECTS = OBJECTS;
        for (var can of $scope.canvas) {
            eval(`${can.split('_')[1].toUpperCase()} = new createjs.Stage("${can}");`);

        }
        for (var l = 0; l < $scope.layers.length; l++) {
            eval(`W_${$scope.layers[l]}A = new createjs.Stage("W_${$scope.layers[l]}A");`);
            eval(`createjs.Ticker.addEventListener("tick", W_${$scope.layers[l]}A);`);

        }
        var loadJson = [];
        for (var i in $scope.TILESET) {
            var tiles = $scope.TILESET[i];
            for (var j in tiles) {
                var image = tiles[j];
                loadJson.push({id: image.url, src: image.url});
            }
        }
        for (var i of $scope.OBJECTS) {
            loadJson.push({id: i, src: i});
        }
        queueTILETS.loadManifest(loadJson);
        queueTILETS.on("complete", function (event) {

            callback();
        }, this);
        queueTILETS.load();
    };
    $scope.bounds = function () {
        if ($scope.form) {
            return {
                width: ($scope.form.data.width * $scope.baseWidth) || 0,
                height: ($scope.form.data.height * $scope.baseHeight) || 0
            };
        } else {
            return {
                width: 0,
                height: 0
            };
        }
    };
    $scope.showposition = false;
    $scope.boundsTable = function () {
        if ($scope.form) {
            var width = ($scope.form.data.width) || 0;
            var height = ($scope.form.data.height) || 0;
            var list = [];

            for (var y = 0; y < height; y++)
                for (var x = 0; x < width; x++) {
                    list.push(`${x}x${y}`);
                }
            return list;
        } else {
            return [`${0}x${0}`];
        }
    };
    $scope.drawBattle = function () {
        BG.removeAllChildren();
        var queue = new createjs.LoadQueue(false);
        var loadJson = [];
        if ($scope.form.data.battleback.floor)
            loadJson.push($scope.form.data.battleback.floor);
        if ($scope.form.data.battleback.back)
            loadJson.push($scope.form.data.battleback.back);
        if (loadJson.length > 0) {
            queue.loadManifest(loadJson);
            queue.on("complete", function (event) {
                if ($scope.form.data.battleback.floor) {
                    var floor = new createjs.Bitmap($scope.form.data.battleback.floor);
                    floor.x = 0;
                    floor.y = 0;
                    floor.cache(0, 0, $scope.battleWith, $scope.battleHeight);
                    if (typeof BG !== "undefined") {
                        BG.addChild(floor);
                    }
                }
                if ($scope.form.data.battleback.back) {
                    var back = new createjs.Bitmap($scope.form.data.battleback.back);
                    back.x = 0;
                    back.y = 0;
                    back.cache(0, 0, $scope.battleWith, $scope.battleHeight);
                    if (typeof BG !== "undefined") {
                        BG.addChild(back);
                    }
                }
                BG.update();
            }, this);
            queue.load();
        } else {
            BG.update();
        }
    };

    //5
    $scope.broCross = function (e, l, x, y, floor, filter) {
        var mx = (e.x - 1);
        var my = (e.y - 1);
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var bro1 = $scope.getTile(l, x + 1, y);
            var bro2 = $scope.getTile(l, x - 1, y);
            var bro3 = $scope.getTile(l, x, y - 1);
            var bro4 = $scope.getTile(l, x, y + 1);
            if (bro1 !== undefined && bro2 !== undefined && bro3 !== undefined && bro4 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id && bro3.id === e.id && bro4.id === e.id) {
                    //upleft
                    floor.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, (my) * $scope.baseHeight, $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x - 1, y - 1)) {
                        if ($scope.getTile(l, x - 1, y - 1).id === e.id) {
                            floor.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                        }
                    }

                    var upright = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    upright.x = (x * $scope.baseWidth) + $scope.midWidth;
                    upright.y = (y * $scope.baseHeight);
                    upright.filters = [filter];
                    upright.name = `${l}_${x}_${y}_1`;
                    upright.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x + 1, y - 1)) {
                        if ($scope.getTile(l, x + 1, y - 1).id === e.id)
                            upright.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.baseWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    }
                    upright.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(upright);`);

                    var downright = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    downright.x = (x * $scope.baseWidth) + $scope.midWidth;
                    downright.y = (y * $scope.baseHeight) + $scope.midHeight;
                    downright.filters = [filter];
                    downright.name = `${l}_${x}_${y}_2`;
                    downright.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x + 1, y + 1)) {
                        if ($scope.getTile(l, x + 1, y + 1).id === e.id)
                            downright.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.baseWidth, ((my + 1) * $scope.baseHeight) + $scope.baseHeight, $scope.midWidth, $scope.midHeight);
                    }
                    downright.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(downright);`);

                    var downleft = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    downleft.x = (x * $scope.baseWidth);
                    downleft.y = (y * $scope.baseHeight) + $scope.midHeight;
                    downleft.filters = [filter];
                    downleft.name = `${l}_${x}_${y}_3`;
                    downleft.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x - 1, y + 1)) {
                        if ($scope.getTile(l, x - 1, y + 1).id === e.id)
                            downleft.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.baseHeight, $scope.midWidth, $scope.midHeight);
                    }
                    downleft.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(downleft);`);
                    return true;
                }
            }
        }
        if (e.mode === "A1_B") {
            var bro = $scope.getTile(l, x + 1, y);
            var broL = $scope.getTile(l, x - 1, y);
            if (bro === undefined && broL === undefined) {
                floor.sourceRect = new createjs.Rectangle(mx * $scope.baseWidth, my * $scope.baseHeight, $scope.midWidth, $scope.baseHeight);
                var cascade = new createjs.Bitmap(queueTILETS.getResult(e.url));
                cascade.x = (x * $scope.baseWidth) + $scope.midWidth;
                cascade.y = (y * $scope.baseHeight);
                cascade.filters = [filter];
                cascade.name = `${l}_${x}_${y}_1`;
                cascade.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.baseHeight);
                cascade.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                eval(`W_${l}A.addChild(cascade);`);
                return true;
            }
        }
        if (["A3"].indexOf(e.mode) !== -1) {

            var bro1 = $scope.getTile(l, x + 1, y);
            var bro2 = $scope.getTile(l, x - 1, y);
            var bro3 = $scope.getTile(l, x, y - 1);
            var bro4 = $scope.getTile(l, x, y + 1);
            if (bro1 !== undefined && bro2 !== undefined && bro3 !== undefined && bro4 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id && bro3.id === e.id && bro4.id === e.id) {


                    floor.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.baseHeight);

                    var castle = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle.y = (y * $scope.baseHeight);
                    castle.filters = [filter];
                    castle.name = `${l}_${x}_${y}_1`;
                    castle.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.baseWidth);
                    castle.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle);`);
                    return true;
                }
            }
        }
        if (e.mode === "A3") {
            var bro = $scope.getTile(l, x + 1, y);
            var broL = $scope.getTile(l, x - 1, y);
            var broU = $scope.getTile(l, x, y - 1);
            var broD = $scope.getTile(l, x, y + 1);
            if (bro === undefined && broL === undefined && broU === undefined && broD === undefined) {
                floor.sourceRect = new createjs.Rectangle(mx * $scope.baseWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);

                var castle = new createjs.Bitmap(queueTILETS.getResult(e.url));
                castle.x = (x * $scope.baseWidth);
                castle.y = (y * $scope.baseHeight) + $scope.midHeight;
                castle.filters = [filter];
                castle.name = `${l}_${x}_${y}_1`;
                castle.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                castle.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                eval(`W_${l}A.addChild(castle);`);

                var castle2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                castle2.x = (x * $scope.baseWidth) + $scope.midWidth;
                castle2.y = (y * $scope.baseHeight) + $scope.midHeight;
                castle2.filters = [filter];
                castle2.name = `${l}_${x}_${y}_2`;
                castle2.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                castle2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                eval(`W_${l}A.addChild(castle2);`);

                var castle3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                castle3.x = (x * $scope.baseWidth) + $scope.midWidth;
                castle3.y = (y * $scope.baseHeight);
                castle3.name = `${l}_${x}_${y}_3`;
                castle3.filters = [filter];
                castle3.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                castle3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                eval(`W_${l}A.addChild(castle3);`);

                var bro4 = $scope.getTile(l + 1, x, y - 1);
                if (bro4) {
                    if (bro4.mode === "A3" || bro4.mode === "A2") {
                        var rect = new createjs.Shape();
                        rect.name = `${l}_${x}_${y}_4`;
                        rect.graphics.beginFill($scope.shadowq).drawRect(floor.x + $scope.baseWidth, floor.y, $scope.midWidth, $scope.baseHeight);
                        eval(`W_${1}A.addChild(rect);`);
                    }
                }

                return true;
            }
        }
        return $scope.broUpDownLeft(e, l, x, y, floor, filter);
    };
    $scope.broUpDownLeft = function (e, l, x, y, floor, filter) {
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x, y - 1);
            var bro2 = $scope.getTile(l, x, y + 1);
            var bro3 = $scope.getTile(l, x - 1, y);
            if (bro1 !== undefined && bro2 !== undefined && bro3 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id && bro3.id === e.id) {

                    floor.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x - 1, y - 1)) {
                        if ($scope.getTile(l, x - 1, y - 1).id === e.id)
                            floor.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    }
                    var broSub2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub2.x = (x * $scope.baseWidth);
                    broSub2.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub2.filters = [filter];
                    broSub2.name = `${l}_${x}_${y}_1`;
                    broSub2.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x - 1, y + 1)) {
                        if ($scope.getTile(l, x - 1, y + 1).id === e.id)
                            broSub2.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.baseHeight, $scope.midWidth, $scope.midHeight);
                    }
                    broSub2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub2);`);

                    var broSub3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub3.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub3.y = (y * $scope.baseHeight);
                    broSub3.name = `${l}_${x}_${y}_2`;
                    broSub3.filters = [filter];
                    broSub3.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my + 2) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    broSub3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub3);`);

                    var broSub4 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub4.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub4.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub4.name = `${l}_${x}_${y}_3`;
                    broSub4.filters = [filter];
                    broSub4.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    broSub4.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub4);`);
                    return true;
                }
            }
        }
        if (["A3"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x, y - 1);
            var bro2 = $scope.getTile(l, x, y + 1);
            var bro3 = $scope.getTile(l, x - 1, y);
            if (bro1 !== undefined && bro2 !== undefined && bro3 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id && bro3.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my) * $scope.baseHeight) + $scope.midHeight, $scope.baseWidth, $scope.baseHeight);

                    var rect = new createjs.Shape();
                    rect.name = `${l}_${x}_${y}_4`;
                    rect.graphics.beginFill($scope.shadowq).drawRect(floor.x + $scope.baseWidth, floor.y, $scope.midWidth, $scope.baseHeight);
                    eval(`W_${1}A.addChild(rect);`);

                    return true;
                }

            } else {
                var bro4 = $scope.getTile(l + 1, x, y - 1);
                if (bro4) {
                    if (bro4.mode === "A3" || bro4.mode === "A2") {
                        var rect = new createjs.Shape();
                        rect.name = `${l}_${x}_${y}_4`;
                        rect.graphics.beginFill($scope.shadowq).drawRect(floor.x + $scope.baseWidth, floor.y, $scope.midWidth, $scope.baseHeight);
                        eval(`W_${1}A.addChild(rect);`);
                    }
                }
            }
        }

        return $scope.broUpDownRight(e, l, x, y, floor, filter);
    };
    $scope.broUpDownRight = function (e, l, x, y, floor, filter) {
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x, y - 1);
            var bro2 = $scope.getTile(l, x, y + 1);
            var bro3 = $scope.getTile(l, x + 1, y);
            if (bro1 !== undefined && bro2 !== undefined && bro3 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id && bro3.id === e.id) {
                    floor.x += $scope.midWidth;

                    floor.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midHeight, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x + 1, y - 1)) {
                        if ($scope.getTile(l, x + 1, y - 1).id === e.id)
                            floor.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.baseWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    }

                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub.filters = [filter];
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x + 1, y + 1)) {
                        if ($scope.getTile(l, x + 1, y + 1).id === e.id)
                            broSub.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.baseWidth, ((my + 1) * $scope.baseHeight) + $scope.baseHeight, $scope.midWidth, $scope.midHeight);
                    }
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);

                    var broSub2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub2.x = (x * $scope.baseWidth);
                    broSub2.name = `${l}_${x}_${y}_2`;
                    broSub2.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub2.filters = [filter];
                    broSub2.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    broSub2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub2);`);

                    var broSub3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub3.x = (x * $scope.baseWidth);
                    broSub3.y = (y * $scope.baseHeight);
                    broSub3.name = `${l}_${x}_${y}_3`;
                    broSub3.filters = [filter];
                    broSub3.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 2) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    broSub3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub3);`);


                    ////
                    return true;
                }
            }
        }
        if (["A3"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x, y - 1);
            var bro2 = $scope.getTile(l, x, y + 1);
            var bro3 = $scope.getTile(l, x + 1, y);
            if (bro1 !== undefined && bro2 !== undefined && bro3 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id && bro3.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my) * $scope.baseHeight) + $scope.midHeight, $scope.baseWidth, $scope.baseHeight);
                    return true;
                }
            }
        }
        return $scope.broRightLeftDown(e, l, x, y, floor, filter);
    };
    $scope.broRightLeftDown = function (e, l, x, y, floor, filter) {
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x + 1, y);
            var bro2 = $scope.getTile(l, x - 1, y);
            var bro3 = $scope.getTile(l, x, y + 1);
            if (bro1 !== undefined && bro2 !== undefined && bro3 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id && bro3.id === e.id) {


                    floor.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, (my + 1) * $scope.baseHeight, $scope.midWidth, $scope.midHeight);

                    var broSub2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub2.x = (x * $scope.baseWidth);
                    broSub2.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub2.filters = [filter];
                    broSub2.name = `${l}_${x}_${y}_1`;
                    broSub2.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x - 1, y + 1)) {
                        if ($scope.getTile(l, x - 1, y + 1).id === e.id)
                            broSub2.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.baseHeight, $scope.midWidth, $scope.midHeight);
                    }
                    broSub2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub2);`);

                    var broSub2_ = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub2_.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub2_.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub2_.name = `${l}_${x}_${y}_2`;
                    broSub2_.filters = [filter]
                    broSub2_.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x + 1, y + 1)) {
                        if ($scope.getTile(l, x + 1, y + 1).id === e.id)
                            broSub2_.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.baseWidth, ((my + 1) * $scope.baseHeight) + $scope.baseHeight, $scope.midWidth, $scope.midHeight);
                    }
                    broSub2_.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub2_);`);


                    var broSub3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub3.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub3.y = (y * $scope.baseHeight);
                    broSub3.name = `${l}_${x}_${y}_3`;
                    broSub3.filters = [filter];
                    broSub3.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    broSub3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub3);`);


                    ////
                    return true;
                }
            }
        }
        if (["A3"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x + 1, y);
            var bro2 = $scope.getTile(l, x - 1, y);
            var bro3 = $scope.getTile(l, x, y + 1);
            if (bro1 !== undefined && bro2 !== undefined && bro3 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id && bro3.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.baseHeight);

                    var castle = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle.y = (y * $scope.baseHeight);
                    castle.name = `${l}_${x}_${y}_1`;
                    castle.filters = [filter];
                    castle.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.baseWidth);
                    castle.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle);`);
                    return true;
                }
            }
        }
        return $scope.broRightLeftUp(e, l, x, y, floor, filter);
    };
    $scope.broRightLeftUp = function (e, l, x, y, floor, filter) {
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x + 1, y);
            var bro2 = $scope.getTile(l, x - 1, y);
            var bro3 = $scope.getTile(l, x, y - 1);
            if (bro1 !== undefined && bro2 !== undefined && bro3 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id && bro3.id === e.id) {

                    floor.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, (my) * $scope.baseHeight, $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x - 1, y - 1)) {
                        if ($scope.getTile(l, x - 1, y - 1).id === e.id)
                            floor.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    }
                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = (x * $scope.baseWidth);
                    broSub.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub.filters = [filter];
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my + 2) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);

                    var broSub2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub2.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub2.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub2.name = `${l}_${x}_${y}_2`;
                    broSub2.filters = [filter];
                    broSub2.sourceRect = new createjs.Rectangle((mx * $scope.baseWidth) + $scope.midWidth, ((my + 2) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    broSub2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub2);`);

                    var broSub3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub3.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub3.y = (y * $scope.baseHeight);
                    broSub3.name = `${l}_${x}_${y}_3`;
                    broSub3.filters = [filter];
                    broSub3.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x + 1, y - 1)) {
                        if ($scope.getTile(l, x + 1, y - 1).id === e.id)
                            broSub3.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.baseWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    }
                    broSub3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub3);`);

                    ////
                    return true;
                }
            }
        }

        if (["A3"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x + 1, y);
            var bro2 = $scope.getTile(l, x - 1, y);
            var bro3 = $scope.getTile(l, x, y - 1);
            if (bro1 !== undefined && bro2 !== undefined && bro3 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id && bro3.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, ((my) * $scope.baseHeight) + $scope.baseHeight, $scope.midWidth, $scope.baseHeight);

                    var castle = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle.y = (y * $scope.baseHeight);
                    castle.name = `${l}_${x}_${y}_1`;
                    castle.filters = [filter];
                    castle.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight) + $scope.baseHeight, $scope.midWidth, $scope.baseWidth);
                    castle.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle);`);

                    ////
                    return true;
                }
            }
        }

        return $scope.broRightLeft(e, l, x, y, floor, filter);
    };
    $scope.shadowq = createjs.Graphics.getRGB(0, 0, 0, 0.7);

    //3
    $scope.broRightLeft = function (e, l, x, y, floor, filter) {
        var mx = (e.x - 1);
        var my = (e.y - 1);
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var bro = $scope.getTile(l, x + 1, y);
            var broL = $scope.getTile(l, x - 1, y);
            if (bro !== undefined && broL !== undefined) {
                if (bro.id === e.id && broL.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, (my + 1) * $scope.baseHeight, $scope.midWidth, $scope.midHeight);

                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = (x * $scope.baseWidth);
                    broSub.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub.filters = [filter];
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my + 2) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);


                    var broSub2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub2.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub2.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub2.name = `${l}_${x}_${y}_2`;
                    broSub2.filters = [filter];
                    broSub2.sourceRect = new createjs.Rectangle((mx * $scope.baseWidth) + $scope.midWidth, ((my + 2) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    broSub2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub2);`);


                    var broSub3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub3.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub3.y = (y * $scope.baseHeight);
                    broSub3.name = `${l}_${x}_${y}_3`;
                    broSub3.filters = [filter];
                    broSub3.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    broSub3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub3);`);
                    return true;
                }
            }
        }
        if (e.mode === "A1_B") {
            var bro = $scope.getTile(l, x + 1, y);
            var broL = $scope.getTile(l, x - 1, y);
            if (bro !== undefined && broL !== undefined) {
                if (bro.id === e.id && broL.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), my * $scope.baseHeight, $scope.midWidth, $scope.baseHeight);

                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub.y = (y * $scope.baseHeight);
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.filters = [filter];
                    broSub.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.baseHeight);
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);
                    return true;
                }
            }
        }

        if (e.mode === "A3") {
            var bro = $scope.getTile(l, x, y + 1);
            var broL = $scope.getTile(l, x, y - 1);
            if (bro !== undefined && broL !== undefined) {
                if (bro.id === e.id && broL.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(mx * $scope.baseWidth, ((my + 1) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);

                    var castle = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle.x = (x * $scope.baseWidth);
                    castle.y = (y * $scope.baseHeight) + $scope.midHeight;
                    castle.filters = [filter];
                    castle.name = `${l}_${x}_${y}_1`;
                    castle.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    castle.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle);`);

                    var castle2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle2.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle2.y = (y * $scope.baseHeight) + $scope.midHeight;
                    castle2.filters = [filter];
                    castle2.name = `${l}_${x}_${y}_2`;
                    castle2.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    castle2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle2);`);

                    var castle3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle3.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle3.y = (y * $scope.baseHeight);
                    castle3.name = `${l}_${x}_${y}_3`;
                    castle3.filters = [filter];
                    castle3.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    castle3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle3);`);

                    var rect = new createjs.Shape();
                    rect.name = `${l}_${x}_${y}_4`;
                    rect.graphics.beginFill($scope.shadowq).drawRect(floor.x + $scope.baseWidth, floor.y, $scope.midWidth, $scope.baseHeight);

                    eval(`W_${1}A.addChild(rect);`);
                    return true;
                }
            }
        }


        return $scope.broUpDown(e, l, x, y, floor, filter);
    };
    $scope.broUpDown = function (e, l, x, y, floor, filter) {
        var mx = (e.x - 1);
        var my = (e.y - 1);
        if (["A1", "A2"].indexOf(e.mode) !== -1) {

            var bro = $scope.getTile(l, x, y + 1);
            var broL = $scope.getTile(l, x, y - 1);
            if (bro !== undefined && broL !== undefined) {
                if (bro.id === e.id && broL.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle((mx) * $scope.baseWidth, (my + 2) * $scope.baseHeight, $scope.midWidth, $scope.midHeight);

                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub.y = (y * $scope.baseHeight);
                    broSub.filters = [filter];
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my + 2) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);


                    var broSub2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub2.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub2.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub2.name = `${l}_${x}_${y}_2`;
                    broSub2.filters = [filter];
                    broSub2.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    broSub2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub2);`);


                    var broSub3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub3.x = (x * $scope.baseWidth);
                    broSub3.name = `${l}_${x}_${y}_3`;
                    broSub3.y = (y * $scope.baseHeight) + $scope.midWidth;
                    broSub3.filters = [filter];
                    broSub3.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    broSub3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub3);`);
                    return true;
                }
            }
        }

        if (e.mode === "A3") {
            var bro = $scope.getTile(l, x + 1, y);
            var broL = $scope.getTile(l, x - 1, y);
            if (bro !== undefined && broL !== undefined) {
                if (bro.id === e.id && broL.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);

                    var castle = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle.x = (x * $scope.baseWidth);
                    castle.y = (y * $scope.baseHeight) + $scope.midHeight;
                    castle.name = `${l}_${x}_${y}_1`;
                    castle.filters = [filter];
                    castle.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    castle.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle);`);

                    var castle2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle2.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle2.y = (y * $scope.baseHeight) + $scope.midHeight;
                    castle2.name = `${l}_${x}_${y}_2`;
                    castle2.filters = [filter];
                    castle2.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    castle2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle2);`);

                    var castle3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle3.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle3.y = (y * $scope.baseHeight);
                    castle3.name = `${l}_${x}_${y}_3`;
                    castle3.filters = [filter];
                    castle3.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    castle3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle3);`);


                    return true;
                }
            }
        }
        return $scope.broUpLeft(e, l, x, y, floor, filter);
    };
    $scope.broUpLeft = function (e, l, x, y, floor, filter) {
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x - 1, y);
            var bro2 = $scope.getTile(l, x, y - 1);
            if (bro1 !== undefined && bro2 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id) {

                    floor.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x - 1, y - 1)) {
                        if ($scope.getTile(l, x - 1, y - 1).id === e.id)
                            floor.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 1) * $scope.baseHeight), 0, 0);
                    }
                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = (x * $scope.baseWidth);
                    broSub.y = (y * $scope.baseHeight);
                    broSub.filters = [filter];
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, (my + 2) * $scope.baseHeight, $scope.baseWidth, $scope.baseHeight);
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);
                    return true;
                }
            }
        }
        if (["A3"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x - 1, y);
            var bro2 = $scope.getTile(l, x, y - 1);
            if (bro1 !== undefined && bro2 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my + 1) * $scope.baseHeight), $scope.baseWidth, $scope.baseHeight);

                    var rect = new createjs.Shape();
                    rect.name = `${l}_${x}_${y}_1`;
                    rect.graphics.beginFill($scope.shadowq).drawRect(floor.x + $scope.baseWidth, floor.y, $scope.midWidth, $scope.baseHeight);

                    eval(`W_${1}A.addChild(rect);`);
                    return true;
                }
            }
        }
        return $scope.broUpRight(e, l, x, y, floor, filter);
    };
    $scope.broUpRight = function (e, l, x, y, floor, filter) {
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x + 1, y);
            var bro2 = $scope.getTile(l, x, y - 1);
            if (bro1 !== undefined && bro2 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id) {

                    floor.x += $scope.midWidth;
                    floor.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x + 1, y - 1)) {
                        if ($scope.getTile(l, x + 1, y - 1).id === e.id) {
                            floor.x -= $scope.midWidth;
                            floor.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 1) * $scope.baseHeight), 0, 0);
                        }
                    }
                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = (x * $scope.baseWidth);
                    broSub.y = (y * $scope.baseHeight);
                    broSub.filters = [filter];
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.sourceRect = new createjs.Rectangle((mx) * $scope.baseWidth, (my + 2) * $scope.baseHeight, $scope.baseWidth, $scope.baseHeight);
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);
                    return true;
                }
            }
        }
        if (["A3"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x + 1, y);
            var bro2 = $scope.getTile(l, x, y - 1);
            if (bro1 !== undefined && bro2 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 1) * $scope.baseHeight), $scope.baseWidth, $scope.baseHeight);
                    return true;
                }
            }
        }
        return $scope.broDownLeft(e, l, x, y, floor, filter);
    };
    $scope.broDownLeft = function (e, l, x, y, floor, filter) {
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x - 1, y);
            var bro2 = $scope.getTile(l, x, y + 1);
            if (bro1 !== undefined && bro2 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id) {

                    floor.y += $scope.midHeight;
                    floor.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x - 1, y + 1)) {
                        if ($scope.getTile(l, x - 1, y + 1).id === e.id) {
                            floor.y -= $scope.midHeight;
                            floor.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 1) * $scope.baseHeight), 0, 0);
                        }
                    }
                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = (x * $scope.baseWidth);
                    broSub.y = (y * $scope.baseHeight);
                    broSub.filters = [filter];
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, (my + 1) * $scope.baseHeight, $scope.baseWidth, $scope.baseHeight);
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);
                    return true;
                }
            }
        }
        if (["A3"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x - 1, y);
            var bro2 = $scope.getTile(l, x, y + 1);
            if (bro1 !== undefined && bro2 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my) * $scope.baseHeight), $scope.baseWidth, $scope.baseHeight);


                    return true;
                }
            }
        }
        return $scope.broDownRight(e, l, x, y, floor, filter);
    };
    $scope.broDownRight = function (e, l, x, y, floor, filter) {
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x + 1, y);
            var bro2 = $scope.getTile(l, x, y + 1);
            if (bro1 !== undefined && bro2 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id) {
                    floor.x += $scope.midWidth;
                    floor.y += $scope.midHeight;
                    floor.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    if ($scope.getTile(l, x + 1, y + 1)) {
                        if ($scope.getTile(l, x + 1, y + 1).id === e.id) {
                            floor.x -= $scope.midWidth;
                            floor.y -= $scope.midHeight;
                            floor.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 1) * $scope.baseHeight), 0, 0);
                        }
                    }
                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = (x * $scope.baseWidth);
                    broSub.y = (y * $scope.baseHeight);
                    broSub.filters = [filter];
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.sourceRect = new createjs.Rectangle((mx) * $scope.baseWidth, (my + 1) * $scope.baseHeight, $scope.baseWidth, $scope.baseHeight);
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);
                    return true;
                }
            }
        }
        if (["A3", "A2"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var bro1 = $scope.getTile(l, x + 1, y);
            var bro2 = $scope.getTile(l, x, y + 1);
            if (bro1 !== undefined && bro2 !== undefined) {
                if (bro1.id === e.id && bro2.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my) * $scope.baseHeight), $scope.baseWidth, $scope.baseHeight);
                    return true;
                }
            }
        }
        return $scope.broRight(e, l, x, y, floor, filter);
    };

    //2
    $scope.broRight = function (e, l, x, y, floor, filter) {
        var mx = (e.x - 1);
        var my = (e.y - 1);
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var bro = $scope.getTile(l, x + 1, y);
            if (bro !== undefined) {
                if (bro.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(mx * $scope.baseWidth, (my + 1) * $scope.baseHeight, $scope.baseWidth, $scope.midHeight);
                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = x * $scope.baseWidth;
                    broSub.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub.filters = [filter];
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.sourceRect = new createjs.Rectangle(mx * $scope.baseWidth, ((my + 2) * $scope.baseHeight) + $scope.midHeight, $scope.baseWidth, $scope.midHeight);
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);
                    return true;
                }
            }
        }
        if (e.mode === "A1_B") {
            var bro = $scope.getTile(l, x + 1, y);
            if (bro !== undefined) {
                if (bro.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(mx * $scope.baseWidth, my * $scope.baseHeight, $scope.baseWidth, $scope.baseHeight);
                    return true;
                }
            }
        }
        if (e.mode === "A3") {
            var bro = $scope.getTile(l, x, y - 1);
            if (bro !== undefined) {
                if (bro.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(mx * $scope.baseWidth, ((my + 1) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);

                    var castle = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle.x = (x * $scope.baseWidth);
                    castle.y = (y * $scope.baseHeight) + $scope.midHeight;
                    castle.filters = [filter];
                    castle.name = `${l}_${x}_${y}_1`;
                    castle.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    castle.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle);`);

                    var castle2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle2.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle2.name = `${l}_${x}_${y}_2`;
                    castle2.y = (y * $scope.baseHeight) + $scope.midHeight;
                    castle2.filters = [filter];
                    castle2.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    castle2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle2);`);

                    var castle3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle3.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle3.y = (y * $scope.baseHeight);
                    castle3.name = `${l}_${x}_${y}_3`;
                    castle3.filters = [filter];
                    castle3.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    castle3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle3);`);


                    var rect = new createjs.Shape();
                    rect.name = `${l}_${x}_${y}_4`;
                    rect.graphics.beginFill($scope.shadowq).drawRect(floor.x + $scope.baseWidth, floor.y, $scope.midWidth, $scope.baseHeight);

                    eval(`W_${1}A.addChild(rect);`);

                    return true;
                }
            }
        }

        return $scope.broLeft(e, l, x, y, floor, filter);
    };
    $scope.broLeft = function (e, l, x, y, floor, filter) {
        var mx = (e.x - 1);
        var my = (e.y - 1);
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var bro = $scope.getTile(l, x - 1, y);
            if (bro !== undefined) {
                if (bro.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, (my + 1) * $scope.baseHeight, $scope.baseWidth, $scope.midHeight);
                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = x * $scope.baseWidth;
                    broSub.y = (y * $scope.baseHeight) + $scope.midHeight;
                    broSub.filters = [filter];
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, ((my + 2) * $scope.baseHeight) + $scope.midHeight, $scope.baseWidth, $scope.midHeight);
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);
                    return true;
                }
            }
        }
        if (e.mode === "A1_B") {
            var bro = $scope.getTile(l, x - 1, y);
            if (bro !== undefined) {
                if (bro.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, my * $scope.baseHeight, $scope.baseWidth, $scope.baseHeight);
                    return true;
                }
            }
        }
        if (e.mode === "A3") {
            var bro = $scope.getTile(l, x, y + 1);
            if (bro !== undefined) {
                if (bro.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(mx * $scope.baseWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);

                    var castle = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle.x = (x * $scope.baseWidth);
                    castle.y = (y * $scope.baseHeight) + $scope.midHeight;
                    castle.filters = [filter];
                    castle.name = `${l}_${x}_${y}_1`;
                    castle.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    castle.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle);`);

                    var castle2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle2.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle2.y = (y * $scope.baseHeight) + $scope.midHeight;
                    castle2.name = `${l}_${x}_${y}_2`;
                    castle2.filters = [filter];
                    castle2.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    castle2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle2);`);

                    var castle3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle3.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle3.y = (y * $scope.baseHeight);
                    castle3.name = `${l}_${x}_${y}_3`;
                    castle3.filters = [filter];
                    castle3.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    castle3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle3);`);


                    return true;
                }
            }
        }

        return $scope.broUp(e, l, x, y, floor, filter);
    };
    $scope.broUp = function (e, l, x, y, floor, filter) {
        var mx = (e.x - 1);
        var my = (e.y - 1);
        if (["A1", "A2"].indexOf(e.mode) !== -1) {

            var bro = $scope.getTile(l, x, y - 1);
            if (bro !== undefined) {
                if (bro.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(mx * $scope.baseWidth, (my + 2) * $scope.baseHeight, $scope.midWidth, $scope.baseHeight);

                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub.y = (y * $scope.baseHeight);
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.filters = [filter];
                    broSub.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my + 2) * $scope.baseHeight), $scope.midWidth, $scope.baseHeight);
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);
                    return true;
                }
            }
        }
        if (e.mode === "A3") {
            var bro = $scope.getTile(l, x + 1, y);
            if (bro !== undefined) {
                if (bro.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle(mx * $scope.baseWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);

                    var castle = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle.x = (x * $scope.baseWidth);
                    castle.y = (y * $scope.baseHeight) + $scope.midHeight;
                    castle.name = `${l}_${x}_${y}_1`;
                    castle.filters = [filter];
                    castle.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    castle.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle);`);

                    var castle2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle2.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle2.y = (y * $scope.baseHeight) + $scope.midHeight;
                    castle2.name = `${l}_${x}_${y}_2`;
                    castle2.filters = [filter];
                    castle2.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    castle2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle2);`);

                    var castle3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle3.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle3.y = (y * $scope.baseHeight);
                    castle3.name = `${l}_${x}_${y}_3`;
                    castle3.filters = [filter];
                    castle3.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    castle3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle3);`);
                    return true;
                }
            }
        }

        return $scope.broDown(e, l, x, y, floor, filter);
    };
    $scope.broDown = function (e, l, x, y, floor, filter) {
        var mx = (e.x - 1);
        var my = (e.y - 1);
        if (["A1", "A2"].indexOf(e.mode) !== -1) {

            var bro = $scope.getTile(l, x, y + 1);
            if (bro !== undefined) {
                if (bro.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle((mx) * $scope.baseWidth, (my + 1) * $scope.baseHeight, $scope.midWidth, $scope.baseHeight);

                    var broSub = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    broSub.x = (x * $scope.baseWidth) + $scope.midWidth;
                    broSub.y = (y * $scope.baseHeight);
                    broSub.filters = [filter];
                    broSub.name = `${l}_${x}_${y}_1`;
                    broSub.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight), $scope.midWidth, $scope.baseHeight);
                    broSub.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(broSub);`);
                    return true;
                }
            }
        }
        if (e.mode === "A3") {
            var bro = $scope.getTile(l, x - 1, y);
            if (bro !== undefined) {
                if (bro.id === e.id) {
                    floor.sourceRect = new createjs.Rectangle((mx + 1) * $scope.baseWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);

                    var castle = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle.x = (x * $scope.baseWidth);
                    castle.y = (y * $scope.baseHeight) + $scope.midHeight;
                    castle.name = `${l}_${x}_${y}_1`;
                    castle.filters = [filter];
                    castle.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    castle.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle);`);

                    var castle2 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle2.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle2.y = (y * $scope.baseHeight) + $scope.midHeight;
                    castle2.name = `${l}_${x}_${y}_2`;
                    castle2.filters = [filter];
                    castle2.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my + 1) * $scope.baseHeight) + $scope.midHeight, $scope.midWidth, $scope.midHeight);
                    castle2.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle2);`);

                    var castle3 = new createjs.Bitmap(queueTILETS.getResult(e.url));
                    castle3.x = (x * $scope.baseWidth) + $scope.midWidth;
                    castle3.name = `${l}_${x}_${y}_3`;
                    castle3.y = (y * $scope.baseHeight);
                    castle3.filters = [filter];
                    castle3.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth) + $scope.midWidth, ((my) * $scope.baseHeight), $scope.midWidth, $scope.midHeight);
                    castle3.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                    eval(`W_${l}A.addChild(castle3);`);
                    return true;
                }
            }
        }

        return false;
    };
    $scope.broCube = function (e, l, x, y, floor, filter) {
        if (["A1", "A2"].indexOf(e.mode) !== -1) {
            var mx = (e.x - 1);
            var my = (e.y - 1);
            var upleft = $scope.getTile(l, x - 1, y - 1);
            var upright = $scope.getTile(l, x + 1, y - 1);
            var downleft = $scope.getTile(l, x - 1, y + 1);
            var downright = $scope.getTile(l, x + 1, y + 1);
            if (upleft || upright || downleft || downright) {
                if (upleft) {
                    var bro1 = $scope.getTile(l, x - 1, y);
                    var bro2 = $scope.getTile(l, x, y - 1);
                    if (bro1 && bro2) {
                        if (bro1.id === e.id && bro2.id === e.id) {
                            var cube = new createjs.Bitmap(queueTILETS.getResult(e.url));
                            cube.x = (x * $scope.baseWidth);
                            cube.y = (y * $scope.baseHeight);
                            cube.filters = [filter];
                            cube.name = `${l}_${x}_${y}_1`;
                            cube.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my + 2) * $scope.baseHeight), $scope.baseWidth, $scope.baseHeight);
                            cube.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                            eval(`W_${l}A.addChild(cube);`);
                            return true;
                        }
                    }
                } else if (upright) {
                    var bro1 = $scope.getTile(l, x + 1, y);
                    var bro2 = $scope.getTile(l, x, y - 1);
                    if (bro1 && bro2) {
                        if (bro1.id === e.id && bro2.id === e.id) {
                            var cube = new createjs.Bitmap(queueTILETS.getResult(e.url));
                            cube.x = (x * $scope.baseWidth);
                            cube.y = (y * $scope.baseHeight);
                            cube.filters = [filter];
                            cube.name = `${l}_${x}_${y}_1`;
                            cube.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 2) * $scope.baseHeight), $scope.baseWidth, $scope.baseHeight);
                            cube.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                            eval(`W_${l}A.addChild(cube);`);
                            return true;
                        }
                    }
                } else if (downright) {
                    var bro1 = $scope.getTile(l, x + 1, y);
                    var bro2 = $scope.getTile(l, x, y + 1);
                    if (bro1 && bro2) {
                        if (bro1.id === e.id && bro2.id === e.id) {
                            var cube = new createjs.Bitmap(queueTILETS.getResult(e.url));
                            cube.x = (x * $scope.baseWidth);
                            cube.y = (y * $scope.baseHeight);
                            cube.filters = [filter];
                            cube.name = `${l}_${x}_${y}_1`;
                            cube.sourceRect = new createjs.Rectangle(((mx) * $scope.baseWidth), ((my + 1) * $scope.baseHeight), $scope.baseWidth, $scope.baseHeight);
                            cube.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                            eval(`W_${l}A.addChild(cube);`);
                            return true;
                        }
                    }
                } else if (downleft) {
                    var bro1 = $scope.getTile(l, x - 1, y);
                    var bro2 = $scope.getTile(l, x, y + 1);
                    if (bro1 && bro2) {
                        if (bro1.id === e.id && bro2.id === e.id) {
                            var cube = new createjs.Bitmap(queueTILETS.getResult(e.url));
                            cube.x = (x * $scope.baseWidth);
                            cube.y = (y * $scope.baseHeight);
                            cube.filters = [filter];
                            cube.name = `${l}_${x}_${y}_1`;
                            cube.sourceRect = new createjs.Rectangle(((mx + 1) * $scope.baseWidth), ((my + 1) * $scope.baseHeight), $scope.baseWidth, $scope.baseHeight);
                            cube.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                            eval(`W_${l}A.addChild(cube);`);
                            return true;
                        }
                    }
                }

            }
        }
        return false;
    };

    $scope.deleteOne = function (l, x, y, update, react) {
        if (react) {
            var e = $scope.getTile(l, x, y);
            delete $scope.form.data.map[`${l}_${x}_${y}`];
            if (["A1", "A2", "A1_B", "A3"].indexOf(e.mode) !== -1) {
                for (var xx = (x - 1); xx <= (x + 1); xx++) {
                    for (var yy = (y - 1); yy <= (y + 1); yy++) {
                        if (xx !== x || yy !== y) {
                            $scope.deleteOne(l, xx, yy);
                            $scope.createOneBase(l, xx, yy);
                        }
                    }
                }
            }
            if (["A3"].indexOf(e.mode) !== -1) {
                for (var xx = (x - 1); xx <= (x + 1); xx++) {
                    for (var yy = (y - 1); yy <= (y + 1); yy++) {
                        if (xx !== x || yy !== y) {
                            if (l - 1 > 0) {
                                $scope.deleteOne(l - 1, xx, yy);
                                $scope.createOneBase(l - 1, xx, yy);
                            }
                        }
                    }
                }
            }
        }
        var base = eval(`W_${l}A.getChildByName("${l}_${x}_${y}")`);
        var bro1 = eval(`W_${l}A.getChildByName("${l}_${x}_${y}_1")`);
        var bro2 = eval(`W_${l}A.getChildByName("${l}_${x}_${y}_2")`);
        var bro3 = eval(`W_${l}A.getChildByName("${l}_${x}_${y}_3")`);
        var bro4 = eval(`W_${l}A.getChildByName("${l}_${x}_${y}_4")`);
        if (base) {
            eval(`W_${l}A.removeChild(base)`);
        }
        if (bro1)
            eval(`W_${l}A.removeChild(bro1)`);
        if (bro2)
            eval(`W_${l}A.removeChild(bro2)`);
        if (bro3)
            eval(`W_${l}A.removeChild(bro3)`);
        if (bro4)
            eval(`W_${l}A.removeChild(bro4)`);
        if (update)
            eval(`W_${l}A.update()`);

    };

    $scope.addOne = function (l, x, y, update) {
        $scope.deleteOne(l, x, y);
        $scope.createOne(l, x, y, true);
        if (update)
            eval(`W_${l}A.update()`);
    };
    $scope.Sprite = function (element, e, l) {
        if (e.mode === "A1") {
            var SpriteSheet = new createjs.SpriteSheet({
                "images": [element.image],
                "frames": [
                    [element.sourceRect.x, element.sourceRect.y, element.sourceRect.width, element.sourceRect.height],
                    [element.sourceRect.x + ($scope.baseWidth * 2), element.sourceRect.y, element.sourceRect.width, element.sourceRect.height],
                    [element.sourceRect.x + ($scope.baseWidth * 4), element.sourceRect.y, element.sourceRect.width, element.sourceRect.height]
                ],
                "animations": {
                    "run": [0, 1, 2, 1, "run"],
                }
            });
            var sprite = new createjs.Sprite(SpriteSheet, "run");
            sprite.x = element.x;
            sprite.y = element.y;
            sprite.name = element.name;
            sprite.filters = [element.filters];
            eval(`W_${l}A.addChild(sprite);`);
            eval(`W_${l}A.removeChild(element)`);
        }
        if (e.mode === "A1_B") {
            var SpriteSheet = new createjs.SpriteSheet({
                "images": [element.image],
                "frames": [
                    [element.sourceRect.x, element.sourceRect.y, element.sourceRect.width, element.sourceRect.height],
                    [element.sourceRect.x, element.sourceRect.y + ($scope.baseWidth), element.sourceRect.width, element.sourceRect.height],
                    [element.sourceRect.x, element.sourceRect.y + ($scope.baseWidth * 2), element.sourceRect.width, element.sourceRect.height]
                ],
                "animations": {
                    "run": [0, 1, 2, 1, "run"],
                }
            });
            var sprite = new createjs.Sprite(SpriteSheet, "run");
            sprite.x = element.x;
            sprite.y = element.y;
            sprite.name = element.name;
            sprite.filters = [element.filters];
            eval(`W_${l}A.addChild(sprite);`);
            eval(`W_${l}A.removeChild(element)`);
        }
    };
    $scope.Animate = function (l, x, y) {
        var e = $scope.getTile(l, x, y);
        var base = eval(`W_${l}A.getChildByName("${l}_${x}_${y}")`);
        var bro1 = eval(`W_${l}A.getChildByName("${l}_${x}_${y}_1")`);
        var bro2 = eval(`W_${l}A.getChildByName("${l}_${x}_${y}_2")`);
        var bro3 = eval(`W_${l}A.getChildByName("${l}_${x}_${y}_3")`);
        var bro4 = eval(`W_${l}A.getChildByName("${l}_${x}_${y}_4")`);

        if (base) if (e.triange) $scope.Sprite(base, e, l);
        if (bro1) if (e.triange) $scope.Sprite(bro1, e, l);
        if (bro2) if (e.triange) $scope.Sprite(bro2, e, l);
        if (bro3) if (e.triange) $scope.Sprite(bro3, e, l);
        if (bro4) if (e.triange) $scope.Sprite(bro4, e, l);


    };
    $scope.createOneBase = function (l, x, y) {
        var e = $scope.getTile(l, x, y);
        if (e) {
            var floor = new createjs.Bitmap(queueTILETS.getResult(e.url));
            var mx = (e.x - 1);
            var my = (e.y - 1);
            floor.x = x * $scope.baseWidth;
            floor.y = y * $scope.baseHeight;
            floor.name = `${l}_${x}_${y}`;
            var color = tinycolor(e.color);
            var filter = new createjs.ColorFilter(1, 1, 1, 1, color._r, color._g, color._b, 0);
            floor.filters = [filter];
            floor.sourceRect = new createjs.Rectangle(mx * $scope.baseWidth, my * $scope.baseHeight, $scope.baseWidth, $scope.baseHeight);
            $scope.broCross(e, l, x, y, floor, filter);
            eval(`W_${l}A.addChild(floor);`);
            $scope.Animate(l, x, y);
            return e;
        }
        return undefined;
    };
    $scope.createOne = function (l, x, y, react) {
        var e = $scope.createOneBase(l, x, y);
        if (e) {
            if (react) {
                if (["A1", "A2", "A1_B", "A3"].indexOf(e.mode) !== -1) {
                    for (var xx = (x - 1); xx <= (x + 1); xx++) {
                        for (var yy = (y - 1); yy <= (y + 1); yy++) {
                            if (xx !== x || yy !== y) {
                                $scope.deleteOne(l, xx, yy);
                                $scope.createOneBase(l, xx, yy);
                            }
                        }
                    }
                }
                if (["A3"].indexOf(e.mode) !== -1) {
                    for (var xx2 = (x - 1); xx2 <= (x + 1); xx2++) {
                        for (var yy2 = (y - 1); yy2 <= (y + 1); yy2++) {
                            if (xx2 !== x || yy2 !== y) {
                                if (l - 1 > 0) {
                                    $scope.deleteOne(l - 1, xx2, yy2);
                                    $scope.createOneBase(l - 1, xx2, yy2);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    $scope.draw = function () {
        for (var l = 0; l < $scope.layers.length; l++) {
            eval(`W_${$scope.layers[l]}A.removeAllChildren();`);
        }
        var width = $scope.form.data.width;
        var height = $scope.form.data.height;
        for (var l = 1; l <= 9; l++) {
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    $scope.createOneBase(l, x, y);
                }
            }
            eval(`W_${l}A.update();`);
        }

    };
    $scope.drawEvents = function () {
        WORLD.removeAllChildren();
        var width = $scope.form.data.width;
        var height = $scope.form.data.height;
        for (var l = 1; l <= 9; l++) {
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var e = $scope.form.data.event[`${l}_${x}_${y}`];
                    if (e) {
                        if (e.isActor == "1") {
                            var floor = new createjs.Bitmap(`data/characters_file/${e.hero.name}/face.png`);
                            floor.x = x * $scope.baseWidth;
                            floor.y = y * $scope.baseHeight;
                            floor.scaleX = $scope.baseWidth / 144;
                            floor.scaleY = $scope.baseWidth / 144;
                            //floor.cache(0, 0, $scope.baseWidth, $scope.baseHeight);
                            WORLD.addChild(floor);
                        } else {
                            if (e.object.url) {
                                var w = queueTILETS.getResult(e.object.url).width;
                                var h = queueTILETS.getResult(e.object.url).width;
                                var r = (w / e.object.width) * (h / e.object.height);
                                var SpriteSheet = new createjs.SpriteSheet({
                                    framerate: e.object.framerate,
                                    "images": [queueTILETS.getResult(e.object.url)],
                                    "frames": {width: parseInt(e.object.width), height: parseInt(e.object.height)},
                                    "animations": {
                                        "run": {frames: e.object.animation}
                                    }
                                });
                                var sprite = new createjs.Sprite(SpriteSheet, "run");
                                sprite.x = x * $scope.baseWidth;
                                sprite.y = y * $scope.baseHeight;
                                WORLD.addChild(sprite);
                            }
                        }
                    }
                }
            }

        }
        WORLD.update();
    };
    $scope.drawTools = function () {
        $scope.selectors = $scope.getSelectors();
        if (!$scope.$$phase)
            $scope.$digest();
    };

    //Starters and Loadings
    $scope.playLoading = function (text) {
        _colors.forEach(d => {
            $(".spinner-layer").removeClass(`pl-${d}`)
        });
        $(".spinner-layer").addClass(`pl-${_colors[getRandomInt(_colors.length - 1)]}`);
        $("#loadingtext").html(text);
        $("#globalload").show();
    };
    $scope.stopLoading = function () {
        $("#globalload").fadeOut(5000);
    };

    //CRUD
    $scope.cache = new Date().getTime();
    $scope.clearData = function () {
        $scope.prop = {mode: "new"};
        $scope.form = new MAP;
        $scope.selection = {
            tab: "A1",
            tool: "select",
            layer: 1
        };
        $scope.drawTools();
    };
    $scope.clear = function () {
        $scope.clearData();
        $('#map_form').modal('hide');
    };
    $scope.edit = function (edit) {
        IKNOWTOSAVE = false;
        $scope.selection.layer = 1;
        $('#map_form').modal('show');
        $("[loading='map']").show();
        $(".modal-body").hide();
        $scope.prop = {mode: "edit"};
        $scope.form = edit;
        $scope.selection = {
            tab: "A1",
            tool: "select",
            layer: 1
        };
        $scope.draw();
        $scope.drawBattle();
        $scope.drawEvents();
        $("[loading='map']").hide(200);
        setTimeout(function () {

            $('.form-control').each(function () {
                $(this).parents('.form-line').addClass('focused');
            });
        }, 2000);

        $(".modal-body").show();
        $scope.drawTools();
        $scope.points = $scope.boundsTable();
        setTimeout(() => {
            $scope.$digest();
        }, 500);

    };
    $scope.new = function () {
        IKNOWTOSAVE = true;
        $scope.selection.layer = 1;
        $scope.clearData();
        $('#map_form').modal('show');
        $("[loading='map']").hide();

        $scope.drawBattle();
        $scope.draw();
        $scope.points = $scope.boundsTable();
        setTimeout(() => {

            $scope.drawTools();
        }, 2000);
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

                    $scope.$digest();
                    swal("deleted!");
                });
            });

        });
    };
    $scope.save = async function () {
        $scope.form.data.version = new Date().getTime();
        await MAP_.SAVE($scope.form.data.name, $scope.form, $scope.form.data.gender);
        $("[loading='map']").show();
        $("[loading='map']").hide(200);
        $scope.clear();
        await $scope.refresh();
    };
    $scope.refresh = async function () {
        $("[loading='map']").show();
        $scope.cache = new Date().getTime();
        $scope.list = [];
        $scope.list = await MAP_.ALL();
        $("[loading='map']").hide(200);

        $scope.$digest();
    };
    $scope.init(function () {
        $scope.clear();
        $scope.refresh();
    });
    $scope.plays = function (map) {
        $('#characetrs').modal('show');
        $scope.mapToPlay = map;
    };
    $scope.runs = function (character) {
        $scope.characterToPlay = character;
        window.open(`play?map=${$scope.mapToPlay}&player=${$scope.characterToPlay}`, '_blank');
    };


    //Watchers
    $scope.$watch('form.data.bgm', function (newValue, oldValue, scope) {
        if ($scope.form)
            document.getElementById("bgm").src = $scope.form.data.bgm;
    });
    $scope.$watch('form.data.bgs', function (newValue, oldValue, scope) {
        if ($scope.form)
            document.getElementById("bgs").src = $scope.form.data.bgs;
    });
    $scope.$watch('form.data.steps', function (newValue, oldValue, scope) {
        if ($scope.form)
            document.getElementById("stepsmusic").src = $scope.form.data.steps;
    });
    $scope.$watchCollection('form.data.battleback', function (newValue, oldValue, scope) {
        if ($scope.form) {
            document.getElementById("battlemusic").src = $scope.form.data.battleback.music;
            $scope.drawBattle();
        }

    });
    $scope.$watch('form.data.type', function (newValue, oldValue, scope) {
        if ($('#map_form').is(":visible"))
            if ($scope.TILESET) {
                var tiles = $scope.getTiles();
                for (var i in tiles) {
                    var tile = tiles[i];
                    $scope.selectTab(i);
                    break;
                }
            }
    });
    $scope.$watch('form.data.width', function (newValue, oldValue, scope) {
        if ($('#map_form').is(":visible"))
            if (typeof WORLD !== "undefined") {
                setTimeout(function () {
                    for (var l = 0; l < $scope.layers.length; l++) {
                        eval(`W_${$scope.layers[l]}A.update()`);
                    }
                }, 1000)

            }
    });
    $scope.$watch('form.data.height', function (newValue, oldValue, scope) {
        if ($('#map_form').is(":visible"))
            if (typeof WORLD !== "undefined") {
                setTimeout(function () {
                    for (var l = 0; l < $scope.layers.length; l++) {
                        eval(`W_${$scope.layers[l]}A.update()`);
                    }
                }, 1000)
            }
    });
    $scope.$watch('overlay', function (newValue, oldValue, scope) {
        if ($('#map_form').is(":visible"))
            for (var sel of $scope.selecteds) {
                sel.color = $scope.overlay
            }
    });
    $scope.$watchCollection('currentEvent', function (newValue, oldValue, scope) {


    });


    WORLD.on("stagemousedown", $scope.drawTiles);
    WORLD.on('pressmove', $scope.drawTiles);
}
]);