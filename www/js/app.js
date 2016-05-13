// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngStorage']);

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

app.controller('drugPortfolio',function($scope,$localStorage){
	
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
	$scope.sampleDrug1 = {'name':'Saridon','strength':'10mg','dosage':'2','show':false};
	$scope.sampleDrug2 = {'name':'Crocin','strength':'10mg','dosage':'2','show':false};
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
  }
  
  //Event when Place Order is clicked
  $scope.placeOrder = function()
  {
	  $scope.portfolio.modifiedTime = new Date().getTime();
	  $scope.portfolio.drugsPortfolio = $scope.drugsInfo;
	  $scope.portfolio.days  = $scope.daysOpted;
	  
	  $localStorage.portfolio = $scope.portfolio;
  }
	
	
});

