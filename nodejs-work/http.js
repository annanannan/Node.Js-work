const { chapterList, userList} = require('./chaplist');
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

http.createServer((req,res) => {
    //后台登录页
    if(req.url==='/login'){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./login.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }    
           res.write(data.toString());
           res.end();
        });
    }
    if(req.url==='/login_bg.jpg'){
        res.writeHead(200,{'Content-Type':'image/jpeg'});
        fs.readFile('./login_bg.jpg','binary',function(err,data){
            if(err){
                throw err ;
            }else{
                res.write(data,'binary');
                res.end();
            }
        })  
    }
        
    //列表页
    if(req.url==='/list'){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./chapterList.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }    
            else{
                if(req.method === 'GET'){
                    res.write(data.toString());
                    res.end();
                }
            }
        });
    }
    if(req.url==='/list_update'){
        if(req.method === 'GET'){
            var err = JSON.stringify(chapterList);
            res.write(err);
            res.end();
        }
    }

    //后台添加文章页
    if(req.url==='/addChapter'){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./addChapter.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }    
           res.write(data.toString());
           res.end();
        });
    }

    //后台文章列表页
    if(req.url==='/listmanager'){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./list.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }    
           res.write(data.toString());
           res.end();
        });
    }
    if(req.url==='/js/baiduTemplate.js'){
        res.writeHead(200,{'Content-Type':'text/javascript'});
        fs.readFile('./js/baiduTemplate.js',function(err,data){
            if(err){
                throw err ;
            }    
           res.write(data.toString());
           res.end();
        });
    }

    if(req.url.split('/')[1] === 'images'){
        res.writeHead(200,{'Content-Type':'image/jpeg'});
        if(req.url.split('/')[2] !== 'img'){
            fs.readFile('./images/'+req.url.split('/')[2],'binary',function(err,data){
                if(err){
                    throw err ;
                }else{
                    res.write(data,'binary');
                    res.end();
                }
            });
        }else{
            fs.readFile('./images/img/'+req.url.split('/')[3],'binary',function(err,data){
                if(err){
                    throw err ;
                }else{
                    res.write(data,'binary');
                    res.end();
                }
            });
        }
    }
    if(req.url.split('/')[1]==='css'){
        res.writeHead(200,{'Content-Type':'text/css'});
        fs.readFile('./css/'+req.url.split('/')[2],function(err,data){
            if(err){
                throw err ;
            }    
           res.write(data.toString());
           res.end();
        });
    }

    //博客详情页
    if(req.url.split('/')[1]==='/detail'){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./addChapter.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }    
           res.write(data.toString());
           res.end();
        });
    }
   
    if(req.url==='/add'){
        var err ;
        req.on('data',function(data){
            err = data.toString('utf8');
            var obj = qs.parse(err);
            var length = chapterList.length +1;
            var date = new Date();
            var name = obj.title;
            var content = obj.content;
            var object = {
                "chapterId": length,
                "chapterName": name,
                "imgPath": "images/1442457564979540.jpeg",
                "chapterDes": name,
                "chapterContent": content,
                "publishTimer": date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
                "author": "admin",
                "views": 1022
            }
            chapterList.push(object);
        });
        res.end();
    }
    if(req.url==="/a/"){
        var err = JSON.stringify(chapterList);
        res.write(err);
        res.end();
    }

    if(req.url.indexOf("/detail?chapterId=")==0){
        var x = qs.parse(req.url,"?",null,{maxKeys:2});
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('./chapter.html','utf-8',function(err,data){
            if(err){
                throw err ;
            }    
            else{
                res.write(data.toString());
            }
           res.end();
        });
    }
    if(req.url.indexOf("/getDetail?chapterId=")==0){
        var x = qs.parse(req.url,"?",null,{maxKeys:2});
        console.log(x.chapterId);
        var y = chapterList[x.chapterId];
        console.log();
        var p = JSON.stringify(y);
        res.write(p);    
        res.end();
    }
    //用户登录验证
    if(req.url==='/login_check'){
        req.on('data',function(data){
            console.log(data.toString('utf8'))
            var x = qs.parse(data.toString('utf8'),"&",null,{maxKeys:2});
            var name = x.username;
            var pwd = x.pwd;
            for(var i = 0;i<userList.length;i++){
                if(userList[i].username===name && userList[i].pwd===pwd){
                    res.end();
                }
            }
        });
    }
   

}).listen(8083);

