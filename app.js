//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Study"
});

const item2 = new Item({
  name: "Sleep"
});

const item3 = new Item({
  name: "Study again"
});

const defaultItems = [item1,item2,item3];


// Item.deleteOne({_id:"5d524258cccd9a46946be47c"}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted");
//   }
// });


app.get("/", function(req, res) {

  Item.find({},function(err,items){
    if(err){
      console.log(err);
    }else{
        if(items.length === 0){
          Item.insertMany(defaultItems, function(err){
            if(err){
              console.log(err);
            }else{
              console.log("Successfully Inserted");

            }
          res.redirect("/");
          });
        }else{
          res.render("list", {listTitle: "Today", newListItems: items});
        }

      }

    });


  });






app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
