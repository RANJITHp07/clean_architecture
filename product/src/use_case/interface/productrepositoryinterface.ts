import Product from "../../domain/product";

interface ProductrepositoryInterface{
    create(product:Product):unknown,
    findById(id:string):unknown,
    findByIds(ids:string[]):unknown,
    findByProductname(productname:string):unknown,
    deleteProduct(id:string):Promise<string>,
    updateProduct(id:string,update:unknown):unknown
}

export default ProductrepositoryInterface