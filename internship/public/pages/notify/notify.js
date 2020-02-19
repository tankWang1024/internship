$(function(){
    ajaxByGet('/notify',(res)=>{
        let data = res.data;
        data = data.reverse();
        for (var i=0; i< data.length; i++){
            const template_ = renderTemplate(data[i]);
            const tableBody = $('.tbbody');
            tableBody.append(template_);
        }
    });
    // 绑定

});



function renderTemplate(obj){

    const id = obj.id;
    const title = obj.title;
    const gmtModified = obj.gmtModified;
    const publisher = obj.publisher;
    const read = obj.read;
    const praise = obj.praise;
    const low = obj.low;

    let template = '<tr class="text-c">\n' +
        '        <th class="welcome_style">' + (obj.total-id + 1) + '</th>\n' +
        '        <th class="welcome_style" style="display: none;">' + id + '</th>\n' +
        '        <th class="welcome_style list-title"><a style="color: deepskyblue;" href="/notify/' + id + '">' + title + '</a></th>\n' +
        '        <th class="welcome_style">' + gmtModified.toString().substr(0,10) + '</th>\n' +
        '        <th class="welcome_style">' + publisher + '</th>\n' +
        '        <th class="welcome_style">' + read + '</th>\n' +
        '        </tr>';
    return template;
}