AVATARDB = null;
AVATAR_ = {
    db: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("avatardb.php", {});
        resolve(data.data || {});
    }),
    colors: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("colordb.php", {});
        resolve(data.data || {});
    })
};

AVATAR = function (data) {
    this.prop = {};
    this.color = {};
    this.required = ["Body", "Eyes", "Face", "Mouth", "Nose", "Ears"];
    this.canvas = ["canvas_face", "canvas_facehappy", "canvas_sv", "canvas_tv", "canvas_tvd"];
    this.gender = "Female";
    this.init = function (gender, edit) {
        this.gender = gender;
        if (!edit) {
            for (var category in AVATARDB[gender].FG) {
                this.prop[category] = "p01";
            }
            for (var category in AVATARDB[gender].SV) {
                this.prop[category] = "p01";
            }
            for (var category in AVATARDB[gender].TV) {
                this.prop[category] = "p01";
            }

            for (var i of ["Cloak2", "FacialMark", "BeastEars", "AccA", "Glasses", "AccB", "Cloak1", "Wing", "Tail"]) {
                this.prop[i] = "p00";
            }

            for (var category in AVATARDB[gender].FG) {
                this.color[category] = {};
                for (var i = 0; i <= 6; i++) {
                    this.color[category]["c" + i] = "";
                }
            }
            for (var category in AVATARDB[gender].SV) {
                this.color[category] = {};
                for (var i = 0; i <= 6; i++) {
                    this.color[category]["c" + i] = "";
                }
            }
            for (var category in AVATARDB[gender].TV) {
                this.color[category] = {};
                for (var i = 0; i <= 6; i++) {
                    this.color[category]["c" + i] = "";
                }
            }
            for (var ii of ["Wing", "Wing1", "Wing2", "Tail", "Tail1", "Tail2", "Beard", "Beard1", "Beard2"]) {
                this.prop[ii] = "";
                for (var i = 0; i <= 6; i++) {
                    if (this.color[ii] !== undefined)
                        this.color[ii]["c" + i] = "";
                }
            }
        }
        for (var can of this.canvas) {
            eval(`${can.split('_')[1].toUpperCase()} = new createjs.Stage("${can}");`);
        }
    };

    this.update = function () {
        for (var can of this.canvas) {
            if (typeof FACE !== "undefined")
                eval(`${can.split('_')[1].toUpperCase()}.update();`);
        }
    };
    this.random = function () {

    };
    this.clear = function () {
        for (var can of this.canvas) {
            if (typeof FACE !== "undefined") {
                eval(`${can.split('_')[1].toUpperCase()}.removeAllChildren();`);
            }
        }
    };
    this.loadData = function (gender, part, category, value, drawRule, LoadJson) {
        for (var face in AVATARDB[gender][part][category][value]) {
            var item = AVATARDB[gender][part][category][value][face];
            LoadJson.push(item.url);
            if (!drawRule[category])
                drawRule[category] = {};
            drawRule[category][`${parseInt((item.layer || "c0").replace("c", "")) || 0}_${parseInt(item.model.replace("m", "")) || 0}`] = item.url;
        }
    };
    this.groupFace = ["Body", "Face", "Ears", "Nose", "Mouth"];
    this.groupHair = ["RearHair2", "RearHair1", "Eyebrows", "FrontHair"];

    this.runCategory = function (categories, drawRule) {
        for (var c of categories) {
            for (var i = 6; i >= 1; i--) {
                for (var j = 20; j >= 0; j--) {
                    if (drawRule[c])
                        if (drawRule[c][`${i}_${j}`]) {
                            var color = "";
                            if (this.color[c])
                                color = this.color[c]["c" + i];
                            else
                                color = "0";
                            var bmp = new createjs.Bitmap(drawRule[c][`${i}_${j}`]);
                            bmp.x = 0;
                            bmp.y = 0;
                            bmp.filters = [new createjs.ThresholdFilter(0, 0, 0, color, 144)];
                            bmp.cache(0, 0, 144, 144);
                            if (typeof FACE !== "undefined") {
                                FACE.addChild(bmp);
                            }
                        }
                }
            }
        }
    };
    this.runCategorySV = function (categories, drawRule) {
        for (var c of categories) {
            for (var i = 6; i >= 1; i--) {
                for (var j = 20; j >= 0; j--) {
                    if (drawRule[c])
                        if (drawRule[c][`${i}_${j}`]) {

                            if (!this.color[c])
                                this.color[c] = {
                                    c1: "",
                                    c2: "",
                                    c3: "",
                                    c4: "",
                                    c5: "",
                                    c6: ""
                                };

                            var bmp = new createjs.Bitmap(drawRule[c][`${i}_${j}`]);
                            bmp.x = 0;
                            bmp.y = 0;
                            bmp.filters = [new createjs.ThresholdFilter(0, 0, 0, this.color[c]["c" + i], 144)];
                            bmp.cache(0, 0, 576, 384);
                            if (typeof FACE !== "undefined")
                                SV.addChild(bmp);
                        }

                }
            }
        }
    };
    this.runCategoryTV = function (categories, drawRule) {
        for (var c of categories) {
            for (var i = 6; i >= 1; i--) {
                for (var j = 20; j >= 0; j--) {
                    if (drawRule[c])
                        if (drawRule[c][`${i}_${j}`]) {
                            if (!this.color[c])
                                this.color[c] = {
                                    c1: "",
                                    c2: "",
                                    c3: "",
                                    c4: "",
                                    c5: "",
                                    c6: ""
                                };
                            var bmp = new createjs.Bitmap(drawRule[c][`${i}_${j}`]);
                            bmp.x = 0;
                            bmp.y = 0;
                            bmp.filters = [new createjs.ThresholdFilter(0, 0, 0, this.color[c]["c" + i], 144)];
                            bmp.cache(0, 0, 144, 192);
                            if (typeof FACE !== "undefined")
                                TV.addChild(bmp);
                        }

                }
            }
        }
    };
    this.runCategoryTVD = function (categories, drawRule) {
        for (var c of categories) {
            for (var i = 6; i >= 1; i--) {
                for (var j = 20; j >= 0; j--) {
                    if (drawRule[c])
                        if (drawRule[c][`${i}_${j}`]) {
                            var bmp = new createjs.Bitmap(drawRule[c][`${i}_${j}`]);
                            bmp.x = 0;
                            bmp.y = 0;
                            bmp.filters = [new createjs.ThresholdFilter(0, 0, 0, this.color[c]["c" + i], 144)];
                            bmp.cache(0, 0, 144, 48);
                            if (typeof FACE !== "undefined")
                                TVD.addChild(bmp);
                        }

                }
            }
        }
    };
    this.draw = function (gender) {
        this.clear();
        var queue = new createjs.LoadQueue(false);
        var LoadJson = [];
        var drawRule = [];
        var drawRuleSV = [];
        var drawRuleTV = [];
        var drawRuleTVD = [];
        for (var category in AVATARDB[gender].FG) {
            this.loadData(gender, "FG", category, this.prop[category], drawRule, LoadJson);
        }
        for (var category in AVATARDB[gender].SV) {
            this.loadData(gender, "SV", category, this.prop[category], drawRuleSV, LoadJson);
        }
        for (var category in AVATARDB[gender].TV) {
            this.loadData(gender, "TV", category, this.prop[category], drawRuleTV, LoadJson);
        }
        for (var category in AVATARDB[gender].TVD) {
            this.loadData(gender, "TVD", category, this.prop[category], drawRuleTVD, LoadJson);
        }


        queue.loadManifest(LoadJson);
        queue.on("complete", function (event) {
            this.runCategory(["RearHair2", "Cloak2", "Body", "Clothing2", "Face", "FacialMark", "Clothing1", "RearHair1", "Ears", "BeastEars", "Nose", "Mouth", "Beard", "Eyes", "Eyebrows", "AccA", "Glasses", "FrontHair", "AccB", "Cloak1"], drawRule);
            this.runCategorySV(["Wing", "Tail", "Body", "Eyes", "FacialMark", "Cloak2", "Clothing2", "RearHair1", "Ears", "BeastEars", "Beard", "AccA", "Glasses", "FrontHair", "AccB"], drawRuleSV);
            this.runCategoryTV(["Wing2", "Tail2", "Body", "Eyes", "Beard2", "Cloak2", "FacialMark", "FrontHair2", "Clothing2", "RearHair2", "Ears", "BeastEars", "Beard1", "Cloak1", "Wing1", "Tail1", "RearHair1", "AccA", "Glasses", "FrontHair1", "AccB"], drawRuleTV);
            this.runCategoryTVD(["Body", "Eyes", "FacialMark", "Clothing2", "Tail", "Cloak1", "Wing", "RearHair1", "Ears", "BeastEars", "Beard", "AccA", "Glasses", "FrontHair", "AccB"], drawRuleTVD);
            this.update();
        }, this);
        queue.load();
    }
};


SELECTION = function () {
    this.category = "FrontHair";
    this.color = "c1";
    this.item = {};
};
