//var HOST_URL = document.location.origin;
var HOST_URL = "http://192.168.1.250:8080";
//var HOST_URL = "http://sdtravel.bus365.com";
//var HOST_URL = document.location.origin + "/hotel";
//弹出框展示时间
var TOAST_LENGTH = 2000;

//ajax重写
(function($) {
    //首先备份下jquery的ajax方法  
    var _ajax = $.ajax;

    //重写jquery的ajax方法
    $.ajax = function(opt) {
        //备份opt中error和success方法
        var fn = {
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                errorTip(XMLHttpRequest);
            },
            success: function(data, textStatus) {}
        }
        if (opt.error) {
            fn.error = opt.error;
        }
        if (opt.success) {
            fn.success = opt.success;
        }

        //扩展增强处理
        var _opt = $.extend(opt, {
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //错误方法增强处理
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success: function(data, textStatus) {
                //成功回调方法增强处理
                fn.success(data, textStatus);
            },
            beforeSend: function(XHR) {
                loadObj.loading();
                //提交前回调方法
            },
            complete: function(XHR, TS) {
                loadObj.stopLoading();
                //请求完成后回调函数 (请求成功或失败之后均调用)。
            }
        });
        if (true) {
            try {
                _opt.data["org"] = localStorage.org;
                _opt.data["orgname"] = localStorage.orgname;
            } catch (e) {

            }
        }

        _ajax(_opt);
    };
})(jQuery);
// rem自适应
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth > 650) clientWidth = 650;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//url获取值
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

//去除字符串空格
String.prototype.NoSpace = function() {
    return this.replace(/\s+/g, "");
};

//公共弹出框
function alertTip(word, fn, tick) {
    var conStr = '<div class="alertwhite"><div id="conDiv" class="alertTip">' + word + "</div></div>";
    $("body").append(conStr);
    setTimeout(function() {
        $(".alertwhite").remove();
        if (fn != null && fn != undefined) {
            fn();
        }
    }, tick ? tick : TOAST_LENGTH);
}
//公共提示框
function alertWhiteDialog(word, lefttitle, righttitle, id, leftFn, rightFn) {
    var conStr = '<div class="alertback"><div class="alertmain"><div class="alert_title">友情提示</div>'
    conStr += '<div id="contentid" class="content">' + word + '</div><div class="contentline"></div>';
    conStr += '<div id="cancelid" class="alert_cancel">' + lefttitle + '</div><div id="confirmid" class="alert_confirm">' + righttitle + '</div></div></div>';
    $("body").append(conStr);
    $("#confirmid").click(function() {
        $(".alertback").remove();
        if (rightFn != null && rightFn != undefined && rightFn != "") {
            rightFn(id);
        }
    });
    $("#cancelid").click(function() {
        $(".alertback").remove();
        if (leftFn != null && leftFn != undefined && leftFn != "") {
            leftFn(id);
        }

    });
}
/**
 * 轮播*
 * 需要插件jquery.touchSwipe.min.js
 * 调用：
 * carousel.startGo(warp);
 * warp为外层大盒子
 */
var carousel = {
    picInner: "",
    picW: "",
    picN: "",
    time1: "",
    time2: "",
    n: -1,
    navStr: "",
    startGo: function(warp) { //warp为外层大盒子
        carousel.picInner = $(warp).children("ul").eq(0);
        carousel.picInner.css({
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 8,
            transition: " all 0.5s",
            height: "100%"
        });
        carousel.picInner.find("li").css({
            float: "left",
            height: "100%"

        });
        carousel.picInner.find("li img").css({
            width: "100%",
            height: "100%",
            display: "block",
        });

        carousel.picturelist();
    },
    //图片列表
    picturelist: function() {
        carousel.picW = $(window).width();
        carousel.picN = carousel.picInner.find("li").length;
        carousel.picInner.find("li").css("width", carousel.picW + 'px');
        carousel.picInner.css("width", carousel.picW * carousel.picN); //计算ul宽度
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        window.addEventListener(resizeEvt, function() {
            carousel.picturelist();
        }, false);
        carousel.navList();
    },
    //小圆点导航
    navList: function() {
        $(".carouselNav").remove();
        carousel.navStr = "<ul class='carouselNav'>";
        for (var i = 0; i < carousel.picN; i++) { //写入导航按钮
            carousel.navStr += "<li></li>";
        }
        carousel.navStr += "</ul>";
        carousel.picInner.parent().append(carousel.navStr);
        $(".carouselNav").css({
            position: "absolute",
            bottom: "0.46rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "10",
        });
        $(".carouselNav li").css({
            float: "left",
            width: "0.14rem",
            height: "0.14rem",
            borderRadius: "50%",
            backgroundColor: "#fff",
            opacity: 0.6,
            margin: "0 0.1rem",
        });
        carousel.carouselActive();
        carousel.swipeCarousel();
    },
    /**定时轮播*/
    carouselActive: function() {
        carousel.n++;
        if (carousel.n >= carousel.picN) {
            carousel.n = 0;
        } else if (carousel.n < 0) {
            carousel.n = carousel.picN - 1;
        }
        clearTimeout(carousel.time1);
        carousel.picInner.css("left", -carousel.n * carousel.picW);
        $(".carouselNav").find("li").css({
            transform: "scale(1)",
            opacity: 0.6,
        });
        $(".carouselNav").find("li").eq(carousel.n).css({
            transform: "scale(1.1)",
            opacity: 1,
        });
        carousel.time1 = setTimeout(carousel.carouselActive, 3000);
    },
    /**滑动切换*/
    swipeCarousel: function() {
        carousel.picInner.swipe({
            swipeLeft: function() {
                carousel.n++;
                if (carousel.n >= carousel.picN) {
                    carousel.n = carousel.picN - 1;
                }
                swipeFunction();
            },
            swipeRight: function() {
                carousel.n--;
                if (carousel.n <= 0) {
                    carousel.n = 0;
                }
                swipeFunction();
            }
        });

        function swipeFunction() {
            clearTimeout(carousel.time1);
            clearTimeout(carousel.time2);
            carousel.picInner.css("left", -carousel.n * carousel.picW);
            $(".carouselNav").find("li").css({
                transform: "scale(1)",
                opacity: 0.6,
            });
            $(".carouselNav").find("li").eq(carousel.n).css({
                transform: "scale(1.1)",
                opacity: 1,
            });
            carousel.time2 = setTimeout(carousel.carouselActive, 5000);
        }
    }
}

//loading加载
//loadObj.loading();
var loadObj = {
    count: 0,
    intV: 0,
    n: 45,
    startRoll: function() {
        $("#animate").css({
            "transform": "rotate(" + loadObj.n + "deg)",
            "-webkit-transform": "rotate(" + loadObj.n + "deg)"
        });
        loadObj.n = loadObj.n + 1;
    },
    loading: function(yimg, busimg) {
        this.count++;
        if ($("#animate").length > 0) return;
        var yimgpath = "images/busloadding_yuan.png";
        var bimgpath = "images/busloadding_bus.png";
        if (yimg != null) {
            yimgpath = yimg;
        }
        if (busimg != null) {
            bimgpath = busimg;
        }
        var html = '<div class="loading"><div class="dhdiv"><img id="animate" src="' + yimgpath + '"><img class="carbus" src="' + bimgpath + '"></div></div>';
        $("body").append(html);
        loadObj.intV = setInterval(loadObj.startRoll, 1);
    },
    stopLoading: function() {
        loadObj.count--;
        if (loadObj.count != 0) return;
        loadObj.n = 45;
        $(".loading").remove();
        clearInterval(loadObj.intV);
    }
}
//正则验证给出提示
var checker = {
    check: function(reg, str, type) {
        if (reg && reg.test(str)) {
            return reg.test(str);
        } else {
            return false;
        }
    },
    isname: function(str) {
        if (str == "") {
            alertTip(window.errMes.nullName);
            return false;
        }
        //str = str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        var regexp = /^[\u4e00-\u9fa5]{2,15}$/;
        var re = /^[a-zA-Z\/ ]{4,30}$/;
        var b1 = regexp.test(str);
        var b2 = re.test(str);
        if (!b1 || !b2) {
            return true;
        } else {
            alertTip(window.errMes.Name);
            return false;
        }

    },
    isCardCode: function(str) {
        if (!str) {
            alertTip(window.errMes.nullCardCode);
            return false;
        } else {
            var num = str.toUpperCase();
            if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
                alertTip(window.errMes.cardCode);
                return false
            }
            var len, re;
            len = num.length;
            if (len == 15) {
                re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
                var arrSplit = num.match(re);
                var dtmBirth = new Date("19" + arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay) {
                    alertTip(window.errMes.cardCode);
                    return false
                } else {
                    if (new Date().getYear() < dtmBirth.getYear()) {
                        alertTip(window.errMes.cardCode);
                        return false
                    } else {
                        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                        var arrCh = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
                        var nTemp = 0,
                            i;
                        num = num.substr(0, 6) + "19" + num.substr(6, num.length - 6);
                        for (i = 0; i < 17; i++) {
                            nTemp += num.substr(i, 1) * arrInt[i]
                        }
                        num += arrCh[nTemp % 11];
                        return true
                    }
                }
            }
            if (len == 18) {
                var code = str.split('');
                re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
                var arrSplit = num.match(re);
                var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay) {
                    alertTip(window.errMes.cardCode);
                    return false
                } else {
                    var valnum;
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
                    var nTemp = 0,
                        i;
                    for (i = 0; i < 17; i++) {
                        nTemp += num.substr(i, 1) * arrInt[i]
                    }
                    valnum = arrCh[nTemp % 11];
                    if (valnum.toLowerCase() != code[17].toLowerCase()) {
                        alertTip(window.errMes.cardCode);
                        return false;
                    }
                    return true
                }
            }
            alertTip(window.errMes.cardCode);
            return false
        }
    },
    isPassword: function(str) {
        if (str) {
            var regexp = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,20}$/;
            if (!regexp.test(str)) {
                alertTip(window.errMes.pwd);
                return false
            }
        } else {
            alertTip(window.errMes.nullPwd);
            return false
        }
    },
    isNoNull: function(str, txt) {
        if (str == null || str == "null" || str == "" || str == undefined || str == "NaN" || str == "undefined") {
            alertTip(txt);
            return true;
        } else {
            return false;
        }
    },
    isEmail: function(str) {
        if (str == "") {
            alertTip(window.errMes.nullemail);
            return false;

        } else {
            var isEmailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            if (!checker.check(isEmailReg, str, 2)) {
                alertTip(window.errMes.email);
                return false;
            }
        }
    },
    isPhone: function(str) {
        if (str == "") {
            alertTip(window.errMes.nullphone);
            return false
        } else {
            str = str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
            var isPhoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
            if (!checker.check(isPhoneReg, str, 1)) {
                alertTip(window.errMes.phone);
                return false;
            } else {
                return true;
            }
        }
    },
    isUserName: function(str) {
        if (!str) {
            alertTip(window.errMes.nullusername);
            return false
        } else {
            if (str.indexOf("@") > 0) {
                return checker.isEmail(str)
            } else {
                return checker.isPhone(str)
            }
        }
    },
    isRealName: function(str) {
        if (str == "") {
            alertTip(window.errMes.nullrealname);
            return false
        }
        str = str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        var regexp = /[\u4e00-\u9fa5]/g;
        var re = /^\S+[a-z A-Z]$/;
        if (regexp.test(str)) {
            if (str.length < 15 && str.length >= 2) {
                return (str.length < 15 && str.length >= 2)
            } else {
                alertTip("中文姓名2~15个汉字");
                return false
            }
        } else {
            if (re.test(str)) {
                if (str.length < 30 && str.length > 3) {
                    return (str.length < 30 && str.length > 3)
                } else {
                    alertTip("英文姓名4~30个英文");
                    return false
                }
            } else {
                alertTip(window.errMes.realname);
                return false
            }
        }
    }
}
window.errMes = {
    phone: "请输入正确的手机号！",
    nullphone: "请输入手机号! ",
    username: "请输入正确的用户名！",
    nullusername: "请输入用户名！",
    pwd: "请输入正确的密码！",
    nullPwd: "请输入密码！",
    nickname: "请输入正确的昵称！",
    realname: "请输入正确的姓名！",
    nullrealname: "请输入姓名! ",
    email: "请输入正确的邮箱! ",
    nullemail: "请输入邮箱! ",
    nullCardCode: "请输入身份证号码",
    cardCode: "请输入正确身份证号码",
    Name: "中文姓名2~15个汉字或英文姓名4~30个英文",
    nullName: "请输入姓名",
};

/**检测是否是移动端*/
function isMobile() {
    var isMobile = false;
    // 检测userAgent
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }
    return isMobile;
}
/**
 * 跳转到其他页面
 * @param url 跳转页面的url
 */
function goToUrl(url) {
    if (url == null || url == '' || url == undefined) {
        window.location.href = '#';
    } else {
        window.location.href = HOST_URL + url;
    }
}
/**localStorage缓存处理*/
var localCache = { //obj为缓存对象的名字
    get: function(obj) {
        if (obj == "" || obj == undefined || obj == null) return;
        var cache = JSON.parse(localStorage.getItem(obj));
        if (cache == null) {
            return false;
        };
        return cache;
    }, //cache为要缓存的对象集，obj为缓存对象的名字
    set: function(cache, obj) {
        if (obj == "" || obj == undefined || obj == null) return;
        var cacheOld = JSON.parse(localStorage.getItem(obj));
        var result = $.extend({}, cacheOld, cache);
        var str = JSON.stringify(result);
        localStorage.setItem(obj, str);
    },
    //obj为缓存对象的名字
    remove: function(obj) {
        if (obj == "" || obj == undefined || obj == null) return;
        localStorage.removeItem(obj);
    }, //清理所有缓存
    clear: function() {
        localStorage.clear();
    }

}
/**sessionStorage缓存处理*/
var sessionCache = { //obj为缓存对象的名字
    get: function(obj) {
        if (obj == "" || obj == undefined || obj == null) return;
        var cache = JSON.parse(sessionStorage.getItem(obj));
        if (cache == null) {
            return false;
        };
        return cache;
    }, //cache为要缓存的对象集，obj为缓存对象的名字
    set: function(cache, obj) {
        if (obj == "" || obj == undefined || obj == null) return;
        var cacheOld = JSON.parse(sessionStorage.getItem(obj));
        var result = $.extend({}, cacheOld, cache);
        var str = JSON.stringify(result);
        sessionStorage.setItem(obj, str);
    },
    //obj为缓存对象的名字
    remove: function(obj) {
        if (obj == "" || obj == undefined || obj == null) return;
        sessionStorage.removeItem(obj);
    }, //清理所有缓存
    clear: function() {
        sessionStorage.clear();
    }

}
/**js中获得当前日期*/
function GetDateStr(AddDayCount, type) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    m = m > 9 ? m : ("0" + m);
    d = d > 9 ? d : ("0" + d);
    if (type) {
        return Y + "年" + m + "月" + d + "日";
    }
    return y + "-" + m + "-" + d;
}
/*时间戳转日期*/
function timestampToDate(timestamp, type) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear();
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    if (type) {
        return Y + "年" + M + "月" + D + "日";
    }
    return Y + "-" + M + "-" + D;
}

/**ajax错误提示*/
function errorTip(XMLHttpRequest) {
    if (XMLHttpRequest.status == 500) {
        alertTip("服务器异常，请与客服联系！")
    } else {
        if (XMLHttpRequest.status == 550) {
            var err = eval("(" + XMLHttpRequest.responseText + ")");
            alertTip(err[0]["message"])
        } else {
            if (XMLHttpRequest.textStatus == 403) {
                alertTip("请不要进行非法操作！")
            } else {
                alertTip("网络出现问题，请稍后再试或与客服联系！")
            }
        }
    }
}
/*
 * 判断是否微信
 */
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
//cookie
function getCookieObj(cookieName) {
    var str = getCookie(cookieName);
    if (str != "" && str != null && typeof(str) != "undefined") {
        var cookie = eval("(" + eval("(" + str + ")") + ")");
        //var cookie = eval("(" + str + ")");
        return cookie
    } else {
        return null
    }
}
//JS操作cookies方法!
//写cookies
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length
            }
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
/**设置token*/
function setToken() {
    var userData = sessionCache.get("userData");
    if (userData && userData.token && userData.userid) {
        var n = (userData.token.split('undefined')).length - 1;
        if (n == 1) return;
    };
    var cookie = getCookieObj("5fe845d7c136951446ff6a80b8144467");
    //cookie = JSON.parse(cookie);
    if (cookie) {
        var clienttype = "web";
        if (isWeiXin()) {
            clienttype = "weix";
        }
        var token = '{"clienttype":"' + clienttype + '","ordertoken":"undefined","clienttoken":"' + cookie.token2 + '","version":"5.0"}';
        var userid;
        //console.log(cookie);
        var arry = unescape(cookie.token1).split("#");
        if (arry[arry.length - 1]) {
            userid = arry[arry.length - 1];
        };
        sessionCache.set({ token: token, userid: userid }, "userData");
    }
}
setToken();
$(function() {
    document.title = localStorage.wintitle;
})
//url传值方法
function getQueryString(href, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = href.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function isNull(str) {
    return str == null || str == undefined || str == '';
}
//获取offline=1
function getOffLine() {
    var urlObj = GetRequest();
    if (urlObj.offline && urlObj.offline == 1) {
        sessionCache.set({ "offline": 1 }, "userData");
    }
}
getOffLine();
//传递offline=1
function sendOffLine(){
    var userData=sessionCache.get("userData");
    if(userData.offline && userData.offline == 1){
        return {"offline":1};
    }else{
        return {"offline":0};
    }
}