const formidable = require('formidable');
const bcrypt = require('bcrypt');
var http = require('http');
var dataBase = require('./modules/dataBase');
http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    try{
        if(req.url === '/favicon.ico') return res.end();
        switch(req.url){
            case '/':
                let formData = new formidable.IncomingForm();
                let tDate = new Date().toLocaleString("en-CA",{timeZone: "America/Vancouver"}).slice(0,10);
                formData.parse(req,(err,fields,files)=>{
                    // for login
                    if(fields.formChk == "loginForm"){
                        let loginCon = dataBase.dbConnect();
                        loginCon.connect((err)=>{
                            if(err) throw err;
                            loginCon.query(dataBase.selectQuery('user_tb',`email = '${fields.user}'`),(err,result)=>{
                                if(err) throw err;
                                if(result.length > 0){
                                    bcrypt.compare(fields.pass,result[0].password, (err,chkPass)=>{
                                        if(chkPass){
                                            console.log(`${fields.user} login success`);
                                            res.write(JSON.stringify(result));
                                            return res.end();
                                        }
                                        else{
                                            console.log('login failed');
                                            return res.end();
                                        }
                                    });
                                }
                                else{
                                    console.log('login failed');
                                    return res.end();
                                }
                            })
                        })
                    }
                    // for register
                    else if(fields.formChk == "regForm"){
                        let insertCon = dataBase.dbConnect();
                        insertCon.connect((err)=>{
                            if(err) throw err;
                            insertCon.query(dataBase.selectQuery('user_tb',`email = '${fields.email}'`),(err,result)=>{
                                if(err) throw err;
                                if(result.length <= 0){
                                    bcrypt.hash(fields.password, 10,function(err, hash){
                                        if(err) throw err;
                                        let insertQuery = `INSERT INTO user_tb (email,password,firstname,lastname,dob,gender,role,join_date) VALUES ('${fields.email}','${hash}','${fields.firstname}','${fields.lastname}','${fields.dob}','${fields.gender}','${fields.regType}','${tDate}')`;
                                        insertCon.query(insertQuery,(err,result)=>{
                                            if(err) throw err;
                                            res.write('true');
                                            return res.end();
                                        })
                                    })
                                }
                                else{
                                    res.write('false');
                                    return res.end();
                                }
                            })
                        })
                    }
                })  
                break;

            case '/myprofile':
                
                break;

            case '/userdata':
                    let dbcon = dataBase.dbConnect();
                    dbcon.connect((err)=>{
                        if(err) throw err;
                        dbcon.query(dataBase.selectQuery('user_tb'),(err,result)=>{
                            if(err) throw err;
                            if(result.length > 0){
                                res.write(JSON.stringify(result));
                            }
                            else{
                                console.log('data load failed');
                            }
                            return res.end();
                        }) 
                    })
                break;

            case '/postdata':
                    let dbcon2 = dataBase.dbConnect();
                    dbcon2.connect((err)=>{
                        if(err) throw err;
                        dbcon2.query(dataBase.selectJoinQuery('community_tb','user_tb'),(err,result)=>{
                            if(err) throw err;
                            if(result.length > 0){
                                res.write(JSON.stringify(result));
                            }
                            else{
                                console.log('data load failed');
                            }
                            return res.end();
                        }) 
                    })
                break;

            case '/postdata2':
                    let dbcon3 = dataBase.dbConnect();
                    dbcon3.connect((err)=>{
                        if(err) throw err;
                        dbcon3.query(dataBase.selectJoinQuery('market_td','user_tb'),(err,result)=>{
                            if(err) throw err;
                            if(result.length > 0){
                                res.write(JSON.stringify(result));
                            }
                            else{
                                console.log('data load failed');
                            }
                            return res.end();
                        }) 
                    })
                break;

            case '/postdata3':
                    let dbcon4 = dataBase.dbConnect();
                    dbcon4.connect((err)=>{
                        if(err) throw err;
                        dbcon4.query(dataBase.selectJoinQuery('job_tb','user_tb'),(err,result)=>{
                            if(err) throw err;
                            if(result.length > 0){
                                res.write(JSON.stringify(result));
                            }
                            else{
                                console.log('data load failed');
                            }
                            return res.end();
                        }) 
                    })
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
