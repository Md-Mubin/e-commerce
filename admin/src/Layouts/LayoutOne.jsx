import React from 'react'
import { Navigate, Outlet } from 'react-router'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useSelector } from "react-redux"

const LayoutOne = () => {

    const { user } = useSelector((state) => state.userData)
    if(!user) return <Navigate to={"/login"}/> 

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