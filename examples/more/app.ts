import { AxiosError } from './../../src/types/index';
import axios from '../../src/index';

document.cookie = 'a=b';

axios.get('/more/get').then(res => {
  console.log(res);
});

axios
  .post(
    'http://127.0.0.1:8088/more/server2',
    {},
    {
      withCredentials: true
    }
  )
  .then(res => {
    console.log(res);
  });

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
});

instance.get('/more/get').then(res => {
  console.log(res);
});

axios
  .post(
    '/more/post',
    {
      a: 1
    },
    {
      auth: {
        username: 'Yee',
        password: '123456'
      }
    }
  )
  .then(res => {
    console.log(res);
  });

axios
  .get('/more/304')
  .then(res => {
    console.log(res);
  })
  .catch((e: AxiosError) => {
    console.log(e.message);
  });

axios
  .get('/more/304', {
    validateStatus(status) {
      return status >= 200 && status < 400;
    }
  })
  .then(res => {
    console.log(res);
  })
  .catch((e: AxiosError) => {
    console.log(e.message);
  });