getParams = function () {
    var params = {};
    var parser = document.createElement('a');
    parser.href = location.href;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};
capitalize = function (str) {
    if (typeof str === 'function')
        str = str();
    str = str.toLowerCase();
    return str.replace(/(^|\s)\S/, function (match) {
        return match.toUpperCase();
    }).split(/(?=[A-Z])/).join(' ');
};

capitalizeOne = function (str) {
    str = str.split(/(?=[A-Z])/).join(" ");
    return str.replace(/(^|\s)\S/, function (match) {
        return match.toUpperCase();
    });
};

capitalizeOneSpace = function (str) {
    if (typeof str === 'function')
        str = str();
    return str.replace(/(^|\s)\S/, function (match) {
        return match.toUpperCase();
    });
};


LANGUAGE_ = {
    ALL: () => new Promise(async (resolve, reject) => {
        var lan = getParams().lan || "";
        if (lan) lan = "_" + lan;
        if (STORAGED.lan()) {
            if (STORAGED.lan() !== 'en')
                lan = "_" + STORAGED.lan();
        }
        LANGUAGE.CODE = lan;
        var data = await API.POST("datao.php", {
            "folder": "language" + lan
        });
        resolve(data.data || {});
    })
};
FALTATION = {};

LANGUAGE = {
    t: function (text) {
        if (LAN[text]) {
            return LAN[text];
        } else {
            FALTATION[text] = text;
        }
        return capitalizeOne(text);
    },
    CODE: ""
};