import { create, all } from 'mathjs';

const math = create(all);
//newton divided
export function NewtonDivided(x, y, xresult) {
    try {
        const X = math.number(x);
        const Y = math.number(y);
        const C = [...Y];
        const result = [];

        for (let i = 0; i < X.length; i++) {
            for (let j = X.length - 1; j > i; j--) {
                C[j] = (C[j] - C[j - 1]) / (X[j] - X[j - 1 - i]);
            }
        }
        for(let r=0;r<xresult.length;r++){
            let valuex = 0;
            for(let i=0;i<X.length;i++){
                let sum = C[i];
                for(let j=i;j>0;j--){
                    sum*=xresult[r]-X[j-1];
                }
                valuex+=sum;
            }
            result.push({
                x:xresult[r],
                y:valuex
            });
        }
        return ({
            request: "success",
            mode: "newton_divided",
            X:X,
            Y:Y,
            result: result
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "newton_divided",
            errors: error
        });
    }
}

//lagrange interpolation
export function Lagrange(x, y, xresult) {
    try {
        const X = math.number(x);
        const Y = math.number(y);
        const result = [];
        for(let r = 0;r<xresult.length;r++){
            let valuex=0;
            for(let i=0;i<X.length;i++){
                let sumL=1;
                for(let j=0;j<X.length;j++){
                    if(j!=i){
                        sumL*=(X[j]-xresult[r])/(X[j]-X[i]);
                    }
                }
                valuex += sumL*Y[i];
            }
            result.push({
                x:xresult[r],
                y:valuex
            })
        }
        return ({
            request: "success",
            mode: "lagrange_interpolation",
            X:X,
            Y:Y,
            result: result
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "lagrange_interpolation",
            errors: error
        });
    }
}

//spline
export function Spline(x, y, xresult) {
    try {
        const X = math.number(x);
        const Y = math.number(y);
        const result = [];
        const M = [];
        for (let i = 0; i < X.length - 1; i++) {
            M[i] = (Y[i + 1] - Y[i]) / (X[i + 1] - X[i]);
        }
        for (let r = 0; r < xresult.length; r++) {
            let check = 0;
            for (let i = 1; i < X.length; i++) {
                if (xresult[r] < X[i]) {
                    const n = Y[i - 1] + M[i - 1] * (xresult[r] - X[i - 1]);
                    result.push({
                        x:xresult[r],
                        y:n
                    })
                    check=1;
                    break;
                }
            }
            if(check==0){
                let i=X.length-1;
                const n = Y[i - 1] + M[i - 1] * (xresult[r] - X[i - 1]);
                    result.push({
                        x:xresult[r],
                        y:n
                    })
            }
        }
        return ({
            request: "success",
            mode: "spline",
            X:X,
            Y:Y,
            result: result
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "spline",
            errors: error
        });
    }
}