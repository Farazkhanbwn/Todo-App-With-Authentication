'use client'
import React, { ChangeEvent, useState } from 'react'
import CustomInput from '@/shared/ui/custom-input/custom-input'
import CustomButton from '@/shared/ui/custom-button/custom-button'

interface UserCredentials {
    email: string
    password: string
}

const Login = () => {
    const [userCredentials, setUserCredentials] = useState<UserCredentials>({ email: '', password: '' })

    const handleSubmit = () => {
        console.log('User Credentials ', userCredentials)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event?.target

        setUserCredentials((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex justify-between flex-col gap-8 w-fit h-fit p-5 border-solid border-2 rounded-lg bg-gray-100">
                <h2 className="text-center text-3xl font-semibold">Login Page</h2>

                <CustomInput
                    name="email"
                    placeholder="pls enter your email"
                    type="email"
                    label="Email"
                    onChange={handleChange}
                    required={true}
                    value={userCredentials.email}
                    className='w-[30rem]'
                />

                <CustomInput
                    name="password"
                    placeholder="pls enter your password"
                    type="password"
                    label="Password"
                    onChange={handleChange}
                    required={true}
                    value={userCredentials.password}
                />

                <CustomButton title="Login" type="primary" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default Login
