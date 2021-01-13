import React, { useEffect, useState } from 'react';
import api from '../../callapi';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LogOut from "../../icon/logout.png";
import { useHistory } from "react-router-dom";
import UserOnlineList from "../../components/Users/onlineList";
import { useSocket } from '../../contexts/SocketProvider';
import Footer from "../../components/Path/Footer";
import Header from "../../components/Path/Header";
import BodyDT from "../../components/Play/DauTruong";
import "../../App.css";
import AskLogout from "../../components/Modal/askLogout";
const Home = () => {
  let history = useHistory();
  const [onlineUser, setOnlineUser] = useState([]);
  const [user, setUser] = useState({});
  const socket = useSocket();
  const [showAskLogout, setShowAskLogout] = useState(false);

  useEffect(() => {
    if (socket === undefined) return;
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

    }
    fetchData();
  }, [socket])
//Logout
  const onLogout = () => {
      localStorage.removeItem('token');
      history.push('/login');
      socket.emit('logout');
  }
  const handleCloseAskLogout = () => setShowAskLogout(false);
  const handleShowAskLogout = () => setShowAskLogout(true);

  return (
    <>
      <Grid xs={12} >
        <Grid container xs={12} style={{ top: 5, position: "fixed", height: "80px" }}>
            <Grid xs={2}>
                <Button style={{ color: "#CCFFFF", fontWeight: "bold" }}  onClick={handleShowAskLogout}>
                <img src={LogOut} class="icon" alt="Back"></img>
              </Button>
                <AskLogout handleCloseAskLogout={handleCloseAskLogout} showAskLogout={showAskLogout} onLogout={onLogout} />
            </Grid>
            {/* Middle */}
            <Grid xs={7}>
              <Grid style={{ top: 5, position: "fixed"}}>
                <Header user={user} />
                <hr />
              </Grid>
            </Grid>
        </Grid>
        <Grid container xs={12} style={{  top: 110, position: "fixed", height: "80px" }}>
            <Grid xs={9} style={{}}>
              <Grid container spacing={4}>
                <Grid item xs={1}></Grid>
                <Grid xs={11}>
                      <Grid style={{ top: 100, position: "fixed", height: "500px", width: "700px" }}>
                        <BodyDT />
                      </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={3}>
              <UserOnlineList onlineUser={onlineUser} />
            </Grid>
        </Grid>
        <Grid container xs={12} style={{ top: 600, position: "fixed", height: "80px" }}>
            <Grid xs={2}></Grid>
            <Grid xs={7}>
              <Grid style={{ bottom: 10, position: "fixed"}}>
                        <Footer />
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;