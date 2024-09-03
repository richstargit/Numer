import Plot from 'react-plotly.js';
import { create, all, mode } from 'mathjs';

const math = create(all);

function App(props) {
  let sortedResult = [];
  let xvalue = [];
  let yvalue = [];
  let xdot = [];
  let ydot = [];
  let xfx = [];
  let yfx = [];
  let datadot = [];
  let i=0;
  let dataresult=[];
  if(props.result.request=="success"){
  if(props.result.result){
    if(props.result.mode =="one_point_iteration_method"){
      if(props.result.graph&&props.result.graphdot){
        let results = props.result.graph
        let dot = props.result.graphdot
        xvalue = results.map(x=> x.x);
        yvalue = results.map(y=> y.y);
        try {
            datadot = dot.map(x=>({
              x: [x.x,x.tox],
              y: [x.y,x.tox],
              mode: 'lines',
              name: 'x='+math.round(x.x,6),
              line: {
                color: '#D20062',
                dash: 'dash',
                width: 1,
              },
        }))
        } catch (error) {
          
        }
        let xandx = [];
        for(i=0;i<15;i+=1){
          xandx.push(i);
        }
        xfx = [];
        for(i=0;i<15;i+=0.002){
          xfx.push(i);
        }
        yfx = xfx.map(x => math.evaluate(props.result.sol, { x }));
          dataresult = [
            {
              x: xfx,
              y: yfx,
              mode: 'lines',
              name: 'Main Graph',
              line: {
                color: '#88D66C',
                width: 1,
              },
            },{
              x: xdot,
              y: ydot,
              mode: 'lines',
              name: 'x',
              line: {
                color: '#D20062',
                dash: 'dash',
                width: 1,
              },
            },
            {
              x: xandx,
              y: xandx,
              mode: 'lines',
              name: 'x=x',
              line: {
                color: '#0047AB',
                width: 1,
              },
            },
            {
              x: xvalue,
              y: yvalue,
              mode: 'lines+markers',
              name: 'Value',
              line: {
                color: '#D20062',
                width: 2,
              },
              marker: {
                color: '#D20062',
              },
            },...datadot
          ]
        }
    }else if(props.result.mode =="newton_raphson_method"){
      if(props.result.graph){
        let results = props.result.graph
        xvalue = results.map(x=> x.x);
        yvalue = results.map(y=> y.y);
        xfx = [];
        for(i=-15;i<15;i+=0.002){
          xfx.push(i);
        }
        yfx = xfx.map(x => math.evaluate(props.result.sol, { x }));
          dataresult = [
            {
              x: xfx,
              y: yfx,
              mode: 'lines',
              name: 'Main Graph',
              line: {
                color: '#88D66C',
                width: 1,
              },
            },
            {
              x: xvalue,
              y: yvalue,
              mode: 'lines+markers',
              name: 'Value',
              line: {
                color: '#D20062',
                width: 2,
              },
              marker: {
                color: '#D20062',
              },
            }
          ]
        }
    }else if(props.result.mode =="secant_method"){
      if(props.result.graph){
        let results = props.result.graph
        xvalue = results.map(x=> x.x);
        yvalue = results.map(y=> y.y);
        xfx = [];
        for(i=-15;i<15;i+=0.002){
          xfx.push(i);
        }
        yfx = xfx.map(x => math.evaluate(props.result.sol, { x }));
          dataresult = [
            {
              x: xfx,
              y: yfx,
              mode: 'lines',
              name: 'Main Graph',
              line: {
                color: '#88D66C',
                width: 1,
              },
            },
            {
              x: xvalue,
              y: yvalue,
              mode: 'lines+markers',
              name: 'Value',
              line: {
                color: '#D20062',
                width: 2,
              },
              marker: {
                color: '#D20062',
              },
            }
          ]
        }
    }else {
      let results = props.result.result
      sortedResult = results.sort((a, b) => a.x - b.x);
      xvalue = results.map(x=> x.x);
      yvalue = results.map(y=> y.y);
      xfx = [];
      for(i=-15;i<15;i+=0.002){
        xfx.push(i);
      }
      yfx = xfx.map(x => math.evaluate(props.result.sol, { x }));
      dataresult = [
        {
          x: xfx,
          y: yfx,
          mode: 'lines',
          name: 'Main Graph',
          line: {
            color: '#0047AB',
            width: 1,
          },
        },
        {
          x: xvalue,
          y: yvalue,
          mode: 'lines+markers',
          name: 'Value',
          line: {
            color: '#88D66C',
            width: 2,
          },
          marker: {
            color: '#D20062',
          }
        },
        {
          x:[math.round(props.result.xresult,6)],
          y:[math.round(props.result.yresult,6)],
          mode:'markers',
          name:'Result',
          marker:{
            color: 'rgb(255, 217, 51)',
            size:15
          }
        }
      ]
    }
  }
}
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width : "100%",
      }}
    >
      <Plot style={{width : "100%",height : "100%"}}
        data={
          dataresult
        }
        layout={{
            title: "Graph",
          margin: { t: 35, r: 0,b:35,l:35 },
          dragmode: 'pan',
          autosize: true,
        }}
        config={{
          scrollZoom: true,
        }}
      />
    </div>
  );
}

export default App;