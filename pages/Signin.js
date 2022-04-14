import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { check } from 'prettier'
import { createHashPassword, isPasswordCorrect } from '../components/login/handleHash'
import { sendOTP } from '../components/login/otp'
import toast, { Toaster } from 'react-hot-toast'
import { updateLocalStorage } from '../components/login/updateUser'
import { useRouter } from 'next/router'

let g_setData
var obj
var objOTP
let userData = {}
const g_userData = {}
var oneTimePassword

const Signin = () => {
  const router = useRouter()
  const style = {
    background: `bg-gradient-to-br from-[#42275a] to-[#734b6d] min-h-screen`,
    title: `text-white text-4xl font-uber font-bold pb-5`,
    wrapper: `flex flex-col items-center justify-center min-h-screen`,
    infoContainer: `w-full max-w-xs md:max-w-lg`,
    form: `mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md`,
  }

  const loginUser = async (e) => {
    e.preventDefault()
    if (!e.target.otp.value) {
      toast.error('OTP is required!')
      return
    }
    if (!oneTimePassword) {
      toast.error('Please send OPT')
      return
    }
    const errors = await validateUser(
      e.target.username.value,
      e.target.password.value
    )

    if (Object.keys(errors).length === 0) {
      if (e.target.otp.value == oneTimePassword) {
        localStorage.removeItem('g_userData')
        updateLocalStorage(g_userData)
        oneTimePassword = null
        router.push('/')
      } else {
        toast.error('Invalid OTP!')
      }
    } else {
      if (errors.email) toast.error(errors.email)
      if (errors.username) toast.error(errors.username)
      if (errors.password) toast.error(errors.password)
      if (errors.duplicate) toast.error(errors.duplicate)
    }
  }

  const validateUser = async (username, password) => {
    const condition = "username = '" + username + "'"
    const errors = {}

    async function fetchData() {
      await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Process: 'GetData',
          Table: 'TABLE_USER',
          Columns: null,
          Conditions: condition,
          Values: null,
          Orderby: null,
          Ordersort: null,
          Extra: null,
        }),
      })
        .then((response) => response.json())
        .then((data) => (obj = data))
    }

    if (!username) {
      errors.username = 'Username is required'
    }
    if (!password) {
      errors.password = 'Password is required'
    }

    if (username && password) {
      await fetchData()
      if (obj.Message.includes('No Record(s) found')) {
        errors.account = 'Account is not existed'
      } else {
        obj.Results.map((item) => {
          userData.ID = item.USER_ID
          userData.email = item.email
          userData.username = item.username
          userData.SALT = item.SALT
          userData.SH = item.SH
          userData.HMAC = item.HMAC
          userData.Balance = item.Balance

          g_userData.ID = item.USER_ID
          g_userData.email = item.email
          g_userData.username = item.username
          g_userData.Balance = item.Balance
        })
        const isCorrect = await isPasswordCorrect(
          userData.SALT,
          userData.HMAC,
          password
        )
        if (!isCorrect) {
          errors.password = 'Invalid password'
        }
      }
    }

    return errors
  }

  const OTP = async () => {
    const username = document.getElementById('username').value
    const condition = "username = '" + username + "'"
    if (!username) {
      toast.error('username is required!')
      return
    }
    async function fetchData() {
      await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Process: 'GetData',
          Table: 'TABLE_USER',
          Columns: 'email',
          Conditions: condition,
          Values: null,
          Orderby: null,
          Ordersort: null,
          Extra: null,
        }),
      })
        .then((response) => response.json())
        .then((data) => (objOTP = data))
    }

    await fetchData()
    if (objOTP.Message.includes('No Record(s) found')) {
      toast.error('Account is not existed')
    } else {
      objOTP.Results.map((item) => {
        userData.email = item.email
      })
      const res = await sendOTP(userData.email)
      if (res.success == true) {
        oneTimePassword = res.otp
        toast.success('OTP sent!\nPlease check your email.')
      } else {
        toast.error('OTP sent error')
      }
    }
  }

  return (
    <>
      <Header />
      <Toaster />
      <div className={style.background}>
        <div className={style.wrapper}>
          <h2 className={style.title}>Sign in to your account</h2>
          <div class={style.infoContainer}>
            <form class={style.form} onSubmit={loginUser}>
              <div className="mb-4">
                <label
                  class="text-md mb-2 block font-bold text-gray-700"
                  for="Username"
                >
                  Username
                </label>
                <input
                  class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-2 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>

              <div className="mb-4">
                <label
                  class="text-md mb-2 block font-bold text-gray-700"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-2 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                  id="password"
                  type="password"
                  placeholder="********"
                />
              </div>

              <div className="mb-6">
                <label
                  class="text-md mb-2 block font-bold text-gray-700"
                  for="password"
                >
                  One-Time-Password (OTP)
                  <a
                    className="text-sm text-blue-500 hover:cursor-pointer hover:underline"
                    onClick={OTP}
                    type="button"
                  >
                    {' '}
                    send OTP{' '}
                  </a>
                </label>
                <input
                  class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-2 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                  id="otp"
                  type="otp"
                  placeholder="OTP"
                />
              </div>

              <div class="flex items-center justify-between">
                <button
                  class="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  type="submit"
                >
                  Sign In
                </button>
                <div>
                  <a
                    className="inline-block p-2 align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                  <a
                    className="inline-block align-baseline text-sm font-bold text-[#7A0BC0] hover:text-[#602f6b]"
                    href="/Register"
                  >
                    Register
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Signin
