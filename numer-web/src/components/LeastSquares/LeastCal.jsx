import { create, all } from 'mathjs';

const math = create(all);

//simple_regression
export function SimpleRegression(xsend, y, xresult, order) {
    try {
        const X = math.number(xsend);
        const Y = math.number(y);
        const x = math.number(xresult);
        const M = math.number(order);
        const sumX = [];
        const Matrix = Array(M + 1).fill().map(() => Array(M + 1).fill(0));
        const Vector = Array(M + 1).fill(0);
        const result = [];
        const SumMul = (A, n) => {
            let sum = 0;
            for (let i = 0; i < A.length; i++) {
                sum += Math.pow(A[i], n);
            }
            return sum;
        }

        const SumXY = (y, x, n) => {
            let sum = 0;
            for (let i = 0; i < x.length; i++) {
                sum += Math.pow(x[i], n) * y[i];
            }
            return sum;
        }

        for (let i = 0; i < M * 2; i++) {
            sumX[i] = SumMul(X, i + 1);
        }
        for (let i = 0; i < M + 1; i++) {
            for (let j = 0 + i; j < M + 1; j++) {
                if (i == 0 && j == 0) {
                    Matrix[i][j] = X.length;
                } else if (i == j) {
                    Matrix[i][j] = sumX[i + j - 1];
                    console.log(i + j - 1)
                } else {
                    Matrix[i][j] = sumX[i + j - 1];
                    Matrix[j][i] = sumX[i + j - 1];
                }
            }
            Vector[i] = SumXY(Y, X, i);
        }

        const A = math.multiply(math.inv(Matrix), Vector);

        for (let r = 0; r < x.length; r++) {
            let sum = 0;
            for (let i = 0; i < M + 1; i++) {
                sum += A[i] * math.pow(x[r], i);
            }
            result.push({
                x: x[r],
                y: sum
            })
        }
        return ({
            request: "success",
            mode: "simple_regression",
            X: X,
            Y: Y,
            M: M,
            A: A,
            Matrix:Matrix,
            Vector:Vector,
            result: result
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "simple_regression",
            errors: error
        });
    }
}

//multiple linear regression
export function MultipleRegression(xsend, y, xresult) {
    try {
        const Xin = math.transpose(math.number(xsend));
        const X = [Array(Xin[0].length).fill(1), ...Xin];
        const Y = math.number(y)
        const x = math.number(xresult);
        const K = X.length;
        const Matrix = Array(K).fill().map(() => Array(K).fill(0));
        console.log(Matrix)
        const Vector = Array(K).fill(0);
        const result = []

        const SumAB = (A, B) => {
            let sum = 0;
            for (let i = 0; i < A.length; i++) {
                sum += A[i] * B[i];
            }
            return sum;
        }

        for (let i = 0; i < K; i++) {
            for (let j = 0 + i; j < K; j++) {
                if (i == 0 && j == 0) {
                    Matrix[i][j] = X[i].length;
                } else if (i == j) {
                    const sum = SumAB(X[i], X[j]);
                    Matrix[i][j] = sum;
                } else {
                    const sum = SumAB(X[i], X[j]);
                    Matrix[i][j] = sum;
                    Matrix[j][i] = sum;
                }
            }
            Vector[i] = SumAB(Y, X[i]);
        }

        const A = math.multiply(math.inv(Matrix), Vector);
        for (let r = 0; r < x.length; r++) {
            let sum = 0;
            for (let i = 0; i < K; i++) {
                sum += A[i] * (i - 1 < 0 ? 1 : x[r][i - 1]);
            }
            result.push({
                x: x[r],
                y: sum
            })
        }
        return ({
            request: "success",
            mode: "multiple_linear_regression",
            X: X,
            Y: Y,
            K: K,
            A: A,
            Matrix:Matrix,
            Vector:Vector,
            result: result
        });

    } catch (error) {
        console.log(error);
        return ({
            request: "failed",
            mode: "multiple_linear_regression",
            errors: error
        });
    }
}