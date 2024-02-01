import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'

function App() {

  const navigate = useNavigate();
  useEffect(() => {
    navigate('/lobby');
  }, [navigate])

  return (
    <>
      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default App
