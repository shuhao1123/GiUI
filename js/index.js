$(function () {

    var status = true;

    //列表点击事件
    $('.container-left ul li').on('click', function () {
        status = false;
        console.log($(this).index())
        $('.window iframe').attr('src', $(this).find('a').attr('href').split('#')[1] + '.html')
        $(this).addClass('active').siblings().removeClass('active');
        setTimeout(function () {
            status = true
        }, 500)
    })



    //container 所有articel的scrolltop
    var arrheight = [];
    for (var i = 0; i < $('.container-middle article').length; i++) {
        arrheight.push($('.container-middle article').eq(i).offset().top)
    }


    //鼠标滚动时，导航列表和手机页面固定的位置
    var top1 = $('.container-left').offset().top;
    $(window).scroll(function () {
        var win_top = $(this).scrollTop() + 80;
        var top = $('.container-left').offset().top;
        console.log(arrheight, win_top)
        if (win_top >= top) {
            $('.container-left').addClass('device-fixed')
            $('.container-left').css('top', '80px')
            $('.device').addClass('device-fixed')
            $('.device').css('top', '-100px')
        }
        if (win_top < top1) {
            $('.container-left').removeClass('device-fixed')
            $('.device').removeClass('device-fixed')
            $('.device').css('top', '0px')
        }
        //container article鼠标滚动时右边手机版跟着变化 左边列表高亮
        if (status == true) {
            var iframe_src = $('.window iframe').attr('src')
            for (let i = 0; i < arrheight.length; i++) {
                if (win_top > arrheight[i] && win_top < arrheight[i + 1]) {
                    $('.container-left ul li').eq(i).addClass('active').siblings().removeClass('active')

                    if (iframe_src != $('.container-left ul li').eq(i).find('a').attr('href').split('#')[1] + '.html') {
                        $('.window iframe').attr('src', $('.container-left ul li').eq(i).find('a').attr('href').split('#')[1] + '.html')
                    }
                }
            }
            if(win_top+300>arrheight[arrheight.length-1]){
                $('.container-left ul li').eq(arrheight.length-1).addClass('active').siblings().removeClass('active')
                $('.window iframe').attr('src', $('.container-left ul li').eq(arrheight.length-1).find('a').attr('href').split('#')[1] + '.html')
            }
        }
    })


})

// 改变pre 的标签 <
var pre = document.getElementsByTagName('pre');
for (var i = 0; i < pre.length; i++) {
    var html = pre[i].innerHTML;
    pre[i].innerHTML = html.replace(/</gi, '&lt;');
}
