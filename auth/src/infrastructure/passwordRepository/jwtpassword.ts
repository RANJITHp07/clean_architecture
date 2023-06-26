import JWT from "../../use_case/interface/jwt";
import jwt from "jsonwebtoken"

class jwtPassword implements JWT{
    createJWT(userId:string,userAdmin:Boolean): string {
        const jwtKey=process.env.JWT_KEY
        if (jwtKey) {
            const token:string = jwt.sign(
              { id: userId, admin:userAdmin},
              jwtKey
            );
            return token
          }
          throw new Error("JWT_KEY is not defined");
    }
}


export default jwtPassword