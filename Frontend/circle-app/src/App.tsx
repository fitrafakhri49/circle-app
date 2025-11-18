import { Register } from "./pages/register"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

import { Button } from './components/ui/button'
import { Login } from "./pages/login"
import { AuthProvider } from "./context/AuthProvider"
import PrivateRoute from "./lib/PrivateRoute"
import {Thread} from "./pages/thread"
  

  
function Header() {
  
  return(
    <div className="w-full flex gap-4 p-4 justify-center border-b mb-10">
      <Button asChild variant="outline">
          <Link to="/login">Login</Link>
        </Button>
      <Button asChild variant="outline">
          <Link to="/register">Register</Link>
        </Button>
      </div>
  )
}




function App() {


  return (
    <AuthProvider>

<BrowserRouter>

<Header/>

<Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        <Route path='/thread' element={
          <PrivateRoute>
        <Thread/>
        </PrivateRoute>
       }></Route>
       </Routes>
</BrowserRouter>
    </AuthProvider>
  )
}

export default App
