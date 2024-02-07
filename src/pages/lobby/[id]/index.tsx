import "./style.css"

import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import { useSocket } from "../../../hooks/useSocket";
import useMediaStream from "../../../hooks/useMediaStream";

const LobbyRoom = () => {
    const {id} = useParams();
    const socket = useSocket();
    const { stream } = useMediaStream();

    const video = useRef<HTMLVideoElement>(null);

    const handleUserJoin = useCallback(({ user }: { user:string }) => {
        console.log("New User Joined:", user);
    }, [])

    useEffect(() => {
        socket?.on("user:joined", handleUserJoin)
    }, [handleUserJoin, socket])

    useEffect(() => {
        if(video.current) video.current.srcObject = stream;
    }, [stream])

    return (
        <div className="lobby-room_body">
            You are entering Room {id}
            <video ref={video} autoPlay></video>
        </div>
    )
}

export default LobbyRoom