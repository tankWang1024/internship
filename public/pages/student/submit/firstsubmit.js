window.onload = ()=>{

    layer.msg('如未提交，系统将不会保存所写内容，请您在退出前及时备份。',{time:4000})
    
    redirectTo(document.getElementsByClassName("list")[0].getElementsByTagName('li')[1],"/student/twice")
    redirectTo(document.getElementsByClassName('item')[0],"/student");
    redirectTo(document.getElementsByClassName('item')[2],"/student-decision");
    var gmtStart = null;
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
                gmtStart = new Date(msg.gmtStart)
                if(msg.stage1GuideDate){
                    var firtime = msg.stage1GuideDate.split(' - ')[0]
                    var lasttime = msg.stage1GuideDate.split(' - ')[1]
                }
                
                firtimeinput.value = firtime?firtime:""
                lasttimeinput.value = lasttime?lasttime:""

                var dateStart = null;
                if(msg.stage1Date){
                    dateStart= new Date(msg.stage1Date)
                }else{//第一次填
                    dateStart = new Date()
                }
                // console.log(dateStart);
                let yearStart = dateStart.getFullYear()
                let monthStart =('0'+(dateStart.getMonth()+1)).slice(-2)
                let dayStart = ('0'+dateStart.getDate()).slice(-2)
                starttime.value = yearStart+'-'+monthStart+'-'+dayStart
                method.value = msg.stage1GuideWay
                summary.value = msg.stage1Summary

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
            // console.log(data.data.isReportStage1Open)
            if(data.data.isReportStage1Open){
                $('.showToast').css({
                    display:"none"
                })

                $(".submit").on("click",()=>{
                    layer.msg('你确定提交吗？', {
                        time: 0 //不自动关闭
                        ,btn: ['提交', '取消']
                        ,yes: function(index){
                            // 为了防止学生重复点击，加载出来之前关闭按钮
                            $("#firtsubmit").text("提交中,请稍后...");
                            $("#firtsubmit").attr("disabled","true");
                            if(!starttime.value){
                                layer.msg("填写时间为必填项!")
                                $("#firtsubmit").removeAttr("disabled");
                                $("#firtsubmit").text("提交");
                                return;
                            }
                            let stage1Summary = summary.value
                            let stage1Date  = starttime.value ;
                            console.log(typeof stage1Date)
                            let stage1GuideWay  = method.value ;
                            // console.log(gmtStart)
                            let stage1GuideDate = firtimeinput.value+" - "+lasttimeinput.value;
                            if(summary.value.length > 1050){
                                layer.msg("字数超过限制,请更改后提交!");
                                $("#firtsubmit").removeAttr("disabled");
                                $("#firtsubmit").text("提交");
                                return;
                            }

                            if(summary.value.length < 800){
                                layer.msg("总结不能低于800字")
                                $("#firtsubmit").removeAttr("disabled");
                                $("#firtsubmit").text("提交");
                                return;
                            }

                            $.ajax({
                                type:"post",
                                url:`${config.ip}:${config.port}/student/report/stage1`,
                                dataType:"json",
                                data:{
                                    gmtStart:gmtStart,
                                    stage1Date:stage1Date,
                                    stage1Summary:stage1Summary,
                                    stage1GuideDate:stage1GuideDate,
                                    stage1GuideWay:stage1GuideWay
                                },
                                beforeSend: function(request) {
                                    request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
                                },
                                success:(data)=>{
                                    if (data.status == 1) {
                                        layer.msg("提交成功!" + data.message)
                                        setTimeout(()=>{
                                            window.location.href = "/student"
                                        },1000)
                                    }else{
                                        layer.msg(data.message);
                                        $("#firtsubmit").removeAttr("disabled");
                                        $("#firtsubmit").text("提交");
                                    }
                                }
                            })
                        }
                    });

                })

            }
            
        },
        error(){}
    })

    




    $('.logout').on("click",()=>{
        layer.msg("注销");
        setTimeout(()=>{
            sessionStorage.setItem("userinfo","")
            window.location.href = "/logout"
        },1000)
    })
}