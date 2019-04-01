//for API
const express = require('express') //me-return sebuah function
const app = express() //function yg mereturn sebuah object
const port = 2020

// FOR BODY
const bodyParser = require('body-parser') // agar kita bisa membaca object saat axios.post
app.use(bodyParser.json())

//for MongoDB
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const URL = 'mongodb://127.0.0.1:27017'
const database = 'nyobaMongo' //database name

MongoClient.connect(URL, {useNewURLParser: true}, (err, client) => {
    if(err){
        return console.log(err)
    }
    console.log('berhasil terkoneksi dengan mongoDB')
    const db = client.db(database)

    app.get('/initdata', (req, res) => { // route
        db.collection('users').insertMany([ // insertMany([list of data])
            { name: 'Alfred', age: 18 },
            { name: 'Jhonny', age: 28 },
            { name: 'Deep', age: 38 },
            { name: 'Bean', age: 19 },
            { name: 'Dora', age: 22 },
            { name: 'Marvel', age: 32 },
            { name: 'Benjamin', age: 32 },
        ]).then(resp => {
            res.send({
                executedStatus: resp.result.ok,
                insertedCount: resp.insertedCount,
                insertedIds: resp.insertedIds,
                docs: resp.ops
            })
            
        }).catch(err => {
            res.send({
                err: "Unable to do operation: insertMany"
            })
        })

        db.collection('products').insertMany([
            {name:'T-Shirt O Neck', desc: "Best T-Shirt in Town", price: 12000},
            {name:'T-Shirt V Neck', desc: "Best T-Shirt in City", price: 12000},
            {name:'Tyloo Shoes', desc: "Best Shoes in Town", price: 12000},
            {name:'Tyloo Original Hoodie', desc: "Best Hoodie in Town", price: 12000},
            {name:'Terserra Pants', desc: "Best Pants in City", price: 12000},
            {name:'X22 Wireless Card', desc: "Best Card in Town", price: 12000},
            {name:'RC Car', desc: "Best Car in City", price: 12000},
        ])
    })
    
    //create something here
    app.get('/users', (req, res) => { //req: inputan dari user, res: cara respon
        db.collection('users').find({}).toArray((err, users) => {
            res.send(users)
        })
    })

    app.post('/register', (req,res) => {
        const {nama, umur} = req.body
        
        db.collection('users').insertOne({name: nama, age: umur}).then(() => {
            res.send({
                message: 'Insert data success',
                dataYgMasuk: {
                    name: nama,
                    age: umur
                }
            })
        })
    })
    //onclick = (event) => {console.log(event)}

    //CRUD
    // db.collection('users').insertMany([
    //     {nama: 'Alvin', age: 23},
    //     {nama: 'Ayu', age: 25},
    //     {nama: 'faiz', age: 25},
    //     {nama: 'tomi', age: 25}
    // ])

    // db.collection('users').findOne({nama: 'AyDitau'})
    // .then(res => {
    //     if(res){
    //         console.log('Data berhasil ditemukan');
    //     }
    //     else {
    //         console.log('Data tidak berhasil ditemukan');
    //     }
    // }) 
})

//create route
// app.get('/', (req, res) => {
    //req: akan berisi parameter, data yang dikirim bareng dengan proses request
    //res: object berisi method untuk memberikan respon pada client
//     res.send('<h1>Selamat datang di custom API</h1>')
// })

// app.get('/products', (req, res) => {
//     res.send([
//         {nama: 'Alvin', age: 23},
//         {nama: 'Ayu', age: 25}
//     ])
// })

app.listen(port, () => { //function yang akan dijalankan kalau API berhasil atau running API here
    console.log('API berhasil dihidupkan di port ' + port)
})