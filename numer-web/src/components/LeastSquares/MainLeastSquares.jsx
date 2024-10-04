import { useEffect, useState } from "react";
import TableLeast from "./TableLeast";
import LeastResult from "./LeastResult";
import LeastResultTable from "./LeastResultTable";


function MainLeastSquares(){
    const [DataResult,setData] = useState("");
    const handleDataChange = (newData) => {
        if(newData){
            setData(newData);
        }
      };

    return(
        <div className="home-text">
            <div style={{fontSize:"32px",marginBottom:"16px"}}>Least-Squares Regression</div>
            <TableLeast onDataChange={handleDataChange}/>
            <LeastResult result={DataResult}/>
            <div style={{width:"80%",marginLeft:"auto",marginRight:"auto"}}><LeastResultTable result={DataResult}/></div>
        </div>
    )
}

export default MainLeastSquares