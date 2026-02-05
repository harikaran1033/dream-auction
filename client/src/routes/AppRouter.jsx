import {BrowserRouter,Route, Routes} from "react-router-dom"
import Home from "../pages/Home"
import Room from "../pages/Room"

const AppRouter = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Home />} />  
      <Route path="/room/:roomID"  element={<Room />} />  
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRouter