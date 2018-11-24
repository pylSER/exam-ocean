import request from '../utils/request';

export function getRegisterService(functionName) {


  let registerTeacher=function (value){
    let bodyData = JSON.stringify(value);
    
        const options = {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: bodyData
        };
        return request('/user/teacher/signup', options);

       // return request('http://localhost:12331/postData', options);
  }


  let registerStudent=function (value){
    let bodyData = JSON.stringify(value);
    
        const options = {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: bodyData
        };
        return request('/user/student/signup', options);
  }


  if(functionName=="registerTeacher"){
    return registerTeacher;
  }else if(functionName=="registerStudent"){
    return registerStudent;
  }




}