$(document).ready(function(){
    const $tx = $('#tab1'),
        $yk = $('#tab2'),
        $iqy = $('#tab3'),
        $so_key = $('#so_key'),
        $so_log = $('#so_log'),
        $so = $('#so'),
        $rm = $('#rm'),
        $seVtype = $("#seVtype"),
        $btnPlay = $("#btnPlay"),
        $inetnr = $("#inetnr"),
        $rm_log = $('#rm_log'),
        $code = $('#code'),
        $bofang = $('#bofang'),
        $bofangqi = $('#bofangqi'),
        $txtVipUri = $("#txtVipUri");
    $btnPlay.click(function(){
        let wz=[
            'bilibili.com',
            'qq.com',
            'youku.com',
            'iqiyi.com',
        ];
        let pattern = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
            str = $txtVipUri.val();
        if(pattern.test(str)){
            let url = pattern.exec(str);
            if(url[0].indexOf(wz[0])!==-1){
                bil();
            }
            if(url[0].indexOf(wz[1])!==-1){
                tx();
            }
            if(url[0].indexOf(wz[2])!==-1){
                yk();
            }
            if(url[0].indexOf(wz[3])!==-1){
                iq();
            }
            let uri = $txtVipUri.val();
            if (uri.length > 10) {
                $inetnr.attr('src',$seVtype.val() + uri);
            }
        }else{
            return false;
        }
        let key = $seVtype.val();
        watch(key);
    });
    $seVtype.change(function(){
        let key = $(this).val();
        watch(key);
    });
    function watch(key){
        let url = $txtVipUri.val();
        $inetnr.attr('src',"/video?key="+key+"&url="+encodeURIComponent(url));
    }
    //热门搜索
    $.getJSON('/search',function (data) {
        if(data.code === 0){
            $.each(data.data.tx.Title,function (i,json1) {
                let html = '<a class="list-group-item list-group-item-action border-0 xabtn" data-txt="'+json1+'"><i class="ft-circle mr-1 success"></i>'+json1+'<span class="badge badge-success badge-pill float-right">热门搜索</span></a>'
                $rm.append(html);
            })
        }
    });
    //热门搜索点击事件
    $rm.on('click','.xabtn',function () {
        let txt = $(this).attr('data-txt');
        let xabtn = $('.xabtn');
        xabtn.children('i').removeClass('danger');
        xabtn.children('span').removeClass('badge-danger');
        xabtn.children('i').addClass('success');
        xabtn.children('span').addClass('badge-success');
        $(this).children('i').removeClass('success');
        $(this).children('i').addClass('danger');
        $(this).children('span').removeClass('badge-success');
        $(this).children('span').addClass('badge-danger');
        $so_key.val(txt);
        $rm_log.addClass('active');
        $so.click();
    });
    //搜索影片
    $so.on('click',function () {
        let $key = $so_key.val()
        if($key){
            $so.attr('disabled','disabled');
            $so_log.addClass('active');
            $tx.empty();
            $yk.empty();
            $iqy.empty();
            $.getJSON('/so?key='+$key,function (data) {
                if(data.code === 0){
                    $.each(data.data.iqy.url,function (i,json) {
                        let html = '<a class="list-group-item list-group-item-action txt_ha border-0" data-toggle="tooltip" data-original-title="'+data.data.iqy.Title[i]+'" data-url="'+json+'"><span class="badge badge-success badge-pill mr-1">爱奇艺</span>'+data.data.iqy.Title[i]+'</a>'
                        $iqy.append(html);
                    });
                    $.each(data.data.tx.url,function (i,json) {
                        let html = '<a class="list-group-item list-group-item-action txt_ha border-0" data-toggle="tooltip" data-original-title="'+data.data.tx.Title[i]+'" data-url="'+json+'"><span class="badge badge-success badge-pill mr-1">腾讯</span>'+data.data.tx.Title[i]+'</a>'
                        $tx.append(html);
                    });
                    $.each(data.data.yk.url,function (i,json) {
                        let html = '<a class="list-group-item list-group-item-action txt_ha border-0" data-toggle="tooltip" data-original-title="'+data.data.yk.Title[i]+'" data-url="'+json+'"><span class="badge badge-success badge-pill mr-1">优酷</span>'+data.data.yk.Title[i]+'</a>'
                        $yk.append(html);
                    });
                    $('[data-toggle="tooltip"]').tooltip();
                }else {
                    swal("错误警告", "搜索内容获取失败", "error");
                }
                $so.removeAttr('disabled');
                $so_log.removeClass('active');
                $rm_log.removeClass('active');
            });
        }else{
            swal("错误警告", "请输入正确的搜索内容", "error");
        }
    });
    //回车事件监听
    $so_key.bind('keypress', function(event) {
        if (event.keyCode === 13) {
            if($so.attr('disabled') === 'disabled'){
                swal("错误警告", "请勿重复操作", "error");
            }else{
                $so.click();
            }
        }
    });
    //点击搜索列表播放事件
    $('#listings').on('click','a',function () {
        let url = $(this).attr('data-url');
        let xabtn = $('.txt_ha');
        xabtn.children('span').removeClass('badge-danger');
        xabtn.children('span').addClass('badge-success');
        $(this).children('span').removeClass('badge-success');
        $(this).children('span').addClass('badge-danger');
        $txtVipUri.val(url);
        $btnPlay.click();
    });
    //播放列表事件
    $code.on('click','a',function () {
        let url = $(this).attr('data-url');
        let xabtn = $('.abtn');
        xabtn.children('i').removeClass('danger');
        xabtn.children('span').removeClass('badge-danger');
        xabtn.children('i').addClass('success');
        xabtn.children('span').addClass('badge-success');
        $(this).children('i').removeClass('success');
        $(this).children('i').addClass('danger');
        $(this).children('span').removeClass('badge-success');
        $(this).children('span').addClass('badge-danger');
        $txtVipUri.val(url);
        let key = $seVtype.val();
        watch(key);
    });
    //bilibili 播放列表
    function bil(){
        $code.empty();
        let url = $txtVipUri.val();
        let pattern = /play+[/]+([A-Za-z]*)+([0-9]*)/;
        let wz = pattern.exec(url);
        $.getJSON('/menu/bilibili?url='+encodeURIComponent(url),function(data){
            $('title').text('正在播放：'+ data['h1Title']);
            $bofang.show();
            $bofangqi.removeClass("col-md-12");
            $bofangqi.addClass("col-md-8");
            $.each(data['epList'],function (i,item) {
                if(item.id == wz[2]){
                    let html = '<a class="list-group-item list-group-item-action border-0 abtn" data-url="'+'https://www.bilibili.com/bangumi/play/'+'ep'+item.id+'"><i class="ft-circle mr-1 danger"></i>'+item.longTitle+'<span class="badge badge-danger badge-pill float-right">'+item.titleFormat+'</span></a>'
                    $code.append(html);
                }else {
                    let html = '<a class="list-group-item list-group-item-action border-0 abtn" data-url="'+'https://www.bilibili.com/bangumi/play/'+'ep'+item.id+'"><i class="ft-circle mr-1 success"></i>'+item.longTitle+'<span class="badge badge-success badge-pill float-right">'+item.titleFormat+'</span></a>'
                    $code.append(html);
                }
                return true;
            });
        });
    }

    //腾讯视频播放列表
    function tx(){
        $code.empty();
        let url = $txtVipUri.val();
        $.getJSON('/menu/tx?url='+encodeURIComponent(url),function (data) {
            if(data.code === 0){
                $bofang.show();
                $bofangqi.removeClass("col-md-12");
                $bofangqi.addClass("col-md-8");
                $.each(data['data']['id'],function (i) {
                    let html = '<a class="list-group-item list-group-item-action border-0 abtn" data-url="'+data['data']['url'][i]+'"><i class="ft-circle mr-1 success"></i>'+'第'+(i+1)+'集'+'<span class="badge badge-success badge-pill float-right">'+'第'+(i+1)+'集'+'</span></a>'
                    $code.append(html);
                });
                return true;
            }
            $bofang.hide();
            $bofangqi.removeClass("col-md-8");
            $bofangqi.addClass("col-md-12");
            return false;
        });
    }
    //优酷视频
    function yk(){
        $code.empty();
        let url = $txtVipUri.val();
        $.getJSON('/menu/youku?url='+encodeURIComponent(url),function (data) {
            console.log(data['code']);
            if(data.code === 0){
                $bofang.show();
                $bofangqi.removeClass("col-md-12");
                $bofangqi.addClass("col-md-8");
                $.each(data['data']['id'],function (i,item) {
                    let html = '<a class="list-group-item list-group-item-action border-0 abtn" data-url="'+data['data']['url'][i]+'"><i class="ft-circle mr-1 success"></i>'+item+'<span class="badge badge-success badge-pill float-right">'+data['data']['videoType'][i]+'</span></a>'
                    $code.append(html);
                });
                return true;
            }
            $bofang.hide();
            $bofangqi.removeClass("col-md-8");
            $bofangqi.addClass("col-md-12");
            return false;
        });
    }
    //爱奇艺
    function iq(){
        $code.empty();
        let url = $txtVipUri.val();
        $.getJSON('/menu/iqy?url='+encodeURIComponent(url),function (data) {
            if(data.code === 0){
                $bofang.show();
                $bofangqi.removeClass("col-md-12");
                $bofangqi.addClass("col-md-8");
                $.each(data['data']['id'],function (i,item) {
                    let html = '<a class="list-group-item list-group-item-action border-0 abtn" data-url="'+data['data']['url'][i]+'"><i class="ft-circle mr-1 success"></i>'+data['data']['videoType'][i]+'<span class="badge badge-success badge-pill float-right">'+'第'+item+'集'+'</span></a>'
                    $code.append(html);
                });
                return true;
            }
            $bofang.hide();
            $bofangqi.removeClass("col-md-8");
            $bofangqi.addClass("col-md-12");
            return false;
        });
    }
});