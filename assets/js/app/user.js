$(document).ready(function () {
    $('#btnEmail').on('click',function () {
        let $email = $('#email').val();
        let pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if($email){
            if(pattern.test($email)){
                $.ajax({
                    type:'post',
                    url:'/user/query',
                    data:{
                        email:$email,
                    },
                    dataType:'json',
                    success:function (data) {
                        if (data.code === 200 ){
                            $('#name').html(data.data.name);
                            $('#em').html(data.data.email);
                            $('#group').html(data.data.group);
                            $('#duip').html(data.data.vip);
                            $('#expires').html(data.data.expires);
                            $('#code').fadeIn("slow");
                        }else {
                            $('#code').fadeOut("slow");
                            swal('错误代码：'+ data.code, '<p>'+data.msg+'</p>', "error");
                        }
                    }
                });
            }else {
                error('请填入正确的邮箱账号');
            }
        }else {
            error('邮箱账号不能为空');
        }
    });
    function error(msg){
        swal("错误警告",msg, "error");
    }
});