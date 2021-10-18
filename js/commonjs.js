(function ($, window) {
    //显示加载框
    $.showLoading = function (message, type) {
        if ($.os.plus && type !== 'div') {
            $.plusReady(function () {
                plus.nativeUI.showWaiting(message);
            });
        } else {
            var html = '';
            html += '<i class="mui-spinner mui-spinner-white"></i>';
            html += '<p class="text">' + (message || "数据加载中") + '</p>';

            //遮罩层
            var mask = document.getElementsByClassName("mui-show-loading-mask");
            if (mask.length == 0) {
                mask = document.createElement('div');
                mask.classList.add("mui-show-loading-mask");
                document.body.appendChild(mask);
                mask.addEventListener("touchmove", function (e) { e.stopPropagation(); e.preventDefault(); });
            } else {
                mask[0].classList.remove("mui-show-loading-mask-hidden");
            }
            //加载框
            var toast = document.getElementsByClassName("mui-show-loading");
            if (toast.length == 0) {
                toast = document.createElement('div');
                toast.classList.add("mui-show-loading");
                toast.classList.add('loading-visible');
                document.body.appendChild(toast);
                toast.innerHTML = html;
                toast.addEventListener("touchmove", function (e) { e.stopPropagation(); e.preventDefault(); });
            } else {
                toast[0].innerHTML = html;
                toast[0].classList.add("loading-visible");
            }
        }
    };

    //隐藏加载框
    $.hideLoading = function (callback) {
        if ($.os.plus) {
            $.plusReady(function () {
                plus.nativeUI.closeWaiting();
            });
        }
        var mask = document.getElementsByClassName("mui-show-loading-mask");
        var toast = document.getElementsByClassName("mui-show-loading");
        if (mask.length > 0) {
            mask[0].classList.add("mui-show-loading-mask-hidden");
        }
        if (toast.length > 0) {
            toast[0].classList.remove("loading-visible");
            callback && callback();
        }
    }

})(mui, window);

//采用正则表达式获取地址栏参数:
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};
//获取当前年月日 生成随机四位数
function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//生成编号
function GetDate() {
    var now = new Date();
    var yue = (now.getMonth() + 1).toString();
    var ri = now.getDate().toString();
    if ((now.getMonth() + 1) < 10) {
        yue = "0" + yue;
    }
    if ((now.getDate()) < 10) {
        ri = "0" + ri;
    }
    var randnum = rand(1000, 9999);
    return now.getFullYear().toString() + yue + ri + randnum.toString();
}
function GetDates() {
    var now = new Date();
    var yue = (now.getMonth() + 1).toString();
    var ri = now.getDate().toString();
    if ((now.getMonth() + 1) < 10) {
        yue = "0" + yue;
    }
    if ((now.getDate()) < 10) {
        ri = "0" + ri;
    }
    var randnum = rand(100, 999);
    return "R" + now.getFullYear().toString() + yue + ri + randnum.toString();
}
//比较两个时间的大小
function CompareDate(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))) < (new Date(d2.replace(/-/g, "\/"))));
}
function CompareDates(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))) >= (new Date(d2.replace(/-/g, "\/"))));
}
//获取时间差
function SJC(kssj, jssj) {
    var date1 = new Date(kssj)
    var date2 = new Date(jssj)
    var s1 = date1.getTime(), s2 = date2.getTime();
    var total = (s2 - s1) / 1000;
    var day = parseInt(total / (24 * 60 * 60));//计算整数天数
    var afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
    var hour = parseInt(afterDay / (60 * 60));//计算整数小时数
    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
    var min = parseInt(afterHour / 60);//计算整数分
    var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;//取得算出分后剩余的秒数
    var shi = Number(day) * 24 + Number(hour);
    return shi;
}
//计算时间差小时转化为天 小时
function shijiancha(shijian) {
    //计算有多少小时
    var xiaoshi = Math.floor(shijian / 60);
    var fenzhong = (shijian % 60);
    var tianshu = parseInt(xiaoshi / 24);
    var xiaoshis = parseInt(xiaoshi % 24);
    var qingjiashichang = "";
    if (Math.round(tianshu) != 0) {
        qingjiashichang += Math.round(tianshu) + "天"
    }
    if (Math.round(xiaoshis) != 0) {
        qingjiashichang += Math.round(xiaoshis) + "小时"
    }
    if (Math.round(fenzhong) != 0) {
        qingjiashichang += Math.round(fenzhong) + "分钟"
    }
    return qingjiashichang;
}


if (location.href.indexOf("#reloaded") == -1) {
    location.href = location.href + "#reloaded";
    location.reload();
}    

function getImageUrl() {
    return "http://hxphone.hx.cn/";
}
function getjiekouUrl() {
    return "https://api.hx.cn/nancy/";
}