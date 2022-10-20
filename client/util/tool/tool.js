const tool = {
    getTime: function () {
        var d = new Date();
        var h = d.getHours();
        h < 10 ? (h = '0' + h) : (h = h);
        var m = d.getMinutes();
        m < 10 ? (m = '0' + m) : (m = m);
        var s = d.getSeconds();
        s < 10 ? (s = '0' + s) : (s = s);
        var day = d.getDate();
        day < 10 ? (day = '0' + day) : (day = day);
        var mo = d.getMonth() + 1;
        mo < 10 ? (mo = '0' + mo) : (mo = mo);
        return h + ':' + m;
    },
    DataMess: function (userId, userName, textChat, timeChat, avatar) {
        this.id = userId;
        this.username = userName;
        this.text = textChat;
        this.time = timeChat;
        this.avatar = avatar;
    },
};
