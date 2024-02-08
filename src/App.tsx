import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'
import Navigation from './components/navigation';
import Background from './components/background';

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
      <main className='app_body'>
        <Navigation 
          left={<Left/>}
        />
        <div className="app_wrapper">
          <div className="app_background">
            <Background />
          </div>
          <div className="app_outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
