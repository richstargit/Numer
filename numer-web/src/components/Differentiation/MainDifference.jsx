import { useEffect, useState } from "react";
import DifferenceData from "./DifferenceData";
import DifferenceResult from "./DifferenceResult";

function MainDifference(){
    const [DataResult,setData] = useState("");
    const handleDataChange = (newData) => {
        if(newData){
            setData(newData);
        }
      };
    
      return(
        <div className="home-text">
            <div style={{fontSize:"32px",marginBottom:"16px"}}>Differentiation</div>
            <DifferenceData onDataChange={handleDataChange}/>
            <DifferenceResult result={DataResult}/>
        </div>
    )
}

export default MainDifference;