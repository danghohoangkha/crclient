import React from 'react';
import "../../App.css";
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
const orange = "#F2A74B";
const textLight = "#eaf2f4";
const textDark = "#0D0D0D";
function ValidDraw({handleDraw, validDraw, handleCloseValidDraw}){
  const classes = useStyles();
    return(
      <>
      <Modal show={validDraw} onHide={handleCloseValidDraw} animation={false} centered>
        <Paper container className={classes.paper}>
          <div class="contentCenter">
          <Modal.Header >
            <Modal.Title class="contentAdd">Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{fontSize: "20px"}}>
                 Bạn có chắc chắn muốn cầu hoà?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseValidDraw} className={classes.button}>
              Huỷ bỏ
            </Button>
            <Button variant="primary" onClick={handleDraw} className={classes.button}>
              Đồng ý
            </Button>
          </Modal.Footer>
          </div>
        </Paper>
      </Modal>
    </>
)}

export default ValidDraw;

const useStyles = makeStyles((theme) => ({
  paper: {
    background:
      "linear-gradient(180deg, rgba(102 205 170) 15%, rgba(0 139 139) 90%)",
    boxShadow: ".2px 12px 18px rgba(131,153,167,0.6)",
  },
  button: {
    color: textDark,
    background: "#00FFFF",
    position: "relative",
    fontWeight: 400,
    fontFamily: "Raleway, sans-serif",
    overflow: "hidden",
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