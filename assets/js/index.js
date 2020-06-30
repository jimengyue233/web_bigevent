$(function () {
    // 调用getUserInfo获取用户的基本信息
    getUserInfo();
    var layer = layui.layer;
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
        type: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || '',
        },
        success: function (res) {
            // console.log(res);
            // if (res.status !== 0) {
            if (res.status) {
                return layer.msg(res.message)
            }
            // 调用renderAvater渲染用户的头像
            renderAvater(res.data);
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
function renderAvater(user) {

    // 获取用户的名称
    var name = user.nickname || user.username;



    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        // $('.text_avatar').hide();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        const first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();

    }
}




// 刘苏
// $(function () {
//     getUserInfo();
//     var layer = layui.layer;
//     $('#btnLogout').on('click', function () {

//         layer.confirm('确定退出登录？', {
//             icon: 3,
//             title: '提示'
//         }, function (index) {

//             localStorage.removeItem('token');

//             location.href = '/login.html';
//             layer.close(index);
//         })
//     })

// })

// function getUserInfo() {
//     $.ajax({
//         type: 'GET',
//         url: '/my/userinfo',

//         headers: {
//             Authorization: localStorage.getItem('token') || '',
//         },
//         success: function (res) {
//             if (res.status) {
//                 return layer.msg(res.message);
//             }
//             renderAvater(res.data);
//         }
//     })
// }


// function renderAvater(user) {
//     var name = user.nickname || user.username;
//     $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
//     if (user.user_pic !== null) {
//         $('.layui-nav-img').attr('src', user.user_pic).show();
//         $('.text-avatar').hide();
//     } else {
//         $('.layui-nav-img').hide();
//         $('.text-avatar').html(name[0].toUpperCase()).show();

//     }
// }