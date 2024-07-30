'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAuthContext } from '@/context/auth-context/auth-context'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { withTodoContainer } from '@/context/todo-context/todo-container'
import { useTodoContext } from '@/context/todo-context/todo-context'
import AddTodoForm from '@/shared/components/add-todo-form/add-todo-form'
import CustomInput from '@/shared/ui/custom-input/custom-input'
import CustomButton from '@/shared/ui/custom-button/custom-button'

const Home = () => {
    const { todoErrors, todoList, getAllTodos } = useTodoContext()
    const [loading, setloading] = useState<boolean>(false)
    const [formState, setFormState] = useState({
        name: '',
        description: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e?.target

        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const { isAuthenticated } = useAuthContext()
    const router = useRouter()

    // useEffect(() => {
    //     getAllTodos()
    // }, [])

    // async function getAllTodos() {
    //     try {
    //         const res = await axios.get('http://localhost:4000/todo', { withCredentials: true })
    //         console.log('res todos are ', res.data)
    //     } catch (error) {
    //         console.log('eror on alltodos are : ', error)
    //     }
    // }

    // if (!isAuthenticated) {
    //     return router.push('/login')
    // }

    const addTodo = async () => {
        try {
            const response = await axios.get('http://localhost:8000/todo', {
                withCredentials: true,
            })
            console.log('response from todo is:', response.data)
            return response
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error message:', error.message)
                console.error('Axios error response:', error.response)
            } else {
                console.error('Error adding todo:', error)
            }
            throw error
        }
    }

    return (
        <div>
            {/* <AddTodoForm /> */}
            <div className="max-w-lg mx-auto flex flex-col gap-4">
                <h2 className="text-center text-3xl mb-5 font-semibold">Add New Task</h2>

                <CustomInput
                    name="name"
                    type="text"
                    value={formState.name}
                    label="Name*"
                    placeholder="Pls Write Name Here"
                    onChange={handleChange}
                />

                <CustomInput
                    name="description"
                    type="text"
                    label="Description*"
                    value={formState.description}
                    placeholder="Pls Write Descripiton"
                    onChange={handleChange}
                />

                <CustomButton
                    title="Add Todo"
                    disabled={false}
                    loading={loading}
                    type="primary"
                    classNames="mt-2"
                    onClick={addTodo}
                />
            </div>
            {/* Get All Todos */}
            <div>Todo List </div>
            <h3>Hello We are learning pakistan is the largest country</h3>
        </div>
    )
}

export default Home
