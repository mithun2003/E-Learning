import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const TeacherProtected = () => {
  const authState = useSelector(state => state.login)
  return (
      authState.user.is_teacher ? <Outlet/> : <Navigate to='/'/>
    )
}

export default TeacherProtected