import React, { useState } from "react";
import axios from "axios";

const Message = () => {
    const [content, setContent] = useState("");

    const sendMessage = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:4000/messages",
                { content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Message sent!");
            setContent("");
        } catch (error) {
            console.error("Failed to send message:", error.message);
        }
    };

    return (
        <div>
            <h1>Send a Message</h1>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your message here..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Message;
