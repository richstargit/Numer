import "./Root.css"
import { useEffect, useState } from "react";
import Tables from '../Table/Tables'
import Graph from '../Graph/root_graph'
import Button from '@mui/material/Button';
import { CircularProgress,Box  } from '@mui/material';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import MathEquation from './MathEquation';
import RootData from "./DataRoot";
import {bisection, falseposition, graphical, newton, onepoint, secant} from "./rootcontroller";
import Swal from 'sweetalert2';

const Root_of_equations = ({ onDataChange }) =>{
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const modeselect = params.get("mode");
    const equationselect = params.get("equation");
    const xsselect = params.get("xs");
    const xeselect = params.get("xe");
    const errorselect = params.get("error");
    useEffect(() => {
        if (modeselect && equationselect) {
            setLoading(true);
            setTimeout(() => {
                sendRequest();
              }, 0);
        }
      }, [location]);
    const [Mode,setMode] = useState(modeselect||"");
    const [loading, setLoading] = useState(false);
    const [StrMode,setstrmode] = useState("");
    const [Sol,setSol] = useState(equationselect||"");
    const [XLs,setXl] = useState(xsselect||"");
    const [XRs,setXr] = useState(xeselect||"");
    const [Errors,setErrors] = useState(errorselect||"");
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

    const checksuccess = (result) =>{
        if(result.request=="success"){
            Swal.fire({
                title: "Success!",
                text: "You has been success.",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Save"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setLoading(true);
                    const response = await fetch('https://numer-api.vercel.app/api/rootsave', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({equation:Sol,
                            xl:XLs,
                            xr:XRs,
                            error:Errors,
                            mode:Mode,
                            iteration:result.iteration?result.iteration:"",
                            result:result.xresult}),
                      });
                      if(response.ok){
                        Swal.fire({
                            title: "Success!",
                            text: "You has been success.",
                            icon: "success"
                          });
                      }else{
                        Swal.fire({
                            title: "Error!",
                            text: "Please try again.",
                            icon: "error"
                          });
                      }
                      setLoading(false);
                }
            });
        }else{
            Swal.fire({
                title: "Error!",
                text: "Please check your equations.",
                icon: "error"
              });
        }
    }

    const sendRequest = async () => {
        setLoading(true);
        setTimeout(() => {
        try{
            let fx = Sol;
            let start = Number(XLs);
            let end = Number(XRs);
            let errors = Number(Errors);
            let xl = Number(XLs);
            let xr = Number(XRs);
            if(Mode=="graphical_method"){
                if(Sol==""||XLs==""||XRs==""||Errors==""){
                    Swal.fire({
                        title: "Error!",
                        text: "Please check your input.",
                        icon: "error"
                      });
                }else{
                const result = graphical(fx,start,end,errors);
                console.log(result)
                checksuccess(result);
                onDataChange(result);
            }
            }else if(Mode=="bisection_method"){
                if(Sol==""||XLs==""||XRs==""||Errors==""){
                    Swal.fire({
                        title: "Error!",
                        text: "Please check your input.",
                        icon: "error"
                      });
                }else{
                const result = bisection(fx,xl,xr,errors);
                console.log(result)
                checksuccess(result);
                onDataChange(result);
            }
            }else if(Mode=="false_position_method"){
                if(Sol==""||XLs==""||XRs==""||Errors==""){
                    Swal.fire({
                        title: "Error!",
                        text: "Please check your input.",
                        icon: "error"
                      });
                }else{
                const result = falseposition(fx,xl,xr,errors);
                console.log(result)
                checksuccess(result);
                onDataChange(result);
            }
            }else if(Mode=="one_point_iteration_method"){
                if(Sol==""||XLs==""||Errors==""){
                    Swal.fire({
                        title: "Error!",
                        text: "Please check your input.",
                        icon: "error"
                      });
                }else{
                const result = onepoint(fx,xl,errors);
                console.log(result)
                checksuccess(result);
                onDataChange(result);
            }
            }else if(Mode=="newton_raphson_method"){
                if(Sol==""||XRs==""||Errors==""){
                    Swal.fire({
                        title: "Error!",
                        text: "Please check your input.",
                        icon: "error"
                      });
                }else{
                const result = newton(fx,xr,errors);
                console.log(result)
                checksuccess(result);
                onDataChange(result);
            }
            }else if(Mode=="secant_method"){
                if(Sol==""||XLs==""||XRs==""||Errors==""){
                    Swal.fire({
                        title: "Error!",
                        text: "Please check your input.",
                        icon: "error"
                      });
                }else{
                const result = secant(fx,xl,xr,errors);
                console.log(result)
                checksuccess(result);
                onDataChange(result);
            }
            }
            setLoading(false);
        }catch(err){
          console.log(err)
          setLoading(false);
        }
        }, 0);
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
            {loading && (
        <Box
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <CircularProgress disableShrink />
        </Box>
      )}
            <div className="root-submit">
            <Button variant="contained" color="success" style={{background : "#04AA6D"}} onClick={sendRequest}>
                Submit
            </Button>
            </div>
            </>
    )
}

export default Root_of_equations