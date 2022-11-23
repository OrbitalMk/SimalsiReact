import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import axios from 'axios'
import Layout from '../../layout/Layout';

export default function PacienteUpdate() {
    const defaultval = {
        nombres: '',
        apellidos: '',
        nacimiento: '',
        inss: '',
        telefono: '',
        sexo: '',
    }
    let { paciente_id } = useParams();
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState(defaultval);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get(
            `http://localhost:8000/api/pacientes/${paciente_id}`,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            setPaciente(response?.data)
        });
    }, []);

    const onEliminarClick = () => {
        const token = sessionStorage.getItem('token');
        axios.delete(
            `http://localhost:8000/api/pacientes/${paciente_id}`,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            console.log(response?.data)
        });
    }

    const onActualizarClick = () => {
        const token = sessionStorage.getItem('token');
        axios.put(
            `http://localhost:8000/api/pacientes/${paciente_id}`,
            paciente,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            console.log(response?.data)
        });
    }
    

    return (
        <Layout>
            <div className='col-span-2 text-xl italic mb-6'>
                <button className='text-blue-500 text-2xl font-semibold cursor-pointer' onClick={() => navigate(-1)}>
                    Paciente/ 
                    <span className='font-normal text-black'>
                        {paciente.nombres + ' ' + paciente.apellidos} <span className='text-sm'>#{paciente_id}</span>
                    </span>
                </button>
            </div>

            <div className='p-2 bg-white border rounded-xl'>

                <div className='grid grid-cols-1 gap-8 m-6'>

                    <div className='grid grid-cols-2 gap-7 mb-8'>
                        <div className='col-span-2 text-xl font-semibold'>
                            Datos personales
                        </div>

                        <TextField
                            label='Nombres *'
                            value={paciente.nombres}
                            onChange={e => setPaciente({...paciente, nombres: e.target.value})}
                            fullWidth
                        />

                        <TextField
                            label='Apellidos *'
                            value={paciente.apellidos}
                            onChange={e => setPaciente({...paciente, apellidos: e.target.value})}
                            fullWidth
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                            <DatePicker
                                disableFuture
                                fullWidth
                                renderInput={(props) => <TextField fullWidth {...props} />}
                                value={new Date(Date.parse(paciente.nacimiento))}
                                onChange={newValue => setPaciente({...paciente, nacimiento: newValue.toLocaleDateString('en-ZA')})}
                                label='Nacimiento'
                                inputFormat='yyyy/MM/dd'
                                mask='____/__/__'
                            />
                        </LocalizationProvider>

                        <FormControl fullWidth>
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
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-7'>
                        <div className='text-xl font-semibold'>
                            Informacion de contacto
                        </div>

                        <TextField
                            label='Telefono'
                            value={paciente.telefono}
                            onChange={e => setPaciente({...paciente, telefono: e.target.value})}
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