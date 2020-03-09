$(() => {
    let students = {}
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
            students = data.data
            console.log(students);
            
            if (!students) {
                $('.stuList-wrap').append(`<div class="showtoast">暂无学生信息!</div>`)
                return
            }
            let template = ``
            for (let item of students) {
                let std = `<tr class="stuList-row">
                <td>
                    ${item.stuNo}
                </td>
                <td>
                    ${item.name}
                </td>
                <td>
                    ${item.college}
                </td>
                <td>
                    ${item.major}
                </td>
                <td>
                    <div class="line-row">
                        Q Q:${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        TEL:${item.phone?item.phone:"暂无"}
                    </div>
                </td>
                
            <td class=${item.reportFilledFlag===2?"checked":item.reportFilledFlag===1?"checking":"unchecked"}>
                    
            <span class="iconfont ${item.reportFilledFlag===2?"icon-dui3":item.reportFilledFlag===1?"icon-circle":"icon-cuo2"}"></span>${item.reportFilledFlag===2?"已填写完":item.reportFilledFlag===1?"一阶段已填":"未填写!"}
        </td>

            <td class=${item.reportFlag===2?"checked":item.reportFlag===0?"unchecked":"checking"}>
                    
            <span class="iconfont ${item.reportFlag===0?"icon-cuo2":item.reportFlag===1?"icon-circle":"icon-dui3"}"></span>${item.reportFlag===0?"还未评价!":item.reportFlag===1?"未评价完":"已评价"}
        </td>
            <td class="align-center">
                <button class="check ${item.reportFilledFlag===0?"uncheck-btn":"check-report"}" data-id="${item.stuNo}">评价</button>
            </td>
        </tr>`
                template += std
            }
            $('tbody').html(template)
        }
    })


    $('.search-input').on("input", function () {
        let searching_stu = []
        // console.log(students)
        let value = $('.search-input').get(0).value
        // console.log(value)
        // var str = "123";
        // var reg = RegExp(/value/);
        // console.log(reg.test(str)); // true
        // console.log(value)
        if (!value) {
            //渲染原来页面
            $('.showtoast').remove()
            if (!students) {
                $('.stuList-wrap').append(`<div class="showtoast">暂无学生信息!</div>`)
                return
            }

            let template = ``
            for (let item of students) {
                let std = `<tr class="stuList-row">
                <td>
                    ${item.stuNo}
                </td>
                <td>
                    ${item.name}
                </td>
                <td>
                    ${item.college}
                </td>
                <td>
                    ${item.major}
                </td>
                <td>
                    <div class="line-row">
                        Q Q:${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        TEL:${item.phone?item.phone:"暂无"}
                    </div>
                </td>

                <td class=${item.reportFilledFlag===2?"checked":item.reportFilledFlag===1?"checking":"unchecked"}>
                    
            <span class="iconfont ${item.reportFilledFlag===2?"icon-dui3":item.reportFilledFlag===1?"icon-circle":"icon-cuo2"}"></span>${item.reportFilledFlag===2?"已填写完":item.reportFilledFlag===1?"一阶段已填":"未填写!"}
        </td>

            <td class=${item.reportFlag===2?"checked":item.reportFlag===0?"unchecked":"checking"}>
                    
            <span class="iconfont ${item.reportFlag===0?"icon-cuo2":item.reportFlag===1?"icon-circle":"icon-dui3"}"></span>${item.reportFlag===0?"还未评价!":item.reportFlag===1?"未评价完":"已评价"}
        </td>
            <td class="align-center">
                <button class="check ${item.reportFilledFlag===0?"uncheck-btn":"check-report"}" data-id="${item.stuNo}">评价</button>
            </td>
        </tr>`
                template += std
            }
            // console.log()
            $('tbody').html(template)

        } else {
            for (let i = 0; i < students.length; i++) {
                //添加搜索条件:
                if (students[i]['stuNo'].search(value) !== -1) {
                    searching_stu.push(students[i])
                    continue
                }
                if (students[i]['name'].search(value) !== -1) {
                    searching_stu.push(students[i])
                    continue
                }
                if (students[i]['major'].search(value) !== -1) {
                    searching_stu.push(students[i])
                    continue
                }
                if (students[i]['college'].search(value) !== -1) {
                    searching_stu.push(students[i])
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
            let template = ``
            for (let item of searching_stu) {
                let std = `<tr class="stuList-row">
                <td>
                    ${item.stuNo}
                </td>
                <td>
                    ${item.name}
                </td>
                <td>
                    ${item.college}
                </td>
                <td>
                    ${item.major}
                </td>
                <td>
                    <div class="line-row">
                        Q Q:${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        TEL:${item.phone?item.phone:"暂无"}
                    </div>
                </td>
                <td class=${item.reportFilledFlag===2?"checked":item.reportFilledFlag===1?"checking":"unchecked"}>
                    
            <span class="iconfont ${item.reportFilledFlag===2?"icon-dui3":item.reportFilledFlag===1?"icon-circle":"icon-cuo2"}"></span>${item.reportFilledFlag===2?"已填写完":item.reportFilledFlag===1?"一阶段已填":"未填写!"}
        </td>

            <td class=${item.reportFlag===2?"checked":item.reportFlag===0?"unchecked":"checking"}>
                    
            <span class="iconfont ${item.reportFlag===0?"icon-cuo2":item.reportFlag===1?"icon-circle":"icon-dui3"}"></span>${item.reportFlag===0?"还未评价!":item.reportFlag===1?"未评价完":"已评价"}
        </td>
            <td class="align-center">
                <button class="check ${item.reportFilledFlag===0?"uncheck-btn":"check-report"}" data-id="${item.stuNo}">评价</button>
            </td>
        </tr>`
                template += std
            }
            $('tbody').html(template)
        }

        // console.log(searching_stu)
    })


    //-------------全部/已填/未填 单选框---------------------
    function xuanranStuList(number) {
        //渲染原来页面
        $('.showtoast').remove()
        if (!students) {
            $('.stuList-wrap').append(`<div class="showtoast">暂无学生信息!</div>`)
            return
        }
        let template = ``
        if (number === 0) { //全选
            for (let item of students) {
                let std = `<tr class="stuList-row">
                <td>
                    ${item.stuNo}
                </td>
                <td>
                    ${item.name}
                </td>
                <td>
                    ${item.college}
                </td>
                <td>
                    ${item.major}
                </td>
                <td>
                    <div class="line-row">
                        Q Q:${item.qq?item.qq:"暂无"}
                    </div>
                    <div class="line-row">
                        TEL:${item.phone?item.phone:"暂无"}
                    </div>
                </td>

                <td class=${item.reportFilledFlag===2?"checked":item.reportFilledFlag===1?"checking":"unchecked"}>
                    
            <span class="iconfont ${item.reportFilledFlag===2?"icon-dui3":item.reportFilledFlag===1?"icon-circle":"icon-cuo2"}"></span>${item.reportFilledFlag===2?"已填写完":item.reportFilledFlag===1?"一阶段已填":"未填写!"}
        </td>

            <td class=${item.reportFlag===2?"checked":item.reportFlag===0?"unchecked":"checking"}>
                    
            <span class="iconfont ${item.reportFlag===0?"icon-cuo2":item.reportFlag===1?"icon-circle":"icon-dui3"}"></span>${item.reportFlag===0?"还未评价!":item.reportFlag===1?"未评价完":"已评价"}
        </td>
            <td class="align-center">
                <button class="check ${item.reportFilledFlag===0?"uncheck-btn":"check-report"}" data-id="${item.stuNo}">评价</button>
            </td>
        </tr>`
                template += std
            }
        } else if (number === 1) { //已填完
            for (let item of students) {
                if (item.reportFilledFlag === 2) {
                    let std = `<tr class="stuList-row">
                    <td>
                        ${item.stuNo}
                    </td>
                    <td>
                        ${item.name}
                    </td>
                    <td>
                        ${item.college}
                    </td>
                    <td>
                        ${item.major}
                    </td>
                    <td>
                        <div class="line-row">
                            Q Q:${item.qq?item.qq:"暂无"}
                        </div>
                        <div class="line-row">
                            TEL:${item.phone?item.phone:"暂无"}
                        </div>
                    </td>
    
                    <td class=${item.reportFilledFlag===2?"checked":item.reportFilledFlag===1?"checking":"unchecked"}>
                    
            <span class="iconfont ${item.reportFilledFlag===2?"icon-dui3":item.reportFilledFlag===1?"icon-circle":"icon-cuo2"}"></span>${item.reportFilledFlag===2?"已填写完":item.reportFilledFlag===1?"一阶段已填":"未填写!"}
        </td>

            <td class=${item.reportFlag===2?"checked":item.reportFlag===0?"unchecked":"checking"}>
                    
            <span class="iconfont ${item.reportFlag===0?"icon-cuo2":item.reportFlag===1?"icon-circle":"icon-dui3"}"></span>${item.reportFlag===0?"还未评价!":item.reportFlag===1?"未评价完":"已评价"}
        </td>
            <td class="align-center">
                <button class="check ${item.reportFilledFlag===0?"uncheck-btn":"check-report"}" data-id="${item.stuNo}">评价</button>
            </td>
        </tr>`
                    template += std
                }

            }

        } else if (number === 2) { //未填写
            for (let item of students) {
                if (item.reportFilledFlag === 0) {
                    let std = `<tr class="stuList-row">
                        <td>
                            ${item.stuNo}
                        </td>
                        <td>
                            ${item.name}
                        </td>
                        <td>
                            ${item.college}
                        </td>
                        <td>
                            ${item.major}
                        </td>
                        <td>
                            <div class="line-row">
                                Q Q:${item.qq?item.qq:"暂无"}
                            </div>
                            <div class="line-row">
                                TEL:${item.phone?item.phone:"暂无"}
                            </div>
                        </td>
        
                        <td class=${item.reportFilledFlag===2?"checked":item.reportFilledFlag===1?"checking":"unchecked"}>
                    
            <span class="iconfont ${item.reportFilledFlag===2?"icon-dui3":item.reportFilledFlag===1?"icon-circle":"icon-cuo2"}"></span>${item.reportFilledFlag===2?"已填写完":item.reportFilledFlag===1?"一阶段已填":"未填写!"}
        </td>

            <td class=${item.reportFlag===2?"checked":item.reportFlag===0?"unchecked":"checking"}>
                    
            <span class="iconfont ${item.reportFlag===0?"icon-cuo2":item.reportFlag===1?"icon-circle":"icon-dui3"}"></span>${item.reportFlag===0?"还未评价!":item.reportFlag===1?"未评价完":"已评价"}
        </td>
            <td class="align-center">
                <button class="check ${item.reportFilledFlag===0?"uncheck-btn":"check-report"}" data-id="${item.stuNo}">评价</button>
            </td>
        </tr>`
                    template += std
                }
            }

        }
        $('tbody').html(template)
    }

    $(".filter-radio").on("click", function () {
        let fliterIndex = $('.filter-radio').index(this)
        xuanranStuList(fliterIndex);
    })

    $('body').delegate(".uncheck-btn", "click", function () {
        layer.msg("学生还未填写,无法评价!");
        return;
    })


})