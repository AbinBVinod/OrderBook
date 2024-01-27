const mongoose = require("mongoose");
// require("dotenv").config();

const uri =  "mongodb+srv://abinpriv:qNEzR1S12TJ3UzvM@abin-mongodb.kiittkv.mongodb.net/?retryWrites=true&w=majority"


async function run() {
    try {
     
        await mongoose.connect(uri);

      
        const orderSchema = new mongoose.Schema({
            quantity: Number,
            filledQuantity: Number,
            price: Number,
            side: Number,
            type: Number,
            owner: String,
            status: Number,
            time: Date
        });

     
        const Order = mongoose.model('Order', orderSchema, 'OrderData');

        const order = new Order({
            quantity: 3,
            filledQuantity: 0,
            price: 2,
            side: 2,
            type: 2,
            owner: "testing",
            status: 1,
            time: Date.now()
        });

        
        await order.save();
        console.log('Order saved:', order);
    } catch (error) {
      
        console.error('Error occurred:', error);
    } finally {
     
        await mongoose.connection.close();
    }
}


run().catch(console.dir);
