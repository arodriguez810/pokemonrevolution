﻿LASTMOVEMENT = undefined;
TOUCHER = undefined;
DOMAIN = "http://mangalos.com/app/game/";
DOMAINRESOURCE = "http://mangalos.com/app/";
STORAGED = {
    delete: function () {
        localStorage.removeItem("session");
        localStorage.removeItem("language");
    },
    add: function (object, lan) {
        STORAGED.delete("session");
        localStorage.setItem("session", JSON.stringify(object));
        localStorage.setItem("language", lan || "");
    },
    get: function () {
        if (localStorage.getItem("session") === null) return null;
        return eval("(" + localStorage.getItem("session") + ")");
    },
    lan: function () {
        if (localStorage.getItem("session") === null) return null;
        return localStorage.getItem("language");
    },
    setlan: function (lan) {
        localStorage.setItem("language", lan);
    },
    exist: function () {
        return localStorage.getItem("session") !== null;
    }
};
pokemon = angular.module('pokemon', ['ui.codemirror']);


COLORSF = [];

pokemon.value('ui.config', {
    codemirror: {
        mode: 'text/javascript',
        lineNumbers: true,
        matchBrackets: true
    }
});
pokemon.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
}]);

function pokeishun(poke) {
    console.log(poke);
    var preload = new createjs.LoadQueue();
    preload.installPlugin(createjs.Sound);
    var pokepath = poke.image;
    var sound_pokepath = poke.crie;
    preload.loadFile(pokepath);
    preload.loadFile({id: "sound", src: sound_pokepath});
    preload.addEventListener("fileload", function (event) {
        $me.animateCssArray(["rotateOut"], async function () {
            $("#pokeball").attr("src", pokepath);
            $("#pokemonname").val(poke.name);
            $("#pokeball").removeAttr("width");
            $("#pokeball").removeAttr("height");
            $("#pokeballdiv").removeClass("image");
            $me.animateCssArray(["rotateIn"], async function () {
                createjs.Sound.play("sound");
            });
        });

    });
}

oseaX = function (obj) {
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }
    return (
        obj === '[NULL]' || obj === undefined || obj === null || obj === "" || obj <= 0 || obj === "0"
    );
};
OSO = function (object) {
    return eval("(" + JSON.stringify(object) + ")");
};

$("#pokeball").click(function () {

    $me = $(this);
    POKEDEX_.Ramdon().then(function (poke) {
        pokeishun(poke);
    });
});

$("#searchpokemon").click(function () {
    //mewtwomegay
    $me = $("#pokeball");
    POKEDEX_.Pokemon($("#pokemonname").val().toLowerCase()).then(function (poke) {
        pokeishun(poke);
    });
});


function extract_colors(img, ...colors) {
    var canvas = document.createElement("canvas");
    var c = canvas.getContext('2d');
    c.width = canvas.width = img.width;
    c.height = canvas.height = img.height;
    c.clearRect(0, 0, c.width, c.height);
    c.drawImage(img, 0, 0, img.width, img.height);
    return getColors(c, ...colors);
}

function rgbToHex(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


function getColors(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.offsetWidth;
    canvas.height = img.offsetHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var pixels = ctx.getImageData(0, 0, img.width, img.height);
    var data = pixels.data;
    var colors = [];
    for (var i = 0; i < data.length; i += 4) {
        var r = data[i], g = data[i + 1], b = data[i + 2];
        var colobj = {r, g, b};
        colors[rgbToHex(r, g, b)] = rgbToHex(r, g, b);
    }
    return Object.values(colors);
}

function getColorsRBG(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.offsetWidth;
    canvas.height = img.offsetHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var pixels = ctx.getImageData(0, 0, img.width, img.height);
    var data = pixels.data;
    var colors = [];
    for (var i = 0; i < data.length; i += 4) {
        var r = data[i], g = data[i + 1], b = data[i + 2];
        var colobj = {r: r, g: g, b: b};
        colors.push(colobj);
    }
    return colors;
}

function displayColorsMono(color, divd) {
    document.getElementById(divd).innerHTML = "";
    var index = 0;
    for (var c of color) {
        var div = document.createElement('div');
        div.innerText = index;
        div.style.width = '30px';
        div.style.height = '30px';
        div.style.cssFloat = 'left';
        div.style.position = 'relative';
        div.style.backgroundColor = `${c}`;
        document.getElementById(divd).appendChild(div);
        index++;
    }
    // return mono;
}

function displayColorsHex(color, divd) {
    document.getElementById(divd).innerHTML = "";
    var index = 0;
    for (var c of color) {
        var div = document.createElement('div');
        div.style.width = '20px';
        div.style.height = '10px';
        div.style.cssFloat = 'left';
        div.style.position = 'relative';
        div.style.fontSize = "6px";
        div.style.backgroundColor = `#${c}`;
        document.getElementById(divd).appendChild(div);
        index++;
    }
    // return mono;
}

PRESS = {
    CTRL: false,
    SHIFT: false
};
$(document).on("keyup", function (e) {
    if ($("#game").length > 0) {
        if (!createjs.Touch.isSupported()) {
            if (TOUCHER) {
                clearInterval(TOUCHER);
                TOUCHER = undefined;
            }
        }
    }
});


UNIT = function () {
    return angular.element($("#play")).scope();
};

$(document).on("keyup", function (e) {
    PRESS.CTRL = false;
    PRESS.SHIFT = false;
    if (TOUCHER)
        clearInterval(TOUCHER);
    TOUCHER = undefined;
});
$(document).on("click", ".gradientclass", function () {
    var a = $("<a>")
        .attr("href", $(this).attr('src'))
        .attr("download", $(this).attr('download'))
        .appendTo("body");
    a[0].click();
    a.remove();
});

function tintImage(imgElement, tintColor) {
    // create hidden canvas (using image dimensions)
    var canvas = document.createElement("canvas");
    canvas.width = imgElement.offsetWidth;
    canvas.height = imgElement.offsetHeight;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElement, 0, 0);

    var map = ctx.getImageData(0, 0, 320, 240);
    var imdata = map.data;

    // convert image to grayscale
    var r, g, b, avg;
    for (var p = 0, len = imdata.length; p < len; p += 4) {
        r = imdata[p]
        g = imdata[p + 1];
        b = imdata[p + 2];
        // alpha channel (p+3) is ignored

        avg = Math.floor((r + g + b) / 3);

        imdata[p] = imdata[p + 1] = imdata[p + 2] = avg;
    }

    ctx.putImageData(map, 0, 0);

    // overlay filled rectangle using lighter composition
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = tintColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // replace image source with canvas data
    imgElement.src = canvas.toDataURL();
}

Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randomArray(array) {
    return array[getRandomInt(array.length)];
}

function randomObject(obj) {
    var arr = objToArray(obj);
    return arr[getRandomInt(arr.length)];
}

function objToArray(array) {
    var arry = array;
    var arr = [];
    for (var a in arry) {
        arr.push(arry[a]);
    }
    return arr;
}

function getRandomIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function decodeProperties(array) {
    var result = [];
    for (var item of array) {
        result = getProperties("", item, result);
    }
    return result;
}

function getProperties(prefijo, object, array) {
    for (var i in object) {
        if (typeof object[i] === "object") {
            array = getProperties(i, object[i], array);
        } else {
            array[`${prefijo}_${i}`] = "";
        }
    }
    return array;
}
