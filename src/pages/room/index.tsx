import { useParams } from "react-router-dom";
import "./style.css"

const Room = () => {

    const {id} = useParams();

    return (
        <div> {id} </div>
    )
}

export default Room;