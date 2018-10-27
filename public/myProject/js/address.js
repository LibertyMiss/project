$(function () {
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success:function (res) {
            console.log(res);
            var html = template('addressTpl', {res:res});
            // console.log(html);
            $('#address').html(html);
        }
    })

    $('#address').on('tap', '.deleteAdress',function () {
        var id = $(this).data('id');
        alert(id);
        $.ajax({
            url: '/address/deleteAddress',
            type: 'post',
            data:{
               id:id,
            },
            success:function (res) {
                if(res.success){
                    mui.toast('删除地址成功');
                    location.reload();
                }else{
                     mui.toast('删除地址失败');
                }
            }
        })
    })
})