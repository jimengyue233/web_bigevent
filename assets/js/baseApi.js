// 注意每次调用$.get()或$.post()或$.ajax()的时候，
// 会先调用ajaxPrefilter这个函数
// 在这个函数中。可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //统一添加请求的基准路径
    options.url = 'http://127.0.0.1:2333' + options.url;
    // 统一为有权限的接口设置header请求头
    if (options.url.includes('/my')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // //统一设置完成的回调（任何一个请求都会执行这个回调）
    // options.complete = function (res) {
    //     const {
    //         status,
    //         message
    //     } = res.responseJSON;
    //     if (status === 1 && message === "身份认证失败") {
    //         clearToken();
    //     }
    // }

    options.complete = function (res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})