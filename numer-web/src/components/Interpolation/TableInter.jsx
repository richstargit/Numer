import { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';

function TableInter() {

    const [NumberN, setNumberN] = useState("");
    const [NumberX, setNumberX] = useState("");
    const [TableValuesX, setTableValuesX] = useState([]);
    const [TableValuesY, setTableValuesY] = useState([]);
    const [ResultX, setResultX] = useState([]);
    const maxsize = 100;

    const changeNumber = async (event) => {
        setNumberN(event.target.value);
        setTableValuesX([]);
        setTableValuesY([]);
        if (event.target.value == "") {
            return;
        }
        const numbermatrix = parseInt(event.target.value);
        if (numbermatrix > 0 && numbermatrix <= maxsize) {
            const result = Array(numbermatrix).fill(0);
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

    const ChangeValueX = (i) => {

    }

    const ChangeValueY = (i) => {

    }

    const TableValue = (value) => {
        const result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(<div key={i} style={{ display: "flex", justifyContent: "center", marginTop: "15px", alignItems: "center", marginBottom: "15px" }}>
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} inputProps={{ 'aria-label': 'controlled' }} />
                <div style={{
                    width: "35px", height: "35px", textAlign: "center", border: "solid 3px rgb(39, 40, 41)", borderRadius: "10px", backgroundColor: "rgb(39, 40, 41)", display: 'flex', alignItems: 'center', fontSize: "18px"
                    , justifyContent: 'center', color: "rgb(255, 255, 255)"
                }}>{i + 1}</div>
                <input className="input-display" type="number" onChange={ChangeValueX(i)} value={NumberN} placeholder="X" style={{ marginLeft: "10px", marginRight: "10px", width: "150px" }} />
                <input className="input-display" type="number" onChange={ChangeValueY(i)} value={NumberN} placeholder="Y" style={{ marginLeft: "10px", marginRight: "10px", width: "150px" }} />
            </div>);
        }
        return result;
    }

    const TableValueX = (value) => {
        const result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(<span key={i}><input className="input-display" type="number" onChange={changeNumber} value={NumberN} placeholder="X1" style={{ marginLeft: "10px", marginRight: "10px", width: "80px" }} />,</span>);
        }
        return result;
    }

    return (
        <div>
            <div className="display-root-item" style={{ marginTop: "10px" }}>
                <div style={{ fontSize: "22px" }}>Size x,y</div>
                <input className="input-display" type="number" onChange={changeNumber} value={NumberN} placeholder="N" style={{ marginLeft: "10px", marginRight: "10px" }} />
            </div>

            <div style={{ marginTop: "15px", border: "solid 3px rgb(39, 40, 41)", borderRadius: "15px", width: "max-content", marginLeft: "auto", marginRight: "auto", minWidth: "50px" }}>
                {TableValue(TableValuesX)}
            </div>

            <div style={{ marginTop: "30px", fontSize: "22px", display: "flex", justifyContent: "center", alignItems: "center", width: "80%", marginLeft: "auto", marginRight: "auto" }}>Find <input className="input-display" type="number" onChange={changeNumberX} value={NumberX} placeholder="X" style={{ marginLeft: "10px", marginRight: "10px", width: "100px" }} />
                X = {'\{'} {(<div>{TableValueX(ResultX)}
                </div>)} {'\}'}</div>

        </div>
    )
}

export default TableInter