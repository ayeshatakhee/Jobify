import express from 'express';
import path from 'path';
import ProductController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js'
import ejsLayouts from 'express-ejs-layouts'
import validationMiddleware from './src/middlewares/validation.middleware.js';
import uploadFile from './src/middlewares/file-upload.middleware.js';
const server = express();
server.use(express.urlencoded({extended : true}));
//setup view engine settings
server.set("view engine","ejs");

//tell the locations of views to your server using set method with following attributes
server.set("views",path.join(path.resolve(),'src','views'));

server.use(ejsLayouts);

server.use(express.static(path.join(path.resolve(), 'public')));
// console.log('path : '+path.join(path.resolve(),'src', 'public'))

//create an instance of productController
const productController = new ProductController();
const userController = new UserController();
server.get('/',productController.getProducts);
// server.use(express.static('src/views'))

server.get('/update-product/:id',productController.getUpdateProductView);
server.get('/new',productController.addNewProduct);
server.get('/register',userController.getRegister);
server.get('/login',userController.getLogin);

server.post('/',uploadFile.single('imageUrl'),validationMiddleware,productController.addProductTolist);
server.post('/update-product/:id',uploadFile.single('imageUrl'),productController.postUpdateProduct);
server.post('/delete-product/:id',productController.deleteProductView);
server.post('/register',userController.postRegister);
server.post('/login',userController.postLogin);

const port = 3400;
server.listen(port,() => {
    console.log(`Server is listening on port ${port}`);
});