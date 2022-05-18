import React, { useContext, useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { SocketContext } from '../context/SocketContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const BandChart = () => {
    const { socket } = useContext(SocketContext)
    const [bandName, setBandName] = useState()

    useEffect(() => {
        socket.on('current-bands', (data) => {
            setBandName(data)
       })

       return () => socket.off('current-bands') //si se destruye el componente Bandlist(return en el useEffect), el off haría que se destruya la escucha del current-band para no mantenerse pendiente de esa conexión
    }, [socket])
    
    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
            borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
            position: 'right',
            },
            title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };
    
    const labels = bandName && bandName.map((band) => band.name)
    
    const data = {
        labels,
        datasets: [
            {
            label: 'Bands',
            data: bandName && bandName.map((band) => band.votes),
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            }
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
}
