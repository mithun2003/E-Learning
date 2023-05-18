import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function AdminPublicRoutes() {
  const authState = useSelector(state => state.adminLogin)
  return (
    authState.isStaff ? <Navigate to='/admin'/>:<Outlet/>
  )
}

export default AdminPublicRoutes