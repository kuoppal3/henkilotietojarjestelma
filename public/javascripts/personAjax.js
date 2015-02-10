// POST, PUT and DELETE requests for person
function personAdd() {
    
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