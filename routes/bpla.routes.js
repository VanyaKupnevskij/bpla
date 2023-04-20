const { Router } = require('express');
const { Bpla } = require('../models/Bpla');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const {} = req.query;

    const allBpla = await Bpla.find({});

    if (!allBpla) {
      return res.status(404).json({ message: 'БПЛА не існує' });
    }

    res.json(allBpla);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
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
