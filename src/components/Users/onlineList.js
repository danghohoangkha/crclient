import React, {useState} from 'react';
import "../../App.css";
import OnlineItem from "./onlineItem";
import api from '../../callapi';
function OnlineList({onlineUser}){
    const [itemApi, setItemApi] = useState({});
    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = async(item) => {
      let res = await api.get("/api/getUserWithId/"+ item.id);
      setItemApi(res.data);
      setShowInfo(true);
    }
    return(
        <div className="contentCenter">
            <div class="paper" style={{width: "320px", borderRadius: "10px" }}>
                <div style={{fontSize: "30px", fontWeight: "bold", color: "red", alignItems:"center"}}>Người chơi online</div>
                <ul className="ul">
                        {onlineUser.map((item, index) => (
                          <div style={{ backgroundColor: "#00676B" }}>
                            <li><OnlineItem itemApi = {itemApi} item={item} key={index} showInfo={showInfo} handleCloseInfo={handleCloseInfo} handleShowInfo={handleShowInfo} /></li>
                          </div>
                        ))}
                </ul>
                <br/>
            </div>
        </div>
)}
export default OnlineList;