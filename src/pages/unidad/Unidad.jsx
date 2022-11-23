import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Layout from '../../layout/Layout'
import axios from "axios"
import Table from '../../components/Table'
import UnidadModal from './UnidadModal'
import '../../index.css'

export default function Unidad() {
    const [data, setData] = useState(null)
    const [page, setPage] = useState('http://localhost:8000/api/unidades')

    const printUserData = (val, key) => {
		return (
			<tr key={key} className='border-b border-gray-200 hover:bg-zinc-100 group'>
				<td className='py-4 px-6 group-hover:text-blue-400'>{val.unidad_id}</td>
				<td className='py-4 px-6'>{val.nombre}</td>
				<td className='py-4 px-6'>{val.municipio?.nombre}</td>
                <td className='py-4 px-6'>{val.municipio?.departamento?.nombre}</td>
                <td className='py-4 px-6'>{val.telefono}</td>
				<td className='py-4 px-6 cursor-pointer'>
                    <Link to={`/unidad/${val.unidad_id}`}><FontAwesomeIcon icon={faAngleRight} /></Link>
                </td>
			</tr>
		);
	}

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get(
            page,
            { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(response => {
            setData(response?.data)
        });
    }, [page]);

    return (
        <Layout>
            <div className='p-8 bg-white border rounded-xl'>
                <UnidadModal />

                <Table
                    columns={['#', 'Nombre', 'Municipio', 'Departamento', 'Telefono', 'Acciones']}
                    data={data?.data}
                    links={data?.links}
                    printData={printUserData}
                    setpage={setPage}
                />
            </div>
        </Layout>
    );
}