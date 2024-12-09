var express = require('express')
var mongoose = require('mongoose')
var app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))

mongoose.connect('mongodb://127.0.0.1/petShop')
var pet = require('./model/pet.js')
var purchase = require('./model/purchase.js')
var users = require('./model/user.js')

app.get('/show',function(req,res){
    pet.find(function(err,response){
        if(err)
            res.json("ERR")
        else
            res.json(response)
    })
})

app.get('/showUser',function(req,res){
    users.find(function(err,response){
        if(err)
            res.json("ERR")
        else
            res.json(response)
    })
})

app.post('/insert',function(req,res){
    var instance = new pet(req.body)
    instance.save(function(err,response){
        if(err)
            res.json('ERR')
        else
            res.json('Data inserted')
    })
})

app.post('/insertUser',function(req,res){
    var data = new users(req.body)
    data.save(function(err,response){
        if(err)
            res.json('ERR')
        else
            res.json('Data inserted')
    })
})

app.delete('/delete',function(req,res){
    var n=req.body.name
    pet.deleteOne({name:n}, function(err,response){
    if(err){
        res.json("error");
    }
    else{
        res.json("Success");
    }
    });
    });


app.put('/update/:id',function(req,res){
    pet.findByIdAndUpdate(req.params.id , req.body,function(err,response){
        if(err)
            res.json('Err')
        else
            res.json('Success')
    })
})

app.put('/updateUser/:id',function(req,res){
    users.findByIdAndUpdate(req.params.id , req.body,function(err,response){
        if(err)
            res.json('Err')
        else
            res.json('Success')
    })
})

app.get('/buy/:userId/:petId',async function(req,res){
    var petInfo = await pet.findById(req.params.petId);
    var userInfo = await users.findById(req.params.userId);

    var buy = new purchase({
        userId : userInfo.id,
        Address : userInfo.Address,
        price : petInfo.price,
        petId : petInfo.id
    })
    buy.save()
    res.json("Success");
})


app.listen(8000)