const {connection} = require("../index");

exports.menu = async(req,res) =>{
    try{
        connection.query("select * from numer_menu",(errors,result,fields)=>{
            if(errors) throw errors;
            return res.status(200).send(result);
        });
    }catch(error){
        res.status(500).send(`${error}`);
    }
};