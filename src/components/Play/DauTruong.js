import React from 'react';
import "../../App.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Play from "../../icon/newgame02.png";
import LogoCaro from "../../icon/logoCaro.png";
import { useSocket } from '../../contexts/SocketProvider';
function Header() {
    let socket = useSocket();

    const handleQuickPlay = () => {
        socket.emit('quick play', parseInt(localStorage.getItem('id')));
      }
    return(
                <Typography >
                    <Grid container spacing={1} style={{marginTop: 180, marginLeft: 280}}>
                            <Button onClick = {handleQuickPlay}>
                                <div style={{width: "200px"}} class="contentCenter">
                                    <div  class="contentCenter">
                                        <img src={Play} alt="LogoCaro" height="200px"></img>
                                    </div>
                                    <div style={{fontSize: "20px", color: "red", fontWeight: "bold"}}  class="contentCenter">
                                    Chơi ngay
                                    </div>
                                </div>
                            </Button>
                        <div style={{width: "50px"}}></div>
                        <Link to={"/chessList"}>
                            <Button>
                                <div style={{width: "200px"}}  class="contentCenter">
                                    <div class="contentCenter">
                                        <img src={LogoCaro} alt="LogoCaro" height="200px"></img>
                                    </div>
                                    <div style={{fontSize: "20px", color: "red", fontWeight: "bold"}}  class="contentCenter">
                                        Phòng chơi
                                    </div>
                                </div>
                            </Button>
                        </Link>
                    </Grid>
                </Typography>
    )
}
export default Header;