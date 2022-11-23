import React from 'react';
import Pagination from './Pagination';

export default function Table({ columns=[], data=[], links=[], printData, setpage }) {

	return (
		<div>
			<div className="pb-4 flex items-center justify-between">
				{ /* Hidden */ }
				<div className='relative mt-1'>
					<input type="text" className='border-2 outline-none border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-full py-1 px-3' />
				</div>
			</div>
			<div className="overflow-x-auto relative shadow-lg border border-black/5 rounded-lg">
				<table className='w-full text-left border-0'>
					<thead className='bg-gray-100'>
						<tr>
							{
								columns && columns.map((val, key) => {
									return (
										<th key={key} className='px-6 py-3'>{val}</th>
									);
								})
							}
						</tr>
					</thead>
					<tbody>
						{
                            data && data.map(printData)
                        }
					</tbody>
				</table>
			</div>
			<Pagination links={links} setpage={setpage} />
		</div>
	);
}