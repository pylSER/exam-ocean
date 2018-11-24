import request from '../utils/request';

export function getLoginService(functionName) {


  let loginTeacher=function (value){
    let bodyData = JSON.stringify(value);
    
        const options = {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: bodyData
        };
        return request('/user/teacher/login', options);
        //return request('http://localhost:12331/postData', options);
  }


  let loginStudent=function (value){
    let bodyData = JSON.stringify(value);
    
        const options = {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: bodyData
        };
        return request('/user/student/login', options);
        //return request('http://localhost:12331/postData', options);
  }


  if(functionName=="loginTeacher"){
    return loginTeacher;
  }else if(functionName=="loginStudent"){
    return loginStudent;
  }




}