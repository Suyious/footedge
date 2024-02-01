import { useCallback, useState } from "react";
import "./style.css"
import { Link } from "react-router-dom";

const Lobby = () => {
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    const onSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
    }, [])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">
                    Email:
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
                <label htmlFor="room">
                    Room:
                    <input type="text" id="room" value={id} onChange={e => setId(e.target.value)}/>
                </label>
                <button>DO</button>
            </form>
            { id && <Link to={`/room/${id}`}>Go</Link>}
        </div>
    )
}

export default Lobby