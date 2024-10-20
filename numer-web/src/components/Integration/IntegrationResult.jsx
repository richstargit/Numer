import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useEffect, useState } from "react";

function IntegrationResult(props){
    const result = props.result;

    const Requestdata = () =>{
        if(result.mode=="trapezoidal_rule"||result.mode=="composite_trapezoidal"||result.mode=="simpson_rule"||result.mode=="composite_simpson"){
            return(<>
                <BlockMath math={`h = ${result.h}`}></BlockMath>
                {result.strfx.map((v,i)=>{
                    return(<BlockMath key={i} math={`${v}`}></BlockMath>);
                })}
                <BlockMath math={`I = ${result.str}`}></BlockMath>
                <BlockMath math={`I = ${result.solstr}`}></BlockMath>
                <BlockMath math={`I = ${result.result}`}></BlockMath>
            </>);
        }
    }


    return (
        <>
            <div style={{width:"80%",background:"rgb(255, 255, 255)",height:"",margin:"auto",paddingTop:"10px",paddingBottom:"10px",marginTop:"15px",borderRadius:"15px",border:"2px solid #272829",marginBottom:"15px",overflowX: "auto"}}>
                <div style={{fontSize:"22px"}}>Solution</div>
                {Requestdata()}
            </div>
        </>
    );
}

export default IntegrationResult