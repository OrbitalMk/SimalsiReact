import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function Modal({ open, title, onClose, children }) {
    return (
        <div className={`${!open && "hidden opacity-0"} flex fixed justify-center items-center inset-0 z-50 backdrop-blur-[0px] bg-black/40 duration-700`}>
            <div className='flex flex-col bg-white rounded-xl m-10'>

                <div className='border-b'>
                    <div className='flex justify-between items-center py-2 mx-4'>
                        <h1 className={`text-black text-xl font-semibold ${!open && "hidden"}`}>{ title }</h1>
                        
                        <div className='flex justify-center items-center cursor-pointer hover:bg-stone-200/50 rounded-lg'>
                            <FontAwesomeIcon className='text-gray-500 px-3 py-2' icon={faX} onClick={onClose} />
                        </div>
                    </div>
                </div>

                { children }

            </div>
        </div>
    );
}