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
            <div style={{width : "30%",height:"100px",background:"rgb(255, 217, 51)",marginLeft:"auto",marginRight:"auto",marginTop:"10px",minWidth:"350px",border:"solid 5px rgb(39, 40, 41)",borderRadius:"15px",padding:"5px 5px 5px 5px"}}>
                <div style={{width:"100%",background:"rgb(255, 255, 255)",height:"100%",borderRadius:"10px",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"18px",padding:"15px"}}>
                    <div>Result x = {DataResult.xresult?Number(DataResult.xresult).toFixed(12):""}</div>
                    <div style={{marginLeft:"10px"}}>y = {DataResult.yresult?Number(DataResult.yresult).toFixed(12):""}</div>
                </div>
            </div>
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