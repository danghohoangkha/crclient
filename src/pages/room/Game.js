import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSocket } from '../../contexts/SocketProvider';
import Board from './Board';
import Timer from "./Timer";
import api from '../../callapi/index';

const Game = ({handleSetPlayer2ObjParent, getNewHistory, match, setHistoryClick, currentHistory, showTimer, handleSetShowTimer, onfinishTime }) => {
  let socket = useSocket();
  const [SquareNumber] = React.useState(20);
  const [history, sethistory] = React.useState([{ squares: Array(SquareNumber * SquareNumber).fill(null), Cor_X: 0, Cor_Y: 0 }])
  const [stepNumber, setstepNumber] = React.useState(0);
  const [xIsNext, setxIsNext] = React.useState(true);
  const [IsSelected, setIsSelected] = React.useState(0);
  const [IsAccending, setIsAccending] = React.useState(true);
  const [WaitingPlayer, SetWaitingPlayer] = React.useState(true);
  const [typePlayer, setTypePlayer] = React.useState('1')
  const [position, setPosition] = React.useState();
  const [saveTest, setSaveTest] = useState([])
  const [player2Obj, setPlayer2Obj] = useState(null);

  const handleSocketOn = (position, typePlayer1) => {
    const copyhistory = [...history];
    const current = copyhistory[copyhistory.length - 1];
    const squares = current.squares.slice();
    if (squares[position] === null) {
      squares[position] = typePlayer1 === '2' ? "X" : "O";
      //console.log([...history, { squares, Cor_Y: position % 20, Cor_X: Math.floor(position / 20) }]);
      sethistory([...history, { squares, Cor_Y: position % 20, Cor_X: Math.floor(position / 20) }])
      //console.log('socket chay ')
      setIsSelected(copyhistory.length);
      setstepNumber(copyhistory.length);
      setxIsNext(!xIsNext);
    }
  }
  useEffect(() => {
    if (socket === undefined) return;
    const fetchData = async () => {

      socket.on('next play', function (data) {
        console.log(data);
        if (data.playedPlayerId === parseInt(localStorage.getItem("id"))) {
          return;
        }
        setSaveTest([...saveTest, data]);
        //console.log("vao")
        setTypePlayer(data.player);
        setPosition(data.position);
        if (data.nextPlayerId === parseInt(localStorage.getItem("id"))) {
          SetWaitingPlayer(false);
          //countdown
          handleSetShowTimer(true);
          if (player2Obj === null) {
            setPlayer2Obj({ player1Id: data.nextPlayerId, player2Id: data.playedPlayerId })
            handleSetPlayer2ObjParent({ player1Id: data.nextPlayerId, player2Id: data.playedPlayerId })
          }
        }

        if (data.position !== undefined) {
          handleSocketOn(data.position, data.player);
        }
      })
    }
    fetchData();
    return () => socket.off('next play');
  }, [socket, history])
  const handleClick = async (i) => {
    if (!WaitingPlayer) {

      const copyhistory = history.slice(0, stepNumber + 1);
      const current = copyhistory[copyhistory.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares, SquareNumber, typePlayer).squares || squares[i]) {
        return;
      }
      squares[i] = typePlayer === '1' ? "X" : "O";
      const newCurrent = [...history, { squares, Cor_Y: i % 20, Cor_X: Math.floor(i / 20) }];
      sethistory(newCurrent)
      setIsSelected(copyhistory.length);
      setstepNumber(copyhistory.length);

      setxIsNext(!xIsNext);
      SetWaitingPlayer(true);
      const data = { player: typePlayer === '1' ? '2' : '1', position: i, roomId: match.params.id, playedPlayerId: parseInt(localStorage.getItem("id")) }
      socket.emit('next play', data);
      console.log("so lan goi");
      //luu lai lich su hien tai
      socket.emit("save new history", { squares, Cor_Y: i % 20, Cor_X: Math.floor(i / 20) }, match.params.id);
      socket.emit("get new history", match.params.id);
      //dung lai
      handleSetShowTimer(false);
      await api.post(`/api/nextplay/${match.params.id}`, { data: JSON.stringify(newCurrent), matchId: match.params.id, nextType: typePlayer === '1' ? false : true });//true la x false la O
    }
  }
  const jumpTo = (step) => {
    setstepNumber(step);
    setxIsNext((step % 2) === 0);
    setIsSelected(step);
  }

  const SetAccendingState = () => {
    setIsAccending(!IsAccending);
  }

  const current = history[stepNumber];
  let isEnd = false;
  const winner = calculateWinner(current.squares, SquareNumber, typePlayer).squares;
  let status;
  if (winner) {
    socket.emit("winnerOrDraw", winner, match.params.id);//gui x hay o win
    status = "Winner: " + winner === 'X' ? 'Player1' : 'Player2'
    isEnd = true
  }
  else if (calculateWinner(current.squares, SquareNumber, typePlayer).isdraw) {
    socket.emit("winnerOrDraw", 'draw', match.params.id);//gui x hay o win
    status = "Draw";
    isEnd = true
  }
  else {
    status = 'Playing'
  }

  return (
    <>
      {showTimer ? <Timer time={{ initialMinute: 10, initialSeconds: 10 }} onfinishTime={onfinishTime} /> : <div style={{height:"30px"}}></div>}
      <div className="game">
        {/* <div>{status}</div> */}
        <div className="game-board">
          {player2Obj === null ? (<Board squares={getNewHistory.squares} Size={20} onClick={handleClick}
          />)
            : <Board
              squares={current.squares}
              onClick={handleClick}
              WinLines={calculateWinner(current.squares, SquareNumber, typePlayer).winlines}
              Size={SquareNumber}
            />}

        </div>
        <div className="game-info">
          <Button className={isEnd ? "" : "d-none"} onClick={setHistoryClick(history, isEnd)}>Hiển thị lịch sử</Button>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares, size, typePlayer) {
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
