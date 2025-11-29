import { Routes,Route } from 'react-router'
import Home from "./pages/Home"
import Drive from "./pages/Drive"
import Login from './pages/Login'
import Signup from './pages/Signup'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/drive/:parentid" element={<Drive/>}/>
    </Routes>
  )
}

export default App
