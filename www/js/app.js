// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myCelebFace = angular.module('starter', 
  ['ionic', 
   'ngCordova'
  ]
)

myCelebFace.value('ParseConfiguration', {
  applicationId: "k2OOVCy2In1Wjo7BxNtWU7pNK5aaM7FWxDDHKWEY",
  javascriptKey: "jADl4AGKrljqgRr6z0ILpMkBn6wU9GSdVuuCavAI"
})

myCelebFace.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('create', {
        url: '/create',
        templateUrl: 'create.html'
      })

    $urlRouterProvider.otherwise('/')
});

myCelebFace.run(function($ionicPlatform, $rootScope, $state) {
  $rootScope.$on('$stateChangeError',
    function (event, toState, toParams, fromState, fromParams, error) {
      debugger;
      console.log('$stateChangeError ' + error && (error.debug || error.message || error));

      if (error && error.error === "noUser") {
        event.preventDefault();
        $state.go('app-login', {});
      }
    });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

myCelebFace.controller("myCelebFaceController", function($state, $scope, $cordovaCamera, $ionicSlideBoxDelegate, $location, $ionicPopover) {

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  };

  $scope.takePicture = function() {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = "data:image/jpg;base64," + imageData;
      // var image = document.getElementById('myImage');
      // image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });

  };

  $scope.getLibrary = function() {
    var options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        targetWidth: 300,
        targetHeight: 300
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = imageData;
      // var image = document.getElementById('myImage');
      // image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });

  };

  $ionicPopover.fromTemplateUrl('templates/detail.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openCreate = function() {
    //console.log("hello");
    $location.path('/create');
  }
});