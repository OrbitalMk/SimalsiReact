import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import axios from 'axios'
import Layout from '../../layout/Layout';

export default function UnidadUpdate() {
    const defaultval = {
        nombre: '',
        municipio_id: '',
        telefono: '',
    };
    let { unidad_id } = useParams();
    const navigate = useNavigate();
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

            axios.get(
                `http://localhost:8000/api/unidades/${unidad_id}`,
                { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
            }).then(response => {
                setDepartamentoId(response?.data?.municipio?.departamento_id)
                setUnidad(response?.data)
            })
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

    const onEliminarClick = () => {
        const token = sessionStorage.getItem('token');
        axios.delete(
            `http://localhost:8000/api/unidads/${unidad_id}`,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            console.log(response?.data)
        });
    }

    const onActualizarClick = () => {
        const token = sessionStorage.getItem('token');
        axios.put(
            `http://localhost:8000/api/unidades/${unidad_id}`,
            unidad,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            console.log(response?.data)
        });
    }

    return (
        <Layout>
            <div className='col-span-2 text-xl italic mb-6'>
                <button className='text-blue-500 text-2xl font-semibold cursor-pointer' onClick={() => navigate(-1)}>
                    unidad/ 
                    <span className='font-normal text-black'>
                        {unidad.nombre} <span className='text-sm'>#{unidad_id}</span>
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

                    <div className='grid grid-cols-1 gap-7'>
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

                <div className='flex justify-between items-center py-3 mx-6'>
                    <button onClick={onEliminarClick} className='bg-rose-500 hover:bg-rose-600 text-white rounded-md px-3 py-1'>Eliminar</button>
                    <button onClick={onActualizarClick} className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1'>Actualizar</button>
                </div>

            </div>
        </Layout>
    );
}