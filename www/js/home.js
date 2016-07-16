var app = angular.module('CustMediEasy');
app.controller('drugPortfolio', function ($scope, $ionicScrollDelegate, $localStorage, $http, serviceCallManager) {
    $scope.callbackMethod = function (query)
    {

        //return { items: [
        //                        {id: "1", name: query + "1", view: "view: " + query + "1"},
        //                        {id: "2", name: query + "2", view: "view: " + query + "2"},
        //                        {id: "3", name: query + "3", view: "view: " + query + "3"}] };


        return {drugs: [
                {
                    "name": "Abamune",
                    "url": "http://www.medindia.net/drug-price/abacavir/abamune.htm",
                    "strength": "300mg",
                    "company": "Cipla Limited",
                    "type": "Tablet"
                }]};
    }
    $scope.progressval = 0;
    for (var i = 0; i <= 100; i++)
    {
        $scope.progressval = i;
    }
    $scope.portfolio =
        {
            'type': 'portfolio',
            'version': 1.0,
            'modifiedTime': 0,
            'drugsPortfolio': [],
            'days': 0
        };
    if ($localStorage.portfolio !== undefined)
    {
        $scope.portfolio = $localStorage.portfolio;
    } else
    {

    }

    //Days Defaults
    $scope.daysOpted = 30;
    $scope.minDays = 5;
    $scope.maxDays = 30;

    $scope.trashPortfolio = function ()
    {
        //TODO: Show an alert:
        $scope.drugsInfo = [];
        //TODO : Return to different screen???

    }
    $scope.canShowDays = false;

    $scope.showDays = function ()
    {
        $scope.canShowDays = !$scope.canShowDays;
    }

    $scope.hideDays = function ()
    {
        $scope.canShowDays = false;
    }

    $scope.showHideDays = function ()
    {
        return $scope.canShowDays;
    }


    $scope.drugsInfo = [];

    //Remove the 4 lines during live.
    $scope.sampleDrug1 = {'name': 'Saridon', 'strength': '10mg', 'dosage': '2', 'show': false, 'ordered': true};
    $scope.sampleDrug2 = {'name': 'Crocin', 'strength': '10mg', 'dosage': '2', 'show': false, 'ordered': true};
    $scope.drugsInfo.push($scope.sampleDrug1);
    $scope.drugsInfo.push($scope.sampleDrug2);
    ///

    $scope.drugsInfo.push();
    $scope.minDosage = 1;
    $scope.maxDosage = 10;

    //Show hide drug
    $scope.showHideDrug = function (drugs)
    {
        drugs.show = !drugs.show;
    }



    //Accordion for the drugs to expand for editing
    $scope.isDrugEditShown = function (drugs) {
        return drugs.show;
    }

    //Enable or disable the order
    $scope.toggleOrder = function (index)
    {
        $scope.drugsInfo[index].ordered = !$scope.drugsInfo[index].ordered;
    }

    //Delete the drug
    $scope.deleteDrug = function (index)
    {
        $scope.drugsInfo.splice(index, 1);
    }

    //Add a new drug
    $scope.addNew = function ()
    {
        var newDrug = {'name': '', 'strength': '', 'dosage': '', 'show': false};
        $scope.drugsInfo.push(newDrug);
        $ionicScrollDelegate.resize(true);
    }

    //Event when Place Order is clicked
    $scope.placeOrder = function ()
    {
        $scope.portfolio.modifiedTime = new Date().getTime();
        $scope.portfolio.drugsPortfolio = $scope.drugsInfo;
        $scope.portfolio.days = $scope.daysOpted;

        $localStorage.portfolio = $scope.portfolio;

        var postData = {
            'customerContact': '9902455333',
            'vendorContact': '918028450292',
            'drugList': [
                {'drugName': 'Dolo', 'strength': '650mg', 'quantity': '15'},
                {'drugName': 'Saridon', 'strength': '500mg', 'quantity': '30'}
            ]
        };

        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        console.log('Sending: ' + JSON.stringify(postData));
        serviceCallManager.placeOrder(postData);
//        $http({
//            withCredentials: false,
//            method: 'POST',
//            url: '/orders/new',
//            headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'},
//            data: postData
//        })
//            .then(function success(resp) {
//                console.log('response: ' + resp.data.orderId);
//            },
//                function error(err) {
//                    console.log("error: " + err);
//                });
    }
    //Show the time picker 
    $scope.numberPickerObject =
        {
            inputValue: $scope.daysOpted,
            minValue: 0,
            maxValue: 30,
            precision: 3,
            format: "WHOLE",
            titleLabel: 'Number of Days',
            setLabel: 'Set',
            setButtonType: 'button-positive',
            closeButtonType: 'button-stable',
            callback: function (val) {
                if (val !== undefined)
                {
                    $scope.daysOpted = val;
                }
            }
        }
});
