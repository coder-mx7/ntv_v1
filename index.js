const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
app.use(express.json());
const  concatetodb  = require("./config/connact");

app.use(cors()); 
concatetodb() 




app.use('/api/employees',require('./routes/employeesroutus'))
app.use('/api/allemployees',require('./routes/allemployeesrouts'))




const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
