export default class ProductModel{
    constructor(_id,_name,_desc,_price,_imageUrl){
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.price = _price;
        this.imageUrl = _imageUrl;
    }
    static get(){
        return products;
    }
    static addToList(name,desc,price,imageUrl){
        let pro = new ProductModel(products.length+1,name,desc,price,imageUrl);
        products.push(pro);
        console.log(products);
    }

    static getById(id){
        return products.find( product => product.id == id);
    }

    static updateProductDetails(id,name,desc,price,imageUrl){
        // console.log(product)
        let index = products.findIndex(p => p.id ==  id);
        // console.log("index",index);
        const myProduct = new ProductModel(id,name,desc,price,imageUrl)
        products[index] = myProduct;
        // console.log(products[index]);
    }

    static deleteProduct(id){
        const index = products.findIndex(p => p.id == id);
        if(index != -1){
            products.splice(index,1);
            return true;
        }
        return false;
    }
}

var products = [
    new ProductModel(1,'Product 1','Description for Product 1',19.99,'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'),
    new ProductModel(2,'Product 2','Description for Product 2',29.99,'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'),
    new ProductModel(3,'Product 3','Description for Product 3',39.99,'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg')
]