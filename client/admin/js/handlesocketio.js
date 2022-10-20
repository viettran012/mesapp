const inputMessage = document.querySelector('.input-message');
const chatContent = document.querySelector('.chat-content');

// let user_name = prompt('Please enter your name:', '');
var socket = io.connect(SEVER);
window.onbeforeunload = function () {
    socket.close();
};

var timeoutId;
function ioConfig() {
    socket.on('friend status', function (data) {
        // console.log(adminApp.data.allUser);

        if (adminApp.data.allUser.length === 0) {
            return;
        }
        objIndex = adminApp.data.allUser.findIndex((obj) => obj.id === data.id);
        // console.log(objIndex);
        if (adminApp.data.allUser[objIndex]) {
            adminApp.data.allUser[objIndex].status = data.status;
        }
        const userRow = document.querySelector(`.id-user-table[user-id='${data.id}']`);
        // if (data.status === 1) {
        //     // console.log(timeoutId);
        //     if (timeoutId) {
        //         console.log('clear');
        //         clearTimeout(timeoutId);
        //     }
        // }

        if (userRow) {
            if (data.status === 0) {
                userRow.parentElement.querySelector('.user-status-th').innerHTML = `<i class="fa fa-circle ${tools
                    .handleStatus(data.status, 'table')
                    .toLowerCase()}"></i> ${tools.handleStatus(data.status, 'table')}`;
            }
            if (data.status === 1) {
                userRow.parentElement.querySelector('.user-status-th').innerHTML = `<i class="fa fa-circle ${tools
                    .handleStatus(data.status, 'table')
                    .toLowerCase()}"></i> ${tools.handleStatus(data.status, 'table')}`;
            }
        }
    });
}
