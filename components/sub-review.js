const idInput = document.querySelector("#id-input");
const pwInput = document.querySelector("#pw-input");
const login = document.querySelector(".login-form");
const savedInfo = localStorage.getItem("login");

let logins = [];

login.addEventListener("submit", (event) => {
  event.preventDefault();
  const newObj = {
    id: idInput.value,
    pw: pwInput.value,
    uid: Date.now(),
  };
  (idInput.value = ""), (pwInput.value = ""), logins.push(newObj);
  localStorage.setItem("login", JSON.stringify(logins));
});

const section2 = document.querySelector(".review-list");
const reviewInput = document.querySelector("#review-input");
const reviewForm = document.querySelector(".review-form");
const savedReview = localStorage.getItem("review");
const userId = 1686185945638;
// JSON.parse(localStorage.getItem("login"))?.[0].uid; // optional-chaining
// 현재 로그인 아이디 값을 가져와야 함 / 수정필요

// localstorage에 저장할 리뷰리스트 선언
let reviewLists = [];
// 값을 지정하면 같이 넘어가는지 확인 필요

// 객체를 JSON 형태로 저장
function save() {
  localStorage.setItem("review", JSON.stringify(reviewLists));
}

// 작성 시 실행하는 함수
// rid값을 넣어서 수정/삭제 버튼 작동 시 같은 rid값만 변경되게 구현
// input값 입력 후 ("") 초기화
function movieReview(event) {
  console.log(event);
  event.preventDefault();
  let uid = 1686185945638;
  if (reviewInput.value) {
    const reviewObj = {
      movieId: movieId,
      uid: uid,
      rid: Date.now(),
      review: reviewInput.value,
    };
    reviewLists.push(reviewObj);
    save();
    printReview(reviewObj);
    reviewInput.value = "";
  }
}

// 작성한 리뷰를 화면에 출력해주는 함수
// li에 각각 고유 rid값을 저장하여 수정/삭제 시 해당 rid 값만 변경되도록 작성
function printReview(user) {
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  li.setAttribute("data-rid", user.rid);

  const reviewText = document.createElement("span");
  reviewText.innerText = user.review;

  li.appendChild(reviewText);

  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", del);
  delBtn.style.visibility = "hidden";

  const modifyBtn = document.createElement("button");
  modifyBtn.innerText = "수정";
  modifyBtn.addEventListener("click", modify);
  modifyBtn.style.visibility = "hidden";

  li.appendChild(modifyBtn);
  li.appendChild(delBtn);

  ul.appendChild(li);
  section2.appendChild(ul);

  if (userId === user.uid) {
    delBtn.style.visibility = "visible";
    modifyBtn.style.visibility = "visible";
  } else {
    delBtn.style.visibility = "hidden";
    modifyBtn.style.visibility = "hidden";
  }
}

// 삭제함수
// li에 저장된 rid값을 가져오고, 화면에서 삭제한 뒤 filter함수로 localstorage에 있는 rid값과 비교
// 비교 한 뒤 해당 값만 뺀 리뷰리스트를 localstorage에 저장
function del(event) {
  const li = event.target.parentElement;
  const rid = li.getAttribute("data-rid");
  li.remove();
  reviewLists = reviewLists.filter((review) => review.rid !== parseInt(rid));
  save();
}

// 수정함수
// 삭제함수와 동일하게 rid값을 가져온다
// span태그로 작성된 리뷰를 replaceChild를 이용하여 input태그로 교체해준다.
// 수정 완료버튼을 생성하여 수정이 완료되면 클릭하여 클릭이벤트를 발생시킨다.
// input태그로 변경되었던 것을 다시 span태그로 변경해주고 수정완료버튼 삭제. (replaceChild)
// 리뷰리스트에서 해당 rid값의 리뷰를 찾아 변경된 리뷰로 업데이트 해주고 저장.
function modify(event) {
  const li = event.target.parentElement;
  const rid = li.getAttribute("data-rid");
  const url = `/modify.html?rid=${rid}`;
  let left = (window.screen.width - 600) / 2;
  let top = (window.screen.height - 500) / 2;
  let options =
    "resizable=yes, width=" + 600 + ", height=" + 400 + ", top=" + top + ", left=" + left;
  window.open(url, "_blank", options);
}
reviewForm.addEventListener("submit", movieReview);
// localstorage에 저장된 리뷰를 JSON형태를 풀어서 객체형태로 불러온다.
if (savedReview) {
  const parsedReview = JSON.parse(savedReview);
  reviewLists = parsedReview;
  filteredReivew = reviewLists.filter((review) => review.movieId === parseInt(movieId));
  filteredReivew.forEach(printReview); // 새로고침해도 남아있음
}

// 여기는 로그인과 연동해야함
// if (savedInfo) {
//   if (savedInfo) {
//     const parsedInfo = JSON.parse(savedInfo);
//     logins = parsedInfo;
//   }
// }

// function modify(event) {
//   const li = event.target.parentElement;
//   const rid = li.getAttribute("data-rid");
//   const reviewText = li.querySelector("span"); // 리뷰 내용을 담고 있는 span 요소

//   // 기존 리뷰 내용을 가져와서 수정 가능한 폼 요소로 교체
//   const modifyReview = reviewText.innerText;
//   const modifyInput = document.createElement("input");
//   modifyInput.value = modifyReview;
//   li.replaceChild(modifyInput, reviewText);

//   // 수정 완료 버튼 생성
//   const confirmBtn = document.createElement("button");
//   confirmBtn.innerText = "확인";
//   li.appendChild(confirmBtn);

//   confirmBtn.addEventListener("click", function () {
//     // 변경된 리뷰 내용을 가져옴
//     const updatedReview = modifyInput.value;

//     // 리뷰 내용을 다시 span 요소로 변경
//     const newReview = document.createElement("span");
//     newReview.innerText = updatedReview;
//     li.replaceChild(newReview, modifyInput);
//     li.removeChild(confirmBtn);

//     // 리뷰 리스트에서 해당 리뷰를 찾아 업데이트
//     reviewLists = reviewLists.map((review) => {
//       if (review.rid === parseInt(rid)) {
//         return {
//           ...review,
//           review: updatedReview,
//         };
//       }
//       return review;
//     });
//     save(); // 변경된 리뷰를 저장
//   });
// }

// &userId=${userId}

// export, import 시 section이 null로 들어가서 발생하는 문제
// 소스코드가 좀 꼬인 것 같음
// modify.js에서
