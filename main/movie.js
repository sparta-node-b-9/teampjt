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

//섹션 부분을 클릭하면 id만 나오도록 하는 함수 구현
//img 누르면 바로 서브페이지로 이동하기 위해 img 누를때는 id가 alert되지 않도록 설정
section.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) return;
  if (event.target.matches(".posterCard")) {
    alert(event.target.id);
  } else if (!event.target.classList.contains("posterImg")) {
    alert(event.target.parentNode.id);
  }
});

//상세정보로 이동하는 함수
function childClick(title) {
  let titleId = title.id;
  (window.location.href = `/sub/subPage.html?id=${titleId}`), "_parents";
}

//영화를 검색하는 함수
//간단한 유효성 검사
//정규형을 통해 입력 받은 검색어의 공백과 대소문자를 구분하지 않고 검색이 되도록 설정
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
