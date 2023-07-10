const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
     //mongoose.connect("mongodb://localhost:27017/fitmind", connectionParams);
       mongoose.connect(process.env.DBURL, connectionParams);

    console.log('Connected to database successfully');
  } catch (error) {
    console.log(error);
    console.log('Could not connect to database!');
  }
};
