'use strict'; 
var app = angular.module("myApp")
.controller('addFriend', function($scope,friendService,$rootScope,$modal,growl){
	$scope.user= $rootScope.rootName ;
	$scope.firstName= " ";

    $scope.showSuccess = function(){
        growl.success('Contact Created', {ttl: 5000, title:"Success"});
    }
    $scope.showError = function(){
        growl.error('Sorry Unable to create username', {ttl: 5000, title:"Error"});
    }


	// $scope.addMyFriend = function(name){
 //    	return friendService.getAllfriends(name)
	// } 

	// $scope.addFriend = function(fname,lname,email,contact,address){

 //     	$scope.getAllFriends($scope.user,fname,lname,email,contact,address)
	//         .then(function(data) {
	//         	console.log(data); 

	//         }, function(err) {
	//             //error
	//         });	
 //    }

    $scope.createNewUser = function(uname,fname,lname,email,contact,address){
    	return friendService.createUser(uname,fname,lname,email,contact,address)
	} 


    $scope.callFriendAddedModel = function() {
      alertModalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: './partials/popups/pop-friend-added.html',
        scope: $scope
      });
      $scope.ok = function () {
        alertModalInstance.close(true);
        $route.reload();
        $location.path("/add-and-display");

      };
      $location.path("/add-and-display");
    } 

    $scope.addFriend = function(fname,lname,email,contact,address){
        $scope.flag= " ";
    	$scope.firstName= fname;
    	console.log(fname + " "+ lname + " "+ email + " "+ contact + " "+ address);
    	$scope.createNewUser($scope.user,fname,lname,email,contact,address)
    		.then(function(data){
                $scope.flag= "true";
    			$scope.callFriendAddedModel();
    			console.log(data);
    		}, function(err){
    			//error
    		});
        if($scope.flag) {
            $scope.showSuccess();
        }else{
            $scope.showError();
        }    
    }

});
