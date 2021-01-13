import React, {useState} from 'react';
import "../../App.css";
import InviteItem from "./inviteItem";
import api from '../../callapi';
function InviteList({Users, handleInvitedUser}){
    const [itemApi, setItemApi] = useState({});
    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(false);
    const handleShowInfo = async(item) => {
        let res = await api.get("/api/getUserWithId/"+ item.id);
        setItemApi(res.data);
        setShowInfo(true);
      }
    return(
        <div class="contentCenter">
            <div style={{width: "320px", borderRadius: "10px" }}>
                <br/>
                <ul className="ul">
                    {Users.map((item, index) => (
                    <div style={{ backgroundColor: "#00676B" }}>
                        <li><InviteItem itemApi = {itemApi} handleInvitedUser = {handleInvitedUser} item={item} key={index} showInfo={showInfo} handleCloseInfo={handleCloseInfo} handleShowInfo={handleShowInfo}/></li>
                    </div>
                    ))}
                </ul>
                <br/>
            </div>
        </div>
)}
export default InviteList;