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

Person.prototype.add = function(fn) {
    var that = this;
    
    // New personmodel
    var person = new personModel({ firstName: this.firstName,
                                   lastName: this.lastName,
                                   email: this.email,
                                   identityNumber: this.identityNumber,
                                   birthDate: this.birthDate
    });
    
    // Save model to the db
    person.save(function(err, person) {
        if(err) { fn(err); }
        fn(null, person);
    });
};

//
// Methods for person db
//
Person.delete = function(personId, fn) {
    personModel.remove({"_id": personId}, function(err) {
        if(err) { fn(err); }
        fn(null);
    });
};

Person.deleteAll = function(fn) {
    personModel.remove({}, function(err) {
        if(err) { fn(err); }
    });
};

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

Person.edit = function(personId, firstName, lastName, identityNumber, email,
                       birthDate, fn) {
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
};