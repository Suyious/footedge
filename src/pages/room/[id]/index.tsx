import "./style.css"
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "../../../hooks/useSocket";
import useMediaStream from "../../../hooks/useMediaStream";
import { CameraVideo, DialerHangUp, Microphone } from "../../../assets/icons";
import peer from "../../../services/peer";

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

    const [incomingStream, setIncomingStream] = useState<MediaStream | null>(null);
    const incomingRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if(incomingRef.current && incomingStream) incomingRef.current.srcObject = incomingStream; 
    }, [incomingStream])

    const [remoteSocket, setRemoteSocket] = useState<string | null>(null);
    const onUserJoined = useCallback(async ({ user, username }: { user: string, username: string}) => { 
        console.log(`${username}(${user}) joined`);
        setRemoteSocket(user);
        const offer = await peer.getOffer();
        socket?.emit("offer:incoming", { id: user, offer })
    }, [socket])

    const onOfferReceived = useCallback(async ({ user, offer }: { user: string, offer: RTCSessionDescriptionInit }) => {
        console.log(user, offer);
        setRemoteSocket(user);
        const ans = await peer.getAnswer(offer);
        socket?.emit("ans:incoming", { id: user, ans });
    }, [socket]);

    const onAnsReceived = useCallback(({ user, ans }: { user: string, ans: RTCSessionDescriptionInit}) => {
        peer.setLocalDescription(ans)
        console.log(user, " recieved ", ans);
        if(outgoingStream) {
            for (const track of outgoingStream.getTracks()) {
                peer.peer?.addTrack(track, outgoingStream);
            }
        }
    }, [outgoingStream]);

    useEffect(() => {
        peer.peer?.addEventListener("track", async (event) => {
            const stream = event.streams;
            setIncomingStream(stream[0]);
        })
    }, [])

    useEffect(() => {
        socket?.on("user:joined",onUserJoined);
        socket?.on("offer:received", onOfferReceived);
        socket?.on("ans:received", onAnsReceived);
        return () => {
            socket?.off("user:joined",onUserJoined);
            socket?.off("offer:received", onOfferReceived);
            socket?.off("ans:received", onAnsReceived);
        }
    }, [socket, onUserJoined, onOfferReceived, onAnsReceived])

    return (
        <div className="room_body">
            <div className="room_wrapper">
                <div className="room_video_second_person_main">
                    { remoteSocket ? 
                        <p className="room_video_status">Connected</p>:
                        <p className="room_video_status">No Connection</p> }
                    <video ref={incomingRef} autoPlay></video>
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