// Ajax calls for person
// POSTs person's data to the server
function personAdd() {
    var data = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                identityNumber: document.getElementById('identityNumber').value,
                birthDate: document.getElementById('birthDate').value
            };
            
    $.ajax({
        url: '/people',
        type: 'POST',
        data: data,
        success: function(result) {
          // Redirect to people listing
          window.location.href = "/";
        }
    });
}

// PUTs person's data to server
function personEdit(personId) {
    // This data is sent to the server
    var data = { id: personId,
                 firstName: document.getElementById('firstName').value,
                 lastName: document.getElementById('lastName').value,
                 email: document.getElementById('email').value,
                 identityNumber: document.getElementById('identityNumber').value,
                 birthDate: document.getElementById('birthDate').value
                };
                
    $.ajax({
        url: '/people/' + personId,
        type: 'PUT',
        data: data,
        success: function(result) {
          // Redirect to people listing
          window.location.href = "/people";
        }
    });
}

// DELETEs one person from the server
function personDelete(personId) {
    $.ajax({
        url: '/people/' + personId,
        type: 'DELETE',
        success: function(result) {
          // Refresh site
          window.location.href = "/people";
        }
    });
}

// DELETEs all the people from the server
function personDeleteAll() {
    $.ajax({
        url: '/people',
        type: 'DELETE',
        success: function(result) {
          // Refresh site
          window.location.href = "/people";
        }
    });
}