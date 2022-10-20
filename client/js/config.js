const iconSidebarTop = [
    {
        id: '1',
        name: 'Tin nhắn',
        idName: 'mesage-icon',
        icon: 'fa-comment-dots',
        isActive: 'active',
    },
    {
        id: '2',
        name: 'Danh bạ',
        idName: 'directory-icon',
        icon: 'fa-address-book',
        isActive: '',
    },
    {
        id: '3',
        name: 'Thông báo',
        idName: 'notification-icon',
        icon: 'fa-bell',
        isActive: '',
    },
];

const iconSidebarBottom = [
    {
        id: '1',
        name: 'Cloud',
        idName: 'cloud-icon',
        icon: 'fa-cloud-upload-alt',
    },
    {
        id: '2',
        name: 'Công cụ',
        idName: 'tool-box-icon',
        icon: 'fa-toolbox',
    },
    {
        id: '3',
        name: 'Cài đặt',
        idName: 'setting-icon',
        icon: 'fa-cog',
    },
];

const iconChatAction = [
    {
        id: '1',
        name: 'Image',
        idName: 'image-icon',
        icon: 'fa-image',
        isActive: 'active',
    },
    {
        id: '2',
        name: 'Attach',
        idName: 'attach-icon',
        icon: 'fa-paperclip',
        isActive: '',
    },
    {
        id: '3',
        name: 'Screenshot',
        idName: 'screenshot-icon',
        icon: 'fa-tablet-alt',
        isActive: '',
    },
    {
        id: '4',
        name: 'Id card',
        idName: 'id-card-icon',
        icon: 'fa-address-card',
        isActive: 'active',
    },
    {
        id: '5',
        name: 'Clock',
        idName: 'clock-icon',
        icon: 'fa-clock',
        isActive: '',
    },
    {
        id: '6',
        name: 'Todo',
        idName: 'todo-icon',
        icon: 'fa-calendar-check',
        isActive: '',
    },
    {
        id: '7',
        name: 'Format',
        idName: 'format-icon',
        icon: '<fas fa-underline',
        isActive: 'active',
    },
    {
        id: '8',
        name: 'Notice',
        idName: 'notice-icon',
        icon: 'fa-exclamation',
        isActive: '',
    },
];

document.querySelector('.top-sidebar').innerHTML = iconSidebarTop
    .map((icon) => {
        return `
    <div id='${`${icon.idName}`.trim()}' class="item-sidebar ${icon.isActive}">
        <i class="fas ${icon.icon}"></i>
        <span class='notice-sidebar-icon'></span>
    </div>
    `;
    })
    .join('');

document.querySelector('.bottom-sidebar').innerHTML = iconSidebarBottom
    .map((icon) => {
        return `
    <div id='${`${icon.idName}`.trim()}' class="item-sidebar ">
        <i class="fas ${icon.icon}"></i>
    </div>
    `;
    })
    .join('');

document.querySelector('.chat-action').innerHTML = iconChatAction
    .map((icon) => {
        return `
    <div id='${`${icon.idName}`.trim()}' class="item-chat-action"><i class="fas ${icon.icon}"></i></div>
    `;
    })
    .join('');

chatContent.scrollTop = chatContent.scrollHeight;

//typpy

iconSidebarTop.forEach((icon) => {
    tippy(`#${icon.idName}`, {
        content: icon.name,
        placement: 'right',
    });
});
iconSidebarBottom.forEach((icon) => {
    tippy(`#${icon.idName}`, {
        content: icon.name,
        placement: 'right',
    });
});
