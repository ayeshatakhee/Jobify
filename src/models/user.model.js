export default class UserModel {
    constructor(id,name,email,password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static add(name,email,password){
        var user = new UserModel(users.length+1,name,email,password);
        const index = users.findIndex((u) => 
            u.email == email
        );
        if(index == -1){
            users.push(user);
        }
        return index;
    }

    static isValidUser(email,password){
        var result = users.findIndex((u) => 
            u.email === email && u.password === password
        )
        return result;
    }
}

var users = [];
