const { Router } = require('express');
const Bpla = require('../models/Bpla');
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
      vendor: req.body.vendor,
      contryVendor: req.body.contryVendor,
      typeEngine: req.body.typeEngine,
      functions: req.body.functions,
      levelsApply: req.body.levelsApply,
      levelWarActions: req.body.levelWarActions,
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
