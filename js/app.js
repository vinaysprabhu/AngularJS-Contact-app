var app= angular.module("myApp",["ngRoute","ui.bootstrap"])
      .config(function ($routeProvider){
        $routeProvider
          .when("/create-event", {
              templateUrl: "partials/create-event.html",
              controller: "createEventController"
          })
          .when("/display-event", {
              templateUrl: "partials/display-event.html",
              controller: "displayController"
          })
            
          .otherwise({
            redirectTo : "/display-event"
          })         
      })
      .controller("createEventController", function($scope, $http, $modal){
          $scope.createEvent= function(){


             // $scope.time = {
             //   value: new Date(1999, 0, 1, 15, 30, 0)
             // };

            $http.post("./backend/insert.php",{'name':$scope.name, 'date':$scope.date, 'venue':$scope.venue, 'description':$scope.description, 'organizer':$scope.organizer, 'oemail':$scope.oemail})
            .success(function(){
              $scope.msg= "true";
              
            })
            $scope.callCreateModel = function() {
              alertModalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'partials/Popup-create-event.html',
                scope: $scope
              });
              $scope.createok = function () {
                alertModalInstance.close(true);
                $route.reload();
                $location.path( "/display-event" );

              };
              $location.path( "/display-event" );
            }  
            
          }

      })
      .controller("displayController", function($scope,$modal, $http,$route){


            
      $scope.example = {
        date: new Date("03/25/2015")
       
      };

        $scope.edit = function (editEventId) {
            $scope.editEventId=editEventId;

            $scope.editdate = $http({
              url: "./backend/edit.php", 
              method: "GET",
              params: {editEventId: editEventId}
            })
            .then(function mySucces(response) {
                $scope.editData = response.data;
            }, function myError(response) {
                $scope.editData = response.statusText;
            });

            // $http.post("./backend/edit.php",{'editEventId':$scope.editEventId})
            // .success(function(){
            //   $scope.msg="true";
            // })

            alertModalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'partials/Popup.html',
              scope: $scope
            });
            $scope.cancelDelete = function () {
              console.log("cancel");
              $scope.cancelb = "cancel clicked";
              alertModalInstance.dismiss('cancel');
            };

            $scope.updateEvent = function (id,name,date,org,eorg,venue,descrip) {
              $scope.updid=id;
              $scope.updname = name;
              $scope.upddate= date;
              $scope.updorg = org;
              $scope.updeorg = eorg;
              $scope.updvenue = venue;
              $scope.upddescrip= descrip;

              $http.post("./backend/update.php",{'id':$scope.updid, 'name':$scope.updname, 'date':$scope.upddate,'org':$scope.updorg,'eorg':$scope.updeorg, 'venue':$scope.updvenue,'descrip':$scope.upddescrip})
              .success(function(){
                $scope.msg="success updated";                
              })

              // $http.post("./backend/update.php",{'id':$scope.updid, 'name':name, 'date':date,'org':org,'eorg':eorg, 'venue':venue,'descrip':descrip})
              // .success(function(){
              //   $scope.msg="true";
              // })


              console.log("ok");
              $scope.msgUpdateFunction = "entering update";
              alertModalInstance.close(true);
              $route.reload();
            };
        }

        $scope.delete = function (deleteID,eventName) {
            $scope.deleteid = deleteID;
            $scope.eventName =eventName;
            $scope.deletemsg ="coming to delete";

            alertModalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'partials/Popup-delete.html',
              scope: $scope
            });
            $scope.cancelDelete = function () {
              console.log("cancel");
              $scope.cancelb = "cancel clicked";
              alertModalInstance.dismiss('cancel');
            };
            $scope.deleteConfirm = function (){
              $scope.deleteConfirmed="delete Confirmed";
              $http.post("./backend/delete.php",{'id':$scope.deleteid})
              .success(function(){
                $scope.msg="Deleted successfully";                
              })
              alertModalInstance.close(true);
              $route.reload();
            }
        }  

        $http.get("./backend/select.php")
        .success(function(data){
          $scope.data= data;
        })
      })
      .controller("generalController", function($scope){

      })


