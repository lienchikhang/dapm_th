const mongoose= require('mongoose');
const Shoe=new mongoose.Schema({
    size:[{ss: 37, cs: 0},{ss:38,cs:0},{ss:39,cs:0},{ss:40,cs:0},{ss: 41, cs: 0},{ss:42,cs:0},{ss:43,cs:0},{ss:44,cs:0}],
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    img:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    color:{
        type:String,
        require:true
    },
    brand:{
        type:String,
        require:true
    }
})

module.exports= new mongoose.model("Shoe",Shoe);