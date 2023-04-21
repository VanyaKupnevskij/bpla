const { Router } = require('express');
const { Bpla } = require('../models/Bpla');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const rangeParams = [];
    const valueParams = [];

    for (let key in req.query) {
      if (key.includes('_min')) {
        const name = key.replace('_min', '');
        const min = parseInt(req.query[`${name}_min`]);
        const max = parseInt(req.query[`${name}_max`]);

        rangeParams.push({ name, min, max });
      } else if (key.includes('_str')) {
        const name = key.replace('_str', '');
        const value = req.query[key];
        valueParams.push({ name, value });
      } else if (key.includes('_num')) {
        const name = key.replace('_num', '');
        const value = parseInt(req.query[name]);
        valueParams.push({ name, value });
      }
    }

    let queryToBD = null;

    if (req.query.text) {
      queryToBD = Bpla.find({
        $or: [
          { name: { $regex: `/${req.query.text}/i` } },
          { shortDescription: { $regex: `/${req.query.text}/i` } },
          { description: { $regex: `/${req.query.text}/i` } },
        ],
      });
    } else {
      queryToBD = Bpla.find();
    }

    if (rangeParams.length !== 0) {
      for (let param of rangeParams) {
        queryToBD.where(param.name).gte(param.min).lte(param.max);
      }
    }

    if (valueParams.length !== 0) {
      for (let param of valueParams) {
        queryToBD.where(param.name).equals(param.value);
      }
    }

    if (req.query.sort) {
      queryToBD.sort({ [req.query.sort]: parseInt(req.query.order || 1) });
    } else {
      queryToBD.sort({ _name: parseInt(req.query.order || 1) });
    }

    const page = parseInt(req.query.page); // start from 0 page
    const limit = parseInt(req.query.limit);
    queryToBD.skip(page * limit ?? 0).limit(limit ?? 8);

    const listBpla = await queryToBD.exec();

    if (!listBpla) {
      return res.status(404).json({ message: 'БПЛА не знайдені за заданими парараметрами' });
    }

    res.json(listBpla);
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
