$(document).ready(function () {
    let $down = $('#dropdown'),
        hotList = 0,
        $googleso = $('#googleso');

    function getHotkeywords(value) {
        $.ajax({
            type: 'get',
            url: 'https://go-xyz.xyz/complete/search',
            data: {
                client: 'heirloom-hp',
                hl: 'zh-HK',
                gs_rn: 34,
                gs_ri: 'heirloom-hp',
                cp: 2,
                gs_id: 's',
                xhr: 't',
                q: value,
            },
            dataType: 'jsonp',
            success: function (res) {
                $down.empty();
                hotList = res[1].length;
                if (hotList) {
                    $down.addClass("show");
                    $.each(res[1], function (i, n) {
                        let $html = '<a class="dropdown-item"><span class="badge badge-light mr-2">' + (i + 1) + '</span> ' + n[0] + '</a>';
                        $down.append($html);
                        let $downaspan = $('#dropdown a span');
                        if (i === 0) {
                            $downaspan.eq(i).removeClass('badge-light');
                            $downaspan.eq(i).addClass('badge-danger');
                        } else if (i === 1) {
                            $downaspan.eq(i).removeClass('badge-light');
                            $downaspan.eq(i).addClass('badge-warning');
                        } else if (i === 2) {
                            $downaspan.eq(i).removeClass('badge-light');
                            $downaspan.eq(i).addClass('badge-info');
                        }
                    });
                } else {
                    $down.removeClass("show");
                }
            },
            error: function (res) {
                console.log(res);
            }
        });
    }

    $googleso.keyup(function (e) {
        if ($(this).val()) {
            if (e.keyCode == 38 || e.keyCode == 40) {
                return
            }
            getHotkeywords($(this).val());
        } else {
            $down.removeClass("show");
        }
    });

    $down.on('click', 'a', function () {
        let contStr = $(this).contents().filter(function (index, content) {
            return content.nodeType === 3;
        }).text();
        $googleso.val(contStr);
        open('https://go-xyz.xyz/search?q=' + contStr);
        $down.removeClass("show");
    });

    $googleso.focus(function () {
        if ($(this).val()) {
            getHotkeywords($(this).val())
        }
    });

    $googleso.blur(function () {
        setTimeout(function () {
            $down.removeClass("show");
        }, 500)
    });
});