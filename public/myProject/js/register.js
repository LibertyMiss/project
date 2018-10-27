$(function () {
    $('.my-footer').on('tap', 'a', function () {
        window.location.href = this.href;
    });
    $('#regBtn').on('tap',function () {
        //获取表单数据
        var userContent = $.trim($('[name="username"]').val());
        var tel = $.trim($('[name = "mobile"]').val());
        var password = $.trim($("[name = 'password']").val());
        var againpass = $.trim($('[name = "againpass"]').val());
        var checkCode = $.trim($('[name = "checkCode"]').val());

        
        if (userContent.length <= 0){
            alert('请输入用户名')
            return;
        }
        if (!(/^1[34578]\d{9}$/.test(tel))) {
            alert("手机号码有误，请重填");
            return ;
        }
        if ((password != againpass) || (password.length <= 0) || (againpass.length <= 0)) {
            alert('两次密码输入不一致');
        }

        $.ajax({
            url: '/user/register',
            type:'post',
            data:{
                username: userContent,
                password: password,
                mobile: tel,
                vCode: checkCode,
            },
            success:function (res) {
                console.log(res);
                setTimeout(function () {
                    location.href = "login.html";
                },2000)
                
            }
        })

        
    })
    $('#getCode').on('tap',function() {
        $.ajax({
            url: '/user/vCode',
            type: 'get',
            success: function (res) {
                console.log(res);
            }
        })
    })
    
})