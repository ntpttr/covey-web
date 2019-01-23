import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://localhost:3000';

const encode = encodeURIComponent;
const responseBody = res => res.body;

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Users = {
  list: () =>
    requests.get(`/users`),
  get: ident =>
    requests.get(`/users/${ident}`),
  login: auth =>
    requests.post(`/users/login`, {auth}),
  register: user =>
    requests.post(`/users`, {user}),
  update: (ident, user) =>
    requests.put(`/users/${ident}`, user),
  delete: ident =>
    requests.delete(`/users/${ident}`)
};
