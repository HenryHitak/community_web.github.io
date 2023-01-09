const formidable = require('formidable');
const bcrypt = require('bcrypt');
let url = require('url');
var cookieSession = require('cookie-session');
var express = require('express');
var app = express();

var http = require('http');
var dataBase = require('./modules/dataBase');
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'testComm_0101@outlook.com',
          pass: 'testComm'
        }
      });
      
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

            case '/email':
                let emailConfirm = new formidable.IncomingForm();
                let Edbcon = dataBase.dbConnect();
                emailConfirm.parse(req,(err,fields,files)=>{
                    Edbcon.connect((err)=>{
                        if(err) throw err;
                        Edbcon.query(dataBase.selectQuery('user_tb',`email = '${fields.email}'`),(err,result)=>{
                            if(err) throw err;
                            if(result.length > 0){
                                console.log(result[0].password); //all info about this user
                                // var token = '123';
                                var mailOptions = {
                                    from: 'testComm_0101@outlook.com',
                                    to: fields.email,
                                    subject: 'Sending Email using Node.js',
                                    //text + recent hash pass
                                    text: `Change your email from this link http://localhost:3000/reset?pass=${result[0].password}`
                                };
                                transporter.sendMail(mailOptions, function (error, info){
                                    if (error) {
                                        res.write('something is wrong');
                                        console.log(error);
                                    } else {
                                        // res.setHeader('Set-Cookie','visited=true; Max-Age=3000; HttpOnly, Secure');
                                        //wanna set cookie with rondom number, exp = 1hour to set timelimit for this link, but res.setHeader dosen't work
                                        let length = 12;
                                        let charset = "@#$&*0123456789ABCDEFGHIJKLMNbcdefghijklmnopqrstuvwxyz";
                                        let key = "";
                                        for (let i = 0, n = charset.length; i < length; ++i) {
                                            key += charset.charAt(Math.floor(Math.random() * n));
                                        }
                                        res.write(key);
                                        // res.write('Email has been sent successfully');
                                        console.log(info);
                                    }
                                    return  res.end();
                                  });
                            }
                            else{
                                console.log('email is wrong');
                                res.write('Email is wrong');
                                return  res.end();
                            }
                        }) 
                    })
                })
            
                  break;

            // case '/check' :
            //     let confirmKey = new formidable.IncomingForm();
            //     confirmKey.parse(req,(err, fields,files)=>{
            //         console.log(fields);
            //         res.write(fields);
            //     });
            //     res.end();
            //     break;

            case '/reset' :
                //check on frontend
                let parsedurl = url.parse(req.url,true);
                //why parsedurl is null? querystring should be inside og it
                console.log(res.getHeaders());
                console.log(req.url);
                console.log(req.url.query);
                console.log(parsedurl);
                let resetPass = new formidable.IncomingForm();
                let Rdbcon = dataBase.dbConnect();
                resetPass.parse(req,(err,fields,files)=>{
                    if(fields.pass == fields.passCon){
                        Rdbcon.connect((err)=>{
                            if(err) throw err;
                            async function passHash(password,email) {
                            const hash = await bcrypt.hash(password, 10);               
                            Rdbcon.query(dataBase.updateQuery(hash,email),(err,result)=>{
                                console.log(result.changedRows);
                                if(err) throw err;
                                if(result.changedRows > 0){
                                    res.write('update succesfully');
                                    console.log('update succesfully');
                                }
                                else{
                                    res.write('failed');
                                    console.log('failed');
                                }
                                return res.end();
                            }) 
                            }
                            passHash(fields.pass,fields.email)
                        })
                    }
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
