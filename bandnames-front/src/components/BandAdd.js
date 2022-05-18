import React, { useContext, useState } from 'react'
import { SocketContext, SocketProvider } from '../context/SocketContext'

export const BandAdd = () => {
    const [value, setValue] = useState('')
    const { socket } = useContext(SocketContext )

    const handleChange = (ev) => {
        setValue(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const submit = value || ev.target['newBand'].value;
        submit.trim().length > 0 && socket.emit('add-band', submit)
        setValue('')
    }

  return (
    <>
        <h3>Agregar banda</h3>

        <form onSubmit={handleSubmit}>
            <input name='newBand' className='form-control' placeholder='Nuevo nombre' value={value} onChange={handleChange} />
        </form>
    </>
  )
}
