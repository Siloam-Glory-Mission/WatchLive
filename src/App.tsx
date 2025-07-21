import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './Login'
import OBSVideo from './Components/ObsVideo'
import AuthService from './AuthService'
import WatchLive from './Components/watchLive'

function App() {
  

  return (
    <>
      <Router>
         <Routes>
           <Route path='/login' element={<Login />} />
            {/* <Route element={<AuthService />}> */}
             {/* <Route index element={<Navigate to="/home" />} /> */}
             <Route path='/home' element={<OBSVideo/>}/>
             <Route path='/Live' element={<WatchLive/>}/>
            {/* </Route> */}
         </Routes>
      </Router>
    </>
  )
}

export default App
