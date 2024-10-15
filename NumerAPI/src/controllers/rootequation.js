exports.bisection = async(req,res) =>{
    try{
        // const{fx,mode,round,errors} = req.body
        // if(fx!=""&&mode!=""&&round>0&&errors){
        //     return res.status(200).send({
        //         request : "success",
        //     });
        // }
        return res.status(200).send({
            request : "success",
        });

    }catch(error){
        res.status(500).send(`${error}`)
    }
}