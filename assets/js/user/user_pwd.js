// 利用 `lay-verify` 来设置自定义校验规则
$(function () {
    const form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {

                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })
    // 发起请求实现重置密码的请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                const {
                    status,
                    message
                } = res;
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！');
                // 重置表单
                $('.layui-form')[0].reset();
            }
        })
    })
})
// 重置密码失败不知带为啥？？？后端接口更改密码没问题
// 解决：后端只设置了两个接口原密码（oldPwd）新密码（newPwd），这边需要删除一个确认新密码获取加一个确认新密码的接口