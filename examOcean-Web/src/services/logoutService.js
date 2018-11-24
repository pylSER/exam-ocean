import request from '../utils/request';

export function logout() {
 
  const options={
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  };
  return request('/user/logout',options);
}
