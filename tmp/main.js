var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    // res.end('Hello World')
    var method = req.method
    var url = req.url

    if(method==='GET'){
        if(url==='/'){
            fs.readFile("./todo/index.html", "utf-8", function(err, data){
                if(err){
                    res.end('something bad happen'+err)
                }
                else{
                    res.end(data)
                }
            })
        }
    }

}).listen(3000, function(){
    console.log('Server is live on 3000 port')
})
console.log('hi')