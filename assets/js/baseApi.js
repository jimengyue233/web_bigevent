// 注意每次调用$.get()或$.post()或$.ajax()的时候，
// 会先调用ajaxPrefilter这个函数
// 在这个函数中。可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //统一添加请求的基准路径
    options.url = 'http://127.0.0.1:2333' + options.url;
    if (options.url.includes('/my')) {
        options.headers = {
            'Authorization': localStorage.getItem('token')
        }
    }
    //统一设置完成的回调（任何一个请求都会执行这个回调）
    options.complete = function (res) {
        const {
            status,
            message
        } = res.responseJSON;
        if (status === 1 && message === "身份认证失败") {
            clearToken();
        }
    }



})