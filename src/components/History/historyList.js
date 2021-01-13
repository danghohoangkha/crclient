import React from 'react';
import "../../App.css";
import Grid from '@material-ui/core/Grid';
import HistoryItem from "./historyItem";
function HistoryList({ historyMatch }) {
  return (
    <>
    <Grid container spacing={4}>
        <Grid item xs={1}></Grid>
            <Grid item xs={5}>
                <div style={{ color: "#FF9900", fontWeight: "bold", fontFamily: "DancingScript", fontSize: "30px" }}>Các trận đã chơi</div>
            </Grid>
        </Grid>
        <br/>
        <Grid container xs={8} className="scrollHistory"> {/* lich su choi */}
            {historyMatch && historyMatch.map((item, index) => (
                <div style={{ backgroundColor: "#00676B" }}>
                    <HistoryItem item={item} key={index} />
                </div>
        ))}
     </Grid>
    </>
  )
}
export default HistoryList;