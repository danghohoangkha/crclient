import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { useSocket } from '../../contexts/SocketProvider';
import "../../App.css";
import Modal from 'react-bootstrap/Modal';
import Paper from "@material-ui/core/Paper";
import InviteList from "../Users/inviteList";
function InviteUsersOnline({clickExitUsersOnl, usersOnl, handleInvitedUser}){
  const [userOutRoom, setUserOutRoom] = useState([]);
  let socket = useSocket();
  useEffect(() => {
    if (socket === undefined) return;
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      socket.emit('authenticate', token);
      //nguoi da o ngoai phong chua vao ban choi nao khac
      socket.on("getusersnotinroom", data =>{
        console.log(data);
        setUserOutRoom(data);
      });
      socket.emit("getusersnotinroom");

    }
    fetchData();
  }, [socket])
    return(
        <>
        <Modal show={usersOnl} onHide={clickExitUsersOnl} animation={false} centered>
          <Paper container class="paperInvite">
            <div >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div class="contentCenter">
                    <div>
                        <Button style={{backgroundColor: "#00FFFF", borderRadius: "10px"}}>Mời vào phòng</Button>
                    </div>
                    <InviteList handleInvitedUser = {handleInvitedUser} Users={userOutRoom} />
                </div>
                <br/>
            </Modal.Body>
            </div>
          </Paper>
        </Modal>
      </>
)}
export default InviteUsersOnline;