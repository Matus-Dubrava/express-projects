const restify = require('restify-clients');
const log = require('debug')('app:user-rest');
const error = require('debug')('app:error');

const client = restify.createJsonClient({
  url: process.env.AUTH_PORT || 'http://localhost:3001'
});

exports.create = function(email, username, password, bio) {
  return new Promise((resolve, reject) => {
    client.post('/create', {
      email, username, password, bio
    }, (err, req, res, obj) => {
      if (err) { log(err); reject(err); }
      resolve(obj);
    });
  });
}

exports.update = function(email, username, password, bio) {
  return new Promise((resolve, reject) => {
    client.post(`/update/${email}`, {
      email, username, password, bio
    }, (err, req, res, obj) => {
      if (err) { reject(err); }
      resolve(obj);
    });
  });
}

exports.read = function(email) {
  return new Promise((resolve, reject) => {
    client.get(`/${email}`, (err, req, res, obj) => {
      if (err) { reject(err); }
      resolve(obj);
    });
  });
}

exports.list = function() {
  return new Promise((resolve, reject) => {
    client.get('/', (err, req, res, obj) => {
      if (err) { reject(err); }
      resolve(obj);
    });
  });
}

exports.destroy = function(email) {
  return new Promise((resolve, reject) => {
    client.del(`/${email}`, (err, req, res, obj) => {
      if (err) { reject(err); }
      resolve(obj);
    });
  });
}

exports.checkPassword = function(email, password) {
  return new Promise((resolve, reject) => {
    client.post(`/check-password`, {
      email, password
    }, (err, req, res, obj) => {
      if (err) { reject(err); }
      resolve(obj);
    });
  });
}
