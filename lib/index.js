'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const AWS = require('aws-sdk');

module.exports = {
  init({ optimize, settings, ...config }) {
    const S3 = new AWS.S3({
      apiVersion: '2006-03-01',
      ...config,
    });

    return {
      upload(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          // upload file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          S3.upload(
            {
              Key: `${path}${file.hash}${file.ext}`,
              Body: Buffer.from(file.buffer, 'binary'),
              ACL: 'public-read',
              ContentType: file.mime,
              ...customParams,
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              // add https for if isnt found
              if (data.Location.indexOf('https://') === -1) {
                data.Location = `https://${data.Location}`;
                console.log(
                  'No https found for this video',
                  data.Location,
                  'https is added'
                );
              }
              file.url = data.Location;

              resolve();
            }
          );
        });
      },
      delete: (file) => {
        return new Promise((resolve, reject) => {
          const path = file.path ? `${file.path}/` : '';
          S3.deleteObject(
            {
              Key: `${path}${file.hash}${file.ext}`,
            },
            (err) => {
              if (err) {
                return reject(err);
              }
              resolve();
            }
          );
        });
      },
    };
  },
};
