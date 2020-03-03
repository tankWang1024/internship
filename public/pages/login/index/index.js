$(function(){
    console.log(111);
    
    getNotifies();
    document.onselectstart = function(){return false}
    var radio = document.getElementsByName("identity")
    let useridentity = null;
    if(BrowserType()!=='Edge' && BrowserType()!=='Chrome'){
        layer.alert("您现在使用的浏览器可能不能正确响应一些操作，若存在操作问题,请先尝试使用以下某一款浏览器:<a href='https://www.google.cn/chrome/'>谷歌浏览器</a>、<a href='https://browser.360.cn/ee/'>360浏览器极速模式</a>、<a href='https://www.microsoft.com/zh-cn/windows/microsoft-edge/'>win10 edge最新版浏览器</a>");
    }
    // 在这个位置加载验证码
    const url = `${config.ip}:${config.port}/user/verifycode`;
    $("#verifyimg").attr("src",url);
    // 校验登录框
    $("#account").on('blur',()=>{
        checkIfFirstLogin();
    });
    // 校验注册框
    $(".reg-land-btn").click(()=>{
        registerUserCheck();
    });
    // 校验登录框
    $(".land-btn").click(()=>{
        userCheck();
    });
    //刷新验证码的几个事件绑定
    $(".refreshcode").click(()=>{
        $("#verifyimg").attr("src",url + "?" + Math.random()*10000);
    });
    $("#verifyimg").click(()=>{
        $("#verifyimg").attr("src",url + "?" + Math.random()*10000);
    });
    $(".reg-refreshcode").click(()=>{
        $("#reg-verifyimg").attr("src",url + "?" + Math.random()*10000);
    });
    $(".verifyimg").click(()=>{
        $("#reg-verifyimg").attr("src",url + "?" + Math.random()*10000);
    });

    //----------------------表单验证--------------------
    let $loginBtn = $(".land-btn");
    let $inputs = $("input");
    let $warnWord = $(".warn-word");
    window.onkeydown = function(e){
      if(e.keyCode == 13){
          userCheck()
      }
    }

    function userCheck(){
        for(let item of radio){
            if(item.checked){
                useridentity = item.value
            }
        }
        console.log(useridentity)
        let useraccount = account.value
        let psw = password.value
        let code = verifycode.value;
        if(code == null || code == ""){
            layer.msg("验证码不能为空");
            return
        }
        console.log(code);
        let loginType = useridentity;
        if(!loginType){
            alert("请选择身份!")
        }else{
            $.ajax({
                type:"POST",
                url:`${config.ip}:${config.port}/user/login`,
                data:{
                    account:useraccount,
                    password:psw,
                    loginType:loginType,
                    code: code
                },
                dataType:"json",
                success:function(data){
                     // 请求成功时
                    console.log(data);
                     if(data.status === 1){
                         sessionStorage.setItem("userinfo",data.data.Authorization)
                         if(useridentity==="Student"){
                             window.location.href = "/student"
                         }else if(useridentity==="Teacher"){
                             window.location.href = "/teacher"
                         }
                     }else{
                         layer.msg(data.message);
                         //刷新验证码
                         $("#verifyimg").attr("src",url);
                     }
                },
                error:function(err){
                    layer.msg('服务器繁忙,请重试!')
                }
            })
        }
    }

    function registerUserCheck(){
        for(let item of radio){
            if(item.checked){
                useridentity = item.value
            }
        }
        var account = $("#reg-account").val();
        var idcard = $("#reg-idcard").val();
        var password = $("#reg-password").val();
        var repassword = $("#re-reg-password").val();
        var code = $("#reg-verifycode").val();
        let loginType = useridentity;
        if(idcard === ''){
            layer.msg("身份证号码信息未填写!");
            return;
        }else if(!loginType){
            layer.msg("请选择身份!")
            return;
        }else if(password === '' || repassword === ''){
            layer.msg("请输入密码!")
            return;
        }else if(password !== repassword){
            layer.msg("密码不一致!")
            return;
        }else{
            if(code == null || code == ""){
                layer.msg("验证码不能为空");
                return;
            }
            // 注册
            $.ajax({
                type:"POST",
                url:`${config.ip}:${config.port}/user/register`,
                data:{
                    account:account,
                    idcard:idcard,
                    password:password,
                    loginType:loginType,
                    code: code
                },
                dataType:"json",
                success:function(data){
                    // 请求成功时
                    if(data.status === 1){
                        layer.alert("注册成功！");
                        toLogin();
                    }else{
                        layer.alert("注册失败: " + JSON.stringify(data));
                        toLogin();
                    }
                },
                error:function(err){
                    layer.msg('服务器繁忙,请重试!')
                }
            })
        }
    }
})

function checkIfFirstLogin(){
    var account = $("#account").val();
    $.ajax({
        type:"GET",
        url:`${config.ip}:${config.port}/user/loginstatus`,
        data:{
            account:account,
        },
        dataType:"json",
        success:function(data){
            // 请求成功时
            // console.log(data);
            if(data.status === 1){
                var rs = JSON.parse(data.data);
                if(rs.isFirstLogin === true){
                    // 第一次登陆, 需要注册
                    toRegister();
                }
            }
        },
        error:function(err){
            layer.msg('服务器繁忙,请重试!')
        }
    })
}

function toLogin(){

    $("#register-box").attr('style','display:none;');
    //因为切换了视图所以需要重新刷新验证码
    var url = `${config.ip}:${config.port}/user/verifycode`;
    $(".verifyimg").attr("src",url + "?" + Math.random()*10000);
    $("#login-box").removeAttr('style');
}
function toRegister(){
    var account = $("#account").val();
    $("#login-box").attr('style','display:none;');
    $("#reg-account").val(account);
    //因为切换了视图所以需要重新刷新验证码
    var url = `${config.ip}:${config.port}/user/verifycode`;
    $(".verifyimg").attr("src",url + "?" + Math.random()*10000);
    $("#register-box").removeAttr('style');
    setTimeout(()=>{
        layer.alert("系统检测您的账号还未登陆过系统，请注册!");
    },300)
}

/**
 * 获取后台的消息通知
 */
function getNotifies(){
    ajaxByGet('/notify',(data)=>{
        let msgs = data.data;
        msgs = msgs.reverse();
        for(var i=0; i<msgs.length; i++){
            let title = msgs[i].title;
            let date = msgs[i].gmtModified;
            let id = msgs[i].id;
            let li = generateNotifyLi(title, date, id);
            $('.notice').append(li);
            if(i>2){
                break;
            }
        }
    });
}

function generateNotifyLi(title, date, id){
    let template = '<li>\n' +
        '        <a href="/notify/' + id + '">' + title + '</a>\n' +
        '    <span> [ ' + date.toString().substr(5,5) + ' ] </span>\n' +
        '    </li>'
    return template;
}