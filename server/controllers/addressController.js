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
            res.json({success: true, message: "address is added", addressId: addressData._id})
        } catch (error) {
            console.log(error.message)
            res.json({success: false, message: error.message})
        }
    }

    // get address by id
    async show(req, res){
        const { userId } = req.params;

        try {
            const addresses = await Address.find({ userId }).populate('userId');

            if (!addresses || addresses.length === 0) {
            return res.status(404).json({ success: false, message: "No address found" });
            }

            res.status(200).json({
            success: true,
            addresses,
            });
        } catch (err) {
            console.error("Error fetching address:", err);
            res.status(500).json({
            success: false,
            message: "Server Error",
            });
        }

    }

    async update(req, res){
        try {
            const { id } = req.params;

            const updated = await Address.findByIdAndUpdate(id, req.body, { new: true });

            if (!updated) {
            return res.status(404).json({ success: false, message: "Address not found" });
            }

            res.status(200).json({ success: true, address: updated });
        } catch (err) {
            console.error("Error updating address:", err.message);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }

}

export default addressController;