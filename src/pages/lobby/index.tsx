import { useNavigate } from "react-router-dom";
import "./style.css";
import { useCallback, useState } from "react";

const Lobby = () => {
    const [room, setRoom] = useState("");

    const navigate = useNavigate();
    const onSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/lobby/${room}`)
    }, [ room, navigate])

    return (
        <div className="lobby_body">
            <div className="lobby_wrapper">
                <form className="lobby_form" onSubmit={onSubmit}>
                    <p className="lobby_subtitle">Start a <span>video chat</span> with no signup required</p>
                    <label className="flex_column" htmlFor="room">
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