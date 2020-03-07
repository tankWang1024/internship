$(()=>{
    
    layer.msg('如未提交，系统将不会保存所写内容，请您在退出前及时备份。',{time:4000})

    let stuinfo = getLocalStorage("std-report-entity")
    // console.log(stuinfo)
    let stuNo = stuinfo.stuNo
    // console.log(stuNo)
    $.ajax({
        type:"GET",
        url:`${config.ip}:${config.port}/teacher/student/${stuNo}`,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success(data){
            //表单元素
            let stage1Comment = document.getElementById("stage1Comment")
            let stage1Grade = document.getElementById("stage1Grade")
            let stage2Comment = document.getElementById("stage2Comment")
            let stage2Grade = document.getElementById("stage2Grade")
            let totalGrade = document.getElementById("totalGrade")
            let totalScore = document.getElementById("totalScore")
            let stage1Date = document.getElementById("stage1Date")
            let stage2Date = document.getElementById("stage2Date")
            let stage1GradeDate = document.getElementById("stage1GradeDate")
            let stage2GradeDate = document.getElementById("stage2GradeDate")

            let msg = data.data
            // console.log(msg)
            let template = `<div class="window-tittle">
            <span id="">${msg.name}</span>报告册
        </div>
        <div class="content flexbox">
            <div class="content-name">学院：<span id="" class="black">${msg.college}</span></div>
            <div class="content-name">专业：<span id="" class="black">${msg.major}</span></div>
        </div>
        <div class="content flexbox">
            <div class="content-name">姓名：<span id="" class="black">${msg.name}</span></div>
            <div class="content-name">学号：<span id="" class="black">${msg.stuNo}</span></div>
        </div>
        <div class="content flexbox">
            <div class="content-name">学院指导教师工号：<span id="" class="black">${msg.teacherNo}</span></div>
            <div class="content-name">实习单位：<span id="" class="black">${msg.corpName?msg.corpName:"暂无"}</span></div>
        </div>
        <div class="content flexbox">
            <div class="content-name">实习岗位：<span id="" class="black">${msg.corpPosition?msg.corpPosition:"暂无"}</span></div>
            <div class="content-name">实习日期：<span id="" class="black">${stuinfo.gmtStart}</span>&nbsp;至&nbsp;<span id=""class="black">${stuinfo.gmtEnd}</span></div>
        </div>`
           
        let first = `<div class="title">第一阶段</div>
        <div class="content">
            <div class="content-name">第一阶段实习总结</div>
            <div class="inner-content">${stuinfo.stage1Summary?stuinfo.stage1Summary:"暂无内容"}</div>
            <div class="content-name">第一阶段实习指导方式</div>
            <div class="inner-content">${stuinfo.stage1GuideWay?stuinfo.stage1GuideWay:"暂无内容"}</div>
            <div class="time"><span class="time-text">时间</span><span class="time-inner">${stuinfo.stage1GuideDate?stuinfo.stage1GuideDate:""}</span></div>
        </div>`
        let second = `<div class="title">第二阶段</div>
        <div class="content">
            <div class="content-name">第二阶段实习总结</div>
            <div class="inner-content">
            ${stuinfo.stage2Summary?stuinfo.stage2Summary:"暂无内容"}</div>
            <div class="content-name">第二阶段实习指导方式</div>
            <div class="inner-content">${stuinfo.stage2GuideWay?stuinfo.stage2GuideWay:"暂无内容"}</div>
            <div class="time"><span class="time-text">时间</span><span class="time-inner">${stuinfo.stage2GuideDate?stuinfo.stage2GuideDate:""}</span></div>
        </div>`
            
            $('.person-info').html(template)
            $('.first').html(first)
            $('.second').html(second)

            // //第一阶段
            // //教师评语
            if(stage1Comment){
                stage1Comment.value = stuinfo.stage1Comment
            }

            // stage1Comment.value = stuinfo.stage1Comment
            // //教师评语时间
            if(stage1Date){
                stage1Date.value = stuinfo.stage1Date
            }
            // stage1Date.value = stuinfo.stage1Date?stuinfo.stage1Date:null
            // //成绩评定
            if(stage1Grade){
                stage1Grade.value = stuinfo.stage1Grade
            }
            // stage1Grade.value = stuinfo.stage1Grade
            // //成绩评定时间
            if(stage1GradeDate){
                stage1GradeDate.value = stuinfo.stage1GradeDate
            }
            // stage1GradeDate.value = stuinfo.stage1GradeDate?stuinfo.stage1GradeDate:null

            // //第二阶段
            // //教师评语
            if(stage2Comment){
                stage2Comment.value = stuinfo.stage2Comment
            }
            
            // stage2Comment.value = stuinfo.stage2Comment
            // //教师评语时间
            if(stage2Date){
                stage2Date.value = stuinfo.stage2Date
            }
            // stage2Date.value = stuinfo.stage2Date?stuinfo.stage2Date:null
            // //成绩评定
            if(stage2Grade){
                stage2Grade.value = stuinfo.stage2Grade
            }
            // stage2Grade.value = stuinfo.stage2Grade
            // //成绩评定时间
            if(stage2GradeDate){
                stage2GradeDate.value = stuinfo.stage2GradeDate
            }
            // stage2GradeDate.value = stuinfo.stage2GradeDate?stuinfo.stage2GradeDate:null
            // //总评
            // //评价
            if(totalGrade){
                totalGrade.value = stuinfo.totalGrade
            }
            // totalGrade.value = stuinfo.totalGrade
            // //成绩
            if(totalScore){
                totalScore.value = stuinfo.totalScore
            }
            // totalScore.value = stuinfo.totalScore?stuinfo.totalScore:"优秀"
        }
    })



    $.ajax({
        type:"get",
        url:`${config.ip}:${config.port}/user/reportStage`,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success(data){
            // console.log(data.data)
            if(!data.data.isReportStage1Open){
                $(".first-part").remove()
            }
            if(!data.data.isReportStage2Open){
                $(".sec-part").remove()
            }
            if(!data.data.isReportStage3Open){
                $(".total-part").remove()
            }
        },
        error(){}
    })

    //提交
    $('.submit').on("click",()=>{
        let stage1Comment = document.getElementById("stage1Comment")
        let stage1Grade = document.getElementById("stage1Grade")
        let stage2Comment = document.getElementById("stage2Comment")
        let stage2Grade = document.getElementById("stage2Grade")
        let totalGrade = document.getElementById("totalGrade")
        let totalScore = document.getElementById("totalScore")
        let stage1Date = document.getElementById("stage1Date")
        let stage2Date = document.getElementById("stage2Date")
        let stage1GradeDate = document.getElementById("stage1GradeDate")
        let stage2GradeDate = document.getElementById("stage2GradeDate")

        let options = {
            id:stuinfo.id,
            stuNo:stuinfo.stuNo,
            // stage1Comment:stage1Comment.value,
            // stage1Date:stage1Date.value,
            // stage1Grade:stage1Grade.value,
            // stage1GradeDate:stage1GradeDate.value,
            // stage2Comment:stage2Comment.value,
            // stage2Date:stage2Date.value,
            // stage2Grade:stage2Grade.value,
            // stage2GradeDate:stage2GradeDate.value,

            // totalGrade:totalGrade.value,
            // totalScore:totalScore.value,
        }

        //------------字数要求----------------
        if(stage1Comment.value.length<60){
            layer.msg('一阶段评语不能低于60字')
            return;
        }
        if(stage2Comment.value.length!=0 && stage2Comment.value.length<60){
            layer.msg('二阶段评语不能低于60字')
            return;
        }
        if(totalGrade.value.length!=0 && totalGrade.value.length<60){
            layer.msg('总评不能低于60字')
            return;
        }
        

        if(stage1Comment){
            bindValue(options,stage1Comment,stage1Comment.value)
        }
        if(stage1Grade){
            bindValue(options,stage1Grade,stage1Grade.value)
        }
        if(stage2Comment){
            bindValue(options,stage2Comment,stage2Comment.value)
        }
        if(stage2Grade){
            bindValue(options,stage2Grade,stage2Grade.value)
        }
        if(totalGrade){
            bindValue(options,totalGrade,totalGrade.value)
        }
        if(totalScore){
            bindValue(options,totalScore,totalScore.value)
        }
        
        //时间处理
        if(stage1Date){
            if(stage1Date.value){
                options.stage1Date = stage1Date.value
            }
        }
        if(stage2Date){
            if(stage2Date.value){
                options.stage2Date = stage2Date.value
            }
        }
        if(stage1GradeDate){
            if(stage1GradeDate.value){
                options.stage1GradeDate = stage1GradeDate.value
            }
        }

        if(stage2GradeDate){
            if(stage2GradeDate.value){
                options.stage2GradeDate = stage2GradeDate.value
            }
        }

            // console.log(options)

        // if(stage1Date.value){
        //     options.stage1Date = stage1Date.value
        // }
        // if(stage1GradeDate.value){
        //     options.stage1GradeDate = stage1GradeDate.value
        // }
        // if(stage2Date.value){
        //     options.stage2Date = stage2Date.value
        // }
        // if(stage2GradeDate.value){
        //     options.stage2GradeDate = stage2GradeDate.value
        // }
        $.ajax({
            type:"POST",
            url:`${config.ip}:${config.port}/teacher/student/reportForm`,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            },
            data:options,
            success(data){
                if (data.status == 1){
                    layer.msg("提交成功!");
                    setTimeout(()=>{
                        window.location.href = "/teacher";
                    },1000);
                } else {
                    layer.msg("失败!详细信息参考：" + data.message);
                }
            }
        })
    })
})