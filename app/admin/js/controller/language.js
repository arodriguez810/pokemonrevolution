LANGUAGE_ = {
    ALL: () => new Promise(async (resolve, reject) => {
        var data = await API.POST("datao.php", {
            "folder": "language"
        });
        resolve(data.data || {});
    }),
};

LANGUAGE = {
    t: function (text) {
        if (LAN[text]) {
            return LAN[text];
        }
        return text;
    }
};