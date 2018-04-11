const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String, unique: true, lowercase: true, required: true,
  },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = {
  Category,
  CategorySchema,
};
