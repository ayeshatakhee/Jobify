import ProductModel from '../models/product.model.js';
import path from "path";
export default class ProductController{
    //return products.html file which we have in views folder
    getProducts(req,res){
        let myProducts = ProductModel.get();
        //executing file is index.js,so it returns path to InventoryManagement
        // console.log(path.resolve());
        // return res.sendFile(path.join(path.resolve(),'src','views','products.html'));
        res.render("products",{products : myProducts});
    }

    addNewProduct(req,res){
        return res.render('add-new-product',{errors : null});
    }

    addProductTolist(req,res){
        //Below code is handling and validating the request.
        //But modules should perform only one task
        //Validing code had been moved to other middleware
        // console.log(req.body);
        // const {name,price,imageUrl} = req.body;
        // const errors = [];
        // if(!name || name.trim() == '')
        // {
        //     errors.push('Name is required')
        // }
        // if(!price || parseFloat(price) < 1)
        // {
        //     errors.push('price must be positive')
        // }
        // try{
        //     new URL(imageUrl);
        // }catch(err){
        //     errors.push('URL must be valid')
        // }
        // if(errors.length > 0)
        // {
        //     return res.render('add-new-product',{errors});
        // }
        const {name,desc,price} = req.body;
        console.log(req.file.filename);
        const imageUrl = '/uploads/' + req.file.filename; 
        // const imageUrl =  path.join('images',req.file.filename);
        console.log(name,desc,price,imageUrl);
        ProductModel.addToList(name,desc,price,imageUrl);
        
        let products = ProductModel.get();
        console.log(products);
        res.render('products',{products : products});
    }

    getUpdateProductView(req,res,next){
        const id = req.params.id;
        console.log('id ' + id);
        console.log(req.params.id)
        console.log(req.body)
        const productFound = ProductModel.getById(id);
        if(productFound){
            res.render('updateProducts',{product : productFound , errors : null})
        }
        else
        {
            res.status(401).send('Product not found')
        }
    }

    postUpdateProduct(req,res){
        
        // console.log('req',req.body);
        const id = req.params.id;
        const {name,desc,price} = req.body;
        const imageUrl = '/uploads/'+req.file.filename;
        ProductModel.updateProductDetails(id,name,desc,price,imageUrl);
        let products = ProductModel.get();
        console.log('After updating');
        console.log(products);
        res.render('products',{products : products})
    }

    deleteProductView(req,res){
        const id = req.params.id;
        const productDeleted = ProductModel.deleteProduct(id);
        if(productDeleted){
            let products = ProductModel.get();
            res.status(200).render('products',{products : products , errors : null});
        }
        else
        {
            res.status(401).send('Product not found')
        }
        
    }
}