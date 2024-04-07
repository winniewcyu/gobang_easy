import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;
const CONNECTION_PORT = 'localhost:3000/';

function ChatBox() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList([...messageList, data]);
        });
    });

    const connectToRoom = () => {
        setLoggedIn(true);
        socket.emit('join_room', room);
    };

    const sendMessage = async () => {
        let messageContent = {
            room: room,
            content: {
                author: 'Player',
                message: message,
            },
        };

        await socket.emit('send_message', messageContent);
        setMessageList([...messageList, messageContent.content]);
        setMessage('');
    };

    return (
        <div className="Chat">
            {!loggedIn ? (
                <div>
                    <input
                        type="text"
                        placeholder="Room ID..."
                        onChange={(e) => {
                            setRoom(e.target.value);
                        }}
                    />
                    <button onClick={connectToRoom}>Enter Room</button>
                </div>
            ) : (
                <div>
                    <div>
                        {messageList.map((val, key) => {
                            return (
                                <div key={key}>
                                    {val.author}: {val.message}
                                </div>
                            );
                        })}
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}>
                        <input 
                            type="text" 
                            value={message} 
                            onChange={e => setMessage(e.target.value)} 
                            placeholder="Type a message" 
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ChatBox;
