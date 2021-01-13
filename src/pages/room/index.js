import { useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketProvider";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import "../../App.css";
import Chat from '../../components/Chat/chat';
import Back from "../../icon/back.png";
import icon from "../../icon/img06.jpg";
import people from "../../icon/people01.png";
import InviteUser from "../../components/Modal/inviteUsers";
import Game from './Game';
import PlayerList from "../../components/PlayGame/PlayerList";
import JoinHand from "../../icon/joinHand.png";
import Lose from "../../icon/hang03.png";
import ValidDraw from "../../components/Modal/validDraw.js";
import ValidLose from "../../components/Modal/validLose.js";
import RepDraw from "../../components/Modal/repDraw";
import EndGame from "../../components/Modal/endGame";
import AskLeaveRoom from '../../components/Modal/askLeaveRoom';
import MyAudio from "../../icon/Cothu.mp3";
import OnAudio from "../../icon/onAudio.png";
import OffAudio from "../../icon/offAudio.png";
import Api from "../../callapi/index"
function Chess({ match, location }) {
    const socket = useSocket();
    const [message, setMessage] = useState("");
    const [insertMsg, setInsertMsg] = useState([])
    const history = useHistory();
    const [usersOnl, setUsersOnl] = useState(false);
    const [historyMatch, setHistoryMatch] = useState([])
    const [endGame, setEndGame] = useState(false);
    const [currentHistory, setCurrentHistory] = useState([]);
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [isDraw, setIsDraw] = useState(false);//check dong y draw khong
    const [messageMatch, setMessageMatch] = useState(null);
    const [validDraw, setValidDraw] = useState(false);
    const [validLose, setValidLose] = useState(false);
    const [leaveRoom, setLeaveRoom] = useState(false);
    const [audio, setAudio] = useState(true);
    const [showTimer, setShowtimer] = useState(false);
    const [getNewHistory, setGetNewHistory] = useState({ squares: Array(20 * 20).fill(null), Cor_X: 0, Cor_Y: 0 });
    const [player2ObjParent, setPlayer2ObjParent] = useState({});
    const [inforRoom, setInforRoom] = useState({});

    const handleSetPlayer2ObjParent = (obj) => {
        setPlayer2ObjParent(obj);
    }
    const handleSetShowTimer = (value) => {
        setShowtimer(value);
    }
    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log(" vao")
        setMessage("");
        socket.emit('chat message', {
            roomId: match.params.id,
            message: message,
            userId: parseInt(localStorage.getItem('id'))
        });

    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        socket.emit('authenticate', token);
        console.log(match.params.id);
        if (socket == undefined) return;
        //cua thang game
        socket.on("get new history", data => {
            console.log(data);
            if (data !== null) {
                setGetNewHistory(data);
            }
        })
        socket.emit("get new history", match.params.id);

        socket.emit("room exist", (match.params.id))
        socket.on("room exist", (roomExist) => {
            if (!roomExist) {
                history.push("/chessList");
            }
        })
        //kiem tra da o trong phong chua
        socket.on("refreshorlink", () => {
            history.push("/chessList");
        })
        socket.emit("refreshorlink", match.params.id, parseInt(localStorage.getItem("id")));

        socket.on('chat message', (data) => {
            console.log(data);
            addMessageToArray(data);
        })
        //set 2 player vao tran
        socket.on("get2playermatchforplayer1", data => {
            console.log(data);
            return setPlayer1(data);
        })
        socket.on("get2playermatchforplayer2", data => {
            return setPlayer2(data);
        })
        socket.on("checkplaying", (isplay) => {
            if (isplay) {
                setPlaying(true);
            } else {
                setPlaying(false);
            }
        })
        socket.emit("checkplaying", match.params.id);

        socket.emit("get2playermatch", match.params.id);
        //kiem tra hoa
        socket.on("draw", () => {
            setIsDraw(true);
        })

        socket.on("DrawloseWin", (message) => {
            //dung dem thoi gian
            handleSetShowTimer(false);
            //show thang thua
            setMessageMatch(message);

            setEndGame(true);
        })
        const fetchData = async ()=>{
            try {
                let res = await Api.get(`/api/getmatchofchess/${match.params.id}`);
                setInforRoom(res.data)
            } catch (error) {
    
            }
        }
        fetchData();
        return () => socket.off('chat message');
    }, [socket])
    const onfinishTime = () => {
        if (localStorage.getItem("id")) {
            socket.emit("lose", match.params.id, parseInt(localStorage.getItem("id")));
        }
        setShowtimer(false);
    }

    function addMessageToArray(data) {
        if (data.message.length > 0) {
            setInsertMsg(preMsgList => {
                return [...preMsgList, { roomId: data.roomId, username: data.username, message: data.message }]
            })
        }
    }
    const handleInput = (e) => {
        setMessage(e.target.value)
    }
    const handleShowAskLeaveRoom = () => setLeaveRoom(true);
    const handleCloseAskLeaveRoom = () => setLeaveRoom(false);
    const handleLeaveRoom = () => {
        socket.emit("leave room", parseInt(localStorage.getItem("id")), match.params.id);
        const playerId = parseInt(localStorage.getItem("id"));
        if (player2ObjParent.player1Id === playerId || player2ObjParent.player2Id === playerId) {
            socket.emit("lose", match.params.id, parseInt(localStorage.getItem("id")));
        }
        setLeaveRoom(false);
        history.push("/chessList");
    }
    //See user online
    const clickUsersOnl = () => {
        setUsersOnl(true)
    }
    const clickExitUsersOnl = () => {
        setUsersOnl(false)
    }
    const HandleSetHistory = (hist, end) => {
        if (end === true) {
            setHistoryMatch(hist);
            setEndGame(true);

        }

    }
    const handleMoveHistory = (move) => {
        const arr = [];
        arr.push(historyMatch[move]);
        setCurrentHistory(arr);
    }
    const renderMove = () => {
        const oldhistory = historyMatch;
        let moves = oldhistory.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + "ToaDo : " + step.Cor_X + " | " + step.Cor_Y :
                'Go to game start';
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
    const onInChess = (pos) => {
        let dataPlay = { id: match.params.id, iduser: parseInt(localStorage.getItem('id')), pos: pos };
        socket.emit('i play', dataPlay);
        socket.emit('get2playermatch', match.params.id);
    }
    const handleDraw = () => {
        if (localStorage.getItem("id")) {
            socket.emit("draw", match.params.id, parseInt(localStorage.getItem("id")));
        }
        setValidDraw(false);
    }
    const handleLose = () => {
        if (localStorage.getItem("id")) {
            socket.emit("lose", match.params.id, parseInt(localStorage.getItem("id")));
        }
        setValidLose(false);
    }
    //RepDrawInvite
    const onHandleDraw = () => {
        socket.emit("yesDraw", match.params.id, parseInt(localStorage.getItem("id")));
        setIsDraw(false);
    }
    const handleCancelDraw = () => setIsDraw(false);
    //Invite
    const handleInvitedUser = (inviteUserId) => {
        socket.emit('inviteToUser', inviteUserId, match.params.id);
    }
    //XinHoa
    const handleShowValidDraw = () => setValidDraw(true);
    const handleCloseValidDraw = () => setValidDraw(false);
    //XinThua
    const handleShowValidLose = () => setValidLose(true);
    const handleCloseValidLose = () => setValidLose(false);
    //EndGame
    const handleContinue = () => {
        socket.on("to other room", otherRoom => {
            console.log(otherRoom);
            //roi phong
            socket.emit("leave room", parseInt(localStorage.getItem("id")), match.params.id);

            const token = localStorage.getItem('token');
            socket.emit('authenticate', token);

            history.push(`/chess/${otherRoom}`);
            window.location.reload();
        })
        socket.emit('to other room', parseInt(localStorage.getItem("id")), match.params.id);
        setEndGame(false);
    };
    const handleCancel = () => {
        socket.emit("leave room", parseInt(localStorage.getItem("id")), match.params.id);
        history.push(`/chessList`);
        setEndGame(false);
    };
    //PlayAudio
    const handleOffAudio = () => setAudio(false);
    const handleOnAudio = () => setAudio(true);
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
                        <Chat insertMsg={insertMsg} handleInput={handleInput} handleSendMessage={handleSendMessage} message={message} />
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
                        <Grid xs={2}>
                            <Button style={{ borderRadius: "15px" }} onClick={() => clickUsersOnl()}>
                                <img src={people} style={{ width: "40px", height: "40px" }} alt="people"></img>
                            </Button>
                            <InviteUser handleInvitedUser={handleInvitedUser} clickUsersOnl={clickUsersOnl} clickExitUsersOnl={clickExitUsersOnl} usersOnl={usersOnl} />
                        </Grid>
                    </Grid>
                    <RepDraw isDraw={isDraw} onHandleDraw={onHandleDraw} handleCancelDraw={handleCancelDraw} />
                    <Grid xs={12} class="contentCenter">
                        <Game handleSetPlayer2ObjParent={handleSetPlayer2ObjParent} getNewHistory={getNewHistory} onfinishTime={onfinishTime} showTimer={showTimer} handleSetShowTimer={handleSetShowTimer} match={match} setHistoryClick={HandleSetHistory} currentHistory={currentHistory} />
                    </Grid>

                    {/* EndGame */}
                    <EndGame endGame={messageMatch && endGame ? endGame : false} handleContinue={handleContinue} handleCancel={handleCancel} messageMatch={messageMatch} />
                </Grid>
                <Grid xs={3}>
                    <PlayerList player2={player2} player1={player1} onInChess={onInChess} />
                    <Grid container xs={12} style={{ marginTop: "10px" }}>
                        <Grid item xs={3}>
                            {audio ?
                                <>
                                    <Button onClick={handleOffAudio}>
                                        <img src={OnAudio} style={{ width: "50px", height: "50px" }} alt="" />
                                    </Button>
                                    <audio src={MyAudio} loop={true} autoPlay={true} />
                                </>
                                :
                                <Button onClick={handleOnAudio} >
                                    <img src={OffAudio} style={{ width: "50px", height: "50px" }} alt="" />
                                </Button>}
                        </Grid>
                        {playing ?
                            <>
                                <Grid item xs={3}>
                                    <Button onClick={handleShowValidDraw}><img src={JoinHand} style={{ width: "50px", height: "50px" }} alt="" /></Button>
                                    <ValidDraw handleDraw={handleDraw} validDraw={validDraw} handleCloseValidDraw={handleCloseValidDraw} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button onClick={handleShowValidLose}><img src={Lose} style={{ width: "50px", height: "50px" }} alt="" /></Button>
                                    <ValidLose handleLose={handleLose} validLose={validLose} handleCloseValidLose={handleCloseValidLose} />
                                </Grid>
                            </>
                            :
                            ''}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default Chess;
