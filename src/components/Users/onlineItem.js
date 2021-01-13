import React from 'react';
import Grid from '@material-ui/core/Grid';
import Dot from "../../icon/dot.png";
import UserDetail from "../../components/Modal/userDetail";
function OnlineItem({item, index, showInfo, handleCloseInfo, handleShowInfo, itemApi}){
    return(
        <Grid container xs={12} spacing={1} style={{margin: "5px", width: "500px"}}>
            <Grid xs={1}><img src={Dot} style={{width:"15px", height:"15px"}} alt="Dot"/></Grid>
            <Grid item xs={6}  style={{color: "white", fontFamily: "DancingScript", fontSize: "15px"}}>
                <div onClick={()=>handleShowInfo(item)} >
                    {item.fullName}
                </div>
                <UserDetail user={itemApi} showInfo={showInfo} handleCloseInfo={handleCloseInfo}/>
            </Grid>
        </Grid>
)}

export default OnlineItem;