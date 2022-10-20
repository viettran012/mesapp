const cardUser = {
    menuChat: function (userData, mess) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card-box-chat');
        cardElement.id = userData.id;
        cardElement.innerHTML = `
                                <div class="card-left">
                                    <div class="card-img">
                                    <div class="wrapper-card-img">
                                        <img
                                            src="${userData.avatar}"
                                        />
                                    </div>
                                    </div>
                                    <div class="infor-user-card">
                                        <p>${userData.fullname}</p>
                                        <span></span>
                                    </div>
                                </div>

                                <div class="time-infor">
                                    <span></span>
                                </div>
                         `;
        return cardElement;
    },
    searchCard: function (userData, fullname) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card-box-chat');
        cardElement.classList.add('card-box-chat-search');
        cardElement.id = 'search' + userData.id;
        cardElement.innerHTML = `
                                <div class="card-left">
                                    <div class="card-img">
                                    <div class="wrapper-card-img">
                                        <img
                                            src="${userData.avatar}"
                                        />
                                    </div>
                                    </div>
                                    <div class="infor-user-card">
                                        <p>${fullname}</p>
                                        <span></span>
                                    </div>
                                </div>

                                <div class="time-infor">
                                    <span></span>
                                </div>
                         `;
        return cardElement;
    },
};
