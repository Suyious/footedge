import { useEffect, useRef, useState } from "react";

const useMediaStream = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const isStreamSet = useRef(false);

    useEffect(() => {
        if(isStreamSet.current) return;
        isStreamSet.current = true;
        (async () => {
            try {
                const s = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                })
                setStream(s);
            } catch (err) {
                console.log(err);
            }
        })()
        return () => {
            setStream(null);
        }
    }, [])

    return { stream }
}

export default useMediaStream;