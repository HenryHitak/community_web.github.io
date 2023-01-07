import httpCommon from "./httpCommon";
class dbService{
    registerUser(data){
        return httpCommon.post('/register', data);
    }

    loginUser(data){
        return httpCommon.post('/login', data);
    }
    checkUser(data){
        return httpCommon.post('/check', data);
    }
    resetPass(data){
        return httpCommon.post('/reset', data);
    }
    loginEmail(data){
        return httpCommon.post('/email', data);
    }

    getData(){
        return httpCommon.post('/userdata');
    }

    change(test,test2){
        let formdata = new FormData();
        formdata.append("id",test);
        formdata.append("table",test2);
        return httpCommon.post('/change',formdata);
    }

    // get post informtion
    getPosts(tablename){
        let formdata = new FormData();
        formdata.append("table",tablename);
        return httpCommon.post('/postdata',formdata);
    }

    update(key,action){
        let formdata = new FormData();
        formdata.append("key",key);
        formdata.append("status",action);
        return httpCommon.post('/block',formdata);
    }
    
}
export default new dbService();