var express = require('express')
var router = require('./router.js')
var path = require("path")
var app = express()
var bodyParser = require('body-parser')

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if(req.method=="OPTIONS") res.send(200);
    else next();
    });

app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json())
app.engine('html',require('express-art-template'))
// app.set('views','/views')
app.use('/public/',express.static('./public/'))
app.use('/node_modules/',express.static('./node_modules/'))

app.use(router)

app.listen(3000,function(){
    console.log("服务已启动,访问[IP]:[3000]...")
})