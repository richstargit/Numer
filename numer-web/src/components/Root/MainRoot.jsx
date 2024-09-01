import "./Root.css"
import { useEffect, useState } from "react";
import Tables from '../Table/Tables'
import Graph from '../Graph/root_graph'
import Button from '@mui/material/Button';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import MathEquation from './MathEquation';
import RootData from "./DataRoot";
import Root_of_equation from "./Root_of_equations";

function Root_of_equations(){

    const [DataResult,setData] = useState("");
    const handleDataChange = (newData) => {
        if(newData){
            setData(newData);
        }
      };
    return(
        <div className="home-text">
            <Root_of_equation onDataChange={handleDataChange}/>
            <div className="root-graph" style={{width : "60%",height : "500px",marginLeft :"auto",marginRight:"auto",overflow:"hidden"}}>
                <Graph result = {DataResult}></Graph>
            </div>

            <div className="Table-display">
                <Tables result ={DataResult}></Tables>
            </div>
        </div>
    )
}

export default Root_of_equations