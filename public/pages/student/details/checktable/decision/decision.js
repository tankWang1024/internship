$(()=>{
    $.ajax({
        type:"get",
        url:`${config.ip}:${config.port}/student/identifyForm`,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success:function(data){
            // console.log(data)
            
            let msg = data.data
            let template = `<div class="msg-block">
            <div class="title">个人实习</div>
            <div class="content">
                <div class="content-name">实习内容</div>
                <div class="inner-content">${msg.sxContent?msg.sxContent:"暂无内容"}</div>
            </div>
            <div class="content">
                <div class="content-name">实习生自我总结</div>
                <div class="inner-content">${msg.selfSummary?msg.selfSummary:"暂无内容"}</div>
            </div>

        </div>
        <div class="msg-block">
            <div class="title">评价</div>
            <div class="content">
                <div class="content-name">实习单位指导教师评语</div>
                <div class="inner-content">${msg.corpTeacherOpinion?msg.corpTeacherOpinion:"暂无内容"}</div>
                <div class="time"><span class="time-text">时间</span><span class="time-inner">${msg.ctodate?msg.ctodate:""}</span></div>
            </div>
            <div class="content">
                <div class="content-name">实习单位审核意见</div>
                <div class="inner-content">${msg.corpOpinion?msg.corpOpinion:"暂无内容"}</div>
                <div class="time"><span class="time-text">时间</span><span class="time-inner">${msg.codate?msg.codate:""}</span></div>
            </div>
            <div class="content">
                <div class="content-name">实习成绩</div>
                <div class="internship-grade">
                    <div class="line-one">
                        <div class="content">
                            <div class="content-name">实习单位指导教师成绩评定</div>
                            <div class="inner-content">成绩:${msg.corpTeacherScore?msg.corpTeacherScore:"暂无评价"}</div>
                            <div class="inner-content">${msg.corpTeacherGrade?msg.corpTeacherGrade:"暂无内容"}</div>
                            <div class="time"><span class="time-text">时间</span><span class="time-inner">${msg.ctgdate?msg.ctgdate:""}</span></div>
                        </div>
                        <div class="content">
                            <div class="content-name">学院指导教师成绩评定</div>
                            <div class="inner-content">${msg.teacherGrade?msg.teacherGrade:"暂无内容"}</div>
                            <div class="time"><span class="time-text">时间</span><span class="time-inner">${msg.tgdate?msg.tgdate:""}</span></div>
                        </div>
                    </div>
                    <div class="line-sec">
                        <div class="content-name">综合实习成绩判定</div>
                        <div class="inner-content">${msg.comprehsvGrade?msg.comprehsvGrade:"暂无内容"}</div>
                        <div class="time"><span class="time-text">时间</span><span class="time-inner">${msg.cpodate?msg.cpodate:""}</span></div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="content-name">学院实习领导小组意见</div>
                <div class="inner-content">${msg.collegePrincipalOpinion?msg.collegePrincipalOpinion:"暂无内容"}</div>
                <div class="time"><span class="time-text">时间</span><span class="time-inner">${msg.cgdate?msg.cgdate:""}</span></div>
            </div>
        </div>`
            $(".window").html(template)
        },
        error:function(err){
            alert(err)
        }
    })


    $(".download-btn").on("click",()=>{
        $.ajax({
            type:"get",
            url:`${config.ip}:${config.port}/student/identify/form`,
            dataType:"json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            },
            success(data){
                let msg = data.data
                let url = `${config.ip}:${config.port}/`+msg
                window.location.href = url
                // console.log(url)

            },
            error(err){
                alert(err)
            }
        })
    })

    $('.return-btn').on("click",()=>{
        window.location.href = "/student"
    })



})