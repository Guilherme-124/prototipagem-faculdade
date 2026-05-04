import Sidebar from './components/Sidebar';
import Home from "@/components/pages/Home"
import ReunioesDia from "@/components/pages/ReservasDia"
import ReunioesSemana from '@/components/pages/ReservasSemana';
import { Route, Routes } from 'react-router-dom';
import Perfil from './components/pages/Perfil';
import PerfilEdit from './components/pages/PerfilEdit';
import Login from './components/pages/Login';
import Cadastro from './components/pages/Cadastro';
import NewRoom from './components/popUps/NewRoom';
import { useState } from 'react';



function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <div id='page' className='w-screen h-screen m-0 p-0 flex'>
      <Sidebar admin={admin}/>

      <Routes>
        <Route path='/' element={<Home admin={admin}/>}/>
        <Route path='/reunioesdia' element={<ReunioesDia/>}/>
        <Route path='/reuniaosemana' element={<ReunioesSemana/>}/>
        <Route path='/perfil' element={<Perfil/>}/>
        <Route path='/perfiledit' element={<PerfilEdit/>}/>
        <Route path='/login' element={<Login setAdmin={setAdmin}/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/novaSala' element={<NewRoom />}/>
      </Routes>
    </div>
  );
}

export default App;
