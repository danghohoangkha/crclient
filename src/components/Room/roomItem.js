import React from 'react';
import { useSocket } from '../../contexts/SocketProvider';
import RoomIcon from "../../icon/boardEmpty.png";
import { useHistory } from "react-router-dom";

function RoomItem({chessList, keyName, handleAddwithPassword, handlePassword, user}){
    const history = useHistory();
    let socket = useSocket();
    return(
        <div class="backgroundBoard" style={{ backgroundImage: `url(${RoomIcon})` }} >
        <div class="card-body contentBoard" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3 class="card-title" style={{ fontSize: "20px", color: "#FF9900" }}>{chessList[keyName].roomName}</h3>
          {chessList[keyName].isPassword === true ?
            <form onSubmit={(e) => handleAddwithPassword(e, keyName)} class="contentBoard" >
              <input type="password" name="name" onChange={handlePassword} style={{ width: "120px" }} required />
              <button class="btnJoin" type="submit" >VÀO</button>
            </form>
            :
            <button class="btnJoin" onClick={() => { socket.on('join room', (data) => {console.log(data); history.push(`/chess/${data.roomId}`)}); console.log(user.id, keyName); socket.emit('join room', user.id, keyName); }}>VÀO</button>
          }
        </div>
      </div>
)}
export default RoomItem;