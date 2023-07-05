// listens (waits for) for the submit, which occurs when the user submits the form 
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // creates a new instance of the FormData object and initializes it with the data from the HTML form element referenced by the this keyword.
    // FormData is  key-value pairs representing form data
    var formData = new FormData(this);

    var globalFile = document.getElementById('globalfile').files[0];
    var patientFile = document.getElementById('patientfile').files[0];
    var dataVisFile = document.getElementById('fileInput').files[0];

    // send the form data to the backend, initiates a network request to /process-files url
    // when fetch function is called with /process-files URL and POST method, it sends a POST HTTP request to the specified URL
    // the Flask app routes the request to the view function that corresponds to that route. route is a way to map a URL to a spesific view function.

    if (globalFile && patientFile) {
    // Either the global sheet or patient sheet is empty
        fetch('/process-files', {
            method: 'POST',
            body: formData
        })
        .then(function(response) {
            return response.blob();
        })
        .then(function(blob) {
            var url = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = 'modified_global.xlsx';
            link.click();
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
    }
    if (dataVisFile) {
        fetch('/process-datavis', {
            method: 'POST',
            body: formData
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
    }
});
