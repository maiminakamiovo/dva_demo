import request from '../../utils/request';
import qs from 'qs';

// 请求后台
export async function queryUser(params) {
  return request(`http://localhost:8000/api/user?${qs.stringify(params)}`);
}
