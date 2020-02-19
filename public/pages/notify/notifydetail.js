$(function(){
    window.id = 10;
    const url = window.location;
    const id = url.toString().split('/notify/')[1];
    let total = 0;
    ajaxByGet('/notify/' + id,(res)=>{
        console.log(res);
        if (res.status == 1){
            console.log(res.data.title);
            const titleDom = $('.page-title-2')[0];
            const dateDom = $('.page-title-3')[0];
            const readDom = $('.page-title-3')[1];
            const contentDom = $('.main-content')[0];
            const pubDom = $('.publisher')[0];
            titleDom.innerText = res.data.title;
            contentDom.innerHTML = res.data.content;
            pubDom.innerHTML = res.data.publisher + " | " + res.data.gmtModified.toString().substr(0,10);
            dateDom.innerText = '发布时间:' + res.data.gmtModified.toString().substr(0,16);
            readDom.innerText = '阅读量: ' + res.data.read;
            total = res.data.total;
        } else{
            layer.msg(res.message);
        }
    })

    $('.prev').on('click', (elem)=>{
        console.log(elem);
        if (id > 1){
            window.location.href='/notify/' + (id - 1);
        } else {
            layer.msg('已经是第一个了');
        }
    });
    $('.next').on('click', (elem)=>{
        // 在上述ajax中请求后台需要时间，因为是异步，所以在此等待一下
        setTimeout(()=>{
            console.log(elem);
            if (id >= total){
                layer.msg('最后一个了');
            } else{
                window.location.href='/notify/' + (Number(id) + 1);
            }
        },200);
    })
});
