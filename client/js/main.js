const app = {
    currentInteraction: {},
    data: {
        userData: {},
        friendData: [],
    },
    handleEvent: function () {
        $_('.back-to-menu-btn').onclick = (e) => {
            chatBox.classList.add('animate__animated');
            chatBox.classList.add('animate__slideOutRight');
            // chatBox.style.display = 'none';
            mainContent.classList.remove('active');
        };
        if (document.getElementById('notification-icon')) {
            document.getElementById('notification-icon').onclick = (e) => {
                document.getElementById('notification-icon').classList.remove('notice');
                wrapperOpacity.style.display = 'flex';
                wrapperOpacity.children[0].classList.add('animate__animated');
                wrapperOpacity.children[0].classList.add('animate__zoomIn');
                wrapperOpacity.children[0].children[1].innerHTML = '<h3>Thông báo</h3>';

                const optionEl = document.createElement('div');
                optionEl.classList.add('notification-area');

                $.post(SEVER + '/api/message/notification', app.data.userData, function (data) {
                    optionEl.innerHTML = `
                    ${data.data
                        .map((notification) => {
                            return `
                        <div class='notification-card'>
                            <p class='notification-title'>${notification.title}</p>
                            <p>Nội dung: ${notification.message}</p>
                            <p style='margin-top: 10px'>Vào lúc: <b>${tools.handleTime(
                                new Date(notification.time),
                            )}</b></p>
                        </div>
                        `;
                        })
                        .join('')}                        
                    
                    `;
                });

                optionEl.innerHTML = `
                <div class='chat-content-loading'><div class="nb-spinner"></div><span>Đang tải...</span></div>
                `;
                wrapperOpacity.children[0].appendChild(optionEl);
            };
        }
        cardBoxChat.forEach((el, index) => {
            el.onclick = (e) => {
                chatContent.innerHTML = `<div class='chat-content-loading'><div class="nb-spinner"></div><span>Đang tải tin nhắn...</span></div>`;
                cardBoxChat.forEach((els) => {
                    els.classList.remove('active');
                });
                mainContent.classList.add('active');
                chatBox.classList.remove('animate__animated');
                chatBox.classList.remove('animate__slideOutRight');
                chatBox.style.display = 'block';
                el.classList.add('active');
                const myId = app.data.userData.id;
                const friendId = el.id;
                localStorage.setItem('currenChat', friendId);
                // console.log(el.querySelector('.infor-user-card').children[0].innerText);
                const room = friendId < myId ? String(friendId) + myId : String(myId) + friendId;
                app.currentInteraction = {
                    userid: friendId,
                    room: room,
                    roomName: el.querySelector('.infor-user-card').children[0].innerText,
                    imgRoom: el.querySelector('.wrapper-card-img').children[0].src,
                };

                const currentFriendInteraction = app.data.friendData.find(
                    (data) => data.id === Number(app.currentInteraction.userid),
                );
                // console.log(app.currentInteraction);
                headerChatBoxLeft.querySelector('.wrapper-image-user-chat-box').children[0].src =
                    app.currentInteraction.imgRoom;
                headerChatBoxLeft.querySelector('.infor-user-chat-box').children[0].innerText =
                    app.currentInteraction.roomName;
                headerChatBoxLeft.querySelector('.infor-user-chat-box').children[1].innerHTML = tools.handleStatus(
                    currentFriendInteraction.status,
                    'seen',
                    currentFriendInteraction.lastaccess,
                );
                // console.log(currentFriendInteraction);

                handleSocket(app.currentInteraction);
                headerChatbox.style.display = 'flex';
                chatArea.style.display = 'block';
                app.handleConfigUI.messages(app.data.userData);
            };
        });
        document.body.onclick = (e) => {
            // console.log(e.target);
            menuOption.style.display = 'none';
        };
        wrapperUserSidebar.onclick = (e) => {
            e.stopPropagation();
            menuOption.style.display = 'block';
            menuOption.classList.add('animate__animated');
            menuOption.classList.add('animate__fadeInRight');
        };
        menuOption.onclick = (e) => {
            // e.stopPropagation();
        };
        menuOptionLogout.onclick = (e) => {
            wrapperOpacity.style.display = 'flex';
            wrapperOpacity.children[0].classList.add('animate__animated');
            wrapperOpacity.children[0].classList.add('animate__zoomIn');
            wrapperOpacity.children[0].children[1].innerHTML = '<h3>Xác nhận</h3>';

            const logoutConfirmEl = document.createElement('div');
            logoutConfirmEl.classList.add('logout-confirm');
            logoutConfirmEl.innerHTML = `
            <div>
                <span>Bạn có muốn đăng xuất khỏi Mes?</span>
            </div>
            <div class='logout-confirm-btn'>
                <button>Không</button>
                <button>Đăng xuất</button>
            </div>
            `;
            wrapperOpacity.children[0].appendChild(logoutConfirmEl);

            wrapperOpacity.querySelector('.logout-confirm-btn').children[0].onclick = (e) => {
                closeOpacityBtn.click();
            };
            wrapperOpacity.querySelector('.logout-confirm-btn').children[1].onclick = (e) => {
                localStorage.removeItem('userinforLogin');
                localStorage.removeItem('userinfor');
                localStorage.removeItem('currenChat');
                window.location = CLIENT;
            };
        };
        menuOptionOption.children[0].onclick = (e) => {
            wrapperOpacity.style.display = 'flex';
            wrapperOpacity.children[0].classList.add('animate__animated');
            wrapperOpacity.children[0].classList.add('animate__zoomIn');
            wrapperOpacity.children[0].children[1].innerHTML = '<h3>Thông tin tài khoản</h3>';

            const birthdate = app.data.userData.birthdate || 'Chưa cập nhật';
            const sex = tools.handleSex(app.data.userData.sex);
            const optionEl = document.createElement('div');
            optionEl.classList.add('user-infor-details');
            optionEl.innerHTML = `
            <div class='av-name-infor'>
                <div class='img-user'><img src=${app.data.userData.avatar} /></div>
                <h3>${app.data.userData.fullname}</h3>
            </div>
            <div class='main-infor-details'>
                <div>
                    <p>Thông tin cá nhân</p>
                    <p class='infor'><span class='title-main-infor-details'>Email</span> <span>${app.data.userData.email}</span></p>
                    <p class='infor'><span class='title-main-infor-details'>Giới tính</span> <span>${sex}</span></p>
                    <p class='infor'><span class='title-main-infor-details'>Ngày sinh</span> <span>${birthdate}</span></p>
                </div>
                <div class='edit-user-infor-btn'><i class="fas fa-pen"></i> <span>Cập nhật thông tin</span><div>
            
            </div>
            `;
            wrapperOpacity.children[0].appendChild(optionEl);

            wrapperOpacity.querySelector('.edit-user-infor-btn').onclick = (e) => {
                closeOpacityBtn.click();
                wrapperOpacity.style.display = 'flex';
                wrapperOpacity.children[0].classList.add('animate__animated');
                wrapperOpacity.children[0].classList.add('animate__fadeInDown');
                wrapperOpacity.children[0].children[1].innerHTML = '<h3>Cập nhật thông tin</h3>';
                const optionEl = document.createElement('div');
                optionEl.classList.add('user-infor-details');
                optionEl.innerHTML = `
                <div class='av-name-infor'>
                    <div class='av-name-edit'>
                        <div class='img-user'><img src=${app.data.userData.avatar} /></div>
                        <span class="av-name-infor-edit"><i class="fas fa-camera"></i><span>
                    </div>
                </div>

                <div class='nameuser-edit'>
                    <p>Tên hiển thị</p>
                    <input type = 'text' id='username' />
                </div>
                <div class='main-infor-details'>
                    <p class = 'title-infor-edit'>Thông tin cá nhân</p>
                     
                    <p class='infor'><span class='title-main-infor-details edit'>Giới tính</span></p>
                        <div class='choose-sex-infor'>
                            <input type = 'radio' name = 'sex-infor' value='0' id='male'/>
                            <label  for='male' >Nam</label>
                            <input type = 'radio' name = 'sex-infor' value='1' id='female'/>
                            <label for='female'>Nữ</label>
                        </div>

                    <p class='infor'><span class='title-main-infor-details edit'>Ngày sinh</span></p>
                    <input class='birthdate-edit' type='date' id='birthdate'/>
                       
                    <div class='logout-confirm-btn'>
                        <button>Huỷ</button>
                        <button>Cập nhật</button>
                    </div>              
                </div>
                `;

                wrapperOpacity.children[0].appendChild(optionEl);
                wrapperOpacity.querySelector('.main-infor-details').style.height = 'unset';
                wrapperOpacity.querySelector('.nameuser-edit').children[1].value = app.data.userData.fullname;
                wrapperOpacity.querySelector('.birthdate-edit').value = app.data.userData.birthdate;
                if (app.data.userData.sex === '0') {
                    // console.log(wrapperOpacity.querySelector('#male'));
                    wrapperOpacity.querySelector('#male').checked = true;
                }
                if (app.data.userData.sex === '1') {
                    wrapperOpacity.querySelector('#female').checked = true;
                }

                //handleRvent
                wrapperOpacity.querySelector('.logout-confirm-btn').children[0].onclick = (e) => {
                    closeOpacityBtn.click();
                };
                wrapperOpacity.querySelector('.logout-confirm-btn').children[1].onclick = (e) => {
                    let sex_checked = wrapperOpacity.querySelector("input[name='sex-infor']:checked");
                    if (sex_checked) {
                        sex_checked = sex_checked.value;
                    } else {
                        sex_checked = '';
                    }
                    let birthdate_seted = wrapperOpacity.querySelector('.birthdate-edit');
                    if (birthdate_seted) {
                        birthdate_seted = birthdate_seted.value;
                    } else {
                        birthdate_seted = '';
                    }
                    const body = {
                        id: app.data.userData.id,
                        fullname: wrapperOpacity.querySelector('.nameuser-edit').children[1].value,
                        email: app.data.userData.email,
                        pass: app.data.userData.pass,
                        sex: sex_checked,
                        birthdate: birthdate_seted,
                    };
                    closeOpacityBtn.click();
                    // console.log(body);
                    $.post(SEVER + '/auth/update/user', body, function (data) {
                        if (data.status === 1) {
                            app.data.userData.fullname = body.fullname;
                            app.data.userData.sex = body.sex;
                            app.data.userData.birthdate = body.birthdate;
                            document.querySelector('.menu-option-username').children[0].innerText =
                                app.data.userData.fullname;
                            showToast('Thành công', 'success', 'Cập nhật thông tin thành công', toast_duration);
                            // console.log('ok');
                        } else {
                            showToast('Lỗi', 'error', 'Có lỗi khi cập nhật', toast_duration);
                            // console.log('false');
                        }
                    });
                };
            };
        };

        closeOpacityBtn.onclick = (e) => {
            wrapperOpacity.style.display = 'none';
            wrapperOpacity.children[0].lastChild.remove();
            wrapperOpacity.children[0].classList.remove('animate__animated');
            wrapperOpacity.children[0].classList.remove('animate__zoomIn');
            wrapperOpacity.children[0].classList.remove('animate__fadeInDown');
        };

        // handle Search
        searchInput.onfocus = (e) => {
            mainMenuChatContent.style.opacity = '0.6';
            mainMenuChatContent.style.backgroundColor = '#00000014';
            searchResultArea.style.display = 'block';
            actionMenu.innerHTML = '<span class="close-btn-search">Đóng</span>';

            document.querySelector('.close-btn-search').onclick = (el) => {
                searchResultArea.style.display = 'none';
                actionMenu.innerHTML = '<i class="fas fa-user-plus"></i> <i class="fas fa-users"></i>';
                mainMenuChatContent.style.opacity = '1';
                mainMenuChatContent.style.backgroundColor = '#ffffff';
                searchInput.value = '';
                searchResultArea.innerHTML = '<p class="title-search-result">Nhập từ khoá</p>';
            };
        };
        searchInput.oninput = (e) => {
            if (e.target.value === ' ') {
                e.target.value = '';
                return;
            }
            app.debounceSearch(e.target.value.trim());
        };
        inputMessage.onfocus = (e) => {
            chatInput.style.borderTop = '1px solid var(--B60)';
        };
        inputMessage.onblur = (e) => {
            chatInput.style.borderTop = '1px solid var(--main-boder-color)';
        };
    },

    debounceSearch: tools.debounce((value) => {
        if (value) {
            fetch(`${SEVER}/api/search/user?q=${value}`)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data.data.fullname);
                    if (data.data.length !== 0) {
                        if (app.data.userData.fullname.toLowerCase().includes(value.toLowerCase())) {
                            searchResultArea.innerHTML = `<p class="title-search-result">Có <span class='highlight-text'>${
                                data.data.length - 1
                            }</span> kết quả phù hợp</p>`;
                        } else {
                            searchResultArea.innerHTML = `<p class="title-search-result">Có <span class='highlight-text'>${data.data.length}</span> kết quả phù hợp</p>`;
                        }
                        data.data.forEach((dataUser) => {
                            if (dataUser.id !== app.data.userData.id) {
                                const fullname = tools.handleSearchString(value, dataUser.fullname);
                                searchResultArea.appendChild(cardUser.searchCard(dataUser, fullname));
                            }
                        });

                        $$_('.card-box-chat-search').forEach((el) => {
                            el.onclick = (el1) => {
                                document.getElementById(`${el.id.slice(6)}`).click();
                            };
                        });
                    } else {
                        searchResultArea.innerHTML = '<p class="title-search-result">Không tìm thấy kết quả</p>';
                    }
                });
        } else {
            searchResultArea.innerHTML = '<p class="title-search-result">Nhập từ khoá</p>';
        }
    }, 500),
    handleData: {
        getUserData: function () {
            var userInfor = localStorage.getItem('userinforLogin');
            userInfor = JSON.parse(userInfor);
            // app.data.userData = userInfor;
            return userInfor;
        },
        getAllMessage: function (api) {
            return new Promise((resolve, reject) => {
                fetch(api)
                    .then(function (data) {
                        return data.json();
                    })
                    .then(function (data) {
                        if (data.feedback == 0) {
                            resolve();
                        }
                        resolve(data);
                    });

                // setTimeout(() => reject(), 10000);
            });
        },
    },
    checkLogin: function () {
        const userInfor = app.handleData.getUserData();

        if (userInfor) {
            $.post(SEVER + '/auth/login', userInfor, function (data) {
                if (data.status === 1) {
                    // console.log('true');
                    // document.querySelector('.content-loading').style.display = 'none';
                    app.data.userData = data.data[0];
                    localStorage.setItem('userinfor', JSON.stringify(data.data[0]));
                    userSidebar.children[0].children[0].src = app.data.userData.avatar;
                    document.querySelector('.menu-option-username').children[0].innerText = app.data.userData.fullname;
                    // app.handleConfigUI.messages(userInfor);
                    app.handleConfigUI.cardUser(userInfor);
                    connectSocket(app.data.userData.id);
                } else {
                    console.log('false');
                    window.location = CLIENT + '/util/login';
                }
            });
        } else {
            console.log('false');
            window.location = CLIENT + '/util/login';
        }
    },
    handleConfigUI: {
        messages: function (userInfor) {
            // console.log(app.data.userData);
            const body = { email: userInfor.email, pass: userInfor.pass, room: app.currentInteraction.room };
            // console.log(body);
            $.post(SEVER + '/api/message/room', body, function (data) {
                // console.log(data);
                chatContent.innerHTML = '';
                if (data.status === 1) {
                    document.querySelector('.content-loading').style.display = 'none';
                    data.data.reverse().forEach((dataMess) => {
                        // console.log(dataMess.id);
                        if (dataMess.userid !== app.data.userData.id) {
                            const itemChat = document.createElement('div');
                            itemChat.classList.add('item-chat');
                            itemChat.innerHTML = itemMess.item(dataMess);
                            chatContent.appendChild(itemChat);
                            chatContent.scrollTop = chatContent.scrollHeight;
                        } else {
                            const itemChat = document.createElement('div');
                            itemChat.classList.add('item-chat');
                            itemChat.classList.add('my-item-chat');
                            itemChat.innerHTML = itemMess.myItem(dataMess);
                            chatContent.appendChild(itemChat);
                            chatContent.scrollTop = chatContent.scrollHeight;
                        }
                    });
                } else {
                    console.log('false');
                    // window.location = CLIENT + '/util/login';
                }
            });
        },
        cardUser: function (userInfor) {
            $.post(SEVER + '/auth/user/all', userInfor, function (data) {
                if (data.status === 1) {
                    // console.log('true');
                    app.data.friendData = data.data;
                    app.data.friendData.forEach((userData, index) => {
                        const userData_ = app.data.userData;
                        const myId = userData_.id;
                        const friendId = userData.id;
                        const room = friendId < myId ? String(friendId) + myId : String(myId) + friendId;
                        const body = { email: userData_.email, pass: userData_.pass, room: room };

                        joinRoom(room);
                        $.post(SEVER + '/api/message/oneline/room', body, function (data) {
                            const target = document.getElementById(`${userData.id}`);
                            if (data.data[0] !== undefined) {
                                const text = tools.handleString(data.data[0].text);

                                if (data.data[0].userid !== app.data.userData.id) {
                                    target.children[0].children[1].children[1].innerText = `${text}`;
                                } else {
                                    target.children[0].children[1].children[1].innerText = `Bạn: ${text}`;
                                }
                                target.children[1].children[0].innerText = data.data[0].time;
                            } else {
                                if (target) {
                                    target.children[0].children[1].children[1].innerText = 'Chưa có tin nhắn...';
                                    target.children[1].children[0].innerText = '';
                                }
                            }
                            document.querySelector('.content-loading').style.display = 'none';
                        });

                        if (userData.id !== app.data.userData.id) {
                            const el = cardUser.menuChat(userData);
                            mainMenuChatContent.appendChild(el);
                        }
                        // console.log(room);
                        reDefineVar();
                        app.handleEvent();
                    });
                    var currenChat = localStorage.getItem('currenChat');

                    if (screen.width >= 992) {
                        if (!currenChat) {
                            $$_('.card-box-chat')[0].click();
                        } else {
                            document.getElementById(`${currenChat}`).click();
                        }
                    }
                } else {
                    console.log('false');
                    // window.location = CLIENT + '/util/login';
                }
            });
        },
    },
    start: function () {
        app.checkLogin();
        app.handleEvent();
    },
};
app.start();
