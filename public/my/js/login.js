$(function() {
    $.ajax({
        url: '/employee/checkRootLogin',
        type: 'get',
        success: function (result) {

            if (result.success) {

                location.href = "user.html";

            }

        }
    })
    
    $('#loginBtn').on('click',function () {
        var username = $('#username').val().trim();
        var password = $('#password').val().trim();

        if((username.length <= 0) || (password.length <= 0)){
            alert('请输入完整信息');
            return;
        }
        // console.log(username);
        // console.log(password);  
        
        $.ajax({
            url: '/employee/employeeLogin',
            type:'post',
            data:{
                username: username,
                password: password,
            },
            success:function (res) {
                console.log(res);
            }
        })
    })
})