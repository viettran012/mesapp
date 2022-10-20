const itemMess = {
    item: function (dataMess) {
        return `
                          
                                <div class="user-icon-content-item-chat">
                                    <img
                                        src="${dataMess.avatar}"
                                        alt="icon-user"
                                    />
                                </div>
                                <div class="content-item-chat">
                                    <span class="user-name-content-item-chat">${dataMess.username}</span>
                                    <p>${dataMess.text}</p>
                                    <span>${dataMess.time}</span>
                                </div>
                            
        `;
    },
    myItem: function (dataMess) {
        return `
                           
                                <div class="user-icon-content-item-chat">
                                    <img
                                    src="${dataMess.avatar}"
                                        alt="icon-user"
                                    />
                                </div>
                                <div class="content-item-chat">
                                    <p>${dataMess.text}</p>
                                    <span>${dataMess.time}</span>
                                </div>
                           
        `;
    },
};
