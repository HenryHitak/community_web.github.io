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
}
module.exports = new dataBase();