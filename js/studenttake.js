
var xh = GetQueryString("xh");
var commonxh = GetQueryString("commonxh");
var opid = GetQueryString("opid");
function fh() {
//根据校号查询身份证
$.ajax({
        type: 'Post',
        async: false,
        dataType: "json",
        url: '../handler/qingjiashenqing.ashx?action=getSFZH&guid=' + Math.random(),
        data: {
            xh: xh,
        },
        success: function (data) {
var shzh="";
if(data.length>0){
shzh=data[0]["XSXX_SFZH"];
}
   var commonxh = xh + "*" + shzh;
                            commonxh = encodeBase64(commonxh);
   window.location.href = '../../dianzidanganxin/daily.html?commonxh=' + commonxh + '&guid=' + Math.random()+'&opid='+opid;
}})
 
}
  function encodeBase64(mingwen, times) {
            var code = "";
            var num = 1;
            if (typeof times == 'undefined' || times == null || times == "") {
                num = 1;
            } else {
                var vt = times + "";
                num = parseInt(vt);
            }

            if (typeof mingwen == 'undefined' || mingwen == null || mingwen == "") {

            } else {
                $.base64.utf8encode = true;
                code = mingwen;
                for (var i = 0; i < num; i++) {
                    code = $.base64.btoa(code);
                }
            }
            return code;
        };
function qjsq() {
    window.location.href = "./qjsq/Studentleaveindex.html?xh=" + xh + "&guid=" + Math.random();
}

function xjsq() {
    window.location.href = "./xj/Studentcancelleaveindex.html?xh=" + xh + "&guid=" + Math.random();
}

function qjwj() {
    window.location.href = "./wjjl/Studentbreachprinciplerecord.html?xh=" + xh + "&guid=" + Math.random();
}

function ts() {
    window.location.href = "./wxts/wxts.html?xh=" + xh + "&guid=" + Math.random();
}