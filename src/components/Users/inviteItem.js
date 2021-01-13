import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dot from "../../icon/dot.png";
import UserDetail from "../../components/Modal/userDetail";
const orange = "#F2A74B";
const textLight = "#eaf2f4";
const textDark = "#0D0D0D";
function InviteItem({item, index, showInfo, handleCloseInfo, handleShowInfo, handleInvitedUser, itemApi}){
    const classes = useStyles();

    // const handleInvitedUser = (userId)=>{
    //   socket.emit('inviteToUser', inviteUserId, match.params.id);

    // }
    return(
        <Grid container xs={12} spacing={1} style={{margin: "5px", width: "500px"}}>
            <Grid xs={1}><img src={Dot} style={{width:"15px", height:"15px"}} alt="Dot"/></Grid>
            <Grid item xs={6}  style={{color: "white", fontFamily: "DancingScript", fontSize: "15px"}}>
              <div onClick={()=>handleShowInfo(item)} >
                {item.fullName}
              </div>
            </Grid>
            <UserDetail user={itemApi} showInfo={showInfo} handleCloseInfo={handleCloseInfo}/>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}><Button onClick = {()=>{handleInvitedUser(item.id); console.log(item)}} disableRipple variant="outlined" className={classes.button} style={{fontSize: "10px"}}>Mời</Button></Grid>
        </Grid>
)}

const useStyles = makeStyles((theme) => ({
    button: {
        color: textDark,
        background: "rgba(255,255,255,.45)",
        position: "relative",
        fontFamily: "Raleway, sans-serif",
        overflow: "hidden",
        border: "none",
        borderRadius: "8px",
        "&::before, &::after": {
          position: "absolute",
          content: '""',
          boxSizing: "border-box",
          borderRadius: "8px",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 1
        },
        "&::before": {
          borderBottom: "2px solid rgba(255,255,255,.58)",
          borderTop: "2px solid rgba(255,255,255,.58)",
          transform: "scale(0,1)"
        },
        "&::after": {
          borderLeft: "3px solid rgba(255,255,255,.58)",
          borderRight: "3px solid rgba(255,255,255,.58)",
          transform: "scale(1,0)"
        },
        "&:hover::before": {
          transform: "scale(1,1)",
          transition: "transform cubic-bezier(0.85,.36,.8,.42) 0.3s"
        },
        "&:hover::after": {
          transform: "scale(1,1)",
          transition: "transform cubic-bezier(0.85,.36,.8,.42) .2s"
        },
        "&::first-letter": {
          color: orange
        },
        "&:hover": {
          background: "rgba(169,198,217,0.8)",
          color: textLight
        }
      },
  }));
export default InviteItem;