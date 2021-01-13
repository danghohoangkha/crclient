import React from 'react';
import "../../App.css";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import GAMER from "../../icon/img022.jpg";
import CoThu from "../../icon/logo.png";
const orange = "#F2A74B";
const textLight = "#eaf2f4";
const textDark = "#0D0D0D";
function PlayerItem({player, onInChess}) {
    const classes = useStyles();
    return (
        <>
        <div class="contentCenter" style={{maxWidth: "250px"}}><img src={CoThu} className={classes.iconCT} alt=""></img></div>
        <Card className={classes.root}>
            <br/>
            {player ?
          <> <Grid xs={12} class="contentCenter">
                <Avatar className={classes.avatar}>
                    <img src={GAMER} className={classes.icon} alt="GAMER"></img>
                </Avatar>
            </Grid>
            <Grid xs={12} class="contentCenter">
                <div className={classes.fontStyle}>Tên: {player.fullName}</div>
            </Grid>
            <Grid xs={12} class="contentCenter">
                <div className={classes.fontStyle}>Cấp bậc: {player.level}</div>
            </Grid>
            <Grid xs={12} class="contentCenter">
                <div className={classes.fontStyle}>Số cúp: {player.cupCount}</div>
            </Grid>
            <br/></>
            :
            <div class="contentCenter">
              <Button onClick={() => onInChess(2)} className={classes.button}>Vào bàn</Button>
            </div>
            }
      </Card>
      </>
    )
}

const useStyles = makeStyles((theme) => ({
    fontStyle:{
        color: " #FFD700",
        fontSize: 18,
    },
    root: {
        maxWidth: 250,
        maxHeight: 250,
        minHeight: 200,
        borderRadius: 15,
        background: "linear-gradient(180deg, rgba(102 205 170) 15%, rgba(0 139 139) 90%)",
      },
      media: {
        height: 140,
      },
    avatar: {
    //   marginTop: 20,
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
    },
    iconCT: {
        width: "150px",
        height: "50px",
        color: "rgba(131,153,167,0.79)"
      },
      button: {
        fontSize:"15px",
        color: textDark,
        background: "rgba(255,255,255,.45)",
        position: "relative",
        fontWeight: "bold",
        fontFamily: "Raleway, sans-serif",
        overflow: "hidden",
        marginTop: theme.spacing(6),
        padding: `${theme.spacing(1.6)}px`,
        border: "none",
        borderRadius: "8px",
        letterSpacing: "3px",
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
export default PlayerItem;