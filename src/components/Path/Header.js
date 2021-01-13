import React, { useState, useEffect } from 'react';
import "../../App.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import GAMER from "../../icon/img022.jpg";
import { useSocket } from '../../contexts/SocketProvider';
import AskInvited from '../Modal/askInvited';
import { useHistory } from "react-router-dom";
import UserInfo from "../Modal/userDetail";
function Header({ user }) {
    const classes = useStyles();
    const [showAskInvited, setShowAskInvited] = useState(false);
    const [invitedRoomInfor, setInvitedRoomInfor] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);
    const history = useHistory();
    const onAcceptInvited = () => {
        socket.on('acceptToRoom', (roomId) => {
            history.push(`/chess/${roomId}`);
        })
        socket.emit('acceptToRoom', parseInt(localStorage.getItem("id")), invitedRoomInfor.roomId);
    }
    const socket = useSocket();
    const handleCloseAskInvited = () => setShowAskInvited(false);

    useEffect(() => {
        socket.on('inviteToUser', (data) => {
            setInvitedRoomInfor(data);
            setShowAskInvited(true)
        })
        
        socket.on("quick play", (isMatch, quickRoomId) => {
            console.log("vao")
          if (isMatch) {
            history.push(`/chess/${quickRoomId}`)
          }
        })
    }, [socket])

    return (
        <Typography >
            <AskInvited handleCloseAskInvited={handleCloseAskInvited} invitedRoomInfor = {invitedRoomInfor} onAcceptInvited={onAcceptInvited} showAskInvited={showAskInvited} />
            <Grid container spacing={1}>
                <div style={{ width: "150px" }}></div>
                <div class="itemFooter">
                    <br /><br />
                    <div class="contentHeader">Cờ thủ</div>
                </div>
                <div style={{ width: "50px" }}></div>
                <div class="itemFooter">
                    <Avatar className={classes.avatar}>
                        <img src={GAMER} className={classes.icon} alt="GAMER"></img>
                    </Avatar>
                </div>
                <div style={{ width: "50px" }}></div>
                <div style={{ width: "250px" }}>
                    <br /><br />
                    <div class="contentHeader" onClick={handleShowInfo}>
                        {user.fullName}
                    </div>
                    <UserInfo handleCloseInfo={handleCloseInfo} showInfo={showInfo} user={user} />
                </div>
            </Grid>
        </Typography>
    )
}
const useStyles = makeStyles((theme) => ({
    avatar: {
        marginTop: 20,
        position: "relative",
        background: "rgba(255,255,255,0.85)",
        width: "80px",
        height: "80px",
        boxShadow: "0px 0px 12px rgba(131,153,167,0.99)"
    },
    icon: {
        width: "80px",
        height: "80px",
        color: "rgba(131,153,167,0.79)"
    }
}));
export default Header;