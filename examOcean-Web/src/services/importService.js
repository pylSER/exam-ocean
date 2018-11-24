import request from '../utils/request';

export function getImportService(functionName) {


  let importStudent=function (value){
        const options = {
            method: 'post',
            body: value
        };
        return request('/file/persistence/nameList', options);
        //return request('http://localhost:12331/postData', options);
  }


  let importQuestionLib=function (value){
        const options = {
            method: 'post',
            body: value
        };
        return request('/file/persistence/question', options);
        // return request('http://localhost:12331/postData', options);
  }


  if(functionName=="importQuestionLib"){
    return importQuestionLib;
  }else if(functionName=="importStudent"){
    return importStudent;
  }




}