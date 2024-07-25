const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({

    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref :'user',
        require: true
    },
    task : {    
        type: String,
        require: true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
},
{timestamp : true}
);

const todo = mongoose.model('todo', todoSchema);

module.exports = todo