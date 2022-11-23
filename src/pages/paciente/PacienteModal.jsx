import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import Modal from '../../components/Modal';
import axios from 'axios';

export default function PacienteModal() {
    const defaultval = {
        nombres: '',
        apellidos: '',
        nacimiento: '',
        inss: '',
        telefono: '',
        sexo: '',
    };
    const [show, setShow] = useState(false);
    const [paciente, setPaciente] = useState(defaultval);

    const onSubmitHandle = e => {
        e.preventDefault()
        const token = sessionStorage.getItem('token');
        axios.post(
            'http://localhost:8000/api/pacientes/',
            paciente,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            console.log(response?.data)
        });
        setShow(false)
        setPaciente(defaultval)
    }

    return (
        <>
            <button
                className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1 mb-5'
                onClick={() => setShow(true)}
            >
                Agregar Paciente
            </button>

            {show &&
                (
                    <Modal open={show} onClose={() => setShow(false)} title='Agregar Paciente'>
                        <form onSubmit={onSubmitHandle}>
                            <div className='grid grid-cols-1 gap-8 m-6'>

                                <div className='grid grid-cols-2 gap-5'>
                                    <div className='col-span-2 font-semibold'>
                                        Datos personales
                                    </div>

                                    <TextField
                                        label='Nombres *'
                                        value={paciente.nombres}
                                        onChange={e => setPaciente({...paciente, nombres: e.target.value})}
                                        fullWidth
                                        size='small'
                                    />

                                    <TextField
                                        label='Apellidos *'
                                        value={paciente.apellidos}
                                        onChange={e => setPaciente({...paciente, apellidos: e.target.value})}
                                        fullWidth
                                        size='small'
                                    />

                                    <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                                        <DatePicker
                                            disableFuture
                                            fullWidth
                                            renderInput={(props) => <TextField fullWidth {...props} size='small' />}
                                            value={new Date(Date.parse(paciente.nacimiento))}
                                            onChange={newValue => setPaciente({...paciente, nacimiento: newValue.toLocaleDateString('en-ZA')})}
                                            label='Nacimiento'
                                            inputFormat='yyyy/MM/dd'
                                            mask='____/__/__'
                                        />
                                    </LocalizationProvider>

                                    <FormControl fullWidth size='small'>
                                        <InputLabel id='sexo-label'>Sexo *</InputLabel>
                                        <Select
                                            labelId='sexo-label'
                                            label='Sexo *'
                                            value={paciente.sexo}
                                            onChange={e => setPaciente({...paciente, sexo: e.target.value})}
                                        >
                                            <MenuItem value='Femenino'>Femenino</MenuItem>
                                            <MenuItem value='Masculino'>Masculino</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <div className='col-span-2'>
                                        <TextField
                                            label='INSS'
                                            value={paciente.inss}
                                            onChange={e => setPaciente({...paciente, inss: e.target.value})}
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
                                        value={paciente.telefono}
                                        onChange={e => setPaciente({...paciente, telefono: e.target.value})}
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