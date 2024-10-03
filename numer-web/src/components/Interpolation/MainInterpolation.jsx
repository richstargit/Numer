import { useEffect, useState } from "react";
import TableInter from "./TableInter";

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
            <TableInter/>
        </div>
    )
}

export default MainInterpolation