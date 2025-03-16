import { User } from "../types/user.types"; // user structure
import {v4 as uuidv4} from "uuid"; // unique id
import bcrypt from "bcrypt"; // hash password

// user class
class userModel {

    // in memory db with type users
    private users: User[] = []

    // create a new user
    async addNewUser(newUser: Omit<User,"id">){
        const {fname, lname, age, nationality, mail, username, password} = newUser // defragment  the new user info 

        if(!fname || !lname || !age || !nationality || !mail|| !username || !password){
            return false
        }

        const hashPaswword = await bcrypt.hash(password, 12) // hash the user password

        const createNewUser: User ={ // creata the new user based on the type
            id: uuidv4(),
            fname,
            lname,
            age,
            nationality,
            mail,
            username,
            password: hashPaswword
        }

        // add the user to the in memory db
        this.users.push(createNewUser)

        return createNewUser
    }

    //modify user info
    async modifyUser(newUserInfo: Partial<User>){
        const {id, fname, lname, age, nationality, mail, username, password} = newUserInfo // defragment  the new user info 
        
        // check im the db for the user using the id
        const userFound = this.users.findIndex( u => u.id === id)

        // if the user id doens exist
        if(userFound === -1){
            return false
        }

        // if we have a new password

        let newPassword = ""
        if(password){
            newPassword = await bcrypt.hash(password, 12)
        }
    

        // modify the user info
        const userModified: User ={
            ...this.users[userFound],
            fname: fname ?? this.users[userFound].fname,
            lname: lname ?? this.users[userFound].lname,
            age: age ?? this.users[userFound].age,
            nationality: nationality ?? this.users[userFound].nationality,
            mail: mail ?? this.users[userFound].mail,
            username: username ?? this.users[userFound].username,
            password: newPassword ?? this.users[userFound].password
        }

        this.users[userFound] = userModified

        return true
    } 

    //find user by username
    findUserByUsername(username: string){
        // check iw we have the username in the db
        const userFound = this.users.findIndex(user => user.username === username)

        // if there is not user found
        if(userFound === -1){
            return false
        }

        return this.users[userFound]

    }

    // login user
    async checkAuthUser(username: string, password: string){

        // check if the username exist
        const userFound = this.users.findIndex(user => user.username === username)

        // if username dont exist
        if(userFound === -1){
            return false
        }

        // check if password is a match
        const passwordIsMatch = await bcrypt.compare(password,this.users[userFound].password)

        if(!passwordIsMatch){
            return false
        }

        // if username and password are correct we return the user
        return this.users[userFound]
    }

    // delete the user
    deleteUser(username: string){
        // check for the user
        const userFound = this.users.findIndex(u => u.username === username)

        // in case user not found
        if(userFound === -1){
            return true
        }

        // delete the user from the db
        this.users = this.users.splice(userFound, 1)

        return  true
    }
}

export default new userModel