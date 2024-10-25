import { useEffect, useState } from "react";
import { BlockMath } from 'react-katex';
import Button from '@mui/material/Button';
import 'katex/dist/katex.min.css';
import { CircularProgress, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BackwardOh1, BackwardOh2, CentralOh2, ForwardOh1 } from "./DifferenceCal";

function DifferenceData({ onDataChange }) {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const modeselect = params.get("mode");
    const ohselect = params.get("oh");
    const Xselect = params.get("x");
    const Hselect = params.get("h");
    const Solselect = params.get("sol");

    const [Mode, setMode] = useState(modeselect || "");
    const [NumberX, setNumberX] = useState(Xselect || "");
    const [NumberH, setNumberH] = useState(Hselect || "");
    const [Sol, setSol] = useState(Solselect || "");
    const [Oh, setOh] = useState(ohselect || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            sendRequest();
        }, 0);
    }, [location]);

    const selectMethod = event => {
        setMode(event.target.value)
    }

    const selectoh = event => {
        setOh(event.target.value)
    }

    const ChangeX = event => {
        setNumberX(event.target.value)
    }
    const ChangeH = event => {
        setNumberH(event.target.value)
    }
    const solchange = event => {
        setSol(event.target.value)
    }

    const checksuccess = (result) => {
        if(result.request=="success"){
            Swal.fire({
                title: "Success!",
                text: "You has been success.",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Save"
            }).then(async (res) => {
                if (res.isConfirmed) {
                    setLoading(true);
                    const response = await fetch('https://numer-api.vercel.app/api/differencesave', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            equation: Sol,
                            mode: Mode,
                            oh: Oh,
                            x: NumberX,
                            h: NumberH,
                            result: result.result
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
            try {

                if (Mode == "forward" && Oh == "oh^1") {
                    const result = ForwardOh1(Sol, NumberX, NumberH);
                    checksuccess(result);
                    onDataChange(result);
                    console.log(result)
                } else if (Mode == "backward" && Oh == "oh^1") {
                    const result = BackwardOh1(Sol, NumberX, NumberH);
                    checksuccess(result);
                    onDataChange(result);
                    console.log(result)
                } else if (Mode == "central" && Oh == "oh^2") {
                    const result = CentralOh2(Sol, NumberX, NumberH);
                    checksuccess(result);
                    onDataChange(result);
                    console.log(result)
                } else if (Mode == "forward" && Oh == "oh^2") {
                    const result = BackwardOh2(Sol, NumberX, NumberH);
                    checksuccess(result);
                    onDataChange(result);
                    console.log(result)
                } else if (Mode == "backward" && Oh == "oh^2") {
                    const result = BackwardOh2(Sol, NumberX, NumberH);
                    checksuccess(result);
                    onDataChange(result);
                    console.log(result)
                } else if (Mode == "central" && Oh == "oh^4") {
                    const result = CentralOh2(Sol, NumberX, NumberH);
                    checksuccess(result);
                    onDataChange(result);
                    console.log(result)
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
                    <option value="forward">Forward Divided</option>
                    <option value="backward">Backward Divided</option>
                    <option value="central">Central Divided</option>
                </select>

                <div style={{
                    height: "80px", background: "white", width: "fit-content", margin: "auto", borderRadius: "10px"
                    , minWidth: "150px", display: "flex", justifyContent: "center", marginTop: "15px", overflow: "hidden", maxWidth: "450px", paddingLeft: "15px", paddingRight: "15px"
                }}>
                    <div><BlockMath math={`\\frac {dy}{dx} = ${Sol ? Sol : "..."}`} /></div>
                </div>

                <span style={{ marginRight: "10px" }}>f(x)</span><input className="input-display" style={{ width: "200px", marginTop: "15px" }} onChange={solchange} value={Sol} type="text" placeholder="x^2-x-1" />

                <div style={{ marginTop: "15px" }}>
                    <span style={{ marginLeft: "10px" }}>x</span><input className="input-display" type="number" onChange={ChangeX} value={NumberX} placeholder="1" style={{ marginLeft: "5px", marginRight: "10px" }} />
                    <span style={{ marginLeft: "10px" }}>h</span><input className="input-display" type="number" onChange={ChangeH} value={NumberH} placeholder="0.1" style={{ marginLeft: "5px", marginRight: "10px" }} />
                    <span style={{ marginLeft: "10px" }}>Oh</span><select onChange={selectoh} value={Oh} style={{ marginLeft: "5px", marginRight: "10px" }}>
                        <option value="select">select Oh</option>
                        <option value="oh^1">Oh^1</option>
                        <option value="oh^2">Oh^2</option>
                        <option value="oh^4">Oh^4</option></select>
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

export default DifferenceData;