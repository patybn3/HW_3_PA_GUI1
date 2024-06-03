document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        handleSubmit(event);
    });
});


function handleSubmit(event) {
    event.preventDefault();

    // Get form inputs
    var multiplicandFrom = document.getElementById("multiplicandFrom").value;
    var multiplicandTo = document.getElementById("multiplicandTo").value;
    var multiplierFrom = document.getElementById("multiplierFrom").value;
    var multiplierTo = document.getElementById("multiplierTo").value;

     // Check if inputs are within the specified range
     if (multiplicandFrom < 1 || multiplicandFrom > 50 ||
        multiplicandTo < 1 || multiplicandTo > 50 ||
        multiplierFrom < 1 || multiplierFrom > 50 ||
        multiplierTo < 1 || multiplierTo > 50) {
        document.getElementById('errorMessage').innerText = "Please enter numbers between 1 and 50.";
        document.getElementById('errorMessage').classList.remove('hidden');
        document.getElementById('errorMessage').style.display = 'block';

        // fade
        setTimeout(function() {
            document.getElementById('errorMessage').classList.add('hidden');
        }, 3000);
        return;
    }

    // Hide the error message if inputs are valid
    document.getElementById('errorMessage').classList.add('hidden');

    // here we wanna make sure the numbers are calculated in ascending order even if the user enters in descending order
    if(multiplicandFrom > multiplicandTo) {
        [multiplicandFrom, multiplicandTo] = [multiplicandTo, multiplicandFrom];
    }
    if(multiplierFrom > multiplierTo) {
        [multiplierFrom, multiplierTo] = [multiplierTo, multiplicandFrom]
    }

    // Store form inputs in localStorage
    localStorage.setItem("multiplicandFrom", multiplicandFrom);
    localStorage.setItem("multiplicandTo", multiplicandTo);
    localStorage.setItem("multiplierFrom", multiplierFrom);
    localStorage.setItem("multiplierTo", multiplierTo);

    // Fetch and display table.html content
    fetch('table.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('content').innerHTML = data;
        document.getElementById('formContainer').style.display = 'none';
        generateTable();
    });
}

function generateTable() {
    // Get the form inputs from localStorage
    const multiplicandFrom = parseInt(localStorage.getItem("multiplicandFrom"));
    const multiplicandTo = parseInt(localStorage.getItem("multiplicandTo"));
    const multiplierFrom = parseInt(localStorage.getItem("multiplierFrom"));
    const multiplierTo = parseInt(localStorage.getItem("multiplierTo"));

    const table = document.createElement("table");
    table.classList.add("table", "table-bordered");

    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headerCell = headerRow.insertCell();
    const img = document.createElement("img");
    img.src = "media/tableX.png";
    img.id = "tableImage";
    headerCell.appendChild(img);

    for (let i = multiplicandFrom; i <= multiplicandTo; i++) {
        const cell = headerRow.insertCell();
        cell.textContent = i;
    }

    const tbody = table.createTBody();
    for (let i = multiplierFrom; i <= multiplierTo; i++) {
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.textContent = i;
        for (let j = multiplicandFrom; j <= multiplicandTo; j++) {
            const cell = row.insertCell();
            cell.textContent = i * j;
        }
    }

    document.getElementById("tableContent").innerHTML = "";
    document.getElementById("tableContent").appendChild(table);
}

function resetTable() {
    localStorage.clear();
    window.location.href = "index.html";
}
