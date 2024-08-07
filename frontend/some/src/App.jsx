import DataUsers from "./components/DataUsers.jsx"
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import {Route, Routes, BrowserRouter} from 'react-router-dom';

function App() {

  

  return (
    <>
   <BrowserRouter>
  <Routes>
    
<Route path='/users' element={<DataUsers/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/home' element={<Home/>}/>


  </Routes>
  </BrowserRouter>
  
    </>
  )
}

export default App
