// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngStorage','ion-autocomplete','ion-floating-menu','ionic-numberpicker']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider,$urlRouterProvider){
	$stateProvider.state('index',{
		url:'/',
		templateUrl:'home.html'
	}).state('loading',{
		url: '/loading',
		templateUrl:'loading.html'
	}).state('OrderConfirmation',{
		url: '/OrderConfirmation',
		templateUrl : 'OrderConfirmation.html'
	}).state('OrderHistory',{
		url: '/OrderHistory',
		templateUrl:'OrderHistory.html'
	}).state('OrderDetails',{
		url: '/OrderDetails',
		templateUrl:'OrderDetails.html'
	}).state('Profile',{
		url:'Profile',
		templateUrl:'Profile.html'
	});
	$urlRouterProvider.otherwise('/');	
});

app.controller('drugPortfolio',function($scope,$ionicScrollDelegate,$localStorage,$http){	
	$scope.callbackMethod = function(query)
	{
		
			//return { items: [
            //                        {id: "1", name: query + "1", view: "view: " + query + "1"},
            //                        {id: "2", name: query + "2", view: "view: " + query + "2"},
            //                        {id: "3", name: query + "3", view: "view: " + query + "3"}] };
			
			
			return { drugs : [
			{
      "name": "Abamune",
      "url": "http://www.medindia.net/drug-price/abacavir/abamune.htm",
      "strength": "300mg",
      "company": "Cipla Limited",
      "type": "Tablet"
			}]};
	}
	$scope.progressval  = 0;
	for(var i=0;i<=100;i++)
	{
		$scope.progressval= i;
	}
	$scope.portfolio = 
		{
			'type' : 'portfolio',
			'version':1.0,
			'modifiedTime':0,
			'drugsPortfolio':[],
			'days':0
		};
	if($localStorage.portfolio !== undefined)
	{
		$scope.portfolio =  $localStorage.portfolio;
	}else
	{
		
	}	
	
	//Days Defaults
	$scope.daysOpted = 30;
	$scope.minDays = 5;
	$scope.maxDays = 30;
	
	$scope.trashPortfolio = function()
	{
		//TODO: Show an alert:
		$scope.drugsInfo = [];
		//TODO : Return to different screen???
		
	}
	$scope.canShowDays = false;
	
	$scope.showDays = function()
	{
		$scope.canShowDays = !$scope.canShowDays;
	}
	
	$scope.hideDays = function()
	{
		$scope.canShowDays = false;
	}
	
	$scope.showHideDays = function()
	{
		return $scope.canShowDays;
	}
	
	
	$scope.drugsInfo = [];
	
	//Remove the 4 lines during live.
	$scope.sampleDrug1 = {'name':'Saridon','strength':'10mg','dosage':'2','show':false,'ordered':true};
	$scope.sampleDrug2 = {'name':'Crocin','strength':'10mg','dosage':'2','show':false,'ordered':true};
	$scope.drugsInfo.push($scope.sampleDrug1);
	$scope.drugsInfo.push($scope.sampleDrug2);
	///
	
	$scope.drugsInfo.push();
	$scope.minDosage = 1;
	$scope.maxDosage= 10;
	
	//Show hide drug
	$scope.showHideDrug = function(drugs) 
	{
		drugs.show = !drugs.show;				
	}
  
  
  
  //Accordion for the drugs to expand for editing
  $scope.isDrugEditShown = function(drugs) {
    return drugs.show;
  }
  
  //Enable or disable the order
  $scope.toggleOrder = function(index)
  {
	  $scope.drugsInfo[index].ordered = !$scope.drugsInfo[index].ordered;	  
  }
  
  //Delete the drug
  $scope.deleteDrug = function(index)
  {
	  $scope.drugsInfo.splice(index,1);
  }
  
  //Add a new drug
  $scope.addNew = function()
  {
	  var newDrug = {'name':'','strength':'','dosage':'','show':false};
	  $scope.drugsInfo.push(newDrug);
	  $ionicScrollDelegate.resize(true);
  }
  
  //Event when Place Order is clicked
  $scope.placeOrder = function()
  {
	  $scope.portfolio.modifiedTime = new Date().getTime();
	  $scope.portfolio.drugsPortfolio = $scope.drugsInfo;
	  $scope.portfolio.days  = $scope.daysOpted;
	  
	  $localStorage.portfolio = $scope.portfolio;

	  var postData = {
          'customerContact' : '9902455333',
          'vendorContact' : '918028450292',
          'drugList': [
               {'drugName':'Dolo', 'strength':'650mg', 'quantity':'15'},
               {'drugName':'Saridon','strength':'500mg','quantity':'30'}
          ]
      };

    var config = {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    console.log('Sending: ' + JSON.stringify(postData));
    $http({
      withCredentials: false,
       method: 'POST',
      url: '/orders/new',
      headers: {'Content-Type': 'application/json', 'Accept':'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'},
      data: postData
    })
    .then(function success(resp) {
    	console.log('response: ' + resp.data.orderId);
    }, 
    function error(err) {
    	console.log("error: " + err);
    });
    /*
    .success(function(data, status, headers, config) {
      console.log('data = ' + data);
      console.log('status = ' + status);
      console.log('headers = ' + headers);
      console.log('config = ' + config);
    })
    .error(function(data, status, headers, config) {
        console.log("data: " + data);
       console.log('status = ' + status);
      console.log('headers = ' + headers);
      console.log('config = ' + JSON.stringify(config));
       console.log('error*********');
    });
*/


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
				if(val !== undefined)
				{
					$scope.daysOpted =val;
				}
			}
	}
	
	
	
	
});

