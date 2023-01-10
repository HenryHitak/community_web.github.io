const formidable = require('formidable');
const bcrypt = require('bcrypt');
let url = require('url');
// var cookieSession = require('cookie-session');
var express = require('express');
var app = express();

var http = require('http');
var dataBase = require('./modules/dataBase');
const nodemailer = require("nodemailer");
const { time } = require('console');
const { type } = require('os');
var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nh.3213.b.b@gmail.com',
          pass: 'fxmzwafauiosbufe'
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
                                    from: 'nh.3213.b.b@gmail.com',
                                    to: fields.email,
                                    subject: 'Please reset password',
                                    //text + recent hash pass
                                    text: `Change your email from this link http://localhost:3000/reset?pass=${result[0].password}`
                                };
                                transporter.sendMail(mailOptions, function (error, info){
                                    if (error) {
                                        res.write('something is wrong');
                                        console.log(error);
                                    } else {
                                        console.log(info)
                                Edbcon.query(dataBase.updateLinkQuery(`http://localhost:3000/reset?pass=${result[0].password}`,Math.floor(new Date() / 1000),fields.email),(er,rel)=>{
                                            if(er) throw er;
                                            if(rel.changedRows > 0){
                                                console.log('rel');
                                                console.log(rel);
                                                res.write('Email has been sent successfully');
                                            }
                                        }
                                        ) 
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

            case '/validate' :
                let exPass = new formidable.IncomingForm();
                let Cdbcon = dataBase.dbConnect();
                exPass.parse(req,(err,fields)=>{
                    console.log(fields.exPass);//expass
                    //if pass is in password and link -> if nowdate - exptime  < 900s(15min)
                    Cdbcon.query(dataBase.selectQuery('user_tb',`password = '${fields.exPass}'`),(err,result)=>{
                        if(err) throw err;
                        if(result.length > 0){
                            console.log(result[0].exptime);//all info about this user
                            console.log(Math.floor(new Date() / 1000) - result[0].exptime)
                            if(Math.floor(new Date() / 1000) - result[0].exptime > 900){
                                res.write('link is expired');
                                // return res.end();
                            }else{
                                res.write('true');
                            } 
                        }else{
                            //go to login page
                            res.write('Link is invalid');
                        }
                        return  res.end();
                    }) 
                })
            break;

            case '/reset' :
                let resetPass = new formidable.IncomingForm();
                let Rdbcon = dataBase.dbConnect();
                resetPass.parse(req,(err,fields,files)=>{
                    if(fields.pass == fields.passCon){
                        Rdbcon.connect((err)=>{
                            if(err) throw err;
                            async function passHash(password,email) {
                            const hash = await bcrypt.hash(password, 10);               
                            Rdbcon.query(dataBase.updateQuery('password',hash,email),(err,result)=>{
                                console.log(result.changedRows);
                                if(err) throw err;
                                if(result.changedRows > 0){
                                Rdbcon.query(dataBase.updateLinkQuery(null,null,fields.email),(er,rel)=>{
                                    if(er) throw er;
                                    if(rel.changedRows > 0){
                                            res.write('update succesfully');
                                            console.log('update succesfully');
                                            return res.end();
                                        }

                                    })
                                }else{//link is not succesfully updated to null
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
