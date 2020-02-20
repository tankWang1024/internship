$(()=>{
    redirectTo(document.getElementsByClassName("item")[0],"/student")
    redirectTo(document.getElementsByClassName("item")[1].getElementsByTagName("li")[0],"/student/first")
    redirectTo(document.getElementsByClassName("item")[1].getElementsByTagName("li")[1],"/student/twice")
    $('.logout').on("click",()=>{
        layer.msg("注销成功")
        setTimeout(()=>{
            sessionStorage.setItem("userinfo","")
            window.location.href = "/logout"
        },2000)
    })
    $.ajax({
        type:"get",
            url:`${config.ip}:${config.port}/student/identifyForm`,
            dataType:"json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            },
            success:(data)=>{
                // console.log(data)
                const msg = data.data
                practiceContent.value = msg.sxContent
                selfSummary.value = msg.selfSummary
                corpopinion.value = msg.corpOpinion
                corpteacheropinion.value = msg.corpTeacherOpinion
                $('.practice-num').html(practiceContent.value.length)
                $('.self-num').html(selfSummary.value.length)
            },
            error:(err)=>{
                layer.msg("服务器繁忙,请重试")
            }
    })
    $('#practiceContent').on("input",()=>{
        $('.practice-num').html($('#practiceContent').get(0).value.length)
    })
    $('#selfSummary').on("input",()=>{
        $('.self-num').html($('#selfSummary').get(0).value.length)
    })
    $('.submit').on("click",()=>{
        layer.msg('你确定提交吗？', {
            time: 0 //不自动关闭
            , btn: ['提交', '取消']
            , yes: function (index) {
                let pra = practiceContent.value
                let summary = selfSummary.value
                if(pra.length>1200){
                    layer.msg('实习内容长度超过限制,请修改后提交!')
                    return;
                }
                if(summary.length>1200){
                    layer.msg('实习自我总结长度超过限制,请修改后提交!')
                    return;
                }
                if(summary.length<800){
                    layer.msg('实习自我总结要求不低于800字')
                    return
                }
                // 为了防止学生重复点击，加载出来之前关闭按钮
                $("#decisionsubmit").text("提交中,请稍后...");
                $("#decisionsubmit").attr("disabled","true");
                $.ajax({
                    type:"post",
                    url:`${config.ip}:${config.port}/student/identify`,
                    dataType:"json",
                    data:{
                        practiceContent:pra,
                        selfSummary:summary,
                        corpOpinion:corpopinion.value,
                        corpTeacherOpinion:corpteacheropinion.value
                    },
                    beforeSend: function(request) {
                        request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
                    },
                    success:function(){
                        // if()
                        layer.msg("提交成功!")
                        setTimeout(()=>{
                            window.location.href = "/student"
                        },1500)
                    }
                })
            }
        })
    })
})