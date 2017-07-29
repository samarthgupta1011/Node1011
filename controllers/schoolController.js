	var mongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://localhost/schoolDb';

	var getStd = function(request,response){

	mongoClient.connect(url,function(err,db){
		if(err) throw err;
		db.collection('students').find().toArray(function(err,students){
			if(err) throw err;
			response.send(students);
			db.close();
		});

	});
	};


	var addStd = function(request,response){ 
		mongoClient.connect(url,function(err,db){
			if(err) throw err;

			//Check if email already exists or not
			var query = {
				email : request.body.email
			}

			db.collection('students').findOne(query,function(err,std){
				//If student with email exists
				if(std){
					response.send({"error":true, 
						"message":"Email already registered"});
				}

				else {
						var stdDetails = {
					name : request.body.name,
					age : request.body.age,
					email : request.body.email,
					password : request.body.password,
					address : {
						country : request.body.address.country,
						state : request.body.address.state
					}

				};

				db.collection('students').insert(stdDetails,function(err,std){

	if(err) throw err;
				response.send({"error":false, 
						"message":"Success"});
				db.close();

				});
				}
			});
		});

	};

	var loginStd = function(request,response){
	mongoClient.connect(url,function(err,db){
		if(err) throw err;

		var query = {
			email : request.body.email
		};

		db.collection('students').findOne(query,function(err,std){
			if(err) throw err;

			//If email is found, check password (std not null)
			if(std){
				if(std.password==request.body.password){
					response.send({"error": false, 
					"message":"Login success"});
				}

				else {
					response.send({"error": true, 
					"message":"Incorrect password entered"});
				}
			}

			//Email not found
			else {
				response.send({"error": true, 
					"message":"Please register"});
			}
			
			db.close();
		});
	});
	};

	var getTeachers = function(request,response){
		mongoClient.connect(url,function(err,db){
			if(err) throw err;

			db.collection('teachers').find().toArray(function(err,teachers){
				response.send(teachers);
			});
			db.close();
		});
	};

		var updateStd = function(request,response){
			mongoClient.connect(url,function(err,db){
				if(err) throw err;

				//If name is sent in body
				if(request.body.name){
				db.collection('students').update({email:request.query.email},
					{$set : {name:request.body.name}},function(err,std){
						if(err) throw err;
						// response.send(std);
					});
			}
				//If  age is sent 
				if(request.body.age){
				db.collection('students').update({email:request.query.email},
					{$set : {age:request.body.age}},function(err,std){
						if(err) throw err;
						// response.send(std);
					});
			}

			if(request.body.address){
				db.collection('students').update({email:request.query.email},
					{$set : {address:request.body.address}},function(err,std){
						if(err) throw err;
						// response.send(std);
					});
			}

			response.send({"Updated":true});



			});
		};

		var getStdNames = function(request,response){
			mongoClient.connect(url,function(err,db){
				if(err) throw err;

				db.collection('students').find({},{name:1,_id:0}).toArray(function(err,stds){
					if(err) throw err;
					response.send(stds);
				});

			});
		};

	module.exports = {
	getStd : getStd,
	addStd :addStd,
	loginStd : loginStd,
	updateStd : updateStd,
	getStdNames : getStdNames,
	getTeachers : getTeachers

	};