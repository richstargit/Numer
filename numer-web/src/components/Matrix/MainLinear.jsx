import MatrixResult from "./MatrixResult"
import TableMatrix from "./TableMatrix"
import { useEffect, useState } from "react";

function Matrixmath(){
    const [DataResult,setData] = useState("");
    const handleDataChange = (newData) => {
        if(newData){
            setData(newData);
        }
      };

    return(
        <div className="home-text">
            <div style={{fontSize:"32px",marginBottom:"16px"}}>Linear Algebraic Equations</div>
            <TableMatrix onDataChange={handleDataChange}/>
            <MatrixResult result = {DataResult}/>
        </div>
    )
}

export default Matrixmath