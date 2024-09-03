import { im, number } from "mathjs";
import { useState } from "react";
import "./Matrix.css";
import { width } from "@mui/system";
function TableMatrix(){
    const [Number,setNumber] = useState(0);
    const [matrixValues, setMatrixValues] = useState([]);
    const [Resutl,setResult] = useState([]);
    const [VectorX,setVectorX] = useState([]);

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
                    result.push(<div key={key} row={i} col = {j} >A{i}{j}<input style={{width : "50px",height:"50px",textAlign:"center",border:"solid 3px rgb(39, 40, 41)",borderRadius:"15px"}} type="number" onChange={(event) => arrchange(i, j, event)}/></div>);
                    key++;
                }
            }
            setResult(result);
            result = [];
            for(let i = 0;i<numbermatrix;i++){
                result.push(<div key={key} row={i} >X{i+1}<div style={{width : "50px",height:"50px",textAlign:"center",border:"solid 3px rgb(39, 40, 41)",borderRadius:"15px",backgroundColor:"rgb(39, 40, 41)",display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',color:"rgb(255, 255, 255)"}}>X</div></div>);
                key++;
            }
            setVectorX(result);
        }else{
            setMatrixValues([]);
            setResult([]);
            setVectorX([]);
        }
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
            </div>
        </div>
    )
}

export default TableMatrix