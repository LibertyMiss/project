$(function () {
    $('#getCheckCode').on('tap',function () {
        $.ajax({
            url: '/user/vCode',
            type:'get',
            success:function (res) {
                console.log(res);
            }
        })
    })
    $('#modifyBtn').on('tap',function () {
        var originPass = $.trim($("[name = 'originPass']").val());
        var newPass = $.trim($("[name = 'newPass']").val());
        var sureNewPass = $.trim($("[name = 'sureNewPass']").val());
        var checkCode = $.trim($("[name = 'checkCode']").val());
        console.log(checkCode);

        if (originPass.length <= 0) {
            alert('请输入原密码');
            return;
        }

        if ((newPass != sureNewPass) || (sureNewPass.length <= 0) || (newPass.length <= 0)) {
            alert('两次密码输入不一致');
            return;
        }

        // if (!/^\d{6}$/.test(checkCode)) {

        //     mui.toast('验证码的格式不符合要求');

        //     return;

        // }

        $.ajax({
            url: '/user/updatePassword',
            type:'post',
            data:{
                oldPassword: originPass,
                newPassword: newPass,
                reNewPassword: sureNewPass,
                vCode: checkCode,
            },
            success:function (res) {
                if(res.success){
                    console.log(success);
                    setTimeout(function () {
                        location.href = "login.html";
                    }, 2000)
                }else{
                    $('#modifyBtn').html('修改密码');
                    console.log(res);
                    mui.toast('密码修改失败:' + res.message);
                    //如果用户未登录
                    if(res.success == 400){
                        localStorage.setItem('forwords',location.href);
                        setTimeout(function () {
                            location.href = "login.html";
                        }, 2000)
                    }
                }
            }
        })
    }) 
    // $('#getCheckCode').on('tap', getCheckCode);
})