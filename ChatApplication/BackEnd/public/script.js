const socket = io();

let username = '';


const userCount = document.getElementById('memCount');
const input = document.getElementById('userMsg');
const button = document.getElementById('send-btn');
const messages = document.getElementById('messages');

const joinScreen = document.getElementById('join-screen');
const joinForm = document.getElementById('join-form');
const usernameInput = document.getElementById('username-input');
const usernameError = document.getElementById('username-error');

const chatApp = document.querySelector('.chat-app');
const membersList = document.getElementById('members-list');

chatApp.style.display = 'none';




joinForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const enteredUsername = usernameInput.value.trim();

    if (!enteredUsername) {
        usernameError.textContent = 'Please enter a username.';
        usernameInput.focus();
        return;
    }

    username = enteredUsername;

    usernameError.textContent = '';

    socket.emit('username', username);

    joinScreen.style.display = 'none';
    chatApp.style.display = 'flex';

    input.focus();

});




socket.on('userCount', (count) => {

    userCount.innerText = `${count} Members Online`;

});




socket.on('onlineUsers', (users) => {

    console.log('ONLINE USERS:', users);

    membersList.innerHTML = '';

    users.forEach((user) => {

        const member = document.createElement('div');

        member.classList.add('member');


        const avatar = document.createElement('span');

        avatar.classList.add('member-avatar');

        avatar.textContent = user.charAt(0).toUpperCase();


        const memberInfo = document.createElement('div');

        memberInfo.classList.add('member-info');


        const name = document.createElement('h3');

        name.textContent = user;


        const status = document.createElement('span');

        const onlineDot = document.createElement('span');

        onlineDot.classList.add('small-online-dot');

        status.appendChild(onlineDot);

        status.appendChild(
            document.createTextNode('Online')
        );


        memberInfo.appendChild(name);
        memberInfo.appendChild(status);

        member.appendChild(avatar);
        member.appendChild(memberInfo);

        membersList.appendChild(member);

    });

});




button.addEventListener('click', sendMsg);

input.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {

        event.preventDefault();

        sendMsg();

    }

});


function sendMsg() {

    const msg = input.value.trim();

    if (!msg) return;

    socket.emit('chat-message', msg);

    input.value = '';

    input.focus();

}



socket.on('userMessage', (data) => {

    const messageDiv = document.createElement('div');

    const isOwnMessage = data.username === username;

    messageDiv.classList.add('chat-message');

    if (isOwnMessage) {
        messageDiv.classList.add('own-message');
    } else {
        messageDiv.classList.add('other-message');
    }


    const usernameElement = document.createElement('h3');

    usernameElement.textContent = data.username;


    const messageElement = document.createElement('p');

    messageElement.textContent = data.msg;


    const timeElement = document.createElement('p');

    timeElement.textContent = data.time;


    messageDiv.appendChild(usernameElement);
    messageDiv.appendChild(messageElement);
    messageDiv.appendChild(timeElement);

    messages.appendChild(messageDiv);

    messages.scrollTop = messages.scrollHeight;

});