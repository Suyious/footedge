import { useCallback, useEffect, useRef, useState } from "react";

const useMediaStream = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [video, setVideo] = useState<boolean>(false);
    const [audio, setAudio] = useState<boolean>(false);
    const isStreamSet = useRef(false);

    const stopStream= useCallback(() => {
        if (stream) {
            stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        }
    }, [stream])

    const startStream = async () => {
        try {
            const s = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            })
            setStream(s);
            setAudio(true);
            setVideo(true);
        } catch (err) {
            console.log(err);
        }
    }

    const toggleVideoStream = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            setVideo(!video);
        }
    }
    
    const toggleAudioStream = () => {
        if(stream) {
            const audioTrack = stream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            setAudio(!audio);
        }
    }

    useEffect(() => {
        if(isStreamSet.current) return;
        isStreamSet.current = true;
        startStream()
        return () => {
            setStream(null)
            setVideo(false);
            setAudio(false);
        }
    }, [])

    return { stream, audio, video, stopStream, toggleVideoStream, toggleAudioStream }
}

export default useMediaStream;