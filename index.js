const { application } = require('express');
const express = require('express');
const connectToMongo = require('./db');
const profiles = require('./routes/profiles')
const auth =  require('./routes/auth');


connectToMongo();
const app = express();
const port = process.env.PORT || 3000;


// mi\ddleware are the functions that runs in b/w when the server get req and give response
app.use(express.json());
app.use('/api/profiles',profiles);
app.use('/api/auth', auth)


app.get('/',(req,res) => {
    res.send("This is home page .... ");
});




app.listen(port,() =>{
    console.log(`The app is running at port ${port}`);
})

