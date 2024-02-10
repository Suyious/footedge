import { useCallback, useEffect, useRef, useState } from "react";

const useMediaStream = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [video, setVideo] = useState<boolean>(true);
    const [audio, setAudio] = useState<boolean>(true);
    const isStreamSet = useRef(false);

    const toggleVideoStream = useCallback(() => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            setVideo(!video);
        }
    }, [stream, video])
    
    const toggleAudioStream = useCallback(() => {
        if(stream) {
            const audioTrack = stream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            setAudio(!audio);
        }
    }, [audio, stream]);
    const stopStream= useCallback(() => {
        if (stream) {
            stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        }
    }, [stream])

    const startStream = useCallback(async () => {
        try {
            const s = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            })
            setStream(s);
            if(!video) toggleVideoStream();
            if(!audio) toggleAudioStream();
        } catch (err) {
            console.log(err);
        }
    }, [audio, toggleAudioStream, toggleVideoStream, video])

    useEffect(() => {
        if(isStreamSet.current) return;
        isStreamSet.current = true;
        startStream()
        return () => {
            setStream(null)
        }
    }, [startStream])

    return { stream, audio, video, stopStream, toggleVideoStream, toggleAudioStream }
}

export default useMediaStream;