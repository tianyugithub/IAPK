$(document).ready(function () {
    let $github_url = $('#github_url'),
        $dwbin = $('#dwbin'),
        $band = $('#band'),
        $ref,
        $d,
        i=0,
        $gid = $.cookie('gid'),
        $ip = CitySN['cip'],
        $uid = $.cookie('uid'),
        $fileid = $.cookie('fileid'),
        $filetext = $.cookie('filetext'),
        $length = $.cookie('length'),
        $fileurl1 = $.cookie('fileurl1'),
        $fileurl2 = $.cookie('fileurl2'),
        $fileurl3 = $.cookie('fileurl3'),
        $urlid = $('#url'),
        $Aut = false,
        $result_c = {} ;
    jc()
    info()
    if(typeof($gid) != "undefined"){
        i=0
        $('#sojim').fadeIn("slow");
        $band.addClass("progress-bar-animated");
        $band.removeClass("bg-danger");
        $band.addClass("bg-success");
        $dwbin.text('停止下载');
        $ref = setInterval(function(){
            query($gid);
        },4000);
    }
    var captchaId = "647f5ed2ed8acb4be36784e01556bb71"
    var product = "float"
    if (product !== 'bind') {
        $('#btn').remove();
    }
    initGeetest4({captchaId: captchaId, product: product,}, function (gt) {
        window.gt = gt
        gt
            .appendTo("#captcha")
            .onSuccess(function (e) {
                $result_c = gt.getValidate();
                $Aut = true;
            })

        $('#btn').click(function () {
            gt.showBox();
        })
        $('#reset_btn').click(function () {
            gt.reset();
        })
    });

    var Utils = {
        isUrl : function(str_url) {
            var strRegex =  /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
            var re = new RegExp(strRegex);
            if (re.test(str_url)) {
                return true;
            } else {
                return false;
            }
        }
    };
    $dwbin.on('click',function () {
        if (!Utils.isUrl($github_url.val())) {
            swal("错误警告",'请输入正确的url', "error");
            return false;
        }
        if($Aut == true){
            if($dwbin.text() == '停止下载'){
                $dwbin.text('下载文件');
                $.getJSON('/github/remove',function (data) {
                    if(data.code == 0){
                        clearInterval($ref);
                        msg_error("成功停止");
                        swal("成功信息", "成功停止", "success");
                    }else if(data.code == 1){
                        swal("错误警告",'暂停失败，没有找到该任务', "error");
                    }
                });
            }else if($dwbin.text() == '下载文件'){
                $result_c['url']= $github_url.val();
                $result_c['ip']=$ip;
                $.ajax({
                    type:'POST',
                    url:'/github/download',
                    data:$result_c,
                    dataType:'json',
                    success:function (data) {
                        if(data.code == 200){
                            i=0
                            $dwbin.text('停止下载');
                            $band.addClass("progress-bar-animated");
                            $band.removeClass("bg-danger");
                            $band.addClass("bg-success");
                            $gid = $.cookie('gid');
                            $('#userid').text(data.uid);
                            $('#firid').text($gid);
                            $('#sojim').fadeIn("slow");
                            $('#banid').fadeIn("slow");
                            $ref = setInterval(function(){
                                query($gid);
                            },4000);
                        }else if(data.code == 1){
                            swal("错误警告",data.msg, "error");
                        }else if(data.code == 201){
                            swal("错误警告",data.msg, "error");
                        }else if(data.code == 204){
                            swal("行为验证失败",data.msg, "error");
                            setTimeout(function (){
                                window.location.reload();
                            }, 3000);
                        }
                    }
                });
            }
        }else {
            swal("警告",'为了确认您不是机器人，请点击行为验证进行人机验证', "error");
        }

    });

    function query(gid){
        $.ajax({
            type:'PUT',
            url:'/github/query',
            data:{
                gid:gid
            },
            dataType:'json',
            success:function (data) {
                if(data.code == 200){
                    $('#banid').fadeIn("slow");
                    let bai = GetPercent(data.completedLength,data.length);
                    $band.width(bai+'%');
                    $band.text(bai+'%');
                    $('#speed').text(getFlow(data.downloadSpeed)+'/S');
                    $('#fit').text(getFlow(data.length));
                }else if(data.code == 201){
                    $('#banid').fadeIn("slow");
                    $('#speed').text('任务队列中...');
                }else if(data.code == 500){
                    msg_error(data.msg);
                    swal("错误警告",data.msg, "error");
                    window.setTimeout(function () {undefined
                        window.location.reload();
                    },3000)
                }else if(data.code == 100){
                    $band.removeClass("progress-bar-animated");
                    $band.width('100%');
                    $band.text('100%');
                    $gid = $.cookie('gid');
                    $dwbin.text('下载文件');
                    clearInterval($ref);
                    swal("成功信息", "文件下载成功，您可以点击下方下载线路进行文件下载", "success");
                    setTimeout(function (){
                        window.location.reload();
                    }, 2000);
                }else if(data.code == 202){
                    msg_error(data.msg);
                    swal("错误警告",data.msg, "error");
                }else if(data.code == 203){
                    msg_error(data.msg);
                    swal("错误警告",data.msg, "error");
                }else if(data.code == 1){
                    msg_error('任务已经停止');
                    swal("错误警告",'任务已经停止', "error");
                }
            }
        });
    }
    function jc() {
        if(typeof($fileid) != "undefined"){
            $('#sojim').fadeIn("slow");
            $('#userid').text($uid);
            $('#firid').text($fileid);
            $('#fit').text(getFlow($length));
            let html = '<a class="list-group-item list-group-item-action" target="_blank" href="'+$fileurl1+'">'+$fileurl1+'<span class="badge badge-danger badge-pill float-right">线路1</span></a>' +
                '<a class="list-group-item list-group-item-action" target="_blank" href="'+$fileurl2+'">'+$fileurl2+'<span class="badge badge-danger badge-pill float-right">线路2</span></a>' +
                '<a class="list-group-item list-group-item-action" target="_blank" href="'+$fileurl3+'">'+$fileurl3+'<span class="badge badge-danger badge-pill float-right">线路3</span></a>'
            $urlid.html(html);
        }
    }
    function info(){
        $d = setInterval(function(){
            $.getJSON('/github/info',function (data) {
                if(data.code == 0){
                    $('#speedS').text(getFlow(data.Speed)+'/s');
                    $('#Active').text(data.Active+'个');
                    $('#Waiting').text(data.Waiting+'个');
                    $('#StoppedTotal').text(data.Total+'个');
                }
            });
        },4000);
    }
    function msg_error(msg){
        $band.text(msg);
        $band.width('100%');
        $band.removeClass("progress-bar-animated");
        $band.addClass("bg-danger");
        $band.removeClass("bg-success");
        $.removeCookie('gid');
        $gid = $.cookie('gid');
        clearInterval($ref);
    }
    function getFlow(flowVlueBytes){
        let flow = "";
        if(flowVlueBytes/1024 < 1024){
            flow = (Math.round(flowVlueBytes/1024) > 0 ? Math.round(flowVlueBytes/1024) : 0) + 'KB';
        }else if(flowVlueBytes/1024 >= 1024 && flowVlueBytes/1024/1024 < 1024){
            flow = (Math.round(flowVlueBytes/1024/1024) > 0 ? Math.round(flowVlueBytes/1024/1024) : 0)+'MB';
        }else if(flowVlueBytes/1024/1024 >= 1024){
            let gb_Flow = flowVlueBytes/1024/1024/1024;
            flow = gb_Flow.toFixed(1)+'GB';
        }else{
            flow = "0KB";
        }
        return flow;
    }
    function GetPercent(num, total) {
        num = parseFloat(num);
        total = parseFloat(total);
        if (isNaN(num) || isNaN(total)) {
            return "-";
        }
        return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00);
    }
});