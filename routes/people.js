// Lists everybody
exports.list = function(req, res) {
    
};

// Validates person and adds it to mongodb 
exports.add = function(req, res) {
    var firstName = req.body.etunimi;
    var lastName = req.body.sukunimi;
    var identityNumber = req.body.henkilotunnus;
    var email = req.body.sahkoposti;
    var birthDate = req.body.syntymaaika;
    
    // First and last name field validation

    // Last name field validation
    
    // Identity number validation (Finnish form)
    
    // Email validation
    
    // Birthdate validation (have to be form like 1.14.1954)
    
    
};

// Deletes all the people from mongodb
exports.deleteAll = function(req, res) {
    
};

// Deletes one person from mongodb
exports.deleteOne = function(req, res) {
    
};

// Gets one person
exports.getOne = function(req, res) {
    
};

// Edits person
exports.edit = function(req, res) {
    
};

