$(function () {
    // 调用getUserInfo获取用户的基本信息
    getUserInfo();
    const layer = layui.layer;
    // 点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确认退出登录 ? ', {
                icon: 3,
                title: '提示 '
            }, function (index) {
                //do something
                // 1清空本地存储中的token
                localStorage.removeItem('token');
                // 2重新跳转登录页面
                location.href = '/login.html';
                // 关闭confirm询问框
                layer.close(index)
            },
            // function(){console.log('cancel');
            // }//可以回调函数
        )
    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        methods: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 调用renderAvater渲染用户的头像
            renderAvatar(res);
        }
        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function(res) {
        //   // console.log('执行了 complete 回调：')
        //   // console.log(res)
        //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //     // 1. 强制清空 token
        //     localStorage.removeItem('token')
        //     // 2. 强制跳转到登录页面
        //     location.href = '/login.html'
        //   }
        // }

    })
}
//渲染用户头像信息
function renderAvatar(user) {
    // 获取用户的名称
    const name = user.nickname || user.username;
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img')
            .attr('src'.user.user_pic)
            .show()
        $('.text_avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        const first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();

    }
}