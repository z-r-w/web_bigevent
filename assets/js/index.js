$(function () {
    getUserInfo()

    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否退出登录?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
          });
    })
    

})
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {Authorization: localStorage.getItem('token') || '' },
        success: function (res) {
            if (res.status !== 0) {
                // 获取用户信息失败了返回提示
                return layui.layer.msg('获取用户信息失败')
            }
            // 成功了渲染用户信息
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     // console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }


    })
}
// 渲染头像
function  renderAvatar(data) {
    let name =data.nickname || data.username
    $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)
    if (data.user_pic !== null) {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', data.user_pic).show()
    } else {
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}