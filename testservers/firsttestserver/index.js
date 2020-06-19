const fs= require('fs');
const http= require('http');
const path = require('path');
const url = require('url');
const PORT= process.env.PORT || 5000;
fs.readFile('./public/index.html',(err,html)=>{ 
if(err){
    throw err;
}

const server= http.createServer((req,res)=> {
    res.write(html);
    res.end();
});
server.listen(PORT,()=>{
    console.log('server has just started');
});
});
