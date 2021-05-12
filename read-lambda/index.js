'use strict';

const uuid = require('uuid').v4;
const dynamoose = require('dynamoose');
const ContactModel = require('./contacts.schema');

exports.handler = async (event) => {
  //first, save the thing into the DB
  //second, respond with the thing or an "oka that worked"
  try{
    // this technique -> the && here is called short circuiting
    const id = event.pathParameters && event.pathParameters.id; // this prevents an error of cannot get property of undefined

    let data;
    if(id){
      const list = await ContactModel.query(id).scan().exec(); // in dynamoose land you .scan traverses the whole db and the .exec allows this to be handed back off to us -> this is similar to mongoose.find
      data = list[0];
    } else {
      data = await ContactModel.scan().exec(); // this gets all the data
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)

    }
  } catch (error) {
    return {
     statusCode: 500,
    response: error.message 
    }
  }
}