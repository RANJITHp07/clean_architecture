import { Schema, Document, model} from "mongoose";

interface IProduct {
  productname: string;
  company: string;
  price: number;
  desc: string;
}

interface IOrder extends Document {
  products: IProduct;
  userId: string;
}

const ProductSchema: Schema<IProduct> = new Schema({
  productname: String,
  company: String,
  price: Number,
  desc: String
});

const OrderSchema: Schema<IOrder> = new Schema({
  products: ProductSchema,
  userId: String
});

const OrderModel = model<IOrder>("Order", OrderSchema);

export default OrderModel;
