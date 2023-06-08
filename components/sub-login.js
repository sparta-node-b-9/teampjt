const idInput = document.querySelector("#id-input");
const pwInput = document.querySelector("#pw-input");
const loginBtn = document.querySelector("#login-btn");
const logoutBtn = document.querySelector("#logout-btn");
const userName = document.querySelector("#user-name");
const loginForm = document.querySelector(".login-form");
const savedInfo = localStorage.getItem("login");
let logins = [];
let currUser = "";

// 특수문자 검사 함수
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

function dataSave(event) {
  event.preventDefault();
  if (!idInput.value || !pwInput.value) {
    alert("id와 password를 입력해주세요.");
    return;
  } else if (specialCharacters(idInput.value)) {
    alert("id에 특수문자는 사용이 불가능 합니다.");
    return;
  }

  let validationTest = check(idInput.value, pwInput.value);

  if (validationTest === "correct") {
    alert(`${idInput.value}님 환영합니다.`);
    userNameChange(idInput.value);
    currUser = idInput.value;
    loginForm.style.display = "none";
    logoutBtn.style.display = "block";
    return;
  } else if (validationTest === "fail") {
    alert("이미 생성된 아이디입니다.");
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
    alert(`${idInput.value}님 환영합니다.`);
    userNameChange(idInput.value);
    currUser = idInput.value;
    loginForm.style.display = "none";
    logoutBtn.style.display = "block";
  }
}

function logOut() {
  alert(`${currUser}님 로그아웃됬습니다.`);
  userNameChange("로그인이 필요합니다");

  loginForm.style.display = "block";
  logoutBtn.style.display = "none";
  idInput.value = "";
  pwInput.value = "";
}

function check(userId, userPw) {
  console.log(userId, userPw);
  let checkInfo = JSON.parse(savedInfo);
  if (!checkInfo) return "save";
  for (let i = 0; i < checkInfo.length; i++) {
    if (checkInfo[i].id === userId && checkInfo[i].pwd === userPw) return "correct";
    else if (checkInfo[i].id === userId) return "fail";
  }
}

function userNameChange(id) {
  // 유저 이름 변경
  document.querySelector(".user-name").innerText = id;
}

loginBtn.addEventListener("click", dataSave);
logoutBtn.addEventListener("click", logOut);

if (savedInfo) {
  const parsedlogin = JSON.parse(savedInfo);
  logins = parsedlogin;
  let lastLogin = logins[logins.length - 1].id;
  currUser = lastLogin;
  userNameChange(lastLogin);
  loginForm.style.display = "none";
  logoutBtn.style.display = "block";
}
