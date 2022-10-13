
const {Schema, model} = require('mongoose')

const MessageSchema = Schema({
    from:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    read:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

MessageSchema.method('toJSON', function(){
    const{__v, ...object} = this.object();
})

module.exports= model('Message',MessageSchema)
