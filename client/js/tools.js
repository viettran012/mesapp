const tools = {
    handleString: function (input) {
        if (input.length > 20) {
            return input.slice(0, 15) + '...';
        } else {
            return input;
        }
    },
    handleSex: function (input) {
        if (input === '0') {
            return 'Nam';
        }
        if (input === '1') {
            return 'Nữ';
        }
        if (input === '') {
            return 'Chưa cập nhật';
        }
    },
    handleSearchString: function (value, string) {
        const toLowerCaseString = string.toLowerCase();
        if (toLowerCaseString.includes(value.toLowerCase())) {
            const index = toLowerCaseString.search(value.toLowerCase());
            const text = string.slice(index, index + value.length);
            // console.log(text);
            // console.log(index);
            const highlight = `<span class='highlight-text'>${text}</span>`;
            const result = string.slice(0, index) + highlight + string.slice(index + value.length);
            // console.log(result);
            return result;
        } else return string;
    },
    debounce: function (func, wait, immediate) {
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
    },
    handleStatus: function (status, type, time) {
        if (type === 'seen') {
            if (status === 1) {
                return `
            <i class="fa fa-circle on"></i> Đang hoạt động
            `;
            } else {
                // console.log(new Date() + '      ' + new Date(time));
                // console.log(Math.abs(new Date() - new Date(time)));
                // console.log(new Date(time));
                const sec_num = Math.abs(new Date() - new Date(time));
                return `
            <i class="fa fa-circle off"></i> <span>${tools.handleLastAccess(Math.floor(sec_num / 1000))}</span> 
            `;
            }
        }
        if (type === 'socket') {
            if (status === 1) {
                return `
            <i class="fa fa-circle on"></i> Đang hoạt động
            `;
            } else {
                return `
            <i class="fa fa-circle off"></i> <span>Truy cập 0 phút trước</span> 
            `;
            }
        }
    },
    handleTime: function (date) {
        d = date;
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
        var y = d.getFullYear();
        return h + ':' + m + ':' + s + ' ' + day + '/' + mo + '/' + y;
    },
    handleTimeStatus: function (date) {
        d = date;
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
        var y = d.getFullYear();
        return h + ':' + m + ' ' + day + '/' + mo;
    },
    handleLastAccess: function (sec_num) {
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - hours * 3600) / 60);
        var seconds = sec_num - hours * 3600 - minutes * 60;

        // if (hours < 10) {
        //     hours = '0' + hours;
        // }
        // if (minutes < 10) {
        //     minutes = '0' + minutes;
        // }
        // if (seconds < 10) {
        //     seconds = '0' + seconds;
        // }
        // console.log(minutes);

        if (hours >= 24) {
            return `Truy cập ${Math.floor(hours / 24)} ngày trước`;
        } else if (hours > 0) {
            return `Truy cập ${hours} giờ trước`;
        } else {
            return `Truy cập ${minutes} phút trước`;
        }
    },
};
