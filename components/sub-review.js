import { currUser } from "/components/sub-login.js";
import { movieId } from "/subpage.js";

const savedReview = localStorage.getItem("review");
const userId = JSON.parse(localStorage.getItem("login")); // ?.[0]. optional-chaining
let currInfo = userId.filter((e) => e.id === currUser);

console.log(currUser);
// localstorage에 저장할 리뷰리스트 선언
let reviewLists = [];

// 객체를 JSON 형태로 저장
function reviewSave() {
  localStorage.setItem("review", JSON.stringify(reviewLists));
}

// 작성 시 실행하는 함수
// rid값을 넣어서 수정/삭제 버튼 작동 시 같은 rid값만 변경되게 구현
// input값 입력 후 ("") 초기화
function movieReview(event) {
  const reviewInput = document.querySelector("#review-input");
  if (!currUser) {
    alert("로그인을 해주세요!");
    return;
  }
  event.preventDefault();
  if (reviewInput.value) {
    const reviewObj = {
      movieId: movieId,
      id: currInfo[0].id,
      uid: currInfo[0].uid,
      rid: Date.now(),
      review: reviewInput.value,
      like: 0,
      disLike: 0,
    };

    reviewLists.push(reviewObj);
    reviewSave();

    printReview(reviewObj);
    reviewInput.value = "";
  }
}

// 작성한 리뷰를 화면에 출력해주는 함수
// li에 각각 고유 rid값을 저장하여 수정/삭제 시 해당 rid 값만 변경되도록 작성
function printReview(user) {
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  const nameTag = document.createElement("span");
  const reviewText = document.createElement("span");
  const modifyBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const likeBtn = document.createElement("button");
  const disLikeBtn = document.createElement("button");

  nameTag.innerText = user.id;
  reviewText.innerText = user.review;
  modifyBtn.innerText = "수정";
  delBtn.innerText = "❌";
  modifyBtn.style.display = "none";
  delBtn.style.display = "none";
  likeBtn.innerText = `${user.like}👍`;
  disLikeBtn.innerText = `${user.disLike}👎`;

  li.setAttribute("review-rid", user.rid);
  li.appendChild(nameTag);
  li.appendChild(reviewText);
  li.appendChild(modifyBtn);
  li.appendChild(delBtn);
  li.appendChild(likeBtn);
  li.appendChild(disLikeBtn);
  ul.appendChild(li);
  document.querySelector(".review-list").appendChild(ul);

  // none으로 하면 css가 깨질수도 있음 => 요소가 있었는데 갑자기 사라지니까
  // hidden으로 하면 개발자도구에서 보이는 단점이 있음
  if (currInfo[0].uid === user.uid) {
    modifyBtn.style.display = "block";
    delBtn.style.display = "block";
  } else {
    modifyBtn.style.display = "none";
    delBtn.style.display = "none";
  }

  modifyBtn.addEventListener("click", modifyReview);
  delBtn.addEventListener("click", deleteReview);
  likeBtn.addEventListener("click", likes);
  disLikeBtn.addEventListener("click", disLikes);
}
// 삭제함수
// li에 저장된 rid값을 가져오고, 화면에서 삭제한 뒤 filter함수로 localstorage에 있는 rid값과 비교
// 비교 한 뒤 해당 값만 뺀 리뷰리스트를 localstorage에 저장
function deleteReview(event) {
  const li = event.target.parentElement;
  const rid = li.getAttribute("review-rid");

  li.remove(); // 화면에서 해당 리뷰를 삭제
  reviewLists = reviewLists.filter((review) => review.rid !== parseInt(rid)); // 로컬스토리지에 있는 리뷰들 중 rid값이 일치하지 않는 리뷰만 필터링
  reviewSave(); //필터링된 리뷰를 저장
}

// 수정함수
// 삭제함수와 동일하게 rid값을 가져온다
// span태그로 작성된 리뷰를 replaceChild를 이용하여 input태그로 교체해준다.
// 수정 완료버튼을 생성하여 수정이 완료되면 클릭하여 클릭이벤트를 발생시킨다.
// input태그로 변경되었던 것을 다시 span태그로 변경해주고 수정완료버튼 삭제. (replaceChild)
// 리뷰리스트에서 해당 rid값의 리뷰를 찾아 변경된 리뷰로 업데이트 해주고 저장.
function modifyReview(event) {
  const li = event.target.parentElement;
  const rid = li.getAttribute("review-rid");
  const url = `/components/rev-modify.html?rid=${rid}&id=${currInfo[0].id}`;

  let left = (window.screen.width - 600) / 2;
  let top = (window.screen.height - 500) / 2;
  let options =
    "resizable=yes, width=" + 600 + ", height=" + 400 + ", top=" + top + ", left=" + left;

  window.open(url, "_blank", options);
}

document.querySelector(".review-form").addEventListener("submit", movieReview);

function likes(event) {
  const li = event.target.parentElement;
  const rid = li.getAttribute("review-rid");
  const review = reviewLists.filter((review) => review.rid === parseInt(rid));
  review[0].like = parseInt(review[0].like) + 1;
  printLikes(review[0].like, 0);
  reviewSave();
}

function disLikes(event) {
  const li = event.target.parentElement;
  const rid = li.getAttribute("review-rid");
  const review = reviewLists.filter((review) => review.rid === parseInt(rid));
  review[0].disLike = parseInt(review[0].disLike) + 1;
  printLikes(0, review[0].disLike);
  reviewSave();
}

// 좋아요/싫어요 개수 출력 함수
function printLikes(like, disLike) {
  if (like) {
    likeBtn.innerText = `${like}👍`;
  } else {
    disLikeBtn.innerText = `${disLike}👎`;
  }
}

if (savedReview) {
  const parsedReview = JSON.parse(savedReview);
  reviewLists = parsedReview;
  let filteredReview = reviewLists.filter((review) => review.movieId === movieId); // 각 영화마다 달린 리뷰만 보일 수 있게 movieId로 구분
  filteredReview.forEach(printReview); // 삭제 후에 새로고침해도 화면에 출력됨
}
