import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const LeastGraph = (props) => {
  const result = props.result;

  return (
    <>
      <div className="root-graph" style={{ width: "60%", height: "500px", marginLeft: "auto", marginRight: "auto", overflow: "hidden" }}>
        <Plot style={{ width: "100%", height: "100%" }}
          data={[
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
