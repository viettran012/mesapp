var userInfor = localStorage.getItem('userinforLogin');
userInfor = JSON.parse(userInfor);
if (userInfor) {
    $.post(SEVER + '/auth/login', userInfor, function (data) {
        if (data.status === 1) {
            window.location = CLIENT;
        } else {
            console.log('auto login false');
            document.querySelector('.content-loading').style.display = 'none';
        }
    });
} else {
    document.querySelector('.content-loading').style.display = 'none';
}

$(function () {
    $('.btn').click(function () {
        $('.form-signin').toggleClass('form-signin-left');
        $('.form-signup').toggleClass('form-signup-left');
        $('.frame').toggleClass('frame-long');
        $('.signup-inactive').toggleClass('signup-active');
        $('.signin-active').toggleClass('signin-inactive');
        $('.forgot').toggleClass('forgot-left');
        $(this).removeClass('idle').addClass('active');
    });
});

$(function () {
    $('.form-signup').submit(function (e) {
        e.preventDefault();
        handleSubmit('fullname_re', 'isText', 5);
        handleSubmit('email_re', 'isEmail');
        handleSubmit('pass_re', 'isText', 5);
        handleSubmit('confirm_pass_re', 'isConfirmPass', 5);
        if (
            handleSubmit('fullname_re', 'isText', 5) &&
            handleSubmit('email_re', 'isEmail') &&
            handleSubmit('pass_re', 'isText', 5) &&
            handleSubmit('confirm_pass_re', 'isConfirmPass', 5)
        ) {
            const params = {
                fullname: getInput('fullname_re'),
                email: getInput('email_re'),
                pass: getInput('pass_re'),
            };

            $.post(SEVER + '/auth/register', params, function (data) {
                if (data.status === 1) {
                    $('.nav').toggleClass('nav-up');
                    $('.form-signup-left').toggleClass('form-signup-down');
                    $('.success').toggleClass('success-left');
                    $('.frame').toggleClass('frame-short');
                    document.querySelector('.successtext').innerHTML =
                        'Thanks for signing up! Please go back to login to login <i class="fas fa-arrow-right"></i>';
                }
                if (data.status === 2) {
                    document.querySelector('.no_re').children[0].innerText = 'This email is already registered';
                }
                if (data.status === 0) {
                    document.querySelector('.no_re').children[0].innerText =
                        'There were some errors :(, please re-register later';
                }
            });
        } else {
            // console.log('false');
        }
    });
});

$(function () {
    $('.form-signin').submit(function (e) {
        e.preventDefault();
        handleSubmit('email', 'isEmail');
        handleSubmit('pass', 'isText', 5);
        if (handleSubmit('email', 'isEmail') && handleSubmit('pass', 'isText', 5)) {
            const params = {
                email: getInput('email'),
                pass: getInput('pass'),
            };
            $.post(SEVER + '/auth/login', params, function (data) {
                if (data.status === 1) {
                    document.querySelector('.form-signin').style.opacity = '0';
                    document.querySelector('.successtext').innerText = 'Successful, redirecting to homepage...';
                    $('.nav').toggleClass('nav-up');
                    $('.form-signup-left').toggleClass('form-signup-down');
                    $('.success').toggleClass('success-left');
                    $('.frame').toggleClass('frame-short');
                    document.querySelector('.successtext').classList.add('cc');
                    window.location = CLIENT;
                    // var version = localStorage.getItem('version');
                    localStorage.setItem('userinforLogin', JSON.stringify(params));
                    localStorage.setItem('userinfor', JSON.stringify(data.data[0]));
                }
                if (data.status === 0) {
                    document.querySelector('.no_log').children[0].innerHTML = 'Incorrect account or password';
                }
            });
        } else {
        }
    });
});

var pass_;
function handleEvent() {
    handleInput('email', 'isEmail');
    handleInput('pass', 'isText', 5);

    handleInput('fullname_re', 'isText', 5);
    handleInput('email_re', 'isEmail');
    handleInput('pass_re', 'isText', 5);
    handleInput('confirm_pass_re', 'isConfirmPass', 5);
}

function handleInput(id, type, lengthRule) {
    if (type === 'isEmail') {
        const input = document.querySelector(`#${id}`);
        input.onblur = (e) => {
            if (!input.value.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                input.classList.add('illegal');
                input.placeholder = 'Trường bắt buộc';
            }
        };
        input.onfocus = (e) => {
            document.querySelector('.no_re').children[0].innerText = '';
            document.querySelector('.no_log').children[0].innerText = '';
            input.classList.remove('illegal');
            input.placeholder = '';
        };
    }

    if (type === 'isText') {
        const input = document.querySelector(`#${id}`);
        input.onblur = (e) => {
            if (input.value === '' || input.value.length < lengthRule) {
                input.classList.add('illegal');
                input.placeholder = 'Trường bắt buộc';
            } else {
                pass_ = input.value;
            }
        };
        input.onfocus = (e) => {
            input.classList.remove('illegal');
            input.placeholder = '';
            document.querySelector('.no_re').children[0].innerText = '';
            document.querySelector('.no_log').children[0].innerText = '';
        };
    }

    if (type === 'isConfirmPass') {
        const input = document.querySelector(`#${id}`);
        input.onblur = (e) => {
            if (input.value !== pass_ || input.value.length < lengthRule) {
                input.classList.add('illegal');
                input.placeholder = 'Trường bắt buộc';
            }
        };
        input.onfocus = (e) => {
            input.classList.remove('illegal');
            input.placeholder = '';
            document.querySelector('.no_re').children[0].innerText = '';
            document.querySelector('.no_log').children[0].innerText = '';
        };
    }
}

function handleSubmit(id, type, lengthRule) {
    const input = document.querySelector(`#${id}`);
    if (type === 'isEmail') {
        if (!input.value.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            input.classList.add('illegal');
            input.placeholder = 'Trường bắt buộc';
            return false;
        }
    }

    if (type === 'isText') {
        if (input.value === '' || input.value.length < lengthRule) {
            input.classList.add('illegal');
            input.placeholder = 'Trường bắt buộc';
            return false;
        } else {
            pass_ = input.value;
        }
    }

    if (type === 'isConfirmPass') {
        if (input.value !== pass_ || input.value.length < lengthRule) {
            input.classList.add('illegal');
            input.placeholder = 'Trường bắt buộc';
            return false;
        }
    }
    return true;
}
function getInput(id) {
    return document.querySelector(`#${id}`).value;
}

handleEvent();
