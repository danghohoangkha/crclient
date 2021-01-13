import React, { useState } from "react";
import "../../App.css";
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
const orange = "#F2A74B";
const textLight = "#eaf2f4";
const textDark = "#0D0D0D";
function FindRoom({ clickExitFind, onFindRoom, findRoom, findRoomMessageFindRoom, IsPasswordFindRoom }) {
  const classes = useStyles();
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState(null);


  const handleInput = (e) => {
    if (e.target.name === "name") {
      setRoomName(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onFindRoom({ roomName: roomName, password: password });
  }

  return (
    <>
      <Modal show={findRoom} onHide={clickExitFind} animation={false} centered>
        <Paper container className={classes.paper}>
          <form onSubmit={handleSubmit} class="contentCenter">
            <Modal.Header>
              <Modal.Title class="contentAdd">Tìm kiếm phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body class="contentBoard">
              <br />
              {findRoomMessageFindRoom}
              <input type="text" placeholder="Nhập ID phòng ......." name="name" maxLength="12" onChange={handleInput} class="inputAdd" autoComplete="off" required />
              {IsPasswordFindRoom ? <input type="text" placeholder="Nhập mật khẩu" name="password" onChange={handleInput} class="inputAdd" required /> : ''}
              <br />
            </Modal.Body>
            <Modal.Footer>
              &nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={() => { clickExitFind() }} className={classes.button}>
                Huỷ
          </Button>
          &nbsp;&nbsp;
          <Button type="submit" className={classes.button}>
                Tìm
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </Modal.Footer>
          </form>
        </Paper>
      </Modal>
    </>
  )
}
export default FindRoom;

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