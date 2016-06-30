'use strict';

const debug = require('debug')('brewBuddy:origin-controller');
const httpErrors = require('http-errors');
const Origin = require('../model/origin');
const Method = require('../model/brew-method');


exports.createOrigin = function(originData) {
  debug('creating origin');
  return new Promise((resolve, reject) => {
    new Origin(originData).save()
    .then(origin => resolve(origin))
    .catch(() => reject(httpErrors(400, 'origin not created')));
  });
};

exports.fetchOrigin = function(originId) {
  debug('fetching origin', originId);
  return new Promise((resolve, reject) => {
    Origin.findOne({_id: originId})
    .then(origin => {
      resolve(origin);
    })
    .catch(() => reject(httpErrors(404, 'origin not found')));
  });
};

exports.updateOrigin = function(originId, reqBody) {
  debug('updating origin', originId);
  return new Promise((resolve, reject) => {
    if (Object.keys(reqBody).length === 0) return reject(httpErrors(400, 'need to provide a body'));

    const originKeys = ['country', 'recMethod'];
    Object.keys(reqBody).forEach((key) => {
      if (originKeys.indexOf(key) === -1) return reject(httpErrors(400, 'key does not exist'));
    });

    Origin.findByIdAndUpdate(originId, reqBody)
    .then(() => Origin.findOne({_id: originId}).then(resolve))
    .catch(err => reject(httpErrors(404, err.message)));
  });
};

exports.removeOrigin = function(originId) {
  debug ('remove origin');
  return new Promise((resolve, reject) => {
    Origin.remove({_id: originId})
    .then(resolve)
    .catch(() => reject(httpErrors(404, 'origin not found')));
  });
};

exports.fetchAllOrigins = function() {
  debug('fetching all origins');
  return new Promise((resolve, reject) => {
    Origin.find({})
    .then(resolve)
    .catch(reject);
  });
};

exports.removeAllOrigins = function() {
  return Origin.remove({});
};
<<<<<<< HEAD



exports.fetchRecmethodByCountry = function(country) {
  debug('search origin controller');
  return new Promise((resolve, reject) => {
    Origin.findOne({country: country})
    .then((country) => {
      country.recMethod;
  
    })

   .then((recMethod) => Method.find({_id: recMethod}))
   .then((recMethod) => {
     resolve(recMethod);
   })
   .catch(reject);
  });
};
=======
>>>>>>> 549ee1674c7f78e2d3be050645ed8d49ebc4f50a
