$(function() {
    getDate2();

});

function getDate1(page, count) {
    var page = page || "1";
    var count = count || "20";
    $.ajax({
            url: 'https://api.apiopen.top/getJoke',
            type: 'GET',
            dataType: 'json',
            data: {
                page: page,
                count: count,
                type: "video",
            },
        })
        .done(function(data) {
            console.log(data);
            if (data.code != "200") {
                alert(data.msg);
                return;
            }
            render(data.result);
        })
        .fail(function(data) {
            console.log("error");
        })
        .always(function(data) {
            console.log("complete");
        });

}

function getDate2(page, count) {
    var page = page || "1";
    var count = count || "20";
    $.ajax({
        async: true, //表示请求是否异步处理
        type: "GET", //请求类型
        url: "https://api.apiopen.top/getJoke", //请求的 URL地址
        dataType: "json", //返回的数据类型
        data: {
            page: page,
            count: count,
            type: "video"
        },
        success: function(data) {
            console.log(1); //在控制台打印服务器端返回的数据
            if (data.code != "200") {
                alert(data.msg);
                return;
            }
            render(data.result);
        },
        error: function(data) {
            console.log(data);
        }
    }).done(function(data){
    	console.log(2);
    });
}

//渲染页面
function render(data) {
    var str = '';
    $.each(data, function(i, o) {
        //console.log(i, o);
str += `<li class="qy-mod-li">
    <div class="qy-mod-img horizon">
        <div class="qy-mod-link-wrap"><a title="${o.text}" href="${o.video}" class="qy-mod-link" target="_blank"><img alt="本杰明·巴顿奇事" src="${o.thumbnail}" rseat="712211_weinituijian_image1" class="qy-mod-cover fadeOutIn-enter-active">
                <div class="icon-tr"><img src="//pic0.iqiyipic.com/common/20171106/ac/1b/vip_100000_v_601_0_21.png" srcset="//pic0.iqiyipic.com/common/20171106/ac/1b/vip_100000_v_601_0_38.png 2x"></div>
            </a></div>
        <div class="title-wrap">
            <p class="main">
                <a rseat="712211_weinituijian_title1" title="${o.text}" href="http://uvideo.spriteapp.cn/video/2019/0710/6b690020-a2d2-11e9-bdc3-1866daeb0df1_wpd.mp4" class="link-txt" target="_blank">
                    ${o.text}
                </a></p>
             <p title="${o.name}" class="sub">作者：${o.name}</p>
        </div>
    </div>
</li> `;
    });
    $("#main").html(str);
}