$(document).ready(function () {
    $('#urlbtn').on('click',function () {
        let $url = $('#urlval').val();
        let $pass = $('#passval').val();
        $.ajax({
            type:'post',
            url:'/lanzou/query',
            data:{
                url:$url,
                pwd:$pass,
            },
            dataType:'json',
            success:function (data) {
                if (data.code == 200 ){
                    $('#name').html(data.data.name);
                    $('#author').html(data.data.author);
                    $('#time').html(data.data.time);
                    $('#size').html(data.data.size);
                    $('#url_link').html(data.data.url);
                    $('#url_link').attr('href',data.data.url);
                    $('#code').fadeIn("slow");
                }else {
                    $('#code').fadeOut("slow");
                    swal('错误代码：'+ data.code, '<p>'+data.msg+'</p>', "error");
                }
            }
        });

    });
});