import bcrypt from "bcrypt";
import Hashpassword from "../../use_case/interface/hashpassword";

class Encrypt implements Hashpassword {
    async createHash(password: string): Promise<string> {
        const saltRounds = 10;
         const salt = await bcrypt.genSalt(saltRounds);
         const hashedPassword = await bcrypt.hash(password, salt);
         return hashedPassword
    }

    async compare(password: string, hashpassword: string): Promise<boolean> {
        const match = await bcrypt.compare(password, hashpassword);
        console.log(match)
        return match
    }
}

export default Encrypt