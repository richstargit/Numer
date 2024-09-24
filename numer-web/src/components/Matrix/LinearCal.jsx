import { create, all } from 'mathjs';

const math = create(all);
//cramer rule
export function CramerRule(matrixA,vectorB){
    try {
        let vectorX = [];
        let result=[];
        let detA = math.det(matrixA);
        if (detA == 0) {
            return ({
                request : "success",
                mode : "cramer_Rule",
                matrixA : matrixA,
                vectorB : vectorB,
                result : "det0"
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
                matrixXn : temp,
                detx : math.det(temp),
                x : vectorX[i]
            });
        }
        return ({
            request : "success",
            mode : "cramer_Rule",
            matrixA : matrixA,
            vectorB : vectorB,
            det : detA,
            vectorX : vectorX,
            result : result
        });

    }catch(error){
        console.log(error);
        return ({
            request : "failed",
            mode : "cramer_Rule",
            errors : error
        });
    }
}