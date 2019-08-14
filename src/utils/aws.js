import * as AWS from 'aws-sdk';
import env from '../config/env';

AWS.config.update({
    accessKeyId: env.AWS_KEY,
    secretAccessKey: env.AWS_SECRET,
    region: env.AWS_REGION
});
export const s3 = new AWS.S3();

export const s3UploadFile = (key, content) => new Promise((resolve, reject) => {
    s3.upload({
        Bucket: env.AWS_BUCKET,
        Key: key,
        Body: new Buffer.from(content, 'binary'),
        ACL: 'public-read'
    }, (err, data) => {
        if ( err ) {
            reject(err);
        } else {
            resolve(data);
        }
    })
});

export const s3RemoveFile = (key) => new Promise((resolve, reject) => {
    s3.deleteObject({
        Bucket: env.AWS_BUCKET,
        Key: key
    }, (error, data) => {
        if ( error ) {
            reject(error);
        } else {
            resolve(data);
        }
    });
});