const userDetails = (data) => {
    const detailsElement = document.createElement('div');
    detailsElement.classList.add('user-details_');
    // console.log(data);

    detailsElement.innerHTML = `
        <div class='option-user-details_'>
            <span class='active'>Chi tiết</span>
            <span>Thống kê</span>
            <span>Thao tác</span>
        </div>
        <div class='main-option-user-details_'></div>
    `;

    const detailsUser = `
    
    <div class='main-option-user-details_page1 animate__animated animate__slideInUp'>           
        <div class="card-infor_">
            <span>ID:</span>
            <span>${data.id}</span>
        </div>      
        <div class="card-infor_">
            <span>Tên hiển thị:</span>
            <span>${data.fullname}</span>
        </div>               
        <div class="card-infor_">
            <span>Giới tính:</span>
            <span>${tools.handleSex(data.sex)}</span>
        </div>               
        <div class="card-infor_">
            <span>Ngày sinh:</span>
            <span>${tools.handleBirthdate(data.birthdate)}</span>
        </div>              
        <div class="card-infor_">
            <span>Avatar:</span>
            <span>${tools.handleBirthdate(data.avatar)}</span>
        </div>                
        <div class="card-infor_">
            <span>Quyền:</span>
            <span>${data.permission}</span>
        </div>    
        <div class="card-infor_">
            <span>Ngày khởi tạo:</span>
            <span>${tools.handleTime(new Date(data.createat))}</span>
        </div>  
        <div class="card-infor_">
            <span>Trạng thái hoạt động:</span>
            <span>${tools.handleStatus(data.status, 'details')}</span>
        </div>  
        <div class="card-infor_">
            <span>Truy cập lần cuối:</span>
            <span>${tools.handleLastaccess(new Date(data.lastaccess), data.status)}</span>
        </div>  
    <div>

    `;

    const statisticalsUser = `
        <div class='main-option-user-details_page2 animate__animated animate__slideInUp' >
        <span>Thống kê: Chưa có dữ liệu.</span>
        </div>
    `;
    const optionsUser = `
    <div class='main-option-user-details_page3 animate__animated animate__slideInUp' >
    <span>Thoa tác</span>
    </div>
`;
    return { detailsElement, detailsUser, optionsUser, statisticalsUser };
};
