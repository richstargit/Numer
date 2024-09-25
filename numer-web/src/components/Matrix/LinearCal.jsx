import { create, all } from 'mathjs';

const math = create(all);
//cramer rule
export function CramerRule(matrixA, vectorB) {
    try {
        let vectorX = [];
        let result = [];
        let detA = math.det(matrixA);
        if (detA == 0) {
            return ({
                request: "success",
                mode: "cramer_Rule",
                matrixA: matrixA,
                vectorB: vectorB,
                result: "det0"
            });
        }
        for (let i = 0; i < matrixA.length; i++) {
            let temp = [];
            for (let j = 0; j < matrixA.length; j++) {
                temp[j] = [...matrixA[j]]
            }
            for (let j = 0; j < matrixA.length; j++) {
                temp[j][i] = vectorB[j]
            }

            vectorX[i] = math.round(math.det(temp) / detA, 6);
            result.push({
                matrixXn: temp,
                detx: math.det(temp),
                x: vectorX[i]
            });
        }
        return ({
            request: "success",
            mode: "cramer_Rule",
            matrixA: matrixA,
            vectorB: vectorB,
            det: detA,
            vectorX: vectorX,
            result: result
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "cramer_Rule",
            errors: error
        });
    }
}

//gauss elimination
export function GaussElimination(mA, vB) {
    try {
        let matrixA = mA.map(v => v.map(n => n));
        let vectorB = vB.map(v=>v);
        let vectorX = [];
        let temp = [];
        let result = [];
        let backsub = [];
        for (let i = 0; i < matrixA[0].length - 1; i++) {
            for (let j = i + 1; j < matrixA.length; j++) {
                temp = [...matrixA[i]];
                temp[matrixA.length] = vectorB[i];
                temp = temp.map(n => (n / matrixA[i][i]) * matrixA[j][i]);
                let str = `R_${j+1}=R_${j+1}-(R_${i+1}/${matrixA[i][i]})(${matrixA[j][i]})`
                let t = 0;
                matrixA[j] = matrixA[j].map(n => {
                    return n - temp[t++];
                })
                vectorB[j] -= temp[matrixA.length];
                result.push({
                    Eliminat : str,
                    matrixA: matrixA.map(v => v.map(n => math.round(n,6))),
                    vectorB: vectorB.map(v=>math.round(v,6))
                })
            }
        }
        for (let i = vectorB.length - 1; i >= 0; i--) {
            let sum = 0;
            let str= `(`;
            for (let j = vectorB.length - 1; j > i; j--) {
                sum += matrixA[i][j] * vectorX[j];
                str+=`(${matrixA[i][j]})(${vectorX[j]})`;
                if(j-1 > i){
                    str+=` + `;
                }
            }
            str+=')';
            vectorX[i] = (vectorB[i] - sum) / matrixA[i][i];
            vectorX[i] = math.round(vectorX[i], 6);
            str = `x_${i+1} = \\frac{${vectorB[i]}${str==`()`?``:` - `+str}}{${matrixA[i][i]}} = ${vectorX[i]}`;
            backsub.push(str);
        }
        console.log(vectorX)
        return ({
            request: "success",
            mode: "gauss_elimination_method",
            matrixA: mA,
            vectorB: vB,
            vectorX: vectorX,
            result: result,
            backsub : backsub
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "gauss_elimination_method",
            errors: error
        });
    }
}