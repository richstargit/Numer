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
        for (let i = 0; i < matrixA.length - 1; i++) {
            for (let j = i + 1; j < matrixA.length; j++) {
                if(matrixA[j][i]==0){
                    continue;
                }
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

//gauss jordan
export function GaussJordan(mA, vB) {
    try {
        let matrixA = mA.map(v => v.map(n => n));
        let vectorB = vB.map(v => v);
        let vectorX = [];
        let temp = [];
        let result = [];
        for (let i = 0; i < matrixA.length - 1; i++) {
            for (let j = i + 1; j < matrixA.length; j++) {
                if(matrixA[j][i]==0){
                    continue;
                }
                temp = [...matrixA[i]];
                temp[matrixA.length] = vectorB[i];
                temp = temp.map(n => (n / matrixA[i][i]) * matrixA[j][i])
                let str = `R_${j+1}=R_${j+1}-(R_${i+1}/${matrixA[i][i]})(${matrixA[j][i]})`
                let t = 0;
                matrixA[j] = matrixA[j].map(n => (n - temp[t++]))
                vectorB[j] -= temp[matrixA.length];
                result.push({
                    Eliminat : str,
                    matrixA: matrixA.map(v => v.map(n => math.round(n,6))),
                    vectorB: vectorB.map(v=>math.round(v,6))
                })
            }
        }

        for (let i = matrixA.length - 1; i > 0; i--) {
            for (let j = i - 1; j >= 0; j--) {
                if(matrixA[j][i]==0){
                    continue;
                }
                temp = [...matrixA[i]];
                temp[matrixA.length] = vectorB[i];
                temp = temp.map(n => (n / matrixA[i][i]) * matrixA[j][i])
                let str = `R_${j+1}=R_${j+1}-(R_${i+1}/${matrixA[i][i]})(${matrixA[j][i]})`
                let t = 0;
                matrixA[j] = matrixA[j].map(n => (n - temp[t++]))
                vectorB[j] -= temp[matrixA.length];
                result.push({
                    Eliminat : str,
                    matrixA: matrixA.map(v => v.map(n => math.round(n,6))),
                    vectorB: vectorB.map(v=>math.round(v,6))
                })
            }
        }

        for (let i = 0; i < vectorB.length; i++) {
            vectorX[i] = vectorB[i] / matrixA[i][i];
            vectorX[i] = math.round(vectorX[i], 6);
            vectorB[i] /= matrixA[i][i];
            let str = `R_${i+1}=R_${i+1}/${matrixA[i][i]}`
            matrixA[i][i] /= matrixA[i][i];
            result.push({
                Eliminat : str,
                matrixA: matrixA.map(v => v.map(n => math.round(n,6))),
                vectorB: vectorB.map(v=>math.round(v,6))
            })
        }
        return ({
            request: "success",
            mode: "gauss_jordan_Method",
            matrixA: mA,
            vectorB: vB,
            vectorX: vectorX,
            result: result,
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "gauss_jordan_Method",
            errors: error
        });
    }
}

//matrix inversion
export function MatrixInv(mA, vB) {
    try {
        let matrixA = mA.map(v => v.map(n => n));
        let vectorB = vB.map(v => v);
        let vectorX = [];

        let temp = [];
        let tempinv = [];
        let result = [];
        let matrixAinv=mA.map(v => v.map(n => n));
        for(let i=0;i<matrixA.length;i++){
            for(let j=0;j<matrixA[i].length;j++){
                if(i==j){
                    matrixAinv[i][j]=1;
                }else{
                    matrixAinv[i][j]=0;
                }
            }
        }

        for (let i = 0; i < matrixA.length - 1; i++) {
            for (let j = i + 1; j < matrixA.length; j++) {
                if(matrixA[j][i]==0){
                    continue;
                }
                temp = [...matrixA[i]];
                tempinv = [...matrixAinv[i]];
                temp = temp.map(n => (n / matrixA[i][i]) * matrixA[j][i])
                tempinv = tempinv.map(n => (n / matrixA[i][i]) * matrixA[j][i])
                let str = `R_${j+1}=R_${j+1}-(R_${i+1}/${matrixA[i][i]})(${matrixA[j][i]})`
                let t = 0;
                matrixA[j] = matrixA[j].map(n => (n - temp[t++]))
                t=0;
                matrixAinv[j] = matrixAinv[j].map(n => (n - tempinv[t++]))
                result.push({
                    Eliminat : str,
                    matrixA: matrixA.map(v => v.map(n => math.round(n,6))),
                    matrixAinv: matrixAinv.map(v=>v.map(n => math.round(n,6)))
                })
            }
        }

        for (let i = matrixA.length - 1; i > 0; i--) {
            for (let j = i - 1; j >= 0; j--) {
                if(matrixA[j][i]==0){
                    continue;
                }
                temp = [...matrixA[i]];
                tempinv = [...matrixAinv[i]];
                temp = temp.map(n => (n / matrixA[i][i]) * matrixA[j][i])
                tempinv = tempinv.map(n => (n / matrixA[i][i]) * matrixA[j][i])
                let str = `R_${j+1}=R_${j+1}-(R_${i+1}/${matrixA[i][i]})(${matrixA[j][i]})`
                let t = 0;
                matrixA[j] = matrixA[j].map(n => (n - temp[t++]))
                t=0;
                matrixAinv[j] = matrixAinv[j].map(n => (n - tempinv[t++]))
                result.push({
                    Eliminat : str,
                    matrixA: matrixA.map(v => v.map(n => math.round(n,6))),
                    matrixAinv: matrixAinv.map(v=>v.map(n => math.round(n,6)))
                })
            }
        }

        for (let i = 0; i < matrixA.length; i++) {
            matrixAinv[i] = matrixAinv[i].map(n => (n/matrixA[i][i]))
            let str = `R_${i+1}=R_${i+1}/${matrixA[i][i]}`
            matrixA[i][i] /= matrixA[i][i];
            result.push({
                Eliminat : str,
                matrixA: matrixA.map(v => v.map(n => math.round(n,6))),
                matrixAinv: matrixAinv.map(v=>v.map(n => math.round(n,6)))
            })
        }

        for (let i = 0; i < vectorB.length; i++) {
            let sum = 0;
            for (let j = 0; j < matrixAinv.length; j++) {
                sum += matrixAinv[i][j] * vectorB[j];
            }
            vectorX[i] = math.round(sum, 6);
        }
        return ({
            request: "success",
            mode: "matrix_inversion_method",
            matrixA: mA,
            matrixAinv : matrixAinv.map(v=>v.map(n => math.round(n,6))),
            vectorB: vB,
            vectorX: vectorX,
            result: result,
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "matrix_inversion_method",
            errors: error
        });
    }
}

//lu decomposition
export function LuDecomposition(mA, vB) {
    try {
        let matrixA = mA.map(v => v.map(n => n));
        let vectorB = vB.map(v => v);
        let vectorX = [];
        let vectorY = [];
        let L = [];
        let U = [];
        let result = [];
        for (let i = 0; i < matrixA.length; i++) {
            L[i] = [];
            U[i] = [];
            for (let j = 0; j < matrixA[i].length; j++) {
                L[i][j] = 0;
                if (i == j) {
                    U[i][j] = 1;
                } else {
                    U[i][j] = 0;
                }
            }
        }
        for (let i = 0; i < matrixA.length; i++) {
            for (let j = 0; j < matrixA[i].length; j++) {
                let str ="(";
                let sum = 0;
                for (let k = 0; k < matrixA.length; k++) {
                    sum += L[i][k] * U[k][j];
                    str+=(L[i][k] * U[k][j]!=0&&k>0?" + ":"");
                    str+=(L[i][k] * U[k][j]==0?"":`(${math.round(L[i][k],6)})(${math.round(U[k][j],6)})`);
                }
                str+=")";
                if (j <= i) {
                    L[i][j] = (matrixA[i][j] - sum) / U[i][i];
                    result.push({
                        LU : str=="()"?`L_{${i+1},${j+1}}=${math.round(matrixA[i][j],6)} = ${L[i][j]}`:`L_{${i+1},${j+1}} = ${math.round(matrixA[i][j],6)} - ${str} = ${L[i][j]}`,
                    })
                } else {
                    U[i][j] = (matrixA[i][j] - sum) / L[i][i];
                    result.push({
                        LU : str=="()"?`U_{${i+1},${j+1}} = \\frac{${math.round(matrixA[i][j],6)}}{${math.round(L[i][i],6)}} = ${U[i][j]}`:`U_{${i+1},${j+1}} = \\frac{${math.round(matrixA[i][j],6)} - ${str}}{${math.round(L[i][i],6)}} = = ${U[i][j]}`,
                    })
                }
            }
        }

        for (let i = 0; i < vectorB.length; i++) {
            let sum = 0;
            for (let j = 0; j < i; j++) {
                sum += L[i][j] * vectorY[j];
            }
            vectorY[i] = (vectorB[i] - sum) / L[i][i];
        }
        for (let i = vectorY.length - 1; i >= 0; i--) {
            let sum = 0;
            for (let j = vectorY.length - 1; j > i; j--) {
                sum += U[i][j] * vectorX[j];
            }
            vectorX[i] = (vectorY[i] - sum) / U[i][i];
            vectorX[i] = math.round(vectorX[i], 6);
        }
        return ({
            request: "success",
            mode: "LU_Decomposition_Method",
            matrixA: mA,
            matrixL : L.map(v => v.map(n => math.round(n,6))),
            matrixU : U.map(v => v.map(n => math.round(n,6))),
            vectorB: vB,
            vectorY : vectorY.map(v=>math.round(v,6)),
            vectorX: vectorX,
            result: result,
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "LU_Decomposition_Method",
            errors: error
        });
    }
}
//cholesky decomposition
export function CholeskyDecomposition(mA, vB) {
    try {
        let matrixA = mA.map(v => v.map(n => n));
        let vectorB = vB.map(v => v);
        let vectorX = [];
        let vectorY = [];
        let L = [];
        let LT = [];
        let result = [];
        for (let i = 0; i < matrixA.length; i++) {
            L[i] = [];
            LT[i] = [];
            for (let j = 0; j < matrixA[i].length; j++) {
                L[i][j] = 0;
                LT[i][j] = 0;
            }
        }

        for (let i = 0; i < matrixA.length; i++) {
            for (let j = i; j < matrixA.length; j++) {
                let str ="(";
                let sum = 0;
                for (let k = 0; k < matrixA.length; k++) {
                    sum += L[i][k] * LT[k][j];
                    str+=(L[i][k] * LT[k][j]!=0&&k>0?" + ":"");
                    str+=(L[i][k] * LT[k][j]==0?"":`(${math.round(L[i][k],6)})(${math.round(LT[k][j],6)})`);
                }
                str+=")";
                if (i == j) {
                    LT[i][j] = math.sqrt(matrixA[i][j] - sum);
                    L[j][i] = LT[i][j];
                    result.push({
                        LT : str=="()"?`L_{${i+1},${j+1}}=\\sqrt{${math.round(matrixA[i][j],6)}} = ${L[j][i]}`:`L_{${i+1},${j+1}} = \\sqrt{${math.round(matrixA[i][j],6)} - ${str}} = ${math.round(L[j][i],6)}`,
                    })
                } else {
                    LT[i][j] = (matrixA[i][j] - sum) / L[i][i];
                    L[j][i] = LT[i][j];
                    result.push({
                        LT : str=="()"?`L_{${i+1},${j+1}} = \\frac {${math.round(matrixA[i][j],6)}}{${math.round(L[i][i],6)}} = ${L[j][i]}`:`L_{${i+1},${j+1}} = \\frac {${math.round(matrixA[i][j],6)} - ${str}}{${math.round(L[i][i],6)}} = ${math.round(L[j][i],6)}`,
                    })
                }
            }
        }

        for (let i = 0; i < vectorB.length; i++) {
            let sum = 0;
            for (let j = 0; j < i; j++) {
                sum += L[i][j] * vectorY[j];
            }
            vectorY[i] = (vectorB[i] - sum) / L[i][i];
        }
        for (let i = vectorY.length - 1; i >= 0; i--) {
            let sum = 0;
            for (let j = vectorY.length - 1; j > i; j--) {
                sum += LT[i][j] * vectorX[j];
            }
            vectorX[i] = (vectorY[i] - sum) / LT[i][i];
            vectorX[i] = math.round(vectorX[i], 6);
        }
        return ({
            request: "success",
            mode: "Cholesky_Decomposition_Method",
            matrixA: mA,
            matrixL : L.map(v => v.map(n => math.round(n,6))),
            matrixLT : LT.map(v => v.map(n => math.round(n,6))),
            vectorB: vB,
            vectorY : vectorY.map(v=>math.round(v,6)),
            vectorX: vectorX,
            result: result,
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "Cholesky_Decomposition_Method",
            errors: error
        });
    }
}