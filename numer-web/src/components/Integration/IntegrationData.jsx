import { useEffect, useState } from "react";
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function IntegrationData({onDataChange}){

    const [Mode,setMode] = useState("");
    const [NumberX0, setNumberX0] = useState("");
    const [NumberX1, setNumberX1] = useState("");

    const selectMethod = event => {
        setMode(event.target.value)
    }

    const ChangeX0 = event => {
        setNumberX0(event.target.value)
    }
    const ChangeX1 = event => {
        setNumberX1(event.target.value)
    }

    return(
        <div>
            <div className="select-display" style={{ marginBottom: "15px" }}>
                <select onChange={selectMethod} value={Mode}>
                    <option value="select">Select option</option>
                    <option value="trapezoidal_rule">Trapezoidal Rule</option>
                    <option value="composite_trapezoidal">Composite Trapezoidal Rule</option>
                    <option value="simpson_rule">Simpson's Rule</option>
                    <option value="composite_simpson">Composite Simpson's Rule</option>
                </select>

                <div style={{
                        height: "80px", background: "white", width: "fit-content", margin: "auto", borderRadius: "10px"
                        , minWidth: "150px", display: "flex", justifyContent: "center", marginTop: "15px", overflow: "hidden", maxWidth: "450px", paddingLeft: "15px", paddingRight: "15px"
                    }}>
                        <div><BlockMath math={`\\int_{${NumberX0?NumberX0:"a"}}^{${NumberX1?NumberX1:"b"}} ${"1+2"} \\space\\large dx`} /></div>
                </div>

                <span style={{marginRight:"10px"}}>f(x)</span><input className="input-display" style={{width:"200px",marginTop:"15px"}} type="text" placeholder="x^2-x-1" />

                <div style={{marginTop:"15px"}}>
                <span style={{marginLeft:"10px"}}>a</span><input className="input-display" type="number" onChange={ChangeX0} value={NumberX0}  placeholder="a" style={{ marginLeft: "5px", marginRight: "10px" }} />
                <span style={{marginLeft:"10px"}}>b</span><input className="input-display" type="number" onChange={ChangeX1} value={NumberX1} placeholder="b" style={{ marginLeft: "5px", marginRight: "10px" }} />
                </div>
            </div>
        </div>
    )
}

export default IntegrationData;