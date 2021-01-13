import React from 'react';
import "../../App.css";
import Grid from '@material-ui/core/Grid';
import RankItem from "./rankItem";
function RankList({rankList}) {
  return (
    <>
    <Grid xs={4}></Grid>
    <Grid xs={7} class="contentCenter">
        <div style={{fontSize: "30px", fontWeight: "bold", color: "#FF9900"}}>Xếp hạng</div>
            <ol className="ulRank">
                {rankList.map((item, index) => (
                    <div style={{ backgroundColor: "#00676B" }}>
                        <li><RankItem item={item} key={index} /></li>
                    </div>
                ))}
            </ol>
    </Grid>
    </>
  )
}
export default RankList;