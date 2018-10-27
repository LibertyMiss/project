$(function () {
    $('.my-footer').on('tap', 'a', function () {
        window.location.href = this.href;
    });
      $('#loginBtn').on('tap', function () {
        //   alert(123);
        //获取表单数据
        var userContent = $.trim($('[name="username"]').val());
        var password = $.trim($("[name = 'password']").val());
            
        if (userContent.length <= 0) {
            mui.toast('请输入用户名');
            return;
        }
        if (password.length <= 0) {
            mui.toast('请输入密码');
            return;
        }

        $.ajax({
            url: '/user/login',
            type:'post',
            data:{
               username: userContent,
               password: password,
            },
            // beforeSend: function () {
            //     $(this).html('正在登录中');
            // },
            success:function (res) {
                console.log(res);
                setTimeout(function () {
                    //检测之前是否有登陆的状态
                    if(localStorage.getItem('returnUrl')){
                        location.href = localStorage.getItem('returnUrl');
                        localStorage.removeItem('returnUrl')
                    }else{
                        location.href = "user.html";
                    }
                })
            }
        })
    })
})