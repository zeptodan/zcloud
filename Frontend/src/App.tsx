import { Routes,Route } from 'react-router'
import Home from "./pages/Home"
import Drive from "./pages/Drive"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Authlayout from './layouts/AuthLayout'
import NotificationBox from './components/NotificationBox'
function App() {
  return (
    <>
      <NotificationBox/>
      <Routes>
        <Route element={<Authlayout/>}>
          <Route path="/drive/:parentid" element={<Drive/>}/>
        </Route>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
