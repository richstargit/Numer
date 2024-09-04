import { im, number } from "mathjs";
import { useState } from "react";
import "./Matrix.css";
import { width } from "@mui/system";
import Button from '@mui/material/Button';
function TableMatrix(){
    const [Number,setNumber] = useState(0);
    const [matrixValues, setMatrixValues] = useState([]);
    const [Resutl,setResult] = useState([]);
    const [VectorX,setVectorX] = useState([]);
    const [VectorB,setVectorB] = useState([]);
    const [matrixValuesB, setMatrixValuesB] = useState([]);

    const changeNumber = event =>{
        const numbermatrix = parseInt(event.target.value);
        if(numbermatrix<=10&&numbermatrix>0){
            let key = 0;
            let result = [];
            setNumber(numbermatrix)
            result = Array(numbermatrix).fill().map(()=> Array(numbermatrix).fill(""));
            setMatrixValues(result);
            result = Array(numbermatrix).fill("");
            setMatrixValuesB(result);
            result = []
            setResult("");
            key = 0;
            for(let i = 0;i<numbermatrix;i++){
                for(let j=0;j<numbermatrix;j++){
                    result.push(<div key={key} row={i} col = {j} >A{i+1}{j+1}<input style={{width : "50px",height:"50px",textAlign:"center",border:"solid 3px rgb(39, 40, 41)",borderRadius:"15px",fontSize:"18px",outline: "none"}} onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #6d6d6d"} onBlur={(e) => e.target.style.boxShadow = "none"} type="text" onChange={(event) => arrchange(i, j, event)}/></div>);
                    key++;
                }
            }
            setResult(result);
            result = [];
            for(let i = 0;i<numbermatrix;i++){
                result.push(<div key={key} row={i} >X{i+1}<div style={{width : "50px",height:"50px",textAlign:"center",border:"solid 3px rgb(39, 40, 41)",borderRadius:"15px",backgroundColor:"rgb(39, 40, 41)",display: 'flex',
                    alignItems: 'center',outline: "none",
                    justifyContent: 'center',color:"rgb(255, 255, 255)"}}>X</div></div>);
                key++;
            }
            setVectorX(result);
            result = [];
            for(let i = 0;i<numbermatrix;i++){
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
        console.log(matrixValues);
        console.log(matrixValuesB)
    }
    return(
        <div>
            <input  type="number" onChange={changeNumber} />
            <div style={{display:"flex",justifyContent:"center",alignItems: 'center'}}>
                <div style={{marginRight:"10px"}}>
                    <div style={{fontSize:"28px",background:"rgb(39, 40, 41)",width:"50px",padding:"5px",height:"50px",borderRadius:"15px",color:"rgb(255, 255, 255)",margin : "auto",marginTop:"10px"}}>A</div>
                    <div style={{width : "min-content",padding:"15px",border:"solid 3px rgb(39, 40, 41)",borderRadius:"10px",margin : "auto",marginTop:"10px",display:"grid",gap:"20px",justifyContent : "center",justifyItems: "center"
                        ,gridTemplateColumns: `repeat(${Number?Number:1},auto)`}}>
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