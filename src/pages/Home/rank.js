import React, { useEffect, useState } from 'react';
import api from '../../callapi';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LogOut from "../../icon/logout.png";
import { useHistory } from "react-router-dom";
import OnlineList from "../../components/Users/onlineList";
import { useSocket } from '../../contexts/SocketProvider';
import Footer from "../../components/Path/Footer";
import Header from "../../components/Path/Header";
import Rank from "../../components/Rank/rankList";
import "../../App.css";
import AskLogout from "../../components/Modal/askLogout";
const Home = () => {
  let history = useHistory();
  const [onlineUser, setOnlineUser] = useState([]);
  const [user, setUser] = useState({});
  const socket = useSocket();
  const [showAskLogout, setShowAskLogout] = useState(false);
  const [rankList, setRankList] = useState([]);

  useEffect(() => {
    if (socket === undefined) return;

    const fetchData = async () => {
      let user, topRank;
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
        //console.log(data)
        var newArray = data.filter(function (el) {
          return el.id !== user.data.id;
        });
        setOnlineUser(newArray);
      });
      socket.emit('visitors');
      const token = localStorage.getItem('token');
      socket.emit('authenticate', token);
      //lay top rank
      topRank = await api.get('/api/getrank');
      setRankList(topRank.data);
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
              <Grid style={{ top: 5, position: "fixed", height: "60px", width: "700px" }}>
                <Header user={user} />
                <hr />
              </Grid>
            </Grid>
        </Grid>
        <Grid container xs={12} style={{  top: 110, position: "fixed", height: "80px" }}>
            <Grid xs={9} container style={{}} >
                <Rank rankList={rankList} />
            </Grid>
            <Grid xs={3}>
                  <OnlineList onlineUser={onlineUser} />
            </Grid>
        </Grid>
        <Grid container xs={12} style={{ top: 600, position: "fixed", height: "80px" }}>
            <Grid xs={2}></Grid>
            <Grid xs={7}>
              <Grid style={{ bottom: 10, position: "fixed", width: "700px" }}>
                        <Footer />
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    </>
  );
}
export default Home;