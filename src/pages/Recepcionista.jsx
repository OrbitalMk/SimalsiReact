import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Layout from '../layout/Layout'
import axios from "axios"
import Table from '../components/Table'
import '../index.css'

export default function Recepcionista() {
    const [data, setData] = useState(null)
    const [page, setPage] = useState('http://localhost:8000/api/medicos')

    const printUserData = (val, key) => {
		return (
			<tr key={key} className='border-b border-gray-200 hover:bg-zinc-100 group cursor-pointer'>
				<td className='py-4 px-6 group-hover:text-blue-400'>{val.medico_id}</td>
				<td className='py-4 px-6'>{val.nombres}</td>
				<td className='py-4 px-6'>{val.apellidos}</td>
                <td className='py-4 px-6'>{val.codigo_sanitario}</td>
                <td className='py-4 px-6'>{val.telefono}</td>
				<td className='py-4 px-6'><FontAwesomeIcon icon={faAngleRight} /></td>
			</tr>
		);
	}

    useEffect(() => {
        /*axios.get(page)
            .then(response => {
                setData(response.data);
            })*/
    }, [page]);

    return (
        <Layout>
            <div className='p-8 bg-white border rounded-xl'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1 mb-5'>Crear Recepcionista</button>

                <Table
                    columns={['#', 'Nombres', 'Apellidos', 'Codigo sanitario', 'Telefono', 'Acciones']}
                    data={data?.data}
                    links={data?.links}
                    printData={printUserData}
                    setpage={setPage}
                />
            </div>
        </Layout>
    );
}