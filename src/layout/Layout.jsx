import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import Home from '@mui/icons-material/Home'
import { useMediaQuery } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faHome, faBars, faUserDoctor, faHouseMedical, faX } from '@fortawesome/free-solid-svg-icons'

function Header({ open, handleOpenClick }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login');
    }

	return (
		<div className={`flex fixed top-0 right-0 left-0 ${ open ? "md:ml-64" : "ml-0 md:ml-20" } duration-300 items-center justify-between py-3 px-6 backdrop-blur-sm bg-[#f7f8f8]/70 z-40`}>
			<button
				className='bg-violet-100 text-violet-800 hover:bg-violet-800 hover:text-white border-0 p-2 rounded-xl overflow-hidden'
				type='button'
				onClick={handleOpenClick}
				data-mdb-ripple='true'>
				<MenuIcon />
			</button>
			<button className='text-sm hover:text-violet-500' onClick={handleLogout}>
				Jonathan Guillen
			</button>
		</div>
	);
}

function Normal({ text, url, icon, sidebarOpen }) {
    return (
        <div className='relative'>
            <Link to={url} className='flex items-center w-full justify-between focus:bg-violet-100 focus:text-violet-500 hover:text-violet-500 rounded-lg p-4 cursor-pointer'>
                <div className='flex items-center space-x-2'>
                    <FontAwesomeIcon icon={icon} />
                    <h1 className={`${!sidebarOpen && "opacity-0"}`}>{text}</h1>
                </div>
            </Link>
        </div>
    );
}

function Desplegable({ text, icon, submenu, sidebarOpen }) {
    const [open, setOpen] = useState(false);

    const handleOpenClick = () => {
        setOpen(!open);
    }

    return (
        <div className='relative'>
            <button onClick={handleOpenClick} className='flex items-center w-full justify-between focus:bg-violet-100 focus:text-violet-500 hover:text-violet-500 rounded-lg p-4 cursor-pointer'>
                <div className='flex items-center space-x-2'>
                    <FontAwesomeIcon icon={icon} />
                    <h1 className={`${!sidebarOpen && "hidden"}`}>{text}</h1>
                </div>
                {
                    submenu && <FontAwesomeIcon icon={faAngleDown} className={`${!sidebarOpen && "hidden"} ${open && "rotate-180"} duration-200`} />
                }
            </button>
            <div className={`space-y-4 text-gray-600 ml-4 pl-4 py-2 border-l z-10 border-gray-400/30 ${!open && "hidden"} ${!sidebarOpen && "w-50 sm:absolute top-0 left-20 sm:bg-slate-100 sm:rounded-lg sm:border-none sm:p-2 sm:ml-0"}`}>
                {
                    submenu && submenu.map((val, key) => {
                        return (
                            <div key={key}>
                                {<Link to={val.url} className='hover:text-violet-400 cursor-pointer'>{val.text}</Link>}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

// Separar MenuItem en dos tipos el desplegable y el comun
function MenuItem({ text, url, icon, submenu, sidebarOpen }) {
    return (
        <>
            {
                submenu ? (
                    <Desplegable text={text} icon={icon} submenu={submenu} sidebarOpen={sidebarOpen} />
                ) : (
                    <Normal url={url} text={text} icon={icon} sidebarOpen={sidebarOpen} />
                )
            }
        </>
    );
}

const menu = [
    {text: 'Home', icon: faHome, url: '/home', submenu: false},
    {text: 'Paciente', icon: faHome, url: '/paciente', submenu: false},
    {text: 'Medico', icon: faUserDoctor, url: '/medico', submenu: false},
    {text: 'Recepcionista', icon: faBars, url: 'paciente', submenu: false},
    {text: 'Unidad', icon: faHouseMedical, url: 'paciente', submenu: false},
    {text: 'Procedimiento', icon: faBars, url: 'paciente', submenu: [{text: 'Region Anatomica'}, {text: 'Procedimiento Quirurgico'}, {text: 'Procedimiento'}]},
]

function MobileSidebar({ open, handleOpenClick }) {
    if(open) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }

    return (
        <>
            <div className={`${!open && "hidden opacity-0"} fixed inset-0 z-50 backdrop-blur-[0px] bg-black/40 duration-700`} />
    
            <div className={`fixed bg-white shadow-[0_7px_30px_0_rgba(113,122,131,0.2)] h-screen z-50 ${open ? "w-64 overflow-y-auto" : "-translate-x-64"} duration-300`}>
                <div className='flex justify-between items-center border-b py-2 my-2 mx-4'>
                    <div className='flex items-center'>
                        <img className='h-11 w-11' src='/logo-simalsi.svg' alt="simalsi" />
                        <h1 className={`text-black text-xl font-semibold pl-3 ${!open && "hidden"}`}>SIMALSI</h1>
                    </div>
                    
                    <div className='md:hidden cursor-pointer'>
                        <FontAwesomeIcon className='text-gray-500' icon={faX} onClick={handleOpenClick} />
                    </div>
                </div>
                <div className='px-4 pt-2 pb-4 space-y-2'>
                    <div className='relative flex items-center bg-sky-100 hover:text-violet-500 rounded-lg p-3 space-x-2 cursor-pointer'>
                        <Home></Home>
                        <h1 className={`${!open && "hidden"}`}>Dashboard</h1>
                    </div>
        
                    {
                        menu && menu.map((val, key) => {
                            return (
                                <MenuItem
                                    key={key}
                                    text={val.text}
                                    url={val.url}
                                    submenu={val.submenu}
                                    sidebarOpen={open}
                                    icon={val.icon}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

function WebSidebar({ open }) {
    return (
        <div className={`fixed hidden md:block bg-white shadow-[0_7px_30px_0_rgba(113,122,131,0.2)] h-screen overflow-x-hidden z-50 ${open ? "w-64 overflow-y-auto" : "w-20 translate-x-0"} duration-300`}>
            <div className='flex justify-between items-center border-b py-2 my-2 mx-4'>
                <div className='flex items-center'>
                    <img className='h-11 w-11' src='/logo-simalsi.svg' alt="simalsi" />
                    <h1 className={`text-black text-xl font-semibold pl-3 ${!open && "hidden"}`}>SIMALSI</h1>
                </div>
            </div>
            <div className='px-4 pt-2 pb-4 space-y-2'>
                <div className='relative flex items-center bg-sky-100 hover:text-violet-500 rounded-lg p-3 space-x-2 cursor-pointer'>
                    <Home></Home>
                    <h1 className={`${!open && "hidden"}`}>Dashboard</h1>
                </div>

                {
                    menu && menu.map((val, key) => {
                        return (
                            <MenuItem
                                key={key}
                                text={val.text}
                                url={val.url}
                                submenu={val.submenu}
                                sidebarOpen={open}
                                icon={val.icon}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

function Sidebar({ open, handleOpenClick }) {
    const mobile = useMediaQuery('(min-width: 768px)');
    
    return (
        <>
            {
                !mobile ? (
                    <MobileSidebar
                        open={open}
                        handleOpenClick={handleOpenClick}
                     />
                ) : (
                    <WebSidebar
                        open={open}
                     />
                )
            }
        </>
    );
}

export default function Layout({ children }) {
    const [openMenu, setOpenMenu] = useState(true);

    const handleOpenMenuClick = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <div className='block bg-[#f7f8f8] min-h-screen h-full'>
            <Sidebar
                open={openMenu}
                handleOpenClick={handleOpenMenuClick}
             />
            <Header
                open={openMenu}
                handleOpenClick={handleOpenMenuClick}
             />
            <div className={`${openMenu ? "md:ml-64" : "ml-0 md:ml-20"}`}>
                <div className='!pt-20 p-6 sm:p-12'>
					{ children }
				</div>
            </div>
        </div>
    );
}