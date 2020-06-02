API = {
    POST: (url, parameters) => new Promise((resolve, reject) => {
        $http = angular.injector(["ng"]).get("$http");
        $http.post(DOMAIN + url, parameters).then(function (data) {
            resolve(data);
        }, function (data) {
            console.log(data);
        });
    }),
    GET: (url) => new Promise((resolve, reject) => {
        $http = angular.injector(["ng"]).get("$http");
        delete $http.defaults.headers.common['X-Requested-With'];
        $http.get(DOMAIN + url).then(function (data) {
            resolve(data);
        }, function (data) {
            console.log(data);
        });
    }),
    GETLOCAL: (url) => new Promise((resolve, reject) => {
        $http = angular.injector(["ng"]).get("$http");
        delete $http.defaults.headers.common['X-Requested-With'];
        $http.get(url).then(function (data) {
            resolve(data);
        }, function (data) {
            console.log(data);
        });
    }),
    AJAXGET: (url, data) => new Promise((resolve, reject) => {
        $.ajax({
            url: DOMAIN + url,
            type: 'GET',
            callback: '',
            crossDomain: true,
            dataType: 'jsonp',
            success: function (data) {
                resolve(data);
            },
            error: function (data) {
                resolve(data);
            }
        });
    })
};