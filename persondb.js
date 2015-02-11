// Mongodb to store person's information

// Mongoose schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var personSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    identityNumber: String,
    birthDate: String
});

var personModel = mongoose.model('Person', personSchema);

module.exports = Person;

function Person(obj) {
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.email = obj.email;
    this.identityNumber = obj.identityNumber;
    this.birthDate = obj.birthDate;
}

// Adds new person
Person.prototype.add = function(fn) {
    var that = this;
    // If data is valid, add person to mongodb
    Person.validateData(that.firstName, that.lastName, that.identityNumber,
                        that.email, that.birthDate, function(err, isValid) {
        if(err) { throw err; }
        if(isValid) {
            // New personmodel
            var person = new personModel({ firstName: that.firstName,
                                           lastName: that.lastName,
                                           email: that.email,
                                           identityNumber: that.identityNumber,
                                           birthDate: that.birthDate
            });
            
            // Save model to the db
            person.save(function(err, person) {
                if(err) { fn(err); }
                fn(null, person);
            });
        }
    });
};

//
// Methods for person db
//

// Deletes one person from db
Person.delete = function(personId, fn) {
    personModel.remove({"_id": personId}, function(err) {
        if(err) { fn(err); }
        fn(null);
    });
};

// Deletes all the people from the db
Person.deleteAll = function(fn) {
    personModel.remove({}, function(err) {
        if(err) { fn(err); }
    });
};

// Finds all from the db
Person.fetchAll = function(fn) {
    personModel.find({}, function(err, people) {
        if(err) { fn(err); }
        // If db is empty
        if(people.length === 0) {
            fn();
        } else {
            fn(null, people);
        }
    });
};

// Finds one person from the db
Person.fetchOne = function(personId, fn) {
    personModel.find({ "_id": personId }, function(err, person) {
        if(err) { fn(err); }
        if(person.length === 0) {
            fn();
        } else {
            fn(null, person);
        }
    });
};

// Edits a person and checks if data is valid 
Person.edit = function(personId, firstName, lastName, identityNumber, email,
                       birthDate, fn) {
    // If data is valid, find person and save edited person
    Person.validateData(firstName, lastName, identityNumber, email, birthDate, function(err, isValid) {
        if(err) { throw err; }
        if(isValid) {
            personModel.findOne({ "_id": personId }, function(err, person) {
                if(err) { fn(err); }
                if(person.length === 0) {
                    
                } else {
                    person.firstName = firstName;
                    person.lastName = lastName;
                    person.identityNumber = identityNumber;
                    person.email = email;
                    person.birthDate = birthDate;
                    person.save(function(err) {
                        if(err) { fn(err); }
                        fn(null, person);
                    });
                }
            });
        } else {
            // Not valid
            console.log("not valid");
        }
    });

};

// Validates person's name, identity number, email and birth date
Person.validateData = function(firstName, lastName, identityNumber, email,
                       birthDate, fn) {
    if(firstName === '' || lastName === '' || identityNumber === '' ||
       email === '' || birthDate === '') {
        fn(null, false); 
    // Very simple regex for email
    } else if(!email.match(/\S+@\S+\.\S+/)) {
        fn(null, false);
    // Parse date using JavaScript Date-object
    } else if(!parseDate(birthDate)) {
        fn(null, false);               
    // Regex for Finnish identity number. This just checks that the form is okay,
    // but it doesn't check if number matches with birth date
    } else if(!identityNumber.match(/\d{6}[+-A]\d{3}\w/)) {
        fn(null, false);
    // Otherwise the data is valid
    } else {
        fn(null, true);
    }
};

// Parses date using JavaScript's Date-object
function parseDate(str) {
  var m = str.match(/^(\d{1,2}).(\d{1,2}).(\d{4})$/);
  return (m) ? new Date(m[3], m[2]-1, m[1]) : null;
}
