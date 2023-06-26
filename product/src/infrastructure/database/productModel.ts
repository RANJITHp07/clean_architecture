import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
  productname: string;
  company: string;
  desc:string;
  price: number;
  quantity:number
}

const productSchema: Schema<IProduct> = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
  },
  desc:{
    type:String
  },
  price: {
    type:Number,
    required: true,
  },
  quantity:{
    type:Number,
    required:true
  }
});

const ProductModel = mongoose.model<IProduct>("Product", productSchema);

export {IProduct,ProductModel};
