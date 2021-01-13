import React from 'react';
import "../../App.css";
import MessageList from "./messageList";
function Chat({insertMsg, handleInput, handleSendMessage, message}) {
    return (
        <div class="paper" style={{ width: "320px", borderRadius: "10px" }}>
            <div style={{ fontSize: "30px", fontWeight: "bold", color: "red" }}>Trò chuyện</div>
            <MessageList insertMsg={insertMsg} />
            <form id="room_form" action="" onSubmit={handleSendMessage} >
                <br />
                <input type="text" style={{ width: "250px" }} name="message" id="room_name" placeholder="Nhập nội dung ..." autocomplete="off"  onChange={handleInput} class="inputAdd" value={message}/>
                &nbsp;
                <button style={{ height: "45px", borderRadius: "10px", backgroundColor: "#00FFFF", fontSize: "25px" }}>Gửi</button>
            </form>
        </div>
    )
}
export default Chat;