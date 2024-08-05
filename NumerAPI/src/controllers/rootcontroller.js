const {connection} = require("../index");
const math = require("mathjs");

function Sign(y){
    if(y<0){
        return 1
    }
    return 0
}
//graphical
exports.graphical = async(req,res) =>{
    try{
        const{fx,start,end,errors} = req.body
        let Start = start;
        let End = end;
        let round = 0;
        let sign = Sign(math.evaluate(fx,{x:start}))
        let rows=[];
        let endcheck = math.abs(End);
        let num = 0.1;

        if(endcheck==0){
            endcheck = 1;
        }
        if(endcheck>1){
            let dig = 0;
            while(endcheck>=10){
                endcheck/=10
                dig++;
            }
            endcheck = math.floor(endcheck)
            let basetemp = endcheck;
            while(dig>0){
                endcheck*=10;
                dig--
            }
            endcheck = endcheck/basetemp;
            while(endcheck>1){
                endcheck/=10;
                num*=10;
            }
        }else{
            while(endcheck<1){
                endcheck*=10;
                num/=10;
            }
        }
        let add = num;
        if(start==end){
            return res.status(200).send({
                request : "success",
                mode : "graphical_method",
                sol : fx,
                result : rows
            });
        }
        for(let i=Start;i<=End;i+=add){
            let y = math.evaluate(fx,{x:i});
            let ymath = math.round(y,6);
            let errorresult = parseFloat(math.round(math.abs(ymath)*100.00,6));
            rows.push({
                iter : round,
                x : parseFloat(math.round(i,6)),
                y : ymath,
                error : `${errorresult}%`
            })

            round++;
            if(math.abs(math.evaluate(fx,{x:i}))<errors){
                x = i;
                break;
            }

            if(sign!=Sign(y)){
                Start = i-add;
                End = i;
                i = Start;
                add /= 10;
                sign = Sign(math.evaluate(fx,{x:Start}));
                if(math.abs(math.evaluate(fx,{x:Start}))<errors){
                    x=Start;
                    break;
                }
                if(math.abs(math.evaluate(fx,{x:End}))<errors){
                    x = End;
                    break;
                }
            }

            if(round > 1000){
                break;
            }
        }
        return res.status(200).send({
            request : "success",
            mode : "graphical_method",
            sol : fx,
            result : rows
        });

    }catch(error){
        res.status(500).send(`${error}`)
    }
}
//bisection
exports.bisection = async(req,res) =>{
    try{
        const{fx,xl,xr,errors} = req.body
        let Xl = xl
        let Xr = xr
        let round = 0
        let xm = 0
        let xmold = 0
        let check = 0
        let rows = []
        do{
            xm = (Xl+Xr)/2
            if(math.evaluate(fx,{x:xm})*math.evaluate(fx,{x:Xr})>0){
                Xr = xm
            }else{
                Xl = xm
            }
            check = math.abs(xm-xmold)
            xmold = xm

            rows.push({
                iter : round,
                x : math.round(xm,6),
                y : math.round(math.evaluate(fx,{x:xm}),6),
                error : `${math.round((check/xm)*100,6)}%`
            })

            if(round > 1000){
                break;
            }
            round++

        }while(check>errors)
        
        return res.status(200).send({
            request : "success",
            mode : "bisection_method",
            sol : fx,
            result : rows
        });

    }catch(error){
        res.status(500).send(`${error}`)
    }
}

//flaseposition
exports.falseposition = async(req,res) =>{
    try{
        const{fx,xl,xr,errors} = req.body
        let Xl = xl
        let Xr = xr
        let round = 0
        let x1 = 0
        let x1old = 0
        let check = 0
        let rows = []
        do{
            x1 = (Xl*math.evaluate(fx,{x:Xr})-Xr*math.evaluate(fx,{x:Xl}))/(math.evaluate(fx,{x:Xr})-math.evaluate(fx,{x:Xl}));
            if(math.evaluate(fx,{x:x1})*math.evaluate(fx,{x:Xr})>0){
                Xr = x1
            }else{
                Xl = x1
            }
            check = math.abs(x1-x1old)
            x1old = x1

            rows.push({
                iter : round,
                x : math.round(x1,6),
                y : math.round(math.evaluate(fx,{x:x1}),6),
                error : `${math.round((check/x1)*100,6)}%`
            })

            if(round > 1000){
                break;
            }
            round++

        }while(check>errors)
        
        return res.status(200).send({
            request : "success",
            mode : "false_position_method",
            sol : fx,
            result : rows
        });

    }catch(error){
        res.status(500).send(`${error}`)
    }
}

//onepoint

exports.onepoint = async(req,res) =>{
    try{
        const{fx,xl,errors} = req.body
        let X = xl
        let round = 0
        let xold = 0
        let check = 0
        let rows = []
        let graphs = []
        do{
            graphs.push({
                x : X,
                y: X
            })
            xold = X

            X = math.evaluate(fx,{x:xold})
            
            check = math.abs(X-xold)

            rows.push({
                iter : round,
                x : math.round(X,6),
                y : math.round(math.evaluate(fx,{x:X}),6),
                error : `${math.round((check/X)*100,6)}%`
            })
            graphs.push({
                x : xold,
                y: X
            })

            if(round > 1000){
                break;
            }
            round++

        }while(check>errors)
        
        return res.status(200).send({
            request : "success",
            mode : "one_point_iteration_method",
            sol : fx,
            result : rows,
            graph : graphs
        });

    }catch(error){
        res.status(500).send(`${error}`)
    }
}

//newton

exports.newton = async(req,res) =>{
    try{
        const{fx,xr,errors} = req.body
        let X = xr
        let dx = math.derivative(fx,'x')+""
        let round = 0
        let xold = 0
        let check = 0
        let rows = []
        let graphs = []
        do{
            graphs.push({
                x : X,
                y : 0
            })
            graphs.push({
                x : X,
                y : math.evaluate(fx,{x:X})
            })
            xold = X
            X = xold-((math.evaluate(fx,{x:xold}))/(math.evaluate(dx,{x:xold})))
            check = math.abs(X-xold)
            rows.push({
                iter : round,
                x : math.round(X,6),
                y : math.round(math.evaluate(fx,{x:X}),6),
                error : `${math.round((check/X)*100,6)}%`
            })
            

            if(round > 1000){
                break;
            }
            round++

        }while(check>errors)
        
        return res.status(200).send({
            request : "success",
            mode : "newton_raphson_method",
            sol : fx,
            result : rows,
            graph : graphs
        });

    }catch(error){
        res.status(500).send(`${error}`)
    }
}

exports.secant = async(req,res) =>{
    try{
        const{fx,xl,xr,errors} = req.body
        let Xs = xr
        let Xe = xl
        let round = 0
        let xold = 0
        let check = 0
        let rows = []
        let graphs = []
        graphs.push({
            x : Xs,
            y : 0
        })
        graphs.push({
            x : Xs,
            y : math.evaluate(fx,{x:Xs})
        })
        graphs.push({
            x : Xe,
            y : math.evaluate(fx,{x:Xe})
        })
        graphs.push({
            x : Xe,
            y : 0
        })
        graphs.push({
            x : Xe,
            y : math.evaluate(fx,{x:Xe})
        })
        do{
            xold = Xe
            Xe = xold-(math.evaluate(fx,{x:Xe})*(Xs-Xe))/(math.evaluate(fx,{x:Xs})-math.evaluate(fx,{x:Xe}))
            Xs = xold
            check = math.abs(Xe-xold)
            rows.push({
                iter : round,
                x : math.round(Xe,6),
                y : math.round(math.evaluate(fx,{x:Xe}),6),
                error : `${math.round((check/Xe)*100,6)}%`
            })
            graphs.push({
                x : Xe,
                y : 0
            })
            graphs.push({
                x : Xe,
                y : math.evaluate(fx,{x:Xe})
            })
            graphs.push({
                x : Xs,
                y : math.evaluate(fx,{x:Xs})
            })
            graphs.push({
                x : Xe,
                y : math.evaluate(fx,{x:Xe})
            })

            if(round > 1000){
                break;
            }
            round++
        }while(check>errors)
        
        return res.status(200).send({
            request : "success",
            mode : "secant_method",
            sol : fx,
            result : rows,
            graph : graphs
        });

    }catch(error){
        res.status(500).send(`${error}`)
    }
}