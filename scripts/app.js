var app= angular.module("myApp",["ngRoute","ui.bootstrap","angular-growl"])
      .config(function ($routeProvider){
        $routeProvider
          .when("/", {
              templateUrl: "./partials/main.html",
              controller: "mainController"
          })
          .when("/createContact", {
              templateUrl: "./partials/createContact.html",
              controller: "createContactController"
          })
          .when("/add-and-display", {
              templateUrl: "./partials/addAndDisplay.html",
              controller: "addAndDisplay"
          })                    
          .when("/add-friend", {
              templateUrl: "./partials/addFriend.html",
              controller: "addFriend"
          })                    

          .otherwise({
            redirectTo : "/"
          })
      })
      .run(function($rootScope){
        $rootScope.endPoint = "http://rest.learncode.academy/api/";
        $rootScope.rootName = " ";
      });

      // app.config(['growlProvider', function(growlProvider) {
      //     growlProvider.globalTimeToLive(2000);
      // }]);
      app.config(['growlProvider', function(growlProvider) {

         growlProvider.globalDisableCountDown(true);
      }]);
