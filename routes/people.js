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
    var firstName = req.body.etunimi;
    var lastName = req.body.sukunimi;
    var identityNumber = req.body.henkilotunnus;
    var email = req.body.sahkoposti;
    var birthDate = req.body.syntymaaika;
    
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
    });
    
    // First and last name field validation

    // Last name field validation
    
    // Identity number validation (Finnish form)
    
    // Email validation
    
    // Birthdate validation (have to be form like 1.14.1954)
    
    
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
    
};

