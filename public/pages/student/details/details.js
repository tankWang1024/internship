$(() => {
    $('body').delegate('.controls button:first', "click", function () {
        window.location.href = "/student/reports-details"
    })
    $('body').delegate('.controls button:last', "click", function () {
        window.location.href = "/student/decision-details"
    })
    let std = {}

    redirectTo(document.getElementsByClassName('list')[0].getElementsByTagName('li')[0],
        "/student/first");
    redirectTo(document.getElementsByClassName('list')[0].getElementsByTagName('li')[1],
        "/student/twice");
    redirectTo(document.getElementsByClassName("item")[2], "/student-decision")
    //---------------请求学生信息---------------------
    $.ajax({
        type: "get",
        url: `${config.ip}:${config.port}/student/selfInfo`,
        dataType: "json",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success: function (data) {
            std = data.data
            let stdTemplate = ` <div class="title">学生信息<span class='changedetails'><span class='iconfont icon-shang down' ></span>修改信息</span></div>
            <div class="changecontent">
                <div class="changetitle">电话</div>
                <input type="text" placeholder="电话" name="selfphone" id="selfphone" value="${std.phone}"/>
                <div class="changetitle">微信</div>
                <input type="text" placeholder="微信" name="selfwechat" id="selfwechat" value="${std.wechat}"/>
                <div class="changetitle">QQ</div>
                <input type="text" placeholder="QQ" name="selfqq" id="selfqq" value="${std.qq}"/>
                <div class="changetitle">年龄</div>
                <input type="number" placeholder="年龄" name="selfage" id="selfage" value="${std.age}"/>
                <div class="changetitle">校外导师工号</div>
                <input type="text" placeholder="校外导师工号" name="selftno" id="selftno" value="${std.corpTeacherNo}" />
                <button class="details-btn">修改</button>
            </div>
            <div class="text"><span>姓名</span>${std.name}</div>
            <div class="text"><span>学号</span>${std.stuNo}</div>
            <div class="text"><span>微信</span>${std.wechat?std.wechat:"暂无"}</div>
            <div class="text"><span>年龄</span>${std.age?std.age:"暂无"}</div>
            <div class="text"><span>qq</span>${std.qq?std.qq:"暂无"}</div>
            <div class="text"><span>电话</span>${std.phone?std.phone:"暂无"}</div>
            <div class="text"><span>专业</span>${std.major}</div>
            <div class="text"><span>实习岗位</span>${std.corpPosition?std.corpPosition:"暂无"}</div>
            <div class="text"><span>实习企业</span>${std.corpName?std.corpName:"暂无"}</div>
            <div class="text"><span>身份证号</span>${std.idCard}</div>
            <div class="text"><span>学院</span>${std.college}</div>
            <div class="text"><span>实习开始时间</span>${std.gmtStart?std.gmtStart:"暂无"}</div>
            <div class="text"><span>实习结束时间</span>${std.gmtEnd?std.gmtEnd:"暂无"}</div>
            <div class="text gmtstart">
                <span>实习开始时间</span>
                <input id='gmtStart' onclick='WdatePicker()' readonly />
            </div>
            <div class="text gmtend">
                <span>实习结束时间</span>
                <input id='gmtEnd' onclick='WdatePicker()' readonly />
            </div>
            <button class='date-submit' id='b1'>修改实习时间</button>
            <div class="text"><span>修改密码</span><br><input type="password" name="oldpsw" placeholder="旧密码" id="oldpsw"><br><input type="password" name="newpsw" placeholder="新密码" id="newpsw"><button class="psw-btn">修改</button></div>
            
            <div class="text"></div>
            <div class="controls"><button>实习报告表</button><button>实习鉴定表</button></div>`
            $('.student-info').html(stdTemplate)
            // console.log(std)
            position.value = std.corpPosition

            //---------------请求老师信息---------------------
            ajaxByGet('/student/teacherInfo', function (data) {

                let teacher = data.data
                // console.log(data)

                //判断是否绑定老师
                if (std.teacherNo) {
                    let teacherTemplate = `<div class="title">导师信息</div>
                <div class="text"><span>姓名</span>${teacher.name}</div>
                <div class="text"><span>性别</span>${teacher.sex}</div>
                <div class="text"><span>年龄</span>${teacher.age}</div>
                <div class="text"><span>工号</span>${teacher.teacherNo}</div>
                <div class="text"><span>学校</span>${teacher.college}</div>
                <div class="text"></div>`
                    $(".teacher-info").html(teacherTemplate)
                } else {
                    ajaxByGet('/student/teacher', function (data) {
                        let teacherList = data.data
                        let listtemplate = ``
                        for (let i = 0; i < teacherList.length; i++) {
                            listtemplate += `<option value="${teacherList[i].teacherNo}">${teacherList[i].name}</option>`
                        }
                        // console.log(listtemplate)
                        let selectTemplate = `<div class="title">导师信息</div>
                    <div class="selectTeacher">
                    <div class="tips">请绑定导师:</div>
                    <div class="select-controls">
                            <select name="selectTeacher" id="selectTeacher">
                                    <!-- <option value="-1">请选择</option> -->
                                    ${listtemplate}
                                </select>
                                <button class="select-btn">绑定</button>
                    </div>
                    
                    </div>`
                        $(".teacher-info").html(selectTemplate)
                    })
                }
            })

        },
        error: function (err) {
            layer.msg(err)
        }
    })




    $('body').delegate(".select-btn", "click", () => {
        // console.log(selectTeacher.value)
        let options = {}
        options.tNo = selectTeacher.value
        ajaxByPost('/student/teacher', options, function (data) {
            alert("绑定成功!")
            // window.location.href = '/student'
            window.location.reload(true)

        })
    })

    $('.logout').on("click", () => {
        layer.msg("注销");
        setTimeout(()=>{
            window.location.href = "/logout";
        },1000)

    })

    $('.position-binding').on("click", function () {
        // console.log(111)
        // console.log(position.value)
        ajaxByPost('/student/student/position', {
            position: position.value
        }, function (data) {
            layer.msg("绑定成功");
            setTimeout(()=>{
                sessionStorage.setItem("userInfo","");
                // window.location.href="/logout"
                window.location.reload(true)
            },1000)

        })
    })
    //--------------修改密码------------------------

    $("body").delegate(".psw-btn", "click", function () {
        // console.log(111)
        let options = {
            newPassword: newpsw.value,
            oldPassword: oldpsw.value
        }
        ajaxByPost('/student/student/password', options, function (data) {
            // alert("修改成功")
            // console.log(std)
            if (data.status === -1) {
                layer.msg(data.message)
            } else {
                layer.msg("修改成功");
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            }
            // window.location.reload()
        })

    })
    //修改学生信息
    $('body').delegate('.changedetails', 'click', function () {
        // console.log(111)
        if($('.icon-shang').hasClass('down')){
            $('.icon-shang').removeClass('down').addClass('up')
        }else{
            $('.icon-shang').removeClass('up').addClass('down')
        }
        var display = $('.changecontent').css('display')
        // console.log(display)
        if (display === "none") {
            $('.changecontent').css({
                display: "flex"
            })
        } else {
            $('.changecontent').css({
                display: "none"
            })
        }
    })

    $('body').delegate('.details-btn', 'click', function () {
        var options = {}
        // console.log(std)
        options.phone = selfphone.value
        options.wechat = selfwechat.value
        options.qq = selfqq.value
        options.age = selfage.value
        options.corpTeacherNo = selftno.value
        ajaxByPost('/student/selfInfo', options, function (data) {
            layer.msg("修改成功,重新登录生效，2秒后即将跳转登录...")
            //window.location.reload()
            //注销登录
            sessionStorage.setItem("userinfo","")
            setTimeout(()=>{
                window.location.href = "/logout"
            },2000)

        })
    })
    //--------------进入企业绑定页面-----------------
    $('.bind-btn').on("click", function () {
        // console.log(111)
        window.location.href = "/student/corp-bind"
    })

    //--------------提交实习时间---------------------
    $('body').delegate(".date-submit", "click", function () {
        var option = {}
        option.gmtEnd = gmtEnd.value
        option.gmtStart = gmtStart.value
        ajaxByPost('/student2/report/date',option, function (data) {
            layer.msg("修改成功!");
            setTimeout(()=>{
                window.location.reload();
            },2000)
        })
    })
    //清除自动填充，恶心
    // setTimeout(function removeReadonly() {
    //     let gmtEnd = $("#gmtEnd");
    //     let oldpsw = $("#oldpsw");
    //     gmtEnd.removeAttribute("readonly")
    //     oldpsw.removeAttribute("readonly");
    // },1000);
})