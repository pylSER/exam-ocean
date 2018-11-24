import request from '../utils/request';

export function fetchInitMsg() {
    return request('http://localhost:12331/getData');
}