$(function () {
    var form = layui.form;
    var layer = layui.layer;
   
    form.verify({ 
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()
// 重置按钮
   $('#btnReset').on('click', function (e) {
       e.preventDefault()
       initUserInfo()
   })
//    用户信息发起更新
   $('.layui-form').on('submit', function (e) {
       e.preventDefault()
       $.ajax({
           method: 'post',
           url: '/my/userinfo',
           data: $(this).serialize(),
           success: function (res) {
               if (res.status !== 0) {
                   layer.msg('更新失败')
               }
               layer.msg('更新成功')
               window.parent.getUserInfo()
           }
       })

   })

   
})

// 给表单赋值
function initUserInfo() {
    var layer = layui.layer;
    var form = layui.form;
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                layer.msg('请求失败')
            }
            console.log(res)
            form.val('formTest', res.data)
        }
    })
}