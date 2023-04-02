 import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './nav/NavBar';
import Login from "./home/Login"
import ListEvent from "./home/ListEvent"
import Protected from './protect/Protected ';
import NotFound from './home/NotFound';
function App() {
   return (
    <> 
    <NavBar/>
    <Routes>
         <Route element={<Login />} path="/" />    
          <Route path="/list" element={<Protected><ListEvent /></Protected>} /> 
         <Route element={<NotFound />} path="*" /> 
    </Routes>
    </>
    
  );
}

export default App;
