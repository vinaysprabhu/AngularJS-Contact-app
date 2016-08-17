'use strict'; 
var app = angular.module("myApp")
.controller('addAndDisplay', function($scope,friendService,$rootScope, $modal,$route,growl){
	$scope.user= $rootScope.rootName ;

	$scope.allContacts = {};
	$scope.editdata = {}; 

	$scope.showSuccess = function(){
        growl.success('Contact updated successfully', {ttl: 5000, title:"Success"});
    }
    $scope.showError = function(){
        growl.error('Sorry unable to update', {ttl: 5000, title:"Error"});
    }


	$scope.showDeleteSuccess = function(){
        growl.success('Contact deleted successfully', {ttl: 5000, title:"Success"});
    }
    $scope.showDeleteError = function(){
        growl.error('Sorry unable to delete', {ttl: 5000, title:"Error"});
    }


	var init = function(){
	    $scope.getAllFriends($rootScope.rootName)
	        .then(function(data) {
	        	console.log(data);
	        	$scope.allContacts = data;
	        }, function(err) {
	            //error
	        });	
	}
	$scope.getAllFriends = function(name){
        return friendService.getAllfriends(name)
	}
	init();

	$scope.getSingleContactFunc = function(id,uname){
		return friendService.getSingleContact(id,uname);
	}

	$scope.edit = function(id){
		$scope.id= id;
		$scope.getSingleContactFunc($scope.id,$rootScope.rootName)
	        .then(function(data) {
	        	$scope.editdata = data.data;
	        }, function(err) {
	            //error
	        });

		var alertModalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'partials/popups/editFriend.html',
              scope: $scope
            });
            $scope.cancelDelete = function () {
              $scope.cancelb = "cancel clicked";
              alertModalInstance.dismiss('cancel');
            };
	}

	$scope.updateMyContact = function(uname,id,fname,lname,email,contact,address){
		return friendService.updateContact(uname,id,fname,lname,email,contact,address);
	}

	$scope.update =function(uname,id,fname,lname,email,contact,address){
		$scope.flag= " ";
		$scope.updateMyContact(uname,id,fname,lname,email,contact,address)
			.then(function(data){
				$scope.flag= "true";
				$route.reload();
			}, function(err){
				//error
			});
		if($scope.flag) {
            $scope.showSuccess();
        }else{
            $scope.showError();
        }  	
	}


	$scope.deleteMyContact =function(uname,id){
		return friendService.deleteContact(uname,id);

	}

	$scope.deleteContactFunc = function (id,fname){
		$scope.flag= " ";		
		$scope.id= id;
		$scope.fname= fname;
		var alertModalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'partials/popups/deleteFriend.html',
              scope: $scope
            });
            $scope.cancelDelete = function () {
              $scope.cancelb = "cancel clicked";
              alertModalInstance.dismiss('cancel');
            };
            $scope.delete = function() {
	            $scope.deleteMyContact($scope.user,id)
				    .then(function(data){
					    // success
						$scope.flag= "true";
					    $route.reload();
				    }, function(err){
					    //error
				    });
				if($scope.flag) {
		            $scope.showDeleteSuccess();
		        }else{
		            $scope.showDeleteError();
		        }     
			    // $route.reload();
	        };
	}

});
