$(function () {
    $('.my-footer').on('tap', 'a', function () {
        window.location.href = this.href;
    });
    var str = window.location.href;
    //封装获取地址栏参数的函数
    function getUrl(url,name) {
        var arr = url.substr(url.indexOf('?') + 1).split('&');
        for(i = 0;i < arr.length;i++){
            var newArr = arr[i].split('=');
            if(newArr[0] == name){
                return newArr[1];
            }
        }
        return null;
    }
    var result = getUrl(str,'key');
    var page = 1;
    var pricesort = 1;
    var This = null;
    var pricesortNum = 1;
   
//页面加载时自动调用一次函数,发送ajax请求
   	mui.init({
   	    pullRefresh: {
   	        container: document.querySelector('#searchListBox'), //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
   	        up: {
   	            height: 50, //可选.默认50.触发上拉加载拖动距离
   	            auto: true, //可选,默认false.自动上拉加载一次
   	            contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
   	            contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
   	            callback: getAjax //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
   	        }
   	    }
    });
       
    $('#priceSort').on('tap',function() {
        // 1 是升序,2是降序
        pricesort = pricesort == 1 ? 2 : 1;
        console.log(pricesortNum);
        // 初始化
        //先清空页面中的数据
        $('#searchBox').html('');
        // 让页面加载第一页的数据
        page = 1;
        mui('#searchListBox').pullRefresh().refresh(true);
        getAjax();
    })

    $('#numSort').on('tap', function () {
        // 1 是升序,2是降序
        pricesortNum = pricesortNum == 1 ? 2 : 1;
        console.log(pricesortNum);
        // 初始化
        //先清空页面中的数据
        $('#searchBox').html('');
        // 让页面加载第一页的数据
        page = 1;
        mui('#searchListBox').pullRefresh().refresh(true);
        getAjax();
    })
    function getAjax() {
        if(!This){
            This = this;
        }
         $.ajax({
             url: '/product/queryProduct',
             type: 'get',
             data: {
                 page: page++,
                 pageSize: 3,
                 proName: result,
                 price: pricesort,
                 num: pricesortNum,
             },
             success: function (res) {
                //  console.log(res);
                // if(res.data.length > 0){
                //     var content = $('#searchBox').html();
                //     var html = content + template('searchList', res);
                //     //  console.log(html);
                //     $('#searchBox').html(html);
                //     This.endPullupToRefresh(false);
                // }else {
                //     This.endPullupToRefresh(true);
                // } 
                var content = $('#searchBox').html();
                var html = content + template('searchList', res);
                //  console.log(html);
                $('#searchBox').html(html);
                This.endPullupToRefresh(res.data.length = 0);
            }
         })
    }
})