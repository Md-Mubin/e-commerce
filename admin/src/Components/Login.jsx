import React, { useState } from 'react'
import { adminAuth } from '../Service/api'
import { useDispatch, useSelector } from "react-redux"
import { loggedUserInfo } from '../Store/Slices/authSlice'
import { Navigate } from 'react-router'

const Login = () => {

  const dispatch = useDispatch()

  const [form, setForm] = useState({
    email: "",
    pass: ""
  })

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await adminAuth.login(form)
      if (res?.access_token) {
        localStorage.setItem("loggedUser", JSON.stringify(res?.loggedUser))
        sessionStorage.setItem("token", res?.access_token)
      }
      dispatch(loggedUserInfo(res.loggedUser))
    } catch (error) {
      console.log(error)
    }
  }

  const { user } = useSelector((state) => state.userData)
  if (user) return <Navigate to={"/"} />

  return (
    <>
      <section className='w-full h-[100dvh] bg-[url("/images/admin_bg.png")] pt-[280px]'>
        <div className="container">

          <form onSubmit={handleFormSubmit} className='w-[600px] m-auto p-6 border border-[#ffffff40] rounded-lg bg-[#00000040]'>
            <h2 className='text-center text-4xl text-white mb-10'>Admin</h2>
            <ul>

              {/* for email */}
              <li className='relative'>
                <input
                  required
                  type="email"
                  placeholder='. . . example@gmail.com'
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className='w-full p-4 bg-[#00000040] border border-[#ffffff40] rounded-lg text-xl text-white outline-none' />
                <p className='absolute -top-5 right-3 text-red-300'></p>
              </li>

              {/* for password */}
              <li className='relative mt-8'>
                <input
                  required
                  type="password"
                  placeholder='• • • • • • •'
                  onChange={(e) => setForm((prev) => ({ ...prev, pass: e.target.value }))}
                  className='w-full p-4 bg-[#00000040] border border-[#ffffff40] rounded-lg text-xl text-white outline-none' />
                <p className='absolute -top-5 right-3 text-red-300'></p>
              </li>

              <li className='mt-10'>
                <button className='w-full px-20 py-4 bg-[#00000040] border border-[#ffffff40] rounded-lg text-xl text-white cursor-pointer hover:bg-[#00000060] duration-200'>Submit</button>
              </li>
            </ul>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login