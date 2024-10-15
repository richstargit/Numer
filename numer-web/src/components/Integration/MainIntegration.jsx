import { useEffect, useState } from "react";
import IntegrationData from "./IntegrationData";
import IntegrationResult from "./IntegrationResult";

function MainIntegration(){
    const [DataResult,setData] = useState("");
    const handleDataChange = (newData) => {
        if(newData){
            setData(newData);
        }
      };
    
      return(
        <div className="home-text">
            <div style={{fontSize:"32px",marginBottom:"16px"}}>Integration</div>
            <IntegrationData onDataChange={handleDataChange}/>
            <IntegrationResult result={DataResult}/>
        </div>
    )
}

export default MainIntegration;