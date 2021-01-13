import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import api from '../../callapi';
import "../../App.css";
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import AddRoom from './addRoom';
import FindChess from './findRoom';
import Button from '@material-ui/core/Button';
import Header from "../../components/Path/Header";
import Back from "../../icon/back.png";
import Find from "../../icon/find.png";
import Add from "../../icon/add01.png";
import UserOnlineList from "../../components/Users/onlineList";
import { useSocket } from '../../contexts/SocketProvider';
import RoomItem from "../../components/Room/roomItem";
function ListChess({ match }) {
  const [addRoom, setAddRoom] = useState(false);
  const [findRoom, setFindRoom] = useState(false);
  const [onlineUser, setOnlineUser] = useState([]);
  const [user, setUser] = useState({});
  const [chessList, setChessList] = useState({});
  const [roomPassword, setRoomPassword] = useState();
  const [isPassword, setIsPassword] = useState(false);
  const history = useHistory();
  let socket = useSocket();
  useEffect(() => {
    if (socket == undefined) return;

    const fetchData = async () => {
      let user;
      try {
        api.defaults.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        user = await api.get('api/getUser');
        setUser(user.data);
        localStorage.setItem("id", user.data.id);

      } catch (error) {
        history.push("/login");
        return;
      }
      socket.on('visitors', function (data) {
        console.log(data)
        var newArray = data.filter(function (el) {
          return el.id !== user.data.id;
        });
        setOnlineUser(newArray);
      });
      socket.emit('visitors');

      const token = localStorage.getItem('token');
      socket.emit('authenticate', token);
      socket.on('update room', (roomList) => {
        setChessList(roomList);
      })
      socket.on('join room', (data) => history.push(`/chess/${data.roomId}`));
    }
    fetchData();
  }, [socket, match])
  //Add room
  const clickAdd = () => {
    setAddRoom(true)
  }
  const clickExitAdd = () => {
    setAddRoom(false)
  }
  const onAddRoom = (data) => {
    console.log(data);
    let clientId = localStorage.getItem("id");
    socket.emit('create room', data.roomName, parseInt(clientId), data.password);
    socket.on('new room', (data) => {
      history.push(`/chess/${data.newRoomId}`);
      console.log(data.newRoomId, data.newRoomName, data.clientName);
    })
  };
  //FindRoom
  const clickFind = () => {
    setFindRoom(true)
    setIsPassword(false)
  }
  const clickExitFind = () => {
    setFindRoom(false)
  }
  const [findRoomMessage, setFindRoomMessage] = useState('');
  const onFindRoom = (dataclient) => {
    socket.on(`findroom`, (data) => {
      console.log(data)
      if (data.find === true) {
        setFindRoomMessage("");
        if (data.isPassword === false) {
          socket.emit('join room', user.id, dataclient.roomName,dataclient.password);
          console.log(dataclient);
          //history.push(`/chess/${dataclient.roomName}`);
        } else {
          setIsPassword(true);
        }
      } else {
        setFindRoomMessage("Không tìm thấy phòng");
      }
    })
    socket.emit('findroom', dataclient.roomName, dataclient.password);
  }
  //JoinRoom
  const handlePassword = (e) => {
    setRoomPassword(e.target.value);
  }
  const handleAddwithPassword = (e, keyName) => {
    e.preventDefault();
    
    socket.emit('join room', user.id, keyName, roomPassword);
  }
  let chessRoomEle = Object.keys(chessList).map((keyName, i) => {
    return (<Grid key={i} xs={3} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <RoomItem chessList={chessList} keyName={keyName} handleAddwithPassword={handleAddwithPassword} handlePassword={handlePassword} user={user} />
              <br />
            </Grid>)
  })
  return (
    <>
      <Grid xs={12}>
        <Grid container xs={12} style={{ top: 5, position: "fixed", height: "80px" }}>
          <Grid xs={2}>
            <Link to={"/"}>
              <Button style={{ color: "#CCFFFF", fontWeight: "bold" }}>
                <img src={Back} alt="Back" width="50px" height="50px"></img>
              </Button>
            </Link>
          </Grid>
          {/* Middle */}
          <Grid xs={7}>
            <Grid style={{ top: 5, position: "fixed", height: "80px", width: "700px" }}>
              <Header user={user} /><hr />
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} style={{ top: 110, position: "fixed", height: "600px" }}>
          <Grid xs={9} style={{}}>
            <Grid container spacing={4}>
              <Grid item xs={1}></Grid>
              <Grid item xs={5}>
                <div style={{ color: "#FF9900", fontWeight: "bold", fontFamily: "DancingScript", fontSize: "30px" }}>Các phòng chơi</div>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={1}>
                <Button onClick={() => clickAdd()}>
                  <img src={Add} alt="Back" width="40px" height="40px"></img>
                </Button>
                <AddRoom clickExitAdd={clickExitAdd} addRoom={addRoom} onAddRoom={onAddRoom} />
              </Grid>
              <Grid item xs={1}>
                <Button onClick={() => clickFind()}>
                  <img src={Find} alt="Back" width="40px" height="40px"></img>
                </Button>
                <FindChess clickExitFind={clickExitFind} findRoom={findRoom} onFindRoom={onFindRoom} findRoomMessageFindRoom = {findRoomMessage} IsPasswordFindRoom = {isPassword} />
              </Grid>
            </Grid>
            <br />
            <Grid container xs={8} className="scrollListRooms">
                {chessRoomEle}
            </Grid>
          </Grid>
          <Grid xs={3}>
                <UserOnlineList onlineUser={onlineUser} />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ListChess;