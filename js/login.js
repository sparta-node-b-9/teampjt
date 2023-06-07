function localStorageSave() {// 저장
    let idInput = document.getElementById('login-input-user').value;
    let pwdInput = document.getElementById('login-input-password').value;//비번 인풋 엘레먼트
    let commentInput = document.getElementById('login-input-comment').value;//아이디 인풋 엘레먼트
    let chkRemember = document.getElementById('login-remember').value;//아이디 저장 여부 체크박스 엘레먼트(비밀번호는X)

    let data = userData(userTime(),idInput,pwdInput);
    localStorage.setItem(userTime(),data);

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

function logOut() { // localStorage 리셋
    localStorage.clear();
}

function userCheck(uid,pwd) {  // 코멘트 수정시 확인 
    let userData = localStorage.getItem(uid);
    let userPwd = JSON.parse(userData)
    if(!userPwd.pwd == pwd)
    {
        console.log("인증실패")
    }
    console.log("인증성공")
}