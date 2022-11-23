import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
import axios from 'axios';
import useUser from '../hooks/useUser';
// import SimalsiLogo from '../logo-simalsi.svg';

export default function Login() {
    const [email, setEmail] = useState('jayden20@example.com');
    // const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, isLogged } = useUser();

    useEffect(() => {
        if(isLogged) {
            navigate('/home')
        }
    }, [isLogged]);

    const handleLoginButton = async (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div className='bg-gradient-to-r from-violet-600 to-sky-400 min-h-screen pt-5 md:pt-20 pb-6 px-2 md:px-0' style={{ fontFamily: 'sans-serif' }}>
            <header className='max-w-lg mx-auto'>
                <Link to='/home'>
                    <div className='flex justify-center w-full'>
                        <img src='/logo-simalsi.svg' alt="simalsi-logo" className='w-20' />
                    </div>
                    <h1 className='text-xl font-normal text-white text-center'>SIMALSI</h1>
                </Link>
            </header>

            <main className='bg-white max-w-lg mx-auto p-8 my-5 md:my-10 rounded-xl shadow-2xl'>

                <section className='text-center font-semibold text-2xl md:text-3xl mb-5 md:mb-10'>
                    Inicio de sesion
                </section>

                <form className='flex flex-col' onSubmit={handleLoginButton}>

                    <div className='mb-5'>
                        <label htmlFor='email'>Email</label>
                        <input id='email' value={email} onChange={e => setEmail(e.target.value)} type='text' className='border-2 outline-none border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-full py-1 px-3' />
                        {
                            // errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>
                        }
                    </div>

                    <div className='mb-5'>
                        <label htmlFor='password'>Password</label>
                        <input id='password' value={password} onChange={e => setPassword(e.target.value)} type='password' className='border-2 outline-none border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-full py-1 px-3' />
                        {
                            // errors.password && <span className='text-red-500 text-sm'>{errors.password}</span>
                        }
                    </div>

                    <div className='mb-5'>
                        <input id='remember' type='checkbox' />
                        <label className='ml-1' htmlFor='remember'>Recuerdame</label>
                    </div>
                    
                    <button type='submit' onClick={handleLoginButton} className='bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200'>Sign In</button>

                </form>

            </main>

        </div>
    );
}

/*Login.propTypes = {
    setToken: PropTypes.func.isRequired
};*/