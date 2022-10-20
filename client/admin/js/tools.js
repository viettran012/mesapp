const tools = {
    getDataLocalStorage: function (name) {
        const item = localStorage.getItem(name);
        return JSON.parse(item);
    },
    handleSex: function (sexCode) {
        if (sexCode === '0') {
            return 'Nam';
        }
        if (sexCode === '1') {
            return 'Nữ';
        }
        return 'Chưa cập nhật';
    },
    handleBirthdate: function (date) {
        if (date === '') {
            return 'Chưa cập nhật';
        }
        return date;
    },
    handleStringLength: function (input) {
        if (input.length > 20) {
            return input.slice(0, 15) + '...';
        } else {
            return input;
        }
    },
    handleStatus: function (input, where) {
        if (where === 'table') {
            if (input === 1) {
                return 'ON';
            }
            if (input === 0) {
                return 'OFF';
            }
        }
        if (where === 'details') {
            if (input === 1) {
                return '<i class="fa fa-circle on"></i>Đang hoạt động';
            }
            if (input === 0) {
                return '<i class="fa fa-circle off"></i>Đang offline';
            }
        }
        if (where === 'send-msg') {
            if (input === 1) {
                return '<i class="fa fa-circle on"></i>';
            }
            if (input === 0) {
                return '<i class="fa fa-circle off"></i>';
            }
        }
    },

    sortByName: function (data) {
        const sortData = data.sort(function (a, b) {
            if (a.fullname < b.fullname) {
                return -1;
            }
            if (a.fullname > b.fullname) {
                return 1;
            }
            return 0;
        });
        return sortData;
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
    handleLastaccess: function (date, status) {
        if (status === 1) {
            return 'Đang truy cập';
        }
        if (status === 0) {
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
        }
    },
    displayLoader: function () {
        mainContent_.innerHTML = `
            <div class='chat-content-loading'><div class="nb-spinner"></div><span>Đang tải dữ liệu...</span></div>
        `;
    },
    removeMenucardActive: function () {
        mainSidebarContent.querySelectorAll('.ct-card').forEach((el) => {
            el.classList.remove('active');
            // console.log(el);
        });
    },
    drawChart: function () {
        $(function daw_chart() {
            // console.log(document.getElementById(''))
            Highcharts.chart('db-chart', {
                title: {
                    text: '<p style="font-family: Arial, Helvetica, sans-serif; font-size: 1.4rem">Người dùng đăng kí mới 10 ngày gần nhất</p>',
                },
                xAxis: {
                    categories: [
                        '<p style="font-size: 10px; color: rgb(145, 138, 138);">10<p>',
                        '<p style="font-size: 10px; color: rgb(145, 138, 138);">9<p>',
                        '<p style="font-size: 10px; color: rgb(145, 138, 138);">8<p>',
                        '<p style="font-size: 10px; color: rgb(145, 138, 138);">7<p>',
                        '<p style="font-size: 10px; color: rgb(145, 138, 138);">6<p>',
                        '<p style="font-size: 10px; color: rgb(145, 138, 138);">5<p>',
                        '<p style="font-size: 10px; color: rgb(145, 138, 138);">4<p>',
                        '<p style="font-size: 10px; color: rgb(145, 138, 138);">3<p>',
                        '<p style="font-size: 10px; color: rgb(145, 138, 138);">2<p>',
                        '<p style="font-size: 10px; color: rgb(145, 138, 138);">1<p>',
                    ],
                },
                yAxis: {
                    title: {
                        text: '<p style="font-family: Arial, Helvetica, sans-serif; font-size: 1.4rem color: rgb(145, 138, 138);">Số lượng<p>',
                    },
                    plotLines: [
                        {
                            value: 0,
                            width: 1,
                            color: '#808080',
                        },
                    ],
                },
                tooltip: {
                    valueSuffix: ' người dùng',
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'right',
                    borderWidth: 0,
                },
                series: [
                    {
                        name: '<p style="font-size: 8px; color: rgb(145, 138, 138);">Người<p>',
                        data: [23, 25, 21, 18, 23, 22, 19, 23, 21, 32],
                    },
                ],
            });
        });
    },
};
