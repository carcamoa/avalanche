const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucket = process.env.bucket

async function getObject(objectKey) {
  try {
    const params = {
      Bucket: bucket,
      Key: objectKey 
    }
    const data = await s3.getObject(params).promise();
    return data.Body.toString('utf-8');
  } catch (e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`)
  }
}

exports.getObject = getObject;