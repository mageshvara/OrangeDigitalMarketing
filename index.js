


const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _=require("lodash");
const mongoose=require("mongoose");
const request=require("request");
const alert=require("alert-node");
const router = express.Router();

const app=express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));




mongoose.connect("mongodb+srv://orange:test123@orange-r2ecw.mongodb.net/odp",{useNewUrlParser: true, useUnifiedTopology: true });

const schema={
  cat:[String],
  link:String,
  rating:Number,
  nitch:String,
  da:Number,
  fa:Number,
  pa:Number,
  priceodp:Number,
  priceclient:Number};
  Data=mongoose.model("Data",schema);
  const userschema={
    name:String,
    mail:String,
    pass:String
  };
  const odpuserschema={
    name:String,
    id:String,
    mail:String,
    pass:String
  };

  User=mongoose.model("User",userschema);
  Odpuser=mongoose.model("odpuser",odpuserschema);





app.get("/",function(request,response)
{
  response.render("first");
});
app.get("/user",function(request,response){
  response.render("index");
});
app.get("/display",function(request,response)
{
  response.render("display");
});

app.post("/datae",function(req,res){
  var mongoose = require('mongoose');

//  var Cat=req.body.catg;
  const catg=req.body.catg;
  const link= req.body.link;
  const rating=req.body.rating;
  const nitch= req.body.nitch;
  const da= req.body.da;
  const fa= req.body.fa;
  const pa= req.body.pa;
  const priceodp= req.body.priceodp;
  const priceclient= req.body.priceclient;


const catgr=catg.split(",");


  const item=new Data({
    cat:catgr,
    link:link,
    rating:rating,
    nitch:nitch,
    da:da,
    fa:fa,
    pa:pa,
    priceodp:priceodp,
    priceclient:priceclient
  });
  item.save();
  res.render("\decission");
});





app.get("/decission",function(req,res){
  res.render("decission");
});
app.get("/odpindex",function(req,res){
  res.render("odpindex");
});

app.get("/delete",function(request,response)
{
  response.render("delete");
});

app.get("/updated",function(request,response)
{
  response.render("update");
});

app.post("/odpindex",function(req,res){
  res.render("odpindex");
});


app.get("/signin",function(request,response)
{
  response.render("signin");
});
app.get("/signup",function(request,response)
{
  response.render("signup");
});
app.get("/odpdisplay",function(request,response)
{
  response.render("odpdisplay");
});
app.get("/odpsignin",function(request,response)
{
  response.render("odpsignin");
});
app.get("/odpsignup",function(request,response)
{
  response.render("odpsignup");
});

app.post("/signup",function(req,res){
    var mongoose = require('mongoose');
  const name=req.body.name;
  const email=req.body.mail;
  const pass=req.body.pass;

const users=new User({
  name:name,
  mail:email,
  pass:pass
});
User.findOne({mail:email},function(err,result){
  if(err){
    console.log("not found");

  }
  else{
if(result){
  if(result.email===email){
    alert("Acount already exist");
  }
}
else{
  users.save();
  res.render("/display");
}

  }
});});
app.post("/signin",function(req,res){
  const name=req.body.mail;
  const pass=req.body.pass;

  User.findOne({mail:name},function(err,result){
    if(err){
     alert("ENter the correct email and password");
    }
    else{
      if(result){
        if(result.pass===pass){
          res.render("/display");
        }
      }
    }
  });
});




app.post("/odpsignup",function(req,res){
    var mongoose = require('mongoose');
  const name=req.body.opdname;
  const oid=req.body.odpid;
  const email=req.body.odpmail;
  const pass=req.body.odppass;

const odpusers=new Odpuser({
  name:name,
  id:oid,
  mail:email,
  pass:pass

});
Odpuser.findOne({mail:email},function(err,result){
  if(err){
    console.log("not found");

  }
  else{
if(result){
  if(result.email===email){
    alert("Acount already exist");
  }
}
else{
  odpusers.save();
  res.render("/decission",{mail:email});
}

  }



});});
app.post("/odpsignin",function(req,res){
  const name=req.body.odpmail;
  const pass=req.body.odppass;


  Odpuser.findOne({mail:name},function(err,result){
    if(err){
     alert("ENter the correct email and password");
    }
    else{
      if(result){
        if(result.pass===pass){
          res.render("\decission",{mail:name});
        }
        else{
          alert("Enter the correct email and password");
        }
      }
    }
  });
});

//delete section

app.post("/delete",function(req,res){
  const dnitch=req.body.dnitch;
  const dlink=req.body.dlink;
  const dcat=req.body.dcat;


  Data.deleteOne({cat:dcat,link:dlink,nitch:dnitch},function(err,question){
        if(err) throw err;
        console.log('the document is deleted')
        res.render("/decission");
    });
});

app.post("/update",function(req,res){
  const dnitch=req.body.dnitch;
  const dlink=req.body.dlink;
  const dcat=req.body.dcat;

  const unitch=req.body.unitch;
  const ulink=req.body.ulink;
  const ucat=req.body.ucat;
  const uda=req.body.da;
  const ufa=req.body.fa;
  const upa=req.body.pa;
  const uprice=req.body.priceodp;



  Data.updateOne({cat:dcat,link:dlink,nitch:dnitch},{cat:ucat,link:ulink,nitch:unitch,da:uda,fa:ufa,pa:upa,price:uprice},function(err,question){
        if(err) throw err;
        console.log('the document is updated');
        res.render("/decission");
    });
});

app.post("/dis3",function(req,res){

    Data.find({},function(err,datas){
      console.log(datas);
      res.render("odplist", {

      posts: datas

    });});});

app.post("/dis",function(req,res){
  var usercat=req.body.search;

    Data.find({cat:{ $regex: new RegExp("^" + usercat.toLowerCase(), "i") }}, function(err, datas) {
        console.log(datas);
      res.render("list", {

      catageory:usercat ,

      posts: datas

    });
});});
app.post("/dis2",function(req,res){
  var usercat=req.body.search;

    Data.find({cat:{ $regex: new RegExp("^" + usercat.toLowerCase(), "i") }}, function(err, datas) {
        console.log(datas);
      res.render("odplist", {

      catageory:usercat ,

      posts: datas

    });
});});





app.get("/dataentry",function(request,response)
{
  response.render("dataentry");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


app.listen(port,function(){
  console.log("server started successfully");
})
