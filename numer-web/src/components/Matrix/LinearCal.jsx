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

            vectorX[i] = math.round(math.det(temp) / detA, 12);
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
                let str = `R_${j+1}=R_${j+1}-(R_${i+1}/${math.round(matrixA[i][i],6)})(${math.round(matrixA[j][i],6)})`
                let t = 0;
                matrixA[j] = matrixA[j].map(n => {
                    return n - temp[t++];
                })
                vectorB[j] -= temp[matrixA.length];
                result.push({
                    Eliminat : str,
                    matrixA: matrixA.map((v,z) => v.map((n,x) => z==j&&x==i?`\\color{red}`+math.round(n,6):math.round(n,6))),
                    vectorB: vectorB.map(v=>math.round(v,6))
                })
            }
        }
        for (let i = matrixA[0].length - 1; i >= 0; i--) {
            let sum = 0;
            let str= ``;
            let strback = ``;
            if(i>matrixA.length-1){
                continue;
            }
            for (let j = matrixA[0].length - 1; j > i; j--) {
                if(j>matrixA.length-1){
                    continue;
                }
                sum += matrixA[i][j] * vectorX[j];
                if(matrixA[i][j] * vectorX[j]!=0){
                    str+=` - (${math.round(matrixA[i][j],6)})(${math.round(vectorX[j],6)})`;
                }
                strback+= ` - a_{${i+1},${j+1}}^{${i>0?i:""}}x_{${i+1}}`;
            }
            vectorX[i] = (vectorB[i] - sum) / matrixA[i][i];
            vectorX[i] = math.round(vectorX[i], 12);
            str = `x_${i+1} = \\frac{b_${i+1}^{${i>0?i:""}}${strback}}{a_{${i+1},${i+1}}^{${i>0?i:""}}} = \\frac{${math.round(vectorB[i],6)}${str}}{${math.round(matrixA[i][i],6)}} = ${math.round(vectorX[i],6)}`;
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
                let str = `R_${j+1}=R_${j+1}-(R_${i+1}/${math.round(matrixA[i][i],6)})(${math.round(matrixA[j][i],6)})`
                let t = 0;
                matrixA[j] = matrixA[j].map(n => (n - temp[t++]))
                vectorB[j] -= temp[matrixA.length];
                result.push({
                    Eliminat : str,
                    matrixA: matrixA.map((v,z) => v.map((n,x) => z==j&&x==i?`\\color{red}`+math.round(n,6):math.round(n,6))),
                    vectorB: vectorB.map(v=>math.round(v,6))
                })
            }
        }

        for (let i = matrixA[0].length - 1; i > 0; i--) {
            for (let j = i-1; j >= 0; j--) {
                if(matrixA[j][i]==0||i>matrixA.length-1){
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
                    matrixA: matrixA.map((v,z) => v.map((n,x) => z==j&&x==i?`\\color{red}`+math.round(n,6):math.round(n,6))),
                    vectorB: vectorB.map(v=>math.round(v,6))
                })
            }
        }

        for (let i = 0; i < matrixA[0].length; i++) {
            if(i>matrixA.length-1){
                continue;
            }
            vectorX[i] = vectorB[i] / matrixA[i][i];
            vectorX[i] = math.round(vectorX[i], 12);
            vectorB[i] /= matrixA[i][i];
            let str = `R_${i+1}=R_${i+1}/${matrixA[i][i]}`
            matrixA[i][i] /= matrixA[i][i];
            result.push({
                Eliminat : str,
                matrixA: matrixA.map((v,z) => v.map((n,x) => z==i&&x==i?`\\color{red}`+math.round(n,6):math.round(n,6))),
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

        const matrixI = matrixAinv.map(v=>v.map(n=>n));

        for (let i = 0; i < matrixA.length - 1; i++) {
            for (let j = i + 1; j < matrixA.length; j++) {
                if(matrixA[j][i]==0){
                    continue;
                }
                temp = [...matrixA[i]];
                tempinv = [...matrixAinv[i]];
                temp = temp.map(n => (n / matrixA[i][i]) * matrixA[j][i])
                tempinv = tempinv.map(n => (n / matrixA[i][i]) * matrixA[j][i])
                let str = `R_${j+1}=R_${j+1}-(R_${i+1}/${math.round(matrixA[i][i],6)})(${math.round(matrixA[j][i],6)})`
                let t = 0;
                matrixA[j] = matrixA[j].map(n => (n - temp[t++]))
                t=0;
                matrixAinv[j] = matrixAinv[j].map(n => (n - tempinv[t++]))
                result.push({
                    Eliminat : str,
                    matrixA: matrixA.map((v,z) => v.map((n,x) => z==j&&x==i?`\\color{red}`+math.round(n,6):math.round(n,6))),
                    matrixAinv: matrixAinv.map(v=>v.map(n => math.round(n,6)))
                })
            }
        }

        for (let i = matrixA[0].length - 1; i > 0; i--) {
            for (let j = i - 1; j >= 0; j--) {
                if(matrixA[j][i]==0||i>matrixA.length-1){
                    continue;
                }
                temp = [...matrixA[i]];
                tempinv = [...matrixAinv[i]];
                temp = temp.map(n => (n / matrixA[i][i]) * matrixA[j][i])
                tempinv = tempinv.map(n => (n / matrixA[i][i]) * matrixA[j][i])
                let str = `R_${j+1}=R_${j+1}-(R_${i+1}/${math.round(matrixA[i][i],6)})(${math.round(matrixA[j][i],6)})`
                let t = 0;
                matrixA[j] = matrixA[j].map(n => (n - temp[t++]))
                t=0;
                matrixAinv[j] = matrixAinv[j].map(n => (n - tempinv[t++]))
                result.push({
                    Eliminat : str,
                    matrixA: matrixA.map((v,z) => v.map((n,x) => z==j&&x==i?`\\color{red}`+math.round(n,6):math.round(n,6))),
                    matrixAinv: matrixAinv.map(v=>v.map(n => math.round(n,6)))
                })
            }
        }

        for (let i = 0; i < matrixA[0].length; i++) {
            if(i>matrixA.length-1){
                continue;
            }
            matrixAinv[i] = matrixAinv[i].map(n => (n/matrixA[i][i]))
            let str = `R_${i+1}=R_${i+1}/${matrixA[i][i]}`
            matrixA[i][i] /= matrixA[i][i];
            result.push({
                Eliminat : str,
                matrixA: matrixA.map((v,z) => v.map((n,x) => z==i&&x==i?`\\color{red}`+math.round(n,6):math.round(n,6))),
                matrixAinv: matrixAinv.map(v=>v.map(n => math.round(n,6)))
            })
        }

        for (let i = 0; i < vectorB.length; i++) {
            let sum = 0;
            for (let j = 0; j < matrixAinv.length; j++) {
                sum += matrixAinv[i][j] * vectorB[j];
            }
            vectorX[i] = math.round(sum,12);
        }
        return ({
            request: "success",
            mode: "matrix_inversion_method",
            matrixA: mA,
            matrixAinv : matrixAinv.map(v=>v.map(n => math.round(n,6))),
            vectorB: vB,
            vectorX: vectorX,
            matrixI:matrixI,
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
            if (i > matrixA[0].length - 1) {
                continue;
            }
            for (let j = 0; j < matrixA[i].length; j++) {
                let str = ``;
                let backsub = ``;
                let sum = 0;
                for (let k = 0; k < matrixA[0].length; k++) {
                    if (k > matrixA.length - 1) {
                        continue;
                    }
                    sum += L[i][k] * U[k][j];
                    str += (L[i][k] * U[k][j] == 0 ? `` : ` - (${math.round(L[i][k], 6)})(${math.round(U[k][j], 6)})`);
                    backsub += (L[i][k] * U[k][j] == 0 ? `` : ` - L_{${i + 1},${k + 1}}U_{${k + 1},${j + 1}}`);
                }
                if (j <= i) {
                    L[i][j] = (matrixA[i][j] - sum) / U[i][i];
                    result.push({
                        LU : `L_{${i+1},${j+1}} = a_{${i+1},${j+1}}${backsub} = ${math.round(matrixA[i][j],6)}${str} = ${L[i][j]}`,
                    })
                } else {
                    U[i][j] = (matrixA[i][j] - sum) / L[i][i];
                    result.push({
                        LU : `U_{${i+1},${j+1}} = \\frac{a_{${i+1},${j+1}}${backsub}}{L_{${i+1},${i+1}}} = \\frac{${math.round(matrixA[i][j],6)} ${str}}{${math.round(L[i][i],6)}} = ${U[i][j]}`,
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
            vectorX[i] = math.round(vectorX[i], 12);
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
                let str ="";
                let backsub = "";
                let sum = 0;
                for (let k = 0; k < matrixA.length; k++) {
                    sum += L[i][k] * LT[k][j];
                    str+=(L[i][k] * LT[k][j]==0?"":` - (${math.round(L[i][k],6)})(${math.round(LT[k][j],6)})`);
                    backsub+=(L[i][k] * LT[k][j]==0?"":` - L_{${i+1},${k+1}}L_{${k+1},${j+1}}^t`);
                }
                if (i == j) {
                    LT[i][j] = math.sqrt(matrixA[i][j] - sum);
                    L[j][i] = LT[i][j];
                    result.push({
                        LT : `L_{${j+1},${i+1}} = \\sqrt{a_{${i+1},${j+1}}${backsub}} =\\sqrt{${math.round(matrixA[i][j],6)}${str}} = ${math.round(L[j][i],6)}`,
                    })
                } else {
                    LT[i][j] = (matrixA[i][j] - sum) / L[i][i];
                    L[j][i] = LT[i][j];
                    result.push({
                        LT : `L_{${j+1},${i+1}} = \\frac {a_{${i+1},${j+1}}${backsub}}{L_{${i+1},${i+1}}} = \\frac {${math.round(matrixA[i][j],6)}${str}}{${math.round(L[i][i],6)}} = ${math.round(L[j][i],6)}`,
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
            vectorX[i] = math.round(vectorX[i], 12);
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

//jacobi iteration
export function JacobiIteration(mA,vB,vX,Errors) {
    try {
        let matrixA = mA.map(v => v.map(n => n));
        let vectorB = vB.map(v => v);
        let vectorX = vX.map(v => v);
        let vectorxold;
        let round = 1;
        let result = [];
        let Error = [];
        let check = 0;
        const errors = Number(Errors);
        const backsub = [];
        
        for(let i=0;i<matrixA[0].length;i++){
            let str= ``;
            for (let j = 0; j < vectorX.length; j++) {
                if(i!=j&&matrixA[i][j]!=0){
                    str+=` - (${matrixA[i][j]})(x_${j+1}^k)`;
                }
            }
            str = `x_${i+1}^{k+1} = \\frac{${vectorB[i]}${str}}{${matrixA[i][i]}}`;
            backsub.push(str);
        }

        do{
            vectorxold = [...vectorX];
            for(let i=0;i<vectorX.length;i++){
                let temp = vectorxold[i];
                vectorxold[i]=0;
                vectorX[i]=(vectorB[i]-math.multiply(matrixA[i],vectorxold))/matrixA[i][i];
                vectorxold[i]=temp;
            }

            Error = [];
            check = 0;
            for(let i =0;i<vectorX.length;i++){
                Error.push(math.abs(vectorX[i]-vectorxold[i]))
                if(math.abs(vectorX[i]-vectorxold[i])>=errors){
                    check= 1;
                }
            }

            result.push({
                iter : round,
                vectorX : [...vectorX],
                errorX : Error
            })
            round++;
            if(round>1000){
                break;
            }
        }while(check==1);

        return ({
            request: "success",
            mode: "Jacobi_Iteration_Method",
            matrixA: mA,
            vectorB: vB,
            vectorX: math.round(vectorX,12),
            vectorXiter:vX,
            erroriter: Errors,
            backsub: backsub,
            result: result,
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "Jacobi_Iteration_Method",
            errors: error
        });
    }
}

//gauss seidel iteration
export function GaussSeidelIteration(mA,vB,vX,Errors) {
    try {
        let matrixA = mA.map(v => v.map(n => n));
        let vectorB = vB.map(v => v);
        let vectorX = vX.map(v => v);
        let vectorxold;
        let round = 1;
        let result = [];
        let Error = [];
        let check = 0;
        const errors = Number(Errors);
        const backsub = [];
        
        for(let i=0;i<matrixA.length;i++){
            let str= ``;
            for (let j = 0; j < vectorX.length; j++) {
                if(i!=j&&matrixA[i][j]!=0){
                    str+=` - (${matrixA[i][j]})(x_${j+1}^{k${j<=i?"+ 1":""}})`;
                }
            }
            str = `x_${i+1}^{k+1} = \\frac{${vectorB[i]}${str}}{${matrixA[i][i]}}`;
            backsub.push(str);
        }

        do{
            vectorxold = [...vectorX];
            for(let i=0;i<vectorX.length;i++){
                let temp = [...vectorX];
                temp[i]=0;
                vectorX[i]=(vectorB[i]-math.multiply(matrixA[i],temp))/matrixA[i][i];
            }

            Error = [];
            check = 0;
            for(let i =0;i<vectorX.length;i++){
                Error.push(math.abs(vectorX[i]-vectorxold[i]))
                if(math.abs(vectorX[i]-vectorxold[i])>=errors){
                    check= 1;
                }
            }

            result.push({
                iter : round,
                vectorX : [...vectorX],
                errorX : Error
            })
            round++;
            if(round>1000){
                break;
            }
        }while(check==1);

        return ({
            request: "success",
            mode: "Gauss-Seidel_Iteration_Method",
            matrixA: mA,
            vectorB: vB,
            vectorXiter:vX,
            vectorX: math.round(vectorX,12),
            erroriter: Errors,
            backsub: backsub,
            result: result,
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "Gauss-Seidel_Iteration_Method",
            errors: error
        });
    }
}

//conjugate gradient
export function ConjugateGradient(mA,vB,vX,Errors) {
    try {
        let matrixA = mA.map(v => v.map(n => n));
        let vectorB = vB.map(v => v);
        let vectorX = vX.map(v => v);
        let result = [];
        const errors = Number(Errors);
        let vectorR = math.subtract(math.multiply(matrixA, vectorX), vectorB);
        let vectorD = math.multiply(-1, vectorR);
        let round = 1;
        do {
            let lamda = -1 * (math.multiply(math.transpose(vectorD), vectorR)) / (math.multiply(math.multiply(math.transpose(vectorD), matrixA), vectorD));
            vectorX = math.add(vectorX, math.multiply(lamda, vectorD));
            vectorR = math.subtract(math.multiply(matrixA, vectorX), vectorB);
            let alp = math.multiply(math.multiply(math.transpose(vectorR), matrixA), vectorD) / math.multiply(math.multiply(math.transpose(vectorD), matrixA), vectorD);
            vectorD = math.subtract(vectorR, math.multiply(alp, vectorD));

            result.push({
                iter : round,
                vectorX : vectorX,
                errorX : [math.sqrt(math.multiply(math.transpose(vectorR), vectorR))]
            })

            round++;
        } while (math.sqrt(math.multiply(math.transpose(vectorR), vectorR)) >= errors);

        return ({
            request: "success",
            mode: "Conjugate_Gradient_Method",
            matrixA: mA,
            vectorB: vB,
            vectorXiter:vX,
            vectorX: math.round(vectorX,12),
            erroriter: Errors,
            result: result,
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "Conjugate_Gradient_Method",
            errors: error
        });
    }
}