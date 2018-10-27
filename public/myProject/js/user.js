$(function () {
      $.ajax({
          url: '/user/queryUserMessage',
          type: 'get',
          async: false,
          success: function (res) {

              //如果用户未登录
              if (res.error == 400) {
                  localStorage.setItem('returnUrl', location.href);
                  location.href = 'login.html'
              } else {
                  var html = template('userTpl', res);
                  console.log(res);
                  console.log(html);
                  $('#user').html(html);
              }
          }
      })
    $('.my-footer').on('tap', 'a', function () {
        window.location.href = this.href;
    });

      
    $('#logout').on('tap', function () {
        $.ajax({
            url: '/user/logout',
            type:'get',
            success:function (res) {
                if(res.success){
                    location.href = 'index.html'
                }else{
                    mui.toast('退出登录失败');
                } 
            }
        })
    })


})