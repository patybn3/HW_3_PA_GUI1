document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        handleSubmit(event);
    });
});


function handleSubmit(event) {
    event.preventDefault();

    // Get form inputs
    const multiplicandFrom = document.getElementById("multiplicandFrom").value;
    const multiplicandTo = document.getElementById("multiplicandTo").value;
    const multiplierFrom = document.getElementById("multiplierFrom").value;
    const multiplierTo = document.getElementById("multiplierTo").value;

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

    if((multiplicandFrom >= 1 && multiplicandFrom <= 50) ||
        (multiplicandTo >= 1 && multiplicandTo <= 50) ||
        (multiplierFrom >= 1 && multiplierFrom <= 50) ||
        (multiplierTo >= 1 && multiplierTo <= 50 )) {

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
else {
    const alert = bootstrap.Alert.getOrCreateInstance('#outOfBounds')
    alert.close()
}
}

function resetTable() {
    localStorage.clear();
    window.location.href = "index.html";
}
