'use strict'

var request = require('request');

describe("server", function() {

  it("should fetch a ride's details", function(done) {
    request.get('http://localhost:8000/api/rides/1', function(error, response, body) {
      body = JSON.parse(body);
      //console.log(body);
      expect(body.id).toEqual(1);
      done();
    });
  });

  it("should fetch a user's feedback", function(done) {
    request.get('http://localhost:8000/api/feedback/wozniew1@illinois.edu', function(error, response, body) {
      body = JSON.parse(body);

      for (var i = 0; i < body.length; i++) {
        if (body[i].from === 'gli24@illinois.edu') {
          expect(body[i].score).toEqual(5);
        }
        else if (body[i].from === 'bajekal1@illinois.edu') {
          expect(body[i].score).toEqual(4);
        }
      }
      done();
    });
  });

  

  it("should add a user's feedback", function(done) {
    var callback = jasmine.createSpy();
    
    var feedbackJSON = {"from": "wyang15@illinois.edu",
                        "to": "wozniew1@illinois.edu",
                        "ride_id": 1,
                        "comment": "good ride",
                        "score": 1 };
    request(
      { method: 'POST', 
      uri: 'http://localhost:8000/api/feedback/wozniew1@illinois.edu', 
      json: feedbackJSON
      }, callback
    );
   
    // Check for response message 
    waitsFor(function() {
      return callback.callCount > 0;
    });
    runs(function() {
      expect(callback).toHaveBeenCalled();
    });
    
    done();
  });
  
  it("should remove a rider from a ride", function(done) {
    var callback = jasmine.createSpy();

    request({
      method: 'DELETE',
      uri: 'http://localhost:8000/api/rider', 
      json: {
        email: 'test@test.edu',
        ride_id: 1
      }
    }, callback
    );

    // Check for response message 
    waitsFor(function() {
      return callback.callCount > 0;
    });
    runs(function() {
      expect(callback).toHaveBeenCalled();
    });

    done();
  });
}); 

/*
describe("server", function() {
	it("should get a list of user rides", function(done) {
		request.get('http://localhost:8000/api/userrides/wozniew1', function(error, response, body) {
			body = JSON.parse(body);
			expect(body[0].id).toEqual(1);
			expect(body[0].riders.length).toEqual(3);
			done();
		})
	});
});
*/
