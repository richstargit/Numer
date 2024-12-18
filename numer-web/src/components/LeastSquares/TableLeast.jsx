import { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { CircularProgress, Box } from '@mui/material';
import { matrix, mode } from "mathjs";
import { MultipleRegression, SimpleRegression } from "./LeastCal";
import { useLocation } from 'react-router-dom';
import { create, all } from 'mathjs';

const math = create(all);

function TableLeast({ onDataChange }) {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const modeselect = params.get("mode");
    const Nselect = params.get("nsize");
    const Xselect = params.get("xsize");
    const Mselect = params.get("msize");
    const Kselect = params.get("ksize");
    const TableX = params.get("tablex");
    const TableXK = params.get("tablexk");
    const TableY = params.get("tabley");
    const Rex = params.get("resultx");
    const Rexk = params.get("resultxk");
    const TableCheck = params.get("check");

    const [NumberN, setNumberN] = useState(Nselect || "");
    const [NumberX, setNumberX] = useState(Xselect || "");
    const [OrderM, setOrderM] = useState(Mselect || "");
    const [NumberK, setNumberK] = useState(Kselect || "");
    const [TableValuesX, setTableValuesX] = useState(JSON.parse(TableX) || []);
    const [TableValuesXK, setTableValuesXK] = useState(JSON.parse(TableXK) || []);
    const [TableValuesY, setTableValuesY] = useState(JSON.parse(TableY) || []);
    const [TableChecked, setTableChecked] = useState(JSON.parse(TableCheck) || []);
    const [ResultX, setResultX] = useState(JSON.parse(Rex) || []);
    const [ResultXK, setResultXK] = useState(JSON.parse(Rexk) || []);
    const [Mode, setMode] = useState(modeselect || "");
    const [loading, setLoading] = useState(false);
    const maxsize = 100;

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            sendRequest();
        }, 0);
    }, [location]);

    const changeNumber = async (event) => {
        setNumberN(event.target.value);
        setTableValuesX([]);
        setTableValuesY([]);
        setTableChecked([]);
        setTableValuesXK([]);
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
            console.log(NumberK)
            setTableValuesXK(Array(numbermatrix).fill().map(() => Array(Number(NumberK)).fill(0)));
        }
    }

    const changeNumberX = async (event) => {
        setNumberX(event.target.value);
        setResultX([]);
        setResultXK([]);
        if (event.target.value == "") {
            return;
        }
        const numbermatrix = parseInt(event.target.value);
        if (numbermatrix > 0 && numbermatrix <= maxsize) {
            const result = Array(numbermatrix).fill(0);
            setResultX(result);
            setResultXK(Array(numbermatrix).fill().map(() => Array(Number(NumberK)).fill(0)))
        }
    }

    const changeOrderX = (event) => {
        setOrderM(event.target.value);
    }

    const changeNumberK = (n, event) => {
        setNumberK(event.target.value);
        setTableValuesXK([]);
        setResultXK([]);
        if (event.target.value == "" || n <= 0) {
            return;
        }
        const numbermatrix = parseInt(event.target.value);
        const N = parseInt(n);
        if (numbermatrix > 0 && numbermatrix <= maxsize && N > 0 && N <= maxsize) {
            const result = Array(N).fill().map(() => Array(numbermatrix).fill(0));
            setTableValuesXK(result);
            const resultxk = Array(parseInt(NumberX ? NumberX : 0)).fill().map(() => Array(numbermatrix).fill(0));
            setResultXK(resultxk)
        }
    }

    const ChangeValueX = (i, event) => {
        setTableValuesX(prevValues => {
            const newValues = prevValues.map(row => row);
            newValues[i] = event.target.value ? event.target.value : "";
            return newValues;
        });
    }

    const ChangeValueXK = (i, j, event) => {
        setTableValuesXK(prevValues => {
            const newValues = prevValues.map(row => row);
            newValues[i][j] = event.target.value ? event.target.value : "";
            return newValues;
        });
    }

    const ChangeResultXK = (i, j, event) => {
        setResultXK(prevValues => {
            const newValues = prevValues.map(row => row);
            newValues[i][j] = event.target.value ? event.target.value : "";
            return newValues;
        });
    }

    const ChangeValueY = (i, event) => {
        setTableValuesY(prevValues => {
            const newValues = prevValues.map(row => row);
            newValues[i] = event.target.value ? event.target.value : "";
            return newValues;
        });
    }

    const ChangeResultX = (i, event) => {
        setResultX(prevValues => {
            const newValues = prevValues.map(row => row);
            newValues[i] = event.target.value ? event.target.value : "";
            return newValues;
        });
    }

    const ChangeCheck = (i, event) => {
        setTableChecked(prevValues => {
            const newValues = prevValues.map(row => row);
            newValues[i] = event.target.checked ? event.target.checked : false;
            return newValues;
        });
    }

    const selectMethod = event => {
        setMode(event.target.value)
    }

    const MultipleX = (n, i) => {
        const result = [];
        for (let j = 0; j < n; j++) {
            result.push(<span style={{ marginLeft: "10px" }} key={i + "" + j}>X{j + 1}<input className="input-display" type="number" onChange={(event) => ChangeValueXK(i, j, event)} value={TableValuesXK[i] ? TableValuesXK[i][j] : ""} placeholder="X" style={{ marginLeft: "10px", marginRight: "10px", width: "100px" }} /></span>)
        }
        return result;
    }

    const MultipleResult = (n, i) => {
        const result = [];
        for (let j = 0; j < n; j++) {
            result.push(<input key={i + "" + j} className="input-display" type="number" onChange={(event) => ChangeResultXK(i, j, event)} value={ResultXK[i] ? ResultXK[i][j] : ""} placeholder={"X" + (i + 1) + "," + (j + 1)} style={{ marginLeft: "10px", marginRight: "10px", width: "80px" }} />)
        }
        return result;
    }

    const TableValue = (value, mode) => {
        const result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(<div key={i} style={{ display: "flex", marginTop: "15px", alignItems: "center", marginBottom: "15px" }}>
                <Checkbox checked={TableChecked[i]} onChange={(event) => ChangeCheck(i, event)} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} inputProps={{ 'aria-label': 'controlled' }} />
                <div style={{
                    width: "35px", height: "35px", textAlign: "center", border: "solid 3px rgb(39, 40, 41)", borderRadius: "10px", backgroundColor: "rgb(39, 40, 41)", display: 'flex', alignItems: 'center', fontSize: "18px"
                    , justifyContent: 'center', color: "rgb(255, 255, 255)"
                }}>{i + 1}</div>
                {mode == "multiple_linear_regression" ? MultipleX(NumberK, i) : (<><span style={{ marginLeft: "10px" }}>X</span><input className="input-display" type="number" onChange={(event) => ChangeValueX(i, event)} value={TableValuesX[i]} placeholder="X" style={{ marginLeft: "10px", marginRight: "10px", width: "150px" }} /></>)}

                <span>Y</span><input className="input-display" type="number" onChange={(event) => ChangeValueY(i, event)} value={TableValuesY[i]} placeholder="Y" style={{ marginLeft: "10px", marginRight: "10px", width: "150px" }} />
            </div>);
        }
        if (mode == "simple_regression") {
            return (<>
                <div className="display-root-item" style={{ marginTop: "10px" }}>
                    <div style={{ fontSize: "18px" }}>Order</div>
                    <input className="input-display" type="number" onChange={changeOrderX} value={OrderM} placeholder="M" style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }} />
                </div>
                {result}</>);
        } else if (mode == "multiple_linear_regression") {
            return (<>
                <div className="display-root-item" style={{ marginTop: "10px" }}>
                    <div style={{ fontSize: "18px" }}>Number X</div>
                    <input className="input-display" type="number" onChange={(event) => changeNumberK(value.length, event)} value={NumberK} placeholder="K" style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }} />
                </div>
                {result}</>);
        }
        return result;
    }

    const TableResultX = (value, mode) => {
        const result = [];
        for (let i = 0; i < value.length; i++) {
            result.push(<span key={i}>{mode == "multiple_linear_regression" ? (MultipleResult(NumberK, i)) : (<input className="input-display" type="number" onChange={(event) => ChangeResultX(i, event)} value={ResultX[i]} placeholder={"X" + (i + 1)} style={{ marginLeft: "10px", marginRight: "10px", width: "80px" }} />)},</span>);
        }
        return result;
    }

    const checksuccess = (result, matrixk) => {
        if (result.request == "success") {
            Swal.fire({
                title: "Success!",
                text: "You has been success.",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Save"
            }).then(async (res) => {
                if (res.isConfirmed) {
                    setLoading(true);
                    if (result.mode == "multiple_linear_regression") {
                        const response = await fetch('https://numer-api.vercel.app/api/leastsave', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                tablex: JSON.stringify(matrixk),
                                tabley: JSON.stringify(result.Y),
                                mode: Mode,
                                result: JSON.stringify(result.result.map((v) => { return v.y })),
                                n: NumberN,
                                order: NumberK,
                                xsize: NumberX,
                                resultx: JSON.stringify(ResultXK),
                            }),
                        });
                        if (response.ok) {
                            Swal.fire({
                                title: "Success!",
                                text: "You has been success.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Please try again.",
                                icon: "error"
                            });
                        }
                    } else {
                        const response = await fetch('https://numer-api.vercel.app/api/leastsave', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                tablex: JSON.stringify(result.X),
                                tabley: JSON.stringify(result.Y),
                                mode: Mode,
                                result: JSON.stringify(result.result.map((v) => { return v.y })),
                                n: NumberN,
                                order: OrderM,
                                xsize: NumberX,
                                resultx: JSON.stringify(ResultX),
                            }),
                        });
                        if (response.ok) {
                            Swal.fire({
                                title: "Success!",
                                text: "You has been success.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Please try again.",
                                icon: "error"
                            });
                        }
                    }
                    setLoading(false);
                }
            });
        } else {
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
        const XKsend = [];
        TableChecked.map((v, i) => {
            if (v == true) {
                Xsend.push(TableValuesX[i]);
                Ysend.push(TableValuesY[i]);
                XKsend.push(TableValuesXK[i])
            }
        })


        console.log(XKsend)
        setLoading(true);
        setTimeout(() => {
            try {

                if (Mode == "simple_regression") {
                    const result = SimpleRegression(Xsend, Ysend, ResultX, OrderM);
                    checksuccess(result, Xsend);
                    onDataChange(result);
                } else if (Mode == "multiple_linear_regression") {
                    const result = MultipleRegression(XKsend, Ysend, ResultXK);
                    checksuccess(result, XKsend);
                    onDataChange(result);
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }, 0);
    }

    return (
        <div>
            <div className="select-display" style={{ marginBottom: "15px" }}>
                <select onChange={selectMethod} value={Mode}>
                    <option value="select">Select option</option>
                    <option value="simple_regression">Simple Regression</option>
                    <option value="multiple_linear_regression">Multiple Linear Regression</option>
                </select>
            </div>
            <div className="display-root-item" style={{ marginTop: "10px" }}>
                <div style={{ fontSize: "22px" }}>Size x,y</div>
                <input className="input-display" type="number" onChange={changeNumber} value={NumberN} placeholder="N" style={{ marginLeft: "10px", marginRight: "10px" }} />
            </div>

            <div style={{ marginTop: "15px", border: "solid 3px rgb(39, 40, 41)", borderRadius: "15px", width: "max-content", marginLeft: "auto", marginRight: "auto", minWidth: "50px", maxWidth: "80%", overflowX: "auto", overflowY: "hidden" }}>
                {TableValue(TableValuesX, Mode)}
            </div>

            <div style={{ marginTop: "30px", fontSize: "22px", display: "flex", justifyContent: "center", alignItems: "center", width: "80%", marginLeft: "auto", marginRight: "auto" }}>Find <input className="input-display" type="number" onChange={changeNumberX} value={NumberX} placeholder="X" style={{ marginLeft: "10px", marginRight: "10px", width: "100px" }} />
                X = {'\{'} {(<div>{TableResultX(ResultX, Mode)}
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
            <Button variant="contained" color="success" style={{ background: "#04AA6D", marginTop: "15px" }} onClick={sendRequest}>
                Submit
            </Button>
        </div>
    )
}

export default TableLeast