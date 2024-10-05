import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useEffect, useState } from "react";

function InterResult(props){
    const result = props.result;

    const Requestdata = () =>{
        if(result.mode=="newton_divided"){
            return(<>{result.C.map((v,i)=>(<div key={i}><BlockMath math={`C_{${i+1}} = ${v}`}/></div>))}</>);
        }else if(result.mode=="spline"){
            return(<>{result.M.map((v,i)=>(<div key={i}><BlockMath math={`M_{${i+1}} = ${v}`}/></div>))}</>);
        }
    }


    return (
        <>
            <div style={{width:"80%",background:"rgb(255, 255, 255)",height:"",margin:"auto",paddingTop:"10px",paddingBottom:"10px",marginTop:"15px",borderRadius:"15px",border:"2px solid #272829",marginBottom:"15px"}}>
                <div style={{fontSize:"22px"}}>Solution</div>
                {Requestdata()}
            </div>
        </>
    );
}

export default InterResult