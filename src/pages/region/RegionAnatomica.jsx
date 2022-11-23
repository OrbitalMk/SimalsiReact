import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Layout from '../../layout/Layout'
import axios from "axios"
import Table from '../../components/Table'
import '../../index.css'

export default function RegionAnatomica() {
    const [data, setData] = useState(null)
    const [page, setPage] = useState('http://localhost:8000/api/regiones')

    const printUserData = (val, key) => {
		return (
			<tr key={key} className='border-b border-gray-200 hover:bg-zinc-100 group'>
				<td className='py-4 px-6 group-hover:text-blue-400'>{val.region_id}</td>
				<td className='py-4 px-6'>{val.descripcion}</td>
				<td className='py-4 px-6 cursor-pointer'><FontAwesomeIcon icon={faAngleRight} /></td>
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
                <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1 mb-5'>Crear Region anatomica</button>

                <Table
                    columns={['#', 'Descripcion', 'Acciones']}
                    data={data?.data}
                    links={data?.links}
                    printData={printUserData}
                    setpage={setPage}
                />
            </div>
        </Layout>
    );
}