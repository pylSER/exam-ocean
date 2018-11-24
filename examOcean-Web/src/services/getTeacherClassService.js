import request from '../utils/request';

export function getTeacherClass() {
  const options={
    method: 'GET',
  };
  return request('http://localhost:12331/getData',options);
}
