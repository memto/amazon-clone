const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const { Schema } = mongoose;
const { CategorySchema } = require('./category');

const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    es_schema: CategorySchema,
  },
  name: String,
  price: Number,
  image: String,
});

ProductSchema.plugin(mongoosastic, {
  hosts: ['localhost:9200'],
  populate: [
    { path: 'category' },
  ],
});

module.exports = mongoose.model('Product', ProductSchema);
