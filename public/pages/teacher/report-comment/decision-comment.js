$(()=>{
    //访问学生信息
    let stuinfo = getLocalStorage("std-decision-entity")
    let stuNo = stuinfo.stuNo
    // console.log(stuNo)
    console.log(stuinfo)

    //第一次渲染学生信息
    $.ajax({
        type:"GET",
        url:`${config.ip}:${config.port}/teacher/student/${stuNo}`,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success(data){
            console.log(data.data)
            let person_info = data.data
            let template = `<div class="window-tittle">
            <span id="">${person_info.name}</span>鉴定表
        </div>
        <div class="content flexbox">
            <div class="content-name">学院：<span id="" class="black">${person_info.college}</span></div>
            <div class="content-name">专业：<span id="" class="black">${person_info.major}</span></div>
        </div>
        <div class="content flexbox">
            <div class="content-name">姓名：<span id="" class="black">${person_info.name}</span></div>
            <div class="content-name">学号：<span id="" class="black">${person_info.stuNo}</span></div>
        </div>
        <div class="content flexbox">
                <div class="content-name">实习单位：<span id="" class="black">${person_info.corpName?person_info.corpName:"暂无"}</span></div>
                <div class="content-name">实习岗位：<span id="" class="black">${person_info.corpPosition?person_info.corpPosition:"暂无"}</span></div>
            </div>

            <div class="msg-block">
            <div class="title">鉴定表</div>
            <div class="content">
                <div class="content-name">实习内容</div>
                <div class="inner-content">${stuinfo.sxContent?stuinfo.sxContent:"暂无"}</div>
                <!-- <div class="time"><span class="time-text">时间</span><span class="time-inner">2019/10/24</span></div> -->
            </div>
            <div class="content">
                <div class="content-name">自我总结</div>
                <div class="inner-content">${stuinfo.selfSummary?stuinfo.selfSummary:"暂无"}</div>
                <!-- <div class="time"><span class="time-text">时间</span><span class="time-inner">2019/10/24</span></div> -->
            </div>
        </div>
            `
            // console.log(stuinfo)
            $(".person-info").html(template)
            // let temp_time = stuinfo
            // console.log(temp_time)
            // console.log(stuinfo)
            //实习单位指导教师评语
            // corpTeacherOpinion.value = stuinfo.corpTeacherOpinion
            $('#corpTea-comment').text(stuinfo.corpTeacherOpinion?stuinfo.corpTeacherOpinion:"暂无");
            //实习单位指导教师实习成绩
            corpTeacherGrade.value = stuinfo.corpTeacherGrade?stuinfo.corpTeacherGrade:"优秀"

            //实习单位指导教师实习成绩时间
            // CTODate.value = stuinfo.ctodate?stuinfo.ctodate:null
            // $("#CTODate").text(stuinfo.ctodate?stuinfo.ctodate:"暂无");
            $("#CTODate").text(person_info.ctodate?person_info.ctodate:"暂无");

            //实习单位审核意见
            // corpOpinion.value = stuinfo.corpOpinion
            $("#corp-comment").text(stuinfo.corpOpinion?stuinfo.corpOpinion:"暂无");
            //实习单位审核意见时间
            // CODate.value = stuinfo.codate?stuinfo.codate:null
            // $("#CODate").text(stuinfo.codate?stuinfo.codate:"暂无")
            $("#CODate").text(person_info.codate?person_info.codate:"暂无")


            //所在学院指导老师成绩评定
            teacherGrade.value = stuinfo.teacherGrade
            //所在学院指导老师成绩评定时间
            TGDate.value = stuinfo.tgdate?stuinfo.tgdate:null


            
            //综合实习成绩评定
            // comprehsvGrade.value = stuinfo.comprehsvGrade
            // console.log(comprehsvGrade)
            comprehsvGrade.innerHTML = stuinfo.comprehsvGrade?stuinfo.comprehsvGrade:"暂无成绩"


            //综合实习成绩评定时间
            // CGDate.innerHTML = stuinfo.cgdate?stuinfo.cgdate:"暂无"
            CGDate.innerHTML = person_info.cgdate?person_info.cgdate:"暂无"
            // CGDate.value = stuinfo.cgdate?stuinfo.cgdate:null
            //所在学院实习领导小组意见
            // collegePrincipalOpinion.value = stuinfo.collegePrincipalOpinion
            collegePrincipalOpinion.value = person_info.collegePrincipalOpinion
            //所在学院实习领导小组意见时间
            // CPODate.value = stuinfo.cpodate?stuinfo.cpodate:null
            CPODate.value = person_info.cpodate?person_info.cpodate:null
        }
    })

    //提交
    $(".submit").on("click",function(){
        let options = {
            teacherGrade:teacherGrade.value,

            CTGDate:stuinfo.cTGDate,
            CTODate:CTODate.value,

            
            cTGDate:stuinfo.cTGDate,
            cTODate:CTODate.value,

                    collegePrincipalOpinion:collegePrincipalOpinion.value,
                    comprehsvGrade:comprehsvGrade.value,
                    corpOpinion:corpOpinion.value,
                    corpTeacherGrade:corpTeacherGrade.value,
                    corpTeacherOpinion:corpTeacherOpinion.value,

                    corpTeacherScore:corpTeacherGrade.value,
            gmtEnd:stuinfo.gmtEnd,
            gmtStart:stuinfo.gmtStart,

                    id:stuinfo.id,

                    selfSummary:stuinfo.selfSummary,
            
                    stuNo:stuNo,

                    sxContent:stuinfo.sxContent,


            
        }
        // console.log(CTODate.value)
        if(CODate.value){
            options.CODate = CODate.value
            options.cODate = CODate.value
        }
        if(TGDate.value){
            options.TGDate = TGDate.value
            options.tGDate = TGDate.value
        }
        if(CGDate.value){
            options.CGDate = CGDate.value
            options.cGDate = CGDate.value
        }
        if(CPODate.value){
            options.CPODate = CPODate.value
            options.cPODate = CPODate.value
        }
        // console.log(options)
        $.ajax({
            type:"POST",
            url:`${config.ip}:${config.port}/teacher/student/identifyForm`,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            },
            data:options,
            success(data){
                layer.msg("提交成功!")
                setTimeout(()=>{
                    window.location.href = "/teacher";
                },1000);

            },
            error(){
                layer.msg("服务器错误,请重试")
            }
        })
    })
})