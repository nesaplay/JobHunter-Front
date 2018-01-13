var BASE_URL = 'http://localhost:3333/api/reports'
var meta = JSON.parse(localStorage.getItem('CANDIDATE_ID'))
var homeButton = document.querySelector('.header-button')
var profilePicture = document.querySelector('.section-about-picture')
var cName = document.querySelector('.section-about-name')
var dob = document.querySelector('.section-about-dob')
var email = document.querySelector('.section-about-email')
var education = document.querySelector('.section-about-education')
var table = document.querySelector('.section-reports-table').getElementsByTagName('tbody')[0]

// Fetching reports
fetch(BASE_URL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        data
            .filter(function(report) {
                return report.candidateId === meta.id
            })
            .map(populateList)
    })

// Populating reports table
function populateList(report) {
    console.log(report);
    var newRow = table.insertRow(table.rows.length);

    var companyCell = newRow.insertCell(0);
    var companyText = document.createTextNode(report.companyName);
    companyCell.appendChild(companyText)

    var interviewCell = newRow.insertCell(1);
    var interviewText = document.createTextNode(new Date(report.interviewDate).toDateString());
    interviewCell.appendChild(interviewText)

    var statusCell = newRow.insertCell(2);
    var statusText = document.createTextNode(report.status);
    statusCell.appendChild(statusText)

}

// Appending candidate info
profilePicture.setAttribute('src', meta.avatar)
cName.textContent = meta.name
dob.textContent = new Date(meta.birthday).toDateString()
email.textContent = meta.email
education.textContent = meta.education



homeButton.addEventListener('click', function() {
    location.assign('index.html')
})
