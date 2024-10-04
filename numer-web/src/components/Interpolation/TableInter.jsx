import { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { CircularProgress,Box  } from '@mui/material';
import { Lagrange, NewtonDivided, Spline } from "./InterCal";

function TableInter({ onDataChange }) {

    const [NumberN, setNumberN] = useState("");
    const [NumberX, setNumberX] = useState("");
    const [TableValuesX, setTableValuesX] = useState([]);
    const [TableValuesY, setTableValuesY] = useState([]);
    const [TableChecked, setTableChecked] = useState([]);
    const [ResultX, setResultX] = useState([]);
    const [Mode,setMode] = useState("");
    const [loading, setLoading] = useState(false);
    const maxsize = 100;

    const changeNumber = async (event) => {
        setNumberN(event.target.value);
        setTableValuesX([]);
        setTableValuesY([]);
        setTableChecked([]);
        if (event.target.value == "") {
            return;
        }
        const numbermatrix = parseInt(event.target.value);
        if (numbermatrix > 0 && numbermatrix <= maxsize) {
            const result = Array(numbermatrix).fill(0);
            const check = Array(numbermatrix).fill(false);
            setTableChecked(check);
            setTableValuesX(result);
            setTableValuesY(result);
        }
    }

    const changeNumberX = async (event) => {
        setNumberX(event.target.value);
        setResultX([]);
        setResultX([]);
        if (event.target.value == "") {
            return;
        }
        const numbermatrix = parseInt(event.target.value);
        if (numbermatrix > 0 && numbermatrix <= maxsize) {
            const result = Array(numbermatrix).fill(0);
            setResultX(result);
            setResultX(result);
        }
    }

    const ChangeValueX = (i,event) => {
        setTableValuesX(prevValues => {
            const newValues = prevValues.map(row=>row);
            newValues[i] = event.target.value?event.target.value:"";
            return newValues;
            });
    }

    const ChangeValueY = (i,event) => {
        setTableValuesY(prevValues => {
            const newValues = prevValues.map(row=>row);
            newValues[i] = event.target.value?event.target.value:"";
            return newValues;
            });
    }

    const ChangeResultX = (i,event) => {
        setResultX(prevValues => {
            const newValues = prevValues.map(row=>row);
            newValues[i] = event.target.value?event.target.value:"";
            return newValues;
            });
    }

    const ChangeCheck = (i,event) => {
        setTableChecked(prevValues => {
            const newValues = prevValues.map(row=>row);
            newValues[i] = event.target.checked?event.target.checked:false;
            return newValues;
            });
    }

    const selectMethod = event =>{
        setMode(event.target.value)
    }

    const TableValue = (value) => {
        const result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(<div key={i} style={{ display: "flex", justifyContent: "center", marginTop: "15px", alignItems: "center", marginBottom: "15px" }}>
                <Checkbox checked={TableChecked[i]} onChange={(event)=>ChangeCheck(i,event)} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} inputProps={{ 'aria-label': 'controlled' }} />
                <div style={{
                    width: "35px", height: "35px", textAlign: "center", border: "solid 3px rgb(39, 40, 41)", borderRadius: "10px", backgroundColor: "rgb(39, 40, 41)", display: 'flex', alignItems: 'center', fontSize: "18px"
                    , justifyContent: 'center', color: "rgb(255, 255, 255)"
                }}>{i + 1}</div>
                <input className="input-display" type="number" onChange={(event)=>ChangeValueX(i,event)} value={TableValuesX[i]} placeholder="X" style={{ marginLeft: "10px", marginRight: "10px", width: "150px" }} />
                <input className="input-display" type="number" onChange={(event)=>ChangeValueY(i,event)} value={TableValuesY[i]} placeholder="Y" style={{ marginLeft: "10px", marginRight: "10px", width: "150px" }} />
            </div>);
        }
        return result;
    }

    const TableResultX = (value) => {
        const result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(<span key={i}><input className="input-display" type="number" onChange={(event)=>ChangeResultX(i,event)} value={ResultX[i]} placeholder={"X"+(i+1)} style={{ marginLeft: "10px", marginRight: "10px", width: "80px" }} />,</span>);
        }
        return result;
    }

    const checksuccess = (result) =>{
        if(result.request=="success"){
            Swal.fire({
                title: "Success!",
                text: "You has been success.",
                icon: "success"
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
        const Xsend = [];
        const Ysend = [];
        TableChecked.map((v,i)=>{
            if(v==true){
                Xsend.push(TableValuesX[i]);
                Ysend.push(TableValuesY[i]);
            }
        })
        console.log({x:Xsend,y:Ysend,xsol:ResultX});
        setLoading(true);
        setTimeout(() => {
        try{

            if(Mode=="newton_divided"){
                const result = NewtonDivided(Xsend,Ysend,ResultX);
                checksuccess(result);
                onDataChange(result);
                console.log(result)
            }else if(Mode=="lagrange_interpolation"){
                const result = Lagrange(Xsend,Ysend,ResultX);
                checksuccess(result);
                onDataChange(result);
            }else if(Mode=="spline"){
                const result = Spline(Xsend,Ysend,ResultX);
                console.log(result)
                checksuccess(result);
                onDataChange(result);
            }
            setLoading(false);
        }catch(err){
            console.log(err);
            setLoading(false);
        }
        }, 0);
    }

    return (
        <div>
            <div className="select-display" style={{marginBottom:"15px"}}>
            <select onChange={selectMethod} value={Mode}>
                <option value="select">Select option</option>
                <option value="newton_divided">Newton Divided-Differnces</option>
                <option value="lagrange_interpolation">Lagrange Interpolation</option>
                <option value="spline">Spline</option>
            </select>
            </div>
            <div className="display-root-item" style={{ marginTop: "10px" }}>
                <div style={{ fontSize: "22px" }}>Size x,y</div>
                <input className="input-display" type="number" onChange={changeNumber} value={NumberN} placeholder="N" style={{ marginLeft: "10px", marginRight: "10px" }} />
            </div>

            <div style={{ marginTop: "15px", border: "solid 3px rgb(39, 40, 41)", borderRadius: "15px", width: "max-content", marginLeft: "auto", marginRight: "auto", minWidth: "50px" }}>
                {TableValue(TableValuesX)}
            </div>

            <div style={{ marginTop: "30px", fontSize: "22px", display: "flex", justifyContent: "center", alignItems: "center", width: "80%", marginLeft: "auto", marginRight: "auto" }}>Find <input className="input-display" type="number" onChange={changeNumberX} value={NumberX} placeholder="X" style={{ marginLeft: "10px", marginRight: "10px", width: "100px" }} />
                X = {'\{'} {(<div>{TableResultX(ResultX)}
                </div>)} {'\}'}</div>
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
            <Button variant="contained" color="success" style={{background : "#04AA6D",marginTop:"15px"}} onClick={sendRequest}>
                Submit
            </Button>
        </div>
    )
}

export default TableInter