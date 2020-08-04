document.getElementById("submit").addEventListener("click", sendNickName);
document.addEventListener("keydown", keyCheck);

window.onload = () => {
    localStorage.clear();
};

function keyCheck(event) {
    if (event.keyCode === 13) {
        sendNickName();
    }
}

function sendNickName() {
    const nickName = document.getElementById("nickname").value;
    if (nickName.length == 0) {
        alert("닉네임을 입력하세요");
    } else if (nickName.length <= 8) {
        localStorage.setItem("name", nickName);
        location.href = "chatting";
    } else if (nickName.length > 8) {
        alert("닉네임이 너무 깁니다!");
        document.getElementById("nickname").value = "";
    }
}
