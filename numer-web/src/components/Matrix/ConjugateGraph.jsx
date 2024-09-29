import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const ConjugateGraph3D = () => {
    const f = (x, y) => 3 * x ** 2 + 2 * y ** 2;
    //const f = (x, y) => 1.0 / 2 * (2 * x * x + 10 * x * y + y * y) - 3 * x - 2 * y;
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        // Simulate conjugate gradient steps
        const simulateConjugateGradient = () => {
            let x = 2; // Starting point x
            let y = 2; // Starting point y
            const stepData = [];
            for (let i = 0; i < 10; i++) {
                const fx = f(x, y);
                stepData.push({ x, y, z: fx });
                // Update points (simplified conjugate gradient direction)
                x -= 0.2 * x;
                y -= 0.1 * y;
            }
            setSteps(stepData);
        };

        simulateConjugateGradient();
    }, []);

    // Create surface data for 3D plot
    const xValues = [...Array(100).keys()].map((i) => -3 + i * 0.06);
    const yValues = [...Array(100).keys()].map((i) => -3 + i * 0.06);
    const zValues = xValues.map((x) => yValues.map((y) => f(x, y)));

    return (
        <Plot
        data={[
            {
              z: zValues,
              x: xValues,
              y: yValues,
              type: 'surface',
              colorscale: 'Jet',
            },
            {
              x: steps.map((s) => s.x),
              y: steps.map((s) => s.y),
              z: steps.map((s) => s.z),
              mode: 'lines+markers',
              type: 'scatter3d',
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
                title: '3D Conjugate Graph',
                scene: {
                    xaxis: { title: 'X Axis' },
                    yaxis: { title: 'Y Axis' },
                    zaxis: { title: 'Z Axis' },
                },
                autosize:true
            }}
        />
    );
};

export default ConjugateGraph3D;
