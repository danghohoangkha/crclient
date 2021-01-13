import React from 'react';
import './Style.css';

function Square(props) {
    return (
      <button  className ={ props.IsHighlight ? 'HightLights square' : 'square'}>
        {props.value}
      </button>
    )
  }
export default Square;