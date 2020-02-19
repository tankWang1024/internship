$(() => {

    let stdList = {}
    //初次渲染
    $.ajax({
        type: "GET",
        url: `${config.ip}:${config.port}/teacher/students`,
        dataType: "json",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            //加载之前要显示正在加载中
            let tmp = `<tr class="loadingtip"><td class="align-center">正在加载数据中,请稍后...</td></tr>`;
            $('tbody').html(tmp);
        },
        success(data) {
            stdList = data.data

            if (!stdList) {
                $('.stuList-wrap').append(`<div class="showtoast">暂无学生信息!</div>`)
                return
            }
            // console.log(data)
            let listDom = ``

            for (let item of stdList) {
                // console.log(item)
                let template = `<tr class="stuList-row">
                <td class="align-center">${item.stuNo}</td>
                <td class="align-center">${item.name}</td>
                <td class="align-center">${item.sex}</td>
                <td class="align-center">${item.age}</td>
                <td class="align-center">${item.college}</td>
                <td>${item.major}</td>
                <td>
                    <div class="line-row">
                        企业:${item.corpName?item.corpName:"暂无"}
                    </div>
                    <div class="line-row">
                        岗位:${item.corpPosition?item.corpPosition:"暂无"}
                    </div>
                </td>
                <td class="align-center">
                ${item.corpTeacherNo?item.corpTeacherNo:"暂无"}
                </td>
                <td>
                    <div class="line-row">
                        Q Q:${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        电话:${item.phone?item.phone:"暂无"}
                    </div>
                    <div class="line-row">
                        微信:${item.wechat?item.wechat:"暂无"}
                    </div>
                </td>
                <td class="align-center">
                        <button class="check ${item.reportFilledFlag===1||item.reportFilledFlag===0?"uncheck-btn":"check-report"}" data-id="${item.stuNo}">评价</button>
                    </td>
                    <td class="align-center">
                        <button class="check ${item.identifyFilledFlag===1||item.identifyFilledFlag===0?"uncheck-btn":"check-decision"}" data-id="${item.stuNo}">评价</button>
                    </td>
            </tr>`
                listDom += template
            }
            $('tbody').html(listDom)
        }
    })
    //------------------按钮响应---------------------------

    // 报告册填写
    $('body').delegate(".check-report", "click", (e) => {
        let that = e.currentTarget
        let stuNo = that.dataset.id
        $.ajax({
            type: "GET",
            url: `${config.ip}:${config.port}/teacher/student/report/${stuNo}`,
            dataType: "json",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            },
            success(data) {
                if (data.status === 1) {
                    saveLocalStorage("std-report-entity", data.data)
                    window.location.href = "/teacher-report"
                } else {
                    layer.msg("请求失败");
                }
            }
        })
    })
    //鉴定表跳转
    $('body').delegate(".check-decision", "click", (e) => {
        // console.log(222)
        let that = e.currentTarget
        let stuNo = that.dataset.id
        $.ajax({
            type: "GET",
            url: `${config.ip}:${config.port}/teacher/student/identify/${stuNo}`,
            dataType: "json",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            },
            success(data) {
                //    console.log(data)
                if (data.status === 1) {
                    saveLocalStorage("std-decision-entity", data.data)
                    window.location.href = "/teacher-decision"
                } else {
                    layer.msg("请求失败");
                }
            }
        })
    })

    $('.search-input').on("input", function () {
        let searching_stu = []
        let value = $('.search-input').get(0).value
        if (!value) {
            //渲染原来页面
            $('.showtoast').remove()
            if (!stdList) {
                $('.stuList-wrap').append(`<div class="showtoast">暂无学生信息!</div>`)
                return
            }
            let listDom = ``
            for (let item of stdList) {
                let template = `<tr class="stuList-row">
                <td class="align-center">${item.stuNo}</td>
                <td class="align-center">${item.name}</td>
                <td class="align-center">${item.sex}</td>
                <td class="align-center">${item.age}</td>
                <td class="align-center">${item.college}</td>
                <td>${item.major}</td>
                <td>
                    <div class="line-row">
                        企业:${item.corpName?item.corpName:"暂无"}
                    </div>
                    <div class="line-row">
                        岗位:${item.corpPosition?item.corpPosition:"暂无"}
                    </div>
                </td>
                <td class="align-center">
                ${item.corpTeacherNo?item.corpTeacherNo:"暂无"}
                </td>
                <td>
                    <div class="line-row">
                        Q Q:${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        电话:${item.phone?item.phone:"暂无"}
                    </div>
                    <div class="line-row">
                        微信:${item.wechat?item.wechat:"暂无"}
                    </div>
                </td>
                <td class="align-center">
                        <button class="check ${item.reportFilledFlag===1||item.reportFilledFlag===0?"uncheck-btn":"check-report"}" data-id="${item.stuNo}">评价</button>
                    </td>
                    <td class="align-center">
                        <button class="check ${item.identifyFilledFlag===1||item.identifyFilledFlag===0?"uncheck-btn":"check-decision"}" data-id="${item.stuNo}">评价</button>
                    </td>
            </tr>`
                listDom += template
            }
            $('tbody').html(listDom)

        } else {
            for (let i = 0; i < stdList.length; i++) {
                //添加搜索条件:
                if (stdList[i]['stuNo'].search(value) !== -1) {
                    searching_stu.push(stdList[i])
                    continue
                }
                if (stdList[i]['name'].search(value) !== -1) {
                    searching_stu.push(stdList[i])
                    continue
                }
                if (stdList[i]['major'].search(value) !== -1) {
                    searching_stu.push(stdList[i])
                    continue
                }
                if (stdList[i]['college'].search(value) !== -1) {
                    searching_stu.push(stdList[i])
                    continue
                }


            }

            //渲染页面
            if (searching_stu.length === 0) {
                $('tbody').html("")
                $('.showtoast').remove()
                $('.stuList-wrap').append(`<div class="showtoast">暂无学生信息!</div>`)
                return
            }
            $('.showtoast').remove()
            let listDom = ``
            for (let item of searching_stu) {
                let template = `<tr class="stuList-row">
                    <td class="align-center">${item.stuNo}</td>
                    <td class="align-center">${item.name}</td>
                    <td class="align-center">${item.sex}</td>
                    <td class="align-center">${item.age}</td>
                    <td class="align-center">${item.college}</td>
                    <td>${item.major}</td>
                    <td>
                        <div class="line-row">
                            企业:${item.corpName?item.corpName:"暂无"}
                        </div>
                        <div class="line-row">
                            岗位:${item.corpPosition?item.corpPosition:"暂无"}
                        </div>
                    </td>
                    <td class="align-center">
                    ${item.corpTeacherNo?item.corpTeacherNo:"暂无"}
                    </td>
                    <td>
                        <div class="line-row">
                            Q Q:${item.qq?item.qq:"暂无"}
                        </div>
                        <div class="line-row">
                            电话:${item.phone?item.phone:"暂无"}
                        </div>
                        <div class="line-row">
                            微信:${item.wechat?item.wechat:"暂无"}
                        </div>
                    </td>
                    <td class="align-center">
                        <button class="check ${item.reportFilledFlag===1||item.reportFilledFlag===0?"uncheck-btn":"check-report"}" data-id="${item.stuNo}">评价</button>
                    </td>
                    <td class="align-center">
                        <button class="check ${item.identifyFilledFlag===1||item.identifyFilledFlag===0?"uncheck-btn":"check-decision"}" data-id="${item.stuNo}">评价</button>
                    </td>
                </tr>`
                listDom += template
            }
            $('tbody').html(listDom)
        }

        // console.log(searching_stu)
    })



    //-------------全部/已填/未填 单选框---------------------
    function xuanranStuList(number) {
        //渲染原来页面
        $('.showtoast').remove()
        if (!stdList) {
            $('.stuList-wrap').append(`<div class="showtoast">暂无学生信息!</div>`)
            return
        }
        let listDom = ``
        if (number === 0) { //全选
            for (let item of stdList) {
                let template = `<tr class="stuList-row">
                <td class="align-center">${item.stuNo}</td>
                <td class="align-center">${item.name}</td>
                <td class="align-center">${item.sex}</td>
                <td class="align-center">${item.age}</td>
                <td class="align-center">${item.college}</td>
                <td>${item.major}</td>
                <td>
                    <div class="line-row">
                        企业:${item.corpName?item.corpName:"暂无"}
                    </div>
                    <div class="line-row">
                        岗位:${item.corpPosition?item.corpPosition:"暂无"}
                    </div>
                </td>
                <td class="align-center">
                ${item.corpTeacherNo?item.corpTeacherNo:"暂无"}
                </td>
                <td>
                    <div class="line-row">
                        Q Q:${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        电话:${item.phone?item.phone:"暂无"}
                    </div>
                    <div class="line-row">
                        微信:${item.wechat?item.wechat:"暂无"}
                    </div>
                </td>
                <td class="align-center">
                        <button class="check ${item.reportFilledFlag===1||item.reportFilledFlag===0?"uncheck-btn":"check-report"}" data-id="${item.stuNo}">评价</button>
                    </td>
                    <td class="align-center">
                        <button class="check ${item.identifyFilledFlag===1||item.identifyFilledFlag===0?"uncheck-btn":"check-decision"}" data-id="${item.stuNo}">评价</button>
                    </td>
            </tr>`
                listDom += template
            }
        } else if (number === 1) { //已填完
            for (let item of stdList) {
                if (item.reportFilledFlag === 3 & item.identifyFilledFlag === 3) {
                    let template = `<tr class="stuList-row">
                <td class="align-center">${item.stuNo}</td>
                <td class="align-center">${item.name}</td>
                <td class="align-center">${item.sex}</td>
                <td class="align-center">${item.age}</td>
                <td class="align-center">${item.college}</td>
                <td>${item.major}</td>
                <td>
                    <div class="line-row">
                        企业:${item.corpName?item.corpName:"暂无"}
                    </div>
                    <div class="line-row">
                        岗位:${item.corpPosition?item.corpPosition:"暂无"}
                    </div>
                </td>
                <td class="align-center">
                ${item.corpTeacherNo?item.corpTeacherNo:"暂无"}
                </td>
                <td>
                    <div class="line-row">
                        Q Q:${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        电话:${item.phone?item.phone:"暂无"}
                    </div>
                    <div class="line-row">
                        微信:${item.wechat?item.wechat:"暂无"}
                    </div>
                </td>
                <td class="align-center">
                        <button class="check ${item.reportFilledFlag===1||item.reportFilledFlag===0?"uncheck-btn":"check-report"}" data-id="${item.stuNo}">评价</button>
                    </td>
                    <td class="align-center">
                        <button class="check ${item.identifyFilledFlag===1||item.identifyFilledFlag===0?"uncheck-btn":"check-decision"}" data-id="${item.stuNo}">评价</button>
                    </td>
            </tr>`
                    listDom += template
                }
            }

        } else if (number === 2) { //未填写
            for (let item of stdList) {
                if ((item.reportFilledFlag === 0 || item.reportFilledFlag === 1) & (item.identifyFilledFlag === 0 || item.identifyFilledFlag === 1)) {
                    let template = `<tr class="stuList-row">
                <td class="align-center">${item.stuNo}</td>
                <td class="align-center">${item.name}</td>
                <td class="align-center">${item.sex}</td>
                <td class="align-center">${item.age}</td>
                <td class="align-center">${item.college}</td>
                <td>${item.major}</td>
                <td>
                    <div class="line-row">
                        企业:${item.corpName?item.corpName:"暂无"}
                    </div>
                    <div class="line-row">
                        岗位:${item.corpPosition?item.corpPosition:"暂无"}
                    </div>
                </td>
                <td class="align-center">
                ${item.corpTeacherNo?item.corpTeacherNo:"暂无"}
                </td>
                <td>
                    <div class="line-row">
                        Q Q:${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        电话:${item.phone?item.phone:"暂无"}
                    </div>
                    <div class="line-row">
                        微信:${item.wechat?item.wechat:"暂无"}
                    </div>
                </td>
                <td class="align-center">
                        <button class="check ${item.reportFilledFlag===1||item.reportFilledFlag===0?"uncheck-btn":"check-report"}" data-id="${item.stuNo}">评价</button>
                    </td>
                    <td class="align-center">
                        <button class="check ${item.identifyFilledFlag===1||item.identifyFilledFlag===0?"uncheck-btn":"check-decision"}" data-id="${item.stuNo}">评价</button>
                    </td>
            </tr>`
                    listDom += template
                }
            }
        }
        $('tbody').html(listDom)
    }

    $(".filter-radio").on("click", function () {
        let fliterIndex = $('.filter-radio').index(this)
        xuanranStuList(fliterIndex);
    })

    $('body').delegate(".uncheck-btn", "click", function () {
        layer.msg("学生还未填写,无法评价!")
        return;
    })

})