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

    $(document).on('click', '.countries-content .col', function(e) {
        let target = $(this).data('target')
        console.log(target)
    })
})

function getData(val) {
    if($('#search-country').val() == '') {
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

    for (let cCat of data) {
        let cFlag = cCat.flags.png
        let cName = cCat.name.common
        let cPopulation = cCat.population
        let cContinent = cCat.region
        let cCapital = cCat.capital

        let card = $(`
            <div class="col m-3" data-target="${cName}" data-bs-toggle="modal" data-bs-target="#countriesModal">
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

    let modal = $(`
        <div class="modal fade" id="countriesModal"" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    `)
}
