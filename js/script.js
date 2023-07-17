document.addEventListener('DOMContentLoaded', function () {
    // Define the getSelectedFoodChoices function
    function getSelectedFoodChoices() {
        var selectedChoices = [];
        var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        for (var i = 0; i < checkboxes.length; i++) {
            selectedChoices.push(checkboxes[i].value);
        }
        return selectedChoices;
    }

    // Attach the event listener to the form submit event
    document.getElementById('survey-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission

        // Get form values
        var firstName = document.getElementById('first-name').value;
        var lastName = document.getElementById('last-name').value;
        var address = document.getElementById('address').value;
        var pincode = document.getElementById('pincode').value;
        var gender = document.getElementById('gender').value;
        var foodChoices = getSelectedFoodChoices();
        var state = document.getElementById('state').value;
        var country = document.getElementById('country').value;

        // Check if at least two food choices are selected
        if (foodChoices.length < 2) {
            alert('Please select at least two food choices.');
            return;
        }

        // Create new table row
        var row = document.createElement('tr');
        var rowData = [firstName, lastName, address, pincode, gender, foodChoices.join(', '), state, country];

        for (var i = 0; i < rowData.length; i++) {
            var cell = document.createElement('td');
            cell.innerText = rowData[i];
            row.appendChild(cell);
        }

        // Add delete button to the row
        var deleteButton = document.createElement('td');
        deleteButton.innerHTML = '<button class="btn btn-danger btn-link btn-delete">X</button>';
        row.appendChild(deleteButton);

        // Append new row to the table
        var tableBody = document.getElementById('tableBody');
        tableBody.appendChild(row);

        // Clear form fields
        document.getElementById('survey-form').reset();

        // Save table data to localStorage
        saveTableData();
    });

    // Save table data to localStorage
    function saveTableData() {
        var tableData = [];
        var tableRows = document.querySelectorAll('#tableBody tr');
        tableRows.forEach(function (row) {
            var rowData = [];
            var cells = row.querySelectorAll('td:not(:last-child)'); // Exclude the last cell with delete button
            cells.forEach(function (cell) {
                rowData.push(cell.innerText);
            });
            tableData.push(rowData);
        });

        localStorage.setItem('tableData', JSON.stringify(tableData));
    }

    // Load table data from localStorage on page load
    window.addEventListener('load', function () {
        var storedTableData = localStorage.getItem('tableData');
        if (storedTableData) {
            var tableData = JSON.parse(storedTableData);
            var tableBody = document.getElementById('tableBody');

            tableData.forEach(function (rowData) {
                var row = document.createElement('tr');
                rowData.forEach(function (cellData) {
                    var cell = document.createElement('td');
                    cell.innerText = cellData;
                    row.appendChild(cell);
                });

                // Add delete button to the row
                var deleteButton = document.createElement('td');
                deleteButton.innerHTML = '<button class="btn btn-link btn-delete">X</button>';
                row.appendChild(deleteButton);

                tableBody.appendChild(row);
            });
        }
    });

    // Add event listener to delete buttons for row deletion
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-delete')) {
            var row = e.target.parentNode.parentNode; // Get the row element
            row.parentNode.removeChild(row); // Remove the row from the table

            // Save table data to localStorage after row deletion
            saveTableData();
        }
    });
});
