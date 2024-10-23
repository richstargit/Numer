import { create, all } from 'mathjs';

const math = create(all);
//trapezoidal rule
export function Trapezoidel(Solution,NumberX0,NumberX1) {
    try {

        const fx=Solution;
        const a=Number(NumberX0);
        const b=Number(NumberX1);

        const FX=(n)=>{
            return math.evaluate(fx,{x:n})
        }

        const Sol=()=>{
            return ((b-a)/2)*(FX(a)+FX(b));
        }

        const Str=()=>{
            return `\\frac {b-a}{2}[f(${a})+f(${b})]`;
        }

        const SolStr=()=>{
            return `\\frac {${b}-${a}}{2}[${FX(a)}+${FX(b)}]`;
        }
        
        return ({
            request: "success",
            mode: "trapezoidal_rule",
            strfx:[`fx(${a}) = ${FX(a)}`,`fx(${b}) = ${FX(b)}`],
            h:(b-a),
            str:Str(),
            solstr:SolStr(),
            result: Sol()
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "trapezoidal_rule",
            errors: error
        });
    }
}

//composite trapezoidal
export function CompositeTra(Solution,NumberX0,NumberX1,NumberN) {
    try {

        const fx=Solution;
        const a=Number(NumberX0);
        const b=Number(NumberX1);
        const n = Number(NumberN);
        const strfx = [];

        const FX=(n)=>{
            return math.evaluate(fx,{x:n})
        }

        const Str=()=>{
            let str = ``;
            for(let i=1;i<n;i++){
                str+=` + 2(fx(${a+((b-a)/n)*i}))`;
            }
            return `\\frac {h}{2}(f(${a}) + f(${b}) ${str}`;
        }

        const SolStr=()=>{
            let str = ``;
            for(let i=1;i<n;i++){
                str+=` + 2(${FX(a+((b-a)/n)*i)})`;
            }
            return `\\frac {${(b-a)/n}}{2}(${FX(a)} + ${FX(b)} ${str}`;
        }

        const Sol=()=>{
            let sum = 0;
            strfx.push(`fx(${a}) = ${FX(a)}`);
            for(let i=1;i<n;i++){
                sum+= FX(a+((b-a)/n)*i);
                strfx.push(`fx(${a+((b-a)/n)*i}) = ${FX(a+((b-a)/n)*i)}`);
            }
            strfx.push(`fx(${b}) = ${FX(b)}`);
            return (((b-a)/n)/2)*(FX(a)+FX(b)+2*(sum));
        }
        
        return ({
            request: "success",
            mode: "composite_trapezoidal",
            h:(b-a)/n,
            strfx:strfx,
            str:Str(),
            solstr:SolStr(),
            result: Sol()
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "composite_trapezoidal",
            errors: error
        });
    }
}

//simpson rule
export function Simpson(Solution,NumberX0,NumberX1) {
    try {

        const fx=Solution;
        const a=Number(NumberX0);
        const b=Number(NumberX1);

        const FX=(n)=>{
            return math.evaluate(fx,{x:n})
        }

        const Sol=()=>{
            return (((b-a)/2)/3)*(FX(a)+FX(b)+4*FX(a+((b-a)/2)));
        }

        const Str=()=>{
            return `\\frac {h}{2}[f(${a}) + 4fx(${a+((b-a)/2)}) + f(${b})]`;
        }

        const SolStr=()=>{
            return `\\frac {${b}-${a}}{2}[${FX(a)} + 4(${FX(a+((b-a)/2))}) + ${FX(b)}]`;
        }
        
        return ({
            request: "success",
            mode: "simpson_rule",
            h:(b-a)/2,
            strfx:[`fx(${a}) = ${FX(a)}`,`fx(${a+((b-a)/2)}) = ${FX(a+((b-a)/2))}`,`fx(${b}) = ${FX(b)}`],
            str:Str(),
            solstr:SolStr(),
            result: Sol()
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "simpson_rule",
            errors: error
        });
    }
}

//composite simpson
export function CompositeSimpson(Solution,NumberX0,NumberX1,NumberN) {
    try {

        const fx=Solution;
        const a=Number(NumberX0);
        const b=Number(NumberX1);
        const n = Number(NumberN);
        const strfx = [];

        const FX=(n)=>{
            return math.evaluate(fx,{x:n})
        }

        const Str=()=>{
            let str1 = ``;
            let str2 = ``;
            for(let i=1;i<2*n;i++){
                if(i%2!=0){
                    str1+=` + 4(fx(${a+((b-a)/(2*n))*i}))`;
                }else{
                    str2+=` + 2(fx(${a+((b-a)/(2*n))*i}))`;
                }
            }
            return `\\frac {h}{3}(f(${a}) + f(${b}) ${str1} ${str2}`;
        }

        const SolStr=()=>{
            let str1 = ``;
            let str2 = ``;
            for(let i=1;i<2*n;i++){
                if(i%2!=0){
                    str1+=` + 4(${FX(a+((b-a)/(2*n))*i)})`;
                }else{
                    str2+=` + 2(${FX(a+((b-a)/(2*n))*i)})`;
                }
            }
            return `\\frac {${(b-a)/(2*n)}}{3}(${FX(a)} + ${FX(b)} ${str1} ${str2}`;
        }

        const Sol=()=>{
            let sum1 = 0;
            let sum2 = 0;
            strfx.push(`fx(${a}) = ${FX(a)}`);
            for(let i=1;i<2*n;i++){
                if(i%2!=0){
                    sum1+= FX(a+((b-a)/(2*n))*i);
                    strfx.push(`fx(${a+((b-a)/(2*n))*i}) = ${FX(a+((b-a)/(2*n))*i)}`);
                }else{
                    sum2+= FX(a+((b-a)/(2*n))*i);
                    strfx.push(`fx(${a+((b-a)/(2*n))*i}) = ${FX(a+((b-a)/(2*n))*i)}`);
                }
            }
            strfx.push(`fx(${b}) = ${FX(b)}`);
            return (((b-a)/(2*n))/3)*(FX(a)+FX(b)+4*(sum1)+2*(sum2));
        }
        
        return ({
            request: "success",
            mode: "composite_simpson",
            h:((b-a)/(2*n)),
            strfx:strfx,
            str:Str(),
            solstr:SolStr(),
            result: Sol()
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "composite_simpson",
            errors: error
        });
    }
}