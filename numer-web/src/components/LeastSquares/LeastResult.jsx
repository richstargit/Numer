import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useEffect, useState } from "react";

function LeastResult(props){
    const result = props.result;

    return (
        <>
            <div style={{width:"80%",background:"rgb(255, 255, 255)",height:"",margin:"auto",paddingTop:"10px",paddingBottom:"10px",marginTop:"15px",borderRadius:"15px",border:"2px solid #272829",marginBottom:"15px"}}>
                <div style={{fontSize:"22px"}}>Solution</div>
            </div>
        </>
    );
}

export default LeastResult