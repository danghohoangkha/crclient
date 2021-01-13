import React from 'react';

import Board from './Board';

const Game = ({currentHistory,finalHistory }) => {
  const [SquareNumber] = React.useState(20);

  const current = finalHistory[finalHistory.length-1];
  return (
    <>
      <div className="game">
        <div className="game-board">
        {currentHistory.length === 1 ?( <Board squares={currentHistory[0].squares} Size={SquareNumber} WinLines={calculateWinner(currentHistory[0].squares, SquareNumber).winlines}
             />)
            :<Board
            squares={current.squares}
            WinLines={calculateWinner(current.squares, SquareNumber).winlines}
            Size={SquareNumber}
          />}
        </div>
      </div>
    </>
  );
}
function calculateWinner(squares, size) {
  let isdraw = true;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (squares[i + size * j]) {
        let total = 0;
        let winlines = [];
        winlines.push(i + size * j)
        let endl1 = false;
        let endl2 = false;
        for (let k = 1; k <= 5; k++) {
          if (squares[(i - k) + size * (j - k)] === squares[i + size * j] && endl1 === false) {
            ++total;
            winlines.push((i - k) + size * (j - k));
          }
          else {
            endl1 = true;
          }
          if (squares[(i + k) + size * (j + k)] === squares[i + size * j] && endl2 === false) {
            ++total
            winlines.push((i + k) + size * (j + k));
          }
          else {
            endl2 = true;
          }
          if (total === 4) {
            return {
              winlines: winlines,
              isdraw: false,
              squares: squares[i + size * j]
            }
          }
          else if (endl1 === true && endl2 === true) {
            break;
          }
        }
      }
    }
  }
  // Duyệt đường chéo phụ
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (squares[i + size * j]) {
        let total = 0;
        let winlines = [];
        winlines.push(i + size * j)
        let endl1 = false;
        let endl2 = false;
        for (let k = 1; k <= 5; k++) {
          if (squares[(i - k) + size * (j + k)] === squares[i + size * j] && endl1 === false) {
            ++total;
            winlines.push((i - k) + size * (j + k));
          }
          else {
            endl1 = true;
          }
          if (squares[(i + k) + size * (j - k)] === squares[i + size * j] && endl2 === false) {
            ++total
            winlines.push((i + k) + size * (j - k));
          }
          else {
            endl2 = true;
          }
          if (total === 4) {
            return {
              winlines: winlines,
              isdraw: false,
              squares: squares[i + size * j]
            }
          }
          else if (endl1 === true && endl2 === true) {
            break;
          }
        }
      }
    }
  }
  // Duyệt đường ngang
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (squares[i + size * j]) {
        let total = 0;
        let winlines = [];
        winlines.push(i + size * j)
        let endl1 = false;
        let endl2 = false;
        for (let k = 1; k <= 5; k++) {
          if (squares[i + size * (j - k)] === squares[i + size * j] && endl1 === false) {
            ++total;
            winlines.push(i + size * (j - k));
          }
          else {
            endl1 = true;
          }
          if (squares[i + size * (j + k)] === squares[i + size * j] && endl2 === false) {
            ++total
            winlines.push(i + size * (j + k));
          }
          else {
            endl2 = true;
          }
          if (total === 4) {
            return {
              winlines: winlines,
              isdraw: false,
              squares: squares[i + size * j]
            }
          }
          else if (endl1 === true && endl2 === true) {
            break;
          }
        }
      }
    }
  }
  // Duyệt đương dọc
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (squares[i + size * j]) {
        let total = 0;
        let winlines = [];
        winlines.push(i + size * j);
        let endl1 = false;
        let endl2 = false;
        for (let k = 1; k <= 5; k++) {
          if (squares[i - k + size * j] === squares[i + size * j] && endl1 === false) {
            ++total;
            winlines.push(i - k + size * j);
          }
          else {
            endl1 = true;
          }
          if (squares[i + k + size * j] === squares[i + size * j] && endl2 === false) {
            ++total
            winlines.push(i + k + size * j);
          }
          else {
            endl2 = true;
          }
          if (total === 4) {
            //console.log('Win theo hàng dọc');
            return {
              winlines: winlines,
              isdraw: false,
              squares: squares[i + size * j]
            }
          }
          else if (endl1 === true && endl2 === true) {
            break;
          }
        }
      }
    }
  }


  for (let k = 0; k < squares.length; k++) {
    if (!squares[k]) {
      isdraw = false;
      break;
    }
  }
  return {
    isdraw: isdraw,
    squares: null,
  }

}
export default Game;
