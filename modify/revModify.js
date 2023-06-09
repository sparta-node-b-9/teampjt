document.addEventListener("DOMContentLoaded", () => {
  printPage();
});

function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
}

const savedReview = document.querySelector("#saved-review");

let reviewLists = [];
let popupRid = searchParam("rid");
reviewLists = JSON.parse(localStorage.getItem("review"));
let userReview = reviewLists.filter((review) => review.rid === parseInt(popupRid));

function modifySave() {
  localStorage.setItem("review", JSON.stringify(reviewLists));
}

function printPage() {
  let userId = searchParam("id");

  document.querySelector("#user-name").innerText = userId;
  savedReview.value = userReview[0].review;
  counter(savedReview, 80);
}

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

// 카운팅하는 곳
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
