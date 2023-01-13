var mysql = require('mysql');
class dataBase{
    constructor(hostDB = "localhost", dbUser="root", dbPass="",dbName="community_app"){
        this.dbConfig = {
            host: hostDB,
            user: dbUser,
            password: dbPass,
            database: dbName,
        }
    }
    
    dbConnect(){
        let dbCon = mysql.createConnection(this.dbConfig);
        return dbCon;
    }

    selectQuery(tableName,whereCalus = 1){
        let selectQuery = `SELECT * FROM ${tableName} WHERE ${whereCalus}`;
        return selectQuery;
    }

    selectJoinQuery(tableName,tableName2,whereCalus = "1"){
        let selectQuery = `SELECT * FROM ${tableName} INNER JOIN ${tableName2} ON ${tableName}.user_id = ${tableName2}.user_id WHERE ${whereCalus}`;
        return selectQuery;
    }

    blockQuery(key,status){
        if(status == "block" || status == "active"){
            let selectQuery = `UPDATE user_tb SET status='${status}' WHERE user_id = ${key}`;
            return selectQuery;
        }else if(status == "delete"){
            let selectQuery = `DELETE FROM user_tb WHERE user_id = ${key}`;
            return selectQuery;
        }
    }

    deleteQuery(column,key,request){
        let selectQuery = `DELETE FROM ${request} WHERE ${column} = ${key}`;
        return selectQuery;
    }

    updateQuery(prop,val,email){
        let updateQuery = `UPDATE user_tb SET ${prop}='${val}' WHERE email = '${email}'`;
        console.log(updateQuery);
        return updateQuery;
    }

    updateLinkQuery(link,exp,email){
        let updateLinkQuery = `UPDATE user_tb SET link='${link}', exptime='${exp}' WHERE email = '${email}'`;
        // console.log(updateLinkQuery);
        return updateLinkQuery;
    }
}
module.exports = new dataBase();
