import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
export default class UserController{
    getRegister(req,res){
        res.render('register',{errors : null});
    }

    postRegister(req,res){
        const {name,email,password} = req.body;
        const index = UserModel.add(name,email,password);
        if(index == -1){
            res.render('login',{errors : null});
        }else{
            res.render('register',{errors : ['User already exists']})
        }  
    }

    getLogin(req,res){
        res.render('login',{errors : null});
    }

    postLogin(req,res){
        const {email,password} = req.body;
        var index = UserModel.isValidUser(email,password);
        if(index == -1){
            res.render('login',{errors : ['Invalid credentials']})
        }
        else
        {
            var products = ProductModel.get();
            res.render('products',{products : products , errors : null});
        }
    }

}