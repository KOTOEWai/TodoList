const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todos');
const morgan = require('morgan')
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));





app.use('/api/todos',todoRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
