import Address from "../models/Address.js";


class addressController{
    //show
    async index(req, res){
        try {
            const addresses = await Address.find({})
            .populate({
                path: "userId"
            })
            res.json({success: true, addresses})
        } catch (error) {
            console.log(error.message)
            res.json({success: false, message: error.message})
        }
    }

    // add
    async store(req, res){
        try {
            const addressData = new Address({...req.body});
            await addressData.save()
            res.json({success: true, message: "address is added"})
        } catch (error) {
            console.log(error.message)
            res.json({success: false, message: error.message})
        }
    }

    // get address by id
    async show(req, res){
        try {
            const id = req.params.id;
            const address = await Address.findById(id);
            res.json({success: true, address})
        } catch (error) {
            console.log(error.message)
            res.json({success: false, message: error.message})
        }
    }

}

export default addressController;