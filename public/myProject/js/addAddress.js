$(function () {
    //封装切割地址栏参数的函数
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
    var recipients = $('[name = "recipients"]').val().trim();
    var postcode = $('[name = "postcode"]').val().trim();
    var address = $('[name = "address"]').val().trim();
    var addressDetail = $('[name = "addressDetail"]').val().trim();
    var id = getUrl(location.href, 'id')
    var picker = new mui.PopPicker({
        layer: 3,
    });
    picker.setData(cityData);
    $('#showCityPicker').on('click', function () {
        picker.show(function (items) {
            console.log(items)
            $('[name="address"]').val((items[0] || {}).text + (items[1] || {}).text + (items[2] || {}).text);

        });
    });

    //默认为添加收货地址
    //区别为看地址栏中是否有参数
    var flag = true;
    //将修改的信息渲染到页面上
    if (getUrl(location.href, 'id')) {
        $('.mui-title').html('修改收货地址');
        flag = false;
        $.ajax({
            url: '/address/queryAddress',
            type: 'get',
            success: function (res) {
                console.log(res);
                for (var i = 0; i < res.length; i++) {

                    if (res[i].id == getUrl(location.href, 'id')) {

                        $('[name="address"]').val(res[i].address);
                        $('[name="addressDetail"]').val(res[i].addressDetail);
                        $('[name="recipients"]').val(res[i].recipients);
                        $('[name="postcode"]').val(res[i].postCode);

                    }

                }
            }
        })
    } else {
        $('.mui-title').html('添加收货地址');
    }
    $('#addAdress').on('click', function () {
        recipients = $('[name = "recipients"]').val().trim();
        postcode = $('[name = "postcode"]').val().trim();
        address = $('[name = "address"]').val().trim();
        addressDetail = $('[name = "addressDetail"]').val().trim();
        if ((recipients.length >= 0) && (postcode.length >= 0) && (address.length >= 0) && (addressDetail.length >= 0)) {
            //添加
            if (flag) {
                $.ajax({
                    url: '/address/addAddress',
                    type: 'post',
                    data: {
                        recipients: recipients,
                        postcode: postcode,
                        address: address,
                        addressDetail: addressDetail,
                    },
                    success: function (res) {
                        if (res.success) {
                            setTimeout(function () {
                                location.href = 'address.html';
                            }, 2000)
                        } else {
                            mui.toast(res.message);
                        }
                    }
                })
                //修改
            } else {
                $.ajax({
                    url: '/address/updateAddress',
                    type: 'post',
                    data: {
                        recipients: recipients,
                        postcode: postcode,
                        address: address,
                        addressDetail: addressDetail,
                        id: id,
                    },
                    success: function (res) {
                        console.log(recipients);
                        console.log(postcode);
                        console.log(address);
                        console.log(addressDetail);
                        if (res.success) {
                            console.log(res);
                            setTimeout(function () {
                                location.href = "address.html";
                            }, 2000)
                        } else {
                            mui.toast(res.message)
                        }
                    }
                })
            }
        }
    })
})