import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import GAMER from "../../icon/img022.jpg";

function Rank({item, index}){
    const classes = useStyles();
    return(
        <Grid container xs={12} spacing={1} style={{margin: "5px", width: "auto"}}>
            <Grid item xs={2}>
                <Avatar className={classes.avatar}>
                    <img src={GAMER} className={classes.icon} alt="GAMER"></img>
                </Avatar>
            </Grid>
            <Grid item xs={6}  style={{color: "white", fontFamily: "DancingScript", fontSize: "15px", marginTop: "15px"}} >{item.fullName}, Số cúp:{item.cupCount}</Grid>
            <Grid item xs={2}></Grid>
        </Grid>
)}
const useStyles = makeStyles((theme) => ({
  avatar: {
  //   marginTop: 20,
    position: "relative",
    background: "rgba(255,255,255,0.85)",
    width: "50px",
    height: "50px",
    boxShadow: "0px 0px 12px rgba(131,153,167,0.99)"
  },
  icon: {
    width: "50px",
    height: "50px",
    color: "rgba(131,153,167,0.79)"
  }
}));
export default Rank;