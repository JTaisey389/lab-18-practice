'use strict';

const dynamoose = require('dynamoose');

const contactSchema = new dynamoose.Schema({
  'id': String,
  'name': String,
  'number': String,
})

module.exports = dynamoose.model('contacts', contactSchema)