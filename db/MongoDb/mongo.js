const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const uri = "mongodb+srv://abinpriv:qNEzR1S12TJ3UzvM@abin-mongodb.kiittkv.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const orderSchema = new mongoose.Schema({
  quantity: Number,
  filledQuantity: Number,
  price: Number,
  side: String, 
  type: String, 
  owner: String,
  status: Number,
  time: Date
});

const Order = mongoose.model('Order', orderSchema);

app.post('/api/orders', async (req, res) => {
  try {
    const {
      quantity,
      filledQuantity,
      price,
      side,
      type,
      owner,
      status,
      time
    } = req.body;

    const order = new Order({
      quantity,
      filledQuantity,
      price,
      side,
      type,
      owner,
      status,
      time
    });

    await order.save();
    res.status(200).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
