const { Schema, model } = require('mongoose');

const CatalogSchema = new Schema({
    title: String,
    description: String
});

module.exports = model('catalog', CatalogSchema);
