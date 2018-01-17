'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/product')
const app = express();
const api = require('./routes')

app.use('/api',api)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


module.exports = app