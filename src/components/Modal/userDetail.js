import React from 'react';
import "../../App.css";
import Grid from '@material-ui/core/Grid';
import Modal from 'react-bootstrap/Modal';
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import GAMER from "../../icon/img022.jpg";
import api from "./../../callapi/index"
function UserDetail({user, showInfo, handleCloseInfo}){
    const classes = useStyles();
    
    // useEffect(()=>{
    //     const fecthData = async ()=>{
    //         await api.get("/api/getUserWithId/:id");
    //     }
    // },[user])
    return(
        <> {user? 
        <Modal show={showInfo} onHide={handleCloseInfo} animation={false} centered>
          <Paper container class="paperInvite">
            <div >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div class="contentCenter">
                    <Avatar className={classes.avatar}>
                        <img src={GAMER} className={classes.icon} alt="GAMER"></img>
                    </Avatar>
                </div>
                <br/>
                <div class="contentCenter">
                    <Grid container xs={12}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={7} style={{fontSize: "20px", fontWeight: "bold",}}>
                            Tên: &nbsp;
                            {user.fullName}
                        </Grid>
                        <Grid item xs={4} style={{fontSize: "20px", fontWeight: "bold",}}>
                            Cấp bậc: &nbsp;
                            {user.level}
                        </Grid>
                    </Grid>
                </div>
                <br/>
                <div class="contentCenter">
                    <Grid container xs={12}>
                    <Grid item xs={1}></Grid>
                        <Grid item xs={7} style={{fontSize: "20px", fontWeight: "bold",}}>
                            Số trận: &nbsp;
                            {user.winMatch + user.drawMatch + user.loseMatch}
                        </Grid>
                        <Grid item xs={4} style={{fontSize: "20px", fontWeight: "bold",}}>
                            Tỉ lệ: &nbsp;
                            {user.rating}%
                        </Grid>
                    </Grid>
                </div>
                <br/>
                <div class="contentCenter">
                    <Grid container xs={12}>
                    <Grid item xs={1}></Grid>
                        <Grid item xs={11} style={{fontSize: "20px", fontWeight: "bold",}}>
                        Tham gia:&nbsp;
                         {user.createdDate?user.createdDate.substring(0,10): ''}
                        </Grid>
                    </Grid>
                </div>
                <br/>
            </Modal.Body>
            </div>
          </Paper>
        </Modal>: ''}
      </>
)}
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
export default UserDetail;