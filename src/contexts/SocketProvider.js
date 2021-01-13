import React, { useContext } from 'react';
import io from 'socket.io-client';
import { URL_API } from '../constants/api';
const ENDPOINT = URL_API;
// const socket = 
const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext)
}
const socket = io(ENDPOINT);
export function SocketProvider({ children }) {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}