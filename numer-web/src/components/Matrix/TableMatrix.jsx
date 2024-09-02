import { im, number } from "mathjs";
import { useState } from "react";
import "./Matrix.css";
import { width } from "@mui/system";
function TableMatrix(){
    const [Number,setNumber] = useState(0);
    const [matrixValues, setMatrixValues] = useState([]);
    const [Resutl,setResult] = useState([]);

    const arrchange = (row, col, event) => {
        const num = parseInt(event.target.value);
        if(num){

        }
        // if(event.target.value){
        // const newValue = parseInt(event.target.value);
        // setMatrixValues(prevValues => {
        //     const updatedValues = [...prevValues];
        //     updatedValues[row][col] = newValue ? newValue : 0;
        //     return updatedValues;
        // });}
    };
    let result = [];
    let key = 0;
    const changeNumber = event =>{
        const numbermatrix = parseInt(event.target.value);
        if(numbermatrix<=10&&numbermatrix>0){
            setNumber(numbermatrix)
            result = Array(numbermatrix).fill().map(()=> Array(numbermatrix).fill(0));
            setMatrixValues(result);
            console.log(result);
            result = []
            setResult("");
            key = 0;
            for(let i = 0;i<numbermatrix;i++){
                for(let j=0;j<numbermatrix;j++){
                    result.push(<div key={key} row={i} col = {j} className="matrixinput"><input style={{width : "100%"}} type="number" onChange={(event) => arrchange(i, j, event)}/></div>);
                    key++;
                }
            }
            setResult(result);
        }else{
            setMatrixValues([]);
            setResult([]);
        }
    }
    return(
        <div className="home-text">
            <input  type="number" onChange={changeNumber} />
            <div style={{width : "80%",margin : "auto",marginTop:"10px",display:"grid",gap:"20px",justifyContent : "center",justifyItems: "center"
                ,gridTemplateColumns: `repeat(${Number?Number:1},auto)`}}>
                {Resutl}
            </div>
        </div>
    )
}

export default TableMatrix