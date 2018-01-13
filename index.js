const BASE_URL = 'http://localhost:3333/api'
const IMG_PLACEHOLDER =
    'https://akommo.com/static/img/email/person_placeholder.png'
const candidateList = document.querySelector('.section-content')
const homeButton = document.querySelector('.header-button')

// fetching candidates data
fetch(`${BASE_URL}/candidates`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        candidateList.innerHTML = data.map(populateList).join('')
    })

function populateList(person) {
    person.avatar = person.avatar || IMG_PLACEHOLDER
    const meta = JSON.stringify(person)

    return `
            <article>
                <div class='section-content-item' data-meta='${meta}'>
                    <img src=${person.avatar} />  
                    <span class='item-name'>${person.name}</span>
                    <span class='item-email'>${person.email}</span>
                </div>
            </article>
        `
}

homeButton.addEventListener('click', function() {
    location.assign('index.html')
})

document.addEventListener('click', function(e) {
    if (e.target && e.target.className === 'section-content-item') {
        // get meta from data attribute and store it in localStorrage
        var meta = e.target.getAttribute('data-meta')
        localStorage.setItem('CANDIDATE_ID', meta)
        // redirect to candidate.html
        location.assign('candidate.html')
    }
})
