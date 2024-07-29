'use client'
import React, { useEffect } from 'react'
import { useAuthContext } from '@/context/auth-context/auth-context'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { withTodoContainer } from '@/context/todo-context/todo-container'
import { useTodoContext } from '@/context/todo-context/todo-context'
import AddTodoForm from '@/shared/components/add-todo-form/add-todo-form'

const Home = () => {
    const { isAuthenticated } = useAuthContext()
    const { todoList } = useTodoContext()
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

    return (
        <div>
            <AddTodoForm />
            <div>Todo List</div>
        </div>
    )
}

export default withTodoContainer(Home)
