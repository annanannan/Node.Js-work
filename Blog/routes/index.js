var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/',(req,res,next)=>{
  res.render('login')
})

router.post('/list',(req,res,next)=>{
  var msg = req.body;
  
  fs.readFile('data.json','utf8',(err,data) => {
    if(err) console.log(err);
    var data = JSON.parse(data);
    var username = data.users[0].username;
    var pwd = data.users[0].password;
    if(msg.username === username && msg.pwd === pwd){
      res.render('list',{list: data.chapterList});
    }else{
      res.send('用户名密码错误!');
    }
  });
})

module.exports = router;
