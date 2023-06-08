document.addEventListener("DOMContentLoaded", () => {
  printPage();
});

const closeBtn = document.querySelector("#close-btn");
const modifyBtn = document.querySelector("#modify-btn");
const savedReview = document.querySelector("#saved-review");
const userName = document.querySelector("#user-name");
let reviewLists = [];
reviewLists = JSON.parse(localStorage.getItem("review"));
let popupRid = searchParam("rid");
let userReview = reviewLists.filter((review) => review.rid === parseInt(popupRid));
let area = document.querySelector("#saved-review");

function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
}

function printPage() {
  let userId = "이상훈"; // 창범님이 만드시면 받아야하는 아이디
  userName.innerText = userId;

  savedReview.value = userReview[0].review;
  modifyBtn.addEventListener("click", modifyReview);
}

function modifyReview() {
  if (!savedReview.value) {
    alert("리뷰내용이 없습니다.");
  } else if (savedReview.value === userReview[0].review) {
    alert("변경사항이 없습니다.");
  } else if (savedReview.valeu !== userReview[0].review) {
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

function modifySave() {
  localStorage.setItem("review", JSON.stringify(reviewLists));
}

modifyBtn.addEventListener("click", modifyReview);

closeBtn.addEventListener("click", function () {
  window.close();
});

function checkLength(area) {
  let text = area.value;
  let testLength = text.length;

  let maxLength = 50;

  if (testLength > maxLength) {
    alert(maxLength + "자 이상 작성할 수 없습니다");
    area.value = text;
    area.focus();
  }
}

area.addEventListener("onkeypress", checkLength);
