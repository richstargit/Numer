const {connection} = require("../../index");

exports.menu = async(req,res) =>{
    try{
        // connection.query("select * from numer_menu",(errors,result,fields)=>{
        //     if(errors) throw errors;
        //     return res.status(200).send(result);
        // });
        return res.status(200).send([
          {
            "id": 1,
            "name": "Home",
            "path": "/",
            "cname": "sidetext"
          },
          {
            "id": 2,
            "name": "Root of equations",
            "path": "/root_of_equations",
            "cname": "sidetext"
          }
        ]);
    }catch(error){
        return res.status(200).send([
            {
              "id": 1,
              "name": "Home",
              "path": "/",
              "cname": "sidetext"
            },
            {
              "id": 2,
              "name": "Root of equations",
              "path": "/root_of_equations",
              "cname": "sidetext"
            }
          ]);
        res.status(500).send(`${error}`);
    }
};