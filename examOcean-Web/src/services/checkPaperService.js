import request from '../utils/request';

export function getPapers(value) {
  let bodyData = JSON.stringify(value);
  const options={
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body:bodyData
  };

 // return request('http://localhost:12331/isExamPwdRight',options);
  return request('http://localhost:9090/paper/check/showPaper',options);
}
