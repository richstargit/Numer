import { im, number, re } from "mathjs";
import { useState,useEffect } from "react";
import "./Matrix.css";
import { width } from "@mui/system";
import Button from '@mui/material/Button';
import { CholeskyDecomposition, ConjugateGradient, CramerRule, GaussElimination, GaussJordan, GaussSeidelIteration, JacobiIteration, LuDecomposition, MatrixInv } from "./LinearCal";
import { CircularProgress,Box  } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
function TableMatrix({ onDataChange }){

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const modeselect = params.get("mode");
    const Nselect = params.get("nsize");
    const Mselect = params.get("msize");
    const MatrixAselect = params.get("matrixa");
    const VectorBselect = params.get("vectorb");
    const VectorXselect = params.get("vectorx");
    const Errorselect = params.get("error");

    const [loading, setLoading] = useState(false);
    const [NumberN,setNumberN] = useState(Nselect||"");
    const [NumberM,setNumberM] = useState(Mselect||"");
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            sendRequest();
        }, 0);
    }, [location]);
    const [matrixValues, setMatrixValues] = useState(JSON.parse(MatrixAselect)||[]);
    const [VectorX,setVectorX] = useState(JSON.parse(VectorXselect)||[]);
    const [matrixValuesB, setMatrixValuesB] = useState(JSON.parse(VectorBselect)||[]);
    const [Mode,setMode] = useState(modeselect||"");
    const [matrixValuesX, setMatrixValuesX] = useState(JSON.parse(VectorXselect)||[]);
    const [Erroriter, setErroriter] = useState(Errorselect||"");
    const limitmatrix = 10;
    const selectMethod = event =>{
        setMode(event.target.value)
    }

    const changeNumber = async(event) =>{
        if(!event.target.value){
            if(event.target.id=="1"){
                setNumberN(event.target.value?event.target.value:"")
            }else if(event.target.id=="2"){
                setNumberM(event.target.value?event.target.value:"")
            }
            setMatrixValues([]);
            setMatrixValuesB([]);
            setVectorX([]);
            setMatrixValuesX([]);
            return;
        }
        setMatrixValues([]);
        setMatrixValuesB([]);
        setVectorX([]);
        setMatrixValuesX([]);
        const numbermatrix = parseInt(event.target.value);
        if(numbermatrix==0||numbermatrix==""){
            if(event.target.id=="1"){
                setNumberN(numbermatrix)
            }else if(event.target.id=="2"){
                setNumberM(numbermatrix)
            }
        }
        if(numbermatrix){
            let N = NumberN;
            let M = NumberM;
            if(event.target.id=="1"){
                setNumberN(numbermatrix)
                N = numbermatrix;
            }else if(event.target.id=="2"){
                setNumberM(numbermatrix)
                M = numbermatrix;
            }
            if(N>limitmatrix){
                N=limitmatrix;
            }else if(N<1){
                N=1;
            }
            if(M>limitmatrix){
                M=limitmatrix;
            }else if(M<1){
                M=1;
            }
            let result = [];
            result = Array(N).fill().map(()=> Array(M).fill(0));
            setMatrixValues(result);
            result = Array(N).fill(0);
            setMatrixValuesB(result);
            result = Array(M).fill(0);
            setVectorX(result);
            result = Array(M).fill(0);
            setMatrixValuesX(result);
        }
    }

    const MatrixAGenerate = (mA) =>{
        let result = []
        let key = 0;

            for(let i = 0;i<mA.length;i++){
                for(let j=0;j<mA[i].length;j++){
                    result.push(<div key={key} row={i} col = {j} >A{i+1},{j+1}
                    <input style={{width : "50px",height:"50px",textAlign:"center",border:"solid 3px rgb(39, 40, 41)"
                    ,borderRadius:"15px",fontSize:"18px",outline: "none"}} onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #6d6d6d"} onBlur={(e) => e.target.style.boxShadow = "none"} type="text" 
                    onChange={(event) => arrchange(i, j, event)} value={matrixValues[i][j]}/></div>);
                    key++;
                }
            }
        return (<>{result}</>);
    }

    const VectorXGenerate = (vX) =>{
        let result = []
        let key = 0;
        for(let i = 0;i<vX.length;i++){
            result.push(<div key={key} row={i} >X{i+1}<div style={{width : "50px",height:"50px",textAlign:"center",border:"solid 3px rgb(39, 40, 41)",borderRadius:"15px",backgroundColor:"rgb(39, 40, 41)",display: 'flex',
                alignItems: 'center',outline: "none",
                justifyContent: 'center',color:"rgb(255, 255, 255)"}}>X</div></div>);
            key++;
        }
        return (<>{result}</>);
    }

    const VectorBGenerate = (vB) =>{
        let result = []
        let key = 0;
        for(let i = 0;i<vB.length;i++){
            result.push(<div key={key} row={i} >B{i+1}<input className="" style={{width : "50px",height:"50px",textAlign:"center",border:"solid 3px rgb(39, 40, 41)",
                borderRadius:"15px",fontSize:"18px",outline: "none",transition:"0.3s"}} onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #6d6d6d"} 
                onBlur={(e) => e.target.style.boxShadow = "none"} type="text" onChange={(event) => arrchangeB(i, event)} value={matrixValuesB[i]}/></div>);
            key++;
        }
        return (<>{result}</>);
    }

    const VectorXIterGenerate = (vX) =>{
        let result = []
        let key = 0;

        for(let i = 0;i<vX.length;i++){
            result.push(<div key={key} row={i} >X{i+1}<input className="" style={{width : "50px",height:"50px",textAlign:"center",border:"solid 3px rgb(39, 40, 41)",
                borderRadius:"15px",fontSize:"18px",outline: "none",transition:"0.3s"}} onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #6d6d6d"} 
                onBlur={(e) => e.target.style.boxShadow = "none"} type="text" onChange={(event) => arrchangeX(i, event)} value={matrixValuesX[i]}/></div>);
            key++;
        }
        return (<>{result}</>);
    }

    const arrchange = (row, col, event) => {
        setMatrixValues(prevMatrixValues => {
            const newMatrixValues = prevMatrixValues.map(row => [...row]);
            newMatrixValues[row][col] = event.target.value?event.target.value:"";
            return newMatrixValues;
        });
    };
    const arrchangeB = (row, event) => {
        setMatrixValuesB(prevMatrixValues => {
            const newMatrixValues = prevMatrixValues.map(row=>row);
            newMatrixValues[row] = event.target.value?event.target.value:"";
            return newMatrixValues;
            });
    };

    const arrchangeX = (row, event) => {
        setMatrixValuesX(prevMatrixValues => {
            const newMatrixValues = prevMatrixValues.map(row=>row);
            newMatrixValues[row] = event.target.value?event.target.value:"";
            return newMatrixValues;
            });
    };

    const changeError = (e) =>{
        setErroriter(e.target.value);
    }

    const IsIterMode = ()=>{
        if(Mode=="Jacobi_Iteration_Method"||Mode=="Gauss-Seidel_Iteration_Method"||Mode=="Conjugate_Gradient_Method"){
            return(<><div style={{ fontSize: "28px", background: "rgb(39, 40, 41)", width: "50px", padding: "5px", height: "50px", borderRadius: "15px", color: "rgb(255, 255, 255)", margin: "auto", marginTop: "10px" }}>Xi</div>
                <div style={{
                    width: "min-content", padding: "15px", border: "solid 3px rgb(39, 40, 41)", borderRadius: "10px", margin: "auto", marginTop: "10px", display: "grid", gap: "20px", justifyContent: "center", justifyItems: "center"
                    , gridTemplateColumns: `repeat(${NumberM?NumberM>limitmatrix ? limitmatrix : NumberM<0?0:NumberM:1},auto)`
                }}>
                    {VectorXIterGenerate(matrixValuesX)}
                </div>
                <div className="display-root-item" style={{marginTop:"10px"}}>
                    <span style={{marginLeft:"10px",marginRight:"10px"}}>Error</span>
                <input className="input-display" type="number" onChange={changeError} value={Erroriter} placeholder="0.000001" style={{marginLeft:"10px",marginRight:"10px"}}/>
                </div></>);
        }
    }

    const checksuccess = (result) =>{
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
                    const response = await fetch('http://localhost:3000/api/linearsave', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            matrixA: JSON.stringify(matrixValues),
                            mode: Mode,
                            vectorB: JSON.stringify(matrixValuesB),
                            result: JSON.stringify(result.vectorX),
                            n:NumberN,
                            m:NumberM,
                            vectorX: JSON.stringify(matrixValuesX),
                            error:Erroriter 
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
        console.log(matrixValues)
        setLoading(true);
        setTimeout(() => {
        try{
            Number(matrixValues);
            Number(matrixValuesB);
            Number(matrixValuesX);
            Number(Erroriter);
            if(Mode=="cramer_Rule"){
                const result = CramerRule(matrixValues,matrixValuesB);
                checksuccess(result);
                onDataChange(result);
                console.log(result);
            }else if(Mode=="gauss_elimination_method"){
                const result = GaussElimination(matrixValues,matrixValuesB);
                checksuccess(result);
                onDataChange(result);
            }else if(Mode=="gauss_jordan_Method"){
                const result = GaussJordan(matrixValues,matrixValuesB);
                checksuccess(result);
                onDataChange(result);
            }else if(Mode=="matrix_inversion_method"){
                const result = MatrixInv(matrixValues,matrixValuesB);
                checksuccess(result);
                onDataChange(result);
            }else if(Mode=="LU_Decomposition_Method"){
                const result = LuDecomposition(matrixValues,matrixValuesB);
                checksuccess(result);
                onDataChange(result);
            }else if(Mode=="Cholesky_Decomposition_Method"){
                const result = CholeskyDecomposition(matrixValues,matrixValuesB);
                checksuccess(result);
                onDataChange(result);
            }else if(Mode=="Jacobi_Iteration_Method"){
                const result = JacobiIteration(matrixValues,matrixValuesB,matrixValuesX,Erroriter);
                checksuccess(result);
                onDataChange(result);
            }else if(Mode=="Gauss-Seidel_Iteration_Method"){
                const result = GaussSeidelIteration(matrixValues,matrixValuesB,matrixValuesX,Erroriter);
                checksuccess(result);
                onDataChange(result);
            }else if(Mode=="Conjugate_Gradient_Method"){
                const result = ConjugateGradient(matrixValues,matrixValuesB,matrixValuesX,Erroriter);
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
    return(
        <div>
            <div className="select-display" style={{marginBottom:"15px"}}>
            <select onChange={selectMethod} value={Mode}>
                <option value="select">Select option</option>
                <option value="cramer_Rule">Cramer's Rule</option>
                <option value="gauss_elimination_method">Gauss Elimination Method</option>
                <option value="gauss_jordan_Method">Gauss-Jordan Method</option>
                <option value="matrix_inversion_method">Matrix Inversion Method</option>
                <option value="LU_Decomposition_Method">LU Decomposition Method</option>
                <option value="Cholesky_Decomposition_Method">Cholesky Decomposition Method</option>
                <option value="Jacobi_Iteration_Method">Jacobi Iteration Method</option>
                <option value="Gauss-Seidel_Iteration_Method">Gauss-Seidel Iteration Method</option>
                <option value="Conjugate_Gradient_Method">Conjugate Gradient Method</option>
            </select>
            </div>
            <span style={{fontSize:"22px"}}>Size(NxM) </span>
            <div className="display-root-item" style={{marginTop:"10px"}}>
                <input className="input-display" type="number" onChange={changeNumber} value={NumberN} id="1" placeholder="N" style={{marginLeft:"10px",marginRight:"10px"}}/>
                <input className="input-display" type="number" onChange={changeNumber} value={NumberM} id="2" placeholder="M" style={{marginLeft:"10px",marginRight:"10px"}}/>
                </div>
            <div style={{display:"flex",justifyContent:"center",alignItems: 'center',marginBottom:"10px"}}>
                <div style={{marginRight:"10px"}}>
                    <div style={{fontSize:"28px",background:"rgb(39, 40, 41)",width:"50px",padding:"5px",height:"50px",borderRadius:"15px",color:"rgb(255, 255, 255)",margin : "auto",marginTop:"10px"}}>A</div>
                    <div style={{width : "min-content",padding:"15px",border:"solid 3px rgb(39, 40, 41)",borderRadius:"10px",margin : "auto",marginTop:"10px",display:"grid",gap:"20px",justifyContent : "center",justifyItems: "center"
                        ,gridTemplateColumns: `repeat(${NumberM?NumberM>limitmatrix ? limitmatrix : NumberM<0?0:NumberM:1},auto)`}}>
                        {MatrixAGenerate(matrixValues)}
                    </div>
                </div>
                <div>
                    <div style={{fontSize:"28px",background:"rgb(39, 40, 41)",width:"50px",padding:"5px",height:"50px",borderRadius:"15px",color:"rgb(255, 255, 255)",margin : "auto",marginTop:"10px"}}>X</div>
                    <div style={{width : "min-content",padding:"15px",border:"solid 3px rgb(39, 40, 41)",borderRadius:"10px",margin : "auto",marginTop:"10px",display:"grid",gap:"20px",justifyContent : "center",justifyItems: "center"
                        ,gridTemplateColumns: `repeat(1,auto)`}}>
                        {VectorXGenerate(VectorX)}
                    </div>
                </div>
                <div style={{marginLeft:"10px",marginRight:"10px",marginTop:"85px",fontSize:"38px"}}>=</div>
                <div style={{marginRight:"10px"}}>
                    <div style={{fontSize:"28px",background:"rgb(39, 40, 41)",width:"50px",padding:"5px",height:"50px",borderRadius:"15px",color:"rgb(255, 255, 255)",margin : "auto",marginTop:"10px"}}>B</div>
                    <div style={{width : "min-content",padding:"15px",border:"solid 3px rgb(39, 40, 41)",borderRadius:"10px",margin : "auto",marginTop:"10px",display:"grid",gap:"20px",justifyContent : "center",justifyItems: "center"
                        ,gridTemplateColumns: `repeat(1,auto)`}}>
                        {VectorBGenerate(matrixValuesB)}
                    </div>
                </div>
            </div>
            <div>
                <div style={{ marginBottom: "10px" }}>
                    {IsIterMode()}
                </div>
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
            <Button variant="contained" color="success" style={{background : "#04AA6D"}} onClick={sendRequest}>
                Submit
            </Button>
        </div>
    )
}

export default TableMatrix