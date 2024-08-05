import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const replaceVariable = (equation) => {
    let s= ""
    if(equation!=null){
        s = equation
    }
  return s.replace(/x/g, `x_i`);
};

export default function MathEquation(props) {
    const equation = props.math
    const mode = props.mode
    let formattedEquation = equation;
    if(mode == "one_point_iteration_method"){
      formattedEquation = replaceVariable(equation);
    }
    return (
        <div>
        <BlockMath math={formattedEquation} />
      </div>
    );
  }
  