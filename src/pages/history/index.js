import React, { useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketProvider";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Back from "../../icon/back.png";
import icon from "../../icon/img06.jpg";
import Game from './Game';
import RepDraw from "../../components/Modal/repDraw";
import AskLeaveRoom from '../../components/Modal/askLeaveRoom';
import axios from 'axios'
import Avatar from "@material-ui/core/Avatar";
import GAMER from "../../icon/img022.jpg";
import Api from "../../callapi/index"
const useStyles = makeStyles((theme) => ({
    avatar: {
        //   marginTop: 20,
        position: "relative",
        background: "rgba(255,255,255,0.85)",
        width: "30px",
        height: "30px",
        boxShadow: "0px 0px 12px rgba(131,153,167,0.99)"
    },
    icon: {
        width: "30px",
        height: "30px",
        color: "rgba(131,153,167,0.79)"
    }
}));
function Chess({ match }) {
    const classes = useStyles()
    const socket = useSocket();
    const history = useHistory();
    const [historyMatch, setHistoryMatch] = useState([])
    const [matchMassage, setMatchMassage] = useState([])
    const [currentHistory, setCurrentHistory] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('')
    const [isDraw, setIsDraw] = useState(false);//check dong y draw khong
    const [leaveRoom, setLeaveRoom] = useState(false);
    const [chessInfor, setChessInfor] = useState([]);
    const [finalhistory] = useState([{ squares: Array(20 * 20).fill(null), Cor_X: 0, Cor_Y: 0 }])
    const [inforRoom, setInforRoom] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            await Api.get(`/api/matchhistory/${match.params.id}`).then(res => {
                if (res.data.history != undefined) {
                    setHistoryMatch(JSON.parse(res.data.history.history));
                }
                if (res.data.chessInfor !== undefined && res.data.chessInfor !== 'undefined') {
                    setChessInfor(res.data.chessInfor)
                }
                if (res.data.player1 !== undefined) {
                    setPlayer1(res.data.player1.fullName)
                }
                if (res.data.player2 !== undefined) {
                    setPlayer2(res.data.player2.fullName)
                }
                console.log(res.data.chat.content)
                if (res.data.chat.content !== undefined && res.data.chat.content !== "undefined") {
                    setMatchMassage(JSON.parse(res.data.chat.content))
                }
            }).then(error => {
                console.log(error)
            })
            try {
                let res = await Api.get(`/api/getmatchofchess/${match.params.id}`);
                setInforRoom(res.data)
            } catch (error) {

            }
        }
        fetchData();
    }, [])
    //ThoatKhoiPhongChoi
    const handleShowAskLeaveRoom = () => setLeaveRoom(true);
    const handleCloseAskLeaveRoom = () => setLeaveRoom(false);
    const handleLeaveRoom = () => {
        socket.emit("leave room", parseInt(localStorage.getItem("id")), match.params.id);
        setLeaveRoom(false);
        history.push("/history");
    }
    const handleMoveHistory = (move) => {
        const arr = [];
        arr.push(historyMatch[move]);
        setCurrentHistory(arr);
    }
    const renderMove = () => {
        const oldhistory = historyMatch;
        let p1 = true;
        let moves = oldhistory.map((step, move) => {
            const temp = p1 ? " (player2)" : " (player1)"
            const desc = move ?
                'Go to move #' + move + "ToaDo : " + step.Cor_X + " | " + step.Cor_Y + temp :
                'Go to game start'
            p1 = !p1
            return (
                <>
                    <li key={move}>
                        <button onClick={() => handleMoveHistory(move)}>
                            {desc}
                        </button>
                    </li>
                </>
            );
        });
        return moves
    }
    const rendeChat = () => {
        const result = matchMassage.map((item, move) => {
            console.log(item)
            return (
                <>
                    {/* <li key={move}>{item.fullName}:{item.message}</li> */}
                    <li key={move}>
                        <Grid container xs={12} spacing={1} style={{ margin: "5px", width: "auto" }}>
                            <Grid item xs={2}>
                                <Avatar className={classes.avatar}>
                                    <img src={GAMER} className={classes.icon} alt="GAMER"></img>
                                </Avatar>
                            </Grid>
                            <Grid item xs={10} style={{ fontFamily: "DancingScript", fontSize: "15px", marginTop: "5px" }}>
                                {item.fullName}:{item.message}
                            </Grid>
                        </Grid>
                    </li>
                </>
            )
        })
        return result
    }
    //RepDrawInvite
    const onHandleDraw = () => {
        socket.emit("yesDraw", match.params.id, parseInt(localStorage.getItem("id")));
        setIsDraw(false);
    }
    const handleCancelDraw = () => setIsDraw(false);
    //EndGame
    return (
        <>
            <Grid xs={12} container style={{ height: "80px" }}>
                <Grid xs={3}>
                    <Grid xs={12}>
                        <Button style={{ top: "5px", color: "#CCFFFF", fontWeight: "bold" }} onClick={handleShowAskLeaveRoom}>
                            <img src={Back} alt="Back" width="50px" height="50px"></img>
                        </Button>
                        <AskLeaveRoom leaveRoom={leaveRoom} handleCloseAskLeaveRoom={handleCloseAskLeaveRoom} handleLeaveRoom={handleLeaveRoom} />
                    </Grid>
                    <Grid xs={12} class="contentCenter">
                        <img src={icon} alt="Back" width="240px" height="120px"></img>
                    </Grid>
                    <Grid xs={12} class="contentCenter">
                        <div class="paper" style={{ width: "320px", borderRadius: "10px" }}>
                            <div style={{ fontSize: "30px", fontWeight: "bold", color: "red" }}>Lịch sử chat</div>
                        </div>
                        <ul className="ul">
                            {rendeChat()}
                        </ul>
                    </Grid>
                </Grid>
                <Grid xs={6}>
                    <Grid xs={12} container >
                        <Grid xs={1}></Grid>
                        <Grid xs={4} className="headerChess" >
                            <div>{match.params.id} - {inforRoom.name}</div>
                        </Grid>
                        <Grid xs={2} className="headerChess" >
                            {playing ? "Đang chơi" : ''}
                        </Grid>
                        <Grid xs={3}></Grid>
                    </Grid>
                    <RepDraw isDraw={isDraw} onHandleDraw={onHandleDraw} handleCancelDraw={handleCancelDraw} />
                    <Grid xs={12} class="contentCenter">
                        <Game match={match} currentHistory={currentHistory} finalHistory={historyMatch.length === 0 ? finalhistory : historyMatch} />
                    </Grid>
                </Grid>
                <Grid xs={3}>
                    <Grid xs={12} class="contentCenter">
                        <div class="paper" style={{ width: "320px", borderRadius: "10px", marginTop: "70px" }}>
                            <div style={{ fontSize: "20px", fontWeight: "bold", color: "red" }}>Player 1: {player1}</div>
                            <div style={{ fontSize: "20px", fontWeight: "bold", color: "red" }}>Player 2: {player2}</div>
                            <div style={{ fontSize: "20px", fontWeight: "bold", color: "red" }}>Winner: {chessInfor.fullName === undefined ? '' : chessInfor.fullName}</div>
                        </div>
                    </Grid>
                    <Grid xs={12} class="contentCenter">
                        <div class="paper" style={{ width: "320px", borderRadius: "10px" }}>
                            <div style={{ fontSize: "30px", fontWeight: "bold", color: "red" }}>Lịch sử</div>
                        </div>
                        <ul className="ul">
                            {renderMove()}
                        </ul>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default Chess;
