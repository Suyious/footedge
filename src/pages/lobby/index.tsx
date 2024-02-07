import "./style.css"
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";

const Lobby = () => {
    const [room, setRoom] = useState("");

    const socket = useSocket();

    const onSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        socket?.emit('room:join', { room });
    }, [ room, socket])

    const navigate = useNavigate();
    const handleJoinRoom = useCallback((data: { room: string }) => {
        navigate(`/lobby/${data.room}`)
    }, [navigate]);

    useEffect(() => {
        socket?.on("room:join:success", handleJoinRoom);
        return () => {
            socket?.off("room:join:success");
        }
    }, [socket, handleJoinRoom])

    return (
        <div className="lobby_body">
            <div className="lobby_wrapper">
                <form className="lobby_form" onSubmit={onSubmit}>
                    <p className="lobby_subtitle">Start a <span>video chat</span> with no signup required</p>
                    <label htmlFor="room">
                        <span className="lobby_label input-label_topborder">Room</span>
                        <input className="padding_s border_s" type="text" id="room" value={room} onChange={e => setRoom(e.target.value)}/>
                    </label>
                    <div className="lobby_buttons">
                        <button className="lobby_form_button padding_s filled_secondary" disabled={room.length === 0 }>GO</button>
                        <button className="lobby_form_button padding_s stroked_secondary">New Room</button>
                    </div>
                    <p className="lobby_subtitle">Join an existing room or Create a New One</p>
                </form>
            </div>
        </div>
    )
}

export default Lobby