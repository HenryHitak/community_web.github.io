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
        let selectQuery = `UPDATE user_tb SET status='${status}' WHERE user_id = ${key}`;
        return selectQuery;
    }

    deleteQuery(column,key,request){
        let selectQuery = `DELETE FROM ${request} WHERE ${column} = ${key}`;
        return selectQuery;
    }

    updateQuery(pass,email){
        let updateQuery = `UPDATE user_tb SET password='${pass}' WHERE email = '${email}'`;
        return updateQuery;
    }
}
module.exports = new dataBase();
