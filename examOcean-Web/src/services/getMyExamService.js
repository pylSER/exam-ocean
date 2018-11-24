import request from '../utils/request';

export function getMyExam() {
  const options={
    method: 'GET',
  };
//   return request('http://localhost:12331/getExamRecord',options);
  return request('http://localhost:12331/getData',options);
}
