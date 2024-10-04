import { useEffect, useState } from "react";
import TableInter from "./TableInter";
import InterResult from "./InterResultTable";
import InterGraph from "./InterGraph";

function MainInterpolation(){
    const [DataResult,setData] = useState("");
    const handleDataChange = (newData) => {
        if(newData){
            setData(newData);
        }
      };

    return(
        <div className="home-text">
            <div style={{fontSize:"32px",marginBottom:"16px"}}>Interpolation and Extrapolation</div>
            <TableInter onDataChange={handleDataChange}/>
            <InterGraph result={DataResult}/>
            <div style={{marginTop:"35px",width:"80%",marginLeft:"auto",marginRight:"auto"}}><InterResult result = {DataResult}/></div>
        </div>
    )
}

export default MainInterpolation