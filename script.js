let sortMethod = "popularity.desc";
let voteCount = "";
let pageNum = 1;
let API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=${sortMethod}${voteCount}&api_key=80fdfb0fa9fc2e50f1cde89c7ef9582a&page=${pageNum}`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
let SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=80fdfb0fa9fc2e50f1cde89c7ef9582a&page=${pageNum}&query='`;
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const movies = document;
const sortPop = document.getElementById("pop");
const sortRel = document.getElementById("rel");
const sortRat = document.getElementById("rat");
const title = document.querySelector(".title");
const sortContainer = document.querySelector(".buttons-container");
const reset = document.querySelector(".reset");
const pop = "popularity.desc";
const rel = "release_date.desc";
const rat = "vote_average.desc";
const pageL = document.querySelector(".page-left");
const pageR = document.querySelector(".page-right");
const pagesText = document.querySelector(".pagesText");
let searchActive = false;
let searchTerm = "";

getMovies(API_URL);

function updatePage() {
  pagesText.textContent = `Page ${pageNum}`;
}

pageR.addEventListener("click", function () {
  if (pageR.classList.contains("pageActive")) {
    pageNum += 1;
    if (searchActive === true) {
      getSEARCH_URL();
      startSearch();
    } else if (searchActive === false) {
      getAPI_URL();
      getMovies(API_URL);
    }
  }
  if (pageNum >= 1) {
    pageL.classList.add("pageActive");
  }
  updatePage();
});
pageL.addEventListener("click", function () {
  if (pageL.classList.contains("pageActive")) {
    pageNum -= 1;
    if (searchActive === true) {
      getSEARCH_URL();
      startSearch();
    } else if (searchActive === false) {
      getAPI_URL();
      getMovies(API_URL);
    }
  }
  if (pageNum <= 1) {
    pageL.classList.remove("pageActive");
  }
  updatePage();
});

function resetAll() {
  searchActive = false;
  sortMethod = pop;
  sortContainer.style.display = "flex";
  reset.style.display = "none";
  voteCount = "";
  pageNum = 1;
  updatePage();
  applyActive(sortPop);
  getAPI_URL();
  getMovies(API_URL);
}

title.addEventListener("click", resetAll);

reset.addEventListener("click", resetAll);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((element) => {
    const { title, poster_path, vote_average, overview } = element;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
        <img
        src="${IMG_PATH + poster_path}"
        alt="${title}"
        />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
    `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "yellow";
  } else {
    return "red";
  }
}

function startSearch() {
  sortContainer.style.display = "none";
  reset.style.display = "flex";
  searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    searchActive = true;
    getMovies(SEARCH_URL + searchTerm);
  } else {
    window.location.reload;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  pageNum = 1;
  updatePage();
  startSearch();
});

function getAPI_URL() {
  API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=${sortMethod}${voteCount}&api_key=80fdfb0fa9fc2e50f1cde89c7ef9582a&page=${pageNum}`;
}

function getSEARCH_URL() {
  SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=80fdfb0fa9fc2e50f1cde89c7ef9582a&page=${pageNum}&query='`;
}

function sort(sortType) {
  if (sortType === "pop") {
    sortMethod = pop;
    voteCount = "";
    getAPI_URL();
    getMovies(API_URL);
  } else if (sortType === "rat") {
    sortMethod = rat;
    voteCount = "&vote_count.gte=200";
    getAPI_URL();
    getMovies(API_URL);
  } else if (sortType === "rel") {
    sortMethod = rel;
    voteCount = "&vote_count.gte=5";
    getAPI_URL();
    getMovies(API_URL);
  }
}

function applyActive(el) {
  sortPop.classList.remove("active");
  sortRel.classList.remove("active");
  sortRat.classList.remove("active");
  el.classList.add("active");
}

sortPop.addEventListener("click", function () {
  pageNum = 1;
  updatePage();
  applyActive(sortPop);
  sort("pop");
});
sortRel.addEventListener("click", function () {
  pageNum = 1;
  updatePage();
  applyActive(sortRel);
  sort("rel");
});
sortRat.addEventListener("click", function () {
  pageNum = 1;
  updatePage();
  applyActive(sortRat);
  sort("rat");
});
