// & html elements 
let cards;
let state = true; 
let detai = document.querySelector(".details .container")
let category = document.querySelectorAll(".nav-link");
let row = document.querySelector(".content .row")
let ALL = document.querySelector(".content")
const descriptionHtml = document.querySelector("#detailsContent")
// & html elements  end 
    // ^ function
        // * API get data displayData 
        async function getData(code) {
    $(".loading").fadeIn();
        if (state) {
        row.classList.add("d-none");
        state = false;
    }
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'ec786801c8mshb0d1e182a6c77f7p10f27fjsnb6b817ee7327',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };

            let response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${code}`, options);
    let data = await response.json();
        setTimeout(() => {
        $(".loading").fadeOut(300, function () {
            // Show the new detail card
            displayAllData(data) ;
            row.classList.remove("d-none");
            state = true;
            // Display the new detail
        });
    }, 500);
            

        }
        function displayAllData(arr) {
            row.innerHTML = ""
            for (let i = 0; i < arr.length; i++) {
                let container = `
                                            <div class="col-xl-3 card1  col-lg-4 rounded col-md-6 col-sm-12 p-3" id="${arr[i].id}">
                                        <div class="inner rounded border-1 border  border-dark p-3">
                                            <img src="${arr[i].thumbnail}" class="w-100" alt="">
                                            <div class="text">
                                                <div class="d-flex justify-content-between align-items-center pt-3">
                                                    <h5>${arr[i].title.slice(0, 10)}</h5>
                                                    <button class="btn btn-info">Free</button>
                                                </div>
                                                <p class="card-text small pt-2 text-center opacity-50">${arr[i].short_description.slice(0, 40)}</p>                                        <div class="capture d-flex justify-content-between align-items-center">
                                                    <span class="p-1  ">${arr[i].genre}</span>
                                                    <span class="p-1  ">${arr[i].platform}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                `

                row.innerHTML += container;
            }
            cards = document.querySelectorAll(" .card1");
            for (let y = 0; y < cards.length; y++) {
                cards[y].addEventListener("click", function () {
                let id = cards[y].getAttribute("id")
                    getDetail(id);
                    $(".model").removeClass("d-none");
                    $(".content").addClass("d-none");
                })
                $("#btnClose").on("click", function () {
                    $(".model").addClass("d-none");
                    $(".content").removeClass("d-none");
        })
            }
        }
        // * API get data displayData  end
        // * navbar
        for (let k = 0; k < category.length; k++){
            category[k].addEventListener("click", function (e) {
                let active = document.querySelector(".nav-link.active1");
                active.classList.remove("active1");
                (e.target).classList.add("active1");
                var categoryCode = (e.target).getAttribute("data-catagory");
                getData(categoryCode);
            })
        }
        // * navbar end
        // * API get getDetail displaydetails
// Initially, there is no detail card displayed

async function getDetail(id) {
    $(".loading").fadeIn();

    // Hide the old detail card if it exists
    if (state) {
        detai.classList.add("d-none");
        state = false;
    }

    const options1 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ec786801c8mshb0d1e182a6c77f7p10f27fjsnb6b817ee7327',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    let response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options1);
    let details = await response.json();

    // Delay the fadeOut to ensure the loading spinner is shown for at least 300 milliseconds
    setTimeout(() => {
        $(".loading").fadeOut(300, function () {
            // Show the new detail card
            displaydetails(details);
            detai.classList.remove("d-none");
            state = true;
            // Display the new detail
        });
    }, 500);
}

function displaydetails(details) {
    descriptionHtml.innerHTML = `<div class="col-sm-12 col-md-4 image">
                                <img src="${details.thumbnail}" class="w-100" alt="image details">
                            </div>
                            <div class="col-sm-12 col-md-8 description">
                                <div class="description d-flex flex-column justify-content-center ">
                                <h4 class="h2">Title: ${details.title}</h4>
                                <p>Category: <span class="info bg-info">${details.genre}</span> </p>
                                <p>Platform: <span class="info bg-info">${details.platform}</span> </p>
                                <p>Status: <span class="info bg-info">${details.status}</span> </p>
                                </div>
                                <p class="tall">${details.description}</p>
                                <a class="btn btn-outline-warning" target="_blank" href="${details.game_url}">Show Game</a>
                            </div>`
}
        // * API get getDetail displaydetails end
    // ^ function
getData("MMORPG");
jQuery(function () {
    $(".loading").fadeOut(3000, function () {
        $("body").css({ overflow: "auto" })
        
    })
    
})


