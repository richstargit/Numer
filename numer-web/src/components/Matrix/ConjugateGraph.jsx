import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Switch from '@mui/material/Switch';
import { e } from 'mathjs';

const ConjugateGraph3D = (props) => {
  const result = props.result;
  const [Dimension,setDimension] = useState(true);
  const Sol = (x,y) => {
    if(result.request == "success"){
      if(result.matrixA.length>=2&&result.matrixA[0].length>=2)
      return (1/2)*(result.matrixA[0][0]*x*x + result.matrixA[0][1]*x*y+result.matrixA[1][0]*x*y+result.matrixA[1][1]*y*y)-(result.vectorB[0]*x+result.vectorB[1]*y);
    }
    return 0;
  };
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    // Simulate conjugate gradient steps
    const simulateConjugateGradient = () => {
        const stepData = [];
        for (let i = 0; i < result.result.length; i++) {
          stepData.push({ x: result.result[i].vectorX[0], y: result.result[i].vectorX[1], z: Sol(result.result[i].vectorX[0],result.result[i].vectorX[1]) });
          // Update points (simplified conjugate gradient direction)
        }
        setSteps(stepData);
    };
    if(props.result.request == "success"){
      if(result.matrixA.length>=2&&result.matrixA[0].length>=2){
      simulateConjugateGradient();
      }
    }
  }, [result]);

  // Create surface data for 3D plot
  const xValues = [...Array(100).keys()].map((i) => -10 + i * 0.2);
  const yValues = [...Array(100).keys()].map((i) => -10 + i * 0.2);
  const zValues = xValues.map((x) => yValues.map((y) => Sol(x, y)));

  return (
    <>
    <div style={{marginTop:"15px"}}>2D<Switch checked={Dimension} onChange={() => setDimension(!Dimension)} name="dimension"color="primary"/>3D</div>
    <div className="root-graph" style={{width : "60%",height : "500px",marginLeft :"auto",marginRight:"auto",overflow:"hidden"}}>
    <Plot
      data={[
        {
          z: zValues,
          x: xValues,
          y: yValues,
          type: Dimension?'surface':'contour',
          colorscale: 'Jet',
        },
        {
          x: steps.map((s) => s.x),
          y: steps.map((s) => s.y),
          z: steps.map((s) => s.z),
          mode: 'lines+markers',
          type: Dimension?'scatter3d':'scatter',
          marker: {
            color: 'red',
            size: 5,
          },
          line: {
            color: 'red',
            width: 2,
              },
              name: 'Conjugate Gradient Steps',
            },
          ]}
          layout={{
            title: 'Conjugate Graph',
            scene: {
              xaxis: { title: 'X Axis' },
              yaxis: { title: 'Y Axis' },
              zaxis: { title: 'Z Axis' },
            },
            autosize: true,
            dragmode: Dimension ? 'turntable' : 'pan'
          }}
          config={{
            scrollZoom: true,
          }}
        />
      </div>
    </>
  );
};

export default ConjugateGraph3D;
