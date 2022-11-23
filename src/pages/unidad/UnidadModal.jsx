import React, { useEffect, useState } from 'react';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import Modal from '../../components/Modal';
import axios from 'axios';

export default function UnidadModal() {
    const defaultval = {
        nombre: '',
        municipio_id: '',
        telefono: '',
    };
    const [show, setShow] = useState(false);
    const [unidad, setUnidad] = useState(defaultval);

    const [departamentos, setDepartamentos] = useState(null)
    const [municipios, setMunicipios] = useState(null)
    const [departamentoId, setDepartamentoId] = useState('')

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get(
            `http://localhost:8000/api/departamentos/`,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            setDepartamentos(response?.data)
        });
    }, [])

    useEffect(() => {
        if(departamentoId != '') {
            const token = sessionStorage.getItem('token');
            axios.get(
                `http://localhost:8000/api/departamentos/${departamentoId}/municipios`,
                { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
            }).then(response => {
                setMunicipios(response?.data)
            });
        }
    }, [departamentoId])

    const onSubmitHandle = e => {
        e.preventDefault()
        const token = sessionStorage.getItem('token');
        axios.post(
            'http://localhost:8000/api/unidades/',
            unidad,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            console.log(response?.data)
        });
        setShow(false)
        setUnidad(defaultval)
        setDepartamentoId('')
        setMunicipios(null)
    }

    return (
        <>
            <button
                className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1 mb-5'
                onClick={() => setShow(true)}
            >
                Agregar unidad
            </button>

            {show &&
                (
                    <Modal open={show} onClose={() => setShow(false)} title='Agregar unidad'>
                        <form onSubmit={onSubmitHandle}>
                            <div className='grid grid-cols-1 gap-8 m-6'>

                                <div className='grid grid-cols-2 gap-5'>
                                    <div className='col-span-2 font-semibold'>
                                        Datos personales
                                    </div>

                                    <TextField
                                        label='Nombre *'
                                        value={unidad.nombre}
                                        onChange={e => setUnidad({...unidad, nombre: e.target.value})}
                                        fullWidth
                                        size='small'
                                    />

                                    <FormControl fullWidth size='small'>
                                        <InputLabel id='departamento-label'>Departamento *</InputLabel>
                                        <Select
                                            labelId='departamento-label'
                                            label='Departamento *'
                                            value={departamentoId}
                                            onChange={e => {
                                                setDepartamentoId(e.target.value)
                                                setUnidad({...unidad, municipio_id: ''})
                                            }}
                                        >
                                            {
                                                departamentos && departamentos.map((val, key) => {
                                                    return (
                                                        <MenuItem value={val.departamento_id} key={key}>{val.nombre}</MenuItem>
                                                    );
                                                })
                                            }
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth size='small'>
                                        <InputLabel id='municipio-label'>Municipio *</InputLabel>
                                        <Select
                                            labelId='municipio-label'
                                            label='Municipio *'
                                            value={unidad.municipio_id}
                                            onChange={e => setUnidad({...unidad, municipio_id: e.target.value})}
                                        >
                                            {
                                                municipios && municipios.map((val, key) => {
                                                    return (
                                                        <MenuItem value={val.municipio_id} key={key}>{val.nombre}</MenuItem>
                                                    );
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className='grid grid-cols-1 gap-5'>
                                    <div className='font-semibold'>
                                        Informacion de contacto
                                    </div>

                                    <TextField
                                        label='Telefono'
                                        value={unidad.telefono}
                                        onChange={e => setUnidad({...unidad, telefono: e.target.value})}
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