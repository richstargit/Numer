import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useEffect, useState } from "react";

function DifferenceResult(props) {
    const result = props.result;

    const Requestdata = () => {
        if (result) {
            return (<>
                <div style={{ marginTop: "10px" }}>{result.mode} {result.Oh}</div>
                <BlockMath math={`f'(x) = ${result.result[0]} \\space\\space error = ${result.error[0]}\\%`}></BlockMath>
                <BlockMath math={`f''(x) = ${result.result[1]} \\space\\space error = ${result.error[1]}\\%`}></BlockMath>
                <BlockMath math={`f'''(x) = ${result.result[2]} \\space\\space error = ${result.error[2]}\\%`}></BlockMath>
                <BlockMath math={`f''''(x) = ${result.result[3]} \\space\\space error = ${result.error[3]}\\%`}></BlockMath>
            </>);
        }
    }


    return (
        <>
            <div style={{ width: "80%", background: "rgb(255, 255, 255)", height: "", margin: "auto", paddingTop: "10px", paddingBottom: "10px", marginTop: "15px", borderRadius: "15px", border: "2px solid #272829", marginBottom: "15px", overflowX: "auto" }}>
                <div style={{ fontSize: "22px" }}>Solution</div>
                {Requestdata()}
            </div>
        </>
    );
}

export default DifferenceResult