import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export default function isLogin() {
  const getCookie = cookies.get('accessToken');
  if (!!getCookie === true) {
    // token이 빈 값이 아니라면
    axios.defaults.headers.common.Authorization = `Bearer ${getCookie}`;
    return true;
  }
  return true;
}
