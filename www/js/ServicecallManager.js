var app = angular.module('CustMediEasy');
app.factory("serviceCallManager", function ($http) {
    return  {
        placeOrder: function (postData)
        {
            console.log('place order is called');
            return $http({
                withCredentials: false,
                method: 'POST',
                url: '/orders/new',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'},
                data: postData
            })
                .then(function success(resp) {
                    console.log('response: ' + resp.data.orderId);
                },
                    function error(err) {
                        console.log("error: " + err);
                    });
        }

    };

});


