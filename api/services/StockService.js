module.exports = { 
    async getmaterial_code_products(material_code){

        return new Promise(async (resolve, reject) => {
            try{

                console.log('inside service');
                let material_code_products = await Lh_Products.findOne({
                    material_code: material_code
                });
                resolve(material_code_products);
            }
            catch(err){
                let material_code_products = []
                resolve(material_code_products);
            }
        })

    }

}
