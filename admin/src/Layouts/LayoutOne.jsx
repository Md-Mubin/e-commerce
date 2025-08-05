import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const LayoutOne = () => {
    return (
        <>
            <ul className='flex items-center bg-[url("/images/admin_bg.png")]'>
                <li>
                    <Navbar />
                </li>
                <li>
                    <Outlet />
                    <Footer />
                </li>
            </ul>
        </>
    )
}

export default LayoutOne