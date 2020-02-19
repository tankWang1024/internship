$(()=>{
    $('.stu-nav').click(function(){
        window.location.href = '/teacher'
    })
    $('.decision-nav').click(function(){
        window.location.href = '/teacher-decisionlist'
    })
    $('.rep-nav').click(function(){
        window.location.href = '/teacher-reportlist'
    })
    $('.return').click(function(){
        window.history.back();
        return false;
    })
    $('.logout').on("click",()=>{
        layer.msg("注销成功");
        sessionStorage.setItem("userinfo","")
        setTimeout(()=>{
            window.location.href = "/logout"
        },1000)
    })
})