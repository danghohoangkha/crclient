import React from 'react';
import "../../App.css";
import Grid from '@material-ui/core/Grid';
import RoomIcon from "../../icon/boardEmpty.png";
import { Link } from "react-router-dom";
function HistoryItem({ item, index }) {
  return (
    <Grid container key={index} xs={3} class="contentCenter">
      <div class="backgroundBoard" style={{ backgroundImage: `url(${RoomIcon})` }} >
        <div class="card-body contentBoard"  class="contentCenter">
          <br />
          <h3 class="card-title" style={{ fontSize: "20px", color: "#FF9900" }}>{item.name}</h3>
          <h3 class="card-title" style={{ fontSize: "20px", color: "#FF9900" }}>{localStorage.getItem("id") == item.winner ? "Thắng" : "Thua"}</h3>
          <Link class="btnJoin" to={`/matchhistory/${item.id}`}>Xem</Link>
        </div>
      </div>
      <br />
    </Grid>
  )
}
export default HistoryItem;