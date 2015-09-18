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
    // $stateProvider
    //   .state('create', {
    //     url: '/create',
    //     templateUrl: 'create.html'
    //   })
    //   .state('detail', {
    //     url: '/detail',
    //     templateUrl: 'detail.html'
    //   })

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

  $scope.popover = $ionicPopover.fromTemplate('<ion-popover-view class="popover-custom"><ion-content><div class="list popover-wrapper"><a href="javascript:void(0)" ng-click="popover.hide()">X Close</a><h4>Top 5 Names</h4><p>George Clooney</p><p>George Clooney</p><p>George Clooney</p><p>George Clooney</p><p>George Clooney</p></div></ion-content></ion-popover-view>');

  $scope.popover2 = $ionicPopover.fromTemplate('<ion-popover-view class="popover-custom"><ion-content><div class="list popover-wrapper"><a href="javascript:void(0)" ng-click="popover.hide()">X Close</a><label class="item item-input"><input type="text" placeholder="First Celebrity"></label><label class="item item-input"><input type="text" placeholder="Second Celebrity"></label><button class="button">Save</button></div></ion-content></ion-popover-view>');

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $ionicPopover.fromTemplateUrl('popover', function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover2 = function($event) {
    $scope.popover2.show($event);
  };
  $ionicPopover.fromTemplateUrl('popover2', function(popover) {
    $scope.popover2 = popover;
  });

  // $ionicPopover.fromTemplateUrl('templates/detail.html', {
  //   scope: $scope,
  // }).then(function(popover) {
  //   $scope.popover = popover;
  // });

  // $ionicPopover.fromTemplateUrl('templates/create.html', {
  //   scope: $scope,
  // }).then(function(popover) {
  //   $scope.popover = popover;
  // });

  // $scope.openCreate = function() {
  //   //console.log("hello");
  //   $location.path('/create');
  // }
});