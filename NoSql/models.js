const mongoose = require('mongoose');
//schemas
const productSchema = mongoose.Schema({
    product_id: { type: Number, required: true, unique: true, index: true},
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: Number
});
const featureSchema = mongoose.Schema({
  product_id: {type: Number, required: true, index: true},
  feature: String,
  value: String
});
const styleSchema = mongoose.Schema({
    style_id: Number,
    product_id: {type: Number, index: true},
    name: String,
    sale_price: String,
    original_price: String,
    default_style: Boolean
});
const stylePhotoSchema = new mongoose.Schema({
  style_id: {type: Number, index: true},
  thumbnail_url: String,
  url: String
});
const skuSchema = new mongoose.Schema({
  skuNumber: {type: String, index: true},
  quantity: Number,
  size: String
});
const relatedProductsSchema =  mongoose.Schema({
    product_id: Number,
    related_products: [Number]
});
const cartSchema = mongoose.Schema({
  sku_id: Number,
  count: Number
});
//models
module.exports = {
  Product: mongoose.model('Product', productSchema),
  Feature: mongoose.model('Feature', featureSchema),
  Style: mongoose.model('Style', styleSchema),
  StylePhoto: mongoose.model('StylePhoto', stylePhotoSchema),
  SKU: mongoose.model('SKU', skuSchema),
  RelatedProduct: mongoose.model('RelatedProduct', relatedProductsSchema)
};

