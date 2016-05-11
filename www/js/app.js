// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

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
app.controller('drugPortfolio',function($scope){
	$scope.defaultDrugs = {'name':'','strength':'','dosage':[{'type':'m','value':[{'type':'b','value':'0'},{'type':'a','value':'0'}]},{'type':'a','value':[{'type':'b','value':'0'},{'type':'a','value':'0'}]},{'type':'n','value':[{'type':'b','value':'0'},{'type':'a','value':'0'}]}]};
	$scope.drugsInfo = [];
	$scope.drugsInfo.push($scope.defaultDrugs);
	$scope.drugTimes={};
	$scope.drugTimes['m'] = 'Morning';
	$scope.drugTimes['a'] = 'Afternoon';
	$scope.drugTimes['n'] = 'Night';
	
	$scope.drugPeriod = {'b':'Before','a':'After'};
	
	
	
	
});

