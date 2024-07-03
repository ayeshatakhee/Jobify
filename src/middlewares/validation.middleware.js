   import { body , validationResult} from "express-validator";
   const validateRequest = async (req,res,next) => {
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
    // next();
    

    //1.set up rules
    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({gt : 0}).withMessage('Price should be positive'),
        body('imageUrl').custom((value,{req}) => {
            if(!req.file){
                throw new Error('Image is required');
            }
            return true;
        })
    ];

    //2.Run the rules
    await Promise.all(
        rules.map((rule) =>{
            return rule.run(req);
        })
    );

    //3.check if any errors exists
    const errorObjects = validationResult(req).array();
    const validationErrors = [];
    errorObjects.forEach((obj) => {
        validationErrors.push(obj.msg);
    })
    //4.render errors
    console.log(validationErrors);
    if(validationErrors.length > 0){
        console.log('errors found');
        return res.render('add-new-product',{errors : validationErrors} )
    }
    console.log('next is called')
    next();
}
export default validateRequest;