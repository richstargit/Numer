import { im, number } from "mathjs";
import { useState } from "react";
import "./Matrix.css";
import { width } from "@mui/system";
function TableMatrix(){
    const [Number,setNumber] = useState(0);
    const [matrixValues, setMatrixValues] = useState([]);

    const arrchange = (row, col, event) => {
        if(event.target.value){
        const newValue = parseInt(event.target.value);
        setMatrixValues(prevValues => {
            const updatedValues = [...prevValues];
            updatedValues[row][col] = newValue ? newValue : 0;
            return updatedValues;
        });}
    };
    const changeNumber = event =>{
        if(event.target.value<=10&&event.target.value>=0){
            setNumber(event.target.value)
            if(parseInt(event.target.value)>0){
                setMatrixValues(Array(parseInt(event.target.value)).fill().map(() => Array(parseInt(event.target.value)).fill(0)));
            }
            console.log(matrixValues)
        }
    }
    let result = [];
    let key = 0;
    for(let i = 0;i<Number;i++){
        for(let j=0;j<Number;j++){
            result.push(<div key={key} row={i} col = {j} className="matrixinput"><input style={{width : "100%"}} type="number" onChange={(event) => arrchange(i, j, event)}/></div>);
            key++;
        }
        
    }
    const columnStyle = Array(Number?parseInt(Number):1).fill('auto').join(' ');
    return(
        <div className="home-text">
            <input  type="number" onChange={changeNumber} />
            <div style={{width : "80%",margin : "auto",marginTop:"10px",display:"grid",gap:"20px",justifyContent : "center",justifyItems: "center"
                ,gridTemplateColumns: columnStyle}}>
                {result}
            </div>
        </div>
    )
}

export default TableMatrix