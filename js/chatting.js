const socket = io();

document.getElementById('sendmsg').addEventListener('click', sendMsg);
document.addEventListener('keydown', keyCheck);
document.getElementById('ccount').addEventListener('click', showConnectmen);
window.addEventListener('beforeunload', (event) => {
    socket.emit('noticeDisconnect', {
        name: localStorage['name']
    });
});

socket.on('printDisconnect', (data) => {
    const li = document.createElement('LI');
    const con = document.getElementById('conversation');
    const ccountTag = document.getElementById('ccount');
    const connectlist = document.querySelectorAll('#connectmen > li');
    const connectmen = document.getElementById('connectmen');
    let selected;

    ccount -= 1;
    ccountTag.innerHTML = `현재 접속 인원 : ${data.ccount}명`;
    li.innerHTML = `<div class="system">'${data.name}'님이 나가셨습니다.</div>`;
    con.appendChild(li);
    for (let i = 0; i < connectlist.length; i++) {
        if (data.name === connectlist[i].textContent) {
            selected = connectlist[i];
            console.log(selected);
            break;
        }
    }
    connectmen.removeChild(selected);
    con.scrollTop = con.scrollHeight;
    priorName = '';
});

function keyCheck(event) {
    if (event.keyCode === 13) {
        sendMsg();
    }
}

let showing = false;

function showConnectmen() {
    if (!showing) {
        document.getElementById('connectmen').style.display = 'block';
        showing = !showing;
    } else {
        document.getElementById('connectmen').style.display = 'none';
        showing = !showing;
    }
}

function sendMsg() {
    const name = localStorage['name'];
    const said = document.getElementById('msg').value;

    socket.emit('sendMsg', {
        username: name,
        words: said
    });
    const con = document.getElementById('conversation');
    const li = document.createElement('LI');
    li.innerHTML = `<div class="mysaid">${said}</div>`
    con.appendChild(li);
    document.getElementById('msg').value = '';
    con.scrollTop = con.scrollHeight;
    priorName = '';
}

socket.emit('noticeConnect', {
    name: localStorage['name']
});

socket.on('printConnect', (data) => {
    const li = document.createElement('LI');
    const con = document.getElementById('conversation');
    const connectmen = document.getElementById('connectmen');
    const ccountTag = document.getElementById('ccount');
    
    li.innerHTML = `<div class="system">'${data.name}'님이 접속하셨습니다.</div>`
    con.appendChild(li);
    ccountTag.innerHTML = `현재 접속 인원 : ${data.ccount}명`;
    connectmen.innerHTML = '';
    for (let i = 0; i < data.carray.length; i++) {
        const li2 = document.createElement('LI');
        li2.innerHTML = data.carray[i];
        console.log(data.carray[i]);
        connectmen.appendChild(li2);
    }
    con.scrollTop = con.scrollHeight;
    priorName = '';
});

let priorName = '';
socket.on('writeMsg', (data) => {
    const li = document.createElement('LI');
    const con = document.getElementById('conversation');
    if (priorName === data.username) {
        li.innerHTML = `<div class="others">${data.description}</div>`
    } else {
        li.innerHTML = `<div>${data.username}</div><div class="others">${data.description}</div>`
    }
    priorName = data.username;
    document.getElementById('conversation').appendChild(li);
    con.scrollTop = con.scrollHeight;
});
