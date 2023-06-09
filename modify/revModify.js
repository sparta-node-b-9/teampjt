document.addEventListener("DOMContentLoaded", () => {
  printPage();
});

//쿼리스트링으로 보낸 rid값과 id값을 받아옴
function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
}

const savedReview = document.querySelector("#saved-review");

let reviewLists = [];
let popupRid = searchParam("rid");
reviewLists = JSON.parse(localStorage.getItem("review"));
let userReview = reviewLists.filter((review) => review.rid === parseInt(popupRid));

//수정본 저장하는 함수
function modifySave() {
  localStorage.setItem("review", JSON.stringify(reviewLists));
}

//DOMContentLoaded 시, 수행되는 함수
//해당 화면에 쿼리스트링으로 받은 id를 가져와 수정하는 정보0(영화 리뷰, id)를 출력
function printPage() {
  let userId = searchParam("id");

  document.querySelector("#user-name").innerText = userId;
  savedReview.value = userReview[0].review;
  counter(savedReview, 80);
}

//수정 함수
//수정 버튼 누를 때, 유효성 검사 후 수정이 되면
//localstorage에 있는 review 값들 중 해당 review만 수정 후 저장하도록 구현
function modify() {
  if (!savedReview.value) {
    alert("리뷰내용이 없습니다.");
  } else if (savedReview.value === userReview[0].review) {
    alert("변경사항이 없습니다.");
  } else {
    alert("수정완료");

    opener.parent.location.reload();
    window.close();
  }

  reviewLists = reviewLists.map((review) => {
    if (review.rid === parseInt(popupRid)) {
      return {
        ...review,
        review: savedReview.value,
      };
    }
    return review;
  });

  modifySave();
}

// 글자 수 카운팅하는 함수
// 80자 이상 시, 작성되지 않도록 limit를 설정(limt는 html에서 80으로 설정함)
// onkeyup 이벤트를 통해 실시간으로 글자의 수가 표시되도록 구현
function counter(text, length) {
  const limit = length;
  const str = text.value.length;

  if (str > limit) {
    document.getElementById("re-count").innerHTML = "80자 이상 입력했습니다.";
    text.value = text.value.substring(0, limit);
    text.focus();
  }

  document.getElementById("re-count").innerHTML = text.value.length + "/" + limit;
}

document.querySelector("#modify-btn").addEventListener("click", modify);
document.querySelector("#close-btn").addEventListener("click", () => window.close());
