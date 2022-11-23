import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import axios from 'axios'
import Layout from '../../layout/Layout';

export default function PatologoUpdate() {
    const defaultval = {
        nombres: '',
        apellidos: '',
        codigo_sanitario: '',
        telefono: '',
    };
    let { patologo_id } = useParams();
    const navigate = useNavigate();
    const [patologo, setPatologo] = useState(defaultval);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get(
            `http://localhost:8000/api/patologos/${patologo_id}`,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            setPatologo(response?.data)
        });
    }, []);

    const onEliminarClick = () => {
        const token = sessionStorage.getItem('token');
        axios.delete(
            `http://localhost:8000/api/patologos/${patologo_id}`,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            console.log(response?.data)
        });
    }

    const onActualizarClick = () => {
        const token = sessionStorage.getItem('token');
        axios.put(
            `http://localhost:8000/api/patologos/${patologo_id}`,
            patologo,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            console.log(response?.data)
        });
    }

    return (
        <Layout>
            <div className='col-span-2 text-xl italic mb-6'>
                <button className='text-blue-500 text-2xl font-semibold cursor-pointer' onClick={() => navigate(-1)}>
                    Patologo/ 
                    <span className='font-normal text-black'>
                        {patologo.nombres + ' ' + patologo.apellidos} <span className='text-sm'>#{patologo_id}</span>
                    </span>
                </button>
            </div>

            <div className='p-2 bg-white border rounded-xl'>

                <div className='grid grid-cols-1 gap-8 m-6'>

                    <div className='grid grid-cols-2 gap-7'>
                        <div className='col-span-2 font-semibold'>
                            Datos personales
                        </div>

                        <TextField
                            label='Nombres *'
                            value={patologo.nombres}
                            onChange={e => setPatologo({...patologo, nombres: e.target.value})}
                            fullWidth
                        />

                        <TextField
                            label='Apellidos *'
                            value={patologo.apellidos}
                            onChange={e => setPatologo({...patologo, apellidos: e.target.value})}
                            fullWidth
                        />

                        <div className='col-span-2'>
                            <TextField
                                label='Codigo sanitario *'
                                value={patologo.codigo_sanitario}
                                onChange={e => setPatologo({...patologo, codigo_sanitario: e.target.value})}
                                fullWidth
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-7'>
                        <div className='font-semibold'>
                            Informacion de contacto
                        </div>

                        <TextField
                            label='Telefono'
                            value={patologo.telefono}
                            onChange={e => setPatologo({...patologo, telefono: e.target.value})}
                            fullWidth
                        />
                    </div>
                </div>

                <div className='flex justify-between items-center py-3 mx-6'>
                <button onClick={onEliminarClick} className='bg-rose-500 hover:bg-rose-600 text-white rounded-md px-3 py-1'>Eliminar</button>
                    <button onClick={onActualizarClick} className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1'>Actualizar</button>
                </div>

            </div>
        </Layout>
    );
}