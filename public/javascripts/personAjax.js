// Ajax calls for person
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

function personDeleteAll() {
    $.ajax({
        url: '/people',
        type: 'DELETE',
        success: function(result) {
          // Refresh site
          window.location.href = "/";
        }
    });
}