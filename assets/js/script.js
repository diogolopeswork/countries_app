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

    $(document).on('click', '.countries-card', function (e) {
        let target = $(this).data('target')
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

        $('.countries-modal-content').empty()
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

    for (let i = 0; i < data.length; i++) {
        let cFlag = data[i].flags.png
        let cName = data[i].name.common
        let cPopulation = data[i].population
        let cContinent = data[i].region
        let cCapital = data[i].capital
        let cCode = data[i].cca3
        
        if(cCapital == undefined) {
            cCapital = 'N/A'
        }

        let card = $(`
            <div class="col m-3">
                <div class="countries-card" data-target="${cCode}">
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

    setTimeout(() => {
        if ($('.err-fetch').length >= 1) {
            $('.err-fetch').first().remove()
        }
    }, 3000)
    $('.countries-container').append(elem)
}

function modalData(data) {
    $.get(`https://restcountries.com/v3.1/alpha/${data}`)
        .then(function (response) {
            let cFlag = response[0].flags.png
            let cName = response[0].name.common
            let cPopulation = response[0].population
            let cRegion = response[0].region
            let cSubRegion = response[0].subregion
            let cCapital = response[0].capital[0]
            let cDomain = response[0].tld[0]
            let cCurrency = response[0].currencies
            let cLanguages = response[0].languages
            let cBorders = response[0].borders.join(' ,')

            let cLangs = Object.keys(cLanguages).map(function(key, index) { 
                return cLanguages[key] 
            }).join(', ')

            let cCurrencies = Object.keys(cCurrency).map(function(key, index) { 
                return cCurrency[key].name
            }).join(', ')

            let elem = $(`
                <div class="row w-100 p-3">
                    <div class="col-sm-6 modal-country-flag d-flex flex-column align-items-start justify-content-start">
                        <img src="${cFlag}">
                    </div>
                    <div class="col-sm-6 d-flex flex-column align-items-start justify-content-start p-3">
                        <h3 class="modal-country-name fw600">${cName}</h3>
                        <div class="row w-100">
                        <div class="col-lg-6 mt-3">
                            <h6 class="fw600 pt-2">Population: <span class="fw-lighter">${cPopulation.toLocaleString()}</span></h6>
                            <h6 class="fw600 pt-2">Region: <span class="fw-lighter">${cRegion}</span></h6>
                            <h6 class="fw600 pt-2">Sub Region: <span class="fw-lighter">${cSubRegion}</span></h6>
                            <h6 class="fw600 pt-2">Capital: <span class="fw-lighter">${cCapital}</span></h6>
                        </div>
                        <div class="col-lg-6 mt-3">
                            <h6 class="fw600 pt-2">Top Level Domain: <span class="fw-lighter">${cDomain}</span></h6>
                            <h6 class="fw600 pt-2">Currencies: <span class="fw-lighter">${cCurrencies}</span></h6>
                            <h6 class="fw600 pt-2">Languages: <span class="fw-lighter">${cLangs}</span></h6>
                        </div>
                        <div class="col-12">
                            <h6 class="fw600 pt-4">Border Countries: ${cBorders}</h6>
                        </div>
                    </div>
                </div>
            `)
            $('.countries-modal-content').append(elem)
        })

        .fail(function () {
            displayError(msg = "Couldn't Find The Country!")
        })
}