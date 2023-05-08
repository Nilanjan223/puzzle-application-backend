const mongoose = require("mongoose");
const uniqueValidator=require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true , unique:true},
  password: { type: String, required: true, minlength: 6 },
    stage:{type:Number },
    hint:{type:Number},
    time:{
        1:{ type: Number},
        2:{ type: Number},
        3:{ type: Number},
        4:{ type: Number},
        5:{ type: Number},
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);