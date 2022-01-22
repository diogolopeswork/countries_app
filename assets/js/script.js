$(function () {
    getData()
    addContinents()

    $(document).on('click', '.toggle-btn', function (e) {
        $('body').toggleClass('dark', 'slow', 'linear')
    })

    $('#search-country').keyup(function (e) {
        if (e.which == 13) {
            let val = $('#search-country').val()
            getCountry(val)
        }
    })

    $(document).on('click', 'a.dropdown-item', function (e) {
        let val = $(this).data('target')
        filterRegion(val)
    })

    $(document).on('click', '.countries-content .col', function (e) {
        let target = $('.countries-card').data('target')
        modalData(target)

        $('.countries-container').hide('slide', {
            direction: 'right'
        }, 300)

        $('.countries-modal').show('slide', {
            direction: 'left'
        }, 500)
    })

    $(document).on('click', '.prev-btn', function (e) {
        $('.countries-container').show('slide', {
            direction: 'right'
        }, 300)

        $('.countries-modal').hide('slide', {
            direction: 'left'
        }, 500)
    })
})

function getData() {
    $.get('https://restcountries.com/v3.1/all')
        .then(function (data) {
            addCountriesData(data)
        })

        .fail(function () {
            displayError(msg = "Couldn't Load The Countries!")
        })
}

function getCountry(val) {
    if ($('#search-country').val() !== '') {
        $.get(`https://restcountries.com/v3.1/name/${val}`)
            .then(function (response) {
                addCountriesData(response)
            })
            
            .fail(function () {
                displayError(msg = "Couldn't Find The Country!")
            })
    } else {
        displayError(msg = "Couldn't Find The Country!")
        setTimeout(() => {
            getData()
            $('.err-fetch').remove()
        }, 2000)
    }

    $('.countries-content').empty()
}

function filterRegion(val) {
    $.get(`https://restcountries.com/v3.1/region/${val}`)
        .then(function (data) {
            addCountriesData(data)
        })

        .fail(function () {
            displayError(msg = "Couldn't Load The Countries!")
        })

    $('.countries-content').empty()
}

function addContinents() {
    let arr = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

    for (let i = 0; i < arr.length; i++) {
        let elem = $(`
            <li><a class="dropdown-item" href="#" data-target="${arr[i]}">${arr[i]}</a></li>
        `)
        $('.dropdown-menu').append(elem)
    }
}

function addCountriesData(data) {
    let row = $(`<div class="row countries-row"></div>`)
    console.log(data)

    for (let i = 0; i < data.length; i++) {
        let cFlag = data[i].flags.png
        let cName = data[i].name.common
        let cPopulation = data[i].population
        let cContinent = data[i].region
        let cCapital = data[i].capital

        let card = $(`
            <div class="col m-3">
                <div class="countries-card" data-target="${data[i].alpha3Code}">
                    <div class="countries-card-top">
                        <img src="${cFlag}" alt="${cFlag}">
                    </div>
                    <div class="countries-card-bottom">
                        <h5 class="countries-name fw800 mt-3">${cName}</h5>
                        <p class="countries-details fw600 m-0">Population: <span class="countries-stats fw-lighter">${cPopulation.toLocaleString()}</span></p>
                        <p class="countries-details fw600 m-0">Region: <span class="countries-stats fw-lighter">${cContinent}</span></p>
                        <p class="countries-details fw600 m-0">Capital: <span class="countries-stats fw-lighter">${cCapital}</span></p>
                    </div>
                </div>
            </div>
        `)
        $(row).append(card)
    }
    $('.countries-content').prepend(row)
}

function displayError(msg) {
    let elem = $(`
        <div class="err-fetch px-3">
            <h6 class="text-danger">${msg}</h2>
        </div>
    `)

    if ($('.err-fetch').length >= 1) {
        $('.err-fetch').first().remove()
    }
    $('.countries-container').append(elem)
}

function modalData(data) {
    console.log(data)
}