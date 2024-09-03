import "./Root.css"
import { useEffect, useState } from "react";
import Tables from '../Table/Tables'
import Graph from '../Graph/root_graph'
import Button from '@mui/material/Button';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import MathEquation from './MathEquation';
import RootData from "./DataRoot";
import {bisection, falseposition, graphical, newton, onepoint, secant} from "./rootcontroller";
import Swal from 'sweetalert2';

const Root_of_equations = ({ onDataChange }) =>{
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const modesclect = params.get("mode");

    const [Mode,setMode] = useState(modesclect||"");
    const [StrMode,setstrmode] = useState("");
    const [Sol,setSol] = useState("");
    const [XLs,setXl] = useState("");
    const [XRs,setXr] = useState("");
    const [Errors,setErrors] = useState("");
    const [DataResult,setData] = useState("");
    const solchange = event =>{
        setSol(event.target.value)
    }
    let result = (<div className="display-root-item">
        </div>)
    const selectMethod = event =>{
        setMode(event.target.value)
        if(event.target.value=="graphical_method"||event.target.value=="bisection_method"||event.target.value=="false_position_method"
            ||event.target.value=="newton_raphson_method"||event.target.value=="secant_method"){
            setstrmode("f(x) = ")
        }else if(event.target.value=="one_point_iteration_method"){
            setstrmode("X_{i+1} = ")
        }else{
            setstrmode("")
        }
    }

    const xlchange = event =>{
        setXl(event.target.value)
    }

    const xrchange = event =>{
        setXr(event.target.value)
    }

    const errorchange = event =>{
        setErrors(event.target.value)
    }

    const modedata = RootData.root_data
    const detailsMapped = modedata.filter(item => item.title == Mode)
    const datadetail = {
        xl :(
            <div className="display-root-item">
                <span className="display-root-text">XL</span>
                <input className="input-display" type="number" onChange={xlchange} value={XLs} placeholder="1.00"/>
                </div>
         ),
         xr: (
            <div className="display-root-item">
                <span className="display-root-text">XR</span>
                <input className="input-display" type="number" onChange={xrchange} value={XRs} placeholder="10.00"/>
                </div>
         ),
         error: (
            <div className="display-root-item">
                <span className="display-root-text">Error</span>
                <input className="input-display" type="number" onChange={errorchange} value={Errors} placeholder="0.000001"/>
                </div>
         ),
         xs: (
            <div className="display-root-item">
                <span className="display-root-text">X Start</span>
                <input className="input-display" type="number" onChange={xlchange} value={XLs} placeholder="1"/>
                </div>
         ),
         xe: (
            <div className="display-root-item">
                <span className="display-root-text">X End</span>
                <input className="input-display" type="number" onChange={xrchange} value={XRs} placeholder="10"/>
                </div>
         ),
         x1: (
            <div className="display-root-item">
                <span className="display-root-text">X1</span>
                <input className="input-display" type="number" onChange={xlchange} value={XLs} placeholder="1"/>
                </div>
         ),
         x0: (
            <div className="display-root-item">
                <span className="display-root-text">X0</span>
                <input className="input-display" type="number" onChange={xrchange} value={XRs} placeholder="1"/>
                </div>
         )
    }

    const sendRequest = async () => {
        try{
            let fx = Sol;
            let start = Number(XLs);
            let end = Number(XRs);
            let errors = Number(Errors);
            let xl = Number(XLs);
            let xr = Number(XRs);
            Swal.fire({
                title: "Success!",
                text: "You has been success.",
                icon: "success"
              });
            if(Mode=="graphical_method"){
                const result = graphical(fx,start,end,errors);
                onDataChange(result);
                console.log(result)
            }else if(Mode=="bisection_method"){
                const result = bisection(fx,xl,xr,errors);
                onDataChange(result);
            }else if(Mode=="false_position_method"){
                const result = falseposition(fx,xl,xr,errors)
                onDataChange(result);
            }else if(Mode=="one_point_iteration_method"){
                const result = onepoint(fx,xl,errors)
                  onDataChange(result);
            }else if(Mode=="newton_raphson_method"){
                const result = newton(fx,xr,errors)
                  onDataChange(result);
            }else if(Mode=="secant_method"){
                const result = secant(fx,xl,xr,errors)
                  onDataChange(result);
            }
            
        }catch(err){
          console.log(err)
        }
    }

    result = detailsMapped.length > 0 ? detailsMapped[0].details.map((item,index)=>{
        return(
            <div key={index}>
                {datadetail[item]}
                </div>
        )
    }) : (<div></div>);

    return(
            <>
            <h1 className="header-root">Root of equations</h1>
            <div className="select-display">
            <select onChange={selectMethod} value={Mode}>
                <option value="select">Select option</option>
                <option value="graphical_method">Graphical Method</option>
                <option value="bisection_method">Bisection Method</option>
                <option value="false_position_method">False-Position Method</option>
                <option value="one_point_iteration_method">One-Point iteration Method</option>
                <option value="newton_raphson_method">Newton-Raphson Method</option>
                <option value="secant_method">Secant Method</option>
            </select>
            </div>
            <div className="display-root-Sol">
                <span className="display-root-text" style={{height : "35px", marginTop : "-19px"}}><MathEquation math={StrMode.replace("=","")} /></span>
                <input className="input-display" type="text" onChange={solchange} value={Sol} placeholder="43x-180"/>
            </div>
            <div className="display-root">
                {result}
            </div>

            <div style={{height : "50px",background:"white",width : "fit-content",margin : "auto",borderRadius : "10px"
                ,minWidth : "150px",display : "flex",justifyContent : "center",marginTop : "15px",overflow:"hidden",maxWidth : "450px",paddingLeft : "15px",paddingRight : "15px"}}>
                <MathEquation math={StrMode+Sol} mode = {Mode} />
            </div>
            
            <div className="root-submit">
            <Button variant="contained" color="success" style={{background : "#04AA6D"}} onClick={sendRequest}>
                Submit
            </Button>
            </div>
            </>
    )
}

export default Root_of_equations