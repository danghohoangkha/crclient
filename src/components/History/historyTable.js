import React from 'react';
import "../../App.css";
import StepList from "./stepList";
function HistoryTable({insertMsg, handleInput, handleSendMessage, message}) {
    return (
        <div class="paper" style={{ width: "320px", borderRadius: "10px" }}>
            <div style={{ fontSize: "30px", fontWeight: "bold", color: "red" }}>Lịch sử</div>
            <StepList insertMsg={insertMsg} />
        </div>
    )
}
export default HistoryTable;