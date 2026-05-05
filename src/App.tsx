import Sidebar from './components/Sidebar';
import Home from "@/components/pages/Home"
import ReunioesDia from "@/components/pages/ReservasDia"
import ReunioesSemana from '@/components/pages/ReservasSemana';
import { Route, Routes, useLocation } from 'react-router-dom';
import Perfil from './components/pages/Perfil';
import PerfilEdit from './components/pages/PerfilEdit';
import Login from './components/pages/Login';
import Cadastro from './components/pages/Cadastro';
import NewRoom from './components/popUps/NewRoom';
import { useState } from 'react';



function App() {
  const [admin, setAdmin] = useState(false);
  const location = useLocation();

  const hideSidebarRoutes = [
    "/prototipagem-faculdade/",
    "/prototipagem-faculdade/login",
    "/prototipagem-faculdade/cadastro"
  ];

  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div id='page' className='w-screen h-screen m-0 p-0 flex'>
      {!shouldHideSidebar && <Sidebar admin={admin} />}

      <Routes>
        {/** coisinha chata pra fazer o gh-pages começar no login */}
        <Route path='/prototipagem-faculdade/' element={<Login setAdmin={setAdmin}/>}/>
        <Route path='/prototipagem-faculdade/home' element={<Home admin={admin}/>}/>
        <Route path='/prototipagem-faculdade/reunioesdia' element={<ReunioesDia/>}/>
        <Route path='/prototipagem-faculdade/reuniaosemana' element={<ReunioesSemana/>}/>
        <Route path='/prototipagem-faculdade/perfil' element={<Perfil/>}/>
        <Route path='/prototipagem-faculdade/perfiledit' element={<PerfilEdit/>}/>
        <Route path='/prototipagem-faculdade/login' element={<Login setAdmin={setAdmin}/>}/>
        <Route path='/prototipagem-faculdade/cadastro' element={<Cadastro/>}/>
        <Route path='/prototipagem-faculdade/novaSala' element={<NewRoom />}/>
      </Routes>
    </div>
  );
}

export default App;
