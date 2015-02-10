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
    //new person = personModel({ fir)
    
    var person = new personModel({ firstName: this.firstName,
                                   lastName: this.lastName,
                                   email: this.email,
                                   identityNumber: this.identityNumber,
                                   birthDate: this.birthDate
    });
    
    person.save(function(err, person) {
        if(err) { fn(err); }
        fn(null, person);
    });
};

// Methods for person db
Person.delete = function(fn) {
    
};

Person.deleteAll = function(fn) {
    
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

Person.edit = function(fn) {
    
};