const formidable = require('formidable');
var http = require('http');
var dataBase = require('./modules/dataBase');
http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    try{
        if(req.url === '/favicon.ico') return res.end();
        switch(req.url){
            case '/':

            case '/login':
                let loginForm = new formidable.IncomingForm();
                loginForm.parse(req,(err,fields,files)=>{
                    let loginCon = dataBase.dbConnect();
                    loginCon.connect((err)=>{
                        if(err) throw err;
                        loginCon.query(dataBase.selectQuery('user_tb',`email = '${fields.user}' AND password = '${fields.pass}' `),(err,result)=>{
                            if(err) throw err;
                            if(result.length > 0){
                                console.log(`${fields.user} çlogin success`);
                            }
                            else{
                                console.log('login failed');
                            }
                            return res.end();
                        })
                        
                    })
                    
                });
                break;
            case '/register':
                let regForm = new formidable.IncomingForm();
                regForm.parse(req,(err,fields,files)=>{
                    let insertCon = dataBase.dbConnect();
                    insertCon.connect((err)=>{
                        if(err) throw err;
                        let insertQuery = `INSERT INTO user_tb (email,password,firstname,lastname,dob,gender) VALUES ('${fields.email}','${fields.password}','${fields.firstname}','${fields.lastname}','${fields.dob}','${fields.gender}')`;
                        insertCon.query(insertQuery,(err,result)=>{
                            if(err) throw err;
                            res.write(result.affectedRows + 'Rows inserted');
                            return res.end();
                        })
                    });
                });
                break;
            default:
                res.writeHead(404,{'Content-Type':'text/html'});
                res.write('Not found');
                return res.end();
        }
    }
    catch(err){
        console.log(err);
    };
}).listen(8080,console.log('Starting server on port 8080'))