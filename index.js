const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
app.use(express.json());
const  concatetodb  = require("./config/connact");

app.use(cors()); 
concatetodb() 




app.use('/api/employees',require('./routes/employeesroutus'))




const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
