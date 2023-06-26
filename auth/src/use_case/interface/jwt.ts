interface JWT{
    createJWT(userId:string,userAdmin:Boolean):string
}

export default JWT