$(document).ready(function () {
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        autoplay: false,
        theme: '#2fb5ad',
        lang: 'zh-cn',
        screenshot: true,
        airplay:true,
        hotkey: true,
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        video: {},
    });
    $('#btnPlay').on('click',function () {
        let $url = $('#txtVipUri').val();
        if($url){
            dp.switchVideo({
                url:$url,
            });
        }else {
            error('视频播放地址不能为空');
        }
    });

    $(window).keydown(function (event) {
        if(event.keyCode == 13){
            setTimeout(function(){
                $('#btnPlay').click();
            }, 1000)
        }
    });
    dp.on('error', function () {
        error('请检查视频地址是否正确');
    });

    function error(msg){
        swal("播放错误",msg, "error");
    }
});