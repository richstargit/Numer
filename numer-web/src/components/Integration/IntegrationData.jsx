import { useEffect, useState } from "react";
import { BlockMath } from 'react-katex';
import Button from '@mui/material/Button';
import 'katex/dist/katex.min.css';
import { CircularProgress,Box  } from '@mui/material';
import { useLocation } from 'react-router-dom';

function IntegrationData({onDataChange}){

    const [Mode,setMode] = useState("");
    const [NumberX0, setNumberX0] = useState("");
    const [NumberX1, setNumberX1] = useState("");
    const [Sol,setSol] = useState("");
    const [loading, setLoading] = useState(false);

    const selectMethod = event => {
        setMode(event.target.value)
    }

    const ChangeX0 = event => {
        setNumberX0(event.target.value)
    }
    const ChangeX1 = event => {
        setNumberX1(event.target.value)
    }
    const solchange = event =>{
        setSol(event.target.value)
    }

    const sendRequest = async () => {
        setLoading(true);
        setTimeout(() => {
        try{

            if(Mode=="trapezoidal_rule"){

            }
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
        }, 0);
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
                        <div><BlockMath math={`\\int_{${NumberX0?NumberX0:"a"}}^{${NumberX1?NumberX1:"b"}} ${Sol?Sol:"..."} \\space\\large dx`}/></div>
                </div>

                <span style={{marginRight:"10px"}}>f(x)</span><input className="input-display" style={{width:"200px",marginTop:"15px"}} onChange={solchange} value={Sol} type="text" placeholder="x^2-x-1" />

                <div style={{marginTop:"15px"}}>
                <span style={{marginLeft:"10px"}}>a</span><input className="input-display" type="number" onChange={ChangeX0} value={NumberX0}  placeholder="a" style={{ marginLeft: "5px", marginRight: "10px" }} />
                <span style={{marginLeft:"10px"}}>b</span><input className="input-display" type="number" onChange={ChangeX1} value={NumberX1} placeholder="b" style={{ marginLeft: "5px", marginRight: "10px" }} />
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
                </div>
            </div>
            <Button variant="contained" color="success" style={{ background: "#04AA6D", marginTop: "15px" }} onClick={sendRequest}>
                Submit
            </Button>
        </div>
    )
}

export default IntegrationData;