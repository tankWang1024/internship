window.onload = ()=>{

    layer.msg('如未提交，系统将不会保存所写内容，请及时备份。',{time:0})
    
    redirectTo(document.getElementsByClassName("list")[0].getElementsByTagName('li')[0],"/student/first")
    redirectTo(document.getElementsByClassName('item')[0],"/student");
    redirectTo(document.getElementsByClassName('item')[2],"/student-decision");

    $.ajax({
            type:"get",
            url:`${config.ip}:${config.port}/student/reportForm`,
            dataType:"json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            },
            success:(data)=>{
                const msg = data.data
                // console.log(msg)
                if(msg.stage2GuideDate){
                    var firtime = msg.stage2GuideDate.split(' - ')[0]
                    var lasttime = msg.stage2GuideDate.split(' - ')[1]
                }
                
                firtimeinput.value = firtime?firtime:""
                lasttimeinput.value = lasttime?lasttime:""

                var dateStart = new Date(msg.stage1Date)
                starttime.value = dateStart.getFullYear()+'-'+('0'+(dateStart.getMonth()+1)).slice(-2) + ('0'+dateStart.getDate()).slice(2)

                method.value = msg.stage2GuideWay
                summary.value = msg.stage2Summary

                $('.limit').each((index,item)=>{

                    $(item).find('.summary-num').html($(item).siblings().get(1).value.length)

                })
            },
            error:(err)=>{
                layer.msg("服务器繁忙,请重试")
            }
    })

    $('#summary').on("input",()=>{
        // console.log(111)
        $('.summary-num').html($('#summary').get(0).value.length)
        // $(this).find('.summary-num').html($(this).siblings().get(1).value.length)
    })

    $.ajax({
        type:"get",
        url:`${config.ip}:${config.port}/user/reportStage`,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success(data){
            // console.log(data.data.isReportStage2Open)
            if(data.data.isReportStage2Open){
                $('.showToast').css({
                    display:"none"
                })
                
                $(".submit").on("click",()=>{
                    layer.msg('你确定提交吗？', {
                        time: 0 //不自动关闭
                        , btn: ['提交', '取消']
                        , yes: function (index) {
                            // 防止用户重复点击
                            // 为了防止学生重复点击，加载出来之前关闭按钮
                            $("#secsubmit").text("提交中,请稍后...");
                            $("#secsubmit").attr("disabled","true");
                            if(!starttime.value){
                                layer.msg("填写时间为必填项!")
                                $("#secsubmit").removeAttr("disabled");
                                $("#secsubmit").text("提交");
                                return;
                            }
                            let stage2_summary = summary.value
                            let stage2Date   = starttime.value ;
                            let stage2GuideWay  = method.value ;
                            // let gmtStart =
                            let stage2GuideDate = firtimeinput.value+" - "+lasttimeinput.value;
                            // console.log(summary.value.length)
                            if(summary.value.length>1050){
                                layer.msg("字数超过限制,请更改后提交!")
                                $("#secsubmit").removeAttr("disabled");
                                $("#secsubmit").text("提交");
                                return;
                            }

                            if(summary.value.length<800){
                                layer.msg("总结不能低于800字")
                                $("#secsubmit").removeAttr("disabled");
                                $("#secsubmit").text("提交");
                                return;
                            }

                            $.ajax({
                                type:"post",
                                url:`${config.ip}:${config.port}/student/report/stage2`,
                                dataType:"json",
                                data:{
                                    stage2Date :stage2Date ,
                                    stage2GuideDate:stage2GuideDate,
                                    stage2Summary:stage2_summary,
                                    stage2GuideWay:stage2GuideWay
                                },
                                beforeSend: function(request) {
                                    request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
                                },
                                success:(data)=>{
                                    if (data.status == 1) {
                                        layer.msg("提交成功!" + data.message)
                                        $("#secsubmit").removeAttr("disabled");
                                        $("#secsubmit").text("提交");
                                        setTimeout(()=>{
                                            window.location.href = "/student"
                                        },1200)
                                    }else{
                                        layer.msg(data.message);
                                        $("#secsubmit").removeAttr("disabled");
                                        $("#secsubmit").text("提交");
                                    }
                                }
                            })
                        }
                    })
                });
            }
        },
        error(){}
    })



    $('.logout').on("click",()=>{
        alert("注销")
        sessionStorage.setItem("userinfo","")
        setTimeout(()=>{
            window.location.href = "/logout"
        },1000)
    })
}