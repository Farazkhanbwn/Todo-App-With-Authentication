'use client'
import axios from 'axios'
import React, { useEffect } from 'react'

const Home = () => {
    useEffect(() => {
        getAllTodos()
    }, [])

    async function getAllTodos() {
        try {
            const res = await axios.get('http://localhost:8000/todo', { withCredentials: true })
            console.log('res todos are ', res.data)
        } catch (error) {
            console.log('eror on alltodos are : ', error)
        }
    }

    return (
        <div>
            <div>Todo List</div>
        </div>
    )
}

export default Home
