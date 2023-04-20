const { Router } = require('express');
const mongoose = require('mongoose');
let { Bpla } = require('../models/Bpla');
let { schemaBpla } = require('../models/Bpla');
const config = require('config');
const auth = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.put('/appendfield', auth, async (req, res) => {
  try {
    let newField = {
      [req.body.fieldName]: { type: String, default: req.body.defaultValue },
    };
    if (typeof req.body.defaultValue == 'number') {
      newField = {
        [req.body.fieldName]: { type: Number, default: req.body.defaultValue },
      };
    }
    schemaBpla.add(newField);

    const result = await Bpla.updateMany(
      {},
      { $set: { [req.body.fieldName]: req.body.defaultValue } },
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/deletefield', auth, async (req, res) => {
  try {
    const fields = await Bpla.find({ [req.body.fieldName]: { $exists: true } });

    if (fields.length === 0) {
      return res.json('not found field in collection');
    }

    const result = await Bpla.updateMany(
      {},
      { $unset: { [req.body.fieldName]: req.body.defaultValue } },
    );

    schemaBpla.remove([req.body.fieldName]);
    Bpla = mongoose.model('Bpla', schemaBpla);

    return res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', auth, upload.array('photos'), async (req, res) => {
  try {
    const existing = await Bpla.findOne({ _name: req.body._name });
    if (existing) {
      return res.status(400).json({ message: 'Такий БПЛА вже існує' });
    }

    const photos = [];
    for (let file of req.files) {
      photos.push(config.get('baseUrl') + path.join('/uploads/' + file.filename));
    }

    const bpla = new Bpla({
      photos: photos,
      _name: req.body._name,
      model: req.body.model,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      sourceUrl: req.body.sourceUrl,
      vendor: req.body.vendor,
      contryVendor: req.body.contryVendor ?? '',
      typeEngine: req.body.typeEngine ?? '',
      functions: req.body.functions,
      levelsApply: req.body.levelsApply ?? '',
      levelWarActions: req.body.levelWarActions ?? '',
      _class: req.body._class,
      flightRange: req.body.flightRange,
      wingspan: req.body.wingspan,
      maxFlyWeight: req.body.maxFlyWeight,
      payloadWeight: req.body.payloadWeight,
      maxSpeed: req.body.maxSpeed,
      cruiseSpeed: req.body.cruiseSpeed,
      maxFlyHeight: req.body.maxFlyHeight,
      heightOfUse: req.body.heightOfUse,
      flyDuration: req.body.flyDuration,
    });

    bpla.save();

    res.status(201).json({ id: bpla._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
