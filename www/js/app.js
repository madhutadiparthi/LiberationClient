// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('CustMediEasy', ['ionic', 'ngStorage', 'ion-autocomplete', 'ion-floating-menu', 'ionic-numberpicker']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
        url: '/',
        templateUrl: 'home.html'
    }).state('loading', {
        url: '/loading',
        templateUrl: 'loading.html'
    }).state('OrderConfirmation', {
        url: '/OrderConfirmation',
        templateUrl: 'OrderConfirmation.html'
    }).state('OrderHistory', {
        url: '/OrderHistory',
        templateUrl: 'OrderHistory.html'
    }).state('OrderDetails', {
        url: '/OrderDetails',
        templateUrl: 'OrderDetails.html'
    }).state('Profile', {
        url: '/Profile',
        templateUrl: 'Profile.html'
    });
    $urlRouterProvider.otherwise('/');
});

