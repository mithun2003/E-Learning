import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const TeacherProtected = () => {
  // const authState = useSelector(state => state.login)
  const authState = JSON.parse(localStorage.getItem('teacher'))
  return (
      authState.user ? <Outlet/> : <Navigate to='/'/>
    )
}

export default TeacherProtected