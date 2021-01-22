const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const displaydiv = document.getElementById("display");
const OMDbAPIbase = "https://www.omdbapi.com/?apikey=3ad8697e"

let movieList;
let modal;

// OPEN, DISPLAY AND CLOSE THE MORE ABOUT
const popup = index => {
  modal = document.getElementById("myModal");
  modal.style.display = "block";

  document.getElementById("modalcontent").innerHTML =
  `
    <img id="imagepop${index}">
    <div id="pop${index}">
      <h2 id="titlepop${index}"></h2>
      <p id="datepop${index}"></p>
      <h3>Short plot:</h3>
      <p id="plot${index}"></p>
      <h3>Actors:</h3>
      <p id="actors${index}"></p>
    </div>
  `;
  document.getElementById(`imagepop${index}`).src = movieList.Search[index].Poster;
  document.getElementById(`titlepop${index}`).innerHTML = movieList.Search[index].Title;
  document.getElementById(`datepop${index}`).innerHTML = movieList.Search[index].Year;

  fetch(OMDbAPIbase+"&i="+movieList.Search[index].imdbID, {
      method: "GET"
  })
  .then((response) => response.json())
  .then((item) => {
    document.getElementById(`plot${index}`).innerHTML = item.Plot;
    document.getElementById(`actors${index}`).innerHTML = item.Actors;
  })
}

const closePopup = () => {
  modal.style.display = "none";
}

const newDisplay = index => {
    displaydiv.innerHTML +=
    `
    <div class="card">
      <img id="image${index}">
      <div>
        <h3 id="title${index}"></h3>
        <p id="date${index}"></p>
        <button onclick="popup(${index})" id="More-button${index}" type="submit">More About</button>
      </div>
    </div>
    `
    document.querySelector(`#image${index}`).src = movieList.Search[index].Poster;
    document.querySelector(`#title${index}`).innerHTML = movieList.Search[index].Title;
    document.querySelector(`#date${index}`).innerHTML = movieList.Search[index].Year;
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    displaydiv.innerHTML=""

    fetch(OMDbAPIbase+"&s="+searchInput.value, {
        method: "GET"
    })

    .then((response) => response.json())
    .then((item) => {
        movieList = item
        console.log(movieList)

        for(let i=0;i < 10; i++){
            newDisplay(i);
        };
    })
});
