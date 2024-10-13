import { pow,round } from 'mathjs';
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const LeastMulGraph = (props) => {
  const result = props.result;

  const [Xaxis,setXaxis] = useState();
  const [Yaxis,setYaxis] = useState();
  const [Zaxis,setZaxis] = useState();


  useEffect(() => {
    setXaxis(result.X?result.X.length>2?Xrange(result.X[1]):[]:[]);
    setYaxis(result.X?result.X.length>2?Xrange(result.X[2]):[]:[]);
    setZaxis(result.X?result.X.length>2?AsolZ():[]:[]);
    
  }, [result]);

  console.log(result)

  const Xrange = (arr) => {
    const res = [];
    let min=arr[0];
    let max=arr[0];
    arr.map((v)=>{
      if(v>max){
        max = v;
      }
      if(v<min){
        min = v;
      }
    });

    while(min<=max){
      res.push(min);
      min++;
    }
    return res;
  }

  const AsolZ = () => {
    const res = [];
    if (result.A&&result.X.length>2) {
      Yaxis?Yaxis.map((v,i)=>{
        const r = [];
        Xaxis?Xaxis.map((n,j)=>{
          r.push(round(result.A[0]+result.A[1]*n+result.A[2]*v,6));
        }):[];
        res.push(r);
      }):[]
    }
    return res;
  }
  console.log(AsolZ())

  return (
    <>
      <div className="root-graph" style={{ width: "60%", height: "500px", marginLeft: "auto", marginRight: "auto", overflow: "hidden" }}>
        <Plot style={{ width: "100%", height: "100%" }}
          data={[
            {
              z: Zaxis,
              x: Xaxis,
              y: Yaxis,
              type: 'surface',
              colorscale: 'Jet',
            },
            
          ]}
          layout={{
            title: 'Regression Graph',
            scene: {
              xaxis: { title: 'X1 Axis' },
              yaxis: { title: 'X2 Axis'  },
              zaxis: { title: 'Y Axis' },
            },
            autosize: true,
            margin: { t: 35, r: 15, b: 35, l: 35 },
            dragmode: 'turntable'
          }}
          config={{
            scrollZoom: true,
          }}
        />
      </div>
    </>
  );
};

export default LeastMulGraph;
