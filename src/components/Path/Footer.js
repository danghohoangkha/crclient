import React from 'react';
import "../../App.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Rank from "../../icon/rank01.png";
import History from "../../icon/history.png";
import DT from "../../icon/dautruong04.png";
function Footer() {
    return(
                    <Typography>
                        <Grid  container spacing={1} >
                            <div class="itemFooter">
                            </div>
                            <div class="itemFooter">
                            </div>
                            <div class="itemFooter">
                                <Link to={"/rank"}>
                                    <div class="itemFooter">
                                        <Button >
                                            <img src={Rank} alt="Rank" height="50px" width="50px"></img>
                                        </Button>
                                    </div>
                                    <div class="contentFooter">Xếp hạng</div>
                                </Link>
                            </div>
                            <div class="itemFooter">
                                <Link to={"/"}>
                                    <div class="itemFooter">
                                        <Button>
                                            <img src={DT} alt="LogoCaro" height="50px" width="45px"></img>
                                        </Button>
                                    </div>
                                    <div class="contentFooter">Đấu trường</div>
                                </Link>
                            </div>
                            <div class="itemFooter">
                                <Link to={"/history"}>
                                    <div class="itemFooter">
                                        <Button>
                                            <img src={History} alt="History" height="50px" width="50px"></img>
                                        </Button>
                                    </div>
                                    <div class="contentFooter">Lịch sử</div>
                                </Link>
                            </div>
                            <div class="itemFooter">
                            </div>
                        </Grid>
                    </Typography>
    )
}
export default Footer;