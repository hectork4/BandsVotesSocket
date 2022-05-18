import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

export const BandList = () => {

    const [bandName, setBandName] = useState()
    const { socket } = useContext(SocketContext)

    const handleChange = (id, event) => {
        const newBands = bandName.map((eachBand) => {
            if(eachBand.id === id) {
                return {...eachBand, name: event.target.value}
            }
            return eachBand
        })
        setBandName(newBands)
    }

    useEffect(() => {
        socket.on('current-bands', (data) => {
            setBandName(data)
       })

       return () => socket.off('current-bands') //si se destruye el componente Bandlist(return en el useEffect), el off haría que se destruya la escucha del current-band para no mantenerse pendiente de esa conexión
    }, [socket])

    const handleClick = (id) => {
       /* const newBands = bandName.map((eachBand) => {
            if(eachBand.id === id) {
                return {...eachBand, votes: eachBand.votes+1}
            }
            return eachBand
        })
        setBandName(newBands)*/
        socket.emit('votar-banda', id) //solucion para actualizar el backend, con esto no haría falta la solucion escrita arriba de actualizar el estado localmente en el front
    }

    const handleDelete = (id) => {
        /*const newBands = bandName.filter(band => band.id !== id)
        setBandName(newBands)*/
        socket.emit('borrar-banda', id)
    }

    const onLostFocus = (id, name) => {
        //disparar sockets
        socket.emit('cambiar-banda', {id, name})
    }

    const createRows = (band) => {

        return (
            <tr key={band.id}>
                <td>
                    <button className='btn btn-primary' onClick={() => handleClick(band.id)}>+1</button>
                </td>
                <td>
                    <input 
                        className='form-control' 
                        value={band.name} 
                        onChange={(event) => handleChange(band.id, event)} 
                        onBlur={() => onLostFocus(band.id, band.name)}
                    />
                </td>
                <td> 
                    <h3>{band.votes} </h3>
                </td>
                <td> 
                    <button className='btn btn-danger' onClick={() => handleDelete(band.id)}>
                        Borrar
                    </button>                
                </td>
            </tr>
        )
    }

  return (
    <>
        <table className='table table-stripped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {bandName && bandName.map(eachBand => createRows(eachBand))}
            </tbody>
        </table>
    </>
  )
}
