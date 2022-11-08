import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Layout from '../layout/Layout'
import axios from "axios"
import Table from '../component/Table'
import '../index.css'

export default function Home() {
    const [data, setData] = useState(null)
    const [page, setPage] = useState('http://localhost:8000/api/pacientes')

    const printUserData = (val, key) => {
		return (
			<tr key={key} className='border-b border-gray-200 hover:bg-zinc-100 group cursor-pointer'>
				<td className='py-4 px-6 group-hover:text-blue-400'>{val.paciente_id}</td>
				<td className='py-4 px-6'>{val.nombres}</td>
				<td className='py-4 px-6'>{val.apellidos}</td>
                <td className='py-4 px-6'>{val.nacimiento}</td>
				<td className='py-4 px-6'><FontAwesomeIcon icon={faAngleRight} /></td>
			</tr>
		);
	}

    useEffect(() => {
        // axios.get('http://localhost:8000/api/paciente', { params: { page: 2 } })
        axios.get(page)
            .then(response => {
                setData(response.data);
            })
    }, [page]);

    return (
        <Layout>
            {/*<button className='mt-10 bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-1 mb-5'>Crear Paciente</button>

            <Table
				columns={['#', 'Nombres', 'Apellidos', 'Nacimiento', 'Acciones']}
				data={data?.data}
				links={data?.links}
				printData={printUserData}
                setpage={setPage}
            />*/}
            Home page
        </Layout>
    );
}