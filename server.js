const express = require("express");
const mongodb = require("mongodb");

let app = express();
let db;

app.use(express.urlencoded({extended:false}));
app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.json());


let string = "mongodb+srv://shrey2004:shrey@cluster0.9j4ff.mongodb.net/test?retryWrites=true&w=majority";
mongodb.connect(string , {useUnifiedTopology:true , useNewUrlParser:true} , function(err,client){
    db = client.db();
});

app.get("/" , function (req,res){ 
   db.collection("items").find().toArray(function(err , x){
    res.send(`
    <html>
    <head>
        <title>Page</title>
        <meta name = "viewport" content ="width=device-width,initial-scale=1.0" />
        <link rel = "stylesheet"  href = "/bootstrap.css" />
    </head>
    <body>
        <div class = "container-fluid w-100 h-100 pt-4">
            <p class = "lead text-center" style = "font-size:35px;">TODO APPLICATION</p>
            <div class = "jumbotron jumbotron-fluid p-1">
                <form id = "form" class = "d-flex justify-content-center align-content-center pt-3" action = "/create-item" method = "POST">
                    <input id = "input" type = "text" class = "form-control form-control-md ml-4" placeholder="Please type something..." name = "input" style = "flex:1;" />
                    <button id = "btn" type = "submit" class = "btn btn-primary ml-4 mr-4">Add a new task</button>
                    </form>
            </div>
            <ul class = "list-group">
               ${x.map(function(y){
                   return ` <li class = "list-group-item d-flex justify-content-center align-content-center">
                   <span class = "lead item-text" style = "flex: 1;">${y.name}</span>
                   <div>
                           <button data-id = "${y._id}" type = "button" class = "btn btn-success btn-sm edit-me">Edit</button>
                       <button data-id = "${y._id}" type = "button" class = "btn btn-danger btn-sm delete-me">Delete</button>
                   </div>
               </li>`
               }).join('')}
            </ul>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src = "/script.js"></script>
    </body>
</html>
    `);

   });
});

app.post("/create-item" , function (req,res){ 
    db.collection("items").insertOne({name:req.body.input} , function(){
        res.redirect("/");
    });
 });

app.post("/update-item" , function(req,res){
    db.collection("items").findOneAndUpdate({_id:new mongodb.ObjectId(req.body.id)} , {$set:{name:req.body.text}} , function(){
        res.redirect("/");
    });
});

app.post("/delete-item" , function(req,res){
    db.collection('items').deleteOne({_id: new mongodb.ObjectId(req.body.id)}, function() {
        res.send("Success")
      })
});
app.listen(3000 , ()=>{
    console.log("listening.....");
}); 