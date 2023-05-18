import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PublicRoute() {
  const authState = useSelector(state => state.login)
  return (
    authState.isAuthenticated ?  <Navigate to='/'/> : <Outlet/> 
  )
}

export default PublicRoute