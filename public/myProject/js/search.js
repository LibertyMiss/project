$(function () {
    $('.my-footer').on('tap', 'a', function () {
        window.location.href = this.href;
    });
    $('#searchBtn').on('click', function () {
        var value = $('#keyword').val();
        // console.log(value);
        if (!value) {
            alert('请输入关键字');
        }

        if (localStorage.getItem('forwords')){
            var keywords = JSON.parse(localStorage.getItem('forwords'));
            // var keywords = JSON.parse(localStorage.getItem('keywords'));
            // console.log(keywords);
            keywords.unshift(value);
            console.log(keywords);
            localStorage.setItem('forwords',JSON.stringify(keywords));
        }else{
            //键为forwords,值为数组,才能添加元素
            var val = JSON.stringify([value]);
            localStorage.setItem('forwords',val);
        }
        // var newArr = [];
        // newArr.unshift(value);
        // console.log(newArr);      
    })

    // 获取历史记录                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    if (localStorage.getItem('forwords')){   
        var obj = JSON.parse(localStorage.getItem('forwords'));
        console.log(obj);
        $('#historySearch').html(template('historySearchTpl', {
            data: obj
        }))
    }

    $('#clearHistory').on('click',function () {
        localStorage.removeItem('forwords');
        $('#historySearch').html('');
    })
})