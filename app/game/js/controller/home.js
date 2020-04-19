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
            await API.POST("save.php", {
                "folder": folder,
                "name": "data",
                "data": PROFILE
            });
            resolve(PROFILE)
        }
    }),
};

pokemon.controller('home', ['$scope', function ($scope) {

}]);