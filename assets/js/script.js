$(function () {
    getData()
    addContinents()

    $(document).on('click', '.toggle-btn', function (e) {
        $('body').toggleClass('dark', 'slow', 'linear')
    })

    $('#search-country').keyup(function (e) {
        if (e.which == 13) {
            let val = $('#search-country').val()
            getData(val)
        } else if ($('#search-country').val() == '') {
            getData()
        }
    })

    /* $(document).on('click', '.countries-content .col', function (e) {
        let target = $(this).data('target')

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
    }) */
})

function getData(val) {
    if ($('#search-country').val() == '') {
        $.get(`https://restcountries.com/v3.1/all`)
            .then(response => addCountriesData(response))
    } else {
        $.get(`https://restcountries.com/v3.1/name/${val}`)
            .then(response => addCountriesData(response))
    }

    $('.countries-content').empty()
}

function addContinents() {
    let arr = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

    for (let i = 0; i < arr.length; i++) {
        let elem = $(`
            <li><a class="dropdown-item" href="#">${arr[i]}</a></li>
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

        let card = $(`
            <div class="col m-3" data-target="${cName}">
                <div class="countries-card">
                    <div class="countries-img"><img src="${cFlag}" alt=""></div>
                    <div class="countries-card-details">
                        <h5 class="countries-name fw800 mt-3">${cName}</h5>
                        <p class="countries-details fw600 m-0">Population: <span class="countries-stats">${cPopulation}</span></p>
                        <p class="countries-details fw600 m-0">Region: <span class="countries-stats">${cContinent}</span></p>
                        <p class="countries-details fw600 m-0">Capital: <span class="countries-stats">${cCapital}</span></p>
                    </div>
                </div>
            </div>
        `)
        $(row).append(card)
    }
    $('.countries-content').append(row)
}