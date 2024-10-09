import { useEffect, useState } from "react";

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

        </div>
    )
}

export default MainIntegration;