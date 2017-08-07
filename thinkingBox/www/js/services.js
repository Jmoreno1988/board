angular.module('app.services', [])
    // Permite el acceso al localStorage
    .factory('sessionService', ['$http', function ($http) {
        return {
            set: function (key, value) {
                return localStorage.setItem(key, JSON.stringify(value));
            },
            get: function (key) {
                return JSON.parse(localStorage.getItem(key));
            },
            
            destroy: function (key) {
                return localStorage.removeItem(key);
            },

            clear: function() {
                return localStorage.clear();
            },

            greeter: function () {
                alert("Hello world!!!")
            },

            exist: function(key) {
                if(localStorage.getItem(key))
                    return true;
                return false;
            }
        };
    }])

    // Util para pasar datos entre controladores
    .service('bridgeService', [function () {
        return {
            data: {
            }
        };
    }]);