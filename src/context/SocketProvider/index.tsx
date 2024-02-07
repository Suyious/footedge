import { createContext, useMemo } from "react";
import { Socket, io } from 'socket.io-client'

export const SocketContext = createContext<Socket | null>(null);

type SocketProviderProps = {
    children: React.ReactNode
}

export const SocketProvider = ({children}: SocketProviderProps) => {

    const socket = useMemo(() => io("http://localhost:8000"), [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}