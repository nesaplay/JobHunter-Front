;(function() {
    var BASE_URL = 'http://localhost:3333/api'
    var IMG_PLACEHOLDER =
        'https://akommo.com/static/img/email/person_placeholder.png'
    var candidateList = document.querySelector('.section-content')
    var homeButton = document.querySelector('.header-button')
    var search = document.querySelector('.search-field')
    var candidates = []

    // fetching candidates data
    fetch(`${BASE_URL}/candidates`)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            candidates = data
            candidateList.innerHTML = candidates.map(populateList).join('')
        })

    function populateList(person) {
        person.avatar = person.avatar || IMG_PLACEHOLDER
        var meta = JSON.stringify(person)

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

    // Event Listeners
    homeButton.addEventListener('click', function() {
        location.assign('index.html')
    })

    search.addEventListener('keyup', function(e) {
        var query = e.target.value.toLowerCase()
        candidateList.innerHTML = candidates
            .filter(function(candidate) {
                return candidate.name.toLowerCase().includes(query)
            })
            .map(populateList)
            .join('')
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
})()
