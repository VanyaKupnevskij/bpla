const { Schema, model } = require('mongoose');

let schemaBpla = new Schema({
  date: { type: Date, default: Date.now },
  photos: [{ type: String }],
  _name: { type: String, required: true, unique: true },
  model: { type: String, default: '' },
  shortDescription: { type: String, default: '' },
  description: { type: String, default: '' },
  sourceUrl: { type: String, default: '' },
  vendor: { type: String, default: '' },
  contryVendor: { type: String, default: '' },
  typeEngine: { type: String, default: '' },
  functions: [{ type: String }],
  levelsApply: [{ type: String }],
  levelWarActions: { type: String, default: '' },
  _class: { type: String, default: '' },
  flightRange: { type: Number, default: 0 },
  wingspan: { type: Number, default: 0 },
  maxFlyWeight: { type: Number, default: 0 },
  payloadWeight: { type: Number, default: 0 },
  maxSpeed: { type: Number, default: 0 },
  cruiseSpeed: { type: Number, default: 0 },
  maxFlyHeight: { type: Number, default: 0 },
  heightOfUse: { type: Number, default: 0 },
  flyDuration: { type: Number, default: 0 },
});

schemaBpla.index({ _name: 'text', model: 'text', shortDescription: 'text', description: 'text' });

const Bpla = model('Bpla', schemaBpla);

Bpla.createIndexes()
  .then(() => console.log('Index created successfully'))
  .catch((error) => console.log(error));

module.exports = { Bpla, schemaBpla };
