const { Router } = require('express');
const Bpla = require('../models/Bpla');
const config = require('config');
const auth = require('../middleware/auth.middleware');
const multer = require('multer');
const fs = require('fs');
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

router.post('/', upload.array('photos'), async (req, res) => {
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

// router.post('/generate', auth, async (req, res) => {
//   try {
//     const baseUrl = config.get('baseUrl');
//     const { from } = req.body;

//     const code = shortid.generate();

//     const existing = await Link.findOne({ from });

//     if (existing) {
//       return res.json({ link: existing });
//     }

//     const to = baseUrl + '/t/' + code;

//     const link = new Link({
//       code,
//       to,
//       from,
//       owner: req.user.userId,
//     });

//     await link.save();

//     res.status(201).json({ link });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

// router.get('/', auth, async (req, res) => {
//   try {
//     const links = await Link.find({ owner: req.user.userId });
//     res.json(links);
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

// router.get('/:id', auth, async (req, res) => {
//   try {
//     const link = await Link.findById(req.params.id);
//     res.json(link);
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

module.exports = router;
