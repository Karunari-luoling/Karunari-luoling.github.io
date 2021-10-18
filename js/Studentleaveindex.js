
var xh = GetQueryString("xh");
mui.init({
    pullRefresh: {
        container: '#pullrefresh',
        up: {
            auto: true,
            contentrefresh: '正在加载...',
            callback: pullupRefresh
        }
    }
});

var count = 0;

function pullupRefresh() {
    loadcontent();
}
var page = 1;
var pagerow = 5;

function loadcontent() {
    $.ajax({
        type: 'Post',
        async: false,
        dataType: "json",
        url: '../../handler/qingjiashenqing.ashx?action=getQingJiaMes&guid=' + Math.random(),
        data: {
            xh: xh,
            qjbid: "",
            page: page,
            pagerow: pagerow
        },
        success: function (data) {
            mui('#pullrefresh').pullRefresh().endPullupToRefresh((data.length == 0)); //参数为true代表没有更多数据了。
            var table = document.body.querySelector('.mui-table-view');


            for (var i = 0; i < data.length; i++) {
                var li = document.createElement('li');
                li.className = 'mui-table-view-cell';
                var shichang = shijiancha(data[i]["HXXG_XSQJB_QJSC"]);
                var result = "";
                result += '<div class="xh"><div class="mui-table-view-cells" id="' + data[i]["ID"] + '" onclick="tza(this.id)"><div class="xha"><div class="mc"><div class="xd"></div><span class="zt">' + data[i]["HXXG_QJLXB_QJLX"] + '</span></div>';
                if (data[i]["HXXG_XSQJB_SHZT"] == "审批中") {
                    result += '<div class="mct"><div style="display: inline-block;background:#F1891A;border-radius:5px;padding: 5px;color: #fff;" class="zt">' + data[i]["HXXG_XSQJB_SHZT"] + '</div><a class="mui-icon mui-icon-arrowright" style="color:#B1B1B1"></a></div>';
                }
                else if (data[i]["HXXG_XSQJB_SHZT"] == "通过") {
                    result += '<div class="mct"><div style="display: inline-block;background:rgba(19,203,23,1);border-radius:5px;padding: 5px;color: #fff;" class="zt">' + data[i]["HXXG_XSQJB_SHZT"] + '</div><a class="mui-icon mui-icon-arrowright" style="color:#B1B1B1"></a></div>';
                }
                else {
                    result += '<div class="mct"><div style="display: inline-block;background:#FF0000;border-radius:5px;padding: 5px;color: #fff;" class="zt">' + data[i]["HXXG_XSQJB_SHZT"] + '</div><a class="mui-icon mui-icon-arrowright" style="color:#B1B1B1"></a></div>';
                }
                result += '</div><div class="xhb"><div class="zj">请假开始时间： ' + data[i]["HXXG_XSQJB_QJKSSJ"] + '</div><div class="zj">请假结束时间： ' + data[i]["HXXG_XSQJB_QJJSSJ"] + '</div><div class="zj">请假天数：' + shichang + '</div><div class="zj" >申请时间： ' + data[i]["HXXG_XSQJB_TJSJ"] + '</div></div></div><div class="xhc" style="float: right;padding-right: 20px;">';
                if (data[i]["shifouxujia"] == "是" && data[i]["HXXG_XSQJB_QJLXBID"] != "E284C120-748B-4C8C-B79E-3FFEEFA0682C") {
                    result += '<button class="button-view"  id="xu|' + data[i]["ID"] + '" onclick="xjc(this.id)" style="background-color: #4768F3;color: #fff;">续假</button> ';
                }
                if (data[i]["shifouxiaojia"] == "是") {
                    result += ' <button  class="button-view"  id="xiao|' + data[i]["ID"] + '" style="background-color: #FD6B1B;color: #fff;" onclick="xjb(this.id)">销假</button>';
                }
                result += '</div></div>';
                li.innerHTML = result;
                table.appendChild(li);
            }
            var cells = document.body.querySelectorAll('.mui-table-view-cell');
            page = Math.ceil(cells.length * 1.0 / 5) + 1;
        }
    })
    mui(".mui-table-view").on('tap', '.mui-table-view-cells', function (event) {
        this.click();
        event.stopPropagation();//阻止li事件的点击
    })
    mui(".mui-table-view").on('tap', '.button-view', function (event) {
        this.click();
        event.stopPropagation();//阻止li事件的点击
    })


}
function fh() {
    window.location.href = '../Studenttakeleaveindex.html?xh=' + xh + '&guid=' + Math.random();
}
//请假新增
function xz() {
    var qjbid = "";
    //mui.alert('线上请假暂时关闭，请走线下请假流程！', '通知', function () {
    //      }, 'div');
    //   //  mui.alert('紧急通知：因为目前青岛市出现疫情，线上请假通道暂时关闭，请同学们走线下请假，请知晓！', '通知', function () {
    //    //}, 'div');
    window.location.href = './Studentleaveapply.html?xh=' + xh + '&guid=' + Math.random() + '&leixing=qj&qjbid=' + qjbid;
}

function tza(QJBID) {
    window.location.href = './Studentleavedetail.html?xh=' + xh + '&guid=' + Math.random() + '&qjbid=' + QJBID +'&canshu=2';
}
// 销假
function xjb(QJBID) {
    var arr = QJBID.split('|');
    window.location.href = '../xj/Studentcancelleaveapply.html?xh=' + xh + '&guid=' + Math.random() + '&qjbid=' + arr[1];
}
// 续假
function xjc(QJBID) {
    var arr = QJBID.split('|');
    window.location.href = './Studentleaveapply.html?xh=' + xh + '&guid=' + Math.random() + '&leixing=xj&qjbid=' + arr[1];
}
$(function () {
    //$.ajax({
    //    type: 'Post',
    //    async: false,
    //    dataType: "json",
    //    url: '../../handler/qingjiashenqing.ashx?action=getQingJiaMes&guid=' + Math.random(),
    //    data: {
    //        xh: xh,
    //        qjbid:""
    //    },
    //    success: function (data) {
    //        document.getElementById("content").innerHTML = null;
    //        var result = "";
    //        for (var i = 0; i < data.length; i++) {
    //            var shichang = shijiancha(data[i]["HXXG_XSQJB_QJSC"]);
    //            result += '<div class="xh" id="' + data[i]["ID"]+'" onclick="tza(this.id)"><div class="xha"><div class="mc"><div class="xd"></div><span class="zt">' + data[i]["HXXG_QJLXB_QJLX"]+'</span></div>';
    //            if (data[i]["HXXG_XSQJB_SHZT"] == "审批中") {
    //                result += '<div class="mct"><div style="display: inline-block;background:#F1891A;border-radius:5px;padding: 5px;color: #fff;" class="zt">' + data[i]["HXXG_XSQJB_SHZT"]+'</div><a class="mui-icon mui-icon-arrowright" style="color:#B1B1B1"></a></div>';
    //            }
    //            else if (data[i]["HXXG_XSQJB_SHZT"] == "通过") {
    //                result += '<div class="mct"><div style="display: inline-block;background:rgba(19,203,23,1);border-radius:5px;padding: 5px;color: #fff;" class="zt">' + data[i]["HXXG_XSQJB_SHZT"] + '</div><a class="mui-icon mui-icon-arrowright" style="color:#B1B1B1"></a></div>';
    //            }
    //            else{
    //                result += '<div class="mct"><div style="display: inline-block;background:#FF0000;border-radius:5px;padding: 5px;color: #fff;" class="zt">' + data[i]["HXXG_XSQJB_SHZT"] + '</div><a class="mui-icon mui-icon-arrowright" style="color:#B1B1B1"></a></div>';
    //            }
    //            result += '</div><div class="xhb"><div class="zj">请假开始时间： ' + data[i]["HXXG_XSQJB_QJKSSJ"] + '</div><div class="zj">请假结束时间： ' + data[i]["HXXG_XSQJB_QJJSSJ"] + '</div><div class="zj">请假天数：' + shichang + '</div><div class="zj">申请时间： ' + data[i]["HXXG_XSQJB_TJSJ"]+'</div></div><div class="xhc" style="float: right;padding-right: 20px;">';
    //            if (data[i]["shifouxujia"] == "是") {
    //                result += '<button  id="xu|' + data[i]["ID"] +'" onclick="xjc(this.id)" style="background-color: #4768F3;color: #fff;">续假</button> ';
    //            }
    //            if (data[i]["shifouxiaojia"] == "是") {
    //                result += ' <button  id="xiao|' + data[i]["ID"] +'" style="background-color: #FD6B1B;color: #fff;" onclick="xjb(this.id)">销假</button>';
    //            }
    //            result += '</div></div>';
    //        }
    //        document.getElementById("content").innerHTML = result;
    //    }
    //})
})