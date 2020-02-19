;(function(){
    function redirectTo(ele,url){
        ele.onclick = function(){
            window.location.href = url;
        }
        // $(ele).on("click",function(){
        //     window.location.href = url;
        // })
        
    };
    
    function saveLocalStorage(str,obj){
        if(typeof obj === "object"){
            obj = JSON.stringify(obj)
        }
        localStorage.setItem(str,obj)
    }
    function getLocalStorage(str){
        objstr = localStorage.getItem(str)
        try {
            return objstr = JSON.parse(objstr)
        } catch (error) {
            return localStorage.getItem(str)
        }
            
            
    }
    function bindValue(options,ele){
        
        if(ele){
            // console.log(ele.id)
            if(!ele.value){
                options[ele.id] = ""
                return
            }
            options[ele.id] =ele.value
        }
        return ;
    }
    function bindTime(options,time,value){
        if(time.value){
            options[time.id] = value.value
        }
    }
    function ajaxByGet(req,callback){
        $.ajax({
        type:"get",
        url:config.ip+":"+config.port+req,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
        },
        success:callback,
        error:function(err){
            layer.msg("服务器繁忙,请稍后重试!")
        }
        })
    }
    function ajaxByPost(req,data,callback){
        $.ajax({
            type:"POST",
            url:config.ip+":"+config.port+req,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", sessionStorage.getItem("userinfo"));
            },
            data:data,
            success:callback,
            error:function(){
                layer.msg("服务器错误,请重试")
            }
        })
    }
    function BrowserType(){

        　　var userAgent=window.navigator.userAgent
        
        　　if(userAgent.indexOf('Edge')>-1){
        
        　　　　return 'Edge'　　
        
        　　}
        
        　　if(userAgent.indexOf('Firefox')>-1){
        
        　　　　return 'Firefox'
        
        　　}
        
        　　if(userAgent.indexOf('Chrome')>-1){
        
        　　　　return 'Chrome'
        
        　　}
        
        　　if(userAgent.indexOf('.NET')>-1){
        
        　　　　return 'IE'
        
        　　}
        
        }
        function IEVersion() {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
            var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
            var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            if(isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if(fIEVersion == 7) {
                    return 7;
                } else if(fIEVersion == 8) {
                    return 8;
                } else if(fIEVersion == 9) {
                    return 9;
                } else if(fIEVersion == 10) {
                    return 10;
                } else {
                    return 6;//IE版本<=7
                }   
            } else if(isEdge) {
                return 'edge';//edge
            } else if(isIE11) {
                return 11; //IE11  
            }else{
                return -1;//不是ie浏览器
            }
        }

    //--------------------------------
    window.IEVersion = IEVersion
    window.BrowserType = BrowserType
    window.ajaxByPost = ajaxByPost
    window.ajaxByGet = ajaxByGet
    window.bindTime = bindTime
    window.bindValue = bindValue
    window.redirectTo = redirectTo
    window.saveLocalStorage = saveLocalStorage
    window.getLocalStorage = getLocalStorage

})()