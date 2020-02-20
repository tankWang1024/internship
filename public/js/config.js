//sx.cdcas.edu.cn 8890
let profile = 'release'    // 填写 dev or release
let currentIp = (profile == 'dev')?'http://localhost':'http://sx.cdcas.edu.cn';
let currentPort = (profile == 'dev')?'8080':'8890';

let config = {
    ip:currentIp,
    port:currentPort
}