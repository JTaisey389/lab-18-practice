'use strict';

const uuid = require('uuid').v4;
const dynamoose = require('dynamoose');
const ContactModel = require('./contacts.schema');

exports.handler = async (event) => {
  //first, save the thing into the DB
  //second, respond with the thing or an "oka that worked"
  try{
    const {name, phone} = JSON.parse(event.body); // we are destructuring the object. -> the name and phone are parsed into the event.body

    const id = uuid();
    const record = new ContactModel({ id, name, phone}) // make the record based on our dynamoose schema
    const data = await record.save(); // save the record to the DB (DynamoDB)

    return{ //
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