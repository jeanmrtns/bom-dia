import { useState } from 'react'
import { Login } from '../components/Login'
import { Register } from '../components/Register'

export default function Home() {
  const [activePage, setActivePage] = useState('login')
  if (activePage === 'login') {
    return <Login onChangePage={setActivePage} />
  }

  return <Register onChangePage={setActivePage} />
}

// lembrar ele sobre a senha, perguntar sobre os campos.
