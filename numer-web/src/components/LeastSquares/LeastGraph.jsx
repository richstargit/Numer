import { pow } from 'mathjs';
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const LeastGraph = (props) => {
  const result = props.result;
  const AsolY = () => {
    const res = [];
    if (result.A) {
      for (let j = result.X.length>0?result.X[0]:0; j < (result.X.length>0?result.X[result.X.length-1]:0); j += 0.1) {
        let sum = 0;
        for (let i = 0; i < result.M + 1; i++) {
          sum += result.A[i] * pow(j, i);
        }
        res.push(sum);
      }
    }
    return res;
  }
  const AsolX = () => {
    const res = [];
    if (result.A) {
      for (let i = result.X.length>0?result.X[0]:0; i < (result.X.length>0?result.X[result.X.length-1]:0); i += 0.1) {
        res.push(i);
      }
    }
    return res;
  }

  return (
    <>
      <div className="root-graph" style={{ width: "60%", height: "500px", marginLeft: "auto", marginRight: "auto", overflow: "hidden" }}>
        <Plot style={{ width: "100%", height: "100%" }}
          data={[
            {
              x: result.A?AsolX():[],
              y: result.A?AsolY():[],
              mode: 'lines',
              type: 'scatter',
              line: {
                shape: 'spline',
                color: '#0047AB',
                width: 1,
              },
              name: 'X value',
            },
            {
              x: result.X?result.X:[],
              y: result.Y?result.Y:[],
              mode: 'lines',
              type: 'scatter',
              line: {
                color: '#88D66C',
                width: 2,
              },
              name: 'Main Graph',
            },
            {
                x: result.result?result.result.map(v=>v.x):[],
                y: result.result?result.result.map(v=>v.y):[],
                mode: 'markers',
                type: 'scatter',
                marker: {
                  color: '#D20062',
                  size: 5,
                },
                name: 'X value',
              }
          ]}
          layout={{
            title: 'Regression Graph',
            scene: {
              xaxis: { title: 'X Axis' },
              yaxis: { title: 'Y Axis' },
            },
            autosize: true,
            margin: { t: 35, r: 15, b: 35, l: 35 },
            dragmode: 'pan'
          }}
          config={{
            scrollZoom: true,
          }}
        />
      </div>
    </>
  );
};

export default LeastGraph;
