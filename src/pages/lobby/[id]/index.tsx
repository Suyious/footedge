import "./style.css"

import { useEffect, useRef, useState } from "react";
import useMediaStream from "../../../hooks/useMediaStream";
import { CameraVideo, Microphone } from "../../../assets/icons";

const LobbyRoom = () => {
    const { stream, audio: audioStatus, video: videoStatus, stopStream, toggleVideoStream, toggleAudioStream } = useMediaStream();

    const [name, setName] = useState("");

    const video = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if(video.current) video.current.srcObject = stream;
        return () => {
            stopStream();
        }
    }, [stream, stopStream])

    return (
        <div className="lobby-room_body">
            <p className="lobby-room_subtitle">Type a name for yourself in the room</p>
            <label className="lobby-room_input_wrapper flex_column" htmlFor="name">
                <span className="lobby-room_label input-label_topborder">Username</span>
                <input className="padding_s border_s" type="text" id="name" value={name}onChange={e => setName(e.target.value)}/>
            </label>
            <div className="lobby-room_video_component_wrapper">
                <img src="/bow.png" alt="the bow" />
                <div className="lobby-room_video_wrapper border_s">
                    <video ref={video} autoPlay muted></video>
                </div>
                <div className="lobby-room_toggle_buttons">
                    <button className="lobby-room_toggle_button" onClick={toggleAudioStream}>
                        <Microphone enabled={audioStatus}/>
                    </button>
                    <button className="lobby-room_toggle_button" onClick={toggleVideoStream}>
                        <CameraVideo enabled={videoStatus}/>
                    </button>
                </div>
            </div>
            <button className="lobby-room_button padding_s filled_secondary" disabled={name.length === 0}>Join</button>
        </div>
    )
}

export default LobbyRoom