const $_ = document.querySelector.bind(document);
const $$_ = document.querySelectorAll.bind(document);

const toast_duration = 2000;

//const
const searchInput = $_('.search-input');
const mainMenuChatContent = $_('.main-menu-chat-content');
const inforUserChatBox = $_('.infor-user-chat-box');
const headerChatBoxLeft = $_('.header-chat-box-left');
const userSidebar = $_('.user-sidebar');
const chatArea = $_('.chat-area');
const headerChatbox = $_('.header-chat-box');
const wrapperUserSidebar = $_('.wrapper-user-sidebar');
const menuOption = $_('.menu-option');
const menuOptionLogout = $_('.menu-option-logout');
const closeOpacityBtn = $_('.close-opacity-btn');
const wrapperOpacity = $_('.wrapper-opacity');
const menuOptionOption = $_('.menu-option-option');
const searchResultArea = $_('.search-result_area');
const actionMenu = $_('.action-menu');
const chatInput = $_('.chat-input');
const chatBox = $_('.chat-box');
const mainContent = $_('.main-content');
// const inputMessage = $_('.input-message');
//var
var cardBoxChat = $$_('.card-box-chat');

const reDefineVar = () => {
    cardBoxChat = $$_('.card-box-chat');
};
