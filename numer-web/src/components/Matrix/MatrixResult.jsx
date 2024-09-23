import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useEffect, useState } from "react";

function Matrixmath(){
    const array = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    const [Mode,setMode] = useState(1);
    
    const matrixLatex = `\\begin{bmatrix} ${array.map(row => row.join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;
    const matrixLatexB = `\\begin{bmatrix} ${array.map(row => row.join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;
    const Result = `\\frac{${matrixLatex}}{${matrixLatex}} = \\frac{${matrixLatex}}{${matrixLatex}}`;
    return (
        <div style={{width:"80%",background:"rgb(255, 255, 255)",height:"",margin:"auto",paddingTop:"10px",paddingBottom:"10px",marginTop:"15px",borderRadius:"15px",border:"2px solid #272829"}}>
            <div style={{fontSize:"22px"}}>Result</div>
            <BlockMath math="x_1=1 , x_2 = 2" />
            <BlockMath math={Result} />
            <BlockMath math={Result} />
        </div>
    );
}

export default Matrixmath