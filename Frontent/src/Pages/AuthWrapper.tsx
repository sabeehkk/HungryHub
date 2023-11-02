import React,{} from 'react' ;
import { Route,Routes } from 'react-router-dom';
import {  setUser } from "../redux/store";
import UserREgister from '../Components/User/UserREgister'
import UserLogin from '../Components/User/UserLogin'

export default function AuthWrapper() {
    // const navigate = useNavigate();
  return (
    <div>
        <Routes>
            <Route path='/signup' element={<UserREgister/>}/>
            <Route path='/login' element={<UserLogin/>}/>
        </Routes>
    </div>
  )
}





// import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
// // import UserRoute from './Routes/UserRoutes'
// import UserRegister from './Components/User/UserREgister'
// import UserLogin from './Components/User/UserLogin'
// function App() {


  
//   return (
//       <Router>
//         <Routes>
//           <Route path='/signup' element={<UserRegister/>}/>
//           <Route path='/login' element={<UserLogin/>}/>
//         </Routes>
//       </Router>
//   )
// }

// export default App