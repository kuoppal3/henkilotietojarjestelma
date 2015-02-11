var Person = require('.././persondb');

// Lists everybody
exports.list = function(req, res) {
    // Find all the people from
    Person.fetchAll(function(err, people) {
        if(err) { throw err; }
        if(people === undefined) {
            res.render('people', { people: [] });
        } else {
            res.render('people', { people: people });
        }
    });
};

// Validates person and adds it to mongodb 
exports.add = function(req, res) {
    
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var identityNumber = req.body.identityNumber;
    var email = req.body.email;
    var birthDate = req.body.birthDate;

    // New person
    var newPerson = new Person({
        firstName: firstName,
        lastName: lastName,
        identityNumber: identityNumber,
        email: email,
        birthDate: birthDate
    });
    
    // Add it to mongodb
    newPerson.add(function(err, person){
        if(err) throw err;
        res.status(200);
        res.send('Person added successfully');
    });
};

// Deletes all the people from mongodb
exports.deleteAll = function(req, res) {
    Person.deleteAll(function(err) {
        if(err) { throw err; }
        res.status(200);
        res.send('Deleted successfully');
    });
};

// Deletes one person from mongodb
exports.deleteOne = function(req, res) {
    var personId = req.params.id;
    Person.delete(personId, function(err) {
        if(err) { throw err; }
        res.status(200);
        res.send('Deleted successfully');
    });
};

// Gets one person
exports.getOneToEdit = function(req, res) {
    // Get one person from database
    var personId = req.params.id;
    console.log(personId);
    
    Person.fetchOne(personId, function(err, personToEdit) {
        if(err) { throw err; }
        if(personToEdit === undefined) {
            
        } else {
            res.render('person', { person: personToEdit });
        }
    });
};

// Edits person
exports.edit = function(req, res) {
    var personId = req.body.id;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var identityNumber = req.body.identityNumber;
    var email = req.body.email;
    var birthDate = req.body.birthDate;
 
    // Find person from db
    Person.edit(personId, firstName, lastName, identityNumber, email,
                birthDate, function(err) {
        if(err) { throw err; }
        // Respond if edited successfully
        res.status(200);
        res.send('Person edited successfully');
    });

};

