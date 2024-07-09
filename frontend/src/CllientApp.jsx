import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientNav from './client/ClientNav'
import UserContextProvider from './context/UserContextProvider2'

export default function CllientApp() {
  return (
    <UserContextProvider>
        <ClientNav/>
        <Outlet/>
    </UserContextProvider>
  )
}
