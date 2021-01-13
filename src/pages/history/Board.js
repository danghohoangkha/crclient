import React from 'react';
import Square from './Square';
import "./Style.css";
function Board ({squares,WinLines,Size}) {

    let tempArr1=[];
    let tempArr2=[];
    for(let i =0 ;i<Size;i++)
    {
        tempArr1.push(i);
        tempArr2.push(i)
    }
    const renderquare=(i)=>{
        return (
            <Square 
              value={squares[i]}
              key = {i}
              IsHighlight = {WinLines && WinLines.includes(i)}
            />
          );
    }
    // Use two loops to make the squares
    let BoardSquare = [];
    for(let i=0; i<Size; ++i) {
      let row = [];
      for(let j=0; j<Size; ++j) {
        row.push(renderquare(i+Size*j));
      }
      BoardSquare.push(<div key={i} className="board-row">{row}</div>);
    }

    return (
      <>{BoardSquare}</>
    );
}
export default Board;