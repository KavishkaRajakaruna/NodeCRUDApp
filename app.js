const  express = require('express');
const app = express();
const port = 3000;
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect('mongodb://localhost:27017/NodeCRUD',(err, client) =>{
    if(err) return console.log(err)
    db = client.db('quotes')
    app.listen(port, () => {
        console.log(` listening on port ${port}`)
    })
})



app.get('/', (req, res) => {
    res.sendFile(__dirname+'/views/index.html')
});
app.post('/quotes', (req , res)=>{
    console.log("POst request recieved");
});

