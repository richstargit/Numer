import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useEffect, useState } from "react";

function MatrixResult(props){
    const array = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    const result = props.result;

    const CramerRule = (result) =>{
        const data = result.result.map((v,i)=>{
            const matrixAX= `\\left| \\begin{array}{cc} ${v.matrixXn.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array} \\right|`;
            const Result = `x_${i} = \\frac{${matrixAX}}{${result.det}}=\\frac{${v.detx}}{${result.det}}=${v.x}`
            return (<BlockMath math={Result} key={i}/>)
        })
        return data
    }
    const GaussElimination = (result) =>{
        const data = result.result.map((v,i)=>{
            const matrixAB = `\\begin{bmatrix} \\begin{array}{cc} ${v.matrixA.map(row => row.join(' & ')).join(' \\\\ ')} \\end{array} 
            \\begin{array}{cc} ${v.vectorB.map(row => "|").join(' \\\\ ')} \\end{array}
             \\begin{array}{cc} ${v.vectorB.map(row => row).join(' \\\\ ')} \\end{array}   \\end{bmatrix} `;
            const Result = `${v.Eliminat}=> ${matrixAB}`
            return (<BlockMath math={Result} key={i}/>)
        })
        return data
    }

    const Requestdata = () =>{
        console.log(result)
        if(result.mode=="cramer_Rule"){
            if(result.result=="det0"){
                return(<div>det(A) = 0</div>)
            }
            return (<>
            <div style={{fontSize:"16px",display:"flex",justifyContent:"center"}}>{result.vectorX.map((v,i)=>{
                return (<div style={{marginLeft:"12px",marginRight:"12px"}} key={i}><BlockMath math={`x_${i+1} = ${v}`}/></div>)
            })}</div>
            <div>det = {result.det}</div>
            <div>{CramerRule(result)}</div>
            </>);
        }else if(result.mode=="gauss_elimination_method"){
            return(<><div style={{fontSize:"16px",display:"flex",justifyContent:"center"}}>{result.vectorX.map((v,i)=>{
                return (<div style={{marginLeft:"12px",marginRight:"12px"}} key={i}><BlockMath math={`x_${i+1} = ${v}`}/></div>)
            })}</div>
            <div>{GaussElimination(result)}</div>
            <div>{result.backsub.map((v,i)=>{
                return(<BlockMath math={v} key={i}/>)
            })}</div></>)
        }
        return (<div></div>);
    }
    return (
        <div style={{width:"80%",background:"rgb(255, 255, 255)",height:"",margin:"auto",paddingTop:"10px",paddingBottom:"10px",marginTop:"15px",borderRadius:"15px",border:"2px solid #272829"}}>
            <div style={{fontSize:"22px"}}>Result</div>
            {result.request=="success"?Requestdata():(<div></div>)}
        </div>
    );
}

export default MatrixResult