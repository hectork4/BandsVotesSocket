import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client'

export const useSocket = ( serverPath) => {
    //se utilizó useMemo en este caso para evitar hacer la conexión multiples veces si no cambia el serverPath
    const socket = useMemo( () => io(serverPath, {
        transports: ["websocket", "polling"] // use WebSocket first, if available
    }), [serverPath]) ;

    const [online, setOnline] = useState(false);

    useEffect(() => {
        setOnline(socket.connected)
      }, [socket])
    
      useEffect(() => {
        socket.on('connect', () => {
          setOnline(true)
        })
      }, [socket])
    
      useEffect(() => {
        socket.on('disconnect', () => {
          setOnline(false)
        })
      }, [socket])

    return {
        socket,
        online
    }
}