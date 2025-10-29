import io from 'socket.io-client';
import config from '../../Config';
import jwt from "jsonwebtoken";

// web socket connection 
export const socket = io(`${config.WebSocketUrl}`,
    {
        reconnectionDelayMax: 5000,
        auth: {
            identifier: jwt.decode(sessionStorage.getItem("token"))?.sub
        }
    }
);