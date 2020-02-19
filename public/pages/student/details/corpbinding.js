$(()=>{
    let id = null
    const app = new Vue({
        el:"#app",
        data:{
            form:{
                corpName:"",//
                address:"",//
                approvalDate:"",//
                businessScope:"",//
                createDate:"",//
                creditCode:"",//
                endBusiness:"",//
                legalPerson:"",//
                regAuthority:"",//
                regCode:"",//
                regStatus:"",//
                registerCapita:"",//
                startBusiness:"",//
                type:""//
            },
        },
        methods:{
            submit(){
                // console.log(111)
                
                let option = this.form
                
                if(!this.form.corpName){
                    layer.msg("请输入企业名称")
                    return;
                }
                // if(!this.form.regCode){
                //     layer.msg("请输入企业注册号")
                //     return;
                // }
                if(!this.form.legalPerson){
                    layer.msg("请输入法人项")
                    return;
                }
                if(id){
                    // console.log(id)
                    option.id = id
                }
                ajaxByPost('/student/student/corp',option,function(){
                    layer.msg("提交成功!")
                    setTimeout(()=>{
                        // window.location.href = "/student"
                        window.location.reload()
                    },1000);
                })
            },
            btnreturn(){
                window.location.href="/student"
            }
        }
    })
    window.app = app
    ajaxByGet('/student/student/corp',function(data){
        if(!data.data.isCorpChecked){
            layer.msg("企业信息已成功提交，在未被老师锁定之前您仍旧可以修改！")
        }else{
            layer.msg("企业已经被老师锁定，修改无效！");
        }
        id = data.data.id
        // console.log(data)
        let info = data.data
        app.form.corpName = info.corpName
        app.form.address = info.address
        app.form.approvalDate = info.approvalDate
        app.form.businessScope = info.businessScope
        app.form.createDate = info.createDate
        app.form.creditCode = info.creditCode
        app.form.endBusiness = info.endBusiness
        app.form.legalPerson = info.legalPerson
        app.form.regAuthority = info.regAuthority
        app.form.regCode = info.regCode
        app.form.regStatus = info.regStatus
        app.form.registerCapita = info.registerCapita
        app.form.startBusiness = info.startBusiness
        app.form.type = info.type
    })
})