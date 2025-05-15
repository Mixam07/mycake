import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Navigate, useParams } from "react-router-dom";
import "./Chat.css"
import { NavLink } from "react-router-dom";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

const Chat = (props: any) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { id } = useParams();
    const chat = props.chats?.find((item: any) => item.opponent._id == id);
    const [ message, setMessage ] = useState("");
    const chat_list = props.chats?.map((chat: any, i: number) => {
        const lastMessege = chat.messages[chat.messages.length - 1]?.text;
        return (
            <NavLink to={`/chats/${chat.opponent._id}`} className="chat__chats-item" key={i+1}>
                <div className="chat__chats-image">
                    <img src="https://lh3.googleusercontent.com/a/default-user=s80-p" alt="user" />
                </div>
                <div className="chat__chats-wrap">
                    <p className="chat__chats-name">{chat.opponent.name}</p>
                    <p className="chat__chats-text">{lastMessege}</p>
                </div>
            </NavLink>
        )
    });
    const history = chat?.messages?.map((item: any, i: number) => {
        return(
            <div className={`chat__messeger-item ${props.senderName == item.user ? "my" : ""}`} key={i+1}>{item.text}</div>
        )
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };
      
    useEffect(() => {
        scrollToBottom();
    }, [chat?.messages]);

    useEffect(() => {
        socket.on("receive_message", (data: any) => {
            props.getChats();
        });

        props.getChats();

        return () => {
            socket.off("receive_message");
        };
    }, []);

    useEffect(() => {
        if(id) {
            props.getChatUser(id);
        }
    }, [id]);

    const sendMessage = async () => {
        if(props.senderId){
            socket.emit("send_message", {
                text: message,
                receiverId: id,
                senderId: props.senderId
            });
        }

        setMessage("");
    };

    return (
        <section className="chat">
            <div className="chat__conatiner container">
                <div className="chat__wrapper">
                    <div className="chat__chats">{chat_list}</div>
                    <div className="chat__messeger">
                        {
                            id &&
                            <>
                                <div className="chat__messeger-user">
                                    <div className="chat__messeger-photo">
                                        <img src="https://lh3.googleusercontent.com/a/default-user=s80-p" alt="user" />
                                    </div>
                                    <p className="chat__messeger-name">{props.user?.name}</p>
                                </div>
                                <div className="chat__messeger-main">
                                    <div className="chat__messeger-history">
                                        <div className="chat__meseger-scroll" />
                                        {history}
                                        <div ref={messagesEndRef} />
                                    </div>
                                    <div className="chat__messeger-form">
                                        <input className="chat__messeger-input" onInput={ (e: any) => { setMessage(e.target.value) } } value={message} type="text" />
                                        <button className="chat__messeger-submit" onClick={sendMessage}>Send</button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Chat;