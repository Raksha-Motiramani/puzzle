//0UCBBODci7RtqgTc
//puzzle
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

mongoose.connect('mongodb+srv://puzzle:0UCBBODci7RtqgTc@cluster0.es7p39x.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/auth' , authRoutes);
  
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
