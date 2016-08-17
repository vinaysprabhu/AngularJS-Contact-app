'use strict'; 
var app = angular.module("myApp")
.controller('mainController', function($scope,friendService,$window, $rootScope){
	$scope.enterName="Please enter your username*";
	$scope.validateMsg = "";	
	$scope.myNameValidate = function(name){
		$rootScope.rootName = name;
		$scope.lengthVal;
	    $scope.getAllFriends(name)
	        .then(function(data) {
	            $scope.lengthVal = data.length;
	            console.log("data from function",$scope.lengthVal);
	            if($scope.lengthVal == 0){
	            	$scope.validateMsg = "Username not found.. Click above link to create user";
	            } else{
	            	$scope.validateMsg = "";
	            	$window.location.href = '#/add-and-display';
	            }
	        }, function(err) {
	            //error
	        });	
	}
	
	$scope.getAllFriends = function(name){
        return friendService.getAllfriends(name)
	}

});
