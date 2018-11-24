import request from '../utils/request';

export function getStudentExamService(functionName) {


  let getCurrentExam=function (){
        const options = {
            method: 'GET',
        };
        //return request('/exam/getCurrentExam', options); 不能用/exam/
        return request('http://localhost:12331/getData', options);
  }


  let getPastExam=function (){ 
    const options = {
        method: 'GET',
    };
    // return request('/exam/getStudentExamFinished', options);
    return request('http://localhost:12331/getData', options);
}

let getFutureExam=function (){ 
    const options = {
        method: 'GET',
    };
    // return request('/exam/getStudentExamNotStarted', options);
    return request('http://localhost:12331/getData', options);
}



  if(functionName=="current"){
    return getCurrentExam;
  }else if(functionName=="past"){
    return getPastExam;
  }else if(functionName=="future"){
    return getFutureExam;
  }




}