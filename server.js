
// router.get('/email', async (ctx) => {
//     var email = ctx.query.email;//刚刚从前台传过来的邮箱
//     var user_name = ctx.query.user_name;//刚刚从前台传过来用户名
//     var code = await tools.createSixNum();//这里是我写的生成的随机六位数，等等下面给代码
//     var date = new Date();//获取当前时间
//     var isLive = "no";
//     //去数据库中找有没有同名的用户名，这里就要自己写了，不同的数据库查询方法不同
//     var result = await DB.find('user', { user_name: user_name });
//     //console.log(result);
//     if (result.length > 0) {
//         ctx.body = { success: false, message: "账号已经存在" }
//     } else {
//         ctx.body = { success: true, message: "账号可行" };//数据传回前台
//         var mail = {
//             // 发件人
//             from: '<你自己的163邮箱@163.com>',
//             // 主题
//             subject: '接受凭证',//邮箱主题
//             // 收件人
//             to: email,//前台传过来的邮箱
//             // 邮件内容，HTML格式
//             text: '用' + code + '作为你的验证码'//发送验证码
//         };
//         var json = { user_name, email, code, date, isLive };
//         await DB.insert('user', json);//将获取到的验证码存进数据库，待会提交时要检查是不是一致
//         await nodemail(mail);//发送邮件
//     }
// });

// router.post('/doRegister', async (ctx) => {
//     //console.log(ctx.request.body);
//     var username = ctx.request.body.username;//获取用户名
//     var password = ctx.request.body.password;//获取密码
//     var code = ctx.request.body.code;//获取你输入的验证码
//     //去数据库把刚刚在存验证码的时候一起存的那条记录找出来
//     var result = await DB.find('user', { "user_name": username });
//     var nowDate = (new Date()).getTime();//获取当前时间
//     // 判断验证码是否正确，时间是否超过10分钟
//     if (result[0].code === code && (result[0].date.getTime()) - nowDate < 600000) {
//         //更新数据库的用户信息，把用户密码深的也存进去
//         await DB.update('user', { user_name: username }, {
//             "password": password,
//             "status": 1,
//             "isLive": "yes",//注册成功啦
//             "add_time": tools.getTime()
//         });
//     } else {
//         ctx.render('admin/error', {
//             //验证码过期或者是验证码错误，要写点什么的话自己再去写写吧。
//         })
//     }
// });

var express = require('express');
var tools = require('./tools');
var nodemail = require('./nodemail');
// var Hello = require('./hello');
var app = express();
app.get('/', function (req, res) {
    var code = tools.createSixNum();
    var mail = {
        // 发件人
        from: '<65741409@qq.com>',
        // 主题
        subject: '接受凭证',//邮箱主题
        // 收件人
        to: '739235242@qq.com',//前台传过来的邮箱
        // 邮件内容，HTML格式
        text: '用' + code + '作为你的验证码'//发送验证码
    };
    nodemail(mail);//发送邮件
    // Hello.world();
    // Hello();
    // hello = new Hello();
    // hello.setName('BYVoid');
    // hello.sayHello();
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

//express_demo.js 文件
// var express = require('express');
// var app = express();
// app.get('/', function (req, res) {
//     res.send('Hello World!');
// })
// var server = app.listen(8081, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("应用实例，访问地址为 http://%s:%s", host, port)
// })

// var http = require('http');
// http.createServer(function (request, response) {
//     // 发送 HTTP 头部 
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(18888);
// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:18888/');