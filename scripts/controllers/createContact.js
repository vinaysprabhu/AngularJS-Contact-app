'use strict'; 
var app = angular.module("myApp")
.controller('createContactController', function($scope,friendService,growl,$location){

	$scope.username;

	$scope.showSuccess = function(){
		growl.success('Username and your first contact is created', {ttl: 5000, title:"Success"});
	}
	$scope.showError = function(){
		growl.error('Sorry Unable to create username', {ttl: 5000, title:"Error"});
	}

    $scope.getAllFriends = function(name){
    	return friendService.getAllfriends(name)
	}  
	$scope.check = function(name){
     	$scope.username= name;
     	$scope.availableMsg = "";
     	$scope.getAllFriends($scope.username)
	        .then(function(data) {
	        	console.log(data);
	        	$scope.dataLength = data.length;

	        	if($scope.dataLength == 0 && name.length!==0 ){
	            	$scope.availableMsg = "Available";
	            	$scope.unavailableMsg = " ";
	            } else{
	            	$scope.availableMsg = " ";
	            	$scope.unavailableMsg = "Sorry not Available";
                }

	        }, function(err) {
	            //error
	        });	
    }

    $scope.createNewUser = function(uname,fname,lname,email,contact,address){
    	return friendService.createUser(uname,fname,lname,email,contact,address)
	} 

    $scope.create = function(uname,fname,lname,email,contact,address){
    	$scope.flag= " ";
    	console.log(uname + " "+ fname + " "+ lname + " "+ email + " "+ contact + " "+ address);
    	$scope.createNewUser(uname,fname,lname,email,contact,address)
    		.then(function(data){
    			$scope.flag= "true";
    			console.log(data);
    			$location.path("/");
    		}, function(err){
    			//error
    		});
    	if($scope.flag)	{
    		$scope.showSuccess();
    	}else{
    		$scope.showError();
    	}
    }	

});
