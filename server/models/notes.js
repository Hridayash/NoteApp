const mongoose = require("mongoose");

const  noteSchema = new mongoose.Schema({
    title:{
        type:String,
 
       
    },
   
    post:{
        type: String,
        
    },
    // user: {
    //      type: mongoose.Schema.Types.ObjectId,
    //       ref: 'User',
    //        required: true
    //      }


});

const noteModel = mongoose.model("notes",noteSchema);

module.exports = noteModel;