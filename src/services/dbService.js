import httpCommon from "./httpCommon";
class dbService{
    registerUser(data){
        return httpCommon.post('/', data);
    }

    loginUser(data){
        return httpCommon.post('/', data);
    }

    getData(){
        let formdata = new FormData();
        return httpCommon.post('/userdata', formdata, {
            headers:{
                'content-type':'multipart/form-data'
            }
        });
    }

    getPosts(){
        let formdata = new FormData();
        return httpCommon.post('/postdata', formdata, {
            headers:{
                'content-type':'multipart/form-data'
            }
        });
    }

    getPosts2(){
        let formdata = new FormData();
        return httpCommon.post('/postdata2', formdata, {
            headers:{
                'content-type':'multipart/form-data'
            }
        });
    }

    getPosts3(){
        let formdata = new FormData();
        return httpCommon.post('/postdata3', formdata, {
            headers:{
                'content-type':'multipart/form-data'
            }
        });
    }
    
}
export default new dbService();