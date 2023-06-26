import User from "../../domain/user";

interface UserRepository{
    findById(id:string),
    save(user:User),
    findByEmail(email:string)
}

export default UserRepository