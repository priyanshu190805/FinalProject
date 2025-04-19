import { UserModal } from "../models/user.model.js";

const createUser = async ({firstname, lastname, email, password}) => {
    if(!firstname || !lastname || !email || !password){
        throw new console.Error("All fields are required")
    }
    const user = UserModal.create({
        fullname : {
            firstname,
            lastname,
        },
        email,
        password
    })

    return user;
}

export {createUser}