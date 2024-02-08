import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'
import Navigation from './components/navigation';

function App() {

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if(location.pathname === "/") navigate('/lobby');
  }, [navigate, location])

  const Left = () => {
    return (
      <a href='/'>
        <img height={50} src='/footedge.png'/>
      </a>
    )
  }

  return (
    <>
      <div>
        <Navigation 
          left={<Left/>}
        />
        <Outlet/>
      </div>
    </>
  )
}

export default App
