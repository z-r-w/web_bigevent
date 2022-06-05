
   $( function () {
        // 点击去登录
        $('#login').on('click', function () {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击去注册
        $('#reg').on('click', function () {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        // 密码框验证
        layui.form.verify({
            pass: [
                /^[\S]{6,10}$/
                ,'密码必须6到10位，且不能出现空格'
              ],
            repass: function (value) {
                let result = $('.reg-box [name="password"]').val()
                if (result !== value) {
                    return '两次输入的密码不一致'
                }
            }
        })
        // 发送注册请求
        let layer = layui.layer;
        $('#form-reg').on('submit', function (e) {
            e.preventDefault()
            $.post('/api/reguser',{username: $('.reg-box [name="title"]').val(), password: $('.reg-box [name="repassword"]').val()},
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message); 
                }
                layer.msg('注册成功')
                $('#reg').click()
            })

        })
        // 发送登录请求
        $('#form-login').submit(function (e) {
            e.preventDefault()
            $.ajax({
                url: '/api/login',
                method: 'POST',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('登录失败')
                    }
                    layer.msg('登录成功')
                    console.log(res.token)
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                }

            })
        })

   })
    
