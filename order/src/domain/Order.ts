interface Order{
    id?:string,
    products:{
        productname:string,
        desc:string,
        price:number,
        company:string
    }
    userId:string
}

export default Order