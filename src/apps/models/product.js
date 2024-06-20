const mongoose = require("../../common/database")();
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        text: true,
        required: true,
    },
    category_id:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    accessories:{
        type: String,
        required: true,
    },
    promotion:{
        type: String,
        required: true,
    },
    details:{
        type: String,
        required: true,
    },
    is_stock:{
        type: Boolean,
        default: true,
    },
    is_featured:{
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
const ProductModel = mongoose.model("Products", productSchema, "products");
module.exports = ProductModel;