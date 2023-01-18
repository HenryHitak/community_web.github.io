import httpCommon from "./httpCommon";
class dbService{
    registerUser(data){
        return httpCommon.post('/', data);
    }

    loginUser(data){
        return httpCommon.post('/', data);
    }

    checkUser(data){
        return httpCommon.post('/check', data);
    }

    resetPass(data){
        return httpCommon.post('/reset', data);
    }

    checkPass(pass){
        let passData = new FormData();
        passData.append('exPass',pass);
        return httpCommon.post('/validate',passData);
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

    update(key,action,form,email = null){
        let formdata = new FormData(form);
        formdata.append("key",key);
        formdata.append("status",action);
        formdata.append('email',email);
        return httpCommon.post('/block',formdata);
    }
    
}
export default new dbService();