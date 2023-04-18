const { Router } = require('express');
const Bpla = require('../models/Bpla');
const router = Router();

// router.get('/', async (req, res) => {
//   try {
//     const link = await Link.findOne({ code: req.params.code });

//     if (link) {
//       link.clicks++;
//       await link.save();
//       return res.redirect(link.from);
//     }

//     return res.status(404).json('Посилання не знайдено');
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

router.get('/:id', async (req, res) => {
  try {
    //const link = await Link.findOne({ code: req.params.id });
    // if (link) {
    //   link.clicks++;
    //   await link.save();
    //   return res.redirect(link.from);
    // }
    //return res.status(404).json('Посилання не знайдено');
    const bpla = await Bpla.findById(req.params.id);

    if (!bpla) {
      return res.status(404).json({ message: 'Такий БПЛА не існує' });
    }

    res.json(bpla);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
