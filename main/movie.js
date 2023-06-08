document.addEventListener("DOMContentLoaded", () => {
  printPage();
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODgwYmIzNjA5MDMyMGY5MzJjMDM4MzdhOTFlYzQ3MCIsInN1YiI6IjY0NzU2MWJiNjc0M2ZhMDEzNmVlYTM4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wqy-TYuti_eNtAxsJ2ogjiehKSjfEJOJlQijhu9u8ys",
  },
};

const fetchMovie = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  ).then((res) => res.json());
  return response;
};

const section = document.querySelector("#card");
const searchButton = document.querySelector("#search-btn");

async function printPage() {
  const result = await fetchMovie().then((data) => {
    let movies = data.results;
    return movies;
  });

  printMovieForm(result);
}

function printMovieForm(movies) {
  section.innerHTML = movies.reduce((movieList, Item) => {
    const { id, title, poster_path, overview, vote_average } = Item;
    return (movieList += `<li class="posterCard" id=${id} >
                          <img class="posterImg" onclick=childClick(this) id=${id} src="https://image.tmdb.org/t/p/w500${poster_path}">
                          <h2 id="movieTitle">${title}</h2>
                          <p class="overview">${overview}</p>
                          <p id="movieStar"> ⭐️ ${vote_average}</p>
                          </li>`);
  }, "");
}

section.addEventListener("click", (event) => {
  console.log(event.target);
  console.log(event.currentTarget);
  if (event.target === event.currentTarget) return;
  if (event.target.matches(".posterCard")) {
    alert(event.target.id);
  } else if (!event.target.classList.contains("posterImg")) {
    alert(event.target.parentNode.id);
  }
});

//상세정보 버튼 .
function childClick(title) {
  let titleId = title.id;
  (window.location.href = `/sub/subpage.html?id=${titleId}`), "_parents";
}

async function searchMovie(event) {
  event.preventDefault();

  let text = document.querySelector("#search-mv").value;
  text = text.replace(/ /g, "");
  let findMovies = [];
  const findMovieTitle = new RegExp(text, "i");

  if (!text.length) {
    alert("영화 제목의 일부분을 입력해주세요.");
    return;
  } else if (text.length <= 2) {
    alert("조금 더 길게 입력해주세요.");
    return;
  }

  const result = await fetchMovie().then((data) => {
    let movies = data.results;
    return movies;
  });

  result.forEach((movie) => {
    let title = movie.title.replace(/ /g, "");
    if (findMovieTitle.test(title)) findMovies.push(movie);
  });

  printMovieForm(findMovies);
}

searchButton.addEventListener("click", searchMovie);
