$(() => {
  $.ajax({
    type: "get",
    url: `${config.ip}:${config.port}/student/reportForm`,
    dataType: "json",
    beforeSend: function (request) {
      request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
    },
    success: (data) => {
      console.log(data)
      let msg = data.data
      let template = `<div class="msg-block">
            <div class="title">第一阶段报告册</div>
            <div class="text"><span class="name">指导时间</span><span class="text-inner">${msg.stage1GuideDate?msg.stage1GuideDate:"暂无"}</span></div>
            <div class="text"><span class="name">指导方式</span><span class="text-inner">${msg.stage1GuideWay?msg.stage1GuideWay:"暂无内容"}</span></div>
            <div class="content">
                <div class="content-name">第一阶段实习总结</div>
                <div class="inner-content">${msg.stage1Summary?msg.stage1Summary:"暂无总结"}</div>
                <div class="time"><span class="time-text">时间</span><span class="time-inner">${msg.stage1Date?msg.stage1Date:"暂无内容"}</span></div>
            </div>
            <div class="content">
                <div class="content-name">学院实习指导教师评语</div>
                <div class="inner-content">${msg.stage1Comment?msg.stage1Comment:"暂无评价"}</div>
                <div class="time"><span class="time-text">时间</span><span class="time-inner">${msg.stage1GradeDate?msg.stage1GradeDate:"暂无内容"}</span></div>
            </div>
            <div class="content">
                <div class="content-name">第一阶段实习成绩评定</div>
                <div class="inner-content">${msg.stage1Grade?msg.stage1Grade:"暂无评价"}</div>
                <div class="time"><span class="time-text">时间</span><span class="time-inner">${msg.stage1GradeDate?msg.stage1GradeDate:"暂无内容"}</span></div>
            </div>
            
        </div>
        <div class="msg-block">
            <div class="title">第二阶段报告册</div>
            <div class="text"><span class="name">指导时间</span><span class="text-inner">${msg.stage2GuideDate?msg.stage2GuideDate:"暂无"}</span></div>
            <div class="text"><span class="name">指导方式</span><span class="text-inner">${msg.stage2GuideWay?msg.stage2GuideWay:"暂无内容"}</span></div>
            <div class="content">
                    <div class="content-name">第二阶段实习总结</div>
                    <div class="inner-content">${msg.stage2Summary?msg.stage2Summary:"暂无总结"}</div>
                    <div class="time"><span class="time-text">时间</span><span class="time-inner">${msg.stage2Date?msg.stage2Date:"暂无内容"}</span></div>
                </div>
                <div class="content">
                    <div class="content-name">学院实习指导教师评语</div>
                    <div class="inner-content">${msg.stage2Comment?msg.stage2Comment:"暂无评价"}</div>
                    <div class="time"><span class="time-text">时间</span><span class="time-inner">${msg.stage2GradeDate?msg.stage2GradeDate:"暂无内容"}</span></div>
                </div>
                <div class="content">
                    <div class="content-name">第二阶段实习成绩评定</div>
                    <div class="inner-content">${msg.stage2Grade?msg.stage2Grade:"暂无评价"}</div>
                    <div class="time"><span class="time-text">时间</span><span class="time-inner">${msg.stage2GradeDate?msg.stage2GradeDate:"暂无内容"}</span></div>
                </div>
        </div>
        <div class="msg-block">
            <div class="title">学院实习指导教师总评及成绩评定</div>
            <div class="content">
                <div class="content-name">评语</div>
                <div class="inner-content">${msg.totalGrade?msg.totalGrade:"暂无评价"}</div>
               
            </div>
            <div class="text"><span class="name">实习成绩</span><span class="text-inner">${msg.totalScore?msg.totalScore:"暂无评价"}</span></div>
        </div>`
      $('.window').html(template)
    },
    error: (err) => {
      alert("服务器繁忙,请稍后重试")
    }
  })

  $(".download-btn").on("click", () => {
    layer.msg('服务器正在生成pdf页面，请勿退出，耐心等待....', {
      time: 99999
    })
    $(".download-btn")[0].disabled = 'disabled'
    console.log('点点点');
    $.ajax({
      type: "get",
      url: `${config.ip}:${config.port}/student/report/form`,
      dataType: "json",
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
      },
      success(data) {
        let msg = data.data
        let url = `${config.ip}:${config.port}/` + msg
        window.location.href = url
        // console.log(url)

      },
      error(err) {
        // console.log(err)
      }
    })
  })


  $('.return-btn').on("click", () => {
    window.location.href = "/student"
  })

})