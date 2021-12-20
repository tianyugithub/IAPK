$(document).ready(function () {
    $('#urlbtn').on('click',function () {
        let $url = $('#urlval').val();
        let $urlbtn = $('#urlbtn');
        $urlbtn.text('正在解析...');
        $urlbtn.attr('disabled',"true");
        if($url){
            $.ajax({
                type:'post',
                url:'/api/mirrors',
                data:{
                    url:$url,
                },
                dataType:'json',
                success:function (data) {
                    if (data.CODE == 200 ){
                        $.each(data.MIRRORS,function (i,v) {
                            console.log(v.name);
                            let $html = '<li class="list-group-item p-1 txtia"><span class="badge bg-success float-left mr-2" style="margin-top: 4px; color: #FFFFFF;">下载地区</span><a href="https://ftools.cc/github?url='+v.url+'">'+v.name+'</a></li>';
                            $('#utxt').append($html);
                        });
                        $('#code').fadeIn("slow");
                        swal('提示','解析成功', "success");
                        $urlbtn.text('提取地址');
                        $urlbtn.removeAttr("disabled");
                    }else {
                        $('#code').fadeOut("slow");
                        swal('错误代码：'+ data.code, '<p>'+data.msg+'</p>', "error");
                        $urlbtn.text('提取地址');
                        $urlbtn.removeAttr("disabled");
                    }
                }
            });
        }
    });
});