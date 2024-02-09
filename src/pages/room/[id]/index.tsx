import "./style.css"
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "../../../hooks/useSocket";
import useMediaStream from "../../../hooks/useMediaStream";
import { CameraVideo, DialerHangUp, Microphone } from "../../../assets/icons";

const Room = () => {

    const socket = useSocket();
    const { stream: outgoingStream, audio: audioStatus, video: videoStatus, stopStream, toggleAudioStream, toggleVideoStream } = useMediaStream();

    const outgoingRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if(outgoingRef.current) outgoingRef.current.srcObject = outgoingStream;
        return () => {
            stopStream();
        }
    }, [outgoingStream, stopStream])

    const [connection, setConnection] = useState<boolean>(false);
    const onUserJoined = useCallback(({ user, username }: { user: string, username: string}) => { 
        console.log(`${username}(${user}) joined`);
        setConnection(true);
    }, [])

    useEffect(() => {
        socket?.on("user:joined",onUserJoined);
        return () => {
            socket?.off("user:joined",onUserJoined);
        }
    }, [socket, onUserJoined])

    return (
        <div className="room_body">
            <div className="room_wrapper">
                <div className="room_video_second_person_main">
                    { connection ? "Connected": "No Connection"}
                </div>
                <div className="room_video_second_person_buttons">
                    <button className={`room_video_second_person_button normal${audioStatus? " enabled": " disabled"}`} onClick={toggleAudioStream}>
                        <Microphone enabled={audioStatus}/>
                    </button>
                    <button className="room_video_second_person_button hangup bigger">
                        <DialerHangUp/>
                    </button>
                    <button className={`room_video_second_person_button normal${videoStatus? " enabled": " disabled"}`} onClick={toggleVideoStream}>
                        <CameraVideo enabled={videoStatus}/>
                    </button>
                </div>
                <div className="room_video_first_person_main">
                    <video ref={outgoingRef} autoPlay muted></video>
                </div>
            </div>
        </div>
    )
}

export default Room;