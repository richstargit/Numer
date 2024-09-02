import { create, all } from 'mathjs';

const math = create(all);
//graphical
export function graphical(fx,start,end,errors){
    try{
        let Start = start;
        let End = end;
        let round = 0;
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
            return ({
                request : "success",
                mode : "graphical_method",
                sol : fx,
                iteration : round,
                result : rows
            });
        }
        let y;
        let ysign = math.evaluate(fx,{x:Start});
        let i=Start;
        do{
            y = math.evaluate(fx,{x:i})
            let errorresult = parseFloat(math.round(math.abs(math.round(y,6))*100.00,6));
            rows.push({
                iter : round,
                x : parseFloat(math.round(i,6)),
                y : math.round(y,6),
                error : `${errorresult}%`
            })
            round++;
            if(y*ysign<0){
                End = i;
                i-=add;
                add/=10;
            }
            ysign = math.evaluate(fx,{x:i});
            i+=add;
        }while(math.abs(y)>=errors&&i<=End);
        return ({
            request : "success",
            mode : "graphical_method",
            sol : fx,
            iteration : round,
            result : rows
        });

    }catch(error){
        console.log(error);
    }
}
//bisection
export function bisection(fx,xl,xr,errors){
    try{
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
        
        return ({
            request : "success",
            mode : "bisection_method",
            sol : fx,
            iteration : round,
            result : rows
        });

    }catch(error){
        console.log(error);
    }
}

//flaseposition
export function falseposition(fx,xl,xr,errors){
    try{
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
        
        return ({
            request : "success",
            mode : "false_position_method",
            sol : fx,
            iteration : round,
            result : rows
        });

    }catch(error){
        console.log(error);
    }
}

//onepoint
export function onepoint(fx,xl,errors){
    try{
        let X = xl
        let round = 0
        let xold = 0
        let check = 0
        let rows = []
        let graphs = []
        let dotxy = []
        do{
            graphs.push({
                x : X,
                y: X
            })
            dotxy.push({
                x: X,
                y: 0,
                tox: X
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
        
        return ({
            request : "success",
            mode : "one_point_iteration_method",
            sol : fx,
            iteration : round,
            result : rows,
            graph : graphs,
            graphdot : dotxy
        });

    }catch(error){
        console.log(error);
    }
}

//newton
export function newton(fx,xr,errors){
    try{
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
        
        return ({
            request : "success",
            mode : "newton_raphson_method",
            sol : fx,
            iteration : round,
            result : rows,
            graph : graphs
        });

    }catch(error){
        console.log(error);
    }
}

// //secant
export function secant(fx,xl,xr,errors){
    try{
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
        
        return ({
            request : "success",
            mode : "secant_method",
            sol : fx,
            iteration : round,
            result : rows,
            graph : graphs
        });

    }catch(error){
        console.log(error);
    }
}