import React from 'react';
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import PlayerItem01 from "./PlayerItem01";
import PlayerItem02 from "./PlayerItem02";
import VS from "../../icon/vs.png";
function PlayerList({player1, player2, onInChess}) {
    const classes = useStyles();
    return (
       <Grid container xs={12} style={{marginTop:"50px"}}>
           <Grid xs={12}>
               <PlayerItem01 player={player1} onInChess={onInChess}/>
           </Grid>
           <img src={VS} className={classes.iconVS} alt="" />
           <Grid xs={12}>
               <PlayerItem02  player={player2} onInChess={onInChess}/>
           </Grid>
       </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
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
    },
    iconVS: {
        width: "250px",
        height: "80px",
        color: "rgba(131,153,167,0.79)"
      },
  }));
export default PlayerList;