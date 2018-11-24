import request from '../utils/request';

export function TranscriptService(functionName) {


  let getStudentScoreList=function (value){

    let bodyData = JSON.stringify(value);
    
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: bodyData
        };
        //return request('/xxxxxx/checkTranscript', options);

     return request('/paper/calculation/getExamStudentList', options);
  }

  if(functionName=="studentScoreList"){
    return getStudentScoreList;
  }




}