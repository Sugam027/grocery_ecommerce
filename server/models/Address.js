import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: {type: String, required: true},
    email: {type: String, required: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    municipality: {type: String, required: true},
    phone: {type: String, required: true},

})

const Address = mongoose.models.address || mongoose.model('address', addressSchema);

export default Address;