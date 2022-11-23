import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Modal from '../../components/Modal';
import axios from 'axios';

export default function MedicoModal() {
    const defaultval = {
        nombres: '',
        apellidos: '',
        codigo_sanitario: '',
        telefono: '',
    };
    const [show, setShow] = useState(false);
    const [medico, setMedico] = useState(defaultval);

    const onSubmitHandle = e => {
        e.preventDefault()
        const token = sessionStorage.getItem('token');
        axios.post(
            'http://localhost:8000/api/medicos/',
            medico,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            console.log(response?.data)
        });
        setShow(false)
        setMedico(defaultval)
    }

    return (
        <>
            <button
                className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1 mb-5'
                onClick={() => setShow(true)}
            >
                Agregar Medico
            </button>

            {show &&
                (
                    <Modal open={show} onClose={() => setShow(false)} title='Agregar Medico'>
                        <form onSubmit={onSubmitHandle}>
                            <div className='grid grid-cols-1 gap-8 m-6'>

                                <div className='grid grid-cols-2 gap-5'>
                                    <div className='col-span-2 font-semibold'>
                                        Datos personales
                                    </div>

                                    <TextField
                                        label='Nombres *'
                                        value={medico.nombres}
                                        onChange={e => setMedico({...medico, nombres: e.target.value})}
                                        fullWidth
                                        size='small'
                                    />

                                    <TextField
                                        label='Apellidos *'
                                        value={medico.apellidos}
                                        onChange={e => setMedico({...medico, apellidos: e.target.value})}
                                        fullWidth
                                        size='small'
                                    />

                                    <div className='col-span-2'>
                                        <TextField
                                            label='Codigo sanitario *'
                                            value={medico.codigo_sanitario}
                                            onChange={e => setMedico({...medico, codigo_sanitario: e.target.value})}
                                            fullWidth
                                            size='small'
                                        />
                                    </div>
                                </div>

                                <div className='grid grid-cols-1 gap-5'>
                                    <div className='font-semibold'>
                                        Informacion de contacto
                                    </div>

                                    <TextField
                                        label='Telefono'
                                        value={medico.telefono}
                                        onChange={e => setMedico({...medico, telefono: e.target.value})}
                                        fullWidth
                                        size='small'
                                    />
                                </div>
                            </div>

                            <div className='flex justify-end items-center py-3 mx-6'>
                                <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1'>Guardar</button>
                            </div>
                        </form>
                    </Modal>
                )
            }
        </>
    );
}