export let movieId = searchParam("id");

function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchMovie();
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGEyN2RhZGEzZmIyMzZjOWFiMDEwY2IyZmRhNmQ4MyIsInN1YiI6IjY0NzU2MTY1ZGQyNTg5MDBjMzI0ZGZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HDK-jrZxT07rId8Dq5fbX5H9FTAJp6IB0RmWisVR8QI",
  },
};

const section = document.querySelector("#card");
const homeBtn = document.querySelector("#homeBtn");

const fetchMovie = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
    .then((res) => res.json())
    .then((data) => {
      section.innerHTML = `<li class="posterCard" >
                              <img id=${data.id} src="https://image.tmdb.org/t/p/w500${data.poster_path}" >
                              <div id="cadeMargin">
                              <h2 id="movieTitle">${data.title}</h2>
                              <p id="movieStar"> ⭐️ ${data.vote_average}</p>
                              <p class="overview">${data.overview}</p>
                              </div>
                          </li>`;
    });
  return response;
};

//home 키
function homeClick() {
  window.location.href = "/main/movie.html";
}

homeBtn.addEventListener("click", homeClick);
