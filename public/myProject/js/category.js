$(function () {
    $('.my-footer').on('tap', 'a', function () {
        window.location.href = this.href;
    });
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function (res) {
            console.log(res);
            if (res.rows.length > 0) {
                var id = res.rows[0].id;
                $.ajax({
                    url: '/category/querySecondCategory',
                    type: 'get',
                    data: {
                        id: id,
                    },
                    success: function (res) {
                        console.log(res);
                        var html = template('categorySecond', {
                            data: res.rows
                        });
                        $('#categorySen').html(html);
                        $('#templateCategory').find('a:first-child').addClass('active');
                    }
                });
                // ajaxFn(id);
            }
            var html = template('categoryFirst', {
                result: res.rows
            });
            $('#templateCategory').html(html);

        }
    })


    $('#templateCategory').on('click', 'a', function () {
        var id = $(this).data('id');
        console.log(id);
        $(this).addClass('active').siblings().removeClass('active');
        ajaxFn(id);
    })

    function ajaxFn(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            data: {
                id: id,
            },
            success: function (res) {
                console.log(res);
                var html = template('categorySecond', {
                    data: res.rows
                });
                $('#categorySen').html(html);
            }
        })
    }

})