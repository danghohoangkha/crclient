import React, {useState} from 'react';
import "../../App.css";
import ViewerItem from "./onlineItem";
function OnlineList({Users}){
    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = () => setShowInfo(true);
    return(
        <div class="contentCenter">
            <div style={{width: "320px", borderRadius: "10px" }}>
                <br/>
                <ul className="ul">
                    {Users.map((item, index) => (
                    <div style={{ backgroundColor: "#00676B" }}>
                        <li><ViewerItem  item={item} key={index} showInfo={showInfo} handleCloseInfo={handleCloseInfo} handleShowInfo={handleShowInfo}/></li>
                    </div>
                    ))}
                </ul>
                <br/>
            </div>
        </div>
)}
export default OnlineList;