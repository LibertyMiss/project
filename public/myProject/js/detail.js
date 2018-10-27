$(function () {
    var num = 1
    var bigNum = 0;
    var sizeNum = -1;
    //获取地址栏中id
    function getUrl(url, name) {
        var arr = url.substr(url.indexOf('?') + 1).split('&');
        for (i = 0; i < arr.length; i++) {
            var newArr = arr[i].split('=');
            if (newArr[0] == name) {
                return newArr[1];
            }
        }
        return null;
    }
    var id = getUrl(location.href,'id');
    console.log(id);
    
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{
            id:id,
        },
        success:function (res) {
            for (i = 0; i < res.pic.length; i ++){
                res.data = res.pic[i].picAddr.replace(/\/mobile/,'.');
            }
            console.log(res);
            console.log(res.pic);
            console.log(res.proName);
            if(!res.error){
                var size = res.size.split('-');
                bigNum = res.num;
                console.log(bigNum);
                
                var start = size[0];
                var end = size[1];
                res.arr = [];
                for(i = start; i <= end; i++){
                    res.arr.push(i);
                }
                console.log(res.arr);
                var html = template('detailTpl', {res:res});
                console.log(html);
                $('#detailBox').html(html);    
            }
        }
    })

    $('#detailBox').on('tap','.detail-size',function () {
        $(this).addClass('.active').siblings().remove('.active');
        sizeNum = $(this).html();
    })
    $('#detailBox').on('blur','.num',function (){
        num = $('.num').val();
        alert(num);
    })
    $('#detailBox').on('tap','.reduce', function () {
        num--;
        if(num <= 1){
            num = 1;
        }

       $('.num').val(num);
        
    })
    $('#detailBox').on('tap', '.plus', function () {
        num++;
        if (num >= bigNum){
            num = bigNum;
        }
    
       $('.num').val(num);
    })
    	$('#addCart').on('tap', function () {

    	    if (sizeNum == -1) {

    	        alert('请选择尺码');

    	        return;

    	    }

    	    $.ajax({
    	        type: 'post',
    	        url: '/cart/addCart',
    	        data: {
    	            productId: id,
    	            num: num,
    	            size: sizeNum
    	        },
    	        success: function (result) {

    	            if (result.error && result.error == 400) {

    	                localStorage.returnUrl = location.href;

    	                // location.href = "login.html";

    	            }


    	            if (result.success) {

    	                mui.confirm('添加成功,去购物车看看?', '温馨提示', ['确定', '取消'], function (message) {

    	                    if (message.index == 0) {

    	                        location.href = "cart.html";

    	                    }
    	                })

    	            }
    	        }
    	    })

    	});

})