const { Schema, model } = require('mongoose');

const schema = new Schema({
  date: { type: Date, default: Date.now },
  photos: [{ type: String }],
  _name: { type: String, required: true, unique: true },
  model: { type: String },
  shortDescription: { type: String },
  description: { type: String },
  vendor: { type: String },
  contryVendor: { type: String },
  typeEngine: { type: String },
  functions: [{ type: String }],
  levelsApply: [{ type: String }],
  levelWarActions: { type: String },
  _class: { type: String },
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

module.exports = model('Bpla', schema);
