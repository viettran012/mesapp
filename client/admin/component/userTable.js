const userTable = (data) => {
    const divEl = document.createElement('div');
    divEl.classList.add('user-table');
    if (data) {
        divEl.innerHTML = `
    <table class="main-user-table" style="padding: 0; border: none;">
    <thead>
        <tr>
            <th class="user-infor-th" colspan="6"> <div class="user-infor-th-input-wrapper"><input class="user-infor-th-input" placeholder="Nhập tên người dùng" type="text"/><i class="fas fa-search"></i></div>Thông tin người dùng</th>
            <th colspan="1" rowspan="2" class="user-status-th">Trạng thái hoạt động</th>
            <th colspan="1" rowspan="2" class='detail-user-td'>Chi tiết</th>
        </tr>
            <tr class="user-tr-lv2">
            <th colspan="1" class='id-user-table'>ID</th>
            <th class="fullname-user-table" sort='false'>Tên hiển thị <i class="fas fa-caret-down"></i></th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Ảnh đại diện</th>
            <th>Quyền</th>
        </tr>
    </thead>
    <tbody class='tbody-user'>
        ${data
            .map((dataUser) => {
                return `
            <tr class="user-table-tr">
                <td class='center-text id-user-table' user-id = '${dataUser.id}'>${dataUser.id}</td>
                <td class='highlight-text'>${dataUser.fullname}</td>
                <td>${tools.handleSex(dataUser.sex)}</td>
                <td>${tools.handleBirthdate(dataUser.birthdate)}</td>
                <td>
                    ${tools.handleStringLength(dataUser.avatar)}
                </td>
                <td>${dataUser.permission}</td>
                <td class='center-text user-status-th'><i class="fa fa-circle ${tools
                    .handleStatus(dataUser.status, 'table')
                    .toLowerCase()}"></i> ${tools.handleStatus(dataUser.status, 'table')}</td>
                <td class='detail-user-td center-text'>Chi tiết</td>
        </tr>
            `;
            })
            .join('')}
            </tbody>
    </table>
    `;
    }
    return divEl;
};
