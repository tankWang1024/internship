$(function(){
    $('.stu-nav').click(function(){
        window.location.href = 'studentlist.html'
    })
    $('.decision-nav').click(function(){
        window.location.href = 'decision-table.html'
    })
    $('.rep-nav').click(function(){
        window.location.href = 'report-table.html'
    })
    $('.return').click(function(){
        window.history.back();
        return false
    })
    $('.logout').on("click",()=>{
        alert("注销成功")
        window.location.href = "/logout"
    })
    
})