import SidebarMain, { SidebarSection, SidebarItem } from './SidebarProps';
import { 
  SquareKanban,
  FolderPlus,
  ShieldUser,
  CalendarDays,
  Calendar1,
  UserRound,
  CloudCog,
} from 'lucide-react'

import { NavLink } from 'react-router-dom';


function Sidebar({ admin }: { admin: boolean }) {

  return (
    <div className='sidebar z-1000'>
      <SidebarMain>
        <div className='section'>
          <NavLink to={"/prototipagem-faculdade/home"}>
            <SidebarItem 
              icon={<CalendarDays size={20} strokeWidth={1} />}
              text="Home"
            />            
          </NavLink>
          <NavLink to={"/prototipagem-faculdade/reunioesdia"}>
            <SidebarItem 
              icon={<Calendar1 size={20} strokeWidth={1}/>}
              text="Reuniões do dia"
            />            
          </NavLink>
          <NavLink to={"/prototipagem-faculdade/reuniaosemana"}>
            <SidebarItem
              icon={<SquareKanban size={20} strokeWidth={1} />}
              text="Reuniões da semana"
            />  
          </NavLink>
        </div>
        <div className='section mt-3 border-t border-gray-300 py-1'>
          <SidebarSection
            text="Área de usuário"
            icon={<CloudCog size={20} strokeWidth={1}/>}
          />
          <NavLink to={"/prototipagem-faculdade/perfil"}>
            <SidebarItem
              icon={<UserRound size={20} strokeWidth={1} />}
              text="Perfil"
            />
          </NavLink>
        </div>
        {admin && (
          <div className='section mt-3 border-t border-gray-300 py-1'>
            <SidebarSection
              icon={<ShieldUser size={20} strokeWidth={1} />}
              text="Admin"
            />
            <NavLink to={"/prototipagem-faculdade/novaSala"}>
              <SidebarItem 
                icon={<FolderPlus size={20} strokeWidth={1} />}
                text="Nova Sala"
              />
            </NavLink>
          </div>          
        )}
      </SidebarMain>
    </div>
  );
}

export default Sidebar
