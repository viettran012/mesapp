const inputMessage = document.querySelector('.input-message');
const chatContent = document.querySelector('.chat-content');

// let user_name = prompt('Please enter your name:', '');
var socket = io.connect(SEVER);
window.onbeforeunload = function () {
    socket.close();
};
const debounceOninput = function (func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;

            if (!immediate) {
                func.apply(context, args);
            }
        }, wait);

        if (callNow) func.apply(context, args);
    };
};
const handledeOninput = debounceOninput((value) => {
    const oninputEl_displaying = document.getElementById('oninput-wrapper');
    if (oninputEl_displaying) {
        oninputEl_displaying.remove();
    }
}, 1000);
socket.on('oninput', function (msg) {
    if (msg.room === app.currentInteraction.room) {
        // console.log(msg);
        handledeOninput(msg);
        const oninputEl_displaying = document.getElementById('oninput-wrapper');
        if (!oninputEl_displaying) {
            const oninputEl = document.createElement('div');
            oninputEl.innerHTML = `<span>${msg.name} đang soạn tin...</span>`;
            oninputEl.id = 'oninput-wrapper';
            chatContent.appendChild(oninputEl);
            chatContent.scrollTop = chatContent.scrollHeight;
        }
    }
});
socket.on('receive', function (msg) {
    // console.log(dataMess.username);
    if (msg.room === app.currentInteraction.room) {
        //
        const oninputEl_displaying = document.getElementById('oninput-wrapper');
        if (oninputEl_displaying) {
            oninputEl_displaying.remove();
        }
        if (msg.dataMess.id !== app.data.userData.id) {
            const itemChat = document.createElement('div');
            itemChat.classList.add('item-chat');
            itemChat.classList.add('animate-append');
            itemChat.innerHTML = itemMess.item(msg.dataMess);
            chatContent.appendChild(itemChat);
            chatContent.scrollTop = chatContent.scrollHeight;
        } else {
            const itemChat = document.createElement('div');
            itemChat.classList.add('item-chat');
            itemChat.classList.add('my-item-chat');
            itemChat.classList.add('animate-append');
            itemChat.innerHTML = itemMess.myItem(msg.dataMess);
            chatContent.appendChild(itemChat);
            chatContent.scrollTop = chatContent.scrollHeight;
        }

        const target = document.getElementById(`${app.currentInteraction.userid}`);
        // console.log(target);
        const text = tools.handleString(msg.dataMess.text);

        target.children[0].children[1].children[1].innerText = `${text}`;
        target.children[1].children[0].innerText = msg.dataMess.time;
    } else {
        // console.log(dataMess);
        const text = tools.handleString(msg.dataMess.text);
        console.log(msg.dataMess);
        showToast('Tin nhắn mới', 'warning', `${msg.dataMess.username}: ${msg.dataMess.text}`, 5000);
        document.getElementById(
            `${msg.dataMess.id}`,
        ).children[0].children[1].children[1].innerHTML = `<b style='color: #000'>${text} <i class="fa fa-circle " style='color: red'></i></b>`;
    }
});
var timeoutId;
socket.on('global message', function (data) {
    showToast('Thông báo mới', 'warning', 'Thông báo mới từ Quản trị viên', 5000);
    document.getElementById('notification-icon').classList.add('notice');
});
socket.on('admin message', function (data) {
    console.log(data);
});
socket.on('friend status', function (data) {
    // console.log(data);
    if (data.status === 1) {
        // console.log(timeoutId);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    }
    objIndex = app.data.friendData.findIndex((obj) => obj.id === data.id);
    if (app.data.friendData[objIndex]) {
        app.data.friendData[objIndex].status = data.status;
        app.data.friendData[objIndex].lastaccess = data.time;
    }
    // console.log(app.currentInteraction.userid);
    if (Number(app.currentInteraction.userid) === data.id) {
        if (data.status === 0) {
            timeoutId = setTimeout(() => {
                headerChatBoxLeft.querySelector('.infor-user-chat-box').children[1].innerHTML = tools.handleStatus(
                    data.status,
                    'socket',
                );
            }, 2000);
        }
        if (data.status === 1) {
            headerChatBoxLeft.querySelector('.infor-user-chat-box').children[1].innerHTML = tools.handleStatus(
                data.status,
                'socket',
            );
        }
    }
});
const joinRoom = (room) => {
    socket.emit('room', room);
};
const connectSocket = (id) => {
    socket.emit('connect signal', id);
};
const handleSocket = (currentInteraction) => {
    const room = currentInteraction.room;
    socket.emit('room', room);

    inputMessage.onkeypress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.target.nextElementSibling.click();
        }
    };
    inputMessage.oninput = (e) => {
        // console.log(currentInteraction);
        socket.emit('oninput', { room, name: app.data.userData.fullname });
    };
    inputMessage.nextElementSibling.onclick = (e) => {
        // console.log('ok');
        if (inputMessage.value) {
            const oninputEl_displaying = document.getElementById('oninput-wrapper');
            if (oninputEl_displaying) {
                oninputEl_displaying.remove();
            }
            // console.log(app.data.userData);
            const dataMess = new tool.DataMess(
                app.data.userData.id,
                app.data.userData.fullname,
                inputMessage.value,
                tool.getTime(),
                app.data.userData.avatar,
            );
            socket.emit('chat data', { room, dataMess });
            inputMessage.value = '';
            const itemChat = document.createElement('div');
            itemChat.classList.add('item-chat');
            itemChat.classList.add('my-item-chat');
            itemChat.classList.add('animate-append');
            itemChat.innerHTML = itemMess.myItem(dataMess);
            chatContent.appendChild(itemChat);
            chatContent.scrollTop = chatContent.scrollHeight;

            const target = document.getElementById(`${currentInteraction.userid}`);
            // console.log(target);
            const text = tools.handleString(dataMess.text);

            target.children[0].children[1].children[1].innerText = `Bạn: ${text}`;
            target.children[1].children[0].innerText = dataMess.time;
            inputMessage.focus();
        }
    };
};
