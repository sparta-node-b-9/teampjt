const logInBtn = document.querySelector("#logInBtn")
const logOutBtn = document.querySelector("#logOutBtn")
function localStorageSave() {// 저장
    let idInput = document.getElementById('loginInputUser').value;
    let pwdInput = document.getElementById('loginInputPassword').value;

    if(specialCharacters(idInput))
    {
        alert("id에 특수문자는 사용 불가능 합니다.")
        if(specialCharacters(pwdInput))
        {
            alert("password에 특수문자는 사용 불가능 합니다.")
            return;
        }
        return;
    }
    if(Check(idInput,pwdInput)==true)
        {
            let data = userData(userTime(),idInput,pwdInput);
            localStorage.setItem(userTime(),data);
            alert(`${id}님 환영합니다.`)
            userNameChange(id)
        }
    }

function userTime() { //현재시간 받아오기
        const now = new Date()
        const todayNow = now.getTime();
        return todayNow;
    }

function userData(uid,id,pwd) {//받은 정보를 묶기
        let obj = {
            "uid":uid,
            "id":id,
            "pwd":pwd,
        }
        const jsonobj = JSON.stringify(obj)
        return jsonobj;
    }

function logOut() { // localStorage 해당 key값 삭제
    let userName = document.getElementById("userName").textContent;
    for(let i =0; i<localStorage.length; i++)
    {   
        let key = localStorage.key(i);
        let value = localStorage.getItem(key)
        let a = JSON.parse(value)
        if(userName == a.id)
        {
            alert(`${userName}님 로그아웃됬습니다.`)
            userNameChange("로그인해주세요")
            localStorage.removeItem(key)
        }
    }
}

function Check(id,password) {
    for(let i =0; i<localStorage.length; i++)
    {   
        let key = localStorage.key(i);
        let value = localStorage.getItem(key)
        let a = JSON.parse(value)
        if(id == a.id && password == a.pwd)
        {
            alert(`${id}님 환영합니다.`)
            userNameChange(id)
            return false;
        }
        else if(id == a.id)
        {
            alert("id가 기존유저와 중복됩니다.")
            return false;
        }
    }
    return true;
}
function userNameChange(id) { // 유저 이름 변경
    let userName = document.getElementById("userName").innerText=id;
}
window.onload = function() {
}

logInBtn.addEventListener('click', localStorageSave)
logOutBtn.addEventListener("click", logOut)

function specialCharacters(obj) // 특수문자 검사
{
    let regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/;
    if(regExp.test(obj))
    {
        return true;
    }
    return false;
}