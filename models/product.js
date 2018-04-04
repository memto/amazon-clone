const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  name: String,
  price: Number,
  image: String,
});

ProductSchema.plugin(mongoosastic, {
  hosts: ['localhost:9200'],
  customProperties: {
    category: {
      type: 'text',
    },
    name: {
      type: 'text',
    },
    price: {
      type: 'long',
    },
    image: {
      type: 'text',
    },
  },
});

module.exports = mongoose.model('Product', ProductSchema);
