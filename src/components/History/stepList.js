import React from 'react';
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import GAMER from "../../icon/img022.jpg";
function StepList({insertMsg}) {
    const classes = useStyles();
    return (
        <ul className="ul">
            {insertMsg.map((item) => {
                return <li> <Grid container xs={12} spacing={1} style={{margin: "5px", width: "auto"}}>
                <Grid item xs={2}>
                    <Avatar className={classes.avatar}>
                        <img src={GAMER} className={classes.icon} alt="GAMER"></img>
                    </Avatar>
                </Grid>
                <Grid item xs={10}  style={{fontFamily: "DancingScript", fontSize: "15px", marginTop: "5px"}} >{item.username}: {item.message}</Grid>
            </Grid></li>
            })}
        </ul>
    )
}

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
export default StepList;