import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useEffect, useState } from "react";
import { row } from 'mathjs';

function LeastResult(props) {
    const result = props.result;

    const Requestdata = () => {
        if (result.request == "success") {
            if (result.mode == "simple_regression") {
                let sol = "f(x) = ";
                result.A.map((_, i) => { sol += `${i > 0 ? " + " : ""}a_{${i}}${i > 0 ? `x^{${i == 1 ? "" : i}}` : ""}` })
                return (<><BlockMath math={`\\begin{bmatrix} \\begin{array}{cc}${result.Matrix?result.Matrix.map(r=>r.join(`&`)).join(`\\\\`):""} \\end{array} \\begin{array}{|cc} ${result.Vector?result.Vector.join(`\\\\`):""} \\end{array} \\end{bmatrix}`} /> {result.A.map((v, i) => (<div key={i}><BlockMath math={`a_{${i}} = ${v}`} /></div>))}{<BlockMath math={sol} />}</>);
            } else if (result.mode == "multiple_linear_regression") {
                const x = result.A.map((_, i) => (`${i > 0 ? `x_${i}` : ""}`));
                let sol = `f(${x.slice(1).join(",")}) = `;
                result.A.map((_, i) => { sol += `${i > 0 ? " + " : ""}a_{${i}}${i > 0 ? `x_{${i == 1 ? "" : i}}` : ""}` })
                return (<><BlockMath math={`\\begin{bmatrix} \\begin{array}{cc}${result.Matrix?result.Matrix.map(r=>r.join(`&`)).join(`\\\\`):""} \\end{array} \\begin{array}{|cc} ${result.Vector?result.Vector.join(`\\\\`):""} \\end{array} \\end{bmatrix}`} /> {result.A.map((v, i) => (<div key={i}><BlockMath math={`a_{${i}} = ${v}`} /></div>))}{<BlockMath math={sol} />}</>);
            }
        }
    }

    return (
        <>
            <div style={{ width: "80%", background: "rgb(255, 255, 255)", height: "", margin: "auto", paddingTop: "10px", paddingBottom: "10px", marginTop: "15px", borderRadius: "15px", border: "2px solid #272829", marginBottom: "15px" }}>
                <div style={{ fontSize: "22px" }}>Solution</div>
                {Requestdata()}
            </div>
        </>
    );
}

export default LeastResult