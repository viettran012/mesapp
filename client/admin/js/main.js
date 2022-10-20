const adminApp = {
    currentTab: 0,
    data: {
        allUser: [],
    },
    handleChangeTab: function (tab) {
        if (tab === 0) {
            adminInfor = tools.getDataLocalStorage('admin');
            titleInnerMainContent.querySelector('.title-h2').innerText = 'Dashboard';
            mainContent_.innerHTML = `<div class='chat-content-loading'><div class="nb-spinner"></div><span>Đang tải dữ liệu...</span></div>`;
            $.post(SEVER + '/auth/admin/user/all', adminInfor, function (data) {
                mainContent_.innerHTML = '';
                const numberUser = data.data.length;
                // console.log(adminApp.render.dashboardView(numberUser));
                mainContent_.appendChild(adminApp.render.dashboardView(data.data));
                tools.drawChart();
                adminApp.handleEvent();
                titleInnerMainContent.querySelector('.fa-sync-alt').classList.remove('loading');
                ioConfig();
            });
        }
        if (tab === 1) {
            titleInnerMainContent.querySelector('.title-h2').innerText = 'Quản lý người dùng';
            mainContent_.innerHTML = `<div class='chat-content-loading'><div class="nb-spinner"></div><span>Đang tải dữ liệu...</span></div>`;

            adminInfor = tools.getDataLocalStorage('admin');
            $.post(SEVER + '/auth/admin/user/all', adminInfor, function (data) {
                // console.log(data);
                adminApp.data.allUser = data.data;
                // const userDatas = tools.sortByName(data.data);
                adminApp.render.tableUser(adminApp.data.allUser);

                adminApp.handleToolip('.fa-question-circle', titleHeaderContent, 'right');
                titleInnerMainContent.querySelector('.fa-sync-alt').classList.remove('loading');
                ioConfig();
            });
        }
        if (tab === 2) {
            titleInnerMainContent.querySelector('.title-h2').innerText = 'Gửi thông báo';
            mainContent_.innerHTML = `<div class='chat-content-loading'><div class="nb-spinner"></div><span>Đang tải dữ liệu...</span></div>`;
            adminInfor = tools.getDataLocalStorage('admin');
            $.post(SEVER + '/auth/admin/user/all', adminInfor, function (data) {
                // console.log(data);
                adminApp.data.allUser = data.data;
                mainContent_.innerHTML = `
                <div class= 'form-mesage'>
                    <p class='title-msg'>Tới:</p> 
                    <div class="choose-sex-infor">
                            <input type="radio" name="type-send" value="1" id="ck-msg-1" checked>
                            <label for="ck-msg-1">Tất cả</label>
                            <input type="radio" name="type-send" value="2" id="ck-msg-2">
                            <label for="ck-msg-2">Lựa chọn</label>
                        </div>
                    <div class='choose-user-to-send-area'>
                        <div>${data.data
                            .map((dt) => {
                                return `
                                <div class='choose-user-to-send-area-item'>
                                    <img src=${dt.avatar}> 
                                    <p>${dt.fullname}</p>
                                    <span>${tools.handleStatus(dt.status, 'send-msg')}</span>
                                    <input class='checkbox-msg' type="checkbox" id="${dt.id}"  value="${dt.id}" checked>
                                    <i class="fas fa-check-circle"></i>
                                </div>
                            `;
                            })
                            .join('')}</div>
                    </div>
                    <p class='title-msg'>Tiêu đề:</p> <input id='title-input-msg' type='text'>
                    <p class='title-msg'>Nội dung:</p> <textarea id='text-mesage' type='text'></textarea>
                    <div class='send-msg-btn'>Gửi<div>
                </div>
            `;
                //handle Event
                $_('#title-input-msg').onfocus = (e) => {
                    e.target.style.borderColor = 'var(--main-boder-color)';
                };
                $_('#text-mesage').onfocus = (e) => {
                    e.target.style.borderColor = 'var(--main-boder-color)';
                };
                document.getElementById('ck-msg-1').onchange = (e) => {
                    e.target.onclick = (e) => {
                        document.querySelectorAll('.choose-user-to-send-area-item').forEach((el) => {
                            el.classList.add('checked_');
                            el.querySelector('.checkbox-msg').checked = true;
                        });
                    };
                    if (e.target.checked) {
                        document.querySelectorAll('.choose-user-to-send-area-item').forEach((el) => {
                            el.classList.add('checked_');
                            el.querySelector('.checkbox-msg').checked = true;
                        });
                    }
                };
                document.getElementById('ck-msg-2').onchange = (e) => {
                    e.target.onclick = (e) => {
                        document.querySelectorAll('.choose-user-to-send-area-item').forEach((el) => {
                            el.classList.remove('checked_');
                            el.querySelector('.checkbox-msg').checked = false;
                        });
                    };
                    if (e.target.checked) {
                        document.querySelectorAll('.choose-user-to-send-area-item').forEach((el) => {
                            el.classList.remove('checked_');
                            el.querySelector('.checkbox-msg').checked = false;
                        });
                    }
                };
                document.querySelectorAll('.choose-user-to-send-area-item').forEach((el) => {
                    el.classList.toggle('checked_');
                    el.onclick = (e) => {
                        el.classList.toggle('checked_');
                        el.querySelector('.checkbox-msg').checked = !el.querySelector('.checkbox-msg').checked;
                    };
                });
                document.querySelector('.send-msg-btn').onclick = () => {
                    if ($_('#title-input-msg').value !== '' && $_('#text-mesage').value !== '') {
                        const dataMes = {
                            title: $_('#title-input-msg').value,
                            message: $_('#text-mesage').value,
                        };
                        socket.emit('global message', dataMes);
                        $_('#title-input-msg').value = '';
                        $_('#text-mesage').value = '';
                        showToast('Thành công', 'success', 'Vừa đi gửi một thông báo', 3000);
                        return;
                    }
                    if ($_('#title-input-msg').value === '') {
                        $_('#title-input-msg').style.borderColor = 'red';
                    }
                    if ($_('#text-mesage').value === '') {
                        $_('#text-mesage').style.borderColor = 'red';
                    }
                };
            });
        }
        if (tab === 3) {
            titleInnerMainContent.querySelector('.title-h2').innerText = 'Cập nhật phiên bản';
            mainContent_.innerHTML = `<div class='chat-content-loading'><div class="nb-spinner"></div><span>Tính năng chưa cập nhật...</span></div>`;
        }
        if (tab === 4) {
            titleInnerMainContent.querySelector('.title-h2').innerText = 'Cài đặt';
            mainContent_.innerHTML = `<div class='chat-content-loading'><div class="nb-spinner"></div><span>Tính năng chưa cập nhật...</span></div>`;
        }
    },
    handleEvent: function () {
        adminApp.handleToolip('.fa-sync-alt', updateTitle, 'bottom');
        if ($_('.fullname-user-table')) {
            $_('.fullname-user-table').onclick = (e) => {
                const sortStatus = $_('.fullname-user-table').getAttribute('sort');
                // console.log(sortStatus);
                if (sortStatus === 'false') {
                    const data = [...adminApp.data.allUser];
                    tools.sortByName(data);
                    adminApp.render.tableUser(data);
                    $_('.fullname-user-table').innerHTML = 'Tên hiển thị <i class="fas fa-caret-up"></i>';
                    $_('.fullname-user-table').setAttribute('sort', 'true');
                } else {
                    // console.log(adminApp.data.allUser);
                    adminApp.render.tableUser(adminApp.data.allUser);
                    $_('.fullname-user-table').setAttribute('sort', 'false');
                }
            };
        }
        closeOpacityBtn.onclick = (e) => {
            opacity.style.display = 'none';
            opacityChildren.classList.toggle('animate__zoomIn');
        };
        titleInnerMainContent.querySelector('.fa-sync-alt').onclick = (e) => {
            if (adminApp.currentTab === 0) {
                adminApp.handleChangeTab(0);
                titleInnerMainContent.querySelector('.fa-sync-alt').classList.add('loading');
            }
            if (adminApp.currentTab === 1) {
                adminApp.handleChangeTab(1);
                titleInnerMainContent.querySelector('.fa-sync-alt').classList.add('loading');
            }
            if (adminApp.currentTab === 2) {
                adminApp.handleChangeTab(2);
                titleInnerMainContent.querySelector('.fa-sync-alt').classList.add('loading');
            }
        };

        if (adminApp.data.allUser.length !== 0) {
            $$_('.detail-user-td').forEach((el) => {
                // console.log(el);
                el.onclick = (e) => {
                    const id = el.parentElement.querySelector('.id-user-table').innerText;
                    // console.log(id);
                    const data = adminApp.handleData.findId(Number(id), adminApp.data.allUser);
                    opacity.style.display = 'flex';
                    opacityChildren.classList.toggle('animate__zoomIn');
                    opacityChildrentitle.getElementsByTagName('h3')[0].innerText = `Người dùng`;
                    opacityChildren.lastChild.remove();
                    opacityChildren.appendChild(userDetails(data).detailsElement);

                    const optionUserDetails_ = $_('.option-user-details_');
                    const tabArea = $_('.main-option-user-details_');

                    if (tabArea) {
                        tabArea.innerHTML = userDetails(data).detailsUser;
                    }
                    //handle Event switch tab

                    if (optionUserDetails_) {
                        optionUserDetails_.children[0].addEventListener('click', () => {
                            if (optionUserDetails_.children[0].className.includes('active')) {
                                return;
                            }
                            tabArea.innerHTML = userDetails(data).detailsUser;
                        });
                        optionUserDetails_.children[1].addEventListener('click', () => {
                            if (optionUserDetails_.children[1].className.includes('active')) {
                                return;
                            }
                            tabArea.innerHTML = userDetails(data).statisticalsUser;
                        });
                        optionUserDetails_.children[2].addEventListener('click', () => {
                            if (optionUserDetails_.children[2].className.includes('active')) {
                                return;
                            }
                            tabArea.innerHTML = userDetails(data).optionsUser;
                        });
                    }
                    //handle Event active title

                    const spanOption_ = $_('.option-user-details_').querySelectorAll('span');
                    spanOption_.forEach((el) => {
                        el.onclick = (e) => {
                            spanOption_.forEach((el) => el.classList.remove('active'));
                            el.classList.add('active');
                        };
                    });
                };
            });
        }
        dashboard.onclick = (e) => {
            adminApp.currentTab = 0;
            tools.removeMenucardActive();
            dashboard.classList.add('active');
            adminApp.handleChangeTab(0);
        };
        usersManange.onclick = (e) => {
            adminApp.currentTab = 1;
            tools.removeMenucardActive();
            usersManange.classList.add('active');
            adminApp.handleChangeTab(1);
        };
        sendNotification.onclick = (e) => {
            adminApp.currentTab = 2;
            tools.removeMenucardActive();
            sendNotification.classList.add('active');
            adminApp.handleChangeTab(2);
        };
        updateVersion.onclick = (e) => {
            adminApp.currentTab = 3;
            tools.removeMenucardActive();
            updateVersion.classList.add('active');
            adminApp.handleChangeTab(3);
        };
        seting.onclick = (e) => {
            adminApp.currentTab = 4;
            tools.removeMenucardActive();
            seting.classList.add('active');
            adminApp.handleChangeTab(4);
        };
    },
    handleToolip: function (querySelector, content, position_ = 'bottom') {
        tippy(querySelector, {
            content: content,
            placement: position_,
        });
    },
    handleData: {
        findId: function (id, datas) {
            return datas.find((userInfo) => {
                return userInfo.id === id;
            });
        },
    },
    render: {
        tableUser: function (data) {
            mainContent_.innerHTML = '';
            mainContent_.appendChild(userTable(data));
            adminApp.handleToolip('.fullname-user-table', 'Sắp xếp theo tên');
            adminApp.handleToolip('.user-infor-th-input-wrapper', 'Tìm kiếm');
            adminApp.handleEvent();
        },
        dashboardView: function (data) {
            const numberUser = data.length;
            const userActive = data.filter((user) => user.status === 1);
            const numberuserActive = userActive.length;

            const percentActive = Math.round((numberuserActive / numberUser) * 100 * 100) / 100;

            // console.log(userActive);
            const dbViewEl = document.createElement('div');
            dbViewEl.classList.add('dashboard-view');
            dbViewEl.innerHTML = `
            <div class='db-card'>
                <div class='db-card-l1'>
                    <div class="pie animate" style="--p:100;--c:var(--bg-color)"><span>${numberUser}</span></div>  
                    <p>Tổng số lượng người dùng</p>  
                </div>   

                <div class='db-card-l1'>
                    <div class="pie animate" style="--p:${percentActive};--c:var(--active-color)"><span>${numberuserActive}</span><p>(~${percentActive}%)</p></div>  
                    <p>Đang hoạt động</p>  
                </div>   
                    
            </div>
            <div class='db-bottom'>
                <div class='sever-status'>
                    <div class='db-card-l1'>
                        <div class="pie animate" style="--p:64;--c:var(--orange)"><span>64%</span></div>  
                        <p>Trạng thái sever</p>  
                        <p>CPU: 60%</p>  
                        <p>RAM: 67%</p>  
                     
                    </div> 
                </div>
                <div id='db-chart'></div>
            </div>
            
            
            `;
            return dbViewEl;
        },
    },
    config: function () {
        adminApp.handleChangeTab(0);
    },
    start: function () {
        adminApp.config();
    },
};
adminApp.start();
