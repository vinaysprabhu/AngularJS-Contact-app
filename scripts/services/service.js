angular.module('myApp')
	.service('friendService', function friendService ($http, $q, $rootScope){

		// name of the service taking current scope
		var list = this;
		list.friendsList = {};

		list.getAllfriends = function(name){
			var defer = $q.defer();

			$http.get($rootScope.endPoint + name + '/friends')
			.success(function(res){
				list.friendsList = res;
				defer.resolve(res); 
			})
			.error(function(err, status){
				defer.reject(err);
			})
			return defer.promise;
		}

		list.createUser = function(uname,fname,lname,email,contact,address){
			var defer = $q.defer();

			$http({
		        url: $rootScope.endPoint + uname + '/friends',
		        method: "POST",
		        data: { fname : fname, lname: lname, email:email, contact:contact, address:address }
		    })
		    .success(function(res){
				console.log("Friend added Successfully!");
				defer.resolve(res);
			})
			.error(function(err, status){
				console.log("Friend added Failed !");
			})

			return defer.promise;
		}

		list.updateContact = function(uname,id,fname,lname,email,contact,address){
			var defer = $q.defer();

			$http({
		        url: $rootScope.endPoint + uname + '/friends/'+ id,
		        method: "PUT",
		        data: { fname : fname, lname: lname, email:email, contact:contact, address:address }
		    })
		    .success(function(res){
				console.log("Friend Updated Successfully!");
				defer.resolve(res);
			})
			.error(function(err, status){
				console.log("Friend Updated Failed !");
			})


			return defer.promise;
		}

		list.getSingleContact = function(id,uname){
			var defer = $q.defer();

			$http({
		        url: $rootScope.endPoint + uname + '/friends/' + id,
		        method: "GET"
		    })
		    .then(function(data) {
		        // success
		        console.log("Here's a friend!", data);
		        list.friendsList = data;
				defer.resolve(data);
		    }, 
		    function(data) { // optional
		        // failed
		        console.log("Could not able to get contact details !");
		    });

			return defer.promise;
		}



		list.deleteContact = function(uname,id){
			var defer = $q.defer();

			$http.delete($rootScope.endPoint + uname + '/friends/' + id)
			.success(function(res){
		        console.log('Friend Deleted Successfully!');
				defer.resolve(res); 
			})
			.error(function(err, status){
				defer.reject(err);
			})

			// $http({
		 //        url: $rootScope.endPoint + uname + '/friends/' + id,
		 //        method: "DELETE"
		 //    })
		 //    .then(function(data) {
		 //        // success
		 //        console.log('Friend Deleted Successfully!');
		 //    }, 
		 //    function(data) { // optional
		 //        // failed
		 //        console.log("Could not able to delete contact!");
		 //    });

			return defer.promise;
		}

		return list;

	});