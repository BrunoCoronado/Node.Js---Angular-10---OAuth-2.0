const express = require('express');
const router = new express.Router();

const auth = require('../controllers/productos');

router.route('/productos').get(auth.productos)

module.exports = router