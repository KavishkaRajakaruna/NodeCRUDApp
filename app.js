const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')


var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017',(err, client) =>{
    if(err) return console.log(err)
    db = client.db('NodeCRUD')
    app.listen(port, () => {
        console.log(` listening on port ${port}`)
    })
})



app.get('/', (req, res) => {
    res.sendFile(__dirname+'/views/index.html')
});


app.post('/quotes', (req, res)=>{
    db.collection('quotes').insertOne(req.body, (err, result)=>
    {
        if(err) return console.log(err)

        console.log('Database updated')
        res.redirect('/')
    } )
    
});

app.get('/show', (req, res) => {
     db.collection('quotes').find().toArray((err, results) => {

        res.render('index.ejs', {quotes: results})
        
     })
    
});
