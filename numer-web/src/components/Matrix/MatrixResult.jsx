import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useEffect, useState } from "react";
import LinearIterationTable from './LinearIterationTable';
import ConjugateGraph from './ConjugateGraph';

function MatrixResult(props){
    const array = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    const result = props.result;

    const CramerRule = (result) =>{
        const data = result.result.map((v,i)=>{
            const matrixAX= `\\left| \\begin{array}{cc} ${v.matrixXn.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array} \\right|`;
            const Result = `x_${i} = \\frac{detA_${i+1}}{detA} = \\frac{${matrixAX}}{${result.det}}=\\frac{${v.detx}}{${result.det}}=${v.x}`
            return (<div style={{marginTop:"35px"}} key={i}><BlockMath math={Result} /></div>)
        })
        return data
    }

    const GaussElimination = (result) =>{
        const data = result.result.map((v,i)=>{
            const matrixAB = `\\begin{bmatrix} \\begin{array}{cc} ${v.matrixA.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array} 
            \\begin{array}{|cc} ${v.vectorB.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
            const Result = `${v.Eliminat} \\Longrightarrow ${matrixAB}`
            return (<div style={{marginTop:"35px"}} key={i}><BlockMath math={Result} /></div>)
        })
        return data
    }

    const GaussJordan = (result) =>{
        const data = result.result.map((v,i)=>{
            const matrixAB = `\\begin{bmatrix} \\begin{array}{cc} ${v.matrixA.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array} 
             \\begin{array}{|cc} ${v.vectorB.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
            const Result = `${v.Eliminat} \\Longrightarrow ${matrixAB}`
            return (<div style={{marginTop:"35px"}} key={i}><BlockMath math={Result} /></div>)
        })
        return data;
    }

    const MatrixInv = (result) =>{
        const matrixAInv = `\\begin{bmatrix} \\begin{array}{cc} ${result.matrixAinv.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const vectorB = `\\begin{bmatrix} \\begin{array}{cc} ${result.vectorB.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const vectorX = `\\begin{bmatrix} \\begin{array}{cc} ${result.vectorX.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const invxX = `${matrixAInv} X ${vectorB} = ${vectorX}`
        const data = result.result.map((v,i)=>{
            const matrixAInv = `\\begin{bmatrix} \\begin{array}{cc} ${v.matrixA.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array} 
             \\begin{array}{|cc} ${v.matrixAinv.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
            const Result = `${v.Eliminat} \\Longrightarrow ${matrixAInv}`
            return (<div style={{marginTop:"35px"}} key={i}><BlockMath math={Result} /></div>)
        })
        return (<>
        <div>{data}</div>
        <div style={{ marginTop: "35px" }}><BlockMath math={invxX}/></div>
        </>);
    }

    const LuDecomposition = (result) =>{
        const matrixL = `\\begin{bmatrix} \\begin{array}{cc} ${result.matrixL.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const matrixU = `\\begin{bmatrix} \\begin{array}{cc} ${result.matrixU.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const vectorY = `\\begin{bmatrix} \\begin{array}{cc} ${result.vectorY.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const vectorX = `\\begin{bmatrix} \\begin{array}{cc} ${result.vectorX.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const vectorB = `\\begin{bmatrix} \\begin{array}{cc} ${result.vectorB.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const data = result.result.map((v,i)=>{
            return (<div style={{marginTop:"35px"}} key={i}><BlockMath math={v.LU} /></div>)
        })
        return(<>
            <div>{data}</div>
            <div style={{display:"flex",justifyContent:"center",marginTop:"30px"}}>
                <div>
                    <div>L</div>
                    <BlockMath math={`${matrixL}`}/>
                </div>
                <div>
                <div>U</div>
                <BlockMath math={`${matrixU}`}/>
                </div>
            </div>
            <div style={{ marginTop: "35px" }}><BlockMath math={`[L][Y] = [B] \\Longrightarrow ${matrixL} X ${`\\begin{bmatrix} \\begin{array}{cc} ${result.vectorY.map((v,i) => `Y_${i+1}`).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `}
             = ${vectorB}`}/></div>
             <div style={{ marginTop: "35px" }}><BlockMath math={`${`\\begin{bmatrix} \\begin{array}{cc} ${result.vectorY.map((v,i) => `Y_${i+1}`).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `}
             = ${vectorY}`}/></div>
             <div style={{ marginTop: "35px" }}><BlockMath math={`[U][X] = [Y] \\Longrightarrow ${matrixU} X ${`\\begin{bmatrix} \\begin{array}{cc} ${result.vectorX.map((v,i) => `X_${i+1}`).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `}
             = ${vectorY}`}/></div>
             <div style={{ marginTop: "35px" }}><BlockMath math={`${`\\begin{bmatrix} \\begin{array}{cc} ${result.vectorX.map((v,i) => `X_${i+1}`).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `}
             = ${vectorX}`}/></div>
            </>)
    }

    const CholeskyDecomposition = (result) =>{
        const matrixL = `\\begin{bmatrix} \\begin{array}{cc} ${result.matrixL.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const matrixLT = `\\begin{bmatrix} \\begin{array}{cc} ${result.matrixLT.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const vectorY = `\\begin{bmatrix} \\begin{array}{cc} ${result.vectorY.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const vectorX = `\\begin{bmatrix} \\begin{array}{cc} ${result.vectorX.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const vectorB = `\\begin{bmatrix} \\begin{array}{cc} ${result.vectorB2.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
        const data = result.result.map((v,i)=>{
            return (<div style={{marginTop:"35px"}} key={i}><BlockMath math={v.LT} /></div>)
        })
        return(<>
            <div>{data}</div>
            <div style={{display:"flex",justifyContent:"center",marginTop:"30px"}}>
                <div>
                    <div><BlockMath math={`L`}/></div>
                    <BlockMath math={`${matrixL}`}/>
                </div>
                <div>
                <div><BlockMath math={`L^t`}/></div>
                <BlockMath math={`${matrixLT}`}/>
                </div>
            </div>
            <div style={{ marginTop: "35px" }}><BlockMath math={`[L][Y] = [B] \\Longrightarrow ${matrixL} X ${`\\begin{bmatrix} \\begin{array}{cc} ${result.vectorY.map((v,i) => `Y_${i+1}`).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `}
             = ${vectorB}`}/></div>
             <div style={{ marginTop: "35px" }}><BlockMath math={`${`\\begin{bmatrix} \\begin{array}{cc} ${result.vectorY.map((v,i) => `Y_${i+1}`).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `}
             = ${vectorY}`}/></div>
             <div style={{ marginTop: "35px" }}><BlockMath math={`[L^t][X] = [Y] \\Longrightarrow ${matrixLT} X ${`\\begin{bmatrix} \\begin{array}{cc} ${result.vectorX.map((v,i) => `X_${i+1}`).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `}
             = ${vectorY}`}/></div>
             <div style={{ marginTop: "35px" }}><BlockMath math={`${`\\begin{bmatrix} \\begin{array}{cc} ${result.vectorX.map((v,i) => `X_${i+1}`).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `}
             = ${vectorX}`}/></div>
            </>)
    }

    const JacobiIteration = (result) =>{
        return result.backsub.map((v,i)=>(<BlockMath math={v} key={i}></BlockMath>))
    }

    const GaussSeidelIteration = (result) =>{
        return result.backsub.map((v,i)=>(<BlockMath math={v} key={i}></BlockMath>))
    }

    const ConjugateGradient = (result) =>{
        
    }

    const Requestdata = () => {
        console.log(result)
        if (result.mode == "cramer_Rule") {
            if (result.result == "det0") {
                return (<div>det(A) = 0</div>)
            }
            return (<>
                <div style={{ marginTop: "10px", fontSize: "18px" }}>detA = {result.det}</div>
                <div>{CramerRule(result)}</div>
            </>);
        } else if (result.mode == "gauss_elimination_method") {
            return (<>
                <div style={{ marginTop: "35px" }}><BlockMath math={`\\begin{bmatrix} \\begin{array}{cc} ${result.matrixA.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array} 
                \\begin{array}{|cc} ${result.vectorB.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `} /></div>
                <div>{GaussElimination(result)}</div>
                <div>{result.backsub.map((v, i) => {
                    return (<div style={{ marginTop: "35px" }} key={i}><BlockMath math={v} /></div>)
                })}</div></>)
        } else if (result.mode == "gauss_jordan_Method") {
            return (<>
            <div style={{ marginTop: "35px" }}><BlockMath math={`\\begin{bmatrix} \\begin{array}{cc} ${result.matrixA.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array} 
                \\begin{array}{|cc} ${result.vectorB.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `} /></div>
                <div>{GaussJordan(result)}</div>
            </>)
        } else if (result.mode == "matrix_inversion_method") {
            return(<>
            <div style={{ marginTop: "35px" }}><BlockMath math={`\\begin{bmatrix} \\begin{array}{cc} ${result.matrixA.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array} 
                \\begin{array}{|cc} ${result.matrixI.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `} /></div>
            {MatrixInv(result)}
            </>)
        }else if(result.mode == "LU_Decomposition_Method"){
            return(<>
            {LuDecomposition(result)}
            </>)
        }else if(result.mode == "Cholesky_Decomposition_Method"){
            return(<>
            {CholeskyDecomposition(result)}
            </>)
        }else if(result.mode == "Jacobi_Iteration_Method"){
            return(<>
            {JacobiIteration(result)}
            </>)
        }else if(result.mode == "Gauss-Seidel_Iteration_Method"){
            return(<>
            {GaussSeidelIteration(result)}
            </>)
        }else if(result.mode == "Conjugate_Gradient_Method"){
            return(<>
            {ConjugateGradient(result)}
            </>)
        }
        return (<div></div>);
    }

    const SelectMode = () => {
        if(result.mode=="Jacobi_Iteration_Method"||result.mode=="Gauss-Seidel_Iteration_Method"){
            return(<>
            <div style={{width:"80%",background:"rgb(255, 255, 255)",height:"",margin:"auto",paddingTop:"10px",paddingBottom:"10px",marginTop:"15px",borderRadius:"15px",border:"2px solid #272829"}}>
                <div style={{fontSize:"22px"}}>Solution</div>
                {result.request=="success"?Requestdata():(<div></div>)}
            </div>
            <div style={{marginTop:"35px",width:"80%",marginLeft:"auto",marginRight:"auto"}}><LinearIterationTable result={result}/></div></>)
        }else if(result.mode=="Conjugate_Gradient_Method"){
            return(<>
                <ConjugateGraph result={result}/>
                {Requestdata()}
            <div style={{marginTop:"35px",width:"80%",marginLeft:"auto",marginRight:"auto"}}><LinearIterationTable result={result}/></div>
            </>)
        }else{
            return(<div style={{width:"80%",background:"rgb(255, 255, 255)",height:"",margin:"auto",paddingTop:"10px",paddingBottom:"10px",marginTop:"15px",borderRadius:"15px",border:"2px solid #272829"}}>
                <div style={{fontSize:"22px"}}>Solution</div>
                {result.request=="success"?Requestdata():(<div></div>)}
            </div>)
        }
    }

    return (
        <>
            <div style={{ width: "max-content", height: "max-content", background: "rgb(255, 217, 51)", marginLeft: "auto", marginRight: "auto", marginTop: "10px", minWidth: "350px", border: "solid 5px rgb(39, 40, 41)", borderRadius: "15px", padding: "5px 5px 5px 5px" }}>
                <div style={{ width: "100%", background: "rgb(255, 255, 255)", height: "100%", borderRadius: "10px", alignItems: "center", fontSize: "18px", padding: "15px" }}>
                    <div>Result</div>
                    <div style={{ display: "flex",justifyContent:"center" }}>{result.vectorX ? result.vectorX.map((v, i) => {
                        return (<div style={{ marginLeft: "12px", marginRight: "12px" }} key={i}><BlockMath math={`x_{${i + 1}} = ${v}`} /></div>)
                    }) : ""}</div>
                </div>
            </div>
            {SelectMode()}
        </>
    );
}

export default MatrixResult