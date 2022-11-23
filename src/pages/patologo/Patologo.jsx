import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Layout from '../../layout/Layout'
import axios from "axios"
import Table from '../../components/Table'
import PatologoModal from './PatologoModal'
import '../../index.css'

export default function Patologo() {
    const [data, setData] = useState(null)
    const [page, setPage] = useState('http://localhost:8000/api/patologos')

    const printUserData = (val, key) => {
		return (
			<tr key={key} className='border-b border-gray-200 hover:bg-zinc-100 group'>
				<td className='py-4 px-6 group-hover:text-blue-400'>{val.patologo_id}</td>
				<td className='py-4 px-6'>{val.nombres}</td>
				<td className='py-4 px-6'>{val.apellidos}</td>
                <td className='py-4 px-6'>{val.codigo_sanitario}</td>
                <td className='py-4 px-6'>{val.telefono}</td>
				<td className='py-4 px-6 cursor-pointer'>
                    <Link to={`/patologo/${val.patologo_id}`}><FontAwesomeIcon icon={faAngleRight} /></Link>
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
                <PatologoModal />

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