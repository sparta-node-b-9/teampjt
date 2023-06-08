export let currUser = "";

const idInput = document.querySelector("#id-input");
const pwInput = document.querySelector("#pw-input");
const loginBtn = document.querySelector("#login-btn");
const logoutBtn = document.querySelector("#logout-btn");
const loginForm = document.querySelector(".login-form");
const savedInfo = localStorage.getItem("login");
let logins = [];

// 특수문자 검사 함수
// 정규식을 사용해서 해당하는 특수문자 및 공백이 생기면 해당 함수를 실행
function specialCharacters(obj) {
  let regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/;
  if (regExp.test(obj)) {
    return true;
  }
  return false;
}

function logSave() {
  localStorage.setItem("login", JSON.stringify(logins));
}

// 아이디 값과 비밀번호 값 유효성 검사
// 일치하지 않거나 특수문자가 들어간 경우 경고창 출력
function dataSave(event) {
  event.preventDefault();
  if (!idInput.value || !pwInput.value) {
    alert("id와 password를 입력해주세요.");
    return;
  } else if (specialCharacters(idInput.value)) {
    alert("id에 특수문자는 사용이 불가능 합니다.");
    return;
  }

  // 저장소에 저장된 값과 입력된 값 유효성 검사
  // 3가지 조건으로 아이디, 비밀번호가 같을 경우 로그인
  // 아이디만 같으면 이미 생성된 아이디로 다른 아이디 입력 요구
  // 저장소에 없는 값이면 아이디 생성
  // check()함수는 아래 설명 참고
  let validationTest = check(idInput.value, pwInput.value);

  if (validationTest === "correct") {
    let user = JSON.parse(savedInfo);
    // 저장소에 저장된 JSON형태의 값을 풀어서 user안에 담고
    // 입력한 아이디값과 동일한 값을 저장소에서 가져와서 userObj의 uid에 넣고
    // 저장소에서 맨 끝으로 이동 (새로고침 시 로그인 유지를 위해)
    let userUid = user.filter((e) => e.id === idInput.value);
    let userObj = {
      id: idInput.value,
      pwd: pwInput.value,
      uid: userUid[0].uid,
    };
    logins = logins.filter((e) => e.id !== idInput.value);
    logins.push(userObj);
    logSave();

    // 아이디 비밀번호가 일치할 시 아래의 알림창 출력 후, 로그인폼이 없어지고
    // userNameChange을 통해 로그인 폼 위에 해당 아이디가 출력, 로그아웃 버튼 활성화
    alert(`${idInput.value}님 환영합니다.`);
    userNameChange(idInput.value);
    currUser = idInput.value;
    loginForm.style.display = "none";
    logoutBtn.style.display = "block";
    window.location.reload();
    return;
  } else if (validationTest === "fail") {
    alert("이미 생성된 아이디입니다.");
    // 아이디값이 중복되므로 input창 초기화 후 커서이동
    idInput.value = "";
    idInput.focus();
    return;
  } else {
    let loginObj = {
      id: idInput.value,
      pwd: pwInput.value,
      uid: Date.now(),
    };
    logins.push(loginObj);
    logSave();
    // 신규아이디 생성하며 만들어놓은 빈 배열 logins에 loginObj를 push 후 저장
    // 이후 기능은 아이디&비밀번호 일치할때와 동일
    alert(`${idInput.value}님 환영합니다.`);
    userNameChange(idInput.value);
    currUser = idInput.value;
    loginForm.style.display = "none";
    logoutBtn.style.display = "block";
    window.location.reload();
  }
}

function logOut() {
  alert(`${currUser}님 로그아웃됬습니다.`);
  userNameChange("로그인이 필요합니다");

  loginForm.style.display = "block";
  logoutBtn.style.display = "none";
  // 로그아웃 후 로그인폼 인풋창 초기화
  idInput.value = "";
  pwInput.value = "";
}

// 유효성 검사를 위해 check 함수 생성
// for문으로 저장소를 반복하며 아이디와 비밀번호가 같으면 correct를 리턴, 아니면 fail 리턴
// 초기에 저장소가 비어있을땐 save를 리턴
function check(userId, userPw) {
  let checkInfo = JSON.parse(savedInfo);
  if (!checkInfo) return "save";
  for (let i = 0; i < checkInfo.length; i++) {
    if (checkInfo[i].id === userId && checkInfo[i].pwd === userPw) return "correct";
    else if (checkInfo[i].id === userId) return "fail";
  }
}

function userNameChange(id) {
  // 로그인폼 위에 출력될 유저 이름 변경
  document.querySelector("#user-name").innerText = id;
}

loginBtn.addEventListener("click", dataSave);
logoutBtn.addEventListener("click", logOut);

// 저장소에 저장된 밸류값들을 JSON형태를 풀어서 logins 배열에 추가함
// lastlogin은 새로고침 시 로그인 상태를 유지하기 위해 사용한다.
// 49번줄 참고 해당 코드와 관련이 있음
if (savedInfo) {
  const parsedlogin = JSON.parse(savedInfo);
  logins = parsedlogin;
  let lastLogin = logins[logins.length - 1].id;
  currUser = lastLogin;
  userNameChange(lastLogin);
  loginForm.style.display = "none";
  logoutBtn.style.display = "block";
}
