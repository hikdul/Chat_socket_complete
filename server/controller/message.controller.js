const Mensaje = require('../database/models/message')

const listMessage = async (req,res,next) =>{

    // id que deseo ver   
    const otherId =  req.params.id
    // id de quien esta mirando
    const meId = req.uid
    
    const last30 = await Mensaje.find({
        $or:[
            {from: meId, to: otherId},
            {from: otherId, to: meId}
        ]
    })
        .sort({createAt:'desc'})
        .limit(30)
    

    res.status(200).json({ok:true, messages:last30})
}


module.exports={listMessage}