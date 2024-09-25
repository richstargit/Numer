import { im, number, re } from "mathjs";
import { useState } from "react";
import "./Matrix.css";
import { width } from "@mui/system";
import Button from '@mui/material/Button';
import { CramerRule, GaussElimination } from "./LinearCal";
function TableMatrix({ onDataChange }){
    const [NumberN,setNumberN] = useState(0);
    const [NumberM,setNumberM] = useState(0);
    const [matrixValues, setMatrixValues] = useState([]);
    const [Resutl,setResult] = useState([]);
    const [VectorX,setVectorX] = useState([]);
    const [VectorB,setVectorB] = useState([]);
    const [matrixValuesB, setMatrixValuesB] = useState([]);
    const [Mode,setMode] = useState("");

    const selectMethod = event =>{
        setMode(event.target.value)
    }

    const changeNumber = async(event) =>{
        const numbermatrix = parseInt(event.target.value);
        if(numbermatrix<=10&&numbermatrix>0){
            let N = NumberN;
            let M = NumberM;
            if(event.target.id=="1"){
                setNumberN(numbermatrix)
                N = numbermatrix;
            }else if(event.target.id=="2"){
                setNumberM(numbermatrix)
                M = numbermatrix;
            }
            let key = 0;
            let result = [];
            result = Array(N).fill().map(()=> Array(M).fill("0"));
            setMatrixValues(result);
            result = Array(N).fill("0");
            setMatrixValuesB(result);
            await setVectorX([]);
            await setVectorB([]);
            result = []
            await setResult("");
            key = 0;
            for(let i = 0;i<N;i++){
                for(let j=0;j<M;j++){
                    result.push(<div key={key} row={i} col = {j} >A{i+1},{j+1}<input style={{width : "50px",height:"50px",textAlign:"center",border:"solid 3px rgb(39, 40, 41)",borderRadius:"15px",fontSize:"18px",outline: "none"}} onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #6d6d6d"} onBlur={(e) => e.target.style.boxShadow = "none"} type="text" onChange={(event) => arrchange(i, j, event)} /></div>);
                    key++;
                }
            }
            setResult(result);
            result = [];
            for(let i = 0;i<M;i++){
                result.push(<div key={key} row={i} >X{i+1}<div style={{width : "50px",height:"50px",textAlign:"center",border:"solid 3px rgb(39, 40, 41)",borderRadius:"15px",backgroundColor:"rgb(39, 40, 41)",display: 'flex',
                    alignItems: 'center',outline: "none",
                    justifyContent: 'center',color:"rgb(255, 255, 255)"}}>X</div></div>);
                key++;
            }
            setVectorX(result);
            result = [];
            for(let i = 0;i<N;i++){
                result.push(<div key={key} row={i} >B{i+1}<input className="" style={{width : "50px",height:"50px",textAlign:"center",border:"solid 3px rgb(39, 40, 41)",borderRadius:"15px",outline: "none",transition:"0.3s"}} onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #6d6d6d"} onBlur={(e) => e.target.style.boxShadow = "none"} type="text" onChange={(event) => arrchangeB(i, event)} /></div>);
                key++;
            }
            setVectorB(result);
        }else{
            setMatrixValues([]);
            setMatrixValuesB([]);
            setResult([]);
            setVectorX([]);
            setVectorB([]);
        }
    }
    const arrchange = (row, col, event) => {
        if(event.target.value&&event.target.value!=""){
            const value = event.target.value ? event.target.value : "";
            setMatrixValues(prevMatrixValues => {
            const newMatrixValues = prevMatrixValues.map(row => [...row]);
            newMatrixValues[row][col] = value;
            return newMatrixValues;
            });
        }
    };
    const arrchangeB = (row, event) => {
        if(event.target.value&&event.target.value!=""){
            const value = event.target.value ? event.target.value : "";
            setMatrixValuesB(prevMatrixValues => {
            const newMatrixValues = prevMatrixValues;
            newMatrixValues[row] = value;
            return newMatrixValues;
            });
        }
    };
    const sendRequest = async () => {
        console.log(matrixValues)
        console.log(matrixValuesB)
        if(Mode=="cramer_Rule"){
            const result = CramerRule(matrixValues,matrixValuesB);
            onDataChange(result);
        }else if(Mode=="gauss_elimination_method"){
            const result = GaussElimination(matrixValues,matrixValuesB);
            onDataChange(result);
        }
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
                <input className="input-display" type="number" onChange={changeNumber} id="1" placeholder="N"/>
                <input className="input-display" type="number" onChange={changeNumber} id="2" placeholder="M"/>
                </div>
            <div style={{display:"flex",justifyContent:"center",alignItems: 'center',marginBottom:"10px"}}>
                <div style={{marginRight:"10px"}}>
                    <div style={{fontSize:"28px",background:"rgb(39, 40, 41)",width:"50px",padding:"5px",height:"50px",borderRadius:"15px",color:"rgb(255, 255, 255)",margin : "auto",marginTop:"10px"}}>A</div>
                    <div style={{width : "min-content",padding:"15px",border:"solid 3px rgb(39, 40, 41)",borderRadius:"10px",margin : "auto",marginTop:"10px",display:"grid",gap:"20px",justifyContent : "center",justifyItems: "center"
                        ,gridTemplateColumns: `repeat(${NumberM?NumberM:1},auto)`}}>
                        {Resutl}
                    </div>
                </div>
                <div>
                    <div style={{fontSize:"28px",background:"rgb(39, 40, 41)",width:"50px",padding:"5px",height:"50px",borderRadius:"15px",color:"rgb(255, 255, 255)",margin : "auto",marginTop:"10px"}}>X</div>
                    <div style={{width : "min-content",padding:"15px",border:"solid 3px rgb(39, 40, 41)",borderRadius:"10px",margin : "auto",marginTop:"10px",display:"grid",gap:"20px",justifyContent : "center",justifyItems: "center"
                        ,gridTemplateColumns: `repeat(1,auto)`}}>
                        {VectorX}
                    </div>
                </div>
                <div style={{marginLeft:"10px",marginRight:"10px",marginTop:"85px",fontSize:"38px"}}>=</div>
                <div style={{marginRight:"10px"}}>
                    <div style={{fontSize:"28px",background:"rgb(39, 40, 41)",width:"50px",padding:"5px",height:"50px",borderRadius:"15px",color:"rgb(255, 255, 255)",margin : "auto",marginTop:"10px"}}>B</div>
                    <div style={{width : "min-content",padding:"15px",border:"solid 3px rgb(39, 40, 41)",borderRadius:"10px",margin : "auto",marginTop:"10px",display:"grid",gap:"20px",justifyContent : "center",justifyItems: "center"
                        ,gridTemplateColumns: `repeat(1,auto)`}}>
                        {VectorB}
                    </div>
                </div>
            </div>
            <Button variant="contained" color="success" style={{background : "#04AA6D"}} onClick={sendRequest}>
                Submit
            </Button>
        </div>
    )
}

export default TableMatrix