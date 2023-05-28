const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String
    },
    brand: {
        type: String
    },
    gender: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    is_in_inventory: {
        type: Boolean
    },
    items_left: {
        type: Number
    },
    imageURL: {
        type: String
    },
    slug: {
        type: String
    },
    featured: {
        type: Number
    }
});

ProductSchema.set("timestamps", true);

module.exports = mongoose.model("products", ProductSchema);
