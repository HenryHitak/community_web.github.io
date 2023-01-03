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

            case '/login':
                let loginForm = new formidable.IncomingForm();
                loginForm.parse(req,(err,fields,files)=>{
                    let loginCon = dataBase.dbConnect();
                    console.log(fields)
                    loginCon.connect((err)=>{
                        if(err) throw err;
                        loginCon.query(dataBase.selectQuery('user_tb',`email = '${fields.user}'`),(err,result)=>{
                            if(err) throw err;
                            if(result.length > 0){
                                async function passVerify(password){
                                    const chkPass = await bcrypt.compare(password,result[0].password);
                                    if(chkPass){
                                        console.log(`${fields.user} login success`);
                                    }
                                    else{
                                        console.log('login failed');
                                    }
                                };
                                passVerify(fields.pass);
                                res.write(JSON.stringify(result));
                                
                            }
                            else{
                                console.log('login failed');
                            }
                            return res.end();
                        })
                        
                    })
                    
                });
                break;

            // get all users information for admin user
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

            // filtering..searching
            case '/change':
                    let search = new formidable.IncomingForm();
                    let dbcon1 = dataBase.dbConnect();
                    search.parse(req,(err,fields,files)=>{
                        console.log(fields.id)
                        console.log(fields.table)
                        dbcon1.connect((err)=>{
                            if(err) throw err;
                            dbcon1.query(dataBase.selectJoinQuery(fields.table,'user_tb',`user_tb.user_id = ${fields.id}`),(err,result)=>{
                                if(err) throw err;
                                if(result.length > 0){
                                    res.write(JSON.stringify(result));
                                }
                                else{
                                    console.log('data load failed');
                                    res.write(`[{"no_data":"No Posts"}]`)
                                }
                                return res.end();
                            }) 
                        })
                    })
                    
                break;

            // to block user change status block
            case '/block':
                    let blockkey = new formidable.IncomingForm();
                    let Bdbcon = dataBase.dbConnect();
                    blockkey.parse(req,(err,fields,files)=>{
                        Bdbcon.connect((err)=>{
                            if(err) throw err;
                            Bdbcon.query(dataBase.blockQuery(fields.key,fields.status),(err,result)=>{
                                if(err) throw err;
                                if(result.length > 0){
                                    console.log('blocked');
                                }
                                else{
                                    console.log('blocking failed');
                                }
                                return res.end();
                            }) 
                        })
                    })
                    
                break;

            // get all post data
            case '/postdata':
                    let tablename = new formidable.IncomingForm();
                    let dbcon3 = dataBase.dbConnect();
                    tablename.parse(req,(err,fields,files)=>{
                        console.log(fields.table)
                        dbcon3.connect((err)=>{
                            if(err) throw err;
                            dbcon3.query(dataBase.selectJoinQuery(fields.table,'user_tb'),(err,result)=>{
                                if(err) throw err;
                                if(result.length > 0){
                                    res.write(JSON.stringify(result));
                                }
                                else{
                                    console.log('data load failed');
                                    res.write(`[{"no_data":"No Posts"}]`)
                                }
                                return res.end();
                            }) 
                        })
                    })

                break;

            case '/register':
                let regForm = new formidable.IncomingForm();
                regForm.parse(req,(err,fields,files)=>{
                    let insertCon = dataBase.dbConnect();
                    insertCon.connect((err)=>{
                        if(err) throw err;
                        async function passHash(password) {
                            const hash = await bcrypt.hash(password, 10);
                            let insertQuery = `INSERT INTO user_tb (email,password,firstname,lastname,dob,gender) VALUES ('${fields.email}','${hash}','${fields.firstname}','${fields.lastname}','${fields.dob}','${fields.gender}')`;
                            insertCon.query(insertQuery,(err,result)=>{
                                if(err) throw err;
                                res.write(result.affectedRows + 'Rows inserted');
                                return res.end();
                            })
                          }  
                        passHash(fields.password);
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
